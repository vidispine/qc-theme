import { createTheme } from '@mui/material/styles';

import 'typeface-roboto';
// import '@vidispine/vdt-materialui/dist/index.css';

const theme = createTheme({
  components: {
    VdtUserAvatarButton: {
      styleOverrides: {
        avatar: {
          fontSize: '0.875rem',
          height: 32,
          width: 32,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderBottom: '2px solid #7B61FF',
        },
        indicator: {
          backgroundColor: '#7B61FF',
          height: '100%',
          zIndex: 1,
        },
        flexContainer: {
          alignItems: 'center',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          zIndex: 2,
          color: 'inherit',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          '&.Mui-selected': {
            color: '#fff',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        },
      },
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          color: 'inherit',
          backgroundColor: '#f2f2f2',
        },
      },
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#7B61FF',
    },
    secondary: {
      main: '#00b16a',
    },
    text: {
      primary: 'rgba(0,0,0,0.75)',
    },
    background: {
      login: 'linear-gradient(-45deg,#b0c800,#0068a9 0,#0068a9 33%,#002749 100%,#b0c800 0)',
      default: '#f2f2f2',
      paper: '#fff',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
    },
  },
});

export default theme;
