import { 
  Text, View, StyleSheet, TextInput, Button, FlatList, Pressable,
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
  duration: string
}

export default function Index() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    try{
      const response = await fetch ('http://exceit20122-001-site1.qtempurl.com/api/movies/AllMovies')
      const data = await response.json();
      setMovies(data)
    } catch(error){
      Alert.alert('Error', 'Failed to fetch movies')
    }
  };

  const createMovie = async () =>{
    if(!name || !duration || !language || !rating || !genre || !imageUrl){
      Alert.alert('error', 'Please fill in both Title and body')
      return;
    }
    try {
      const response = await fetch ('http://exceit20122-001-site1.qtempurl.com/api/movies/AllMovies', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, body})
      });
      const newMovie = await response.json();
      setMovies([newMovie, ...movies]);
      
      Alert.alert('success', 'movie created')
    }catch (error){
      Alert.alert('error', 'Failed to create movie')
    }
  }

  useEffect(()=> {
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Simple Crud Api</Text>
      <View >

      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.post}>
            <Text style={styles.postTitle}>{item.name || 'Untitled Movie'}</Text>
            <Text style={styles.postDetail}>
              Language: {item.language || 'Null'}
            </Text>
            <Text style={styles.postDetail}>
              Rating: {item.rating !== null ? item.rating : 'Not rated'}
            </Text>
            <Text style={styles.postDetail}>
              Genre: {item.genre || 'Null'}
            </Text>
            <Text style={styles.postDetail}>
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
  post: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDetail: {
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
    
  }
});