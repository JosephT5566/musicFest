export interface ILayout {
	header: {
		height: string;
	};
	navbar: {
		width: string;
	};
	tableHeadHeight?: string;
	tableHeadMarginBottom?: string;
	letterSpacing?: string;
}

export const layout = {
	header: {
		height: '5em',
	},
	navbar: {
		width: '15rem',
	},
	tableHeadHeight: '3em',
	tableHeadMarginBottom: '1em',
	letterSpacing: '2px',
} as ILayout;
