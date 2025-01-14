import { arrayOf, bool, object } from 'prop-types';
import './search-dropdown.scss';

const SearchDropdown = ({ filtredList, searching }) => {
  return (
    filtredList &&
    searching && (
      <ul className="dropdown">
        {filtredList.slice(0, 6).map((el, i) => (
          <li key={i}>{el.title}</li>
        ))}
      </ul>
    )
  );
};

SearchDropdown.propTypes = {
  filtredList: arrayOf(object),
  searching: bool,
};

export default SearchDropdown;
