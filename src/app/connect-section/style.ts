import { fade } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    topLine: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    topLineLeft: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
    connectBtn: {
      width: 150,
      marginLeft: theme.spacing(2),
    },
    connectedIcon: {
      color: theme.colors.fruitSalad,
    },
    failedIcon: {
      color: theme.colors.brickRed,
    },
    disconnectedIcon: {
      color: theme.colors.orangePeel,
    },
    socketInfo: {
      marginTop: theme.spacing(2),
      border: `1px solid ${fade(theme.colors.black, 0.23)}`,
      borderRadius: 4,
      padding: theme.spacing(2),
    },
    socketInfoLabel: {
      fontWeight: 'bold',
      verticalAlign: 'top',
    },
    socketInfoValue: {
      verticalAlign: 'top',
    },
  });

const useStyles = makeStyles(styles);

export { styles, useStyles };
