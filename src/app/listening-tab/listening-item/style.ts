import { makeStyles, Theme, createStyles, fade } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      border: `1px solid ${theme.colors.midnightExpress}`,
    },
    topLine: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
      backgroundColor: theme.colors.midnightExpress,
    },
    topLineLeft: {
      display: 'flex',
      alignItems: 'center',
    },
    label: {
      color: theme.colors.white,
      fontWeight: 'bold',
      marginLeft: theme.spacing(1),
    },
    expandCollapseBtn: {
      color: theme.colors.white,
    },
    content: {
      padding: theme.spacing(1, 2),
      maxHeight: 400,
      overflowY: 'auto',
    },
    event: {
      display: 'flex',
    },
    eventDate: {
      color: theme.colors.nobel,
      marginRight: theme.spacing(2),
    },
    eventMessage: {},
  });

const useStyles = makeStyles(styles);

export { styles, useStyles };
