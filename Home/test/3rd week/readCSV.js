const csv = require('csv-parser')
const fs = require('fs')
let results = [];


fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {  //console.log(results)
    //return results;
  });
  setTimeout(()=>{console.log(results)},1000)
  