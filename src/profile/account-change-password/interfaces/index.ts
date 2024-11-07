export interface FormValuesProps {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IDataUpdatePassword {
  password: string;
  newPassword: string;
}

export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}
