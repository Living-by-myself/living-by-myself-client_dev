const EMAIL_REGEX = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;
const PHONENUMBER_REGEX = /^010\d{8}$/;
const NICKNAME_REGEX = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,7}$/

export const validateNickname = (nickname:string) => {
  const nicknameRegex = new RegExp(NICKNAME_REGEX);
  return nicknameRegex.test(nickname)
}


export const validateEmail = (username: string) => {
  const emailRegex = new RegExp(EMAIL_REGEX);
  return emailRegex.test(username);
};

export const validatePassword = (password: string) => {
  const passwordRegex = new RegExp(PASSWORD_REGEX);
  return passwordRegex.test(password);
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = new RegExp(PHONENUMBER_REGEX);
  return phoneNumberRegex.test(phoneNumber);
};