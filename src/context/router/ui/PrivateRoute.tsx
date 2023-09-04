import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import { IAuth } from '../../AuthProvider/models';

type Props = {
  children?: ReactNode;
};
function PrivateRoute({ children }: Props) {
  const auth: IAuth | null = useAuth();
  const location = useLocation();

  console.log(auth);

  if (auth?.user === null) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export { PrivateRoute };
