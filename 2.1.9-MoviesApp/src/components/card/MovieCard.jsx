import { Card, Image, Button, Rate } from 'antd';

import { Component } from 'react';
import './movie-card.scss';
import { func, object } from 'prop-types';
import { format } from 'date-fns';
import { GenresConsumer } from '../../app-context';

class MovieCard extends Component {
  state = {
    descriptionSize: null,
  };
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
    rating: (rating) => {
      return {
        borderColor:
          rating < 3
            ? '#E90000'
            : rating >= 3 && rating < 5
              ? '#E97E00'
              : rating >= 5 && rating <= 7
                ? '#E9D100'
                : '#66E900',
      };
    },
  };
  posterSize = 'w300';

  setRef = (ref) => {
    this.ref = ref;
  };

  componentDidMount() {
    this.setState({ descriptionSize: this.ref.clientHeight });
  }

  cropText = (text, size) => {
    const maxSimbols = size + 30;
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

  getGenresForMovie = (id, genresArr = []) => {
    return genresArr.find((g) => (g ? id == g.id : null)).name;
  };

  render() {
    const { card, image, button, rating } = this.styles;
    const { descriptionSize } = this.state;
    const { movie, movieRatingOnchange } = this.props;
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
              <GenresConsumer>
                {(genres) => (
                  <div className="janre-btns-group">
                    {movie.genre_ids.map((id, i) => {
                      if (i <= 2) {
                        return (
                          <Button key={movie.id + id} color="default" variant="outlined" size="small" style={button}>
                            {this.getGenresForMovie(id, genres)}
                          </Button>
                        );
                      } else return;
                    })}
                  </div>
                )}
              </GenresConsumer>
              <p ref={this.setRef}>
                <span className="card-anotation" style={{ display: 'block' }}>
                  {this.cropText(movie.overview, descriptionSize)}
                </span>
              </p>
              <Rate
                allowHalf
                defaultValue={movie.rating ? movie.rating : 0}
                count={10}
                style={{ fontSize: '15px' }}
                onChange={(value) => {
                  movieRatingOnchange(value, movie.id);
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: object,
  movieRatingOnchange: func,
};

export default MovieCard;
