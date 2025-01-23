import { Component } from 'react';
import './card-list.scss';
import { Alert, Pagination } from 'antd';
import { array, func, number } from 'prop-types';
import MovieCard from '../card/MovieCard';

class CardList extends Component {
  styles = {
    pagination: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      gap: 20,
    },
  };
  posterSize = 'w300';

  render() {
    const { data, movieRatingOnchange, totalPages, currentPage, tooglePage } = this.props;

    return (
      <div className="card-list">
        <Pagination
          style={this.styles.pagination}
          onChange={tooglePage}
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
            return <MovieCard key={movie.id} movie={movie} movieRatingOnchange={movieRatingOnchange} />;
          })
        )}
        <Pagination
          style={this.styles.pagination}
          onChange={tooglePage}
          defaultCurrent={currentPage}
          current={currentPage}
          total={totalPages}
          pageSize={20}
          showSizeChanger={false}
        />
      </div>
    );
  }
}

CardList.propTypes = {
  data: array,
  currentPage: number,
  totalPages: number,
  tooglePage: func,
  movieRatingOnchange: func,
};

export default CardList;
