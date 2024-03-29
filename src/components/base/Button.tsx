import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

export const ShadowIconButton = styled(IconButton)(({ theme }) => ({
	backgroundColor: theme.palette.secondary.main,
	color: theme.palette.primary.main,
	boxShadow: '2px 2px 10px',
	'&:focus': {
		backgroundColor: theme.palette.secondary.main,
	},
}));
