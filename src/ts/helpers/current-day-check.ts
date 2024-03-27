export const currentDayCheck = function (): string {
  const currentDate = new Date();
  const currentDay = String(currentDate.getDate()).padStart(2, "0");
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentYear = String(currentDate.getFullYear());

  const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;
  return formattedDate;
};
