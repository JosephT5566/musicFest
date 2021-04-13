import { createMuiTheme } from '@material-ui/core/styles'

import { palette } from './palette'
import { typography } from './typography'
import { value } from './value'

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        navWidth?: string
        headerHeight?: string
    }
}

// Create a theme instance.
const theme = createMuiTheme({ palette, typography, ...value })

export default theme