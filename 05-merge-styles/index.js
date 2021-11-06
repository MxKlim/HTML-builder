// - [ ] После завершения работы скрипта в папке **project-dist** должен находиться файл **bundle.css** содержащий стили из всех файлов папки **styles**.
// - [ ] При добавлении/удалении/изменении файлов стилей в папке **styles** и повторном запуске скрипта файл **bundle.css** перезаписывается и содержит актуальные стили.
// - [ ] Любые файлы имеющие расширение отличное от **css** или директории игнорируются.
// - [ ] Стили находящиеся в файле **bundle.css** созданном в процессе сборки не должны быть повреждены. 

const fs = require('fs');
const path = require('path');
const url = path.join(__dirname, 'styles');
const filesName = [];
const dirBundle = path.join(__dirname, 'project-dist');
const dir = path.join(__dirname);
// const dirStyle = path.join(__dirname, );


fs.readdir(url, {encoding:'utf8', 'withFileTypes':true}, (err, files) => {
    if(err){console.log(err)}
    files.forEach(file => {
      for(let key in file){
        filesName.push(file[key])  
    }
  });
  writeStyle();
  
});

function writeStyle() {
    fs.stat(`${dirBundle}/bundle.css`, function(err, stat) {
        if(err == null){
            fs.unlink(`${dirBundle}/bundle.css`, (err) => {
                for(let i = 0; i < filesName.length; i++ ){
                    const some = path.extname(`${dir}/styles/${filesName[i]}`);
                
                        if(some === '.css'){
                            fs.readFile(`${url}/${filesName[i]}`, "utf8", function(error,data){ 
                                fs.appendFile(`${dirBundle}/bundle.css`, `${data}`, (error) => {
                                    if(error) throw error;
                                });
                            });
                        }
                }
            });
        }else{
            for(let i = 0; i < filesName.length; i++ ){
                const some = path.extname(`${dir}/styles/${filesName[i]}`);
            
                    if(some === '.css'){
                        fs.readFile(`${url}/${filesName[i]}`, "utf8", function(error,data){ 
                            fs.appendFile(`${dirBundle}/bundle.css`, `${data}`, (error) => {
                                if(error) throw error;
                            });
                        });
                    }
                }
        }
    });
};