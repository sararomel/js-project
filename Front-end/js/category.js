//======================================  Check if products sailed ===========================//

let sells = localStorage.sells;
if (sells) {
  localStorage.sells = JSON.stringify([]);
}

if (localStorage.user) {
  let name = JSON.parse(localStorage.user).name;
  console.log(name);
  document.getElementById("navbarDropdown").innerText = name;
  document.getElementById("signOutOrSignIn").innerText = "Log out";
  document.getElementById("signup").style.display = "none";
};

document.querySelector('#signOutOrSignIn').addEventListener('click' , ()=>{
  localStorage.clear();
  location.assign('/html/login.html');
})

//====================================== ajax call for my product ===========================//
let mydata = [];
fetch("http://localhost:8000/api/products")
  .then((res) => res.json())
  .then((data) => {
    mydata = data;


    //====================================== loop for display data in div ===========================//
    for (i = 0; i < mydata.data.length; i++) {
      myDiv = ` <div class="col-md-4">
                <div class="card mt-4" id="card-contan${i}" style="max-width: 16rem;
                max-height: 25rem;">
                  <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${mydata.data[i]["title"]}</h5>
                    <a  class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
                    ,'${mydata.data[i].description}','${i}.jpg','${mydata.data[i].amount}','${mydata.data[i].created_at}'
                    ,'${mydata.data[i].number_of_sales}','${mydata.data[i].rate}','${mydata.data[i].type}','${mydata.data[i].updated_at}')">Show details</a>
                    <div  id="star-container${i}" class="ml-1 mt-2">

                    </div>
    <div class="mt-2">   
    <a  style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
     onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
     '${mydata.data[i].description}','${i}.jpg',${i})"></i>
   
    </div>`;
      $("#grid").append(myDiv);
      drowStars(mydata.data[i].rate, i);
    }
    //============ Check if product checked ========//
    let carts = localStorage.carts
    if (carts) {
      parsedCarts = JSON.parse(carts);
      console.log(parsedCarts);
    }
    mydata.data.forEach(item => {
      if (parsedCarts) {
        parsedCarts.forEach((cart, index) => {
          if (item.title == cart.title) {
            $(`#card-contan${index}`).addClass("sucsess");
            $(`#count`).html(parsedCarts.length);
          }
        })
      }
    })
  });



//
function drowStars(numOfstars = 0, cart) {
  let c = 1;
  for (let i = 0; i < numOfstars; i++) {
    let icon = `<i class="fas fa-star text-primary">
      </i>`;
    c++;
    $(`#star-container${cart}`).append(icon); //= "<i class='fas fa-star text-primary '></i>";
  }
  for (let i = 0; i < 5 - numOfstars; i++) {
    let icon = `<i class="fas fa-star text-gray"></i>`;
    $(`#star-container${cart}`).append(icon);
    c++;
  }
}

//======================================  add content of any cart click to localstroge ===========================//


function showProduct(myId, myTitle, myPrice, myDecraption, myImage, i) {

  $(`#card-contan${i}`).addClass("sucsess");
  let cart = [];
  if (localStorage.carts) {
    cart = JSON.parse(localStorage.carts);
    let found = false;
    for (item in cart) {
      if (cart[item].id == myId) {
        found = true;
        // alert("you add it ");
        break;
      }
    }
    if (!found) {
      cart.push({
        id: myId,
        price: myPrice,
        title: myTitle,
        description: myDecraption,
        image: myImage,
        count: 1,
      });
    }
  } else {
    cart.push({
      id: myId,
      price: myPrice,
      title: myTitle,
      description: myDecraption,
      image: myImage,
      count: 1,
    });
  }
  localStorage.setItem("carts", JSON.stringify(cart));

  // counter in mu=y cart
  if (localStorage.carts) {
    cart = JSON.parse(localStorage.carts);
    document.getElementById("count").innerHTML = cart.length;
    $("#count").append(count++);
    count++;
    localStorage.setItem("carts", JSON.stringify(cart));
  }
}

// open page display my card on click

function showCard(
  Id,
  Title,
  Price,
  Decraption,
  Image,
  myAmount,
  myCreated,
  myNumb,
  myRate,
  myType,
  myUpda
) {
  // will work in three step
  //step one catch data and store it in localstorage

  let products = [];
  let cartDetails = {
    id: Id,
    title: Title,
    price: Price,
    description: Decraption,
    image: Image,
    amount: myAmount,
    creat: myCreated,
    numb: myNumb,
    rate: myRate,
    type: myType,
    update: myUpda,
  };
  products.push(cartDetails);
  // 2 set data and open window

  localStorage.setItem("opencard", JSON.stringify(products));
  let newWin = open("../html/product.html", "_self");
  console.log(opendata);
  //3 disply in card
  //  $("#grid2").append(opendata); in   second page
}

