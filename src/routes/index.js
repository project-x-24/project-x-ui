import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import RoutesPath from './RoutesPath';
import HomePage from '../containers/home/Home';
import { Voice } from '../containers/voice/Voice';
import AboutPerson from '../containers/about-person/AboutPerson';

const Layout = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutesPath.HOME} element={<HomePage />} />
          <Route
            path={RoutesPath.ALL}
            element={<Navigate to={RoutesPath.HOME} replace />}
          />
        </Routes>
      </Router>
  );
};

export default Layout;
