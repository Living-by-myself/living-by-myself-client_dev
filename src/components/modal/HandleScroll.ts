// export const handleScroll = (cancelGroupBuyButton:any) => {
//     if(cancelGroupBuyButton){
//         return document.body.style.overflow = 'hidden';
//     }else{
//         return document.body.style.overflow = 'unset';
//     }
// }

export const ScrollHidden = () => {
    window.scrollTo(0,0)
    document.body.style.overflow = 'hidden'
}
export const ScrollUnset = () => {
    document.body.style.overflow = 'unset'
}
// if(handleScroll(button)){
//     document.body.style.overflow = 'hidden';
// }