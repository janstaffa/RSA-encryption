import fs from 'fs';
import path from 'path';
import { carmichaelFunction } from '../src/functions';
// import {} from 'jest';

const testData: { input: number; expected: number }[] = [
  { input: 154169, expected: 73722 },
];
const dataString = fs.readFileSync(
  path.join(__dirname, 'carmichaelTestData.txt')
);
const realString = dataString.toString();
const lines = realString.split('\n');
lines.forEach((line, lineIdx) => {
  const numbers = line.split('\t');
  numbers.forEach((number, i) => {
    if (!testData[i]) testData[i] = { input: 0, expected: 0 };
    if (lineIdx === 0) {
      testData[i].input = parseInt(number);
    } else {
      testData[i].expected = parseInt(number);
    }
  });
});
console.log(testData);

testData.forEach((data) => {
  test(`tries ${data.input} in carmichaelFunction`, () => {
    expect(carmichaelFunction(data.input)).toBe(data.expected);
  });
});
