import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
  FlatList,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {useData, useDebounce} from '../../hooks';
import {calculateAspectRatioFit, CalImg} from '../../helpers/calResize';
import ItemMovie from '../components/ItemMovie';
import Filter from '../components/Filter';
import NotFound from '../components/NotFound';
import {PropsItemMovie} from '../../utils/navegation/movieScreen';
import {
  getListMoview,
  nextPageMoview,
  filter_view,
} from '../../store/movieReducer/movie.actions';
import {setError} from '../../store/errorReducer/errors.actios';
import {PropsMovie} from '../../utils/storeProp';
import {initSearch} from '../../utils/initSearch';

const deviceWidth = Dimensions.get('window').width;

const widthCube = deviceWidth / 3;
const claImg = CalImg(widthCube, {h: 465, w: 300});

const tamanio = calculateAspectRatioFit({
  srcWidth: 300,
  srcHeight: 465,
  maxWidth: claImg.calWidth,
  maxHeight: claImg.calHeight,
  orientation: 0,
});

const ListMovie = (props: PropsItemMovie) => {
  const dispatch = useDispatch();
  const {filterView, listMovie, loadMovie, notFound} = useSelector(
    (state: PropsMovie) => state.movie,
  );
  const {navigation} = props;
  const respData = useData(async () => {
    await dispatch(getListMoview(initSearch));
  });

  const {loadData} = respData;
  const {Search} = listMovie;

  const renderItem = (itemMovie: any) => {
    return (
      <ItemMovie
        tamanio={tamanio}
        navigation={navigation}
        item={itemMovie.item}
      />
    );
  };

  const handleReached = () => {
    dispatch(nextPageMoview());
  };

  const [executedFunction, cancelDebounce] = useDebounce((data: any) => {
    dispatch(getListMoview({...initSearch, ...data}));
  }, 1000);

  const handleSearch = (text: string) => {
    try {
      cancelDebounce();
      if (text) {
        executedFunction({s: text});
      } else {
        executedFunction(initSearch);
      }
    } catch (error) {
      cancelDebounce();
      dispatch(
        setError({
          title: '!Oh oh',
          desp: 'an unexpected error occurred. Reload the app and try again',
          type: 'err',
        }),
      );
    }
  };

  const toggleModal = () => {
    dispatch(filter_view(!filterView));
  };

  if (notFound) {
    console.log(notFound);
  }

  return (
    <SafeAreaView style={styles.conteList}>
      <View style={styles.filter}>
        <View style={styles.conteInpu}>
          <TextInput
            style={styles.input}
            onChangeText={handleSearch}
            placeholder="Buscar"
          />
          <TouchableOpacity activeOpacity={0.5} onPress={toggleModal}>
            <AntDesign
              style={styles.iconFiltre}
              name="filter"
              size={25}
              color="#f0f0f2"
            />
          </TouchableOpacity>
        </View>
      </View>
      {loadData ? (
        <Text>Load</Text>
      ) : (
        <FlatList
          data={Search}
          onEndReached={handleReached}
          onEndReachedThreshold={0}
          horizontal={false}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={item => `${item.imdbID}-${new Date().getTime}`}
          ListFooterComponent={
            <>
              {loadMovie && (
                <View style={styles.load}>
                  <ActivityIndicator size="large" color="#2d2d8c" />
                </View>
              )}
            </>
          }
        />
      )}
      {!Search?.length && !loadData && <NotFound notFound={notFound} />}
      <Filter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conteList: {
    marginBottom: 70,
  },
  conteInpu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0,
    elevation: 2,
    borderRadius: 5,
    fontWeight: 'bold',
    color: '#10101A',
    backgroundColor: '#f0f0f2',
    flexGrow: 1,
  },
  iconFiltre: {
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 15,
  },
  filter: {
    width: '100%',
    backgroundColor: '#10101A',
    elevation: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'column',
  },
  load: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    zIndex: 4,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  conteModal: {
    backgroundColor: '#f0f0f2',
    width: deviceWidth,
    paddingBottom: 15,
  },
});

export default ListMovie;
