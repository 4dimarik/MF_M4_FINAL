export type User = string | null;
export type Callback = () => void;
export type SignIn = (newUser: User, callback: Callback) => void;
export type SignOut = (callback: Callback) => void;

export interface ILocalStorage {
  key: string;
  defaultValue: User;
}

export interface IAuth {
  user: User;
  signin: SignIn;
  signout: SignOut;
}
