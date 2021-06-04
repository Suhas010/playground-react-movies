import { useEffect } from 'react';
import Info from '../../common/Info';
import { useMovies } from '../../context/movies';
import { ACTIONS, STATUS } from '../../utils/constants';
import { debounce } from '../../utils/helper';
import MovieList from '../movie';
import Bookmarked from '../movie/Bookmarked';
import './master.css';


const Master = () => {
  const [state, dispach] = useMovies();
  const {status, error, year} = state;
  useEffect(() => {
    const getMovies = async () => {
      dispach({type: ACTIONS.MOVIES_FETCHING})
      try {
        const { year } = state;
        let result = await fetch(
          `https://jsonmock.hackerrank.com/api/movies?Year=${year}`
        );
        let { data } = await result.json();
        console.log("Data", data);
        dispach({type: ACTIONS.MOVIES_SUCCESS, data})

      } catch (error) {
        dispach({type: ACTIONS.MOVIES_ERROR, error})
      }
    };
    debounce(getMovies, 1000)();
  }, [year])

  const handleYearChange = ({target: {value}}) => {
    dispach({type: ACTIONS.UPDATE_YEAR, year: value})
  }


  return (
    <main>
      <div className="master-container">
        <div className="movie-container">
          <form>
            <label htmlFor="year">Enter year</label>
              <input type="text" id="year" value={year} onChange={handleYearChange} />
          </form>
          <div  className="list">
            <MovieList />
          </div>
        </div>
          <Bookmarked />
      </div>
    </main>
  );
}
export default Master;