//====================================== search operator in navbar===========================//

function searchNav() {
  let searchInp = document.getElementById("searchVal");
  document.getElementById("grid").innerHTML = " ";

  document.querySelector('#grid').innerHTML = ''
  for (var i = 0; i < mydata.data.length; i++) {
    if (
      mydata.data[i].title.toLowerCase().includes(searchInp.value.toLowerCase())
    ) {
      console.log("if");
      myDiv = `<div class="col-md-4">
      <div class="card mt-4" id="card-contan${i} style="max-width: 16rem;
      max-height: 25rem;">
        <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
        <div class="card-body">
          <h5 class="card-title">${mydata.data[i]["title"]}</h5>
          <a  class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
          ,'${mydata.data[i].description}','${i}.jpg')">Show details</a>
          <div class="ml-1 mt-2"  id="star-container${i}">
        
          </div>
          <div class="mt-2">   
          <a href="" style="text-decoration: none ;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr" onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}','${mydata.data[i].description}',
          '${i}.jpg')"></i>
          </div>`;
      $("#grid").append(myDiv);
      drowStars(mydata.data[i].rate, i);
    } else {
      // $('#grid').css({
      //   color: "red",
      // })
      // $('#grid').html(`Sorry, No product is found with title "${searchInp.value}"!!`)
    }
  }
}


//=====================================range price slider===========================//

//=====================================range price slider===========================//

var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("demo");
output.innerHTML = rangeslider.value;
rangeslider.oninput = function () {
  output.innerHTML = this.value;
  document.getElementById("grid").innerHTML = " ";

  for (i = 0; i < mydata.data.length; i++) {
    if (mydata.data[i].price <= output.innerHTML) {
      myDiv = ` <div class="col-md-4">
              <div class="card mt-4" id="card-contan${i}" style="max-width: 16rem;
              max-height: 25rem;">
                <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${mydata.data[i]["title"]}</h5>
                  <a  class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
                  ,'${mydata.data[i].description}','${i}.jpg','${mydata.data[i].amount}','${mydata.data[i].created_at}'
                  ,'${mydata.data[i].number_of_sales}','${mydata.data[i].rate}','${mydata.data[i].type}','${mydata.data[i].updated_at}')">Show details</a>
                  <div  id="star-container${i}" class="ml-1 mt-2">

                  </div>
  <div class="mt-2">   
<<<<<<< HEAD
  <a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
=======
  <a  style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
>>>>>>> e5ddcb90d9de19a42ec640e32b7ce12defb68264
   onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
   '${mydata.data[i].description}','${i}.jpg',${i})"></i>
 
  </div>`;
      $("#grid").append(myDiv);
      drowStars(mydata.data[i].rate, i);
    }
  }
};

//====================================== type by laptoop===========================//

function displayLap() {
  document.getElementById("grid").innerHTML = " ";

  for (i = 0; i < mydata.data.length; i++) {
    if (mydata.data[i].type == "laptop") {
      myDiv = ` <div class="col-md-4">
                    <div class="card mt-4" id="card-contan${i}" style="max-width: 16rem;
                    max-height: 25rem;">
                      <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${mydata.data[i]["title"]}</h5>
<<<<<<< HEAD
                        <a href="#" class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
=======
                        <a  class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
>>>>>>> e5ddcb90d9de19a42ec640e32b7ce12defb68264
                        ,'${mydata.data[i].description}','${i}.jpg','${mydata.data[i].amount}','${mydata.data[i].created_at}'
                        ,'${mydata.data[i].number_of_sales}','${mydata.data[i].rate}','${mydata.data[i].type}','${mydata.data[i].updated_at}')">Show details</a>
                        <div  id="star-container${i}" class="ml-1 mt-2">
    
                        </div>
        <div class="mt-2">   
<<<<<<< HEAD
        <a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
=======
        <a  style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
>>>>>>> e5ddcb90d9de19a42ec640e32b7ce12defb68264
         onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
         '${mydata.data[i].description}','${i}.jpg',${i})"></i>
       
        </div>`;
      $("#grid").append(myDiv);
      drowStars(mydata.data[i].rate, i);
    }
  }
}
//=====================================type by mobile ===========================//
function displayMob() {
  document.getElementById("grid").innerHTML = " ";

  for (i = 0; i < mydata.data.length; i++) {
    if (mydata.data[i].type == "mobile") {
      myDiv = ` <div class="col-md-4">
                    <div class="card mt-4" id="card-contan${i}" style="max-width: 16rem;
                    max-height: 25rem;">
                      <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${mydata.data[i]["title"]}</h5>
<<<<<<< HEAD
                        <a href="#" class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
=======
                        <a  class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
>>>>>>> e5ddcb90d9de19a42ec640e32b7ce12defb68264
                        ,'${mydata.data[i].description}','${i}.jpg','${mydata.data[i].amount}','${mydata.data[i].created_at}'
                        ,'${mydata.data[i].number_of_sales}','${mydata.data[i].rate}','${mydata.data[i].type}','${mydata.data[i].updated_at}')">Show details</a>
                        <div  id="star-container${i}" class="ml-1 mt-2">
    
                        </div>
        <div class="mt-2">   
<<<<<<< HEAD
        <a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
=======
        <a  style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
>>>>>>> e5ddcb90d9de19a42ec640e32b7ce12defb68264
         onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
         '${mydata.data[i].description}','${i}.jpg',${i})"></i>
       
        </div>`;
      $("#grid").append(myDiv);
      drowStars(mydata.data[i].rate, i);
    }
  }
}

