import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "components/layouts/header";
import MemoBlock from "components/memoBlock";

function App() {
  return (
    <div className="App">
      <Header />
      <MemoBlock />
    </div>
  );
}

export default App;
