let timer_start, timer_game, timer_finish, timer_time, good_positions, wrong, right, speed, timerStart, positions;
let game_started = false;
let streak = 0;
let max_streak = 0;
let best_time = 99.999;
let index; // Use to save the number of position when player click on it and calculate after
let index_check;
let mode = 4;
let mode_data = {};
let randomcheck = false;
mode_data[4] = [6, '119px'];
mode_data[5] = [10, '92px'];
mode_data[6] = [14, '74px'];
mode_data[7] = [18, '61px'];
mode_data[8] = [20, '51px'];
mode_data[9] = [24, '44px'];
mode_data[10] = [28, '38px'];

// Get max streak from cookie
const regex = /max-streak_thermite=([\d]+)/g;
let cookie = document.cookie;
if((cookie = regex.exec(cookie)) !== null){
    max_streak = cookie[1];
}
// Get max streak from cookie
const regex_time = /best-time_thermite=([\d.]+)/g;
cookie = document.cookie;
if((cookie = regex_time.exec(cookie)) !== null){
    best_time = parseFloat(cookie[1]);
}

const sleep = (ms, fn) => {return setTimeout(fn, ms)};

const range = (start, end, length = end - start + 1) => {
    return Array.from({length}, (_, i) => start + i)
}

const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        if (i === 0 || i === 3 || i === 12 || i === 15) continue;
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// Options
document.querySelector('#speed').addEventListener('input', function(ev){
    document.querySelector('.speed_value').innerHTML = ev.target.value + 's';
    streak = 0;
    reset();
});
document.querySelector('#grid').addEventListener('input', function(ev){
    document.querySelector('.grid_value').innerHTML = ev.target.value + 'x' + ev.target.value;
    mode = ev.target.value;
    streak = 0;
    reset();
});

// Resets
document.querySelector('.btn_again').addEventListener('click', function(){
    streak = 0;
    reset();
});

function listener(ev){
    if(!game_started) return;

    index = ev.target.dataset.position;
    //console.log(index);
    if (ev.target.classList.value === "group good") {   
        ev.target.classList.remove('good');
        index_check = false;
    }
    else {
        ev.target.classList.add('good');
        index_check = true;
    }

    check();
}

// Vấn đề cần giải quyết: Từ 1 ma trận hoàn chỉnh, random click chuột vào mỗi ô để ra quiz cho player -> Biến "index" 


function addListeners(){
    document.querySelectorAll('.group').forEach(el => {
        el.addEventListener('mousedown', listener);
    });
}

