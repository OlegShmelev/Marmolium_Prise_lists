var width = 0;
var height = 0;
var battleField = [];
function setWidth() {
        var newWidth = prompt("Пожалуйста введите ширину", "10");
        if (newWidth != null) {
            width = newWidth;
        }
    }
function setHeight() {
        var newHeigth = prompt("Пожалуйста введите высоту", "10");
        if (newHeigth != null) {
            height = newHeigth;
        }
    }

setWidth();
setHeight();
if(width == height) {
        for(var i = 0; i < width; i++) {
            var arr = [];
            for(var y = 0; y < height; y++) {
                arr.push({
                    chip: false,
                    opened: false,
                    coordinates: "coordinates (" + i + "," + y + ")",
                    msg: "water"
                });

            }
            battleField.push(arr);
        }
        console.log(battleField);
    }else{
        alert("Ошибка, Ширина должна равняться высоте!");
    }
function checkCell(x,y) {
        if(battleField[x] && battleField[x][y]) {
            return true;
        } else {
            return false;
        }
    }
function putTheShip(x,y) {
        if(checkCell(x,y)) {
            battleField[x][y].chip = true;
            battleField[x][y].msg = "ship";
            battleField[x][y].opened = false;
        }
}
function makeShot( x, y) {
    if(checkCell(x, y)){
        if(battleField[x][y].chip == false && battleField[x][y].opened == false) {
            battleField[x][y].msg = "miss";
            battleField[x][y].opened = true;
            alert("Промах");
        }else if(battleField[x][y].msg == "miss" && battleField[x][y].opened == true) {
            alert("в данную ячейку уже стреляли");
        }else if( battleField[x][y].chip == true && battleField[x][y].opened == false) {
            battleField[x][y].msg = "Корабль потоплен";
            battleField[x][y].opened = true;
            battleField[x][y].chip = false;
            alert("Корабль потоплен");
        }else if(battleField[x][y].msg == "Корабль потоплен" && battleField[x][y].opened == true) {
            alert("Корабль уже потоплен");
        };
    } else {
            alert("неверные координаты");
        }

}
function checkShip(battleField) {
    var check = false;
    for(var x = 0;x < height + 1; x++) {
        for(var y = 0; y < height + 1;y++) {
            if(battleField && battleField[x] && battleField[x][y] && battleField[x][y].chip && battleField[x][y].chip == true) {
                check = true;
            }if(x+1 == height && y+1 == height) {
                return check;
            }
        }
    }
}

//putTheShip(1,1);
//putTheShip(1,2);
//putTheShip(1,3);
//makeShot(1,0);
//makeShot(1,1);
//makeShot(1,1);
//makeShot(11,3);