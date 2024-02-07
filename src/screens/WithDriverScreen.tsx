import appBar from 'components/AppBar/AppBar';
import hoc from 'components/hoc';
import React, {useEffect} from 'react';
import {h1, h3} from 'utils/styles';
import {ic_arrow_left_white, ic_progress} from 'assets/icons';
import {iconCustomSize, rowCenter} from 'utils/mixins';
import {theme} from 'utils';
import {useNavigation} from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const WithDriverScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: (
          <TouchableOpacity
            style={rowCenter}
            onPress={() => navigation.goBack()}>
            <Image
              source={ic_arrow_left_white}
              style={{
                height: 20,
                width: 20,
                marginLeft: 16,
              }}
            />
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>
              Dengan Supir
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  const renderItem = () => {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.cardWrapper}>
          <View style={styles.cardHeader}>
            <View style={styles.taskWrapper}>
              <Text style={styles.taskIdTitle}>Task ID : </Text>
              <Text style={styles.text}>GR02547896</Text>
            </View>

            <View style={styles.progressWrapper}>
              <Image source={ic_progress} style={iconCustomSize(14)} />
              <Text style={[styles.text, {marginLeft: 4}]}>1 of 4</Text>
            </View>
          </View>

          <Text style={styles.text}>Kevin Sanjaya | Suzuki Ertiga</Text>
          <Text style={styles.date}>01 Jul 2022 - 03 Jul 2022</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={[1, 2, 3]}
      renderItem={renderItem}
    />
  );
};

export default hoc(WithDriverScreen, theme.colors.navy, false, 'light-content');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardWrapper: {
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIdTitle: {
    ...h3,
    color: theme.colors.black,
    fontSize: 12,
  },
  text: {
    color: theme.colors.black,
    fontSize: 12,
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: theme.colors.grey1,
    fontSize: 12,
    marginTop: 8,
  },
});
