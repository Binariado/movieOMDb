import {ERROR_ALERT} from './errors.type';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

export const error_alert = (payload: any) => {
  return {
    payload: payload,
    type: ERROR_ALERT,
  };
};

type PropsErr = {
  title: string;
  type: any;
  desp: string;
};

export const setError = (props: PropsErr) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(error_alert(props));
  };
};
