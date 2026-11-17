export interface LoginData {
  email: string;
  password: string;
  status : string;
}


export const validLoginData: LoginData = {
  email: 'random@boredom.com',
  password: 'admin',
  status : 'valid'
};
export const invalidLoginData: LoginData = {
  email: 'test@123.com',
  password: 'admin',
  status : 'invalid'
};