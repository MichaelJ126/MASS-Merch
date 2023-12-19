import { createTheme } from'@mui/material'; 


export const theme = createTheme({
    typography: {
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
    },
    palette: {
        primary: {
            main: '#ffffff'
        },
        secondary: {
            main: '#000000',
            light: '#1B2929'
        },
        info: {
            main: '#000000'
        }
    }
})