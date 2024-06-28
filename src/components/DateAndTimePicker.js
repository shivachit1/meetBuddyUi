import {Picker} from '@react-native-picker/picker';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {appStyle} from '../styles/theme';
import DatePicker from 'react-native-date-picker';

const DateTimePicker = ({date, field, handleChange}) => {
  const [open, setOpen] = useState(true);

  return (
    <DatePicker
      modal
      open={open}
      date={date ? new Date(date) : new Date()}
      theme="light"
      mode="datetime"
      buttonColor={appStyle.blackColor.pureDark}
      onConfirm={date => {
        setOpen(false);
        handleChange(field, date.toISOString());
      }}
      onCancel={() => {
        setOpen(false);
      }}
    />
  );
};

export default DateTimePicker;
