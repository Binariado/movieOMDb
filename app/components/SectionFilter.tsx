import React from 'react';
import {useDispatch} from 'react-redux';
import _ from 'lodash';
import {StyleSheet, View, ScrollView, Dimensions, Text} from 'react-native';
import {List, Chip} from 'react-native-paper';
import {useDebounce} from '../../hooks';
import {setError} from '../../store/errorReducer/errors.actios';
import {getListMoview} from '../../store/movieReducer/movie.actions';

const deviceHeight = Dimensions.get('window').height;

type PropsSec = {
  title: string;
  data: Array<string>;
  filter: Object;
  typeFilter: string;
  bgColog: string;
};

interface Props extends PropsSec {
  select: any;
}

interface PropTitle extends Props {
  expanded: boolean;
}

const ListItem = ({data, bgColog, select, filter, typeFilter}: Props) => {
  const [value, setValue] = React.useState(select);
  const dispatch = useDispatch();
  const styleChip = {
    ...styles.chip,
  };

  const styleChipActive = {
    ...styles.chip,
    backgroundColor: bgColog,
  };

  const [executedFunction, cancelDebounce] = useDebounce((dataFil: object) => {
    dispatch(getListMoview({...filter, ...dataFil, page: 1}));
  }, 100);

  const handleSearch = (text: string) => {
    try {
      cancelDebounce();
      if (text) {
        setValue(text);
        executedFunction({[typeFilter]: text});
      }
    } catch (error) {
      cancelDebounce();
      dispatch(
        setError({
          title: '!Oh oh',
          desp: 'an unexpected error occurred. Reload the app and try again',
          type: 'err',
        }),
      );
    }
  };

  return (
    <View style={styles.conteItem}>
      <View style={styles.chipType}>
        {data.map((item: string, idx: number) => (
          <Chip
            selectedColor={value === item ? '#f0f0f2' : '#10101A'}
            style={value === item ? styleChipActive : styleChip}
            key={idx}
            onPress={() => handleSearch(item)}>
            {item}
          </Chip>
        ))}
      </View>
    </View>
  );
};

const TitleAcordion = ({select, title, bgColog, expanded}: PropTitle) => {
  const styleChipActive = {
    ...styles.chip,
    backgroundColor: bgColog,
  };

  //const select = _.find(filter, (item: string, key) => key === typeFilter);

  return (
    <View style={styles.conteTitleAcor}>
      <Text style={styles.tSection}>{title}</Text>
      {select && !expanded && (
        <Chip selectedColor={'#f0f0f2'} style={styleChipActive}>
          {select}
        </Chip>
      )}
    </View>
  );
};

const SectionFilter = (props: PropsSec) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);
  const {data, title, filter, typeFilter} = props;
  const countChip = data.length;
  const select = _.find(filter, (item: string, key) => key === typeFilter);

  return (
    <List.Section>
      {countChip > 20 ? (
        <List.Accordion
          expanded={expanded}
          onPress={handlePress}
          title={
            <TitleAcordion {...props} expanded={expanded} select={select} />
          }>
          <ScrollView style={styles.scroll}>
            <ListItem {...props} select={select} />
          </ScrollView>
        </List.Accordion>
      ) : (
        <>
          <List.Subheader style={styles.tSection}>{title}</List.Subheader>
          <ListItem {...props} select={select} />
        </>
      )}
    </List.Section>
  );
};

const styles = StyleSheet.create({
  tSection: {
    color: '#10101A',
    fontWeight: '500',
    fontSize: 16,
  },
  conteTitleAcor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  conteItem: {
    flexGrow: 1,
  },
  scroll: {
    maxHeight: deviceHeight / 3,
  },
  chipType: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  chip: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 2,
    marginVertical: 2,
    // justifyContent: 'space-around',
  },
});

export default SectionFilter;
