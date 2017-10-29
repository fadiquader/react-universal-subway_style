import Home from './containers/Home';
import { fetchData } from './containers/Home/action';
import NotFound from './containers/NotFound';
import User from './pages/User';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
    loadData: dispatch => Promise.all([
      dispatch(fetchData()),
    ]),
  }, {
    path: '/user/:id',
    component: User,
    loadData: dispatch => Promise.all([
      dispatch(fetchData()),
    ]),
  },
  {
    path: '*',
    component: NotFound,
  },
];
