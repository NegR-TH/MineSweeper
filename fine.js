let message = document.getElementById('subtitle');
let table;
let btn;
btn = document.getElementById('btn');
btn.disabled = false;
const eldif = document.getElementById('dif');
const elboard = document.getElementById('boar-size');

document.querySelector('#rfrshBtn').addEventListener('click', () => {
    window.location.reload();
})
document.querySelector("#btn").addEventListener("click", () => {
    document.getElementsByClassName('show1')[0].style.visibility = "hidden";
    document.getElementsByClassName('showBoar')[0].style.visibility = 'visible';
    makingGameBoard()
});

let isFirst = false;

var clicky;

var mine;
var row;
var column;

var difStorage;
var boardStorage;

var begoo = document.getElementById('mnoBegoo');

function makingGameBoard() {

    if (elboard.value == 'small') {
        if (eldif.value == 'bigginer') {
            mine = 10;
            row = 9;
            column = 9
            gameBuuilder(10, 9, 9);
        }
        if (eldif.value == 'medium') {
            mine = 25;
            row = 9;
            column = 9
            gameBuuilder(25, 9, 9);
        }
        else if (eldif.value == 'expert') {
            mine = 40;
            row = 9;
            column = 9
            gameBuuilder(40, 9, 9);
        }
    }
    if (elboard.value == 'medium-board') {
        if (eldif.value == 'bigginer') {
            mine = 20;
            row = 16;
            column = 16;
            gameBuuilder(20, 16, 16);
        }
        if (eldif.value == 'medium') {
            mine = 35;
            row = 16;
            column = 16;
            gameBuuilder(35, 16, 16);
        }
        else if (eldif.value == 'expert') {
            mine = 45;
            row = 16;
            column = 16;
            gameBuuilder(45, 16, 16);
        }
    }
    if (elboard.value == 'larg') {
        if (eldif.value == 'bigginer') {
            mine = 50;
            row = 35;
            column = 20;
            gameBuuilder(50, 35, 20);
        }
        if (eldif.value == 'medium') {
            mine = 80;
            row = 35;
            column = 20;
            gameBuuilder(80, 35, 20);
        }
        else if (eldif.value == 'expert') {
            mine = 200;
            row = 35;
            column = 20;
            gameBuuilder(200, 35, 20);
        }
    }
    console.log(eldif.value)
    difStorage = eldif.value
    console.log(elboard.value)
    boardStorage = elboard.value;
}

const board = [];
function gameBuuilder(mine, row, column) {

    console.log('hey');

    table = document.getElementById('cell');

    const minePositions = getMinePositions(row, column, mine);
    console.log(minePositions);
    for (let i = 0; i < row; i++) {
        var tr = document.createElement('tr');
        const rowA = []
        for (let j = 0; j < column; j++) {
            var td = document.createElement('td');
            const cel = {
                td,
                i,
                j,
                isrevealed: false,
                mineCount: 0,
                isFlagged: false
            }
            if (minePositions.some(p => checkMatch(p, cel))) {
                cel.value = 1;
            }
            else {
                cel.value = 0
            }
            rowA.push(cel);
            tr.append(td);

            cel.td.addEventListener('click', function () {
                clicky++;
                if (isFirst === false) {
                    time()
                }
                if (!cel.isrevealed) {
                    cel.isrevealed = true;
                    cel.td.style.backgroundColor = "rgb(70, 61, 69)";
                    cel.td.style.pointerEvents = 'none';
                    if (cel.value === 1) {
                        cel.td.style.backgroundColor = 'red';
                        cel.td.innerText = '🎃';
                        board.forEach(rowA => {
                            rowA.forEach(cel => {
                                if (cel.value == 1) {
                                    cel.isrevealed = true
                                    cel.td.style.backgroundColor = 'red';
                                    cel.td.innerText = '🎃';
                                } else {
                                    cel.isrevealed = true;
                                    cel.td.style.backgroundColor = "rgb(70, 61, 69)";
                                }
                            })
                        })
                        message.innerText = "Game Over";
                        // need to stop the time
                        clearInterval(Timer);
                        // localStorage.setItem('loseTime', String(count));
                        AuwfulRecord = localStorage.getItem('loseTime') || 0;
                        if (mainTime > AuwfulRecord) {
                            AuwfulRecord = String(mainTime);
                            localStorage.setItem('loseTime', AuwfulRecord);
                            bestRecord.innerHTML = '🪀Strongest looser';
                        } else if (mainTime < AuwfulRecord) {
                            bestRecord.innerHTML = 'really looser?';
                        }
                        // begoo.innerHTML = 'just ' + AuwfulRecord + ' sec'
                    }
                    else {
                        recursive(cel);
                        if (sh === row * column - mine) {
                            message.innerText = 'win';
                            // need to stop the time
                            clearInterval(Timer);
                            // localStorage.setItem('bestTime', String(count));
                            x();
                            begoo.innerHTML = BestRecord;
                            alert('game again?');
                        }
                    }
                }
                isFirst = true;
            })
            cel.td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                if (!cel.isrevealed) {
                    console.log(cel.isrevealed)
                    cel.isFlagged = true;
                    if (cel.td.textContent == '') {
                        cel.td.innerText = '🍕';
                    } else {
                        cel.td.innerText = '';
                    }
                }
            })
        }
        table.style.background = 'cornflowerblue';
        table.append(tr);
        board.push(rowA);
        btn.disabled = true;
    }
    return board;
}
console.log(board);

