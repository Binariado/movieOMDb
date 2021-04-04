import {
  LIST_MOVIE,
  SELECT_MOVIE,
  FILTER,
  LOAD_MOVIE,
  FILTER_VIEW,
  NOT_FOUND,
} from './movie.types';
// import {PropsAction} from '../../utils/storeProp';

type Props = {
  listMovie: Object;
  selectMovie: Object;
  filter: {
    y: string;
    s: string;
    page: number;
  };
  loadMovie: boolean;
  filterView: boolean;
  notFound: any;
};

const INITIAL_STATE: Props = {
  listMovie: [],
  selectMovie: {},
  filter: {
    y: '2020',
    s: 'love',
    page: 1,
  },
  filterView: false,
  loadMovie: false,
  notFound: null,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LIST_MOVIE:
      return {
        ...state,
        listMovie: action.payload,
      };
    case SELECT_MOVIE:
      return {
        ...state,
        selectMovie: action.payload,
      };
    case FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case FILTER_VIEW:
      return {
        ...state,
        filterView: action.payload,
      };
    case LOAD_MOVIE:
      return {
        ...state,
        loadMovie: action.payload,
      };
    case NOT_FOUND:
      return {
        ...state,
        notFound: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
