import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { WithStyles } from '@material-ui/core/styles';
import { useStyles, styles } from './style';

interface Props extends Partial<WithStyles<typeof styles>> {
  options: SocketIOClient.ConnectOpts;
  open: boolean;
  onClose: () => void;
  onSubmit: (options: SocketIOClient.ConnectOpts) => void;
}

const ConnectOptionsDialog: React.FC<Props> = (props) => {
  const { open, onClose, options, onSubmit } = props;
  const classes = useStyles(props);
  const [text, setText] = useState('');
  useEffect(() => {
    setText(JSON.stringify(options, null, 4));
  }, [open, options]);
  const onTextChange = useCallback(
    (event) => {
      setText(event.target.value);
    },
    [setText],
  );
  const onBeautify = useCallback(() => {
    const parsedJSON = JSON.parse(text);
    setText(JSON.stringify(parsedJSON, null, 4));
  }, [text]);
  const onSubmitBtnClick = useCallback(() => {
    onSubmit(JSON.parse(text));
    onClose();
  }, [text]);
  const onCloseBtnClick = useCallback(() => {
    onClose();
  }, []);
  const isTextValid = useMemo(() => {
    if (!text) {
      return false;
    }
    try {
      JSON.parse(text);
      return true;
    } catch (error) {
      return false;
    }
  }, [text]);

  return (
    <Dialog open={open} classes={{ paper: classes.dialogPaper }}>
      <DialogTitle>Connect Options</DialogTitle>
      <DialogContent>
        <TextField
          label="Options"
          value={text}
          onChange={onTextChange}
          multiline
          rows={10}
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          helperText={!isTextValid && Boolean(text) && 'Invalid input'}
          error={!isTextValid && Boolean(text)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onBeautify}>Beautify</Button>
        <Button variant="contained" onClick={onCloseBtnClick}>
          Close
        </Button>
        <Button
          disabled={!isTextValid}
          onClick={onSubmitBtnClick}
          variant="contained"
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectOptionsDialog;

const placeholder = `{
  "path": "/socket.io",
  "reconnection": true,
  "reconnectionAttempts": null,
  "reconnectionDelay": 1000,
  "reconnectionDelayMax": 5000,
  "randomizationFactor": 0.5,
  "timeout": 20000,
  "autoConnect": true,
  "query": {},
  "upgrade": true,
  "forceJSONP": false,
  "jsonp": true,
  "forceBase64": false,
  "enablesXDR": false,
  "timestampRequests": true,
  "timestampParam": "t",
  "policyPort": 843,
  "transports": [
      "polling",
      "websocket"
  ],
  "transportOptions": {},
  "rememberUpgrade": false,
  "onlyBinaryUpgrades": false,
  "requestTimeout": 0,
  "protocols": [],
  "agent": false,
  "pfx": null,
  "key": null,
  "passphrase": null,
  "cert": null,
  "ca": null,
  "ciphers": [],
  "rejectUnauthorized": true,
  "perMessageDeflate": true,
  "forceNode": false,
  "localAddress": null,
  "extraHeaders": {}
}`;
