import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {PropsItemMovie} from '../../utils/navegation/movieScreen';

const ItemMovie = ({item, navigation}: PropsItemMovie) => {
  const handleViewInfo = () => {
    navigation.navigate('Moview', {imdbID: item.imdbID});
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handleViewInfo}>
      <Image source={{uri: item.Poster}} style={styles.posterImg} />
    </TouchableOpacity>
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
