import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ListeningItem, { EventData } from './listening-item';
import { WithStyles } from '@material-ui/core/styles';
import { useStyles, styles } from './style';
import { useSnackbar } from 'notistack';

interface Props extends Partial<WithStyles<typeof styles>> {
  socket?: SocketIOClient.Socket;
  hidden: boolean;
}

const ConnectSection: React.FC<Props> = (props) => {
  const { socket, hidden } = props;
  const classes = useStyles(props);
  const { enqueueSnackbar } = useSnackbar();
  const [eventName, setEventName] = useState('');
  const onEventNameTextFieldChange = useCallback(
    (event) => {
      setEventName(event.target.value);
    },
    [setEventName],
  );
  const [connectStatusEventData, setConnectStatusEventData] = useState<EventData>({
    name: 'connect/disconnect/connect_error',
    events: [],
  });
  const [eventDataList, setEventDataList] = useState<Array<EventData>>([]);
  const onClearAllEventsBtnClick = useCallback(() => {
    for (const eventData of eventDataList) {
      socket && socket.off(eventData.name);
    }
    setEventDataList([]);
  }, [eventDataList, setEventDataList]);
  const onListenBtnClick = useCallback(() => {
    if (eventDataList.map((item) => item.name).includes(eventName)) {
      enqueueSnackbar('Event was already listened', { variant: 'error' });
      return;
    }
    setEventDataList([
      {
        name: eventName,
        events: [],
      },
      ...eventDataList,
    ]);
  }, [eventName, eventDataList, setEventDataList]);
  const onRemoveEventData = useCallback(
    (name: string) => {
      socket && socket.off(name);
      setEventDataList(eventDataList.filter((item) => item.name !== name));
    },
    [socket, eventDataList, setEventDataList],
  );

  useEffect(() => {
    if (socket) {
      for (const eventData of eventDataList) {
        socket.off(eventData.name);
        socket.on(eventData.name, (message: any) => {
          setEventDataList(
            eventDataList.map((item) =>
              item.name === eventData.name
                ? {
                    ...item,
                    events: [
                      {
                        message,
                        date: new Date(),
                      },
                      ...item.events,
                    ].slice(0, 50),
                  }
                : item,
            ),
          );
        });
      }
    }
  }, [socket, eventDataList, setEventDataList]);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        setConnectStatusEventData({
          ...connectStatusEventData,
          events: [
            { message: 'Connected', date: new Date() },
            ...connectStatusEventData.events,
          ].slice(0, 50),
        });
      });
      socket.on('disconnect', () => {
        setConnectStatusEventData({
          ...connectStatusEventData,
          events: [
            { message: 'Disconnected', date: new Date() },
            ...connectStatusEventData.events,
          ].slice(0, 50),
        });
      });
      socket.on('connect_error', (error: any) => {
        setConnectStatusEventData({
          ...connectStatusEventData,
          events: [
            { message: 'Connect failed', date: new Date() },
            ...connectStatusEventData.events,
          ].slice(0, 50),
        });
      });
    }
  }, [socket, connectStatusEventData, setConnectStatusEventData]);

  return (
    <div className={classes.root} hidden={hidden}>
      <div className={classes.topLine}>
        <div className={classes.topLineLeft}>
          <TextField
            label="Event name"
            onChange={onEventNameTextFieldChange}
            variant="outlined"
            size="small"
            fullWidth
          />
          <Button
            disabled={!eventName || !socket}
            onClick={onListenBtnClick}
            variant="contained"
            color="primary"
            size="small"
            className={classes.listenBtn}
          >
            Listen
          </Button>
        </div>
        <Button
          onClick={onClearAllEventsBtnClick}
          variant="contained"
          color="primary"
          size="small"
          className={classes.listenBtn}
        >
          <DeleteIcon className={classes.deleteAllEventsIcon} />
          Clear All Events
        </Button>
      </div>
      <div className={classes.events}>
        {eventDataList.map((item) => (
          <div key={item.name} className={classes.listeningItemWrapper}>
            <ListeningItem key={item.name} eventData={item} onRemove={onRemoveEventData} />
          </div>
        ))}
        <div className={classes.listeningItemWrapper}>
          <ListeningItem eventData={connectStatusEventData} />
        </div>
      </div>
    </div>
  );
};

export default ConnectSection;
