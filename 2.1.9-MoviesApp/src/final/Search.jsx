import './search.scss';
import SearchDropdown from '../search-dropdown';
import { func, object, arrayOf, bool } from 'prop-types';

const Search = ({ inputOnChangeFn, findList, searching }) => {
  return (
    <section className="search">
      <div className="search_btn-group">
        <button className="active">Search</button>
        <button>Rated</button>
      </div>
      <input id="search-input" onChange={inputOnChangeFn} type="text" placeholder="Type to search..." />
      <SearchDropdown searching={searching} filtredList={findList} />
    </section>
  );
};

Search.propTypes = {
  inputOnChangeFn: func,
  findList: arrayOf(object),
  searching: bool,
};

export default Search;
