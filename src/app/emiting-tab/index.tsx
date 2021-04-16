import React, { useCallback, useMemo, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { WithStyles } from '@material-ui/core/styles';
import { useStyles, styles } from './style';

type Emit = {
  id: string;
  name: string;
  message: any;
  date: Date;
};

type MessageType = 'string' | 'json';

const messageTypeOptions: Array<{ value: MessageType; label: string }> = [
  { value: 'string', label: 'String' },
  { value: 'json', label: 'JSON' },
];

interface Props extends Partial<WithStyles<typeof styles>> {
  socket?: SocketIOClient.Socket;
  hidden: boolean;
}

const EmittingTab: React.FC<Props> = (props) => {
  const { hidden, socket } = props;
  const classes = useStyles(props);
  const [eventName, setEventName] = useState('');
  const onEventNameTextFieldChange = useCallback(
    (event) => {
      setEventName(event.target.value);
    },
    [setEventName],
  );
  const [eventMessage, setEventMessage] = useState('');
  const onEventMessageTextFieldChange = useCallback(
    (event) => {
      setEventMessage(event.target.value);
    },
    [setEventMessage],
  );
  const [messageType, setMessageType] = useState<MessageType>('string');
  const isJSONMessage = messageType === 'json';
  const handleMessageTypeChange = useCallback(
    (event) => {
      const value = event.target.value as MessageType;
      setMessageType(value);
      if (value === 'json') {
        setEventMessage('{}');
      }
      if (value === 'string') {
        setEventMessage('');
      }
    },
    [setMessageType, setEventMessage],
  );
  const isEventMessageValid = useMemo(() => {
    if (!isJSONMessage) {
      return true;
    }
    try {
      JSON.parse(eventMessage);
      return true;
    } catch (error) {
      return false;
    }
  }, [eventMessage, isJSONMessage]);
  const onBeautify = useCallback(() => {
    if (!isJSONMessage) {
      return;
    }
    const parsedJSON = JSON.parse(eventMessage);
    setEventMessage(JSON.stringify(parsedJSON, null, 4));
  }, [eventMessage]);
  const [emitHistory, setEmitHistory] = useState<Array<Emit>>([]);
  const onClearHistoryBtnClick = useCallback(() => {
    setEmitHistory([]);
  }, [setEmitHistory]);
  const onEmitBtnClick = useCallback(() => {
    if (!socket) {
      return;
    }
    const message = isJSONMessage ? JSON.parse(eventMessage) : eventMessage;
    socket.emit(eventName, message);
    setEmitHistory(
      [
        {
          id: uuidv4(),
          name: eventName,
          message,
          date: new Date(),
        },
        ...emitHistory,
      ].splice(0, 50),
    );
  }, [eventName, eventMessage, emitHistory, isJSONMessage, uuidv4]);

  return (
    <div className={classes.root} hidden={hidden}>
      <div className={classes.topLine}>
        <div className={classes.topLineLeft}>
          <div>
            <div>
              <TextField
                onChange={onEventNameTextFieldChange}
                label="Event name"
                variant="outlined"
                size="small"
                className={classes.eventNameTextField}
              />
              <TextField
                select
                label="Message type"
                value={messageType}
                variant="outlined"
                size="small"
                onChange={handleMessageTypeChange}
                className={classes.messageTypeTextField}
              >
                {messageTypeOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <TextField
              onChange={onEventMessageTextFieldChange}
              label={isJSONMessage ? 'JSON Message' : 'String Message'}
              variant="outlined"
              size="small"
              fullWidth
              multiline={isJSONMessage}
              rows={isJSONMessage ? 10 : undefined}
              className={classes.messageTextField}
              helperText={!isEventMessageValid && 'Invalid input'}
              error={!isEventMessageValid}
              value={eventMessage}
              InputProps={{
                endAdornment: isJSONMessage && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={onBeautify}>
                      <AutorenewIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            disabled={!eventName || !socket}
            onClick={onEmitBtnClick}
            variant="contained"
            color="primary"
            size="small"
            className={classes.emitBtn}
          >
            Emit
          </Button>
        </div>
        <div></div>
        <Button onClick={onClearHistoryBtnClick} variant="contained" color="primary" size="small">
          <DeleteIcon className={classes.deleteHistoryIcon} />
          Clear history
        </Button>
      </div>
      <div className={classes.historyEmit}>
        <div className={classes.historyEmitTopLine}>Emit history</div>
        <div className={classes.historyEmitContent}>
          {emitHistory.map((item) => (
            <div key={item.id} className={classes.emitItem}>
              <div className={classes.emitItemDate}>
                {moment(item.date).format('DD/MM/YYYY HH:mm')}:
              </div>
              <div>
                <div className={classes.emitItemName}>
                  <strong>Event:</strong> {item.name}
                </div>
                <div className={classes.emitItemMessage}>
                  <strong>Message:</strong> {JSON.stringify(item.message)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmittingTab;
