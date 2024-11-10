import path from 'path';
import { readFileSync } from 'fs';
import parsers from './parsers.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileExtention = (filepath) => path.extname(filepath).slice(1);
const dataParse = (filepath, ext) => parsers(filepath, ext);
const readFile = (filepath) => readFileSync(filepath);

const getFormattedData = (filepath) => {
  const ext = getFileExtention(filepath);
  const file = getFilePath(filepath);
  const data = readFile(file);

  const parseData = dataParse(data, ext);

  return parseData;
};

const gendiff = (filepath1, filepath2) => {
  const parseData1 = getFormattedData(filepath1);
  const parseData2 = getFormattedData(filepath2);

  return parseData1, parseData2;
};

export default gendiff;