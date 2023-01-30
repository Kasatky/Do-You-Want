import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Zoom from '@mui/material/Zoom';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getRandomWish } from '../wishSlice';


export default function QuestionView() {
	const [checked, setChecked] = React.useState(true);
	const [wishes, setWishes] = React.useState<string[]>([]);
	let wish = ''
	const wishList = useSelector((state: RootState) => state.wish.list)
	if (wishList && wishList.length) {
		wish = wishList[0].wish
	}

	const dispatch = useAppDispatch()

	React.useEffect(() => {
		setChecked(true)
		dispatch(getRandomWish())
	}, [checked])

	const handleFalse = () => {
		setChecked(false);
	};
	const handleTrue = () => {
		setWishes((prev) => [...prev, wish])
		setChecked(false);
	};
	const icon = (
		<Paper sx={{ m: 1 }} elevation={4}>
			<Typography>
				{wish ? (wish) : ('Вау! Вы перебрали все вопросы, совсем скоро появятся новые или можете добавить свои, нажав на кнопку "Добавить вопрос"')}
			</Typography>
			<Box component="svg" sx={{ width: 500, height: 200 }}>
			</Box>
		</Paper>
	);

	return (
		<Box sx={{ height: 180 }}>
			<div>{wishes}</div>
			<button type='button' onClick={handleTrue}>Yes</button>
			<button type='button' onClick={handleFalse}>No</button>
			<Box sx={{ display: 'flex' }}>
				<Zoom in={checked}>{icon}</Zoom>
			</Box>
		</Box>
	);
}
