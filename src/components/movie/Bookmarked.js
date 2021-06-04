import Info from "../../common/Info";
import MovieDetails from "../../common/MovieDetails";
import { useMovies } from "../../context/movies";

const Bookmarked = () => {
  const [state,] = useMovies();
  const { data } = state;
  const bookmarked = data.filter(({bookmarked}) => bookmarked == true)
  const isEmpty = !bookmarked || !bookmarked.length;
  return (
    <div className="bookmark-list">
      <h2>Bookmark List</h2>
      <hr/>
      <div className="bookmarked">
        {isEmpty && (
          <Info
            title="Empty Bookmark"
            type="info"
            message={`You have not added any movie to bookmarks.`}
          />
        )}
        {bookmarked.map(({Year, Title, rating, color}) => (
          <div className="movie" style={{backgroundColor: color}}>
            <MovieDetails 
              title={Title}
              year={Year}
              rating={rating}
            />
          </div>
        ))}
      </div>  
    </div>
  )
}

export default Bookmarked;
