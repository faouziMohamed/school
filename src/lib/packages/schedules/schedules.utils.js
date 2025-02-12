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

  // is it the same day as the current day column?
  const isSameDay = startAt.getDay() === dayIndex;
  if (!isSameDay) {
    return false;
  }

  // Is the class in the current hour interval of the schedule [start, end]?
  const isInRange =
    Number(currentHour) >= startAt.getHours() &&
    Number(currentHour) <= endAt.getHours();
  if (!isInRange) {
    return false;
  }

  // ===> We need to display the course in the correct time slot (in the 30 minutes slot or 00 minutes slot)
  // if the start minute is less than 30, then it should be displayed in
  // the 00 minutes slot otherwise in the 30 minutes slot
  let isInTheBeginning = Number(currentHour) === startAt.getHours();
  if (isInTheBeginning && !isInThe30MinSlot) {
    return startAt.getMinutes() < 30;
  }

  // if the end minute is greater or equal to 30, then it should be displayed in
  // the 30 minutes slot otherwise in the 00 minutes slot
  let isInTheEnd = Number(currentHour) === endAt.getHours();
  if (isInTheEnd && isInThe30MinSlot) {
    return endAt.getMinutes() >= 30;
  }

  // if the current hour is between the start and end hours, then it should be displayed
  return true;
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
 * @param {Object} params
 * @param {number} params.dayIndex
 * @param {string} params.currentHour
 * @param {boolean} params.isInThe30MinSlot
 * @param {ScheduleData[]} scheduleData
 */
export function getSchedules({
  dayIndex,
  currentHour,
  isInThe30MinSlot,
  scheduleData,
}) {
  return scheduleData
    .filter((schedule) =>
      shouldDisplayClassOnSchedule({
        dayIndex: dayIndex + 1,
        currentHour,
        isInThe30MinSlot,
        schedule: schedule,
      }),
    )
    .map((schedule) => {
      schedule.startAt = new Date(schedule.startAt);
      schedule.endAt = new Date(schedule.endAt);
      return schedule;
    });
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

/**
 *
 * @param {string} currentHour
 * @param {ScheduleData} schedule
 * @param {boolean} isInThe30MinSlot
 * @returns {boolean}
 */
export function shouldDisplayEndTime(currentHour, schedule, isInThe30MinSlot) {
  if (Number(currentHour) !== schedule.endAt.getHours()) {
    return false;
  }

  // display the end time in the correct time slot (in the 30 minutes slot or 00 minutes slot)
  // if the end minute < 30 ==> display in the 00 minutes slot
  // if the end minute >= 30 ==> display in the 30 minutes slot
  ////
  // When in the 30min slot and the end minute is less than 30,
  // check if the schedule should be displayed in the 00 minutes slot
  return schedule.endAt.getMinutes() < 30 || isInThe30MinSlot;
}

/**
 *
 * @param {string} currentHour
 * @param {ScheduleData} schedule
 * @param {boolean} isInThe30MinSlot
 * @returns {boolean}
 */
export function shouldDisplayStartTime(
  currentHour,
  schedule,
  isInThe30MinSlot,
) {
  if (Number(currentHour) !== schedule.startAt.getHours()) {
    return false;
  }
  // display the start time in the correct time slot (in the 30 minutes slot or 00 minutes slot)
  // if the start minute < 30 ==> display in the 00 minutes slot
  // if the start minute >= 30 ==> display in the 30 minutes slot
  return isInThe30MinSlot ? schedule.startAt.getMinutes() >= 30 : true;
}
