import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {api} from '../../api';
import {useData} from '../../hooks';
import {calculateAspectRatioFit} from '../../helpers/calResize';

const {width} = Dimensions.get('window');

const widthCube = width / 3;
const calWidth = widthCube > 300 ? 300 : widthCube;
const calHeight = (465 / 100) * ((calWidth * 100) / 300);

const tamanio = calculateAspectRatioFit({
  srcWidth: 300,
  srcHeight: 465,
  maxWidth: calWidth,
  maxHeight: calHeight,
  orientation: 0,
});

const ListMovie = () => {
  const [list, setList] = React.useState({
    Search: [],
    totalResults: 0,
  });

  const respData = useData(async () => {
    const resp = await api.searchMoview({
      i: 'tt3896198',
      apikey: '5eec5adc',
      s: 'love',
    });
    const {Response, Search, totalResults} = resp;
    if (Response === 'True') {
      setList({
        Search: Search,
        totalResults: totalResults,
      });
    }
  });

  const {loadData} = respData;

  return (
    <View style={styles.container}>
      <Text>Init Project</Text>
      {loadData ? (
        <Text>Init Project</Text>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.contePoster}>
            {list.Search.map((item: any, idx: number) => (
              <TouchableOpacity
                key={`poster-${idx}`}
                style={styles.poster}
                activeOpacity={0.5}>
                <Image source={{uri: item.Poster}} style={styles.posterImg} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 50,
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
