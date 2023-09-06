import { cloneElement, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children?: ReactElement;
};

function BackBtn({ children }: Props) {
  const navigate = useNavigate();
  return cloneElement(children as ReactElement, {
    onClick: () => navigate(-1),
  });
}

export { BackBtn };
