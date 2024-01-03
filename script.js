console.log("Let's write some JavaScript");
let isOperationUsed = false;

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
            document.querySelector(".numbers").innerHTML = `<img src=${srcAttributeValue}>`;
        }
        await logIsOperationUsed();
    });
});

async function logIsOperationUsed() {
    console.log(isOperationUsed);
}

// This will be executed immediately after the event listeners are attached
logIsOperationUsed();