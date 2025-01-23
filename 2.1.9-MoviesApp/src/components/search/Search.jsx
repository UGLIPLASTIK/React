import './search.scss';
import { func, object, arrayOf, bool } from 'prop-types';
import { Component } from 'react';

class Search extends Component {
  render() {
    const { inputOnChangeFn, show, toggleFn } = this.props;

    return (
      <section className="search">
        <div className="search_btn-group">
          <button id="search" onClick={toggleFn} className="mode-btn active">
            Search
          </button>
          <button id="rated" onClick={toggleFn} className="mode-btn">
            Rated
          </button>
        </div>
        <input
          style={{ display: show ? 'block' : 'none' }}
          id="search-input"
          onChange={inputOnChangeFn}
          type="text"
          placeholder="Type to search..."
        />
      </section>
    );
  }
}

Search.propTypes = {
  toggleFn: func,
  inputOnChangeFn: func,
  findList: arrayOf(object),
  searching: bool,
  show: bool,
};

export default Search;
