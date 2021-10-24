import Home from "./Home";
import { store } from "../src/modules/index";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Home></Home>
      </Provider>
    </div>
  );
}

export default App;
