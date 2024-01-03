console.log("Let's write some JavaScript");
let isOperationUsed = false;
let num = "";

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
        } else {
            document.querySelector(".numbers").innerHTML = document.querySelector(".numbers").innerHTML + `<img src=${srcAttributeValue}>`;
        }
        await logIsOperationUsed();
    });
});

document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", e => {
        num += e.currentTarget.innerHTML;
        document.querySelector(".numbers").innerHTML = num;
    })
})

document.querySelector(".cancel").addEventListener("click", async () => {
    document.querySelector(".numbers").innerHTML = "";
    document.querySelector(".solution").innerHTML = "";
    num = "";
    isOperationUsed = false;
    await logIsOperationUsed();
})

async function logIsOperationUsed() {
    console.log(isOperationUsed);
}

// This will be executed immediately after the event listeners are attached
logIsOperationUsed();