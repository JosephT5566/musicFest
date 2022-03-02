import { createTheme } from '@mui/material/styles';

import { palette } from './palette';
import { typography } from './typography';

declare module '@material-ui/core/styles/createTypography' {
	interface TypographyOptions {
		navWidth?: string;
		headerHeight?: string;
		tableHeadHeight?: string;
		tableHeadMarginBottom?: string;
		letterSpacing?: string;
	}
}

// Create a theme instance.
const theme = createTheme({ palette, typography });

export default theme;
