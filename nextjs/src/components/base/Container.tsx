import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

export const ContentContainer = styled('div')(({ theme }) => ({
	minHeight: `calc(100vh - ${theme.layout.header.height})`,
}));

export const PageContainer = styled(Container)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	position: 'relative',
	gap: '1rem',
	paddingBlock: '1rem 2rem',
});

export const FixedButtonsContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	position: 'fixed',
	gap: '0.5rem',
	alignItems: 'end',
	right: '2rem',
	bottom: '2rem',
});
