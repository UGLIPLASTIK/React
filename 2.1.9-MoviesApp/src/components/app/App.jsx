import './App.scss';
import { getMovieDB, getGenres, findMovie } from '../../tmdb-services/tmdb';
import { Component } from 'react';
import { Card, Image, Button, Flex, Spin, Alert, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import Search from '../search';
import { array, arrayOf, bool, object } from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      genres: [],
      onError: false,
      searching: false,
      searchingWord: null,
      currentPage: 1,
      totalPages: null,
    };
  }

  styles = {
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
    pagination: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      gap: 20,
    },
  };

  posterSize = 'w300';

  componentDidMount() {
    getGenres().then((data) => {
      this.setState({
        genres: data.genres,
      });
    });

    getMovieDB(this.state.currentPage)
      .then((data) => {
        this.setState({
          totalPages: data.total_results,
          data: data.results,
        });
      })
      .catch((err) => {
        this.setState(() => {
          return {
            onError: true,
          };
        });
        console.log('Error Detected: ' + err);
      });
  }

  tooglePage = (page) => {
    const { searching, searchingWord } = this.state;
    const fetchData = searching ? findMovie(searchingWord, page) : getMovieDB(page);
    fetchData
      .then((data) => {
        this.setState({
          data: data.results,
          currentPage: page,
          onError: false,
        });
      })
      .catch((err) => {
        this.setState({
          onError: true,
        });
        console.error('Error Detected: ', err);
      });
  };

  getGenresForMovie = (id, genresArr = []) => {
    return genresArr.find((g) => (g ? id == g.id : null)).name;
  };

  cropText = (text) => {
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

  debounce(func, ms) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
  }

  startSearching = this.debounce((event) => {
    const searchWord = event.target.value.trim();
    if (!searchWord) return;
    this.setState(() => {
      return {
        currentPage: 1,
        searching: true,
        searchingWord: searchWord,
      };
    });
    findMovie(searchWord)
      .then((data) => {
        this.setState(() => {
          return {
            totalPages: data.total_results,
            data: data.results,
          };
        });
      })
      .catch((error) => {
        console.error('Ошибка при поиске:', error);
        this.setState({ searching: false });
      });
  }, 3000);

  render() {
    const { data, genres, onError, currentPage, totalPages } = this.state;

    const { card, image, button, pagination, rating, flex } = this.styles;

    if (!data && !onError)
      return (
        <Flex align="center" justify="center" style={flex}>
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
      <div className="App">
        <Search inputOnChangeFn={this.startSearching} />
        <section className="card-list">
          <Pagination
            style={pagination}
            onChange={this.tooglePage}
            defaultCurrent={currentPage}
            current={currentPage}
            total={totalPages}
            pageSize={20}
            showSizeChanger={false}
          />
          {!data.length ? (
            <Alert message="Ничего не найдено" type="warning" closable={false} />
          ) : (
            data.map((movie) => {
              return (
                <div key={movie.id} className="movie-card">
                  <Card className="card" bordered={false} loading={false} style={card}>
                    <div className="rating" style={rating(movie.vote_average)}>
                      {movie.vote_average.toFixed(1)}
                    </div>
                    <div className="card-content">
                      <Image
                        width={200}
                        src={`https://image.tmdb.org/t/p/${this.posterSize}${movie.poster_path}`}
                        style={image}
                      />
                      <div className="movie-info">
                        <h2>{movie.original_title}</h2>
                        <span className="relise-date">
                          {movie.release_date ? format(movie.release_date, 'MMMM dd, yyyy') : '---'}
                        </span>
                        <div className="janre-btns-group">
                          {movie.genre_ids.map((id, i) => {
                            if (i <= 2) {
                              return (
                                <Button
                                  key={movie.id + id}
                                  color="default"
                                  variant="outlined"
                                  size="small"
                                  style={button}
                                >
                                  {this.getGenresForMovie(id, genres)}
                                </Button>
                              );
                            } else return;
                          })}
                        </div>
                        <p>{this.cropText(movie.overview)}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })
          )}
          <Pagination
            style={pagination}
            onChange={this.tooglePage}
            defaultCurrent={currentPage}
            current={currentPage}
            total={totalPages}
            pageSize={20}
            showSizeChanger={false}
          />
        </section>
      </div>
    );
  }
}

App.propTypes = {
  data: arrayOf(object),
  genres: array,
  onError: bool,
  searching: bool,
};

export default App;
