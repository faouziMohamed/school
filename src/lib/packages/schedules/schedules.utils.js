import dayjs from 'dayjs';

/**
 * @param {Object} params
 * @param {number} params.dayIndex
 * @param {string} params.currentHour
 * @param {boolean} params.isInThe30MinSlot
 * @param {ScheduleData} schedule
 * @returns {boolean}
 */
function shouldDisplayClassOnSchedule({
  dayIndex,
  currentHour,
  isInThe30MinSlot,
  schedule,
}) {
  const startAt = new Date(schedule.startAt);
  const endAt = new Date(schedule.endAt);
  return (
    // is it the same day as the current day column?
    startAt.getDay() === dayIndex &&
    // Is the class in the current hour interval of the schedule [start, end]?
    Number(currentHour) >= startAt.getHours() &&
    Number(currentHour) <= endAt.getHours() &&
    // by default, we display the class on the schedule in the first time slot
    // if the current hour is in the interval [startHour, endHour]
    // We should not display the class if the current hour is in the interval [startHour, endHour] but not the minutes
    // eg:
    // [9:00, 12:00] => Correct => displayed from 9:00 to 12:30
    // [9:30, 12:00] => Incorrect ==> displayed from 9:00 to 12:30: since the class should not be displayed before 9:30
    (Number(currentHour) === startAt.getHours()
      ? isInThe30MinSlot
        ? true
        : startAt.getMinutes() < 30 // do not display the class if the start minute is 30
      : true) &&
    // --

    // Now we should not display the class in the last time slot
    // if the current hour is in the interval [startHour, endHour] but not the minutes
    // eg:
    // [9:00, 12:30] => Correct => displayed from 9:00 to 12:30
    // [9:00, 12:00] => Incorrect ==> since the class should not be displayed after 12:00
    // If the current hour is the same as the end hour, is the current minute defined?
    (Number(currentHour) === endAt.getHours()
      ? isInThe30MinSlot
        ? !!endAt.getMinutes() // do not display the class if the end minute is 00
        : true
      : true)
  );
}

export function currentTimeSlot(h) {
  const [currentHour, isInThe30MinSlot] = h.toString().split('.');
  return { currentHour, isInThe30MinSlot };
}

/**
 * @param {Object} params
 * @param {number} params.dayIndex
 * @param {string} params.currentHour
 * @param {boolean} params.isInThe30MinSlot
 * @param {ScheduleData[]} scheduleData
 */
export function getSchedule({
  dayIndex,
  currentHour,
  isInThe30MinSlot,
  scheduleData,
}) {
  const s = scheduleData.find((schedule) =>
    shouldDisplayClassOnSchedule({
      dayIndex: dayIndex + 1,
      currentHour,
      isInThe30MinSlot,
      schedule: schedule,
    }),
  );
  if (!s) {
    return null;
  }
  s.startAt = new Date(s.startAt);
  s.endAt = new Date(s.endAt);
  return s;
}

/**
 * @param {Date} date
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * @param {Date|string} date
 */
export function formatTime(date) {
  return dayjs(date).format('HH:mm');
}
