import React, { forwardRef, useRef } from 'react';

import styled from 'styled-components';

import Icon from 'src/components/icon/Icon';
import ImagePreview from './ImagePreview';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { set } from 'react-hook-form';

interface InputImagesProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'file';
  maxImageNum: number;
  currentImageNum: number;
  onRemoveFile?: (fileList: FileList) => void;
}

const InputImages = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const fileInput = useRef<HTMLInputElement>(null);

  const removeFile = (file: File) => {
    setFiles((prev) => prev.filter((item) => item !== file));
  };

  return (
    <>
      <S.InputFile
        type="file"
        ref={fileInput}
        multiple
        max={5}
        hidden
        onChange={() => {
          if (fileInput.current?.files) {
            const fileList = Array.from(fileInput.current?.files);
            if (fileList.length > 5) {
              alert('이미지는 5개까지만 가능합니다.');
              return;
            }
            setFiles(fileInput.current?.files ? Array.from(fileInput.current?.files) : []);
          }
        }}
      />
      <S.InputButton
        onClick={() => {
          fileInput.current?.click();
        }}
        type="button"
      >
        <Icon name="camera" size={16} color={COLORS.GRAY[500]} />
        <S.FileCount>{files.length}</S.FileCount>
      </S.InputButton>
      {files.map((file, index) => (
        <ImagePreview file={file} removeFile={removeFile} />
      ))}
    </>
  );
};

export default InputImages;

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
  `
};
