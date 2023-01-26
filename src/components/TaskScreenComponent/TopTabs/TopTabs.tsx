import {rowCenter} from 'utils/mixins';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from 'utils';
import {useState} from 'react';

type TaskState = 'Tugas Saya' | 'Tugas Selesai';
type TabList = {
  id: number;
  title: TaskState;
};
type TopTabsProps = {
  onChangeTab: (val: TaskState) => void;
};

const tabList: TabList[] = [
  {
    id: 1,
    title: 'Tugas Saya',
  },
  {
    id: 2,
    title: 'Tugas Selesai',
  },
];

const TopTabs: React.FC<TopTabsProps> = ({onChangeTab}) => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <View style={[rowCenter, {padding: 16, justifyContent: 'space-between'}]}>
      {tabList.map((tab, i) => (
        <TouchableOpacity
          key={i}
          style={selected === i ? styles.activeButton : styles.inactiveButton}
          onPress={() => {
            setSelected(i);
            onChangeTab(tab.title);
          }}>
          <Text
            style={selected === i ? styles.activeText : styles.inactiveText}>
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TopTabs;

const styles = StyleSheet.create({
  activeButton: {
    backgroundColor: theme.colors.navy,
    width: '48%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveButton: {
    backgroundColor: theme.colors.white,
    width: '48%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  inactiveText: {
    fontSize: 12,
    color: '#B5B5B5',
    fontWeight: 'bold',
  },
});
