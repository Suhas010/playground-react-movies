import { Rate } from "antd";

const MovieDetails = ({title, rating, year}) => (
  <div>
    <div className="title">
      {title}
    </div>
    <div>
      <span className="ratings">
        <Rate
          allowHalf={true}
          value={rating}
          count={5}
          style={{color: "red"}}
          disabled={true}
        />
      </span>
      <span className="year">
        {year}
      </span>
    </div>
  </div>
)
export default MovieDetails;
