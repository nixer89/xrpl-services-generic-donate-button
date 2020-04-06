console.log("preload image");
if (document.images) {
    img1 = new Image();
    img1.src = "https://donate.xumm.community/xummDonate.svg";
}

document.addEventListener("DOMContentLoaded", () => {
    let xummDonateButtons = document.getElementsByClassName('xumm-donate-button');
    let xummDonateButtonsNB = document.getElementsByClassName('xumm-donate-button-no-border');

    console.log("found xummDonateButtons: " + xummDonateButtons.length);
    console.log("found xummDonateButtonNB: " + xummDonateButtonsNB.length);

    if(xummDonateButtons && xummDonateButtons.length > 0) {
        setTimeout(() => replaceDonateButtons(xummDonateButtons),0);
    }

    if(xummDonateButtonsNB && xummDonateButtonsNB.length > 0) {
        setTimeout(() => replaceDonateButtonsNB(xummDonateButtonsNB),0);
    }
});

function replaceDonateButtons(xummDonateButtons) {
    fetch("https://donate.xumm.community/button-border.html").then(response => {
        return response.text();
    }).then(data => {
        console.log("replacing xumm donate buttons");
        for(var i = 0; i < xummDonateButtons.length; i++)
            xummDonateButtons[i].innerHTML = data;    
    });
}

function replaceDonateButtonsNB(xummDonateButtonsNB) {
    fetch("https://donate.xumm.community/button-no-border.html").then(response => {
        return response.text();
    }).then(data => {
        console.log("replacing xumm donate buttons NB");
        for(var i = 0; i < xummDonateButtonsNB.length; i++)
            xummDonateButtonsNB[i].innerHTML = data;    
    });
}

function donateViaXumm() {
    try {
        console.log("requesting payment via XUMM")
        fetch('https://api.xumm.community/api/v1/initiate/simplePayment/')
        .then(function (response) { 
            if(response.ok)
                return response.json();
            else {
                console.log("xumm payment request not ok");
                console.log(response);
            };
        }).then(function (xummResponse) {
            console.log("Called xumm and got a response: " + JSON.stringify(xummResponse));
            if(xummResponse && xummResponse.next &&xummResponse.next.always)
                window.location = xummResponse.next.always;
            else
                console.log(JSON.stringify(xummResponse));
        });
    } catch(err) {
        console.log("something went wrong while requesting payment: ");
        console.log(JSON.stringify(err));
    }
};
