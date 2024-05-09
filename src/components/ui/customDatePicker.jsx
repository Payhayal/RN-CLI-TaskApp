import React from 'react';
import {Datepicker} from '@ui-kitten/components';

const DatePicker = props => {
  const {onSelectDate} = props;

  return (
    <Datepicker {...props} onSelect={nextDate => onSelectDate(nextDate)} />
  );
};

export default DatePicker;
