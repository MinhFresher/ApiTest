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

interface Error{

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

  const login = async () => {
    const credentials = [
      { email: 'mark@email.com', passwordKey: 'password', password: 'User2#4509' },
    ]
    for (const cred of credentials) {
      try{
        const body = {
          email: cred.email, 
          [cred.passwordKey]: cred.password
        }
        const response = await fetch ('http://exceit20122-001-site1.qtempurl.com/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        })
        const responseText = await response.text();
        console.log('Response: ', responseText)
        if (!response.ok){
          throw new Error(`Login failed with: ${response.status}: ${responseText}`)
        }
        const data = JSON.parse(responseText);
        setToken(data.access_token);
        Alert.alert('Success', 'Logged in successful')
      }catch(error){
        console.log(`Login attempt with ${cred.email}, ${cred.passwordKey} failed: ${error.message}`);
      }
    }
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
      <Button title="Login" onPress={login} />
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
  }
});