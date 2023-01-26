import MyTaskCard from '../MyTaskCard/MyTaskCard';
import {FlatList, StyleSheet, Text} from 'react-native';

const MyTaskSection: React.FC = () => {
  const renderItem = () => {
    return <MyTaskCard />;
  };

  return (
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
  );
};

export default MyTaskSection;

const styles = StyleSheet.create({
  container: {paddingHorizontal: '4%', paddingBottom: 100},
});
