export const convertTo12HourFormat=(time: string): string =>{
    // Split the input time into hours, minutes, and seconds
    const [hourStr, minute, second] = time.split(':');
    let hour = parseInt(hourStr);

    // Determine AM or PM
    const period = hour >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    hour = hour % 12 || 12; // If hour is 0 (midnight), set to 12

    // Return the formatted time
    return `${hour}:${minute}:${second} ${period}`;
}