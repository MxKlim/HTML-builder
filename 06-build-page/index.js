// - [ ] После завершения работы скрипта должна быть создана папка **project-dist**
// - [ ] В папке **project-dist** должны находиться файлы **index.html** и **stye.css** 
// - [ ] В папке **project-dist** должна находиться папка **assets** являющаяся точной копией папки **assets** находящейся в **06-build-page**
// - [ ] Запрещается использование fsPromises.cp()
// - [ ] Файл **index.html** должен содержать разметку являющуюся результатом замены шаблонных тегов в файле **template.html**
// - [ ] Файл **style.css** должен содержать стили собранные из файлов папки **styles** 
// - [ ] При добавлении компонента в папку и соответствующего тега в исходный файл **template.html** повторное выполнение скрипта приведёт файл **index.html** в папке **project-dist** в актуальное состояние перезаписав его. Файл **style.css** и папка **assets** так же должны поддерживать актуальное состояние 
// - [ ] Исходный файл **template.html** не должен быть изменён в ходе выполнения скрипта
// - [ ] Запись в шаблон содержимого любых файлов кроме файлов с расширением **.html** является ошибкой  

const fs = require('fs');
const path = require('path');
// пути 
const  dir = path.join(__dirname);
const  urlBP = path.join(__dirname, 'template.html');
const  urlComponent = path.join(__dirname, 'components');
const  dirProject = path.join(__dirname, "project-dist");
const  dirAssets = path.join(__dirname, "assets");
// хранилище
const tempArr = [];
const filesNameCompanents = [];
const filesNameStyle = [];
const filesNameAssets = [];
const fontsArr = [];
const imgArr = [];
const svgArr = [];
const tempObj = {};

createDirProjectDist()

    function createDirProjectDist(){
        fs.mkdir(`${dirProject}`, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
            fsReadDir(`${dir}/styles`, filesNameStyle, createCss);
            fsReadDir(urlComponent, filesNameCompanents, createIndex);
            fsReadDir(dirAssets, filesNameAssets, copyAssets);
            
        });
    }

    function createIndex() {
    fs.readFile(urlBP, 'utf-8', (err, data) => {
        if(err) {console.log(err)}
        let x = 0;
        let serth = data.indexOf('{', x);
        while(serth){
            let index = data.indexOf('{', x)
            if(data.indexOf('{'), index+1 ){
                x = index+1;
            let indexTwo = data.indexOf('}', x);
            let template = data.substring(x+1, indexTwo);
            x = indexTwo;
            tempArr.push(template); 
            tempObj[template] = x+1; 
            } else {
                serth = false;
            } 
        }
        const indexHTML = fs.createReadStream(`${dir}/template.html`, 'utf-8');
            let newDATA = '';
            indexHTML.on('data', function (chunk) {
                let tempData = chunk;
                tempArr.forEach(item =>{
                    const fileHtml = fs.readFile(`${urlComponent}/${item}.html`, 'utf-8', (err, data) => {
                        if(err) {console.log(err)};
    
                        let c =  tempData.replace(`{{${item}}}`, data);
                        
                       
                        tempData = c; 

                        setTimeout(()=>{
                            createIndexHTMLFile(c)
                        }, 0)
                        
                        
                    });
                });
        });
    });
    }

    function createIndexHTMLFile(data) {
        fs.writeFile(`${dirProject}/index.html`,data, function(err) {
            if (err) {
                return console.log(err);
            }
        });
    }
    function createCss(push) {
        fs.stat(`${dirProject}/style.css`, function(err, stat) {
            if(err == null) {
                fs.unlink(`${dirProject}/style.css`, (err) => {
                    if (err) throw err;
                    for(let i = 0; i < push.length; i++ ){
                        const some = path.extname(`${dir}/styles/${push[i]}`);
                         if(some === '.css'){
                            fs.readFile(`${dir}/styles/${push[i]}`, "utf8", function(error,data){ 
                                fs.appendFile(`${dirProject}/style.css`, `${data}`, (error) => {
                                    if(error) throw error;
                                });
                            });
                         }
                        }
                });
            }else{
                for(let i = 0; i < push.length; i++ ){
                const some = path.extname(`${dir}/styles/${push[i]}`);
                 if(some === '.css'){
                    fs.readFile(`${dir}/styles/${push[i]}`, "utf8", function(error,data){ 
                        fs.appendFile(`${dirProject}/style.css`, `${data}`, (error) => {
                            if(error) throw error;
                        });
                    });
                 }
                }
            }
        }); 
            
    }
    function fsReadDir(url, push, fn) {

    fs.readdir(url, {encoding:'utf8', 'withFileTypes':true}, (err, files) => {
        if(err){console.log(err)}
        files.forEach(file => {
          for(let key in file){
            push.push(file[key]);  
        }
      });
      fn(push);
    });
   
    }
    function copyFiles(dirInUrl,filesArr, pathRead, pathWrite) {
        fs.mkdir(dirInUrl, { recursive: true }, (err) => {
            if (err) {
              throw err;
            }
            for(let i = 0; i < filesArr.length; i++ ){
                const readFile = fs.createReadStream(`${pathRead}/${filesArr[i]}`);
                const wreateFile = fs.createWriteStream(`${pathWrite}/${filesArr[i]}`);
                readFile.pipe(wreateFile);
             }
        });
    }
    function copyAssets() {
        fs.mkdir(`${dirProject}/assets`, { recursive: true }, (err) => {
            if(err) console.log(err)
        
            fsReadDir(path.join(__dirname, 'assets', 'fonts'), fontsArr, ()=>{
                copyFiles(`${dirProject}/assets/fonts`, fontsArr , path.join(__dirname, 'assets', 'fonts'), `${dirProject}/assets/fonts`)
            }); 
            fsReadDir(path.join(__dirname, 'assets', 'img'), imgArr, ()=>{
                copyFiles(`${dirProject}/assets/img`, imgArr , path.join(__dirname, 'assets', 'img'), `${dirProject}/assets/img`)
            }); 
            fsReadDir(path.join(__dirname, 'assets', 'svg'), svgArr, ()=>{
                copyFiles(`${dirProject}/assets/svg`, svgArr , path.join(__dirname, 'assets', 'svg'), `${dirProject}/assets/svg`)
            }); 
        });
    }

