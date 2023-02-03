import { Link } from 'react-router-dom';

function Logo(): JSX.Element {
  return (
    <Link to="/">
      <img id='optLogo' width="300px" src="img/logo.png" alt="logo" />
      {/* <img id='optLogo' width="250px" src="img/image4.png" alt="logo" /> */}
      {/* <img id='optLogo' width="300px" src="img/image1.png" alt="logo" /> */}
      {/* <img id='optLogo' width="300px" src="img/image2.png" alt="logo" /> */}
      {/* <img id='optLogo' width="300px" src="img/image3.png" alt="logo" /> */}
    </Link>
  );
}

export default Logo;
