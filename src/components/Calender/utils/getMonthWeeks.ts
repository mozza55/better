import dayjs from 'dayjs';
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear';

type MonthWeek = {
  /** 해당 연도의 몇 번째 주인지 알려주는 숫자 */
  weekNumber: number;
  /** 주에 포함된 일자를 담은 배열 */
  dates: Date[];
};

/**
 *  특정 월에 포함된 주를 반환
 */
export default function getMonthWeeks(month: Date): MonthWeek[] {
  const startOfWeek = dayjs(month).startOf('month').startOf('week');
  const endOfWeek = dayjs(month).endOf('month').endOf('week');
  const days: Date[] = [];
  const numberOfDays = endOfWeek.diff(startOfWeek, 'day') + 1;

  dayjs.extend(weekOfYearPlugin);

  for (let i = 0; i < numberOfDays; i++) {
    days.push(startOfWeek.add(i, 'day').toDate());
  }

  const monthWeeks = days.reduce((result: MonthWeek[], date) => {
    const weekNumber = dayjs(date).week();
    const existingWeek = result.find((value) => value.weekNumber === weekNumber);
    if (existingWeek) {
      existingWeek.dates.push(date);
      return result;
    }
    result.push({
      weekNumber,
      dates: [date],
    });
    return result;
  }, []);

  return monthWeeks;
}
