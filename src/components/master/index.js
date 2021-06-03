import { useEffect } from 'react';
import Info from '../../common/Info';
import Loading from '../../common/Loading';
import { useMovies } from '../../context/movies';
import { ACTIONS, STATUS } from '../../utils/constants';
import { debounce } from '../../utils/helper';
import './master.css';


const Master = () => {
  const [state, dispach] = useMovies()
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
    getMovies();
  }, [])

  const handleYearChange = debounce((e) => {
    console.log(e.target.value)
  }, 300)

  console.log(state)
  const { status, error} = state;
  const isLoading = status === STATUS.IDLE || status === STATUS.PENDING;
  const isRejected = status === STATUS.REJECTED;
  if(isLoading) return <Loading />;
  if(isRejected || error) {
    return (
      <Info
        title="Error"
        type="error"
        message="Something went wrong, Please try again later."
      />
    )
  }
  
  return (
    <main>
      <div className="master-container">
        <header>
        <form>
        <label htmlFor="year">Enter year</label>
          <input type="text" id="year" onChange={handleYearChange} />
        </form>
        </header>
      </div>
    </main>
  );
}
export default Master;