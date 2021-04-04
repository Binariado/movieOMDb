export type PropsAction = {
  type: string;
  payload: Array<{}> | Object | string | number;
};

export type PropsMovie = {
  movie: {
    listMovie: {
      Search: Array<{imdbID: string}> | undefined;
    };
    loadMovie: boolean;
    filter: Object;
    filterView: boolean;
    notFound: any;
  };
};

export interface propsUser {
  isAuthenticate: boolean;
  detailUser: {
    name: string;
    id: string;
    avatar: any;
  };
}
