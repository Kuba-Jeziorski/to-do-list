export const countingDeadline = function (date: string): number {
  if (date) {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const timeDifference = Number(targetDate) - Number(currentDate);
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining;
  } else {
    return NaN;
  }
};
