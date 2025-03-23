export class NavItem {
	label: string;
	route: string;

	constructor(label: string, route: string) {
		this.label = label;
		this.route = route;
	}
}

export type PageRoutes = {
	root: string;
	map: string;
	lineup?: string;
};
