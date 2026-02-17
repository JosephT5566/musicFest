import React from 'react';
import { Button } from '../../@/components/ui/button';

export const ShadowIconButton = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof Button>) => (
	<Button
		{...props}
		className={`bg-secondary text-primary shadow-[2px_2px_10px] focus:bg-secondary rounded-full ${
			className || ''
		}`}
		size={'icon'}
	>
		{children}
	</Button>
);
