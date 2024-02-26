export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface IFeedback {
  title: string;
  category: string;
  description: string;
}
