import {ic_no_task} from 'assets/icons';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {theme} from 'utils';

type DataNotFoundProps = {
  isLoading: boolean;
};

const DataNotFound = ({isLoading}: DataNotFoundProps) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.navy} />
      ) : (
        <>
          <Image
            source={ic_no_task}
            style={{width: 150, height: 150, marginBottom: 20}}
          />
          <Text>Belum ada tugas</Text>
        </>
      )}
    </View>
  );
};

export default DataNotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
