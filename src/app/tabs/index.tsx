import React, { useCallback, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { WithStyles } from '@material-ui/core/styles';
import { useStyles, styles } from './style';

interface Props extends Partial<WithStyles<typeof styles>> {}

const ConnectSection: React.FC<Props> = (props) => {
  const classes = useStyles(props);
  const [tabSelected, setTabSelected] = useState(0);
  const onTabSelectedChange = useCallback((event, value: number) => {
    setTabSelected(value);
  }, []);

  return (
    <Paper>
      <Tabs classes={{ root: classes.tabsRoot }} value={tabSelected} onChange={onTabSelectedChange}>
        <Tab label="Listening" disableRipple classes={{ root: classes.tabRoot }} />
        <Tab label="Emiting" disableRipple classes={{ root: classes.tabRoot }} />
      </Tabs>
    </Paper>
  );
};

export default ConnectSection;
