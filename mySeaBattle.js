const fieldSize = 10; 
const oneDecked = 4;
const twoDecked = 3;
const threeDecked = 2;
const fourDecked = 1;
const allAmountOfShips = 10;
const typeOfShips = 4;

var marker = { 
    direction : 0, 
    shipSize : 1
}


function CreateNewPlayer (a) {
    var that = this;
    this.field = []; 
    var shipsAmount = {
    amountOfOneDecked: 0,
    amountOfTwoDecked: 0,
    amountOfThreeDecked: 0,
    amountOfFourDecked: 0,
    amountOfHitedShips: 0,
    allShips : 0,
}
    var shipId = 1;
    var putOrDel = 1;
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function createField() { 
    for(var i = 0; i < fieldSize; i++) { 
        var arr = []; 
        for(var j = 0; j < fieldSize; j++) { 
            arr.push({ 
                ship: false, 
                hited: false,
                border : false,
                shipId : 404,
                hitedShip : false,
            }); 
        } 
    that.field.push(arr); 
    } 
} 
function putShip(x, y,a) {
        console.log(a);
    var val = 0
    if(validation(x, y) && validationAmount()){ 
        if (that.field[x][y].border == false && that.field[x][y].ship == false) { 
            for (var i = 0; i < marker.shipSize; i++) {
                that.field[x][y].ship = true;
                val = true; 
                that.field[x][y].direction = marker.direction;
                that.field[x][y].shipId = shipId; 
                createBorder(x , y); 
                color(x, y, "ship");
                marker.direction ? x ++ : y ++;
                } 
            }
    } else {
        console.log("вы не можете поставить корабль")
    }
    if(val){
        shipId++;
    }
}
function deleteShip(x , y) {
    valx = x;
    valy = y;
    var validation = false;
    while(x < fieldSize && y < fieldSize && that.field[x][y].ship){
        delColor(x , y, "ship");
        deleteBorder(x, y);
        that.field[x][y].border =false;
        that.field[x][y].ship = false;
        that.field[x][y].shipId = 404;
        that.field[x][y].direction ? x++ : y++;
        validation = true;
    }
    x = valx;
    y = valy;
    if(validation){
        that.field[x][y].direction ? x-- : y--;
        while (that.field[x][y].ship){
            deleteBorder(x, y)
            delColor(x , y, "ship");
        that.field[x][y].ship = false;
        that.field[x][y].border =false;
        that.field[x][y].shipId = 404;
        that.field[x][y].direction ? x-- : y--;
        } 
    }
    
        if(validation) {
            limitedValidationDel();
            shipId--;
        }
}
function createBorder(x, y) {
    for (var i = y - 1; i < y + 2; i++) {
        if (fieldSize > i && i >= 0) {
            for (var j = x - 1; j < x + 2; j++) {
                if (fieldSize > j && j >= 0) {
                    if (!that.field[j][i].ship) {
                        that.field[j][i].border = true;
                        color(j, i, "border");
                    }
                }
            }
        }
    }
}
function deleteBorder(x, y, id, config) {
    if(!config){
        var shipIdForBorder = that.field[x][y].shipId;
    }
    for (var i = x - 1; i < x + 2; i++) {
        if (fieldSize > i && i >= 0) {
            for (var j = y - 1; j < y + 2; j++) {
                if (fieldSize > j && j >= 0) {
                    delColor(i , j, "border");
                    if(!config){
                        if (!that.field[i][j].ship) {
                        delColor(i , j, "border");
                        that.field[i][j].border = deleteBorder(i, j, shipIdForBorder,true);
                    }
                }else{
                    if(that.field[i][j].shipId != 404){
                        if(that.field[i][j].shipId != id){
                            return true;
                        }
                    }
                }
                }
            }
        }
    }
    if(config){
        return false;
    }
}
function validation(x, y) {

    var value = true;
    for (var i = 0; i < marker.shipSize; i++) {
        if (x < fieldSize && y < fieldSize && that.field[x][y].border == false && that.field[x][y].ship == false) {
            if (marker.direction == 0) {
                y++;
            } else {
                x++;
            }
        } else {
            value = false;
        }
    }
    return value;
}
function validationAmount () {
    var value = false;
    switch(marker.shipSize){
        case 1:
            if (shipsAmount.amountOfOneDecked < oneDecked) {
                shipsAmount.amountOfOneDecked++;
                value = true;
            }
            break;
        case 2:
            if (shipsAmount.amountOfTwoDecked < twoDecked) {
                shipsAmount.amountOfTwoDecked++;
                value = true;
            }
            break;
        case 3:
            if (shipsAmount.amountOfThreeDecked < threeDecked) {
                shipsAmount.amountOfThreeDecked++;
                value = true;
            }
            break;
        case 4:
            if (shipsAmount.amountOfFourDecked < fourDecked) {
                shipsAmount.amountOfFourDecked++;
                value = true;
            }
            break;
    }if (value) {
            shipsAmount.allShips++;
        }
    return value;
}
function limitedValidationDel() {
    switch (marker.shipSize) {
        case 1:
            shipsAmount.amountOfOneDecked--;
            break;
        case 2:
            shipsAmount.amountOfTwoDecked--;
            break;
        case 3:
            shipsAmount.amountOfThreeDecked--;
            break;
        case 4:
            shipsAmount.amountOfFourDecked--;
            break;
    }
    shipsAmount.allShips--;
}
function makeShot(x, y){
    var shipId = that.field[x][y].shipId;
    var conf = false;
    if(that.field[x][y].ship){
        that.field[x][y].hited = true;
        for(var i = 0; i < fieldSize; i++) {  
            for(var j = 0; j < fieldSize; j++) {
                if(that.field[i][j].shipId == shipId && that.field[i][j].hited == false){
                    alert("Ранил");
                    that.field[i][j].hitedShip = true;
                    color(x, y, "hitedShip")
                    return;
                }if(that.field[i][j].shipId == shipId && that.field[i][j].hited == true){
                    conf = true;
                }
            }
        }
    }if(conf){
        alert("Убил");
        that.field[x][y].hitedShip = true;
        color(x, y, "hitedShip")
    }else{
        that.field[x][y].hited = true;
        alert("Мимо");
        color(x, y, "hited");
    }
} 
function createTable(a) {
        console.log(a);
    var table = document.createElement("table");
    for(var i = 0; i < fieldSize; i++) { 
        var tr = document.createElement("tr"); 
        for(var j = 0; j < fieldSize; j++) { 
            var td = document.createElement("td");
            td.innerText = i + "-" + j;
            td.setAttribute("data-x", j);
            td.setAttribute("data-y",i);
            tr.appendChild(td);
        }table.appendChild(tr);
    }
    document.body.appendChild(table);
    return table;
}
var table = createTable(a);
var td = document.getElementsByTagName("td");   
function actionForPutShip(event) {
        var target = event.target;
        var x = target.dataset.x;
        var y = target.dataset.y;
        putShip(+y, +x, a);
}
function actionForDelShip(event) {
    var target = event.target;
        var x = target.dataset.x;
        var y = target.dataset.y;
        deleteShip(+ y, + x);
}
function color(x, y, constClass) {
    td[parseInt(x + "" + "" + y)].classList.add(constClass)
}
function delColor(x, y, constClass) {
    td[parseInt(x + "" + "" + y)].classList.remove(constClass)
}
function createDeckButton(wrapper) {
    wrapper = wrapper || document.body;
    for (var i = 0; i < typeOfShips; i++) {
        var button = document.createElement('button');
        button.textContent = i + 1;
        button.setAttribute('data-decks', i + 1);
        button.addEventListener('click', function (ev) {
            marker.shipSize = parseInt(ev.target.getAttribute('data-decks'))
        });
        wrapper.appendChild(button);
    }
}
function createRotateButton(wrapper) {
    wrapper = wrapper || document.body;
    var button = document.createElement('button');
    button.textContent = 'Горизонталь';
    wrapper.appendChild(button);
    button.addEventListener('click', function () {
        marker.direction ? marker.direction = 0 : marker.direction = 1;
        marker.direction ? button.textContent = 'Вертикаль' : button.textContent = 'Горизонталь';
     })
}
function createButton(wrapper){
    wrapper = wrapper || document.body;
    var button = document.createElement('button');
    table.addEventListener("click",actionForPutShip);
    button.textContent = 'Поставить';
    wrapper.appendChild(button);
    button.addEventListener('click', function(){
        putOrDel ? putOrDel = 0 : putOrDel = 1;
        putOrDel ? button.textContent = 'Поставить' : button.textContent = 'Удалить';
        if(!putOrDel){
            table.addEventListener("click",actionForDelShip);
            table.removeEventListener("click",actionForPutShip);
        }else {
            table.removeEventListener("click",actionForDelShip);
            table.addEventListener("click",actionForPutShip);
        }



    })
}
this.randomPut = function(){
    debugger;
    for(var i = 1; i < 5; i ++){
        marker.shipSize = i;
        while(validationAmount()){
            var x = getRandomInt(0 , 9);
            var y = getRandomInt(0 , 9);
            marker.direction = getRandomInt(0 , 1)
            putShip(x, y);
        }
    }
}
createField();
createDeckButton();
createRotateButton();
createButton();

}

var playerOne = new CreateNewPlayer(1);
var playerTwo = new CreateNewPlayer(2);





