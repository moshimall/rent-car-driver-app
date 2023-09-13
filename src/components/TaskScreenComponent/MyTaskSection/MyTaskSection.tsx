import {deepClone, theme} from 'utils';
import {iconCustomSize, iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import MyTaskCard from '../MyTaskCard/MyTaskCard';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {h1} from 'utils/styles';
import BottomSheet, {BottomSheetModal} from '@gorhom/bottom-sheet';
import {
  ic_checkblue,
  ic_filter,
  ic_radio_button,
  ic_selected_radio_button,
  ic_uncheckblue,
} from 'assets/icons';
import Button from 'components/Button';
import CustomBackdrop from 'components/CustomBackdrop';
import {DataItemTask, Pagination} from 'types/tasks.types';
import LoadingNextPage from 'components/LoadingNextPage/LoadingNextPage';
import { getTasks } from 'store/effects/taskStore';

type TaskState = 'Pengantaran' | 'Pengembalian';
type TabList = {
  id: number;
  title: TaskState;
};

const MyTaskSection: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const [sorting, setSorting] = useState(0);
  const [jobdesk, setJobdesk] = useState<number[]>([0, 1, 2]);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [tasks, setTasks] = useState<DataItemTask[]>([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    page: 1,
  });
  // variables
  const snapPoints = useMemo(() => ['60%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderItem = ({item}) => {
    return <MyTaskCard status={1} item={item} />;
  };

  useEffect(() => {
    _getTasks();
    return () => {};
  }, []);

  const _getTasks = async () => {
    setLoader(true);
    let param = {
      courier_id: 1,
      limit: pagination?.limit || 0,
      page: pagination.page,
    };
    const VALUE = ['IN_GARAGE'];
    let _: any = [];
    jobdesk?.map((x, i) => {
      _.push(VALUE[x]);
    });
    param['task_status'] = _;

    console.log('jobdesk = ', param);
    let res = await getTasks(param);
    console.log('res = ', res);
    setTasks(res?.data || []);
    setPagination(res?.pagination);
    setLoader(false);
  };

  const handleFilter = async () => {
    _getTasks();
  };

  const handleMore = () => {
    if (pagination.page < (pagination?.total_page || 0) && !loader) {
      setRefresh(true);
      _getTasks();
      setRefresh(false);
    }
  };

  const handleRefresh = () => {
    setRefresh(true);
    setPagination({
      limit: 10,
      page: 1,
    });
    setRefresh(false);
  };

  return (
    <>
      {/* <TouchableOpacity
        onPress={() => bottomSheetRef.current?.snapToIndex(0)}
        style={[rowCenter, {marginLeft: 20, marginTop: 20}]}>
        <Text style={[h1, {marginRight: 5, color: theme.colors.navy}]}>
          Filter
        </Text>
        <Image source={ic_filter} style={iconCustomSize(14)} />
      </TouchableOpacity> */}

      <FlatList
        contentContainerStyle={styles.container}
        data={[...tasks]}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={{alignSelf: 'center', marginTop: '50%'}}>
            Belum ada tugas
          </Text>
        )}
        ListFooterComponent={<LoadingNextPage loading={loader} />}
        refreshing={refresh}
        onRefresh={() => {
          return handleRefresh();
        }}
      />

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
              <Text style={styles.text}>{x}</Text>

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
              <Text style={styles.text}>{x}</Text>

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
    </>
  );
};

const SORT = ['Paling Baru', 'Paling Lama'];
const JOBDESK = ['Antar Mobil', 'Antar Mobil', 'Parkir ke Garasi'];

export default MyTaskSection;

const styles = StyleSheet.create({
  container: {paddingHorizontal: '4%', paddingBottom: 100},
  activeTab: {
    height: 50,
    width: WINDOW_WIDTH / 2,
    backgroundColor: theme.colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTab: {
    height: 50,
    width: WINDOW_WIDTH / 2,
    backgroundColor: '#ddf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {color: '#fff', fontSize: 13, fontWeight: '700'},
  inactiveText: {color: theme.colors.navy, fontSize: 13, fontWeight: '500'},
  text: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: theme.colors.black,
  },
  contentContainer: {
    flex: 1,
    margin: 20,
  },
});
