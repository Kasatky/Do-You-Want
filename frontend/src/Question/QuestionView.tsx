import * as React from 'react';
import Box from '@mui/material/Box';
// import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Zoom from '@mui/material/Zoom';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { Theme } from '@mui/material/styles';
import { Typography } from '@mui/material';

const icon = (
	<Paper sx={{ m: 1 }} elevation={4}>
		<Typography>
			"Хочешь кушать?"
		</Typography>
		<Box component="svg" sx={{ width: 500, height: 200 }}>
		</Box>
	</Paper>
);

export default function QuestionView() {
	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		setChecked((prev) => !prev);
	};

	return (
		<Box sx={{ height: 180 }}>
			<Box>
				<button type='button' onClick={handleChange}>Yes</button>
				<button type='button' onClick={handleChange}>No</button>
			</Box>
			<Box sx={{ display: 'flex' }}>
				<Zoom in={checked}>{icon}</Zoom>
			</Box>
		</Box>
	);
}
