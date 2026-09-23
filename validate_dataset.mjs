import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/data/dsa_data.json', 'utf8'));

console.log('=== DATASET VALIDATION ===');
console.log(`Total Problems in dsa_data.json: ${data.length}`);

if (data.length !== 211) {
  console.error(`ERROR: Expected 211 problems, found ${data.length}`);
}

const expectedRanges = [
  { topic: "01 Arrays", start: 1, end: 30, count: 30 },
  { topic: "02 Binary Search", start: 31, end: 37, count: 7 },
  { topic: "03 Sorting", start: 38, end: 44, count: 7 },
  { topic: "04 Hashing", start: 45, end: 53, count: 9 },
  { topic: "05 Linked Lists", start: 54, end: 68, count: 15 },
  { topic: "06 Stack and Queue", start: 69, end: 78, count: 10 },
  { topic: "07 Heap", start: 79, end: 84, count: 6 },
  { topic: "08 Recursion & Backtracking", start: 85, end: 98, count: 14 },
  { topic: "09 Trees", start: 99, end: 115, count: 17 },
  { topic: "10 Trees II", start: 116, end: 126, count: 11 },
  { topic: "11 Graphs", start: 127, end: 146, count: 20 },
  { topic: "12 Greedy", start: 147, end: 154, count: 8 },
  { topic: "13 Dynamic Programming", start: 155, end: 185, count: 31 },
  { topic: "14 Math", start: 186, end: 201, count: 16 },
  { topic: "15 Miscellaneous", start: 202, end: 211, count: 10 }
];

let hasError = false;
const seenNums = new Set();

data.forEach((p, idx) => {
  if (seenNums.has(p.num)) {
    console.error(`Duplicate problem number: ${p.num}`);
    hasError = true;
  }
  seenNums.add(p.num);

  if (p.num !== idx + 1) {
    console.error(`Out of order item at index ${idx}: expected num ${idx + 1}, got ${p.num}`);
    hasError = true;
  }
});

expectedRanges.forEach(r => {
  const items = data.filter(p => p.topic === r.topic);
  if (items.length !== r.count) {
    console.error(`ERROR: ${r.topic} expected ${r.count} items, found ${items.length}`);
    hasError = true;
  }
  const minNum = Math.min(...items.map(p => p.num));
  const maxNum = Math.max(...items.map(p => p.num));
  if (minNum !== r.start || maxNum !== r.end) {
    console.error(`ERROR: ${r.topic} expected range ${r.start}-${r.end}, got ${minNum}-${maxNum}`);
    hasError = true;
  }
});

if (!hasError) {
  console.log('SUCCESS: All 211 problems perfectly match sequential order 01-211 and expected topic ranges 01-15!');
}
