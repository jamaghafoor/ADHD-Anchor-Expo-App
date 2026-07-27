import { StyleSheet, Text, View } from 'react-native';

export default function TodoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F5EE',
  },
  text: {
    fontSize: 20,
    color: '#111',
  },
});
