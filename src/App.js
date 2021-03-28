import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Router from './util/Router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './util/Store';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './util/types';
import { getUserData } from './redux/actions/userActions';

function App(props) {

  const token = localStorage.cache;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch({ type: SET_UNAUTHENTICATED });
      window.location.href = '/';
      window.localStorage.clear()
    } else {
      store.dispatch({ type: SET_AUTHENTICATED })
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      store.dispatch(getUserData());
    }
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="main-content">
          <Navbar />
          <Router />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
