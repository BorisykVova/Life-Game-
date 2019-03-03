const readlineSync = require('readline-sync');


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


function creat_table() {
    let new_table = [];
    for (let i = 0; i < height; i++) {
          new_table[i] = [];
          for (let j = 0; j < width; j++) {
              new_table[i][j] = Math.round(Math.random())
          }
    }
    return new_table
}


function print_table(table) {
    for(let i = 0; i < height; i++ ){
        for(let j = 0; j < width; j++){
            if(table[i][j] === 1) process.stdout.write('@'); else process.stdout.write(' ');
        }
        console.log('');
    }
}


function isAlive(table, i, j) {
  let count = get(table, i - 1, j - 1) + get(table, i - 1, j) + get(table, i - 1, j + 1) +
              get(table, i    , j - 1)                        + get(table, i    , j + 1) +
              get(table, i + 1, j - 1) + get(table, i + 1, j) + get(table, i + 1, j + 1);

  if (table[i][j] == 1) {
    return count >= 2 && count <= 3;
  } else {
    return count == 3;
  }
}

function get(table, i, j) {
  if (i < 0 || j < 0 || i >= height || j >= width) {
    return 0;
  }
  return table[i][j];
}


function start_life(old_table) {
    let next_table = [];
    for (let i = 0; i < height; i++) {
          next_table[i] = [];
          for (let j = 0; j < width; j++) {
              if(isAlive(old_table, i, j)) next_table[i][j] = 1; else next_table[i][j] = 0;
          }
    }
    return next_table;
}


do{
    var width = readlineSync.question('Enter width:');
    var height = readlineSync.question('Enter height:');
    var speed = readlineSync.question('Enter speed:');
    if(isNumeric(width) && isNumeric(height)  && isNumeric(speed)  ){
        break;
    } else console.log('Input data must be numbers');
}while(true)
let new_table = creat_table();


setInterval(function() {
  console.clear();
  print_table(new_table);
  new_table = start_life(new_table);
}, speed)
