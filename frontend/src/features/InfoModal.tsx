import { Modal, Box, Typography, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '40em',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

type Props = {
	open: boolean;
	setOpenInfo: (open: boolean) => void;
};

function InfoModal({ open, setOpenInfo }: Props): JSX.Element {
	return (
		<>

			<Modal
				open={open}
			// aria-labelledby="modal-modal-title"
			// aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						sx={{ textAlign: 'center', fontSize: '1.5em', color: 'gray' }}
					>
						Задача приложения - помочь выяснить текущие потребности.
						<img width='150px' src="/img/idea.gif" alt="" />
						<Typography sx={{ textAlign: 'center', fontSize: '0.9em', color: 'darkgray' }}>Если вы отвечаете не вопрос "Да", он отправляется в список ваших желаний.
							Если отвечаете "Нет", вопрос покажется вам через некоторое время
							(оно определяется случайным образом, так что он может снова появиться не скоро).</Typography>
						В списке желания можно отмечать выполненными, либо удалять, если потеряли актуальность.
						Список желаний поможет достигать как краткосрочные цели, так и длительные.
						<Typography sx={{ textAlign: 'center', fontSize: '0.9em', color: 'darkgray' }}>
							В профиле (верхняя левая кнопка с вашим инициалом)
							можно посмотреть статистику по желаниям, там же находится дневник эмоций, который поможет
							отслеживать эмоции и их влияение(это отличный инструмент из когнитивно-поведенческой терапии).
						</Typography>
					</Typography>
					<IconButton type='button' onClick={() => setOpenInfo(false)} sx={{ background: '#ab90eb' }}>Понятно</IconButton>
				</Box>
			</Modal>
		</>
	);
}

export default InfoModal;