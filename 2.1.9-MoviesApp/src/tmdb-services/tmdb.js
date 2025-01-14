export const getMovieDB = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWVlOWUzZTA5MzdlZWIxYjQ3OTk0MGQ1ZGEyNzMwYyIsIm5iZiI6MTczNjAyNjcxNy4zMTYsInN1YiI6IjY3NzlhYTVkMjVlMGU5MWM1Nzc0ZDNjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPlhuy5po1_EoG4I8ioOUGrGfKkYVzY6i5BXJNOTYhw',
    },
  };
  const response = await fetch(url, options);
  return response.ok ? response.json() : Error('Ошибка при получении данных: ' + response.statusText);
};

export const findMovie = async (query, page = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWVlOWUzZTA5MzdlZWIxYjQ3OTk0MGQ1ZGEyNzMwYyIsIm5iZiI6MTczNjAyNjcxNy4zMTYsInN1YiI6IjY3NzlhYTVkMjVlMGU5MWM1Nzc0ZDNjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPlhuy5po1_EoG4I8ioOUGrGfKkYVzY6i5BXJNOTYhw',
    },
  };
  const response = await fetch(url, options);
  return response.ok ? response.json() : Error('Ошибка при получении данных: ' + response.statusText);
};

export const getGenres = async () => {
  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWVlOWUzZTA5MzdlZWIxYjQ3OTk0MGQ1ZGEyNzMwYyIsIm5iZiI6MTczNjAyNjcxNy4zMTYsInN1YiI6IjY3NzlhYTVkMjVlMGU5MWM1Nzc0ZDNjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPlhuy5po1_EoG4I8ioOUGrGfKkYVzY6i5BXJNOTYhw',
    },
  };
  const response = await fetch(url, options);
  return response.ok ? response.json() : Error('Ошибка при получении данных: ' + response.statusText);
};
