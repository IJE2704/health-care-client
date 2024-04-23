import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const Calendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startingDay = firstDayOfMonth.getDay();

  const handlePrevMonth = (e) => {
    e.preventDefault();
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
    setSelectedDate(newMonth);
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
    setSelectedDate(newMonth);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const generateCalendar = () => {
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          week.push(<td key={`empty-${j}`} className="border border-transparent"></td>);
        } else if (day > daysInMonth) {
          week.push(<td key={`empty-${j}`} className="border border-transparent"></td>);
        } else {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          week.push(
            <td
              key={day}
              className={`border border-transparent cursor-pointer text-xs ${
                date.toDateString() === selectedDate.toDateString() ? 'bg-pink-500 text-white' : 'text-black'
              }`}
              onClick={() => handleDateClick(date)}
            >
              {day}
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
    }

    return calendar;
  };

  return (
    <div className="w-full mt-2 text-black">
      <div className="flex items-center justify-between">
        <button
          className="p-1 rounded-full hover:bg-gray-200"
          onClick={handlePrevMonth}
        >
          <BsChevronLeft className="h-3 w-3" />
        </button>
        <div className="text-base font-semibold">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          className="p-1 rounded-full hover:bg-gray-200"
          onClick={handleNextMonth}
        >
          <BsChevronRight className="h-3 w-3" />
        </button>
      </div>
      <table className="w-full mt-2">
        <thead>
          <tr>
            {weekdays.map((day) => (
              <th key={day} className="py-2 text-xs text-black">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{generateCalendar()}</tbody>
      </table>
      {/* <div className="mt-4 text-center">
        Selected Date: {selectedDate.toDateString()}
      </div> */}
    </div>
  );
};

export default Calendar;
