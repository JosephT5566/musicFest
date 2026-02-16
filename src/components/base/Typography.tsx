import React from 'react';

export function H1(props: React.HTMLAttributes<HTMLHeadingElement>) {
	const { children, className, ...otherProps } = props;

	return (
		<h1 className={`font-heading text-h1 ${className}`} {...otherProps}>
			{children}
		</h1>
	);
}

export function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
	const { children, className, ...otherProps } = props;

	return (
		<h2 className={`font-heading text-h2 ${className}`} {...otherProps}>
			{children}
		</h2>
	);
}

export function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
	const { children, className, ...otherProps } = props;

	return (
		<p className={`font-sans text-base ${className}`} {...otherProps}>
			{children}
		</p>
	);
}
