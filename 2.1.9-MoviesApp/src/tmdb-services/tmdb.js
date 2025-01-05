export default getMovieDB = async () => {
  const url = 'https://api.themoviedb.org/3/configuration';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWVlOWUzZTA5MzdlZWIxYjQ3OTk0MGQ1ZGEyNzMwYyIsIm5iZiI6MTczNjAyNjcxNy4zMTYsInN1YiI6IjY3NzlhYTVkMjVlMGU5MWM1Nzc0ZDNjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPlhuy5po1_EoG4I8ioOUGrGfKkYVzY6i5BXJNOTYhw'
    }
  };
  const request = await fetch(url, options);
  const res = request.json();
  console.log(request);
  console.log(res);
  
}