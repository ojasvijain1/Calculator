console.log("Let's write some JavaScript");
let isOperationUsed = false;
let num = "";
let storedHTML = "";

operations = {
    "plus": '+',
    "subtraction": '-',
    "divide": '/',
    "multiply": '*',
    "percent": "%",
}

function calculation(HTML) {
    let num1, num2, sol;
    
    let srcMatch = HTML.match(/src="([^"]+)"/);
    let srcAttributeValue;
    if (srcMatch) {
        srcAttributeValue = srcMatch[1];
    }
    let mid = srcAttributeValue.split("/img/")[1];
    
    num1 = parseInt(HTML.split(`<img src="${srcAttributeValue}">`)[0])
    num2 = parseInt(HTML.split(`<img src="${srcAttributeValue}">`)[1])
    operator = operations[mid.split(".")[0]];
    switch(operator) {
        case '+': sol = num1 + num2;
                  document.querySelector(".solution").innerHTML = sol;
                  return true;
        case '-': sol = num1 - num2;
                  document.querySelector(".solution").innerHTML = sol;
                  return true;
        case '/': sol = num1 / num2;
                  document.querySelector(".solution").innerHTML = sol;
                  return true;
        case '*': sol = num1 * num2;
                  document.querySelector(".solution").innerHTML = sol;
                  return true;
        case '%': sol = (num1 * num2) / 100;
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
                calculation(document.querySelector(".numbers").innerHTML);
            }
            else {
                document.querySelector(".numbers").innerHTML = document.querySelector(".numbers").innerHTML + `<img src=${srcAttributeValue}>`;
                num = "";
                storedHTML = document.querySelector(".numbers").innerHTML;
            }
        }
        await logIsOperationUsed();
    });
});

document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", async e => {
        num += e.currentTarget.innerHTML;
        let a = await logIsOperationUsed();
        if (a == true) {
            document.querySelector(".numbers").innerHTML = storedHTML + num;
        }
        else {
            document.querySelector(".numbers").innerHTML = num;
        }
    })
})

document.querySelector(".cancel").addEventListener("click", async () => {
    document.querySelector(".numbers").innerHTML = "";
    document.querySelector(".solution").innerHTML = "";
    num = "";
    storedHTML = "";
    isOperationUsed = false;
    await logIsOperationUsed();
})

async function logIsOperationUsed() {
    console.log(isOperationUsed);
    return isOperationUsed;
}

// This will be executed immediately after the event listeners are attached
logIsOperationUsed();