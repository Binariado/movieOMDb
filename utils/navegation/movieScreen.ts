import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Moview: {imdbID: string};
};

export type MoviewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Moview'
>;

export type PropsItemMovie = {
  navigation: MoviewScreenNavigationProp;
  item: {
    Poster: string;
    imdbID: string;
  };
};
