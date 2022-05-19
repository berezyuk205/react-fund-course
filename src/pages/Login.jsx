import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";

const Login = () => {
  return (
    <div>
      <h2>Страница авторизации</h2>
      <form>
        <MyInput type='text' placeholder='Введите логин'/>
        <MyInput type='password' placeholder='Введите пароль'/>
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
};

export default Login;