import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";

import RoutesPath from "./RoutesPath";
import HomePage from "../containers/home/Home";
import { Voice } from "../containers/voice/Voice";
import { TestChat } from "../containers/test-chat/TestChat";
import AboutPerson from "../containers/about-person/AboutPerson";
import ChatPage from "../containers/chat-ui/ChatPage";
import AvatarProfile from "../containers/avatar-profile/AvatarProfile";
import AddPerson from "../containers/add-person/AddPerson";
import ToDoPage from '../containers/to-do/ToDoPage';

const Layout = () => {
  return (
    <div className="flex justify-center bg-slate-300 h-[100vh] items-start">
      <Router>
        <Routes>
          <Route path={RoutesPath.HOME} element={<HomePage name={"Kurian"}/>} />
          <Route path={RoutesPath.VOICE} element={<Voice />} />
          <Route path={RoutesPath.TEST} element={<TestChat />} />
          <Route
            path={RoutesPath.ALL}
            element={<Navigate to={RoutesPath.HOME} replace />}
          />
          <Route path={RoutesPath.ADD_PERSON} element={<AddPerson />} />

          <Route path={RoutesPath.ABOUT} element={<AboutPerson />} />
          <Route path={RoutesPath.CHAT} element={<ChatPage />} />
          <Route path={RoutesPath.PROFILE} element={<AvatarProfile />} />
          <Route path={RoutesPath.GAME} element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Layout;
