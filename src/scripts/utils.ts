import fs from 'fs';

export function formatDate(date: Date): string
{
    //return date.toString().slice(0, 10);
    date = new Date(date);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
    const day = (date.getDate() + 1).toString().padStart(2, "0");

    const separator = " / ";

    return `${year}${separator}${month}${separator}${day}`
}

export function getImagePath(fileName: string): string
{
    const extensions = ['png', 'jpg', 'jpeg', 'webp'];
    let path = fileName;

    for (const ext of extensions)
    {
        const testPath = `./src/assets/images/${fileName}.${ext}`;
        if (fs.existsSync(`${testPath}`))
        {
            path = testPath;
            break;
        }
    }

    return path;
}