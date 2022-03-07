import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

export const ContentContainer = styled(Container)(({ theme }) => ({
	minHeight: `calc(100vh - ${theme.layout.header.height})`,
}));

export const PageContainer = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	position: 'relative',
	gap: '1rem',
	paddingBlock: '1rem 2rem',
}));
