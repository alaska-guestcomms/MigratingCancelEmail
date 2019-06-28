const fs = require('fs');

const readFilesRecursive = (folder: any, callBack: any) => {
    fs.readdir(folder, (err: any, files: string[]): void => {
        try {
            files.forEach((file: string): void => {
                const path = `${folder}/${file}`;
                if (!fs.lstatSync(path).isDirectory()) {
                    callBack(path);
                    console.log(path);
                }
                else {
                    readFilesRecursive(path, callBack);
                }
            });
        }
        catch (e)
        {
            console.log(e);
        }
    });
};

module.exports = readFilesRecursive;