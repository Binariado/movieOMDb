import _ from 'lodash';
import {Dimensions} from 'react-native';

export const Dimen = Dimensions.get('window');

const ran = _.random(0, 2);

const urlAvatar = [
  require('../asset/avatar-0.png'),
  require('../asset/avatar-1.png'),
  require('../asset/avatar-2.png'),
];

export const avatarDefault = urlAvatar[ran];
