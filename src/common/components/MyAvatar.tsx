// hooks
import { merchantInfoSelector } from 'src/profile/common/reducers/merchant-profile.slice';
import useAuth from '../hooks/useAuth';
import { useSelector } from '../redux/store';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';
import { adminDataSelector } from '../../auth/login/auth.slice';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const user = useSelector(adminDataSelector);

  return (
    <Avatar
      src={user?.avatarUrl}
      alt={user?.name}
      color={createAvatar(user?.name as string).color || 'default'}
      {...other}
    >
      {createAvatar(user?.name as string).name}
    </Avatar>
  );
}
