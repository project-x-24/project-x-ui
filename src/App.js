import { RecoilRoot } from "recoil";
import "./styles/global.css";
import Layout from "./routes";

import './styles/global.css';

function App() {
  return (
      <RecoilRoot>
        <Layout />
      </RecoilRoot>
  );
}

export default App;
