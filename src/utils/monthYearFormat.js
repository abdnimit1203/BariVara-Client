// formatDate.js

function monthYearFormat(isoDateString) {
    const date = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  }
  
  export default monthYearFormat;
  