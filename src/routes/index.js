import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import RoutesPath from './RoutesPath';
import HomePage from '../containers/home/Home';
import { Voice } from '../containers/voice/Voice';
import { TestChat } from '../containers/test-chat/TestChat';
import AboutPerson from '../containers/about-person/AboutPerson';
import ChatPage from '../components/chat-ui/ChatPage';

const Layout = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutesPath.HOME} element={<HomePage />} />
        <Route path={RoutesPath.VOICE} element={<Voice />} />
        <Route path={RoutesPath.TEST} element={<TestChat />} />
        <Route
          path={RoutesPath.ALL}
          element={<Navigate to={RoutesPath.HOME} replace />}
        />
        <Route path={RoutesPath.ABOUT} element={<AboutPerson />} />
        <Route path={RoutesPath.CHAT} element={<ChatPage />} />

      </Routes>
    </Router>
  );
};

export default Layout;
