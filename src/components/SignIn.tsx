import { useState } from 'react';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useAuth } from '../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { IChangeEventHandler, IFormEventHandler } from '../models';
import { IAuth } from '../context/AuthProvider/models';

interface IErrors {
  username?: string;
  password?: string;
}

function SignIn() {
  const [data, setData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState<IErrors>({});
  const auth: IAuth | null = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleChange: IChangeEventHandler = (e) => {
    const { value, name } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit: IFormEventHandler = (e) => {
    e.preventDefault();
    setErrors({});
    let isValidForm = true;
    if (data?.username !== 'test') {
      setErrors((prevState) => ({
        ...prevState,
        username: 'Данный Логин не зарегистрирован',
      }));
      isValidForm = false;
    }
    if (data?.password !== 'test123') {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Пароль неверный',
      }));
      isValidForm = false;
    }
    if (isValidForm)
      auth &&
        auth.signin(data?.username, () => {
          navigate(from, { replace: true });
        });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="username"
        value={data?.username}
        onChange={handleChange}
        description="Логин - test"
        label="Логин"
        error={errors?.username}
        required
      />
      <PasswordInput
        name="password"
        value={data?.password}
        onChange={handleChange}
        label={'Пароль'}
        description="Пароль - test123"
        error={errors?.password}
        required
        mt="md"
      />
      <Button fullWidth mt="xl" type="submit">
        Вход
      </Button>
    </form>
  );
}

export default SignIn;
