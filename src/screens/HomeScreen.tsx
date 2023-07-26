import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  WINDOW_HEIGHT,
  boxShadow,
  container,
  iconCustomSize,
  iconSize,
  rowCenter,
} from 'utils/mixins';
import {
  ic_calendar,
  ic_car,
  ic_check,
  ic_checkblue,
  ic_filter,
  ic_main_icon,
  ic_pinpoin,
  ic_radio_button,
  ic_selected_radio_button,
  ic_uncheckblue,
} from 'assets/icons';
import {deepClone, theme} from 'utils';
import Button from 'components/Button';
import {useHelperStore} from 'store/actions/helpersStore';
import {IHelpers} from 'types/store.types';
import {showToast} from 'utils/Toast';
import {h1, h3} from 'utils/styles';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import CardAntarMobil from 'components/Cards/CardAntarMobil';
import CardAmbilMobil from 'components/Cards/CardAmbilMobil';
import CardParkirMobil from 'components/Cards/CardParkirMobil';
import CustomBackdrop from 'components/CustomBackdrop';
import {DataItemTask, Pagination} from 'types/tasks.types';
import {getTasks} from 'store/effects/taskStore';
import LoadingNextPage from 'components/LoadingNextPage/LoadingNextPage';

const HomeScreen = () => {
  const helpers = useHelperStore() as IHelpers;
  const [selected, setSelected] = useState<number>(0);
  const navigation = useNavigation();
  const [changebg, setChangebg] = useState(true);
  const [tasks, setTasks] = useState<DataItemTask[]>([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    page: 1,
    // next_page: 1,
    // prev_page: 1,
    // total: 2,
    // total_page: 1,
  });

  const [sorting, setSorting] = useState(0);
  const [jobdesk, setJobdesk] = useState<number[]>([0, 1, 2]);

  // useEffect(() => {
  //   console.log('lerprs = ', helpers.isShowToast);
  // }, [helpers.isShowToast]);
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      setChangebg(true);
    } else {
      setChangebg(false);
    }
  }, []);

  useEffect(() => {
    _getTasks()
    return () => {};
  }, []);

  const _getTasks = async () => {
    setLoader(true);
    let res = await getTasks({
      courier_id: 1,
      limit: pagination.limit,
      page: pagination.page,
      task_status: 'PICKED',
    });
    console.log('res = ', res);
    setTasks(res?.data);
    setPagination(res?.pagination);
    setLoader(false);
  };

  const handleMore = () => {
    if (
      pagination.page < (pagination?.total_page || 0) &&
      !loader
    ) {
      setRefresh(true);
      _getTasks();
      setRefresh(false);
    }
  };

  const handleRefresh = () => {
    setRefresh(true);
    setPagination({
      limit: 10,
      page: 1
    });
    setRefresh(false);
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 16, backgroundColor: '#fff'}}>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <View style={rowCenter}>
            <Image source={ic_main_icon} style={iconCustomSize(45)} />
            <Text style={styles.textName}>Driver</Text>
          </View>
          <Text style={[styles.textName, {}]}>Halo, Driver</Text>
        </View>
      </View>

      <View
        style={[
          rowCenter,
          {
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 20,
          },
        ]}>
        <Text style={[h1, {marginRight: 5, color: theme.colors.navy}]}>
          Tugas Driver
        </Text>

        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.snapToIndex(0)}
          style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text style={[h1, {marginRight: 5, color: theme.colors.navy}]}>
            Filter
          </Text>
          <Image source={ic_filter} style={iconCustomSize(14)} />
        </TouchableOpacity>
      </View>
      <View style={{margin: 16}}>
        {/* <FlatList
          // data={[]}
          data={['Antar', 'Ambil', 'Parkir']}
          renderItem={({item}) => (
            <>
              {item === 'Antar' && <CardAntarMobil />}
              {item === 'Ambil' && <CardAmbilMobil />}
              {item === 'Parkir' && <CardParkirMobil />}
            </>
          )}
          ListEmptyComponent={() => (
            <Text style={{alignSelf: 'center', marginTop: '50%'}}>
              Belum ada tugas
            </Text>
          )}
          keyExtractor={(x, i) => i.toString()}
          ListFooterComponent={() => <View style={{marginBottom: 120}} />}
        /> */}
        <FlatList
          // contentContainerStyle={styles.listContainer}
          data={tasks?.length > 0 ? tasks : []}
          renderItem={({item}) => <CardAntarMobil item={item} />}
          keyExtractor={(x, i) => i.toString()}
          ListFooterComponent={<LoadingNextPage loading={loader} />}
          // onEndReached={() => {
          //   return handleMore();
          // }}
          refreshing={refresh}
          onRefresh={() => {
            return handleRefresh();
          }}
        />
      </View>
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={true}
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}> */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        containerStyle={
          {
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }
        // in
        index={-1}
        // backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', }}
        enablePanDownToClose={true}
        backdropComponent={backdropProps => (
          <CustomBackdrop
            {...backdropProps}
            disappearsOnIndex={-1}
            enableTouchThrough={true}
            pressBehavior={'close'}
          />
        )}
        backgroundStyle={{backgroundColor: theme.colors.white}}
        handleStyle={{marginBottom: 8, marginTop: 4}}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.75,
          shadowRadius: 24,

          elevation: 24,
        }}>
        <View style={styles.contentContainer}>
          <Text style={[h1, {fontSize: 20}]}>Filter Berdasarkan</Text>

          <Text style={[h1, {fontSize: 15, marginTop: 20, marginBottom: 10}]}>
            Sort
          </Text>

          {SORT.map((x, i) => (
            <TouchableOpacity
              key={`index_${i}`}
              onPress={() => setSorting(i)}
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginBottom: 10},
              ]}>
              <Text>{x}</Text>

              <Image
                source={
                  sorting === i ? ic_selected_radio_button : ic_radio_button
                }
                style={iconSize}
              />
            </TouchableOpacity>
          ))}

          <Text style={[h1, {fontSize: 15, marginTop: 20, marginBottom: 10}]}>
            Jobdesk
          </Text>

          {JOBDESK.map((x, i) => (
            <TouchableOpacity
              key={`index_${i}`}
              onPress={() => {
                let _ = deepClone(jobdesk);
                let idx = jobdesk.findIndex(y => y === i);
                if (idx === -1) {
                  _.push(i);
                } else {
                  _.splice(idx, 1);
                }
                setJobdesk(_);
                console.log('_ = ', _);
              }}
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginBottom: 10},
              ]}>
              <Text>{x}</Text>

              <Image
                source={
                  jobdesk.filter(z => z === i)?.length === 1
                    ? ic_checkblue
                    : ic_uncheckblue
                }
                style={iconSize}
              />
            </TouchableOpacity>
          ))}

          <Button
            _theme="navy"
            title={'Konfirmasi'}
            onPress={() => {
              if (bottomSheetRef?.current) bottomSheetRef?.current.close();
            }}
            styleWrapper={{marginTop: 10}}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const SORT = ['Paling Baru', 'Paling Lama'];
