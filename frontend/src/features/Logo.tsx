import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function Logo(): JSX.Element {
  return (
    <Typography component="div">
      <Link to="/">
        <img width="100px" src="img/logo.png" alt="logo" />
      </Link>
    </Typography>
  );
}

export default Logo;
