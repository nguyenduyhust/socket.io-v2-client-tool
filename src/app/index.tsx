import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { useTheme, WithStyles } from '@material-ui/core/styles';
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
  const theme = useTheme();
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
        enqueueSnackbar('Socket disconnected', { variant: 'success' });
      });
      socket.on('connect_error', (error: any) => {
        setSocketConnectStatus('failed');
        enqueueSnackbar('Socket connect failed', { variant: 'error' });
      });
      socket.on('welcome', (response: string) => {
        console.log(response);
      });
    }
  }, [socket]);
  const onSocketConnect = useCallback(
    (uri: string) => {
      const newSocket = SocketIOClient(uri);
      setSocket(newSocket);
    },
    [socket],
  );
  const onSocketDisconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(undefined);
    }
  }, [socket]);
  const onEmit = useCallback(
    (event: string, message: string) => {
      if (socket) {
        // socket.send(message);
        socket.emit(event, message, (response: any) => {
          console.log('response: ', response);
        });
      }
    },
    [socket],
  );
  const [tabSelected, setTabSelected] = useState(0);
  const onTabSelectedChange = useCallback((event, value: number) => {
    setTabSelected(value);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="relative" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6">Socket.io(v2) Client Tool</Typography>
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
