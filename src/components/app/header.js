import { memo, useContext } from "react";
import Image from "../../common/Image";
import moon from '../../assets/moon.svg';
import sun from '../../assets/sun.svg';
import ThemeContext from "../../context/theme";

const Header = () => {
  const { dark, toggle } = useContext(ThemeContext);

  return (
    <header className="app-header">
      <h1>Movies bookmark</h1>
      {dark && (
        <Image
          onClick={toggle}
          src={sun}
          alt="Change theme to light"
          className="theam-icon"
        />
      )}
      {!dark && (
        <Image
          onClick={toggle}
          src={moon}
          alt="Change theme to dark"
          className="theam-icon"
        />
      )}
    </header>
  );
}

export default memo(Header)