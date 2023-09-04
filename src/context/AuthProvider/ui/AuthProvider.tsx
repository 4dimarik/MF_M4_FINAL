import { createContext, ReactNode } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { SignIn, SignOut, ILocalStorage, IAuth } from '../models';

const AuthContext = createContext<IAuth | null>(null);

type Props = {
  children?: ReactNode;
};

function AuthProvider({ children }: Props) {
  const [user, setValue, removeValue] = useLocalStorage({
    key: 'user',
    defaultValue: null,
  } as ILocalStorage);

  const signin: SignIn = (newUser, callback) => {
    setValue(newUser);
    callback();
  };

  const signout: SignOut = (callback) => {
    removeValue();
    callback();
  };

  const value: IAuth = {
    user,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
