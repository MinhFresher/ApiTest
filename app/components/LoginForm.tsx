import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';

type LoginFormProps = {
  showLoginForm: boolean;
  loginEmail: string;
  loginPassword: string;
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
  setShowLoginForm: (show: boolean) => void;
  login: () => void;
};

export default function LoginForm({
  showLoginForm, loginEmail, loginPassword, setLoginEmail, setLoginPassword, setShowLoginForm, login,
}: LoginFormProps) {
  if (!showLoginForm) return null;

  return (
    <View style={styles.loginForm}>
      <Text style={styles.formHeader}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={loginEmail}
        onChangeText={setLoginEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={loginPassword}
        onChangeText={setLoginPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={login} />
        <Button title="Cancel" onPress={() => setShowLoginForm(false)} />
      </View>
    </View>
  );
}