import LoadingNextPage from 'components/LoadingNextPage/LoadingNextPage';
import MyTaskCard from '../MyTaskCard/MyTaskCard';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {DataItemTask, Pagination} from 'types/tasks.types';
import {FlatList, StyleSheet, Text} from 'react-native';
import {theme} from 'utils';
import {useRef, useState} from 'react';
import {WINDOW_WIDTH} from 'utils/mixins';

type TaskState = 'Pengantaran' | 'Pengembalian';

const MyTaskSection: React.FC = () => {
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

  const renderItem = () => {
    return <MyTaskCard status={1} item={{} as any} />;
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
    <FlatList
      contentContainerStyle={styles.container}
      data={[1, 2, 3]}
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
  );
};

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
