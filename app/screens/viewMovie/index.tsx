import React from 'react';
import {useDispatch} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {api} from '../../../api';
import {useData} from '../../../hooks';
import {calculateAspectRatioFit, CalImg} from '../../../helpers/calResize';
import {setError} from '../../../store/errorReducer/errors.actios';

const {width, height} = Dimensions.get('window');

const widthOne = width / 1;
const claImg = CalImg(widthOne, {h: 465, w: 300});

const tamanio = calculateAspectRatioFit({
  srcWidth: 300,
  srcHeight: 465,
  maxWidth: claImg.calWidth,
  maxHeight: claImg.calHeight,
  orientation: 0,
});

type Props = {
  Moview: {
    imdbID: string;
  };
};

const ViewMovie = () => {
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<Props, 'Moview'>>();

  const respData = useData(async () => {
    try {
      const resp = await api.searchMoview({
        i: route.params.imdbID,
      });
      const {Response} = resp;
      if (Response === 'True') {
        return resp;
      }
      return {};
    } catch (error) {
      dispatch(
        setError({
          title: '!Oh oh',
          desp: 'an unexpected error occurred. Reload the app and try again',
          type: 'err',
        }),
      );
    }
  }, {});

  const {data, loadData} = respData;

  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {loadData ? (
          <Text>Load</Text>
        ) : (
          <View style={styles.contePoster}>
            <View style={styles.poster}>
              <Image source={{uri: data.Poster}} style={styles.posterImg} />
            </View>
            <View style={styles.contentDesp}>
              <View style={styles.capaDesp}>
                <Text style={styles.title}>{data.Title}</Text>
                <Text style={styles.apost}>
                  {`${data.Genre} ??? ${data.Year} ??? ${data.Runtime}`}
                </Text>
              </View>
              <View style={styles.capaDesp}>
                <View style={styles.score}>
                  <Text style={styles.imdbRating}>
                    <AntDesign size={16} name={'star'} /> {data.imdbRating}
                  </Text>
                  <View style={styles.metasC}>
                    <Text style={styles.metascore}>
                      {`idmb ${data.Metascore}`}
                    </Text>
                  </View>
                  <View style={styles.imdbV}>
                    <Text style={styles.imdbVotes}>
                      <AntDesign size={16} name={'like1'} />
                      {`${data.imdbVotes}`}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.capaDesp}>
                <Text style={styles.plotTitle}>PLot Summary:</Text>
                <Text style={styles.plot}>{`${data.Plot}`}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  contentDesp: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex: 2,
  },
  content: {
    width: '100%',
    height: height / 3,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#10101A',
  },
  capaDesp: {
    width: '100%',
    flexDirection: 'column',
    paddingVertical: 5,
  },
  score: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#10101A',
  },
  apost: {
    fontSize: 14,
    color: '#50505c',
  },
  plotTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#10101A',
  },
  plot: {
    fontSize: 16,
    color: '#50505c',
  },
  imdbRating: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FCBD1A',
  },
  metasC: {
    backgroundColor: '#FCBD1A',
    paddingHorizontal: 10,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  metascore: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  imdbV: {
    backgroundColor: '#7272e0',
    paddingHorizontal: 10,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  imdbVotes: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  posterImg: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    resizeMode: 'contain',
  },
  contePoster: {
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  poster: {
    width: tamanio.width,
    height: tamanio.height,
    elevation: 10,
  },
});

export default ViewMovie;
