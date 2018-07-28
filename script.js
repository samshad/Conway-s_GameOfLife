var isClicked, tmp, year, loop, nibo;
var dx = [-1, 1, 0, 0, -1, -1, 1, 1];
var dy = [0, 0, 1, -1, -1, 1, -1, 1];

init();

function init() {
    var row = 0, col = 0;
    isClicked = [];
    tmp = [];
    loop = [];
    nibo = "yes";
    year = 0;

    for(var i = 0; i < 15; i++) isClicked[i] = [];
    for(var i = 0; i < 15; i++) tmp[i] = [];
    for(var i = 0; i < 15; i++) loop[i] = [];

    for(var i = 0; i < (15*17); i++){
        var btn = document.createElement("button");
        btn.className = "btn";
        btn.id = "btn-" + row + "-" + col;
        btn.style.color = "#b9c7f1";
        btn.textContent = '.';
        btn.addEventListener("click", initPopulation);
        document.getElementById("btn-div").appendChild(btn);

        isClicked[row].push(0);
        tmp[row].push(0);
        loop[row].push(0);
        col++;
        if(col >= 17){
            row++;
            col = 0;
        }
    }
}

function initPopulation() {
    var id = this.id;
    var str = id.split("-");
    var x = str[1];
    var y = str[2];
    isClicked[x][y] = 1;
    document.getElementById(id).style.color = "black";
    document.getElementById(id).textContent = 'X';
}

function reset() {
    location.reload();
}

function check() {
    var f = "nai";
    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 17; j++){
            if(isClicked[i][j] === 1) f = "paisi";
        }
    }
    if(f === "nai") alert("Put some population first...");
    else{
        document.getElementById("start").style.display = "none";
        document.getElementById("running").style.display = "inline";
        document.getElementById("year").style.display = "inline";
        document.getElementById("year").innerText = year;
        bobaBanai();
        start();
    }
}

function bobaBanai() {
    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 17; j++){
            var id = "btn-" + i + "-" + j;
            var x = document.getElementById(id);
            x.removeEventListener("click", initPopulation);
        }
    }
}

function start() {
    year++;
    document.getElementById("year").innerText = year;
    var ki = hoiseNaki();
    if(ki === "hoise") setTimeout(function(){ start(); }, 1000);
    else if(ki === "loop"){
        year--;
        document.getElementById("running").innerText = "Deadlock Year: ";
        document.getElementById("year").innerText = year;
    }
    else{
        year--;
        document.getElementById("running").innerText = "Survived Year: ";
        document.getElementById("year").innerText = year;
    }
}

function hoiseNaki() {
    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 17; j++){
            tmp[i][j] = 0;
        }
    }

    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 17; j++){
            var cnt = 0;
            for(var l = 0; l < 8; l++){
                var x = i + dx[l];
                var y = j + dy[l];

                if(isValid(x,y)){
                    if(isClicked[x][y] === 1) cnt++;
                }
            }

            if(isClicked[i][j] === 1 && (cnt === 2 || cnt === 3)) tmp[i][j] = 1;
            else if(isClicked[i][j] === 0 && cnt === 3) tmp[i][j] = 1;
        }
    }

    var hoise = "na";

    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 17; j++){
            var id = "btn-" + i + "-" + j;
            if(isClicked[i][j] !== tmp[i][j]) hoise = "hoise";
            isClicked[i][j] = tmp[i][j];
            if(isClicked[i][j] === 1){
                document.getElementById(id).style.color = "black";
                document.getElementById(id).textContent = 'X';
            }
            else{
                document.getElementById(id).style.color = "#b9c7f1";
                document.getElementById(id).textContent = '.';
            }
        }
    }

    if(hoise === "hoise" && year > 2){
        var same = "ho";
        for(var i = 0; i < 15; i++) {
            for (var j = 0; j < 17; j++) {
                if (loop[i][j] !== tmp[i][j]) {
                    same = "na";
                    break;
                }
            }
            if (same === "na") break;
        }
        if(same === "ho") return "loop";
    }

    if(nibo === "yes"){
        nibo = "no";
        for(var i = 0; i < 15; i++){
            for(var j = 0; j < 17; j++){
                loop[i][j] = tmp[i][j];
            }
        }
    }
    else nibo = "yes";

    return hoise;
}

function isValid(a, b) {
    return a >= 0 && a < 15 && b >= 0 && b < 17;
}