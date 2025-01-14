import { arrayOf, bool, object } from 'prop-types';
import './search-dropdown.scss';
import { Component } from 'react';

class SearchDropdown extends Component {
  render() {
    const { filtredList, searching } = this.props;

    if (filtredList && searching) {
      return (
        <ul className="dropdown">
          {filtredList.map((el, i) => {
            if (i < 6) return <li key={i}>{el.title}</li>;
            return null;
          })}
        </ul>
      );
    }

    return null;
  }
}

SearchDropdown.propTypes = {
  filtredList: arrayOf(object),
  searching: bool,
};

export default SearchDropdown;
