import './App.scss';
import { getMovieDB, getGenres } from '../../tmdb-services/tmdb';
import { useEffect, useState } from 'react';
import { Card, Image, Button } from 'antd';
import { format } from 'date-fns';

function App() {
  const [data, setData] = useState(false);
  const [genres, setGenres] = useState(null);
  const posterSize = 'w300';

  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data.genres);
    });
    getMovieDB().then((data) => {
      setData(data.results);
    });
  }, []);

  const styles = {
    card: {
      width: 450,
      // height: 280,
      boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
    },
    image: {
      width: '180px',
    },
    button: {
      fontSize: '12px',
      height: '20px',
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

  if (!data) return <div>LOADING...</div>;
  return (
    <div className="App">
      <section className="card-list">
        {data.slice(0, 6).map((movie) => {
          return (
            <div key={movie.id} className="App">
              <Card className="card" bordered={false} loading={false} style={styles.card}>
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
                      {movie.genre_ids.map((id) => (
                        <Button
                          key={movie.id + id}
                          color="default"
                          variant="outlined"
                          size="small"
                          style={styles.button}
                        >
                          {getGenresForMovie(id, genres)}
                        </Button>
                      ))}
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
