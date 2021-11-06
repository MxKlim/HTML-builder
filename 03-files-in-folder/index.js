// - [ ] При выполнении команды ```node 03-files-in-folder``` в корневом каталоге репозитория в консоль выводится информация о файлах содержащихся внутри ***03-files-in-folder/secret-folder***.
//  Данные должны быть выведены в формате <имя файла>-<расширение файла>-<вес файла>. Пример: ```example - txt - 128.369kb``` (округлять не нужно, конвертация в кб по желанию!)
// - [ ] Информация должна выводиться только для файлов. Наличие информации о директориях считается ошибкой.

const fs = require('fs');
const path = require('path');
const url = path.join(__dirname, 'secret-folder');
const filesName = [];

fs.readdir(url, {encoding:'utf8', 'withFileTypes':true}, (err, files) => {
  files.forEach(file => {
      for(let key in file){
        filesName.push(file[key]); 
    }
    
  });

  filesName.forEach(item =>{
    let urlItem = path.join(__dirname, 'secret-folder', item);
    fs.stat(urlItem, (err, stats) => {
        if(stats.isFile()){
            console.log(`${path.parse(urlItem).name} - ${path.extname(item)} - ${(stats.size/1000).toFixed(2)} Kb`);
        }
    });
   
  });
    
});
