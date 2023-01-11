
/* 
    The following listing shows a couple of utility functions: 
    1. one to create a new date from an old date, offset by a number of days, 
    2. And the second to generate the week objects.
*/
export function addDays (date, daysToAdd) {
    const clone = new Date(date.getTime());
    clone.setDate(clone.getDate() + daysToAdd); // Shift the date by the number of days specified.
    return clone;
}

export function getWeek (forDate, daysOffset = 0){
    const date = addDays(forDate, daysOffset)
    const day = date.getDay(); // Get the day index for the new date, for example, Tuesday = 2.

    return {
        date,
        start: addDays(date, -day), // For example, if it’s Tuesday, shift back by 2 days.
        end: addDays(date, 6 - day) // For example, if it’s Tuesday, shift forward by 4 days.
    };
}

// Get the week object for the week containing today’s date
// const today = new Date();
// const week = getWeek(today)


// Get the week object for the week containing the date a week from today
// const today = new Date();
// const week = getWeek(today, 7);