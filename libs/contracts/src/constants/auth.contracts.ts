export const AUTH_SERVICE = 'AUTH_SERVICE';
export const AUTH_SERVICE_PORT = 4002;
export const AUTH_PATTERN = {
  REGISTER: 'auth.register',
  LOGIN: 'auth.login',
  FIND_USER: 'auth.findUser',
};

// ==== interfaces, types
export interface RegisterUserPayload extends Omit<IUser, 'id'> {}
export interface RegisterUserResult extends IUser {}

export interface LoginUserPayload extends Omit<RegisterUserPayload, 'name'> {}

export interface IUser {
  id: number;
  name: string;
  username: string;
  password: string; // temporary, will be removed after
}
