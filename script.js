console.log("Let's write some JavaScript");
let isOperationUsed = false;
let num = "";
let storedHTML = "";
let cal = false;
let decimal = 1;
let bracketUsed = 0;
let bracketOperationUsed = 0;
let bracketUsedAtFirst = 0;

operations = {
    "plus": '+',
    "subtraction": '-',
    "divide": '/',
    "multiply": '*',
    "percent": "%",
}

async function calculation(HTML) {
    let sol;

    // Iterate over the keys in the operations object
    Object.keys(operations).forEach(operatorKey => {
        // Get the operator symbol from the operations object
        let operatorSymbol = operations[operatorKey];

        // Create a regular expression to match the specific img tag for the operator
        let imgRegex = new RegExp(`<img src="/img/${operatorKey}.svg">`, "g");

        // Replace all occurrences of the img tag with the corresponding operator symbol
        HTML = HTML.replace(imgRegex, operatorSymbol);
    });

    sol = eval(HTML);
    document.querySelector(".solution").innerHTML = sol;
    return true;
}

document.querySelectorAll(".operation").forEach(button => {
    button.addEventListener("click", async e => {
        console.log(e, e.currentTarget.src, e.currentTarget.innerHTML);
        let htmlContent = e.currentTarget.innerHTML;
        let srcMatch = htmlContent.match(/src="([^"]+)"/);
        let srcAttributeValue;
        if (srcMatch) {
            srcAttributeValue = srcMatch[1];
        }
        isOperationUsed = true;
        if (document.querySelector(".numbers").innerHTML.trim() == "") {
            alert("Cannot use any operation right now");
            isOperationUsed = false;
        } else {
            if (srcAttributeValue == "/img/equal.svg") {
                cal = await calculation(document.querySelector(".numbers").innerHTML);
            } else {
                if (document.querySelector(".numbers").innerHTML.endsWith(">")) {
                    let lastImgIndex = storedHTML.lastIndexOf('<img src="');
                    if (lastImgIndex !== -1) {
                        let lastImgTag = storedHTML.substring(lastImgIndex, storedHTML.indexOf(">", lastImgIndex) + 1);
                        storedHTML = storedHTML.replace(lastImgTag, `<img src=${srcAttributeValue}>`);
                        document.querySelector(".numbers").innerHTML = storedHTML;
                    }
                } else {
                    document.querySelector(".numbers").innerHTML = document.querySelector(".numbers").innerHTML + `<img src=${srcAttributeValue}>`;
                    num = "";
                    storedHTML = document.querySelector(".numbers").innerHTML;
                }
            }
        }
        await logIsOperationUsed();
    });
});

document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", async e => {
        if (cal) {
            document.querySelector(".numbers").innerHTML = "";
            document.querySelector(".solution").innerHTML = "";
            num = "";
            storedHTML = "";
            isOperationUsed = false;
            cal = false;
            bracketOperationUsed = 0;
            await logIsOperationUsed();
        }
        else {
            num += e.currentTarget.innerHTML;
            let a = await logIsOperationUsed();
            if (a == true) {
                document.querySelector(".numbers").innerHTML = storedHTML + num;
            }
            else {
                document.querySelector(".numbers").innerHTML = num;
            }
        }
    })
})

document.querySelector(".erase").addEventListener("click", async () => {
    let numbersElement = document.querySelector(".numbers");
    let numbersHTML = numbersElement.innerHTML.trim();

    if (numbersHTML == "") {
        alert("You can not erase anything right now, you mad person :) :{");
    } else {
        let erasedChar = numbersHTML.charAt(numbersHTML.length - 1);
        console.log(erasedChar);
        if (erasedChar == ">") {
            let lastImgIndex = storedHTML.lastIndexOf('<img src="');
            if (lastImgIndex !== -1) {
                let lastImgTag = storedHTML.substring(lastImgIndex, storedHTML.indexOf(">", lastImgIndex) + 1);
                storedHTML = storedHTML.replace(lastImgTag, "e");
            }
            num = storedHTML;
            isOperationUsed = false;
            cal = false;
        }

        // Check if erased character was a decimal point
        if (erasedChar == "." && !numbersHTML.includes("img")) {
            num = numbersHTML;
            decimal = 1;  // Reset decimal counter to 1
        }

        // If after erasing one character, the HTML becomes empty
        if (numbersHTML.slice(0, -1).trim() == "") {
            numbersElement.innerHTML = "";
            document.querySelector(".solution").innerHTML = "";
            num = "";
            storedHTML = "";
            isOperationUsed = false;
            cal = false;
            decimal = 1;
            bracketOperationUsed = 0;
            await logIsOperationUsed();
        }

        else {
            document.querySelector(".numbers").innerHTML = document.querySelector(".numbers").innerHTML.slice(0, -1);
            num = num.slice(0, -1);
        }
    }
});

document.querySelector(".decimal").addEventListener("click", async () => {
    if (!document.querySelector(".numbers").innerHTML.includes("img")) {
        if (decimal > 1) {
            alert("You cannot use decimal more than one in a single number. At least in my calculator :)");
        }
        else {
            num += document.querySelector(".decimal").innerHTML;
            document.querySelector(".numbers").innerHTML = num;
            ++decimal;
        }
    }

    // Use if .numbers.innerHtml.endsWith(>) then make the new number as 0.
    else if (document.querySelector(".numbers").innerHTML.endsWith(">")) {
        if (num.includes(".")) {
            alert("You cannot use decimal more than one in a single number. At least in my calculator :)");
        }
        else {
            num += "0.";
            document.querySelector(".numbers").innerHTML = storedHTML + num;
            ++decimal;
        }
    }

    else if (document.querySelector(".numbers").innerHTML.includes("img") && !document.querySelector(".numbers").innerHTML.endsWith(">")) {
        if (num.includes(".")) {
            alert("You cannot use decimal more than one in a single number. At least in my calculator :)");
        }
        else {
            num += ".";
            document.querySelector(".numbers").innerHTML = storedHTML + num;
            ++decimal;
        }
    }
})

