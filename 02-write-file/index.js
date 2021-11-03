// - [ ] Внутри папки 02-write-file находится 1 файл **index.js**
// - [ ] При выполнении команды ```node 02-write-file``` в папке  ```02-write-file``` создаётся текстовый файл, а в консоль выводится приглашение на ввод текста(На ваш выбор)
// - [ ] После ввода текста в каталоге ```02-write-file``` введённый текст должен быть записан в созданный ранее файл. Процесс не завершается и ждёт нового ввода.
// - [ ] После следующего ввода созданный изначально текстовый файл дополняется новым текстом, процесс продолжает ждать ввод.
// - [ ] При нажатии сочетания клавиш ```ctrl + c``` или вводе ```exit``` в консоль выводится прощальная фраза и процесс завершается.
const fs = require('fs');
const path = require('path');
const process = require('process');
const {stdin, stdout} = process;
const url = path.join(__dirname,'massage.txt');

fileHandler(url)
stdout.write(' Введите текст...\n');

stdin.on('data', data =>{
   let  Strdata = data.toString();
    if(Strdata.includes('exit')){
        process.exit();
    }
    writeFile(Strdata, url);
    
    
})

function fileHandler(url){
    fs.open(`${url}`, 'w', (err) => {
        if(err) throw err;
    });
    
}
function writeFile(data, url){
    fs.appendFile( url,
        `${data}`,
        err => {
        if (err) throw err;
        console.log('Файл был изменен');
    });
}
process.on('exit', code => {
    if (code === 0) {
        stdout.write('Всего хорошего');
    } else {
        stderr.write(`Что-то пошло не так. Код ошибки ${code}`);
    }
});
