import { makeStyles, Theme, createStyles, fade } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    topLine: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    topLineLeft: {
      display: 'flex',
      flex: 1,
      maxWidth: 500,
    },
    listenBtn: {
      marginLeft: theme.spacing(2),
    },
    events: {
      marginTop: theme.spacing(3),
    },
    listeningItemWrapper: {
      marginTop: theme.spacing(2),
    },
    deleteAllEventsIcon: {
      marginRight: theme.spacing(1),
    },
  });

const useStyles = makeStyles(styles);

export { styles, useStyles };
