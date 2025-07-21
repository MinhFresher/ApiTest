import { Alert } from 'react-native';

export const login = async (
  email: string,
  password: string,
  setToken: (token: string | null) => void,
  setShowLoginForm: (show: boolean) => void,
  setLoginEmail: (email: string) => void,
  setLoginPassword: (password: string) => void
) => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter both Email & password');
    return;
  }

  const passwordKeys = ['password', 'Password'];
  for (const passwordKey of passwordKeys) {
    try {
      const body = { email, [passwordKey]: password };
      const response = await fetch('http://exceit20122-001-site1.qtempurl.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(`Login attempt with ${email}, ${passwordKey}: Status ${response.status}`);
      const responseText = await response.text();
      console.log('Response: ', responseText);
      if (!response.ok) {
        throw new Error(`Login failed with: ${response.status}: ${responseText}`);
      }
      const data = JSON.parse(responseText);
      setToken(data.access_token);
      setShowLoginForm(false);
      setLoginEmail('');
      setLoginPassword('');
      Alert.alert('Success', 'Logged in successfully');
      return;
    } catch (error: any) {
      console.log(`Login failed: ${error.message}`);
    }
  }
  Alert.alert('Error', 'Failed to login with provided credentials');
};