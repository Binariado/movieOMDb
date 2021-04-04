import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import SectionFilter from '../components/SectionFilter';
import {
  filter_view,
  getListMoview,
} from '../../store/movieReducer/movie.actions';
import {initSearch} from '../../utils/initSearch';
import {PropsMovie} from '../../utils/storeProp';

const deviceWidth = Dimensions.get('window').width;

const minOffset = 0;
const maxOffset = 60;

const fullYears = () => {
  const thisYear = new Date().getFullYear();
  const options = [];

  for (let i = minOffset; i <= maxOffset; i++) {
    const year = thisYear - i;
    options.push(year.toString());
  }
  return options;
};

const chipYear = fullYears();

const Filter = () => {
  const dispatch = useDispatch();
  const {filterView, filter} = useSelector((state: PropsMovie) => state.movie);

  const toggleModal = () => {
    dispatch(filter_view(!filterView));
  };

  const handelClear = () => {
    dispatch(getListMoview(initSearch));
  };

  const chipType = ['movie', 'series', 'episode'];

  return (
    <Modal
      backdropOpacity={0}
      style={styles.modal}
      onBackdropPress={toggleModal}
      scrollOffset={1}
      isVisible={filterView}>
      <View style={styles.conteModal}>
        <View style={styles.clearFilter}>
          <TouchableOpacity style={styles.btnFilter} onPress={handelClear}>
            <MaterialIcons size={20} name={'clear'} />
            <Text> Reset filter</Text>
          </TouchableOpacity>
        </View>
        <SectionFilter
          filter={filter}
          typeFilter={'y'}
          title={'Years'}
          data={chipYear}
          bgColog={'#10101A'}
        />
        <SectionFilter
          filter={filter}
          typeFilter={'type'}
          title={'Type'}
          data={chipType}
          bgColog={'#10101A'}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  clearFilter: {
    width: '100%',
    paddingRight: 15,
    padding: 8,
  },
  btnFilter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  conteModal: {
    backgroundColor: '#f0f0f2',
    width: deviceWidth,
    paddingBottom: 15,
    elevation: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Filter;
