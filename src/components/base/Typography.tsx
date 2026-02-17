import React from 'react';
import { cn } from 'lib/utils';

export function H1(props: React.HTMLAttributes<HTMLHeadingElement>) {
	const { children, className, ...otherProps } = props;

	return (
		<h1
			className={cn(
				"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-['Contrail_One']",
				className
			)}
			{...otherProps}
		>
			{children}
		</h1>
	);
}

export function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
	const { children, className, ...otherProps } = props;

	return (
		<h2
			className={cn(
				"scroll-m-20 text-3xl font-semibold tracking-tight font-['Contrail_One']",
				className
			)}
			{...otherProps}
		>
			{children}
		</h2>
	);
}

export function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
	const { children, className, ...otherProps } = props;

	return (
		<p className={cn('leading-7', className)} {...otherProps}>
			{children}
		</p>
	);
}
