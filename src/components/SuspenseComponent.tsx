import { Suspense, ReactNode } from 'react';
import { Loader } from '@mantine/core';

type Props = {
  children?: ReactNode;
};

export default function SuspenseComponent({ children }: Props) {
  return <Suspense fallback={<Loader m="auto" />}>{children}</Suspense>;
}
