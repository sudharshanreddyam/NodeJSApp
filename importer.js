import fs from 'fs';
import nodePath from 'path';
import csvjson from 'csvjson';
import { promisify } from 'util';
const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

class Importer {
    constructor(dirWatcher) {
        dirWatcher.on('changed', async (path) => {
            /**
             * Watching for file changes Syncrhonously
             */
            const syncData = this.importSync(path);
            console.log(syncData)

            /**
             * Asynchronously watching the file changes
             */
            const asyncData = await this.import(path);
            console.log(asyncData); 
        });
    }

    async import(path) {
        try {
            let jsonData = [], newFileData = [];
            const fileNames = await readDirAsync(path);
            for (const fileName of fileNames) {
                const data = await readFileAsync(nodePath.join(__dirname, path, fileName), { encoding: 'utf8' });
                newFileData = csvjson.toObject(data);
                jsonData = jsonData ? [...jsonData, ...newFileData] : newFileData;
            }

            return jsonData;
        } catch (error) {
            console.err(error);
        }
    }

    importSync(path) {
        let jsonData, newFileData;
        fs.readdirSync(path).forEach(fileName => {
            const data = fs.readFileSync(nodePath.join(__dirname, path, fileName), { encoding: 'utf8' });
            newFileData = csvjson.toObject(data);
            jsonData = jsonData ? jsonData.concat(newFileData) : newFileData;
        });

        return jsonData;
    }
}

export default Importer;