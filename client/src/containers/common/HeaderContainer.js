import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../blog/Header';
import { logout } from '../../modules/auth';

const HeaderContainer = () => {
  const { isLoginSuccess } = useSelector(({ auth }) => ({ isLoginSuccess: auth.isLoginSuccess }));
  const nick = localStorage.getItem('nick');
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return <Header isLoginSuccess = {isLoginSuccess} nick={nick} onLogout={onLogout} />;
};

export default HeaderContainer;
