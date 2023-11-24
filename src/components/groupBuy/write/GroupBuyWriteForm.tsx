import { zodResolver } from '@hookform/resolvers/zod';
import { error } from 'console';
import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import Button from 'src/components/button/Button';
import { GroupBuyWriteFormProps } from 'src/store/groupStore';
import DaumPostcode, { DaumPostcodeEmbed } from 'react-daum-postcode';
import styled from 'styled-components';
import { z } from 'zod';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import GroupBuyInputImage from './GroupBuyInputImage';
import { addGroupBuyPost } from 'src/api/groupBuy/groupBuy';

export const validateUrl = (url: string) => {
  const urlRegex = new RegExp('^(https?://)?([a-zA-Z0-9_-]+.)+[a-zA-Z]{2,6}(:[0-9]{1,5})?(/[^/]*)*$');
  return urlRegex.test(url);
};

const schema = z.object({
  title: z
    .string()
    .max(20, { message: '제목은 20자리 이하여야합니다.' })
    .min(4, { message: '제목은 4자리 이상이어야합니다.' })
    .refine((value) => value.length > 0, { message: '제목을 입력해주세요.' }),
  description: z
    .string()
    .max(400, { message: '설명은 400자리 이하여야합니다.' })
    .min(10, { message: '설명은 10자리 이상이어야합니다.' })
    .refine((value) => value.length > 0, { message: '설명을 입력해주세요.' }),
  itemLink: z.string().refine(
    (url) => {
      return url ? validateUrl(url) : true;
    },
    { message: '올바른 URL을 입력해주세요.' }
  ),
  maxUser: z
    .number()
    .min(1, { message: '인원은 1명 이상이어야합니다.' })
    .max(10, { message: '인원은 10명 이하여야합니다.' })
    .refine((value) => value > 1, { message: '인원은 0보다 커야합니다.' }),
  perUserPrice: z.number(),

  enumShare: z.string().refine((value) => value.length > 0, { message: '공동구매 유형을 선택해주세요.' }),
  enumCategory: z.string().refine((value) => value.length > 0, { message: '카테고리를 선택해주세요.' }),

  address: z.string().refine((value) => value.length > 0, { message: '주소를 입력해주세요.' }),
  lat: z.number().refine((value) => value > 0, { message: 'lat는 0보다 커야합니다.' }),
  lng: z.number().refine((value) => value > 0, { message: 'lng는 0보다 커야합니다.' }),
  images: z.custom<FileList>(),
  beobJeongDong: z.string()
});