function check(){

    const itemList = document.querySelectorAll('.group');
    // console.log(index); //debug
    let count = 0; 


    if (randomcheck === false) {
        // The higher value, the more difficult.
        var difficult = 3;
        for (var i = 0; i < difficult; i++) {
            let 
                a = Math.floor(Math.random() * 4),
                b = Math.floor(Math.random() * 3 + 5),
                c = Math.floor(Math.random() * 6 + 9);
            
            if (i === 0) index = a;
            else if (index === 1) index = b;
            else index = c;
            
            if (parseInt(index) === 0 || parseInt(index) === 4 || parseInt(index) === 8 || parseInt(index) === 12) {
                if (parseInt(index) + 1 > -1 && parseInt(index) + 1 < 16) {if (itemList[parseInt(index) + 1].classList.value === "group good") itemList[parseInt(index) + 1].classList.remove('good'); else itemList[parseInt(index) + 1].classList.add('good')}
                if (parseInt(index) + 4 > -1 && parseInt(index) + 4 < 16) {if (itemList[parseInt(index) + 4].classList.value === "group good") itemList[parseInt(index) + 4].classList.remove('good'); else itemList[parseInt(index) + 4].classList.add('good')}
                if (parseInt(index) - 4 > -1 && parseInt(index) - 4 < 16) {if (itemList[parseInt(index) - 4].classList.value === "group good") itemList[parseInt(index) - 4].classList.remove('good'); else itemList[parseInt(index) - 4].classList.add('good')}
            }
            
            else if (parseInt(index) === 3 || parseInt(index) === 7 || parseInt(index) === 11) {
                if (parseInt(index) - 1 > -1 && parseInt(index) - 1 < 16) {if (itemList[parseInt(index) - 1].classList.value === "group good") itemList[parseInt(index) - 1].classList.remove('good'); else itemList[parseInt(index) - 1].classList.add('good')}
                if (parseInt(index) + 4 > -1 && parseInt(index) + 4 < 16) {if (itemList[parseInt(index) + 4].classList.value === "group good") itemList[parseInt(index) + 4].classList.remove('good'); else itemList[parseInt(index) + 4].classList.add('good')}
                if (parseInt(index) - 4 > -1 && parseInt(index) - 4 < 16) {if (itemList[parseInt(index) - 4].classList.value === "group good") itemList[parseInt(index) - 4].classList.remove('good'); else itemList[parseInt(index) - 4].classList.add('good')}
            }
        
            else {
                if (parseInt(index) + 1 > -1 && parseInt(index) + 1 < 16) {if (itemList[parseInt(index) + 1].classList.value === "group good") itemList[parseInt(index) + 1].classList.remove('good'); else itemList[parseInt(index) + 1].classList.add('good')}
                if (parseInt(index) + 4 > -1 && parseInt(index) + 4 < 16) {if (itemList[parseInt(index) + 4].classList.value === "group good") itemList[parseInt(index) + 4].classList.remove('good'); else itemList[parseInt(index) + 4].classList.add('good')}
                if (parseInt(index) - 1 > -1 && parseInt(index) - 1 < 16) {if (itemList[parseInt(index) - 1].classList.value === "group good") itemList[parseInt(index) - 1].classList.remove('good'); else itemList[parseInt(index) - 1].classList.add('good')}
                if (parseInt(index) - 4 > -1 && parseInt(index) - 4 < 16) {if (itemList[parseInt(index) - 4].classList.value === "group good") itemList[parseInt(index) - 4].classList.remove('good'); else itemList[parseInt(index) - 4].classList.add('good')}
            }
            if (itemList[parseInt(index)].classList.value === "group good") itemList[parseInt(index)].classList.remove('good');
            else itemList[parseInt(index)].classList.add('good');
            console.log(index);
        }
        randomcheck = true;
    } else {

        // console.log(itemList[parseInt(index)].classList.value); // debug 2
        if (parseInt(index) === 0 || parseInt(index) === 4 || parseInt(index) === 8 || parseInt(index) === 12) {
            if (parseInt(index) + 1 > -1 && parseInt(index) + 1 < 16) {if (itemList[parseInt(index) + 1].classList.value === "group good") itemList[parseInt(index) + 1].classList.remove('good'); else itemList[parseInt(index) + 1].classList.add('good')}
            if (parseInt(index) + 4 > -1 && parseInt(index) + 4 < 16) {if (itemList[parseInt(index) + 4].classList.value === "group good") itemList[parseInt(index) + 4].classList.remove('good'); else itemList[parseInt(index) + 4].classList.add('good')}
            if (parseInt(index) - 4 > -1 && parseInt(index) - 4 < 16) {if (itemList[parseInt(index) - 4].classList.value === "group good") itemList[parseInt(index) - 4].classList.remove('good'); else itemList[parseInt(index) - 4].classList.add('good')}
        }
        
        else if (parseInt(index) === 3 || parseInt(index) === 7 || parseInt(index) === 11) {
            if (parseInt(index) - 1 > -1 && parseInt(index) - 1 < 16) {if (itemList[parseInt(index) - 1].classList.value === "group good") itemList[parseInt(index) - 1].classList.remove('good'); else itemList[parseInt(index) - 1].classList.add('good')}
            if (parseInt(index) + 4 > -1 && parseInt(index) + 4 < 16) {if (itemList[parseInt(index) + 4].classList.value === "group good") itemList[parseInt(index) + 4].classList.remove('good'); else itemList[parseInt(index) + 4].classList.add('good')}
            if (parseInt(index) - 4 > -1 && parseInt(index) - 4 < 16) {if (itemList[parseInt(index) - 4].classList.value === "group good") itemList[parseInt(index) - 4].classList.remove('good'); else itemList[parseInt(index) - 4].classList.add('good')}
        }

        else {
            if (parseInt(index) + 1 > -1 && parseInt(index) + 1 < 16) {if (itemList[parseInt(index) + 1].classList.value === "group good") itemList[parseInt(index) + 1].classList.remove('good'); else itemList[parseInt(index) + 1].classList.add('good')}
            if (parseInt(index) + 4 > -1 && parseInt(index) + 4 < 16) {if (itemList[parseInt(index) + 4].classList.value === "group good") itemList[parseInt(index) + 4].classList.remove('good'); else itemList[parseInt(index) + 4].classList.add('good')}
            if (parseInt(index) - 1 > -1 && parseInt(index) - 1 < 16) {if (itemList[parseInt(index) - 1].classList.value === "group good") itemList[parseInt(index) - 1].classList.remove('good'); else itemList[parseInt(index) - 1].classList.add('good')}
            if (parseInt(index) - 4 > -1 && parseInt(index) - 4 < 16) {if (itemList[parseInt(index) - 4].classList.value === "group good") itemList[parseInt(index) - 4].classList.remove('good'); else itemList[parseInt(index) - 4].classList.add('good')}
        }
        
        
        for (let i = 0; i < 16; i++) {
            if(itemList[parseInt(i)].classList.value === "group good") count++;
        }
        console.log(count);
        // Nếu chọn sai 3 lần = FAIL
        if(wrong === 100){
            resetTimer();
            game_started = false;
            streak = 0;
            reset();
            return;
        }
        if(count === 16){
            stopTimer();
            streak++;
            if(streak > max_streak){
                max_streak = streak;
                document.cookie = "max-streak_thermite="+max_streak;
            }
            let time = document.querySelector('.streaks .time').innerHTML;
            if(parseFloat(time) < best_time){
                best_time = parseFloat(time);
                document.cookie = "best-time_thermite="+best_time;
            }
            let leaderboard = new XMLHttpRequest();
            leaderboard.open("HEAD", 'streak.php?streak='+streak+'&max_streak='+max_streak
                +'&speed='+speed+'&mode='+mode+'&time='+time);
            leaderboard.send();
            reset();
        }
    }
}

