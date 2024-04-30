import Moive from "./component/Movie";
import { dummy } from "./movieDummy";

function App() {
  return (
    <div>
      <div className="app-container">
        {dummy.results.map((movie) => {
          return <Moive movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
