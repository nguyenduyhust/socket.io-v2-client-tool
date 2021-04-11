import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    tooltip: {
      backgroundColor: '#ebebeb',
      fontSize: 11,
      color: '#000000',
      padding: 10,
      borderRadius: 0,
      lineHeight: '16px',
      width: 200,
    },
    arrow: {
      color: '#ebebeb',
    },
    button: {
      position: 'absolute',
      top: 200,
      right: 20,
    },
  });

const useStyles = makeStyles(styles);

export { styles, useStyles };
