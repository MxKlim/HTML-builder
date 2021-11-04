// - [ ] После завершения работы функции создаётся папка **files-copy** содержимое которой является точной копией исходной папки **files**.
// - [ ] При добавлении/удалении/изменении файлов в папке **files** и повторном запуске ```node 04-copy-directory``` содержимое папки **files-copy** актуализируется.
// - [ ] Запрещается использование fsPromises.cp()

const fs = require('fs');
const path = require('path');
const url = path.join(__dirname, 'files');
const filesName = [];
const dir = path.join(__dirname);

fs.readdir(url, {encoding:'utf8', 'withFileTypes':true}, (err, files) => {
    if(err){console.log(err)}
    files.forEach(file => {
      for(let key in file){
        filesName.push(file[key])  
    }
  });
  createDirectory()
  
 
});

function createDirectory(){
  fs.mkdir(`${dir}/files-copy`, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    for(let i = 0; i < filesName.length; i++ ){
      const readFile = fs.createReadStream(`${dir}/files/${filesName[i]}`, 'utf-8');
      const wreateFile = fs.createWriteStream(`${dir}/files-copy/${filesName[i]}`);
      readFile.pipe(wreateFile);
   }

  });
}