import error404 from "../../images/404Error.svg";
import "../../css/visual.css";

const Error404 = () => {
  return (
    <div className="error404div">
      <img src={error404} alt="error404" className="error404img"/>
    </div>
    
  );
};

export default Error404;