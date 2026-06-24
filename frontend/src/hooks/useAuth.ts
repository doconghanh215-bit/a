import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from '../store/authSlice';
import { authAPI } from '../lib/api';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    dispatch(loginStart());
    try {
      const { data } = await authAPI.login({ email, password });
      dispatch(
        loginSuccess({
          user: data.data.user,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
      );
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.error || 'Login failed'));
    }
  };

  const logoutUser = async () => {
    try {
      await authAPI.logout();
      dispatch(logout());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return {
    ...auth,
    login,
    logout: logoutUser,
  };
};
