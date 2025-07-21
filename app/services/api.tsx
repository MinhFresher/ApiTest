import { Alert } from 'react-native';
import { Movie } from '../types/type'

export const fetchMovies = async (setMovies: (movies: Movie[]) => void) => {
  try {
    const response = await fetch('http://exceit20122-001-site1.qtempurl.com/api/movies/AllMovies');
    const data = await response.json();
    setMovies(data);
  } catch (error) {
    Alert.alert('Error', 'Failed to fetch movies');
  }
};

export const createMovie = async (
  token: string | null,
  movieData: Partial<Movie>,
  setMovies: (movies: Movie[]) => void,
  clearInput: () => void
) => {
  if (!token) {
    Alert.alert('Error', 'Please login first');
    return;
  }
  if (!movieData.name || !movieData.language || !movieData.rating || !movieData.genre || !movieData.imageUrl || !movieData.duration) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }
  try {
    const formData = new URLSearchParams();
    formData.append('name', movieData.name);
    formData.append('language', movieData.language);
    formData.append('rating', movieData.rating.toString());
    formData.append('genre', movieData.genre);
    formData.append('imageUrl', movieData.imageUrl);
    formData.append('duration', movieData.duration);

    const response = await fetch('http://exceit20122-001-site1.qtempurl.com/api/movies/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: formData.toString(),
    });
    console.log(`Create movie: Status ${response.status}`);
    const responseText = await response.text();
    console.log('Response:', responseText);
    if (!response.ok) {
      throw new Error(`Failed to create movie ${response.status}: ${responseText}`);
    }
    await fetchMovies(setMovies);
    clearInput();
    Alert.alert('Success', 'Movie created');
  } catch (error: any) {
    Alert.alert('Error', `Failed to create movie: ${error.message}`);
  }
};

export const updateMovie = async (
  id: number,
  token: string | null,
  movieData: Partial<Movie>,
  setMovies: (movies: Movie[]) => void,
  clearInput: () => void,
  setEditingMovie: (id: number | null) => void
) => {
  if (!token) {
    Alert.alert('Error', 'Please login first');
    return;
  }
  if (!movieData.name || !movieData.language || !movieData.rating || !movieData.genre || !movieData.imageUrl || !movieData.duration) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }
  try {
    const formData = new URLSearchParams();
    formData.append('name', movieData.name);
    formData.append('language', movieData.language);
    formData.append('rating', movieData.rating.toString());
    formData.append('genre', movieData.genre);
    formData.append('imageUrl', movieData.imageUrl);
    formData.append('duration', movieData.duration);

    const response = await fetch(`http://exceit20122-001-site1.qtempurl.com/api/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: formData.toString(),
    });
    console.log(`Update movie status: ${response.status}`);
    const responseText = await response.text();
    console.log(`Response: ${response.status}: ${responseText}`);
    if (!response.ok) {
      throw new Error(`Failed to update movie ${response.status}: ${responseText}`);
    }
    await fetchMovies(setMovies);
    clearInput();
    setEditingMovie(null);
    Alert.alert('Success', 'Movie updated!');
  } catch (error: any) {
    Alert.alert('Error', `Failed to update movie: ${error.message}`);
  }
};

export const deleteMovie = async (id: number, token: string | null, setMovies: (movies: Movie[]) => void) => {
  if (!token) {
    Alert.alert('Error', 'Please login first!');
    return;
  }
  try {
    const response = await fetch(`http://exceit20122-001-site1.qtempurl.com/api/movies/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Delete movie status: ${response.status}`);
    const responseText = await response.text();
    console.log('Response: ', responseText);
    if (!response.ok) {
      throw new Error(`Failed to delete movie ${response.status}: ${responseText}`);
    }
    await fetchMovies(setMovies);
    Alert.alert('Success', 'Movie deleted');
  } catch (error: any) {
    Alert.alert('Error', `Failed to delete movie: ${error.message}`);
  }
};

export const getMovieDetails = async (id: number, token: string | null, setSelectedMovie: (movie: Movie | null) => void) => {
  if (!token) {
    Alert.alert('Error', 'Please login first');
    return;
  }
  try {
    const response = await fetch(`http://exceit20122-001-site1.qtempurl.com/api/movies/MovieDetail/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Get movie details: Status ${response.status}`);
    const responseText = await response.text();
    console.log('Response:', responseText);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details ${response.status}: ${responseText}`);
    }
    const data = JSON.parse(responseText);
    setSelectedMovie(data);
  } catch (error: any) {
    Alert.alert('Error', `Failed to fetch movie details: ${error.message}`);
  }
};