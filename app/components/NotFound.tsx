import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Dimen} from '../../helpers/help';
import {calculateAspectRatioFit, CalImg} from '../../helpers/calResize';

const {width, height} = Dimen;

const widthOne = width / 1;
const claImg = CalImg(widthOne, {h: height, w: width});

const tamanio = calculateAspectRatioFit({
  srcWidth: 300,
  srcHeight: 465,
  maxWidth: claImg.calWidth,
  maxHeight: claImg.calHeight,
  orientation: 0,
});

const url =
  'https://res.cloudinary.com/dfcqfoabr/image/upload/v1617533681/samples/not_found_tklhvp.png';

const NotFound = (props: any) => {
  const {notFound} = props;
  return (
    <View style={styles.contePoster}>
      <View style={styles.notFound}>
        <ImageBackground source={{uri: url}} style={styles.posterImg}>
          <Text style={styles.text}>{notFound}</Text>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  notFound: {
    width: tamanio.width,
    height: tamanio.height,
    resizeMode: 'contain',
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
});

export default NotFound;
