import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { appStyle } from '../styles/theme';


const DateTimePicker = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC');

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    if (selectedDay > getDaysInMonth(selectedYear, selectedMonth)) {
      setSelectedDay(getDaysInMonth(selectedYear, selectedMonth));
    }
  }, [selectedYear, selectedMonth]);

  const years = Array.from({ length: 4 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: getDaysInMonth(selectedYear, selectedMonth) }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const timeZones = ['UTC', 'GMT', 'CET', 'EET', 'EST', 'CST', 'MST', 'PST'];

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
        mode="dropdown"
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          {years.map((year) => (
            <Picker.Item key={year} label={year.toString()} value={year} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text>Month:</Text>
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          {months.map((month) => (
            <Picker.Item key={month} label={month.toString()} value={month} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text>Day:</Text>
        <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
        >
          {days.map((day) => (
            <Picker.Item key={day} label={day.toString()} value={day} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text>Hour:</Text>
        <Picker
          selectedValue={selectedHour}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedHour(itemValue)}
        >
          {hours.map((hour) => (
            <Picker.Item key={hour} label={hour.toString()} value={hour} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text>Minute:</Text>
        <Picker
          selectedValue={selectedMinute}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMinute(itemValue)}
        >
          {minutes.map((minute) => (
            <Picker.Item key={minute} label={minute.toString()} value={minute} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text>Time Zone:</Text>
        <Picker
          selectedValue={selectedTimeZone}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTimeZone(itemValue)}
        >
          {timeZones.map((zone) => (
            <Picker.Item key={zone} label={zone} value={zone} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: appStyle.blackColor.midDark,
    maxHeight: 40
  },
  pickerContainer: {
    marginVertical: 8,
    maxHeight: 40
  },
  picker: {
    maxHeight: 50,
    width: 100,
  },
});

export default DateTimePicker;
