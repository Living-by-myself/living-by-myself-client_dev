import { Group } from 'lucide-react';
import React, { forwardRef } from 'react';
import ImagePreview from 'src/components/community/write/ImagePreview';
import Icon from 'src/components/icon/Icon';
import styled from 'styled-components';
import GroupBuyImagePreview from './GroupBuyImagePreview';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';

interface InputImagesProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'file';
  maxImageNum: number;
  currentImageNum: number;
  onRemoveFile?: (fileList: FileList) => void;
}

const GroupBuyInputImage = forwardRef<HTMLInputElement, InputImagesProps>(
  (
    {
      type = 'file',
      accept = 'image/png, image/jpeg',
      id = 'images',
      currentImageNum,
      maxImageNum,
      onRemoveFile,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<File[]>([]);

    const inputFileRef = React.useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
      if (!inputFileRef.current) return;
      inputFileRef.current.click();
    };

    const changeFiles = (fileList: FileList) => {
      setFiles(fileList.length > maxImageNum ? Array.from(fileList).slice(0, maxImageNum) : Array.from(fileList));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const dataTransfer = new DataTransfer();

      if (files.length > 0) {
        files.forEach((file) => {
          dataTransfer.items.add(file);
        });
      }

      const restSlot = Math.min(e.target.files.length, maxImageNum - files.length);

      Array.from(e.target.files)
        .slice(0, restSlot)
        .forEach((file) => {
          dataTransfer.items.add(file);
        });

      e.target.files = dataTransfer.files;

      if (props.onChange) {
        props.onChange(e);
      }
      changeFiles(e.target.files);
    };

    const removeImage = (index: number) => {
      const dataTransfer = new DataTransfer();

      const newArray = Array.from(files);
      newArray.splice(index, 1);

      newArray.forEach((file) => {
        dataTransfer.items.add(file);
      });

      if (onRemoveFile) {
        onRemoveFile(dataTransfer.files);
      }
      changeFiles(dataTransfer.files);
    };

    return (
      <>
        <S.InputFile
          type={type}
          accept={accept}
          id={id}
          {...props}
          onChange={onChange}
          ref={(inputRef) => {
            if (ref) {
              if (typeof ref === 'function') {
                ref(inputRef);
              } else {
                ref.current = inputRef;
              }
            }
            inputFileRef.current = inputRef;
          }}
          hidden
        />
        <S.InputButton onClick={handleClick} type="button">
          <Icon name="camera" size={16} color={COLORS.GRAY[500]} />
          <S.FileCount>{`${currentImageNum}/${maxImageNum}`}</S.FileCount>
        </S.InputButton>
        {files.map((file, index) => (
          <GroupBuyImagePreview
            key={index + file.lastModified + file.name}
            file={file}
            onClickRemove={() => removeImage(index)}
          />
        ))}
      </>
    );
  }
);

export default GroupBuyInputImage;

const S = {
  InputFile: styled.input``,
  InputButton: styled.button`
    cursor: pointer;
    border: 1px solid ${COLORS.GRAY[300]};
    background-color: ${COLORS.GRAY[0]};

    color: ${COLORS.GRAY[500]};
    padding: 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1;
    align-items: center;
    width: 48px;
    height: 48px;
    aspect-ratio: 1;
    border-radius: 0.6rem;
    &:hover {
      background-color: ${COLORS.GRAY[200]};
    }
  `,
  FileCount: styled.span`
    ${styleFont.body2}
  `,
  Caption: styled.div`
    ${styleFont.body2}
    color: ${COLORS.GRAY[400]};
  `
};
