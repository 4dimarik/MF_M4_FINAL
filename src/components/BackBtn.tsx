import { cloneElement, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  children?: ReactElement;
};

function BackBtn({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  return cloneElement(children as ReactElement, {
    onClick: () => {
      return navigate(location.state.from ?? '/', {
        state: { from: location.pathname },
      });
    },
  });
}

export { BackBtn };
