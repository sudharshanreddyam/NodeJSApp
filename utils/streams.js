import commander from 'commander';
import through from 'through2';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import csvjson from 'csvjson';
const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

function streams() {
    commander.option('-a, --action <string>', 'action name taken')
        .option('-f, --file <string>', 'file will read')
        .option('-p, --path <string>', 'path for css folder')
        .parse(process.argv);
    executeTheAction();
}
const actionList = { reverse, transform, outputFile, convertFromFile, convertToFile, cssBundler };

function executeTheAction() {
    if (process.argv.length < 3) {
        commander.help();
    } else if (process.argv[2] == '-h' || process.argv[2] == '--help') {
        commander.help();
    } else {
        if (!!commander.action) {
            if (actionList[commander.action] != undefined) {
                const argument = (commander.action !== 'reverse' && commander.action !== 'transform') && (commander.file || commander.path);
                actionList[commander.action](argument);
            } else {
                console.log('Err!! Invalid arguement passed. Please choose correct action!!!');
            }
        } else {
            console.log('Err!! No argument passed. Please choose correct action!!!');
            process.exit();
        }
    }
}

function reverse() {
    process.stdin.on('data', function (data) {
        const splitString = data.toString().split('').reverse().join('');
        process.stdout.write(splitString);
    });
}

//Transform stream to uppercase
function transform() {
    const transToUpperCase = function (data, encoding, next) {
        this.push(data.toString().toUpperCase());
        next();
    }
    process.stdin
        .pipe(through(transToUpperCase))
        .pipe(process.stdout);
}

function outputFile(filepath) {
    if (!!filepath) {
        fs.createReadStream(filepath)
            .on('data', (data) => {
                data.toString();
                process.stdout.write(data);
                process.exit();
            })
            .on('error', () => {
                console.error('Failed to fetch the file. Kindly check your file path!');
            })
    } else {
        console.log('No file path was observed!!');
        process.exit();
    }
}

function convertFromFile(filepath) {
    if (!!filepath) {
        try {
            process.stdout.write(convertCsvToJson(filepath));
            process.exit();
        } catch (err) {
            console.error('Failed to fetch the file. Kindly check your file path!');
        }
    } else {
        console.log('No file path was observed!!');
        process.exit();
    }
}

function convertToFile(filepath) {
    if (!!filepath) {
        console.log(filepath.substring(0, filepath.lastIndexOf('.')));
        try {
            const writeStream = fs.createWriteStream(filepath.substring(0, filepath.lastIndexOf('.')) + '.json');
            const data = convertCsvToJson(filepath);
            writeStream.write(data);
            writeStream.on('finish', () => {
                console.log('wrote all data to file');
                process.exit();
            });
            writeStream.end();
        } catch (err) {
            console.error('Failed to fetch the file. Kindly check your file path!');
        }
    } else {
        console.log('No file path was observed!!');
        process.exit();
    }
}

function cssBundler(directory) {
    if (!!directory) {
        let root = path.dirname(require.main.filename);
        root = root.substring(0, root.lastIndexOf('\\'));
        fs.readdirSync(directory).forEach((fileName) => {
            if (path.extname(fileName) === '.css') {
                const data = fs.readFileSync(path.join(root, directory, fileName), { encoding: 'utf8' });
                fs.appendFileSync('./css/bundle.css', data, (err) => {
                    if (err) throw err;
                    console.log('Saved!');
                });
            }
        });
        process.exit();
    }
}

function convertCsvToJson(filePath) {
    const rawData = fs.readFileSync(filePath, { encoding: 'utf8' });
    return JSON.stringify(csvjson.toObject(rawData));
}

streams();