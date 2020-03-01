import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {responsiveFontSizes} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";

// A custom theme for this app
// @ts-ignore
let theme = createMuiTheme({
    palette: {
        primary: {
            // main: '#ffd800',
            // contrastText: "#353090",
            main: "#353090",
            contrastText: "#ffd800",
        },
        secondary: {
            main: "#e29216",
            contrastText: "#353090"
            // main: "#353090",
            // contrastText: "#fff"
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#ecf4ff",
        },
    }
});

theme = responsiveFontSizes(theme);

export default theme;
