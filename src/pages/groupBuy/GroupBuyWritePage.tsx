import React from 'react';

const GroupBuyWritePage = () => {
  return <div>GroupBuyWritePage</div>;
};

export default GroupBuyWritePage;

// import * as S from "./styles";
// import Label from "../../common/label";
// import InputText from "../../common/inputText";
// import ErrorMessage from "../../common/errorMessage";
// import Button from "../../common/button";
// import TextArea from "@/components/common/textarea";
// import useOverlay from "@/hooks/useOverlay";
// import styled from "styled-components";
// import LocationSelectModal, {
//   Location,
// } from "@/components/kakaoMap/locationSelectModal";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { GroupBuyFormData } from "@/types/form.types";
// import { validateUrl } from "@/utils/string";
// import postGroupBuyPost from "@/api/groupBuy/postGroupBuyPost";
// import { COLORS } from "src/styles/styleConstants";
// import InputImages from "src/components/community/write/InputImages";

// const schema = z
//   .object({
//     title: z
//       .string()
//       .min(2, { message: "2자 이상의 제목을 입력해주세요." })
//       .max(20, { message: "20자 이내의 제목을 입력해주세요." }),
//     itemLink: z
//       .string()
//       .refine(
//         (url) => {
//           return url ? validateUrl(url) : true;
//         },
//         { message: "올바른 URL을 입력해주세요." },
//       )
//       .optional(),
//     price: z.number(),
//     maxUsers: z
//       .number()
//       .min(2, {
//         message: "2명 이상의 인원을 입력해주세요.",
//       })
//       .max(20, {
//         message: "20명 이하의 인원을 입력해주세요.",
//       }),
//     description: z
//       .string()
//       .min(10, { message: "10자 이상의 설명을 입력해주세요." }),
//     images: z.custom<FileList>(),
//     enumShare: z.enum(["BUY", "SHARE"]),
//     enumCategory: z.enum(["FOOD", "LIFE", "OTHER"]),
//   })
//   .refine(
//     (data) => {
//       if (data.enumShare === "BUY") {
//         return data.price > 100 && data.price <= 100000;
//       } else {
//         return true;
//       }
//     },
//     {
//       message: "100원 이상 10만원 이하의 가격을 입력해주세요.",
//       path: ["price"],
//     },
//   );

// const GroupBuyWriteForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue,
//   } = useForm<GroupBuyFormData>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       enumShare: "BUY",
//       maxUsers: 1,
//       enumCategory: "FOOD",
//     },
//   });

//   const [location, setLocation] = useState<Location | null>(null);
//   const overlay = useOverlay();

//   const openLocationModal = (): Promise<Location> => {
//     return new Promise((resolve) => {
//       overlay.open(({ close }) => (
//         <LocationSelectModal
//           onConfirm={(loc) => {
//             resolve(loc);
//             close();
//           }}
//           onClose={() => {
//             resolve(null);
//             close();
//           }}
//         />
//       ));
//     });
//   };

//   const handleOpenLocationModal = async () => {
//     const location = await openLocationModal();
//     if (!location) return;
//     setLocation(location);
//     console.log(location);
//   };

//   const onSubmit = handleSubmit(async (data: GroupBuyFormData) => {
//     const form = new FormData();
//     const requestDto = {
//       title: data.title,
//       description: data.description,
//       itemLink: data.itemLink,
//       maxUser: data.maxUsers,
//       perUserPrice: data.price,
//       enumShare: data.enumShare,
//       enumCategory: data.enumCategory,
//       address: data.location?.address_name,
//       beobJeongDong: data.location?.code,
//       lat: data.location?.lat,
//       lng: data.location?.lng,
//     };

//     form.append("requestDto", JSON.stringify(requestDto));

//     for (let i = 0; i < data.images.length; i++) {
//       form.append("file", data.images[i]);
//     }

//     try {
//       await postGroupBuyPost(form);
//       alert("글 등록이 완료되었습니다.");
//     } catch (e) {
//       console.log(e);
//       alert("글 등록에 실패하였습니다.");
//     }
//   });

//   return (
//     <S.Container>
//       <form onSubmit={onSubmit}>
//         <S.FormInner>
//           <S.FormCol>
//             <InputImages
//               currentImageNum={watch("images")?.length || 0}
//               maxImageNum={5}
//               multiple
//               {...register("images")}
//               onRemoveFile={(fileList) => setValue("images", fileList)}
//             />

