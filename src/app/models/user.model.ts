export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface UserLoginResponse {
  user: User;
  token: string;
}