var sh = 0;

function recursive(celin) {
    console.log('passed if');
    celin.isrevealed = true;
    sh++;
    celin.td.style.backgroundColor = 'gray';
    const adjecentCells = [];

    for (let iOffset = -1; iOffset <= 1; iOffset++) {
        for (let jOffset = -1; jOffset <= 1; jOffset++) {
            if (iOffset == 0 && jOffset == 0) {
                continue;
            }
            if (celin.i + iOffset >= 0 && celin.i + iOffset < row && celin.j + jOffset >= 0 && celin.j + jOffset < column) {
                const adjecentCell = board[celin.i + iOffset][celin.j + jOffset];
                if (adjecentCell.value === 1) {
                    celin.mineCount++;
                    adjecentCells.push(adjecentCell);
                } else {
                    adjecentCells.push(adjecentCell);
                }
            }
        }
    }
    if (celin.mineCount === 0) {
        celin.td.innerText = '';
        adjecentCells.forEach(function (p) {
            console.log((p));
            if (!p.isrevealed) {
                p.isrevealed = true;
                p.td.style.backgroundColor = "gray";
                p.td.innerText = '';
                p.td.style.pointerEvents = 'none';
                recursive(p)
            } else if (p.isrevealed) {
                if (p.td.innerText == '') {
                    console.log(('situation 2.1'));
                }
                if (p.mineCount > 0) {
                    console.log(('situation 2.2'));
                }
            }
        })
    }
    else {
        celin.td.innerText = celin.mineCount;
    }
}

function getMinePositions(rowB, columnB, mineB) {
    const positions = [];
    for (let f = 0; f < mineB;) {
        const position = {
            i: Math.floor(Math.random() * rowB),
            j: Math.floor(Math.random() * columnB),
        }
        // console.log(position);
        if (!positions.some(p => checkMatch(p, position))) {
            positions.push(position);
            f++;
        }
    }
    return positions;
}

function checkMatch(a, b) {
    return a.i === b.i && a.j === b.j;
}
const bestRecord = document.getElementById('bestrec');

const timeBox = document.getElementById('time');
var Timer;
let mainTime;
let min = 0;
let sec = 0;

var count = 0;
// timing
function time() {
    Timer = setInterval(function () {
        count++;
        minute(count);
        seccind(count);
        mainTime = minute(count) + ':' + seccind(count);
        timeBox.innerHTML = mainTime;
        bestRecord.style.visibility = 'visible';
    }, 1000);
}
function minute(count) {
    min = Math.floor(count / 60)
    if (0 <= min <= 9) {
        return `0${min}`
    }
    else {
        return `${min}`
    }
}
function seccind(count) {
    sec = Math.floor(count % 60)
    if (sec < 10) {
        return `0${sec}`
    }
    else if (sec > 9) {
        return `${sec}`
    }
}
// saving data to call and compare it in next time
var BestRecord;
function x() {
    BestRecord = localStorage.getItem('bestTime') || 0;
    if (mainTime < BestRecord) {
        BestRecord = String(mainTime)
        localStorage.setItem('bestTime', BestRecord)
        console.log('new record')
        bestRecord.innerHTML = '🎆new record: ';
    }
    else if (mainTime > BestRecord) {
        bestRecord.innerHTML = '🧸last record: ';
    }
}
