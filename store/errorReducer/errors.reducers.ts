import {ERROR_ALERT} from './errors.type';

const INITIAL_STATE = {
  type: null,
  title: '',
  desp: '',
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ERROR_ALERT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
