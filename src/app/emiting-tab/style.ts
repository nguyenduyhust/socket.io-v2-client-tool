import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    topLine: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    topLineLeft: {
      display: 'flex',
    },
    deleteHistoryIcon: {
      marginRight: theme.spacing(1),
    },
    eventNameTextField: {
      width: 300,
      marginRight: theme.spacing(2),
    },
    messageTypeTextField: {
      width: 200,
    },
    messageTextField: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    emitBtn: {
      marginLeft: theme.spacing(2),
    },
    historyEmit: {
      border: `1px solid ${theme.colors.midnightExpress}`,
      marginTop: theme.spacing(3),
    },
    historyEmitTopLine: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 2),
      backgroundColor: theme.colors.midnightExpress,
      color: theme.colors.white,
      fontWeight: 'bold',
    },
    historyEmitContent: {
      padding: theme.spacing(1, 2),
    },
    emitItem: {
      display: 'flex',
    },
    emitItemDate: {
      color: theme.colors.nobel,
      marginRight: theme.spacing(2),
    },
    emitItemName: {},
    emitItemMessage: {},
    emitItemResponse: {},
  });

const useStyles = makeStyles(styles);

export { styles, useStyles };
