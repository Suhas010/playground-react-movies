
const Info = ({message, title, type}) => (
  <div className="section">
    <details className={`${type}`}>
      <summary>{title}</summary>
      <p>{message}</p>
    </details>
  </div>
)
export default Info;
