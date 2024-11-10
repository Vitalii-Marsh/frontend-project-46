import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import keyParse from './keyParse.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileExtention = (filepath) => path.extname(filepath).slice(1);
const dataParse = (filepath, ext) => parse(filepath, ext);
const readFile = (filepath) => readFileSync(getFilePath(filepath));

const gendiff = (filepath1, filepath2) => {
  const ext1 = getFileExtention(filepath1);
  const path1 = getFilePath(filepath1);
  const data1 = readFile(path1);

  const ext2 = getFileExtention(filepath2);
  const path2 = getFilePath(filepath2);
  const data2 = readFile(path2);

  const parseData1 = dataParse(data1, ext1);
  const parseData2 = dataParse(data2, ext2);

  const keys = keyParse(parseData1, parseData2);

  const result = [];

  keys.map((key) => {
    const value1 = parseData1[key];
    const value2 = parseData2[key];

    if (_.has(parseData1, key) && _.has(parseData2, key) && value1 === value2) {
      result.push(`  ${key}: ${value1}`);
    } else if (_.has(parseData1, key) && _.has(parseData2, key) && value1 !== value2) {
      result.push(`- ${key}: ${value1}`);
      result.push(`+ ${key}: ${value2}`);
    } else if (_.has(parseData1, key) && !_.has(parseData2, key)) {
      result.push(`- ${key}: ${value1}`);
    } else if (!_.has(parseData1, key) && _.has(parseData2, key)) {
      result.push(`+ ${key}: ${value2}`);
    }
    return null;
  });

  return `{\n ${result.join('\n ')}\n}`;
};

export default gendiff;
