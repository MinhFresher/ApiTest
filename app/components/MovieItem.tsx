import { View, Text, Button, StyleSheet } from 'react-native';
import { Movie } from '../types/type';
import { styles } from '../styles/styles';

type MovieItemProps = {
  movie: Movie;
  setEditingMovie: (id: number | null) => void;
  setName: (value: string) => void;
  setLanguage: (value: string) => void;
  setRating: (value: string) => void;
  setGenre: (value: string) => void;
  setImageUrl: (value: string) => void;
  setDuration: (value: string) => void;
  deleteMovie: (id: number) => void;
  getMovieDetails: (id: number) => void;
};

export default function MovieItem({
  movie, setEditingMovie, setName, setLanguage, setRating, setGenre, setImageUrl, setDuration, deleteMovie, getMovieDetails,
}: MovieItemProps) {
  return (
    <View style={styles.movie}>
      <Text style={styles.movieTitle}>{movie.name || 'Untitled Movie'}</Text>
      <Text style={styles.movieDetail}>Language: {movie.language || 'Null'}</Text>
      <Text style={styles.movieDetail}>Rating: {movie.rating !== null ? movie.rating : 'Not rated'}</Text>
      <Text style={styles.movieDetail}>Genre: {movie.genre || 'Null'}</Text>
      <Text style={styles.movieDetail}>Duration: {movie.duration || 'Null'}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Edit"
            onPress={() => {
              setEditingMovie(movie.id);
              setName(movie.name || '');
              setLanguage(movie.language || '');
              setRating(movie.rating?.toString() || '');
              setGenre(movie.genre || '');
              setImageUrl(movie.imageUrl || '');
              setDuration(movie.duration || '');
            }}
          />
          <Button title="Detail" onPress={() => getMovieDetails(movie.id)} />
        </View>
        <Button title="Delete" onPress={() => deleteMovie(movie.id)} />
      </View>
    </View>
  );
}