document.querySelector(".bracket").addEventListener("click", async () => {
    console.log("Hello bracket clicked");
    if (document.querySelector(".numbers").innerHTML.trim() == "") {
        document.querySelector(".numbers").innerHTML = document.querySelector(".numbers").innerHTML + "(";
        num += "(";
        bracketUsed++;
    }

    else if (!document.querySelector(".numbers").innerHTML.includes("img") && document.querySelector(".numbers").innerHTML.length >= 2 && bracketUsed == 1) {
        document.querySelector(".numbers").innerHTML = document.querySelector(".numbers").innerHTML + ")";
        num += ")";
        bracketUsed++;
    }

    if (document.querySelector(".numbers").innerHTML.length > 0 && !document.querySelector(".numbers").innerHTML.endsWith(">")) {
        ++bracketOperationUsed;
        console.log("Hello");
        if (bracketOperationUsed == 1) {
            document.querySelector(".numbers").innerHTML = document.querySelector(".numbers").innerHTML + `<img src="/img/multiply.svg">(`;
            storedHTML = document.querySelector(".numbers").innerHTML;
            num = "";
            isOperationUsed = true;
            await logIsOperationUsed();
        }
        else if (bracketOperationUsed == 2) {
            bracketOperationUsed = 0;
            storedHTML = ")";
            document.querySelector(".numbers").innerHTML += storedHTML;
            storedHTML = document.querySelector(".numbers").innerHTML;
            num = "";
            isOperationUsed = true;
            await logIsOperationUsed();
        }
    }

    if (document.querySelector(".numbers").innerHTML.endsWith(">")) {
        ++bracketOperationUsed;
        if (bracketOperationUsed == 1) {
            document.querySelector(".numbers").innerHTML = document.querySelector(".numbers").innerHTML + `(`;
            storedHTML = document.querySelector(".numbers").innerHTML;
            num = "";
            isOperationUsed = true;
            await logIsOperationUsed();
        }
        else if (bracketOperationUsed == 2) {
            bracketOperationUsed = 0;
            storedHTML = ")";
            document.querySelector(".numbers").innerHTML += storedHTML;
            storedHTML = document.querySelector(".numbers").innerHTML;
            num = "";
            isOperationUsed = true;
            await logIsOperationUsed();
        }
    }
})

document.querySelector(".plus_minus").addEventListener("click", async () => {
    // If the screen is empty.
    if (document.querySelector(".numbers").innerHTML.trim() == "") {
        document.querySelector(".numbers").innerHTML = document.querySelector(".numbers").innerHTML + `(<img src="/img/subtraction.svg">`;
        storedHTML = document.querySelector(".numbers").innerHTML;
        num = "";
        isOperationUsed = true;
        bracketUsedAtFirst = 1;
        await logIsOperationUsed();
    }
    else if (document.querySelector(".numbers").innerHTML.startsWith(`(<img src="/img/subtraction.svg">`) && bracketUsedAtFirst == 1) {
        document.querySelector(".numbers").innerHTML += ")";
        storedHTML = document.querySelector(".numbers").innerHTML;
        num = "";
        bracketUsedAtFirst = 0;
    }

    // if the screen is not empty.
    else {
        let openBracket = 0, closedBracket = 0;
        console.log("In else");
        if (!document.querySelector(".numbers").innerHTML.startsWith(`(<img src="/img/subtraction.svg">`) && !document.querySelector(".numbers").innerHTML.includes(">")) {
            let tempNum = "";
            tempNum = `(<img src="/img/subtraction.svg">` + num;
            storedHTML = tempNum;
            document.querySelector(".numbers").innerHTML = storedHTML;
            tempNum = "";
            isOperationUsed = true;
            await logIsOperationUsed();
        }

        else if (document.querySelector(".numbers").innerHTML.includes(">")) {
            storedHTML = `(<img src="/img/subtraction.svg">`;
            document.querySelector(".numbers").innerHTML += storedHTML;
            storedHTML = document.querySelector(".numbers").innerHTML;
            num = "";
            isOperationUsed = true;
            await logIsOperationUsed();

            let HTML = document.querySelector(".numbers").innerHTML;
            console.log(HTML)
            for (let i = 0; i < HTML.length; i++) {
                if (HTML[i] == "(") {
                    openBracket++;
                }
                else if (HTML[i] == ")") {
                    closedBracket++;
                }
            }

            console.log(openBracket, closedBracket);
        }
    }
})


document.querySelector(".cancel").addEventListener("click", async () => {
    document.querySelector(".numbers").innerHTML = "";
    document.querySelector(".solution").innerHTML = "";
    num = "";
    storedHTML = "";
    isOperationUsed = false;
    cal = false;
    decimal = 1;
    bracketOperationUsed = 0;
    await logIsOperationUsed();
})

async function logIsOperationUsed() {
    console.log(isOperationUsed);
    return isOperationUsed;
}

// This will be executed immediately after the event listeners are attached
logIsOperationUsed();