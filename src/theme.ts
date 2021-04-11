import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

interface ThemeColors {
  black: string;
  white: string;
  midnightExpress: string;
  whiteSmoke: string;
  fruitSalad: string;
  orangePeel: string;
  roman: string;
  brickRed: string;
  nobel: string;
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors: ThemeColors;
  }
  interface ThemeOptions {
    colors: ThemeColors;
  }
}

export const BLACK_COLOR = '#000000';
export const WHITE_COLOR = '#FFFFFF';
export const MID_NIGHT_EXPRESS_COLOR = '#222A45';
export const WHITE_SMOKE_COLOR = '#F5F5F5';
export const FRUIT_SALAD_COLOR = '#43A047';
export const ORANGE_PEEL_COLOR = '#FF9800';
export const ROMAN_COLOR = '#E35A5A';
export const BRICK_RED_COLOR = '#D32F3F';
export const NOBEL_COLOR = '#999999';

// A custom theme for this app
const theme = createMuiTheme({
  colors: {
    black: BLACK_COLOR,
    white: WHITE_COLOR,
    midnightExpress: MID_NIGHT_EXPRESS_COLOR,
    whiteSmoke: WHITE_SMOKE_COLOR,
    fruitSalad: FRUIT_SALAD_COLOR,
    orangePeel: ORANGE_PEEL_COLOR,
    roman: ROMAN_COLOR,
    brickRed: BRICK_RED_COLOR,
    nobel: NOBEL_COLOR,
  },
  palette: {
    primary: {
      main: MID_NIGHT_EXPRESS_COLOR,
    },
    secondary: {
      main: BRICK_RED_COLOR,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

theme.overrides = {
  MuiButton: {
    root: {
      textTransform: 'capitalize',
      fontWeight: 'bold',
      height: 40,
      minWidth: 100,
    },
  },
};

export default theme;