const GroupBuyWriteForm = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [isMapToggle, setIsMapToggle] = useState(false);
  const [address, setAddress] = useState<{ lat: number; lng: number }>({ lat: 33.5563, lng: 126.79581 });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<GroupBuyWriteFormProps>({
    defaultValues: {
      enumShare: 'BUY',
      enumCategory: 'FOOD',
      address: '서울특별시 양천구 신월동',
      beobJeongDong: '12345',
      lat: 33.5563,
      lng: 126.79581
    },
    resolver: zodResolver(schema)
  });

  const setAddressHandler = (data: any) => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(data.address, function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        setValue('lat', result[0].x);
        setValue('lng', result[0].y);
        setValue('address', data.address);
        setValue('beobJeongDong', data.bcode);
        setAddress({ lat: result[0].y, lng: result[0].x });
        setIsMapToggle(true);
      }
    });
  };

  const onSubmit = handleSubmit(
    async (data: GroupBuyWriteFormProps) => {
      const form = new FormData();
      const requestDto = {
        title: data.title,
        description: data.description,
        itemLink: data.itemLink,
        maxUser: data.maxUser,
        perUserPrice: data.perUserPrice,
        enumShare: data.enumShare,
        enumCategory: data.enumCategory,
        address: data.address,
        beobJeongDong: data.beobJeongDong as string,
        lat: data.lat,
        lng: data.lng
      };

      form.append('requestDto', JSON.stringify(requestDto));
      if (data.images) {
        for (let i = 0; i < data.images.length; i++) {
          form.append('fileName', data.images[i]);
        }
      }

      try {
        await addGroupBuyPost(form);
        alert('글 등록이 완료되었습니다.');
      } catch (e) {
        console.log(e);
        alert('글 등록에 실패하였습니다.');
      }
    },
    (onError) => console.log(onError)
  );

  return (
    <S.Container>
      <S.GroupBuyForm onSubmit={onSubmit}>
        <div>
          <GroupBuyInputImage
            currentImageNum={watch('images')?.length || 0}
            maxImageNum={5}
            multiple
            {...register('images')}
            onRemoveFile={(fileList) => setValue('images', fileList)}
          />
        </div>

        <S.InputWrapper>
          <S.CategoryButtonBux>
            <Button
              type="button"
              variants={watch('enumCategory') === 'FOOD' ? 'contain' : 'outline'}
              onClick={() => {
                setValue('enumCategory', 'FOOD');
              }}
            >
              음식
            </Button>
            <Button
              type="button"
              variants={watch('enumCategory') === 'LIFE' ? 'contain' : 'outline'}
              onClick={() => {
                setValue('enumCategory', 'LIFE');
              }}
            >
              생필품
            </Button>
            <Button
              type="button"
              variants={watch('enumCategory') === 'OTHER' ? 'contain' : 'outline'}
              onClick={() => {
                setValue('enumCategory', 'OTHER');
              }}
            >
              기타
            </Button>
          </S.CategoryButtonBux>
          <S.Label>제목</S.Label>
          <S.Input type="text" placeholder="제목" {...register('title')}></S.Input>
          {errors.title && <p>{errors.title.message}</p>}
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>공동구매 물품 링크</S.Label>
          <S.Input type="text" placeholder="물품링크" {...register('itemLink')}></S.Input>
          {errors.itemLink && <p>{errors.itemLink.message}</p>}
        </S.InputWrapper>

        <S.InputWrapper>
          <S.EnumShareButtonBox>
            <S.EnumShareButton
              type="button"
              onClick={() => {
                setValue('enumShare', 'BUY');
              }}
            >
              판매하기
            </S.EnumShareButton>
            <S.EnumShareButton
              type="button"
              onClick={() => {
                setValue('enumShare', 'SHARE');
              }}
            >
              나눔하기
            </S.EnumShareButton>
          </S.EnumShareButtonBox>
          <S.Label>가격</S.Label>
          {watch('enumShare') === 'BUY' ? (
            <S.Input
              type="number"
              placeholder="가격"
              {...register('perUserPrice', {
                setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10))
              })}
            ></S.Input>
          ) : (
            <S.Input
              type="number"
              placeholder="가격"
              disabled
              {...register('perUserPrice', {
                setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10))
              })}
            ></S.Input>
          )}
          {errors.perUserPrice && <p>{errors.perUserPrice.message}</p>}
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>인원</S.Label>
          <S.Input
            type="number"
            placeholder="인원"
            {...register('maxUser', {
              setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10))
            })}
          ></S.Input>
          {errors.maxUser && <p>{errors.maxUser.message}</p>}
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>설명</S.Label>
          <S.Input type="text" placeholder="설명" {...register('description')}></S.Input>
          {errors.description && <p>{errors.description.message}</p>}
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>거래희망장소</S.Label>
          <S.Input type="text" placeholder="거래장소 선택" {...register('address')}></S.Input>
          {errors.address && <p>{errors.address.message}</p>}
        </S.InputWrapper>

        <S.InputWrapper>
          <S.Label>법정동?</S.Label>
          <S.Input type="text" placeholder="거래장소 선택" {...register('beobJeongDong')}></S.Input>
          {/* {errors.address && <p>{errors.address.message}</p>} */}
        </S.InputWrapper>
      </S.GroupBuyForm>
      <S.InputWrapper>
        <Button type="button" onClick={() => setIsToggle(true)}>
          수령주소 설정
        </Button>
        {isToggle && (
          <>
            <Button type="button" onClick={() => setIsToggle(false)}>
              닫기
            </Button>
            <DaumPostcodeEmbed onComplete={setAddressHandler} />
          </>
        )}
        {isMapToggle && (
          <div>
            <Map center={address} style={{ width: '300px', height: '200px' }} level={3}>
              <MapMarker position={address} />
            </Map>
          </div>
        )}
      </S.InputWrapper>
    </S.Container>
  );
};

export default GroupBuyWriteForm;
const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 26px;
    background-color: gray;
    position: relative;
    width: 100%;
  `,

  InputWrapper: styled.div``,
  GroupBuyForm: styled.form``,
  Input: styled.input``,
  Label: styled.p``,
  EnumShareButtonBox: styled.div``,
  EnumShareButton: styled.button``,
  CategoryButtonBux: styled.div``,
  CategoryButton: styled.button``
};
