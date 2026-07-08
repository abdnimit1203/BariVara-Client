// Function to get the previous month and the previous year from the given month name
export function getPreviousMonthAndYear(monthName) {
    // List of months in a year
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Get the current year (you can adjust this logic if you need a different year logic)
    const currentYear = new Date().getFullYear();
  
    // Find the index of the current month in the months array
    const monthIndex = months.indexOf(monthName);
  
    // If month name is invalid, return an error message
    if (monthIndex === -1) {
      return { previousMonth: "Invalid month name", previousYear: null };
    }
  
    // Calculate the previous month
    const previousMonthIndex = (monthIndex - 1 + 12) % 12;
    const previousMonth = months[previousMonthIndex];
  
    // Calculate the previous year
    const previousYear = monthIndex === 0 ? currentYear - 1 : currentYear;
  
    // Return both previous month and year
    return { previousMonth, previousYear };
  }
  