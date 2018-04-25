import {createMuiTheme} from 'material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1E88E5',
        },
        secondary: {
            main: '#4CAEE2',
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                backgroundColor: '#2196F3 !important',
            },
        },
    },
});

export default theme;