import React, { useCallback, useMemo, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { WithStyles } from '@material-ui/core/styles';
import { useStyles, styles } from './style';
import { InputAdornment } from '@material-ui/core';
import { SocketConnectStatus } from '..';

interface Props extends Partial<WithStyles<typeof styles>> {
  socket?: SocketIOClient.Socket;
  connectStatus: SocketConnectStatus;
  onDisconnect: () => void;
  onConnect: (url: string) => void;
}

const ConnectSection: React.FC<Props> = (props) => {
  const { connectStatus, onConnect, onDisconnect, socket } = props;
  const [url, setUrl] = useState('');
  const classes = useStyles(props);

  const onTextFieldChange = useCallback((event) => {
    setUrl(event.target.value);
  }, []);
  const onConnectBtnClick = useCallback(() => {
    onConnect(url);
  }, [url, onConnect]);
  const onDisconnectBtnClick = useCallback(() => {
    onDisconnect();
  }, [url, onConnect]);
  const statusIconRender = useMemo(() => {
    const className =
      connectStatus === 'connected'
        ? classes.connectedIcon
        : connectStatus === 'failed'
        ? classes.failedIcon
        : classes.disconnectedIcon;

    return <FiberManualRecordIcon className={className} />;
  }, [connectStatus]);

  return (
    <Paper className={classes.root}>
      <div className={classes.topLine}>
        <div className={classes.topLineLeft}>
          <TextField
            label="Server Url"
            variant="outlined"
            size="small"
            defaultValue="ws://localhost:4000"
            fullWidth
            onChange={onTextFieldChange}
            InputProps={{
              startAdornment: statusIconRender,
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Connect options">
                    <IconButton size="small">
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          {(connectStatus === 'disconnected' || connectStatus === 'failed') && (
            <Button
              disabled={!url}
              onClick={onConnectBtnClick}
              variant="contained"
              color="primary"
              size="small"
              className={classes.connectBtn}
            >
              Connect
            </Button>
          )}
          {connectStatus === 'connected' && (
            <Button
              onClick={onDisconnectBtnClick}
              variant="contained"
              color="secondary"
              size="small"
              className={classes.connectBtn}
            >
              Disconnect
            </Button>
          )}
        </div>
      </div>
      {socket && (
        <div className={classes.socketInfo}>
          <table>
            <tbody>
              <tr>
                <td className={classes.socketInfoLabel}>Socket id:</td>
                <td className={classes.socketInfoValue}>{socket.id}</td>
              </tr>
              <tr>
                <td className={classes.socketInfoLabel}>URI:</td>
                <td className={classes.socketInfoValue}>{socket.io.uri}</td>
              </tr>
              <tr>
                <td className={classes.socketInfoLabel}>Namespace:</td>
                <td className={classes.socketInfoValue}>{socket.nsp}</td>
              </tr>
              <tr>
                <td className={classes.socketInfoLabel}>Options:</td>
                <td className={classes.socketInfoValue}>
                  {JSON.stringify(socket.io.opts, null, 2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Paper>
  );
};

export default ConnectSection;
