import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const StyledBox = styled(Box)(({ theme }) => ({
	backgroundPosition: 'center',
	backgroundSize: 'cover',
	boxShadow: `${theme.palette.grey[800]} 4px 4px 10px 0px`,
	color: theme.palette.common.white,

	'&::before': {
		content: `''`,
		position: 'absolute',
		backgroundColor: theme.palette.grey[900],
		opacity: 0.3,
		width: '100%',
		height: '100%',
		top: '0',
		left: '0',
	},

	'& > h1': {
		zIndex: 1,
	},

	'&:hover h1': {
		fontSize: '4em',
		transition: '500ms',
	},

	'&:focus h1': {
		fontSize: '4em',
		transition: '500ms',
	},
}));

export default function PosterCard({
	name,
	href,
	image,
}: {
	name: string;
	href: string;
	image: string;
}) {
	return (
		<Link className='poster-card' width={['100%']} maxWidth="15em" href={href}>
			<Paper elevation={4}>
				<StyledBox
					className="image-container"
					sx={{ backgroundImage: `url("${image}")` }}
					height="20em"
					width="100%"
					padding="1em 2em"
					display="flex"
					position="relative"
					alignItems="center"
					justifyContent="center"
					overflow="hidden"
					borderRadius="inherit"
				>
					<Typography variant="h1" p={2}>
						{name}
					</Typography>
				</StyledBox>
			</Paper>
		</Link>
	);
}
