import FinishedTaskCard from '../FinishedTaskCard/FinishedTaskCard';
import {FlatList, StyleSheet, Text} from 'react-native';

const FinishedTaskSection: React.FC = () => {
  const renderItem = () => {
    return <FinishedTaskCard />;
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

export default FinishedTaskSection;

const styles = StyleSheet.create({
  container: {paddingHorizontal: '4%', paddingBottom: 100},
});