function reset(){
    randomcheck = false;
    game_started = false;

    resetTimer();
    clearTimeout(timer_start);
    clearTimeout(timer_game);
    clearTimeout(timer_finish);

    document.querySelector('.splash').classList.remove('hidden');
    document.querySelector('.groups').classList.add('hidden');

    document.querySelectorAll('.group').forEach(el => { el.remove(); });

    start();
}

function start(){
    console.log('---GAME STARTING---');
    wrong = 0;
    right = 0;


    // Random function. Example if "mode" = 4 (4x4) then positions in range (0, 15)
    positions = range(0, Math.pow(mode, 2) - 1 );
    shuffle(positions);

    //mode_data[mode][0]. Example: if "mode" = 4 then positions.slice(0, mode_data[4][0]) = positions.slice(0, 6)
    //good_positions = positions.slice(6, 11);
    // RANDOM FUNCTION 
    good_positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    let div = document.createElement('div');
    div.classList.add('group');
    div.style.width = mode_data[mode][1];
    div.style.height = mode_data[mode][1];
    const groups = document.querySelector('.groups');


    for(let i=0; i < positions.length; i++){
        let group = div.cloneNode();
        group.dataset.position = i.toString(); //data positions
        groups.appendChild(group);
    }

    addListeners();
    

    document.querySelector('.streak').innerHTML = streak;
    document.querySelector('.max_streak').innerHTML = max_streak;
    document.querySelector('.best_time').innerHTML = best_time;
    
    timer_start = sleep(2000, function(){
        document.querySelector('.splash').classList.add('hidden');
        document.querySelector('.groups').classList.remove('hidden');

        let blocks = document.querySelectorAll('.group');
        good_positions.forEach( pos => {
            blocks[pos].classList.add('good');
        });
       
        check();
        console.log('---RANDOM SUCCESS---');
       
        timer_game = sleep(1, function(){
            // document.querySelectorAll('.group.good').forEach(el => { el.classList.remove('good')});
            game_started = true;

            startTimer();
            speed = document.querySelector('#speed').value;
            timer_finish = sleep((speed * 1000), function(){
                game_started = false;
                wrong = 100;
                check();
            });
        });
    });
}

function startTimer(){
    timerStart = new Date();
    timer_time = setInterval(timer,1);
}

function timer(){
    let timerNow = new Date();
    let timerDiff = new Date();
    timerDiff.setTime(timerNow - timerStart);
    let ms = timerDiff.getMilliseconds();
    let sec = timerDiff.getSeconds();
    if (ms < 10) {ms = "00"+ms;}else if (ms < 100) {ms = "0"+ms;}
    document.querySelector('.streaks .time').innerHTML = sec+"."+ms;
}

function stopTimer(){
    clearInterval(timer_time);
}

function resetTimer(){
    clearInterval(timer_time);
    document.querySelector('.streaks .time').innerHTML = '0.000';
}

start();