const JOBDESK = ['Antar Mobil', 'Antar Mobil', 'Parkir ke Garasi'];

export default HomeScreen;

const styles = StyleSheet.create({
  textName: {
    fontSize: 18,
    color: theme.colors.navy,
    fontWeight: '700',
    marginLeft: 10,
  },
  rightIcon: {
    height: 45,
    width: 45,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
  },
  container: {backgroundColor: '#F5F6FA', flex: 1, zIndex: 99},
  activeButton: {
    backgroundColor: theme.colors.white,
    width: '33.3%',
    padding: 12,
    alignItems: 'center',
    borderBottomColor: theme.colors.navy,
    borderBottomWidth: 2,
    // borderRadius: 20,
  },
  activeText: {
    fontSize: 12,
    color: theme.colors.navy,
    fontWeight: 'bold',
  },

  inactiveButton: {
    backgroundColor: theme.colors.white,
    width: '33.3%',
    padding: 12,
    alignItems: 'center',
    borderBottomColor: theme.colors.white,
    borderBottomWidth: 2,
    // borderRadius: 20,
  },
  inactiveText: {
    fontSize: 12,
    color: '#B5B5B5',
    fontWeight: '500',
  },
  textOrderId: {fontSize: 12, fontWeight: 'bold'},
  textTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#A8A8A8',
  },
  textLocation: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
    marginTop: 8,
  },
  lineVertical: {
    height: 25,
    width: 1,
    marginLeft: 20,
    marginVertical: 5,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'dotted',
  },
  lineHorizontal: {
    // height: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 30,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'dotted',
  },
  cardWrapper: {
    backgroundColor: '#fff',
    marginVertical: 20,
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
  textComment: {
    color: '#A8A8A8',
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 20,
  },
  container2: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    margin: 20,

    // alignItems: 'center',
  },
});
