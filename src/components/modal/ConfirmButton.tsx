import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import styled from 'styled-components'
import { confirmModalText } from './ConfirmModalText'
import { COLORS } from 'src/styles/styleConstants'
import { styleFont } from 'src/styles/styleFont'

const ConfirmButton = (type: string) => {
    const text = confirmModalText(type)
    return new Promise<boolean>((resolve, reject) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <>
                        <S.ConfirmContainer key={type}>
                            <S.ContainerInner>
                                <h1>{text.title}</h1>
                                <h2>{text.message}</h2>
                                <S.ButtonContainer>
                                    <button className='pointColor' onClick={() => {
                                        resolve(true);
                                        onClose();
                                    }}>{text.true}</button>
                                    <button onClick={() => {
                                        resolve(false);
                                        onClose();
                                    }}>{text.false}</button>
                                </S.ButtonContainer>
                            </S.ContainerInner>
                        </S.ConfirmContainer>
                        <S.BackgroundOverlay>
                        </S.BackgroundOverlay>
                    </>
                )
            }
        })
    })

}

export default ConfirmButton

const S = {
    BackgroundOverlay: styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100lvh;
    z-index: 998;
    overflow: hidden;
    background-color: rgba(0,0,0,0.7);
    `,
    ConfirmContainer: styled.div`
       position : absolute;
       left: 50%;
       top: 50%;
       transform: translate(-50%,-50%);
       z-index: 999;
       background-color: #fff;
       border-radius: 8px;

       h1{
        text-align: center;
        margin-bottom: 25px;
        ${styleFont.h2}
       }
       h2{
        margin-bottom: 25px;
        ${styleFont.body1}
       }
    `,
    ContainerInner: styled.div`
      padding: 40px 56px 20px 56px;
    `,
    ButtonContainer: styled.div`
        display: flex;
        justify-content: center;
        gap: 8px;
        button{
            border-radius: 4px;
            padding: 12px 26px;
            background-color: #fff;
            border: solid 1px ${COLORS.GRAY[400]};
        }
        .pointColor{
            color: #fff;
            background-color: ${COLORS.GREEN[400]};
        }
    `
}