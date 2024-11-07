// Type
export type TermPolicyStatus = 'ACTIVE' | 'IN_ACTIVE';

export type TermPolicyType = 'TERMS' | 'POLICY';

export type TermPolicyLang = 'VN' | 'EN';

export type DetailProps = {
  handleDrop: (acceptedFiles: File[]) => void;
  errors: string | undefined;
  handleClickAdd: VoidFunction;
};

export type ITermPolicyCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
