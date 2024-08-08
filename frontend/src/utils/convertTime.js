const convertTime = time => {
    const timeParts = time.split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    let meridiem = 'AM';
    if (hours >= 12) {
        meridiem = 'PM';
        if (hours > 12) {
            hours -= 12;  // Correctly convert hours for PM times
        } else if (hours === 12) {
            hours = 12;  // Handle the case for 12 PM
        }
    } else if (hours === 0) {
        hours = 12;  // Handle the case for 12 AM
    }

    return (
        hours.toString().padStart(2, '0') + ":" +
        minutes.toString().padStart(2, '0') +
        " " + meridiem
    );
}

export default convertTime;
