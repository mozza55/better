import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import IconRight from '@/assets/icons/icon_right.svg';
import IconCircle from '@/assets/icons/icon_circle.svg';
import getMonthWeeks from './utils/getMonthWeeks';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(isBetweenPlugin);

type Props = {
  selected?: Date;
  onSelect?: (selectedDate: Date) => void;
  onMonthChange?: (data: Date) => void;
  active?: (date: Date) => boolean;
};

const Calender = ({ selected, onSelect, onMonthChange, active: isActive }: Props) => {
  const weekdays = useMemo(() => {
    const start = dayjs().startOf('week');
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(start.add(i, 'day').toDate());
    }
    return days;
  }, []);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [focusedDay, setFocusedDay] = useState(selected || new Date());

  const weeks = useMemo(() => {
    return getMonthWeeks(currentMonth);
  }, [currentMonth]);

  const onDayClick = (date: Date, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFocusedDay(date);
    onSelect && onSelect(date);
  };

  const changeMonth = (date: Date) => {
    setCurrentMonth(date);
    onMonthChange && onMonthChange(date);
  };

  const handleNextClick = () => {
    const nextMonth = dayjs(currentMonth).startOf('month').add(1, 'month').toDate();
    changeMonth(nextMonth);
  };

  const handlePreviousClick = () => {
    const prevMonth = dayjs(currentMonth).startOf('month').subtract(1, 'month').toDate();
    changeMonth(prevMonth);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold ">{dayjs(currentMonth).format('YYYY년 M월')}</div>
        <div>
          <button className="w-10" onClick={handlePreviousClick}>
            <div className="w-2 rotate-180 inline-flex items-center">
              <IconRight fill="#333333" />
            </div>
          </button>
          <button className="w-10" onClick={handleNextClick}>
            <div className="w-2 inline-flex items-center">
              <IconRight fill="#333333" />
            </div>
          </button>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="w-full justify-between">
            {weekdays.map((weekday, i) => (
              <th key={i} aria-label={dayjs(weekday).format('dddd')}>
                {dayjs(weekday).format('ddd')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week.weekNumber}>
              {week.dates.map((date) => (
                <td key={dayjs(date).unix()}>
                  {dayjs(date).isBetween(
                    dayjs(currentMonth).startOf('month').subtract(1, 'day'),
                    dayjs(currentMonth).endOf('month'),
                  ) ? (
                    <button
                      className={`w-full flex flex-col items-center justify-center font- ${
                        dayjs(focusedDay).isSame(date, 'day') ? `font-bold ` : `font-light`
                      }`}
                      onClick={(e) => onDayClick(date, e)}
                    >
                      <div className="w-10">
                        <IconCircle fill={`${isActive && isActive(date) ? '#F1E78A' : '#F2F2F2'}`} />
                      </div>
                      <div>{dayjs(date).date()}</div>
                    </button>
                  ) : (
                    <div role="empty-cell"></div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calender;
