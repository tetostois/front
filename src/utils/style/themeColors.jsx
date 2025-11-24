import { createTheme } from '@mui/material/styles';
import colors from './colors';

export const themeColors = createTheme({
    palette: {
        warning: {
            main: colors.dashbaord,
        },
        success: {
            main: colors.contact,
        },
        error: {
            main: colors.produits,
        },
        secondary: {
            main: colors.stock,
        },
        primary: {
            main: colors.vente,
        },
        info: {
            main: colors.rapport,
        },
        depense: {
            main: colors.depense,
        },
    },
})