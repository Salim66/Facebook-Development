
//here’s how we can get the 3-letter month name
export function getMonthShortName(monthNo) {
    const date = new Date();
    date.setMonth(monthNo - 1);
  
    return date.toLocaleString('en-US', { month: 'short' });
  }