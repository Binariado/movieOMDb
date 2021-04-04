import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, Text, Button} from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {setError} from '../../store/errorReducer/errors.actios';
import {Dimen} from '../../helpers/help';

const typeAlert = {
  err: {
    icon: 'error',
    color: '#DE3F44',
  },
  war: {
    icon: 'warning',
    color: '#FCC003',
  },
  info: {
    icon: 'info',
    color: '#1881FF',
  },
};

const TYPE_CONST = {
  err: 'err',
  war: 'war',
  info: 'info',
};

const Alert = () => {
  const dispatch = useDispatch();
  const {title, desp, type} = useSelector((state: any) => state.error);
  const [alert, setAlert] = React.useState(typeAlert.info);

  React.useEffect(() => {
    const handleAlert = () => {
      switch (type) {
        case TYPE_CONST.err:
          setAlert(typeAlert.err);
          break;
        case TYPE_CONST.war:
          setAlert(typeAlert.war);
          break;
        case TYPE_CONST.info:
          setAlert(typeAlert.info);
          break;
      }
    };
    handleAlert();
  }, [alert, setAlert, type]);

  const handle = () => {
    dispatch(setError({title: '', desp: '', type: null}));
  };

  return (
    <Modal isVisible={type ? true : false}>
      <View style={styles.modalAlert}>
        <View style={styles.head}>
          <Text style={styles.title}>{title}</Text>
          <MaterialIcons size={50} name={alert.icon} color={alert.color} />
        </View>
        <View style={styles.body}>
          <Text style={styles.desp}>{desp}</Text>
        </View>
        <View style={styles.footer}>
          <Button onPress={handle} title="Aceptar" color="#2020da" />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalAlert: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    height: Dimen.height / 3.5,
    minHeight: 200,
    maxHeight: 300,
    backgroundColor: '#f0f0f2',
    flexBasis: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 22,
    paddingLeft: 10,
    paddingBottom: 15,
    fontWeight: 'bold',
    color: '#10101A',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flexGrow: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  desp: {
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: 'normal',
    color: '#10101A',
  },
});
export default Alert;
