console.log("Let's write some JavaScript");
let isOperationUsed = false;
let num = "";
let storedHTML = "";
let cal = false;
let decimal = 1;

operations = {
    "plus": '+',
    "subtraction": '-',
    "divide": '/',
    "multiply": '*',
    "percent": "%",
}

async function calculation(HTML) {
    let sol;

    let srcMatch = HTML.match(/src="([^"]+)"/);
    let srcAttributeValue;
    if (srcMatch) {
        srcAttributeValue = srcMatch[1];
    }
    let mid = srcAttributeValue.split("/img/")[1];

    let str = HTML;
    operator = operations[mid.split(".")[0]];

    switch (operator) {
        case '+':
            str = str.replace(/<img src="([^"]+)">/, "+");
            sol = eval(str);
            document.querySelector(".solution").innerHTML = sol;
            return true;
        case '-':
            str = str.replace(/<img src="([^"]+)">/, "-");
            sol = eval(str);
            document.querySelector(".solution").innerHTML = sol;
            return true;
        case '/':
            str = str.replace(/<img src="([^"]+)">/, "/");
            sol = eval(str);
            document.querySelector(".solution").innerHTML = sol;
            return true;
        case '*':
            str = str.replace(/<img src="([^"]+)">/, "*");
            sol = eval(str);
            document.querySelector(".solution").innerHTML = sol;
            return true;
        case '%':
            str = str.replace(/<img src="([^"]+)">/, "%");
            sol = eval(str);
            document.querySelector(".solution").innerHTML = sol;
            return true;
    }
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
                if (document.querySelector(".numbers").innerHTML.includes(`.svg`)) {
                    const currentHTML = document.querySelector(".numbers").innerHTML;
                    const newHTML = currentHTML.replace(/<img src="([^"]+)">/, `<img src=${srcAttributeValue}>`);
                    document.querySelector(".numbers").innerHTML = newHTML;
                    storedHTML = newHTML;
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
        
        if (!document.querySelector(".numbers").innerHTML.includes("img")) {
            storedHTML = storedHTML.replace(/<img src="([^"]+)">/, "e");
            storedHTML = storedHTML.slice(0, -1);
            num = storedHTML;
            isOperationUsed = false;
            cal = false;
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
            await logIsOperationUsed();
        } 
        
        else {
            document.querySelector(".numbers").innerHTML = document.querySelector(".numbers").innerHTML.slice(0, -1);
            num = num.slice(0, -1);
        }
    }
});

document.querySelector(".decimal").addEventListener("click", () => {
    if (!document.querySelector(".numbers").innerHTML.includes("img")) {
        if (decimal > 1) {
            alert("You cannot use decimal more than one in a single number. At leat in my calculator :)");
        }
        else {
            num += document.querySelector(".decimal").innerHTML;
            document.querySelector(".numbers").innerHTML = num;
            ++decimal;
        }
    }

    // Use if .numbers.innerHtml.endsWith(>) then make the new number as 0.
    else if (document.querySelector(".numbers").innerHTML.endsWith(">")) {
        if (decimal > 2) {
            alert("You cannot use decimal more than one in a single number. At leat in my calculator :)");
        }
        else {
            num += "0.";
            document.querySelector(".numbers").innerHTML = storedHTML + num;
            ++decimal;
        }
    }

    else if (document.querySelector(".numbers").innerHTML.includes("img") && !document.querySelector(".numbers").innerHTML.endsWith(">")) {
        if (decimal > 2) {
            alert("You cannot use decimal more than one in a single number. At leat in my calculator :)");
        }
        else {
            num += ".";
            document.querySelector(".numbers").innerHTML = storedHTML + num;
            ++decimal;
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
    await logIsOperationUsed();
})

async function logIsOperationUsed() {
    console.log(isOperationUsed);
    return isOperationUsed;
}

// This will be executed immediately after the event listeners are attached
logIsOperationUsed();