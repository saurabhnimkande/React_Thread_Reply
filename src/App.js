import "./App.css";
import { Comment } from "./components/Comment";
import { useSelector } from "react-redux";
function App() {
  const { data } = useSelector((state) => ({
    data: state.data,
  }));
  return (
    <div className="App">
      <Comment data={data}></Comment>
    </div>
  );
}

export default App;
