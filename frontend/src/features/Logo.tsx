import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Logo(): JSX.Element {
  return (
    <Typography component="div" sx={{ zIndex: 7 }} >
      <Link to="/">
        {/* <img id='optLogo' width="300px" src="img/logo.png" alt="logo" /> */}
        <img id='optLogo' width="250px" src="img/image4.png" alt="logo" />
        {/* <img id='optLogo' width="300px" src="img/image1.png" alt="logo" /> */}
        {/* <img id='optLogo' width="300px" src="img/image2.png" alt="logo" /> */}
        {/* <img id='optLogo' width="300px" src="img/image3.png" alt="logo" /> */}
      </Link>
    </Typography>
  );
}

export default Logo;
