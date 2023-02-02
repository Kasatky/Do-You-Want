import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Logo(): JSX.Element {
  return (
    <Typography component="div" sx={{ zIndex: 7 }} >
      <Link to="/">

        <img id='optLogo' width="200px" src="img/image.png" alt="logo" />
      </Link>
    </Typography>
  );
}

export default Logo;
