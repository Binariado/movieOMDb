import _ from 'lodash';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {
  LIST_MOVIE,
  SELECT_MOVIE,
  FILTER,
  LOAD_MOVIE,
  FILTER_VIEW,
} from './movie.types';
import {apiRest} from '../../helpers/apiRest';
import {setError} from '../../store/errorReducer/errors.actios';

export const select_movie = (payload: any) => {
  return {
    payload,
    type: SELECT_MOVIE,
  };
};

export const list_movie = (payload: any) => {
  return {
    payload,
    type: LIST_MOVIE,
  };
};

export const filter_search = (payload: any) => {
  return {
    payload,
    type: FILTER,
  };
};

export const filter_view = (payload: any) => {
  return {
    payload,
    type: FILTER_VIEW,
  };
};

export const load_movie = (payload: any) => {
  return {
    payload,
    type: LOAD_MOVIE,
  };
};

const handlerr = (dispatch: ThunkDispatch<{}, {}, AnyAction>, desp: string) => {
  dispatch(
    setError({
      title: '!Oh oh',
      desp: !desp
        ? 'an unexpected error occurred. Reload the app and try again'
        : desp,
      type: 'err',
    }),
  );
};

const handlifo = (dispatch: ThunkDispatch<{}, {}, AnyAction>, desp: string) => {
  dispatch(
    setError({
      title: 'The search does not match',
      desp: desp,
      type: 'info',
    }),
  );
};

const getListMovieSearch = async (
  search: any,
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  try {
    dispatch(load_movie(true));
    const resp = await apiRest('searchMoview', search);
    const {Response, Error} = resp;
    if (Response === 'True') {
      const {Search, totalResults} = resp;
      return {
        Search: _.uniqBy(Search, 'imdbID'),
        totalResults,
        Response,
      };
    }
    if (Error) {
      handlifo(dispatch, Error);
    }
    return resp;
  } catch (error) {
    console.error(error);
    handlerr(
      dispatch,
      'an unexpected error occurred. If the error persists, reload the  application',
    );
  } finally {
    dispatch(load_movie(false));
  }
};

export const getListMoview = (filter: any) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(filter_search(filter));
      const resp = await getListMovieSearch(filter, dispatch);
      const {Response} = resp;
      if (Response === 'True') {
        const {Search, totalResults} = resp;
        dispatch(
          list_movie({
            Search: Search,
            totalResults: totalResults,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const nextPageMoview = () => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getstate: Function,
  ) => {
    try {
      const pro = getstate();
      const {Search} = pro.movie.listMovie;
      const filter = pro.movie.filter;
      const filterNew = {
        ...filter,
        page: filter.page + 1,
      };
      const resp = await getListMovieSearch(filterNew, dispatch);
      const {Response} = resp;
      if (Response === 'True') {
        const respSe = resp.Search;
        dispatch(filter_search(filterNew));
        dispatch(
          list_movie({
            Search: [...Search, ...respSe],
            totalResults: resp.totalResults,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
};
