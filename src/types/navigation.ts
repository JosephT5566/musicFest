export class NavItem {
	label: string;
	route: string;
    isExternal: boolean;

	constructor(label: string, route: string, isExternal = false) {
		this.label = label;
		this.route = route;
        this.isExternal = isExternal;
	}
}

export type PageRoutes = {
	root: string;
	map: string;
	lineup?: string;
};
