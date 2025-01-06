export const getMovieDB = async () => {
  const url =
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWVlOWUzZTA5MzdlZWIxYjQ3OTk0MGQ1ZGEyNzMwYyIsIm5iZiI6MTczNjAyNjcxNy4zMTYsInN1YiI6IjY3NzlhYTVkMjVlMGU5MWM1Nzc0ZDNjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPlhuy5po1_EoG4I8ioOUGrGfKkYVzY6i5BXJNOTYhw',
    },
  };
  const response = await fetch(url, options);
  return response.ok ? response.json() : new Error('Произошла ошибка');
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
  return response.ok ? response.json() : new Error('Произошло фиаско');
};

