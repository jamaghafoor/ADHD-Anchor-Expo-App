import { StyleSheet, Text, View } from 'react-native';

export default function SocialScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EEFF',
  },
  text: {
    fontSize: 20,
    color: '#111',
  },
});
