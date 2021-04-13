import React, { useCallback, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tabs from '@material-ui/core/Tabs';
import Switch from '@material-ui/core/Switch';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { WithStyles } from '@material-ui/core/styles';
import ConnectSection from './connect-section';
import ListeningTab from './listening-tab';
import EmittingTab from './emiting-tab';
import SocketIOClient from 'socket.io-client';
import { useSnackbar } from 'notistack';
import { useStyles, styles } from './style';

export type SocketConnectStatus = 'connected' | 'disconnected' | 'failed';

interface Props extends Partial<WithStyles<typeof styles>> {}

const App: React.FC<Props> = (props) => {
  const classes = useStyles(props);
  const { enqueueSnackbar } = useSnackbar();
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>();
  const [socketConnectStatus, setSocketConnectStatus] = React.useState<SocketConnectStatus>(
    'disconnected',
  );
  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        setSocketConnectStatus('connected');
        enqueueSnackbar('Socket connected', { variant: 'success' });
      });
      socket.on('disconnect', () => {
        setSocketConnectStatus('disconnected');
        enqueueSnackbar('Socket disconnected', { variant: 'error' });
      });
      socket.on('connect_error', (error: any) => {
        setSocketConnectStatus('failed');
        enqueueSnackbar('Socket connect failed', { variant: 'error' });
      });
    }
  }, [socket]);
  const onSocketConnect = useCallback(
    (uri: string, options?: SocketIOClient.ConnectOpts) => {
      const newSocket = SocketIOClient(uri, options);
      setSocket(newSocket);
    },
    [socket],
  );
  const onSocketDisconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocketConnectStatus('disconnected');
      setSocket(undefined);
    }
  }, [socket]);
  const [tabSelected, setTabSelected] = useState(0);
  const onTabSelectedChange = useCallback((event, value: number) => {
    setTabSelected(value);
  }, []);
  const [isEnabledDebug, setIsEnabledDebug] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('debug')) {
      setIsEnabledDebug(true);
    }
  }, []);
  const onDebugSwitchChange = useCallback(
    (event: any, checked: boolean) => {
      if (checked) {
        localStorage.setItem('debug', '*');
      } else {
        localStorage.removeItem('debug');
      }
      location.reload();
    },
    [setIsEnabledDebug],
  );

  return (
    <div className={classes.root}>
      <AppBar position="relative" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Socket.io(v2) Client Tool
            </Typography>
            <FormControlLabel
              control={<Switch color="secondary" checked={isEnabledDebug} />}
              label="Debug"
              onChange={onDebugSwitchChange}
              labelPlacement="start"
            />
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" className={classes.contentContainer}>
        <ConnectSection
          socket={socket}
          connectStatus={socketConnectStatus}
          onConnect={onSocketConnect}
          onDisconnect={onSocketDisconnect}
        />
        <div className={classes.tabsPaperWrapper}>
          <Paper className={classes.tabsPaper}>
            <Tabs
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
              value={tabSelected}
              onChange={onTabSelectedChange}
            >
              <Tab label="Listening" disableRipple classes={{ root: classes.tabRoot }} />
              <Tab label="Emiting" disableRipple classes={{ root: classes.tabRoot }} />
            </Tabs>
            <div className={classes.tabContent}>
              <ListeningTab socket={socket} hidden={tabSelected !== 0} />
              <EmittingTab socket={socket} hidden={tabSelected !== 1} />
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default App;
