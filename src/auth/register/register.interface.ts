export interface IFormRegister {
  email: string;
  password: string;
}
export type IRegisterCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
