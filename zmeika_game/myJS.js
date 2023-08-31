var Filed_size_x =20;
var Filed_size_y =20;
var snake_speed =300;
var snake=[];
var direction='y+';
var gameIsRunning =false;
var snke_tmer;
var food_tmer;
var score = 0;
function init(){
    prepareGameField();
    var warp= document.getElementsByClassName('warp')[0];
    warp.computedStyleMap.width='400px';
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', rehreshGame);
    addEventListener('keydown', changeDirection)
}
function prepareGameField(){
    var game_table = document.createElement('table');
    game_table.setAttribute('class','game-table');
    for(var i =0; i< Filed_size_x; i++){
        var row= document.createElement('tr')
        row.clessName = 'game-table-row row-' + i;
        for (var j=0; j< Filed_size_y; j++){
            var cell = document.createElement('td');
            cell.className= 'game-table-cell cell-' + i + '-' + j;
            row.appendChild(cell);
        }
        game_table.appendChild(game_table);
    }
    document.getElementById('snake-field').appendChild(game_table);
}
function startGame(){
    gameIsRunning= true;
    respawn();
    snke_tmer= setInterval(move, snake_speed);
    setTimeout(createFood, 5000)
}
function respawn(){
    var start_coord_x = Math.floor(Filed_size_x / 2);
    var start_coord_y = Math.floor(Filed_size_y / 2);
    var snake_head = document.getElementsByClassName('cell-'+ start_coord_y + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class')+ 'snake-unit');
    var snake_tail = document.getElementsByClassName('cell-'+ (start_coord_y - 1 ) + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_head.getAttribute('class')+ 'snake-unit');
    snake.push(snake_head);
    snake.push(snake_tail);


}
function move(){
    var snake_head_classes = snake[snake.langth - 1].getAttribute('class').split(' ');
    var new_unit;
    var snake_cords = snake_head_classes[1].spllit('-');
    var cord_y = parseInt(snake_cords[1]);
    var cord_x = parseInt(snake_cords[2]);
    if (direction == 'x-'){
        new_unit = document.getElementsByClassName('cell- ' + (cord_y)+'-'+(cord_x-1))[0];
    }
    else if (direction == 'x+'){
        new_unit = document.getElementsByClassName('cell- ' + (cord_y)+'-'+(cord_x-1))[0];
    }
    if (direction == 'y+'){
        new_unit = document.getElementsByClassName('cell- ' + (cord_y - 1)+'-'+(cord_x-1))[0];
    }
    if (direction == 'y-'){
        new_unit = document.getElementsByClassName('cell- ' + (cord_y + 1)+'-'+(cord_x-1))[0];
    }
    if (!isSnakeUnit(new_unit) && new_unit !== undefined){
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new unit);
        if(!haveFood(new_unit)){

            var removed = snake.splice(3,1)[0];
             var classes= removed.getAttribute('class').split('')
            
            } 
            else{
                finishTheGame();
            }
    }
    function isSnakeUnit(unuit){
        var check= fale;
        if (snake.includes(unuit)){
            check = true;
        }
        return check;
    }
    function haveFood(unit){
        var check = false;
        var unit_classes = unit.getAttribute('class').split(' ');
        if (unit_classes.includes('food-unit')){
            check= true;
            createFood();
            score++;
        }
        return check;
    }
    function createFood(){
        var foodCreated = false;
        while (!foodCreated){
            var food_x = Math.floor(Math.random() * Filed_size_x);
            var food_y = Math.floor(Math.random() * Filed_size_y);
        }
    }

}