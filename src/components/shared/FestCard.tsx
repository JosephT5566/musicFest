import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const StyledImage = styled('img')(({ theme }) => ({
	width: '100%',
	height: '100%',
	objectPosition: 'center',
	objectFit: 'cover',
	borderRadius: '4px 4px 0 0',
	[theme.breakpoints.down('sm')]: {
		aspectRatio: '1.3',
	},
	aspectRatio: '1',
}));

export default function FestCard({
	name,
	href,
	image,
}: {
	name: string;
	href: string;
	image: string;
}) {
	return (
		<Link width={'100%'} href={href}>
			<Paper elevation={4} sx={{ backgroundColor: 'white' }}>
				<Box
					className="image-container"
					position="relative"
					sx={{ borderRadius: '4px 4px 0 0' }}
				>
					<StyledImage src={`${image}`} alt={name} />
					<Box
						className="fade-to-white"
						position="absolute"
						bottom={0}
						left={0}
						width="100%"
						height="30%"
						sx={{
							background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), white)',
						}}
					/>
				</Box>
				<Typography variant="h2" p={2}>
					{name}
				</Typography>
			</Paper>
		</Link>
	);
}
