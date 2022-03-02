import { createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material/styles/createTypography';

import { palette } from './palette';
import { typography } from './typography';
import { ILayout, layout } from './layout';

declare module '@mui/material/styles/createTheme' {
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
