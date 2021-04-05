import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import {Dimen} from '../../helpers/help';
import {calculateAspectRatioFit} from '../../helpers/calResize';
import {getListMoview} from '../../store/movieReducer/movie.actions';
import {initSearch} from '../../utils/initSearch';

const {width, height} = Dimen;

const tamanio = calculateAspectRatioFit({
  srcWidth: width,
  srcHeight: height,
  maxWidth: width,
  maxHeight: height,
  orientation: 0,
});

const NotFound = (props: any) => {
  const dispatch = useDispatch();
  const {s} = useSelector((state: any) => state.movie.filter);
  const {notFound} = props;

  const handleReset = () => {
    dispatch(getListMoview(initSearch));
  };

  return (
    <View>
      <View style={styles.notFound}>
        {/* <Octicons size={16} name={'telescope'} /> */}
        <View style={styles.posterNotFound}>
          <View style={styles.bgConte}>
            <Text style={styles.icon}>
              <Octicons size={100} name={'telescope'} color="#10101A" />
            </Text>
            <Text style={styles.text}>{notFound}</Text>
            <Text style={styles.desc}>
              No se encontraron datos con tu busqueda
              <Text style={styles.search}>{` ${s}`}</Text>
            </Text>
            <View style={styles.btnBack}>
              <Button
                labelStyle={styles.back}
                mode="text"
                color="#7272e0"
                onPress={handleReset}>
                Volver
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#50505c',
  },
  desc: {
    fontSize: 20,
    textAlign: 'center',
    color: '#50505c',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  search: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#50505c',
  },
  icon: {
    textAlign: 'center',
    marginVertical: 40,
  },
  btnBack: {
    marginVertical: 20,
    alignContent: 'center',
    zIndex: 1,
  },
  back: {
    fontSize: 18,
  },
  notFound: {
    width: tamanio.width,
    height: tamanio.height,
  },
  posterImg: {
    width: '100%',
    height: '100%',
  },
  posterNotFound: {
    flex: 1,
    height: '100%',
  },
  bgConte: {
    width: '100%',
    height: '100%',
  },
});

export default NotFound;
