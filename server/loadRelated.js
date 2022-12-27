const { Related } = require('./database.js');
const lineByLine = require('n-readlines');
const liner = new lineByLine('./server/spreadsheets/related.csv');

let line = liner.next();
const data = [];

while (line = liner.next()) {
  const row = line.toString('ascii').split(/(?!\B"[^"]*),(?![^"]*"\B)/);
  data.push({
    id: Number(row[0]),
    current_product_id: Number(row[1]),
    related_product_id: Number(row[2])
  })
}

console.log(data);

async function saveData() {
  let chunkSize = 100000;
  for (let i = 0; i < data.length; i+= chunkSize) {
    let chunk = data.slice(i, i + chunkSize);
    await Related.bulkCreate(chunk);
  }
}

saveData();