function gcd(a, b) { // javascript doesnt have builtin gcd() function
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}

function applyOperation(arr, operType) {
    let ans;
    // setting the neutral element for operation
    if(operType === "sumoper") {
        ans = 0;
    } else if(operType === "muloper") {
        ans = 1;
    } else if(operType === "minoper") {
        ans = Infinity;
    } else if(operType === "maxoper"){
        ans = -Infinity;
    } else {
        ans = 0;
    }
    for(let i = 0; i < arr.length; i++) {
        // choosing the operation
        if(operType === "sumoper") {
            ans = ans + arr[i];
        } else if(operType === "muloper") {
            ans = ans * arr[i];
        } else if(operType === "minoper") {
            ans = Math.min(ans, arr[i]);
        } else if(operType === "maxoper"){
            ans = Math.max(ans, arr[i]);
        } else {
            ans = gcd(ans, arr[i]);
        }
    }
    return ans;
}

function displayResponse(r, responseType) {
    if(responseType = "error") {
        document.getElementById("response").style.color = "red";
    }
    document.getElementById("response").innerText = r;
}

function checkStrParsableToInt(s){
    for(let i = 0; i < s.length; i++){
        if((s[i] >= '0' && s[i] <= '9') || s[i] === ' ') {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

function calculateAnswer() {
    console.log("Button clicked.");
    let selectObj = document.getElementById("operations");
    let textAreaObj = document.getElementById("inputarea");
    let selectedValue = selectObj.options[selectObj.selectedIndex].value; 
    let inputIntArr = [];
    let inputStr = textAreaObj.value;
    if(inputStr === "") {
        displayResponse("No numbers entered!", "error");
        return ;
    }
    let inputStrArr = inputStr.split(/[\r\n]+/);
    let possible = true;
    for(let i = 0; i < inputStrArr.length && possible; i++) {
        if(checkStrParsableToInt(inputStrArr[i])) {
            inputIntArr.push(parseInt(inputStrArr[i]));
        } else {    
            possible = false;
        }
    }
    if(!possible) {
        displayResponse("Invalid input!", "error");
        return ;
    }
    let answer = applyOperation(inputIntArr, selectedValue);
    displayResponse(answer, "valid");
}