//=====================================type by all ===========================//
function allOf() {
  document.getElementById("grid").innerHTML = " ";
  for (i = 0; i < mydata.data.length; i++) {
    if (mydata.data[i].type == "mobile" || mydata.data[i].type == "laptop") {
      myDiv = ` <div class="col-md-4">
              <div class="card mt-4" id="card-contan${i}" style="max-width: 16rem;
              max-height: 25rem;">
                <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${mydata.data[i]["title"]}</h5>
<<<<<<< HEAD
                  <a href="#" class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
=======
                  <a  class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
>>>>>>> e5ddcb90d9de19a42ec640e32b7ce12defb68264
                  ,'${mydata.data[i].description}','${i}.jpg','${mydata.data[i].amount}','${mydata.data[i].created_at}'
                  ,'${mydata.data[i].number_of_sales}','${mydata.data[i].rate}','${mydata.data[i].type}','${mydata.data[i].updated_at}')">Show details</a>
                  <div  id="star-container${i}" class="ml-1 mt-2">

                  </div>
  <div class="mt-2">   
<<<<<<< HEAD
  <a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
=======
  <a  style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
>>>>>>> e5ddcb90d9de19a42ec640e32b7ce12defb68264
   onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
   '${mydata.data[i].description}','${i}.jpg',${i})"></i>
 
  </div>`;
      $("#grid").append(myDiv);
      drowStars(mydata.data[i].rate, i);
    }
  }
}

//====================================== low to heigh price ===========================//

function lowPrice() {
  mydata.data.sort(function (a, b) {
    return parseFloat(a.price) - parseFloat(b.price);
  });
  document.getElementById("grid").innerHTML = " ";

  for (i = 0; i < mydata.data.length; i++) {
    myDiv = `<div class="col-md-4">
          <div class="card mt-4" style="max-width: 16rem;
          max-height: 25rem;">
            <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
            <div class="card-body">
              <h5 class="card-title">${mydata.data[i]["title"]}</h5>
              <a  class="btn btn-danger" onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
              ,'${mydata.data[i].description}','${i}.jpg')">Show details</a>
              <div class="ml-1 mt-2">
                <i class="fas fa-star text-primary "></i>
                  <i class="fas fa-star text-primary "></i>
                  <i class="fas fa-star text-primary "></i>
                  <i class="fas fa-star text-primary "></i>
                  <i class="fas fa-star text-primary "></i>
              </div>
    <div class="mt-2">   
    <a  style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
    onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
    '${mydata.data[i].description}','${i}.jpg')"></i>
    </a> 
    </div>   
    </div>`;
    $("#grid").append(myDiv);
  }
}
//======================================heigh to low price===========================//

