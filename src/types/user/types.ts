export interface SignFormType {
  username: string;
  password: string;
  passwordCheck: string;
  phoneNumber: string;
  phoneAuthNumber: string;
}

export interface LoginUserType {
  username: string;
  password: string;
}

export interface PasswordResetType {
  newPassword: string;
  newPasswordCheck: string;
}

export interface FindPasswordType {
  username: string;
  phoneNumber: string;
  phoneAuthNumber: string;
}
