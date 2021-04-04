import {combineReducers} from 'redux';
import movieReducer from './movieReducer/movie.reducers';
import userReducer from './userReducer/users.reducers';
import errorReducer from './errorReducer/errors.reducers';

const rootReducer = combineReducers({
  movie: movieReducer,
  user: userReducer,
  error: errorReducer,
});

export const combinedReducers = rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
