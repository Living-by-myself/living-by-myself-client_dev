export interface ConfirmModalTextType {
    title : string;
    message:string;
    true:string;
    false:string;
}

const groupBuy = {
    title:'정말로 결제 하시겠어요?',
    message:'인원이 전부 채워지기 전까지 공동구매 취소가 가능해요.',
    true:'결제하기',
    false:'취소하기',
}

const groupBuyCancle = {
    title:'정말로 취소 하시겠어요?',
    message:'인원이 전부 채워지기 전까지 공동구매가 가능해요.',
    true:'취소하기',
    false:'돌아가기'
}
export const confirmModalText = (type:string) => {
    if(type === 'groupBuy'){
        return groupBuy
    }
    if(type === 'groupBuyCancle'){
        return groupBuyCancle;
    }
};