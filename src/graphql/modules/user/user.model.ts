export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface Login {
  token: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
}
