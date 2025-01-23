import './search.scss';
import { func, object, arrayOf, bool } from 'prop-types';

const Search = ({ inputOnChangeFn }) => {
  return (
    <section className="search">
      <div className="search_btn-group">
        <button className="active">Search</button>
        <button>Rated</button>
      </div>
      <input id="search-input" onChange={inputOnChangeFn} type="text" placeholder="Type to search..." />
    </section>
  );
};

Search.propTypes = {
  inputOnChangeFn: func,
  findList: arrayOf(object),
  searching: bool,
};

export default Search;
