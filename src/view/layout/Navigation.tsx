'use client';
import React from 'react';
import { ROUTE } from 'constants/static';
import { NavItem } from 'types/navigation';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
	SheetFooter,
} from '@/components/ui/sheet';
import { SquareMenu, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const navItems = [
	new NavItem('歷屆大港', ROUTE.megaport.index.root),
	new NavItem('大港官網', 'https://megaportfest.com/', true),
];

const NavItems = (props: { navItems: NavItem[]; className?: string }) => {
	const { navItems, className } = props;

	return (
		<>
			{navItems.map((n, index) => (
				<a
					href={n.route}
					key={index}
					target={n.isExternal ? '_blank' : '_self'}
					rel={n.isExternal ? 'noopener noreferrer' : ''}
					className={`relative flex font-sans focus:outline-none data-[active=true]:text-primary-main
                     after:content-[''] after:absolute after:h-[2px] after:w-0 after:bg-primary-main after:transition-all after:duration-200 after:bottom-[-0.5em]
                     hover:after:w-[90%] focus:after:w-[90%] data-[active=true]:after:w-[90%] data-[active=true]:hover:after:bg-primary-main ${className}`}
				>
					{n.label}
				</a>
			))}
		</>
	);
};

const Navigation = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="text-accent rounded-md p-2"
				>
					<SquareMenu className="h-6 w-6" />
				</Button>
			</SheetTrigger>
			<SheetContent hideCloseButton className="flex flex-col">
				<SheetHeader className="flex flex-row items-center justify-between mb-4">
					<SheetTitle className="mb-0">更多</SheetTitle>
					<SheetClose>
						<X className="h-6 w-6" />
					</SheetClose>
				</SheetHeader>
				<nav className="flex flex-col gap-4 flex-grow py-4">
					<NavItems navItems={navItems} />
				</nav>
				<SheetFooter className="items-end">
					<a href="https://github.com/joseph" target="_blank" rel="noopener noreferrer">
						<FaGithub className="h-6 w-6 text-primary" />
					</a>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default Navigation;
