import React, { useCallback, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  const [emitHistory, setEmitHistory] = useState<Array<Emit>>([]);
  const onClearHistoryBtnClick = useCallback(() => {
    setEmitHistory([]);
  }, [setEmitHistory]);
  const onEmitBtnClick = useCallback(() => {
    if (!socket) {
      return;
    }
    socket.emit(eventName, eventMessage);
    setEmitHistory(
      [
        {
          id: uuidv4(),
          name: eventName,
          message: eventMessage,
          date: new Date(),
        },
        ...emitHistory,
      ].splice(0, 50),
    );
  }, [eventName, eventMessage, emitHistory, uuidv4]);

  return (
    <div className={classes.root} hidden={hidden}>
      <div className={classes.topLine}>
        <div className={classes.topLineLeft}>
          <TextField
            onChange={onEventNameTextFieldChange}
            label="Event name"
            variant="outlined"
            size="small"
            className={classes.eventNameTextField}
          />
          <TextField
            onChange={onEventMessageTextFieldChange}
            label="Message"
            variant="outlined"
            size="small"
            className={classes.messageTextField}
          />
          <Button
            disabled={!eventName || !socket}
            onClick={onEmitBtnClick}
            variant="contained"
            color="primary"
            size="small"
          >
            Emit
          </Button>
        </div>
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
                  <strong>Message:</strong> {item.message}
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
