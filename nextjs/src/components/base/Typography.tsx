import React from 'react';
import { styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';

export function H1(props: TypographyProps) {
	const { children, ...otherProps } = props;

	return (
		<Typography variant={'h1'} {...otherProps}>
			{children}
		</Typography>
	);
}
