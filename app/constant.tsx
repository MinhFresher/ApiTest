export const API_URLS = {
  LOGIN: 'http://exceit20122-001-site1.qtempurl.com/api/users/login',
  MOVIES: 'http://exceit20122-001-site1.qtempurl.com/api/movies/',
  MOVIE_DETAILS: (id: number) => `http://exceit20122-001-site1.qtempurl.com/api/movies/MovieDetail/${id}`,
};