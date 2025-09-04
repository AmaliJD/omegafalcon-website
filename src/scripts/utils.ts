import fs from 'fs';
import * as fpath from 'path';
import { format, parseISO } from 'date-fns';

const imageFileExtensions = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

export function formatDate(date: string): string
{
    return date.slice(0, 10).replaceAll('.', ' / ');
}

export function getImagePath(fileName: string): string
{
    let path = fileName;

    for (const ext of imageFileExtensions)
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

export function getAllImagesInDirectory(path: string): string[]
{
    const files = fs.readdirSync(path);

    const imagePaths: string[] = files.filter(file => {
        const ext = fpath.extname(file).toLowerCase();
        return imageFileExtensions.includes(ext.slice(1)); // Exclude hidden files
    });

    const sortedImagePaths = imagePaths.sort((a, b) => {
            const nameA = fpath.basename(a).toLowerCase();
            const nameB = fpath.basename(b).toLowerCase();
            return nameA.localeCompare(nameB);
        });

    sortedImagePaths.forEach((fileName, index) => sortedImagePaths[index] = fpath.join(path, fileName));

    return sortedImagePaths;
}

type ArtworkData = {
    path: string;
    date: Date;
    title: string;
    markdownPath: string;
    mainImagePaths: string[];
}

export function generateArtworkData(markdownList: any[]): ArtworkData[]
{
    const artworkDataList: ArtworkData[] = [];
    
    markdownList.forEach((markdown: any) => {
        const pathParts = markdown.file.split('/');
        const title: string = pathParts[pathParts.length - 2];
        const path: string = `./src/assets/artwork/${title}/`;
        const mainImages: string[] = getAllImagesInDirectory(path);

        let newData: ArtworkData = {
            path: path,
            date: markdown.frontmatter.date,
            title: title,
            markdownPath: `./src/assets/artwork/${title}/metadata.md`,
            mainImagePaths: mainImages,
        };
        artworkDataList.push(newData);
    });
    
    return artworkDataList;
}