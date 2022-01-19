var titleBest = document.getElementById("title-best");
var titleBetter = document.getElementById("title-better");
var titleGood = document.getElementById("title-good");
var priceBest = document.getElementById("sal-best");
var priceBetter = document.getElementById("sal-better");
var priceGood = document.getElementById("sal-good");
var imgBest = document.getElementById("img-best");
var imgBetter = document.getElementById("img-better");
var imgGood = document.getElementById("img-good");

var bestList = [];
var topSaleList = [];
var newItemList = [];
var latestnewItemList = [];
//validation if there is user loged or not
if (localStorage.user) {
    let name = JSON.parse(localStorage.user).name;
    console.log(name);
    document.getElementById("navbarDropdown").innerText = name;
    document.getElementById("signOutOrSignIn").innerText = "Log out";
    document.getElementById("signup").style.display = "none";
}
//get ids of last new items
for (let i = 1; i < 5; i++) {
    latestnewItemList.push({ title: document.getElementById(`title-new${i}`), sal: document.getElementById(`sal-new${i}`) });
}
//get ids of best , top and new items
for (let i = 4; i < 7; i++) {
    bestList.push({ title: document.getElementById(`title-best-${i}`), sal: document.getElementById(`sal-best-${i}`) });
    topSaleList.push({ title: document.getElementById(`title-better-${i}`), sal: document.getElementById(`sal-better-${i}`) });
    newItemList.push({ title: document.getElementById(`title-good-${i}`), sal: document.getElementById(`sal-good-${i}`) });
}
//get data from db
var returndeData;
async function fetchdata() {
    const data = await fetch('http://localhost:8000/api/products');
    const json = await data.json();
    console.log(json);
    return json;
}
//fetch stars  and other data
fetchdata().then(data => {
    returndeData = data;

    titleBest.innerText = returndeData.data[0].title;
    priceBest.innerText = returndeData.data[0].price;
    titleBetter.innerText = returndeData.data[1].title;
    priceBetter.innerText = returndeData.data[1].price;
    titleGood.innerText = returndeData.data[2].title;
    priceGood.innerText = returndeData.data[2].price;

    returndeData.data.sort(function(a, b) {
        return parseFloat(a.number_of_sales) - parseFloat(b.number_of_sales);
    });
    data_fetch(4);
    data_fetch(7);
    returndeData.data.sort(function(a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });
    data_fetch(10);
    returndeData.data.sort(function(a, b) {
        return parseFloat(b.id) - parseFloat(a.id);
    });
    data_fetch(13);
    data_fetch(16);
    data_fetch(17);
    //end stars

    //event listener for sgin out 
    document.getElementById("signOutOrSignIn").addEventListener("click", function signout() {
        localStorage.clear();
        window.open("/html/login.html", "_self");
    })

    returndeData.data.sort(function(a, b) {
        return parseFloat(a.number_of_sales) - parseFloat(b.number_of_sales);
    });
    for (let i = 0; i < 3; i++) {
        bestList[i].title.innerText = returndeData.data[i].title;
        bestList[i].sal.innerText = returndeData.data[i].price;
    }
    returndeData.data.sort(function(a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
    });
    for (let i = 0; i < 3; i++) {
        topSaleList[i].title.innerText = returndeData.data[i].title;
        topSaleList[i].sal.innerText = returndeData.data[i].price;
    }
    returndeData.data.sort(function(a, b) {
        return parseFloat(b.id) - parseFloat(a.id);
    });
    for (let i = 0; i < 3; i++) {
        newItemList[i].title.innerText = returndeData.data[i].title;
        newItemList[i].sal.innerText = returndeData.data[i].price;
    }

    for (let i = 0; i < 4; i++) {

        latestnewItemList[i].title.innerText = returndeData.data[i].title;
        latestnewItemList[i].sal.innerText = returndeData.data[i].price;
        latestnewItemList[i].title.innerText = returndeData.data[i].title;
        latestnewItemList[i].sal.innerText = returndeData.data[i].price;
    }

})
async function getbest(src) {
    if (src.value == "1") {
        returndeData.data.sort(function(a, b) {
            return parseFloat(b.number_of_sales) - parseFloat(a.number_of_sales);
        });
        data_fetch(4);
        titleBest.innerText = returndeData.data[0].title;
        priceBest.innerText = returndeData.data[0].price;
        titleBetter.innerText = returndeData.data[1].title;
        priceBetter.innerText = returndeData.data[1].price;
        titleGood.innerText = returndeData.data[2].title;
        priceGood.innerText = returndeData.data[2].price;
        console.log(returndeData.data);
        imgBest.src = "/public/cat-images/images/0.jpg";
        imgBetter.src = "/public/cat-images/images/1.jpg";
        imgGood.src = "/public/cat-images/images/2.jpg";
    } else if (src.value == "2") {

        returndeData.data.sort(function(a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });
        data_fetch(4);
        console.log(returndeData.data);
        titleBest.innerText = returndeData.data[0].title;
        priceBest.innerText = returndeData.data[0].price;
        titleBetter.innerText = returndeData.data[1].title;
        priceBetter.innerText = returndeData.data[1].price;
        titleGood.innerText = returndeData.data[2].title;
        priceGood.innerText = returndeData.data[2].price;
        imgBest.src = "/public/cat-images/images/4.jpg";
        imgBetter.src = "/public/cat-images/images/5.jpg";
        imgGood.src = "/public/cat-images/images/6.jpg";

    } else {
        returndeData.data.sort(function(a, b) {
            return parseFloat(b.rate) - parseFloat(a.rate);
        });
        data_fetch(4);
        imgBest.src = "/public/cat-images/images/16.jpg";
        imgBetter.src = "/public/cat-images/images/17.jpg";
        imgGood.src = "/public/cat-images/images/18.jpg";

        console.log(returndeData.data);
        titleBest.innerText = returndeData.data[0].title;
        priceBest.innerText = returndeData.data[0].price;
        titleBetter.innerText = returndeData.data[1].title;
        priceBetter.innerText = returndeData.data[1].price;
        titleGood.innerText = returndeData.data[2].title;
        priceGood.innerText = returndeData.data[2].price;
    }
}
//fetch data to card 
function data_fetch(count, c = 0) {
    for (let j = count - 3; j < count; j++) {

        document.getElementById(`stars-container${j}`).innerHTML = "";
        for (let i = 0; i < parseInt(returndeData.data[c].rate); i++) {
            // debugger;
            let icon = document.createElement('i');
            icon.classList.add("fas", "fa-star", "text-primary");
            document.getElementById(`stars-container${j}`).appendChild(icon); //= "<i class='fas fa-star text-primary '></i>";
        }
        for (let i = 0; i < 5 - parseInt(returndeData.data[c].rate); i++) {
            let icon = document.createElement('i');
            icon.classList.add("fas", "fa-star", "text-gray");
            document.getElementById(`stars-container${j}`).appendChild(icon); //= "<i class='fas fa-star text-primary '></i>";
        }
        c++;
    }
}