function heighPrice() {
  mydata.data.sort(function (a, b) {
    return parseFloat(b.price) - parseFloat(a.price);
  });
  document.getElementById("grid").innerHTML = " ";

  for (i = 0; i < mydata.data.length; i++) {
    myDiv = ` <div class="col-md-4">
                    <div class="card mt-4" id="card-contan${i}" style="max-width: 16rem;
                    max-height: 25rem;">
                      <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${mydata.data[i]["title"]}</h5>
<<<<<<< HEAD
                        <a href="#" class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
=======
                        <a  class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
>>>>>>> e5ddcb90d9de19a42ec640e32b7ce12defb68264
                        ,'${mydata.data[i].description}','${i}.jpg','${mydata.data[i].amount}','${mydata.data[i].created_at}'
                        ,'${mydata.data[i].number_of_sales}','${mydata.data[i].rate}','${mydata.data[i].type}','${mydata.data[i].updated_at}')">Show details</a>
                        <div  id="star-container${i}" class="ml-1 mt-2">
    
                        </div>
        <div class="mt-2">   
<<<<<<< HEAD
        <a href="#" style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
=======
        <a  style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
>>>>>>> e5ddcb90d9de19a42ec640e32b7ce12defb68264
         onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
         '${mydata.data[i].description}','${i}.jpg',${i})"></i>
       
        </div>`;
    $("#grid").append(myDiv);
    drowStars(mydata.data[i].rate, i);
  }
}

//====================================== rate 5 stars  ===========================//

function rate5() {
  document.getElementById("grid").innerHTML = " ";
  for (i = 0; i < mydata.data.length; i++) {
    if (mydata.data[i].rate == 5) {
      myDiv = ` <div class="col-md-4">
              <div class="card mt-4" id="card-contan${i}" style="max-width: 16rem;
              max-height: 25rem;">
                <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${mydata.data[i]["title"]}</h5>
                  <a  class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
                  ,'${mydata.data[i].description}','${i}.jpg','${mydata.data[i].amount}','${mydata.data[i].created_at}'
                  ,'${mydata.data[i].number_of_sales}','${mydata.data[i].rate}','${mydata.data[i].type}','${mydata.data[i].updated_at}')">Show details</a>
                  <div  id="star-container${i}" class="ml-1 mt-2">

                  </div>
  <div class="mt-2">   
  <a  style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
   onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
   '${mydata.data[i].description}','${i}.jpg',${i})"></i>
 
  </div>`;
      $("#grid").append(myDiv);
      drowStars(mydata.data[i].rate, i);
    }
  }
}

//====================================== rate 4stars  ===========================//

function rate4() {
  document.getElementById("grid").innerHTML = " ";
  for (i = 0; i < mydata.data.length; i++) {
    if (mydata.data[i].rate == 4) {
      myDiv = ` <div class="col-md-4">
              <div class="card mt-4" id="card-contan${i}" style="max-width: 16rem;
              max-height: 25rem;">
                <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${mydata.data[i]["title"]}</h5>
                  <a  class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
                  ,'${mydata.data[i].description}','${i}.jpg','${mydata.data[i].amount}','${mydata.data[i].created_at}'
                  ,'${mydata.data[i].number_of_sales}','${mydata.data[i].rate}','${mydata.data[i].type}','${mydata.data[i].updated_at}')">Show details</a>
                  <div  id="star-container${i}" class="ml-1 mt-2">

                  </div>
  <div class="mt-2">   
  <a  style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
   onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
   '${mydata.data[i].description}','${i}.jpg',${i})"></i>
 
  </div>`;
      $("#grid").append(myDiv);
      drowStars(mydata.data[i].rate, i);
    }
  }
}

//====================================== rate 3 stars  ===========================//

function rate3() {
  document.getElementById("grid").innerHTML = " ";
  for (i = 0; i < mydata.data.length; i++) {
    if (mydata.data[i].rate == 3) {
      myDiv = ` <div class="col-md-4">
              <div class="card mt-4" id="card-contan${i}" style="max-width: 16rem;
              max-height: 25rem;">
                <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${mydata.data[i]["title"]}</h5>
                  <a  class="btn btn-danger " onclick="showCard('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}'
                  ,'${mydata.data[i].description}','${i}.jpg','${mydata.data[i].amount}','${mydata.data[i].created_at}'
                  ,'${mydata.data[i].number_of_sales}','${mydata.data[i].rate}','${mydata.data[i].type}','${mydata.data[i].updated_at}')">Show details</a>
                  <div  id="star-container${i}" class="ml-1 mt-2">

                  </div>
  <div class="mt-2">   
  <a  style="text-decoration:none;">${mydata.data[i].price}<i class="fas fa-shopping-cart gr"
   onclick="showProduct('${mydata.data[i].id}','${mydata.data[i]["title"]}','${mydata.data[i].price}',
   '${mydata.data[i].description}','${i}.jpg',${i})"></i>
 
  </div>`;
      $("#grid").append(myDiv);
      drowStars(mydata.data[i].rate, i);
    }
  }
}
