import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

export const ContentContainer = styled('div')(({ theme }) => ({
	minHeight: `calc(100vh - ${theme.layout.header.height})`,
}));

export const PageContainer = styled(Container)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	position: 'relative',
	gap: '1rem',
	paddingBlock: '1rem',
	[theme.breakpoints.down('sm')]: {
		paddingInline: '0.5rem',
	},

	'& > h1': {
		fontWeight: 'bold',
	},
}));

export const SelectPageContainer = styled(PageContainer)(({ theme }) => ({
	maxHeight: `calc(100vh - ${theme.layout.header.height})`,
}));

export const FixedButtonsContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	position: 'fixed',
	gap: '0.5rem',
	alignItems: 'end',
	right: '2rem',
	bottom: '2rem',
});
