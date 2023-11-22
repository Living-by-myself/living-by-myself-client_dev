const EMAIL_REGEX = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;
const PHONENUMBER_REGEX = /^010\d{8}$/;

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