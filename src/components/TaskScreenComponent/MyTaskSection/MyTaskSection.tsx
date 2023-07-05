import {theme} from 'utils';
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
import {useCallback, useMemo, useRef, useState} from 'react';
import {h1} from 'utils/styles';
import BottomSheet from '@gorhom/bottom-sheet';
import {ic_checkblue, ic_filter} from 'assets/icons';

type TaskState = 'Pengantaran' | 'Pengembalian';
type TabList = {
  id: number;
  title: TaskState;
};

const MyTaskSection: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderItem = () => {
    return <MyTaskCard status={selected} />;
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => bottomSheetRef.current?.snapToIndex(0)}
        style={[rowCenter, {marginLeft: 20, marginTop: 20}]}>
        <Text style={[h1, {marginRight: 5, color: theme.colors.navy}]}>
          Filter
        </Text>
        <Image source={ic_filter} style={iconCustomSize(14)} />
      </TouchableOpacity>

      <FlatList
        contentContainerStyle={styles.container}
        data={[...Array(6).fill(1)]}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={{alignSelf: 'center', marginTop: '50%'}}>
            Belum ada tugas
          </Text>
        )}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={true}
        containerStyle={
          {
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text style={[h1, {fontSize: 20}]}>Filter Berdasarkan</Text>

          <Text style={[h1, {fontSize: 15, marginTop: 20, marginBottom: 10}]}>
            Sort
          </Text>

          {SORT.map((x, i) => (
            <View
              key={`index_${i}`}
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginBottom: 10},
              ]}>
              <Text>{x}</Text>

              <Image source={ic_checkblue} style={iconSize} />
            </View>
          ))}

          <Text style={[h1, {fontSize: 15, marginTop: 20, marginBottom: 10}]}>
            Jobdesk
          </Text>

          {JOBDESK.map((x, i) => (
            <View
              key={`index_${i}`}
              style={[
                rowCenter,
                {justifyContent: 'space-between', marginBottom: 10},
              ]}>
              <Text>{x}</Text>

              <Image source={ic_checkblue} style={iconSize} />
            </View>
          ))}
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
  contentContainer: {
    flex: 1,
    margin: 20,
    // alignItems: 'center',
  },
});
