import { 
  Text, View, StyleSheet, TextInput, Button, FlatList, 
  Alert
} from "react-native";
import { useState, useEffect } from 'react'

type Movie = {
  id: string,
  name: string,
  language: string,
  rating: number,
  genre: string,
  imageUrl: string,
  duration: string,
}

export default function Index() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');
  const [imageUrl, setImageUrl] = useState('')
  const [duration, setDuration] = useState('')
  const [token, setToken] = useState<string | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const login = async () => {
    if (!loginEmail || !loginPassword){
      Alert.alert('Please enter both Email & password');
      return;
    }
    const passwordKeys = ['password', 'Password'];
    for (const passwordKey of passwordKeys) {
      try{
        const body = {
          email: loginEmail,
          [passwordKey]: loginPassword
        };
        const response = await fetch ('http://exceit20122-001-site1.qtempurl.com/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        })
        console.log(`Login attempt with ${loginEmail}, ${passwordKey}: Status ${response.status}`);
        const responseText = await response.text();
        console.log('Response: ', responseText)
        if (!response.ok){
          throw new Error(`Login failed with: ${response.status}: ${responseText}`)
        }
        const data = JSON.parse(responseText);
        setToken(data.access_token);
        setShowLoginForm(false);
        setLoginEmail('');
        setLoginPassword('');
        Alert.alert('Success', 'Logged in successful');
        return;
      }catch(error: Error){
        console.log(`Login failed: ${error.message}`);
      }
    }
    Alert.alert('Error', 'Failed to login with provided credentials');
  }

  const fetchMovies = async () => {
    try{
      const response = await fetch ('http://exceit20122-001-site1.qtempurl.com/api/movies/AllMovies')
      const data = await response.json();
      setMovies(data)
    } catch(error){
      Alert.alert('Error', 'Failed to fetch movies')
    }
  };

  const createMovie = async () => {
    if(!token){
      Alert.alert('Error','Please login first')
    }
    if (!name || !language || !rating || !genre || !imageUrl || !duration){
      Alert.alert('error', 'Please fill in all fields');
      return;
    }
    try {
      const formData = new URLSearchParams();
      formData.append('name', name);
      formData.append('language',language);
      formData.append('rating', rating);
      formData.append('genre',genre);
      formData.append('imageURL',imageUrl);
      formData.append('duration',duration);

      const response = await fetch ('http://exceit20122-001-site1.qtempurl.com/api/movies/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`
        },
        body: formData.toString()
      })
      if(!response.ok) {
        throw new Error ('Failer to create movie')
      }
      const newMovie = await response.json();
      setMovies([newMovie, ...movies]);
      clearInput();
      Alert.alert('Success', 'Movie Created')
    }catch(error){
      Alert.alert('Error', `Failed to create movie: ${error.messsage}`);
    }
  }

  const clearInput = () =>{
    setName('');
    setLanguage('');
    setRating('');
    setGenre('');
    setImageUrl('');
    setDuration('');
  }

  useEffect(()=> {
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Simple Crud Api</Text>
      {token ? (
        <Text style={styles.loggedInText}>Logged in successfully</Text>
      ) : (
        <Button title="Login" onPress={() => setShowLoginForm(true)} />
      )}
      {showLoginForm && !token && (
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
      )}
      <View style={styles.inputForm}>
        <TextInput style={styles.input} placeholder="Movie name" value={name} onChangeText={setName}/>
        <TextInput style={styles.input} placeholder="Language" value={language} onChangeText={setLanguage}/>
        <TextInput style={styles.input} placeholder="Rating" value={rating} onChangeText={setRating}/>
        <TextInput style={styles.input} placeholder="Genre" value={genre} onChangeText={setGenre}/>
        <TextInput style={styles.input} placeholder="imageUrl" value={imageUrl} onChangeText={setImageUrl}/>
        <TextInput style={styles.input} placeholder="Duration" value={duration} onChangeText={setDuration}/>

        <Button title="Create Movie" onPress={createMovie}/>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.movie}>
            <Text style={styles.movieTitle}>{item.name || 'Untitled Movie'}</Text>
            <Text style={styles.movieDetail}>
              Language: {item.language || 'Null'}
            </Text>
            <Text style={styles.movieDetail}>
              Rating: {item.rating !== null ? item.rating : 'Not rated'}
            </Text>
            <Text style={styles.movieDetail}>
              Genre: {item.genre || 'Null'}
            </Text>
            <Text style={styles.movieDetail}>
              Duration: {item.duration || 'Null'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  movie: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
  inputForm: {
    marginVertical:10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  loginForm: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  formHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  loggedInText: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});