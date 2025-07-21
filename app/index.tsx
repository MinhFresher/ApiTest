import { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles/styles';
import { Movie } from './types/type';
import { fetchMovies, createMovie, updateMovie, deleteMovie, getMovieDetails } from './services/api';
import { login } from './services/auth';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import LoginForm from './components/LoginForm';
import MovieDetailsModal from './components/MovieDetail';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [editingMovie, setEditingMovie] = useState<number | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const clearInput = () => {
    setName('');
    setLanguage('');
    setRating('');
    setGenre('');
    setImageUrl('');
    setDuration('');
  };

  useEffect(() => {
    fetchMovies(setMovies);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Simple CRUD API</Text>
      {token ? (
        <Text style={styles.loggedInText}>Logged in successfully</Text>
      ) : (
        <Button title="Login" onPress={() => setShowLoginForm(true)} />
      )}
      <LoginForm
        showLoginForm={showLoginForm}
        loginEmail={loginEmail}
        loginPassword={loginPassword}
        setLoginEmail={setLoginEmail}
        setLoginPassword={setLoginPassword}
        setShowLoginForm={setShowLoginForm}
        login={() => login(loginEmail, loginPassword, setToken, setShowLoginForm, setLoginEmail, setLoginPassword)}
      />
      <MovieForm
        name={name}
        language={language}
        rating={rating}
        genre={genre}
        imageUrl={imageUrl}
        duration={duration}
        setName={setName}
        setLanguage={setLanguage}
        setRating={setRating}
        setGenre={setGenre}
        setImageUrl={setImageUrl}
        setDuration={setDuration}
        editingMovie={editingMovie}
        createMovie={() => createMovie(token, { name, language, rating: parseFloat(rating), genre, imageUrl, duration }, setMovies, clearInput)}
        updateMovie={(id: number) => updateMovie(id, token, { name, language, rating: parseFloat(rating), genre, imageUrl, duration }, setMovies, clearInput, setEditingMovie)}
        clearInput={clearInput}
        setEditingMovie={setEditingMovie}
      />
      <MovieList
        movies={movies}
        setEditingMovie={setEditingMovie}
        setName={setName}
        setLanguage={setLanguage}
        setRating={setRating}
        setGenre={setGenre}
        setImageUrl={setImageUrl}
        setDuration={setDuration}
        deleteMovie={(id: number) => deleteMovie(id, token, setMovies)}
        getMovieDetails={(id: number) => getMovieDetails(id, token, setSelectedMovie)}
      />
      <MovieDetailsModal
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
      />
    </View>
  );
}