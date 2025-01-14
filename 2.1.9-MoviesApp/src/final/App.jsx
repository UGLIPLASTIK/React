import './App.scss';
import { getMovieDB, getGenres, findMovie } from '../tmdb-services/tmdb';
import { useEffect, useState } from 'react';
import { Card, Image, Button, Flex, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import Search from '../components/search';

function App() {
  const [data, setData] = useState(false);
  const [genres, setGenres] = useState(null);
  const [onError, setOnError] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [searching, setSearching] = useState(false);
  const posterSize = 'w300';

  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data.genres);
    });
    getMovieDB()
      .then((data) => {
        setData(data.results);
      })
      .catch((err) => {
        setOnError(true);
        console.log('Error Detected: ' + err);
      });
  }, []);

  const styles = {
    card: {
      width: 450,
      boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
    },
    image: {
      width: '180px',
    },
    button: {
      fontSize: '12px',
      height: '20px',
    },
    flex: {
      height: '100vh',
    },
    rating: (rating) => {
      return {
        borderColor:
          rating >= 7 ? 'rgb(109 186 109)' : rating < 7 && rating >= 5 ? 'rgba(233, 209, 0, 1)' : 'rgb(222 75 75)',
      };
    },
  };

  const getGenresForMovie = (id, genresArr = []) => {
    return genresArr.find((g) => id == g.id).name;
  };

  const cropText = (text) => {
    const maxSimbols = 190;
    const result = text.split(' ').reduce(
      (acc, el) => {
        if (acc.skip) return acc;
        if ((acc.text + el).length > maxSimbols - 3) {
          acc.text += '...';
          acc.skip = true;
        }
        if (!acc.skip) {
          acc.text += el + ' ';
        }
        return acc;
      },
      { skip: false, text: '' }
    );
    return result.text;
  };

  function debounce(func, ms) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
  }

  const startSearching = debounce((event) => {
    const searchWord = event.target.value.trim();
    if (!searchWord) return;
    setSearching(true);
    findMovie(searchWord).then((data) => {
      data.results.length ? setSearchedMovies(data.results) : 0;
    });
  }, 3000);

  const closeSearchList = (e) => {
    if (searching && e.target.id != 'search-input') setSearching(false);
  };

  if (!data && !onError)
    return (
      <Flex align="center" justify="center" style={styles.flex}>
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 80,
              }}
              spin
            />
          }
        />
      </Flex>
    );

  if (!data && onError)
    return (
      <Alert message="Request is temporarily unavailable, please try again later" type="warning" closable={false} />
    );

  return (
    <div onClick={closeSearchList} className="App">
      <Search findList={searchedMovies} inputOnChangeFn={startSearching} searching={searching} />
      <section className="card-list">
        {data.slice(0, 6).map((movie) => {
          return (
            <div key={movie.id} className="App">
              <Card className="card" bordered={false} loading={false} style={styles.card}>
                <div className="rating" style={styles.rating(movie.vote_average)}>
                  {movie.vote_average.toFixed(1)}
                </div>
                <div className="card-content">
                  <Image
                    width={200}
                    src={`https://image.tmdb.org/t/p/${posterSize}${movie.poster_path}`}
                    style={styles.image}
                  />
                  <div className="movie-info">
                    <h2>{movie.original_title}</h2>
                    <span className="relise-date">{format(movie.release_date, 'MMMM dd, yyyy')}</span>
                    <div className="janre-btns-group">
                      {movie.genre_ids.map((id, i) => {
                        if (i <= 2) {
                          return (
                            <Button
                              key={movie.id + id}
                              color="default"
                              variant="outlined"
                              size="small"
                              style={styles.button}
                            >
                              {getGenresForMovie(id, genres)}
                            </Button>
                          );
                        } else return;
                      })}
                    </div>
                    <p>{cropText(movie.overview)}</p>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default App;
