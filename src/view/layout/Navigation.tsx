'use client';
import React, { useState } from 'react';
import { ROUTE } from 'constants/static';
import { NavItem } from 'types/navigation';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';

const navItems = [new NavItem('外部連結', ROUTE.links)];

const NavItems = (props: { navItems: NavItem[]; className?: string }) => {
	const { navItems, className } = props;

	return (
		<>
			{navItems.map((n, index) => (
				<a
					href={n.route}
					key={index}
					className={`relative flex text-white font-sans focus:outline-none data-[active=true]:text-primary-main
                     after:content-[''] after:absolute after:h-[2px] after:w-0 after:bg-primary-main after:transition-all after:duration-200 after:bottom-[-0.5em]
                     hover:after:w-[90%] focus:after:w-[90%] data-[active=true]:after:w-[90%] data-[active=true]:hover:after:bg-primary-main ${className}`}
				>
					{n.label}
				</a>
			))}
		</>
	);
};

const NavigatorLg = () => {
	return (
		<nav className="hidden md:flex gap-4">
			<div className="flex w-full gap-4">
				<NavItems navItems={navItems} />
			</div>
		</nav>
	);
};

const NavigatorMd = () => {
    const [open, setOpen] = useState(false);

	return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-primary-main bg-secondary-main/75 hover:bg-secondary-main/90 rounded-md p-2">
                    <MenuIcon className="h-6 w-6" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-secondary-dark">
                <nav className="flex flex-col gap-4 p-4">
                    <NavItems navItems={navItems} className="text-xl" />
                </nav>
            </DrawerContent>
        </Drawer>
	);
};

export default function Navigation() {
	return (
        <>
            <NavigatorLg />
            <NavigatorMd />
        </>
    );
}
