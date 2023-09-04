import React from 'react';

export type IChangeEventHandler = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type IFormEventHandler = (event: React.SyntheticEvent) => void;
