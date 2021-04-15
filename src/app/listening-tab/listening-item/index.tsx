import React, { useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from '@material-ui/core/Collapse';
import moment from 'moment';
import { WithStyles } from '@material-ui/core/styles';
import { useStyles, styles } from './style';

export type Event = {
  message: any;
  date: Date;
};

export type EventData = {
  name: string;
  events: Array<Event>;
};

interface Props extends Partial<WithStyles<typeof styles>> {
  eventData: EventData;
  onRemove?: (name: string) => void;
}

const ListeningItem: React.FC<Props> = (props) => {
  const { eventData, onRemove } = props;
  const classes = useStyles(props);
  const [isExpanded, setIsExpanded] = useState(true);
  const onToggleContent = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded, setIsExpanded]);
  const onDeleteBtnClick = useCallback(() => {
    onRemove && onRemove(eventData.name);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.topLine}>
        <div className={classes.topLineLeft}>
          <IconButton onClick={onToggleContent} size="small" className={classes.expandCollapseBtn}>
            {isExpanded ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton>
          <div className={classes.label}>On "{eventData.name}" Events</div>
        </div>
        {eventData.name !== 'connect/disconnect/connect_error' && (
          <IconButton onClick={onDeleteBtnClick} size="small" className={classes.expandCollapseBtn}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>
      <Collapse in={isExpanded}>
        <div className={classes.content}>
          {eventData.events.map((event, index) => (
            <div key={index} className={classes.event}>
              <div className={classes.eventDate}>
                {moment(event.date).format('DD/MM/YYYY HH:mm')}:
              </div>
              <div className={classes.eventMessage}>{event.message}</div>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default ListeningItem;
