import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {PropsItemMovie} from '../../utils/navegation/movieScreen';

const ItemMovie = ({tamanio, item, navigation}: PropsItemMovie) => {
  const handleViewInfo = () => {
    navigation.navigate('Moview', {imdbID: item.imdbID});
  };

  const styleItem = {
    width: tamanio.width,
    height: tamanio.height,
    padding: 3,
  };

  return (
    <View style={styleItem}>
      <TouchableOpacity activeOpacity={0.5} onPress={handleViewInfo}>
        <Image source={{uri: item.Poster}} style={styles.posterImg} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  posterImg: {
    width: 'auto',
    height: '100%',
    borderRadius: 5,
  },
});

export default ItemMovie;
