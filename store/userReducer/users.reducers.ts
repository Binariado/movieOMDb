import {USERS_AUTH} from './users.type';
import {avatarDefault} from '../../helpers/help';

interface Props {
  isAuthenticate: boolean;
  detailUser: Object;
}

const avatar = avatarDefault;

const INITIAL_STATE: Props = {
  isAuthenticate: false,
  detailUser: {
    name: 'anonimo',
    id: 'HU-001',
    avatar,
  },
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case USERS_AUTH:
      return {
        ...state,
        isAuthenticate: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
