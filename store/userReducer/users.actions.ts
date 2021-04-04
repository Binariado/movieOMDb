import {USERS_AUTH} from './users.type';

export const user_auth = (payload: any) => {
  return {
    payload,
    type: USERS_AUTH,
  };
};
