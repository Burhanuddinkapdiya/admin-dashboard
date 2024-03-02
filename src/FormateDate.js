const formatDate = (inputDate) => {
    // Convert input date to a JavaScript Date object
    const dateObject = new Date(inputDate);
  
    // Extract day, month, and year
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = dateObject.getFullYear();
  
    // Format the date as "dd mm yyyy"
    const formattedDate = `${day} ${month} ${year}`;
  
    return formattedDate;
  };

  export default formatDate;