import dayjs from 'dayjs';

/**
 * Mapping between work day strings and their corresponding day index.
 */
const dayMapping = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

/**
 * @param {Object} params
 * @param {number} params.dayIndex
 * @param {string} params.currentHour
 * @param {boolean} params.isInThe30MinSlot
 * @param {FrontScheduleData} schedule
 * @returns {boolean}
 */
function shouldDisplayClassOnSchedule({
  dayIndex,
  currentHour,
  isInThe30MinSlot,
  schedule,
}) {
  const startTimeParsed = dayjs(schedule.startTime, 'HH:mm');
  const endTimeParsed = dayjs(schedule.endTime, 'HH:mm');
  // check if the schedule day matches the current day column
  const isSameDay = dayMapping[schedule.day] === dayIndex;
  if (!isSameDay) {
    return false;
  }

  // Check if the class is in the current hour interval.
  const currentHourNum = Number(currentHour);
  const isInRange =
    currentHourNum >= startTimeParsed.hour() &&
    currentHourNum <= endTimeParsed.hour();
  if (!isInRange) {
    return false;
  }

  // For the beginning of the schedule hour slot
  if (currentHourNum === startTimeParsed.hour()) {
    if (!isInThe30MinSlot) {
      return startTimeParsed.minute() < 30;
    }
  }

  // For the ending of the schedule hour slot
  if (currentHourNum === endTimeParsed.hour()) {
    if (isInThe30MinSlot) {
      return endTimeParsed.minute() >= 30;
    }
  }

  // If the current hour is strictly between start and end hours.
  return true;
}

/**
 * @returns {{currentHour: string, isInThe30MinSlot: string}}
 */
export function currentTimeSlot(time) {
  const [currentHour, isInThe30MinSlot] = time.toString().split('.');
  return { currentHour, isInThe30MinSlot };
}

/**
 * @param {Object} params
 * @param {number} params.dayIndex
 * @param {string} params.currentHour
 * @param {boolean} params.isInThe30MinSlot
 * @param {FrontScheduleData[]} scheduleData
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
        schedule,
      }),
    )
    .map((schedule) => {
      schedule.startAt = dayjs(schedule.startTime, 'HH:mm').toDate();
      schedule.endAt = dayjs(schedule.endTime, 'HH:mm').toDate();
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
 * @param {string} currentHour
 * @param {FrontScheduleData} schedule
 * @param {boolean} isInThe30MinSlot
 * @returns {boolean}
 */
export function shouldDisplayEndTime(currentHour, schedule, isInThe30MinSlot) {
  const endTimeParsed = dayjs(schedule.endTime, 'HH:mm');
  if (Number(currentHour) !== endTimeParsed.hour()) {
    return false;
  }

  // display the end time in the correct time slot (in the 30 minutes slot or 00 minutes slot)
  // if the end minute < 30 ==> display in the 00 minutes slot
  // if the end minute >= 30 ==> display in the 30 minutes slot
  //
  // When in the 30min slot and the end minute is less than 30,
  // check if the schedule should be displayed in the 00 minutes slot
  return endTimeParsed.minute() < 30 || isInThe30MinSlot;
}

/**
 * @param {string} currentHour
 * @param {FrontScheduleData} schedule
 * @param {boolean} isInThe30MinSlot
 * @returns {boolean}
 */
export function shouldDisplayStartTime(
  currentHour,
  schedule,
  isInThe30MinSlot,
) {
  const startTimeParsed = dayjs(schedule.startTime, 'HH:mm');
  if (Number(currentHour) !== startTimeParsed.hour()) {
    return false;
  }
  // display the start time in the correct time slot (in the 30 minutes slot or 00 minutes slot)
  // if the start minute < 30 ==> display in the 00 minutes slot
  // if the start minute >= 30 ==> display in the 30 minutes slot
  return isInThe30MinSlot ? startTimeParsed.minute() >= 30 : true;
}
