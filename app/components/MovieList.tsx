import { FlatList, View } from 'react-native';
import { Movie } from '../types/type';
import MovieItem from './MovieItem';

type MovieListProps = {
  movies: Movie[];
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

export default function MovieList({
  movies, setEditingMovie, setName, setLanguage, setRating, setGenre, setImageUrl, setDuration, deleteMovie, getMovieDetails,
}: MovieListProps) {
  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieItem
          movie={item}
          setEditingMovie={setEditingMovie}
          setName={setName}
          setLanguage={setLanguage}
          setRating={setRating}
          setGenre={setGenre}
          setImageUrl={setImageUrl}
          setDuration={setDuration}
          deleteMovie={deleteMovie}
          getMovieDetails={getMovieDetails}
        />
      )}
    />
  );
}