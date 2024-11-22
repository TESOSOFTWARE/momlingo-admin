import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/common/redux/store';
import { setAccessToken, setAdminData, setLogin, setRefreshToken } from '../auth.slice';
import { AdminProps, ILoginCallback } from '../interface';
import { getAuth } from '../service';

export const useAuthlogin = ({ onError, onSuccess }: ILoginCallback) => {
  return {
    ...useMutation(getAuth, {
      onSuccess: (data) => {
        if (!data) return;
        const { accessToken, user } = data;
        const userData: AdminProps = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl:
            user.avatarUrl ||
            'https://png.pngtree.com/png-vector/20240724/ourlarge/pngtree-administrator-admin-avatar-png-image_12853673.png',
          accessToken: accessToken,
        };
        dispatch(setAccessToken('Bearer ' + accessToken));
        dispatch(setAdminData(userData));
        dispatch(setLogin(true));

        onSuccess();
      },
      onError,
    }),
  };
};
