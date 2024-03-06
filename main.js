const screen = document.querySelector(".text-field");
let buffer = '0';
let totalVal = 0;
let prevOp = '';

function doMath(x){
    if(buffer === '0') {return;}
    const temp = parseInt(buffer);
    if(totalVal === 0){
        totalVal = temp;
    }
    else{
        flushOp(temp);
    }
    prevOp = x;
    buffer = '0';

    console.log(totalVal);
}

function flushOp(val) {

    switch(prevOp){
        case "+":
            totalVal += val;
            break;
        case "-":
            totalVal -= val;
            break;
        case "x":
            totalVal *= val;
            break;
        case "÷":
            totalVal /= val;
            break;
    }
}

function handleNum(num) {
    if(buffer === '0'){
        buffer = num;
    }
    else {
        buffer += num;
    }
    console.log(buffer);
}

function handleOp(op) {
    switch(op) {
        case "C":
            buffer = '0';
        break;
        case "←":
            if(buffer.length === 1) {buffer = '0';}
            else{
                const temp = buffer.substring(0, buffer.length-1);
                buffer = temp;
            }
        break;
        case "=":
            if(prevOp === ''){ return;}
            flushOp(parseInt(buffer));
            buffer = "" + totalVal;
            totalVal = 0;
            prevOp = '';
        break;
        case "-":
        case "+":
        case "x":
        case "÷":
            doMath(op);
            break;

    }
}

function handleClick(action){
    if(action >= "0" && action <= "9") {
        console.log("Its a num");
        handleNum(action);
    }
    else {
        console.log("its an op");
        handleOp(action);
    }
    console.log(totalVal);
    render();
}
function render(){
    screen.innerText = buffer;
}

function init() {
    document.querySelector(".calculator-frame").addEventListener("click", (event) => {
        handleClick(event.target.innerText);
    });
}
init();
