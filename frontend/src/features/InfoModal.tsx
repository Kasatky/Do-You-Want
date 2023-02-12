import { Modal, Box, Typography, IconButton, } from '@mui/material';


const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '70%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	borderRadius: '10px',
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
			>
				<Box sx={style}>
					<Typography
						className='infoModal'
						sx={{ textAlign: 'center', fontSize: '2.1vw', color: 'gray' }}
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