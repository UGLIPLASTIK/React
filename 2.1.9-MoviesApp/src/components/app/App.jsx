import './App.scss';
import {
  getMovieDB,
  getGenres,
  findMovie,
  startGuestSession,
  addRating,
  getRatedMovies,
} from '../../tmdb-services/tmdb';
import { Component } from 'react';
import { Alert } from 'antd';
import Search from '../search';
import CardList from '../card-list';
import { GenresProvider } from '../../app-context';

class App extends Component {
  state = {
    data: null,
    ratedData: [],
    genres: [],
    onError: false,
    searching: false,
    searchingWord: null,
    currentPage: 1,
    totalPages: null,
    guestSessionId: null,
    loading: true,
    showSearching: true,
  };

  componentDidMount() {
    this.setState({ loading: true });

    const guestSessionPromise =
      sessionStorage.getItem('guest_session_id') && sessionStorage.getItem('guest_session_id') != 'undefined'
        ? Promise.resolve({ guest_session_id: sessionStorage.getItem('guest_session_id') })
        : startGuestSession();
    const genresPromise = getGenres();
    const moviesPromise = getMovieDB(this.state.currentPage);

    Promise.all([guestSessionPromise, genresPromise, moviesPromise])
      .then(([guestSessionData, genresData, moviesData]) => {
        this.setState({
          guestSessionId: guestSessionData.guest_session_id,
          genres: genresData.genres,
          totalPages: moviesData.total_results,
          data: moviesData.results,
          loading: false,
        });
        if (!sessionStorage.getItem('guest_session_id'))
          sessionStorage.setItem('guest_session_id', guestSessionData.guest_session_id);
      })
      .catch((err) => {
        console.log(`Error Detected: ${err}`);
        this.setState({ onError: true, loading: false });
      });
  }

  tooglePage = (page) => {
    const { searching, searchingWord } = this.state;
    const fetchData = searching ? findMovie(searchingWord, page) : getMovieDB(page);
    this.setState({ loading: true });
    fetchData
      .then((data) => {
        this.setState({
          data: data.results,
          currentPage: page,
          onError: false,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ onError: true });
        console.error('Error Detected: ', err);
      });
  };

  swichMode = (e) => {
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach((btn) => btn.classList.remove('active'));
    e.target.classList.add('active');
    this.setState({ loading: true });
    if (e.target.id == 'rated') {
      getRatedMovies(this.state.guestSessionId).then((data) => {
        this.setState({ ratedData: data.results, totalPages: data.total_results, searching: false, loading: false });
      });
    } else {
      getMovieDB().then((data) => {
        this.setState({ data: data.results, totalPages: data.total_results, loading: false });
      });
    }
    this.setState({ showSearching: e.target.id == 'search' ? true : false });
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

    this.setState({
      currentPage: 1,
      searching: true,
      loading: true,
      searchingWord: searchWord,
    });
    findMovie(searchWord)
      .then((data) => {
        this.setState({
          totalPages: data.total_results,
          data: data.results,
          loading: false,
          searchingWord: null,
        });
      })
      .catch((error) => {
        console.error('Ошибка при поиске:', error);
        this.setState({ searching: false });
      });
  }, 2000);

  setMovieRating = (value, id) => {
    const { guestSessionId } = this.state;
    addRating(id, guestSessionId, value);
  };

  render() {
    if (!navigator.onLine) {
      alert('Нет соединения с интернетом. Пожалуйста, проверьте ваше подключение.');
      return;
    }
    const { data, genres, onError, currentPage, totalPages, loading, showSearching, ratedData } = this.state;
    const dataFromMode = showSearching ? data : ratedData;

    if (!data && onError)
      return (
        <Alert message="Request is temporarily unavailable, please try again later" type="warning" closable={false} />
      );

    return (
      <div className="App">
        <GenresProvider value={genres}>
          <Search show={showSearching} inputOnChangeFn={this.startSearching} toggleFn={this.swichMode} />
          <CardList
            loading={loading}
            movieRatingOnchange={this.setMovieRating}
            data={dataFromMode}
            currentPage={currentPage}
            totalPages={totalPages}
            tooglePage={this.tooglePage}
          />
        </GenresProvider>
      </div>
    );
  }
}
export default App;
