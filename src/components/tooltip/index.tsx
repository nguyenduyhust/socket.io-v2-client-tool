import React from 'react';
import { WithStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { useStyles, styles } from './style';

interface Props extends Partial<WithStyles<typeof styles>> {}

const TooltipTest: React.FC<Props> = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Tooltip
        title="A website asks you to sign your personal signature with your private key to prove the legitimacy of your wallet address. Signing will not cause your private key to be leaked or money to be transferred."
        classes={{
          tooltip: classes.tooltip,
          arrow: classes.arrow,
        }}
        arrow
      >
        <Button variant="contained" color="primary" className={classes.button}>
          Submit
        </Button>
      </Tooltip>
    </div>
  );
};

export default TooltipTest;
