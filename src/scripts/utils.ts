export function formatDate(date: Date): string
{
    //return date.toString().slice(0, 10);
    date = new Date(date);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
    const day = date.getDate().toString().padStart(2, "0");

    const separator = " / ";

    return `${year}${separator}${month}${separator}${day}`
}