import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { Movie } from '../types/type';
import { styles } from '../styles/styles';

type MovieDetailsModalProps = {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
};

export default function MovieDetailsModal({ selectedMovie, setSelectedMovie }: MovieDetailsModalProps) {
  if (!selectedMovie) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selectedMovie}
      onRequestClose={() => setSelectedMovie(null)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Movie Details</Text>
          <Text style={styles.movieDetail}>Name: {selectedMovie.name || 'Untitled'}</Text>
          <Text style={styles.movieDetail}>Language: {selectedMovie.language || 'Null'}</Text>
          <Text style={styles.movieDetail}>Rating: {selectedMovie.rating !== null ? selectedMovie.rating : 'Not rated'}</Text>
          <Text style={styles.movieDetail}>Genre: {selectedMovie.genre || 'Null'}</Text>
          <Text style={styles.movieDetail}>Duration: {selectedMovie.duration || 'Null'}</Text>
          <Text style={styles.movieDetail}>Description: {selectedMovie.description || 'Null'}</Text>
          <Text style={styles.movieDetail}>Playing Date: {selectedMovie.playingDate || 'Null'}</Text>
          <Text style={styles.movieDetail}>Playing Time: {selectedMovie.playingTime || 'Null'}</Text>
          <Text style={styles.movieDetail}>Ticket Price: {selectedMovie.ticketPrice !== null ? selectedMovie.ticketPrice : 'Null'}</Text>
          <Text style={styles.movieDetail}>Image URL: {selectedMovie.imageUrl || 'Null'}</Text>
          <Button title="Close" onPress={() => setSelectedMovie(null)} />
        </View>
      </View>
    </Modal>
  );
}