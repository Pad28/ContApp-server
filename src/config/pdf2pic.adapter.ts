import { fromPath } from 'pdf2pic';
import { uuid } from './uuid.adapater';

export const pdf2pic = {
    convert: async (file: string, page: number, savePath: string) => {
        const convert = fromPath(file, {
            density: 100,
            saveFilename: uuid.v4(),
            format: "png",
            width: 600,
            height: 900,
            quality: 100,
            savePath,
        });

        try {
            return await convert(page, { responseType: "image" });
        } catch (error) {
            console.log(error);
        }

    }

}