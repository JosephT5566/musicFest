import { createTheme } from '@mui/system';

import { palette } from './palette';
import { typography } from './typography';
import { ILayout, layout } from './layout';

declare module '@mui/material/styles' {
	interface Theme {
		layout: ILayout;
	}
	interface ThemeOptions {
		layout?: ILayout;
	}
}

// Create a theme instance.
const theme = createTheme({ palette, typography, layout });

export default theme;
