import React from 'react';
import {StyleSheet, ScrollView, View, Text, Dimensions} from 'react-native';
import {api} from '../../api';
import {useData} from '../../hooks';
import {calculateAspectRatioFit, CalImg} from '../../helpers/calResize';
import ItemMovie from '../components/ItemMovie';
import {PropsItemMovie} from '../../utils/navegation/movieScreen';

const {width} = Dimensions.get('window');

const widthCube = width / 3;
const claImg = CalImg(widthCube, {h: 465, w: 300});

const tamanio = calculateAspectRatioFit({
  srcWidth: 300,
  srcHeight: 465,
  maxWidth: claImg.calWidth,
  maxHeight: claImg.calHeight,
  orientation: 0,
});

type PropsInit = {
  Search: never[];
  totalResults: number;
};

const initList: PropsInit = {
  Search: [],
  totalResults: 0,
};

const ListMovie = (props: PropsItemMovie) => {
  const {navigation} = props;
  const respData = useData(async () => {
    const resp = await api.searchMoview({
      s: 'love',
    });
    const {Response} = resp;
    if (Response === 'True') {
      return resp;
    }
    return initList;
  }, initList);

  const {loadData} = respData;
  const {Search} = respData.data;

  return (
    <View style={styles.container}>
      {loadData ? (
        <Text>Load</Text>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.contePoster}>
            {Search.map((item: any, idx: number) => (
              <View key={`poster-${idx}`} style={styles.poster}>
                <ItemMovie navigation={navigation} item={item} />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 20,
  },
  contePoster: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  poster: {
    width: tamanio.width,
    height: tamanio.height,
    padding: 3,
  },
  posterImg: {
    width: 'auto',
    height: '100%',
    borderRadius: 5,
  },
});

export default ListMovie;