//             <ErrorMessage>{errors.images?.message}</ErrorMessage>
//           </S.FormCol>
//           <S.FormRow>
//             <Label htmlFor="title">제목</Label>
//             <InputText
//               {...register("title")}
//               placeholder="공동구매 글 제목"
//               id="title"
//             />
//             <S.RadioWrapper>
//               <input
//                 type="radio"
//                 id="categoryALL"
//                 value="FOOD"
//                 {...register("enumCategory")}
//                 hidden
//               />
//               <S.RadioButtonLabel
//                 htmlFor="categoryALL"
//                 $checked={watch("enumCategory") === "FOOD"}
//                 tabIndex={0}
//               >
//                 FOOD
//               </S.RadioButtonLabel>
//               <input
//                 type="radio"
//                 id="categoryLIFE"
//                 value="LIFE"
//                 {...register("enumCategory")}
//                 hidden
//               />
//               <S.RadioButtonLabel
//                 htmlFor="categoryLIFE"
//                 $checked={watch("enumCategory") === "LIFE"}
//                 tabIndex={0}
//               >
//                 LIFE
//               </S.RadioButtonLabel>
//               <input
//                 type="radio"
//                 id="categoryOTHER"
//                 value="OTHER"
//                 {...register("enumCategory")}
//                 hidden
//               />
//               <S.RadioButtonLabel
//                 htmlFor="categoryOTHER"
//                 $checked={watch("enumCategory") === "OTHER"}
//                 tabIndex={0}
//               >
//                 OTHER
//               </S.RadioButtonLabel>
//             </S.RadioWrapper>
//             <ErrorMessage>{errors.title?.message}</ErrorMessage>
//           </S.FormRow>
//           <S.FormRow>
//             <Label htmlFor="itemLink">물품 링크(선택사항)</Label>
//             <InputText
//               {...register("itemLink")}
//               placeholder="물품 링크(선택사항)"
//               id="itemLink"
//             />
//             <ErrorMessage>{errors.itemLink?.message}</ErrorMessage>
//           </S.FormRow>
//           <S.FormRow>
//             <Label htmlFor="price">거래방식 및 가격(원)</Label>
//             <S.RadioWrapper>
//               <input
//                 type="radio"
//                 id="buy"
//                 value="BUY"
//                 {...register("enumShare")}
//                 hidden
//               />
//               <S.RadioButtonLabel
//                 htmlFor="buy"
//                 $checked={watch("enumShare") === "BUY"}
//                 tabIndex={0}
//               >
//                 Buy
//               </S.RadioButtonLabel>
//               <input
//                 type="radio"
//                 id="share"
//                 value="SHARE"
//                 hidden
//                 {...register("enumShare")}
//               />
//               <S.RadioButtonLabel
//                 htmlFor="share"
//                 $checked={watch("enumShare") === "SHARE"}
//                 tabIndex={0}
//                 onClick={() => setValue("price", 0)}
//               >
//                 Share
//               </S.RadioButtonLabel>
//             </S.RadioWrapper>

//             <InputText
//               placeholder="가격(원)"
//               id="price"
//               type="number"
//               {...register("price", {
//                 setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
//               })}
//               disabled={watch("enumShare") === "SHARE"}
//             />
//             <ErrorMessage>{errors.price?.message}</ErrorMessage>
//           </S.FormRow>
//           <S.FormRow>
//             <Label htmlFor="maxUsers">인원</Label>
//             <InputText
//               placeholder="인원"
//               id="maxUsers"
//               type="number"
//               {...register("maxUsers", {
//                 setValueAs: (v) => (v === "" ? -1 : parseInt(v, 10)),
//               })}
//             />
//             <ErrorMessage>{errors.maxUsers?.message}</ErrorMessage>
//           </S.FormRow>

//           <S.FormRow>
//             <Label htmlFor="description">설명</Label>
//             <TextArea
//               {...register("description")}
//               placeholder="진행할 공동구매에 대해서 설명해주세요."
//               id="description"
//               rows={5}
//             />
//             <ErrorMessage>{errors.description?.message}</ErrorMessage>
//           </S.FormRow>
//           <S.FormRow>
//             <S.LocationContainer>
//               <Label htmlFor="location">장소</Label>
//               <Button variants="link" size="sm">
//                 삭제
//               </Button>
//             </S.LocationContainer>
//             <Button variants="outline" onClick={handleOpenLocationModal}>
//               {location ? location.address_name : "장소를 선택해주세요."}
//             </Button>
//           </S.FormRow>
//           <S.FormRow>
//             <Button onClick={() => {}}>글 등록하기</Button>
//           </S.FormRow>
//         </S.FormInner>
//       </form>
//     </S.Container>
//   );
// };

// export default GroupBuyWriteForm;

// const S = {
// Container : styled.div`
//   width: 100%;
//   max-width: 400px;
//   display: flex;
//   flex-direction: column;
//   gap: 6rem;
// `, FormInner : styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 1.6rem;
// `, FormRow : styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 0.8rem;
// `, FormCol : styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   gap: 0.8rem;
// `, LocationContainer : styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `, RadioWrapper : styled.div`
//   display: flex;
//   gap: 1rem;
// `, RadioButtonLabel : styled.label<{ $checked: boolean }>`
//   background-color: ${({ $checked }) =>
//     $checked ? COLORS.GREEN[300] : COLORS.GRAY[0]};
//   color: ${({ $checked}) =>
//     $checked ? COLORS.GRAY[0] : COLORS.GREEN[300]};

//   border-radius: 3.8rem;
//   padding: 0.6rem 1.4rem;
//   border: 1px solid ${COLORS.GREEN[300]};
//   cursor: pointer;
// `
// }
