var isClicked, tmp, year, loop, nibo, shesh;
var dx = [-1, 1, 0, 0, -1, -1, 1, 1];
var dy = [0, 0, 1, -1, -1, 1, -1, 1];
var score = [0,0,0], tmpS = [0,0,0,0];
var isKeyDown = "no", prothom = "no";
var dan = 30, niche = 30;

window.onload = function () {
    init();
}

window.onmouseup = function() {
    isKeyDown = "no";
    prothom = "no";
    //console.log(isKeyDown);
}

function printScore() {
    document.getElementById("one").textContent = score[0].toString();
    document.getElementById("two").textContent = score[1].toString();
    document.getElementById("three").textContent = score[2].toString();
}

function init() {
    var row = 0, col = 0;
    isClicked = [];
    tmp = [];
    loop = [];
    nibo = "yes";
    year = 0;
    isKeyDown = "no";
    prothom = "no";
    shesh = "no";

    for(var i = 0; i < dan; i++) isClicked[i] = [];
    for(var i = 0; i < dan; i++) tmp[i] = [];
    for(var i = 0; i < dan; i++) loop[i] = [];

    for(var i = 0; i < (dan*niche); i++){
        var btn = document.createElement("button");
        btn.className = "btn";
        btn.id = "btn-" + row + "-" + col;
        btn.style.color = "#b9c7f1";
        btn.textContent = '.';
        btn.addEventListener("click", initPopulation);
        btn.addEventListener("mouseover", mouseOver);
        btn.addEventListener("mouseout", mouseOut);
        btn.addEventListener("mousedown", down);
        //btn.addEventListener("mouseup", up);
        document.getElementById("btn-div").appendChild(btn);

        isClicked[row].push(0);
        tmp[row].push(0);
        loop[row].push(0);
        col++;
        if(col >= niche){
            row++;
            col = 0;
        }
    }
    printScore();
}

function initPopulation() {
    if(this.textContent === '.'){
        var id = this.id;
        var str = id.split("-");
        var x = str[1];
        var y = str[2];
        isClicked[x][y] = 1;
        document.getElementById(id).style.color = "black";
        document.getElementById(id).textContent = '\326';
        prothom = "no"
    }

    else if(this.textContent === '\326'){
        var id = this.id;
        var str = id.split("-");
        var x = str[1];
        var y = str[2];
        isClicked[x][y] = 0;
        this.style.color = "#7183ff";
        this.textContent = '.';
        prothom = "no"
    }
}

function genGrid() {
    var myNode = document.getElementById("btn-div");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    init();
    document.getElementById("start").style.display = "inline";
    document.getElementById("running").innerText = "Running Year: ";
    document.getElementById("running").style.display = "none";
    document.getElementById("year").style.display = "none";
}

function reset() {
    if(shesh === "no") updateScore();
    genGrid();
    //location.reload();
}

function check() {
    var f = "nai";
    for(var i = 0; i < dan; i++){
        for(var j = 0; j < niche; j++){
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
    for(var i = 0; i < dan; i++){
        for(var j = 0; j < niche; j++){
            var id = "btn-" + i + "-" + j;
            var x = document.getElementById(id);
            x.removeEventListener("click", initPopulation);
        }
    }
}

function updateScore() {
    for(var i = 0; i < 3; i++){
        tmpS[i] = score[i];
    }

    tmpS[3] = parseInt(year);
    tmpS.sort(function(a, b){return b - a});

    for(var i = 0; i < 3; i++){
        score[i] = tmpS[i];
    }
}

function start() {
    year++;
    document.getElementById("year").innerText = year;
    var ki = hoiseNaki();
    if(ki === "hoise") setTimeout(function(){ start(); }, 750);
    else{
        year--;
        if(year > 0) {
            document.getElementById("running").innerText = "Survived Year: ";
            document.getElementById("year").innerText = year;
        }
    }
}

function hoiseNaki() {
    for(var i = 0; i < dan; i++){
        for(var j = 0; j < niche; j++){
            tmp[i][j] = 0;
        }
    }

    for(var i = 0; i < dan; i++){
        for(var j = 0; j < niche; j++){
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

    for(var i = 0; i < dan; i++){
        for(var j = 0; j < niche; j++){
            var id = "btn-" + i + "-" + j;
            if(isClicked[i][j] !== tmp[i][j]) hoise = "hoise";
            isClicked[i][j] = tmp[i][j];
            if(isClicked[i][j] === 1){
                document.getElementById(id).style.color = "black";
                document.getElementById(id).textContent = '\326';
            }
            else{
                document.getElementById(id).style.color = "#b9c7f1";
                document.getElementById(id).textContent = '.';
            }
        }
    }

    if(hoise === "hoise" && year > 2){
        var same = "ho";
        for(var i = 0; i < dan; i++) {
            for (var j = 0; j < niche; j++) {
                if (loop[i][j] !== tmp[i][j]) {
                    same = "na";
                    break;
                }
            }
            if(same === "na") break;
        }
        if(same === "ho") document.getElementById("running").innerText = "Deadlock: ";
    }

    if(nibo === "yes"){
        nibo = "no";
        for(var i = 0; i < dan; i++){
            for(var j = 0; j < niche; j++){
                loop[i][j] = tmp[i][j];
            }
        }
    }
    else nibo = "yes";

    return hoise;
}

function isValid(a, b) {
    return a >= 0 && a < dan && b >= 0 && b < niche;
}

function mouseOver() {
    if(this.textContent === '.' && isKeyDown === "no"){
        this.style.color = "#7183ff";
    }

    else if(this.textContent === '.' && isKeyDown === "yes"){
        var id = this.id;
        var str = id.split("-");
        var x = str[1];
        var y = str[2];
        isClicked[x][y] = 1;
        this.style.color = "black";
        this.textContent = '\326';
    }

    else if(this.textContent === '\326' && isKeyDown === "yes"){
        var id = this.id;
        var str = id.split("-");
        var x = str[1];
        var y = str[2];
        isClicked[x][y] = 0;
        this.style.color = "#b9c7f1";
        this.textContent = '.';
    }
}

function mouseOut() {
    if(this.textContent === '.' && isKeyDown === "no"){
        this.style.color = "#b9c7f1";
    }

    else if(prothom === "yes" && this.textContent === '.'){
        prothom = "no";
        var id = this.id;
        var str = id.split("-");
        var x = str[1];
        var y = str[2];
        isClicked[x][y] = 1;
        this.style.color = "black";
        this.textContent = '\326';
    }
}

function down() {
    isKeyDown = "yes";
    prothom = "yes";

    //console.log(isKeyDown);
}

/*function up() {
    isKeyDown = "no";
    prothom = "no";
    console.log(isKeyDown);
}*/