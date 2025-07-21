import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Movie } from '../types/type';
import { styles } from '../styles/styles';

type MovieFormProps = {
  name: string;
  language: string;
  rating: string;
  genre: string;
  imageUrl: string;
  duration: string;
  setName: (value: string) => void;
  setLanguage: (value: string) => void;
  setRating: (value: string) => void;
  setGenre: (value: string) => void;
  setImageUrl: (value: string) => void;
  setDuration: (value: string) => void;
  editingMovie: number | null;
  createMovie: () => void;
  updateMovie: (id: number) => void;
  clearInput: () => void;
  setEditingMovie: (id: number | null) => void;
};

export default function MovieForm({
  name, language, rating, genre, imageUrl, duration,
  setName, setLanguage, setRating, setGenre, setImageUrl, setDuration,
  editingMovie, createMovie, updateMovie, clearInput, setEditingMovie,
}: MovieFormProps) {
  return (
    <View style={styles.inputForm}>
      <TextInput
        style={styles.input}
        placeholder="Movie name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Language"
        value={language}
        onChangeText={setLanguage}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={genre}
        onChangeText={setGenre}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
      />
      <Button
        title={editingMovie ? 'Update Movie' : 'Create Movie'}
        onPress={() => (editingMovie ? updateMovie(editingMovie) : createMovie())}
      />
      {editingMovie && (
        <Button
          title="Cancel"
          onPress={() => {
            clearInput();
            setEditingMovie(null);
          }}
        />
      )}
    </View>
  );
}