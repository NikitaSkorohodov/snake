var Field_size_x = 20;
var Field_size_y = 20;
var snake_speed = 300;
var snake = [];
var direction = 'x+';
var gameIsRunning = false;
var snake_timer;
var food_timer;
var score = 0;

function init() {
    prepareGameField();
    var wrap = document.getElementById('snake-field');
    wrap.style.width = '400px';
    document.getElementById('snake-start').addEventListener('click', function () {
        startGame();
    });
    document.getElementById('snake-renew').addEventListener('click', refreshGame);
    addEventListener('keydown', changeDirection);
}

function prepareGameField() {
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');
    for (var i = 0; i < Field_size_x; i++) {
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;
        for (var j = 0; j < Field_size_y; j++) {
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;
            row.appendChild(cell);
        }
        game_table.appendChild(row);
    }
    document.getElementById('snake-field').appendChild(game_table);
}

function startGame() {
    gameIsRunning = true;
    respawn();
    snake_timer = setInterval(move, snake_speed);
    setTimeout(createFood, 5000);
}

function respawn() {
    var start_coord_x = Math.floor(Field_size_x / 2);
    var start_coord_y = Math.floor(Field_size_y / 2);
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');
    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');
    snake.push(snake_head);
    snake.push(snake_tail);
}

function move() {
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');
    var cord_y = parseInt(snake_coords[1]);
    var cord_x = parseInt(snake_coords[2]);

    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + cord_y + '-' + (cord_x - 1))[0];
    } else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + cord_y + '-' + (cord_x + 1))[0];
    } else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (cord_y - 1) + '-' + cord_x)[0];
    } else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (cord_y + 1) + '-' + cord_x)[0];
    }

    if (!isSnakeUnit(new_unit) && new_unit !== undefined) {
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);
        if (!haveFood(new_unit)) {
            var removed = snake.splice(0, 1)[0];
            var classes = removed.getAttribute('class').split(' ');
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        } else {
            score++;
            createFood(); // Вызываем функцию createFood после съедения еды
        }
    } else {
        finishTheGame();
    }
}

function isSnakeUnit(unit) {
    return snake.includes(unit);
}

function haveFood(unit) {
    return unit.classList.contains('food-unit');
}

function createFood() {
    var foodCreated = false;
    while (!foodCreated) {
        var food_x = Math.floor(Math.random() * Field_size_x);
        var food_y = Math.floor(Math.random() * Field_size_y);
        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        if (!food_cell.classList.contains('snake-unit')) {
            food_cell.classList.remove('food-unit', 'cell-food'); // Удалите классы здесь
            food_cell.classList.add('food-unit', 'cell-food'); // Добавьте классы здесь
            foodCreated = true;
        }
    }
}

function changeDirection(e) {
    switch (e.keyCode) {
        case 37:
            if (direction != 'x+') {
                direction = 'x-';
            }
            break;
        case 38:
            if (direction != 'y-') {
                direction = 'y+';
            }
            break;
        case 39:
            if (direction != 'x-') {
                direction = 'x+';
            }
            break;
        case 40:
            if (direction != 'y+') {
                direction = 'y-';
            }
            break;
    }
}

function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}

function refreshGame() {
    location.reload();
}

window.onload = init;
