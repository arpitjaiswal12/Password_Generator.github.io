let inputSlider = document.querySelector("[data-lenthSlider]"); // syntex to target element by custom attribute

let lengthDisplay = document.querySelector("[password-length]");

let displayPass_area = document.getElementById("display-password");

let copyData = document.querySelector("[dataCopyMsg]")

let dataCopyBtn = document.querySelector("[dataCopyBtn]")

let generateBtn = document.querySelector(".generate-password-btn");

let symbols = "!@#^>$&*(}[}%)-+^_?,/"


// pre-define content 
let password_length = 10;

handleSlider(password_length);

function handleSlider(password_length) {
    inputSlider.value = password_length;
    lengthDisplay.innerText = inputSlider.value;
}

inputSlider.oninput = function () {
    lengthDisplay.innerHTML = this.value;
    password_length = this.value;
}


function genRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return genRndInteger(0, 9);
}

function generateRandomUppercase() {
    return String.fromCharCode(genRndInteger(65, 91));
}

function generateRandomLowerCase() {
    return String.fromCharCode(genRndInteger(97, 123));
}

function generateRandomSymbol() {
    const num = genRndInteger(0, symbols.length);
    return symbols.charAt(num);
}

dataCopyBtn.addEventListener("click", async () => {
    if (displayPass_area.value === "") {
        alert("Nothing To copy");
    }
    else {
        try {
            displayPass_area.select();
            await navigator.clipboard.writeText(displayPass_area.value);
            alert("Copied !!")

        } catch (e) {
            alert("Failed to copied !!")

        }
    }
})

let upperCaseCheck = document.querySelector("#uppercase")

let lowerCaseCheck = document.querySelector("#LowerCase")

let NumbersCheck = document.querySelector("#Numbers")

let characterCheck = document.querySelector("#Special-character")

console.log(NumbersCheck.checked);

function generatePassword() {
    let passwordString = "";
    let countCheck = 0;

    if (countCheck == 0) {
        displayPass_area.value = "";
    }

    let funcArray = [];
    if (upperCaseCheck.checked) {
        funcArray.push(generateRandomUppercase)
        countCheck++;
    }
    if (lowerCaseCheck.checked) {
        funcArray.push(generateRandomLowerCase)
        countCheck++;
    }
    if (NumbersCheck.checked) {
        funcArray.push(generateRandomNumber)
        countCheck++;
    }
    if (characterCheck.checked) {
        funcArray.push(generateRandomSymbol);
        countCheck++;
    }

    if (password_length < countCheck) {
        handleSlider(countCheck);
    }

    if (countCheck == 0) {
        handleSlider(10);
    }

    console.log(funcArray)

    for (let i = funcArray.length - 1; i >= 0; i--) {
        passwordString += funcArray[i]();
    }
    // for(let i=0;i<funcArray.length;i++){
    //     passwordString+=funcArray[i]();
    // }

    console.log(passwordString);
    console.log(password_length);
    console.log(funcArray.length);

    for (let i = 0; i < password_length - funcArray.length; i++) {
        let randomIndex = genRndInteger(0, funcArray.length);
        passwordString += funcArray[randomIndex]();
    }
    console.log(passwordString);
    displayPass_area.value = passwordString;

    handlePasswordStrength(countCheck);
}

generateBtn.addEventListener("click", () => {
    generatePassword();
})

let passwordIndicator = document.querySelector("[data-indicator]");

// console.log("display count " +countCheck)
const handlePasswordStrength = (countCheck) => {
    if ((countCheck == 4 && password_length >= 8) || (countCheck == 3 && password_length >= 11)) {
        passwordIndicator.style.backgroundColor = "green";
        passwordIndicator.style.boxShadow = "2px 2px 10px 3px green";
    }
    else if (countCheck == 3 && password_length >= 8) {
        passwordIndicator.style.backgroundColor = "rgb(242, 210, 48)";
        passwordIndicator.style.boxShadow = "2px 2px 10px 3px rgb(242, 210, 48)";
    }
    else if ((countCheck == 3 || countCheck == 2 || countCheck == 1) || password_length < 8) {
        passwordIndicator.style.backgroundColor = "red";
        passwordIndicator.style.boxShadow = "2px 2px 10px 3px red";
    }
}




