const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const getPreviousMonthAndYear = (month, year) => {
  const currentIndex = monthNames.indexOf(month);
  const prevDate = new Date(year, currentIndex - 1, 1);
  return {
    previousMonth: monthNames[prevDate.getMonth()],
    previousYear: prevDate.getFullYear(),
  };
};
