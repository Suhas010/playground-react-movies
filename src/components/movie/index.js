import { Switch } from "antd";
import Info from "../../common/Info";
import Loading from "../../common/Loading";
import MovieDetails from "../../common/MovieDetails";
import { useMovies } from "../../context/movies";
import { ACTIONS, STATUS } from "../../utils/constants";
import './movie.css';

const Movie = ({data : { Title, Year, color, bookmarked, rating}}) => {
  const [, dispatch] = useMovies()
  const handleChange = (checked) => {
    dispatch({type: ACTIONS.TOGGLE_BOOKMARK, payload: {title: Title, checked}})
  }
  return (
    <div className="movie" style={{backgroundColor: color}}>
      <MovieDetails 
        title={Title}
        year={Year}
        rating={rating}
      />
      <div>
        <Switch 
          checked={bookmarked}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

const MovieList = ()  => {
  const [state,] = useMovies()
  const {data, status, error, year} = state;

  const isLoading = status === STATUS.IDLE || status === STATUS.PENDING;
  const isRejected = status === STATUS.REJECTED;

  if(isLoading) return <Loading />
  if(isRejected || error) {
    return (
      <Info
        title="Error"
        type="error"
        message="Something went wrong, Please try again later."
      />
    )
  }
  if(!data || !data.length) {
    return (
      <Info
        title="No Records Found"
        type="info"
        message={`Seems like there are no movies released in ${year}`}
      />
    )
  }
  
  return (
    <div className="movie-list-container">
      {data.map((movie) => (
        <Movie data={movie} key={movie.Title} />
      ))}
    </div>
  )
}

export default MovieList;