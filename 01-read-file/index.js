const fs = require('fs');
const path = require('path');
/*
fs.readFile(
    path.join(__dirname, "text.txt"),
    "utf-8",
    (err, data) => {
      if (err) throw err;
      console.log(data);
    }
  );
*/
const  url = path.join(__dirname, "text.txt");
const stream = fs.createReadStream(url, 'utf-8');
  stream.on('data', partData => console.log(partData));
  stream.on('error', error => console.log('Error', error.message));

