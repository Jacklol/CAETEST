import * as React from 'react';
import { Button,TextInput, View } from 'react-native';
import { AuthContext } from '../constants/index'
import { ActivityIndicator, StyleSheet } from 'react-native';
export function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setisLoading] = React.useState(false);

  const { signIn } = React.useContext(AuthContext);

  function fakesigning() {
    setisLoading(true);
    
    setTimeout(() => {
      setisLoading(false);
      signIn({ username, password })
    }, 1000);

  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator color="#0000ff" />
        </View>
      ) : (
        <>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Sign in" onPress={() => fakesigning()} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
