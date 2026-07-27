import { StyleSheet, Text, View } from 'react-native';

export default function GuideScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Guide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5EDE0',
  },
  text: {
    fontSize: 20,
    color: '#111',
  },
});
