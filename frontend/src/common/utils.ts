export function dateToString(dateInput: string | Date) {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return formatter.format(date);
}
