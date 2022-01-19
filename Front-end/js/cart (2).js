var cartData = localStorage.getItem("carts");
cartData = JSON.parse(cartData);
let table = document.getElementById("table");
var value = 1;

//====================================== Check authorization and authentication ===========================//

if (localStorage.user) {
  let name = JSON.parse(localStorage.user).name;
  console.log(name);
  document.getElementById("navbarDropdown").innerText = name;
}

//======= check if products done ========//
let sellsArr = localStorage.sells;
if(sellsArr){
  latestSellsArr = JSON.parse(sellsArr);
};

window.addEventListener("load", function () {
  cartData.forEach((item, index) => {

    if (sellsArr && latestSellsArr[index] == item.id) {
      let creattr = document.createElement("tr");
      creattr.classList.add("tr");

      let creatimg = document.createElement("img");
      creatimg.src = `/public/cat-images/images/${item.image}`;
      let creattdone = document.createElement("td");
      creattdone.appendChild(creatimg);

      let creattdtwo = document.createElement("td");
      creattdtwo.innerHTML = item.title;

      let creattdthree = document.createElement("td");
      creattdthree.innerHTML = "white";

      let creattdfour = document.createElement("td");
      creattdfour.innerHTML = item.price;
      creattdfour.classList.add("four");
      let creattdfive = document.createElement("td");

      creatspan = document.createElement("span");
      creatspan.classList.add("span");
      creatspan.innerText = value + " ";
      creattdfive.appendChild(creatspan);

      let creatbtn = document.createElement("button");
      creatbtn.style.width = "25px";
      creatbtn.innerHTML = `<i class='fa fa-check-circle text-dark' style='font-size:25px'></i>`;
      creatbtn.style.border = "1px solid white";
      creatbtn.style.backgroundColor = "white";

      creattdfive.appendChild(creatbtn);

      let creattdsix = document.createElement("td");
      creattdsix.innerHTML = `<span class='text-success'>complete<span>`;

      let createdDisableExit = document.createElement("td");
      createdDisableExit.innerHTML = `<button class='disableExitBtn bg-light'style='border:1px solid white' disabled><i class='fa fa-check' style='color:green'></i></button>`;


      creattr.appendChild(creattdone);
      creattr.appendChild(creattdtwo);
      creattr.appendChild(creattdthree);
      creattr.appendChild(creattdfour);
      creattr.appendChild(creattdfive);
      creattr.appendChild(creattdsix);
      creattr.appendChild(createdDisableExit);
      table.appendChild(creattr);

    } else {
      let creattr = document.createElement("tr");
      creattr.classList.add("tr");

      let creatimg = document.createElement("img");
      creatimg.src = `/public/cat-images/images/${item.image}`;
      let creattdone = document.createElement("td");
      creattdone.appendChild(creatimg);

      let creattdtwo = document.createElement("td");
      creattdtwo.innerHTML = item.title;

      let creattdthree = document.createElement("td");
      creattdthree.innerHTML = "white";

      let creattdfour = document.createElement("td");
      creattdfour.innerHTML = item.price;
      creattdfour.classList.add("four");
      let creattdfive = document.createElement("td");

      creatspan = document.createElement("span");
      creatspan.classList.add("span");
      creatspan.innerText = value + " ";
      creattdfive.appendChild(creatspan);

      let creatbtn = document.createElement("button");
      creatbtn.style.width = "25px";
      creatbtn.innerHTML = "+";
      creatbtn.style.display = "inline-block";
      creatbtn.classList.add("one");

      creattdfive.appendChild(creatbtn);

      let creatbtntwo = document.createElement("button");
      creatbtntwo.style.width = "25px";
      creatbtntwo.style.display = "inline-block";
      creatbtntwo.innerText = "-";
      creatbtntwo.classList.add("two");
      creattdfive.appendChild(creatbtntwo);

      let creattdsix = document.createElement("td");
      creattdsix.innerHTML = `<button class='savebtn'>Buy</button>`;
      creattdsix.classList.add("save");

      let creattdseven = document.createElement("td");
      creattdseven.innerHTML = `<button class='exitbtn'>X</button>`;
      creattdseven.classList.add("exit");

      creattr.appendChild(creattdone);
      creattr.appendChild(creattdtwo);
      creattr.appendChild(creattdthree);
      creattr.appendChild(creattdfour);
      creattr.appendChild(creattdfive);
      creattr.appendChild(creattdsix);
      creattr.appendChild(creattdseven);
      table.appendChild(creattr);
    }
  });

  // =================================== get item from loop =================================//

  var creatspans = document.getElementsByClassName("span");
  var creatbuttons = document.getElementsByClassName("one");
  var createxit = document.getElementsByClassName("exit");
  var creattrows = document.getElementsByClassName("tr");
  var creatsave = document.getElementsByClassName("save");
  var creatbtntwo = document.getElementsByClassName("two");
  var creatfour = document.getElementsByClassName("four");
  var save = document.getElementsByClassName("savebtn");

  //event increament
  for (let i = 0; i < creatbuttons.length; i++) {
    creatbuttons[i].addEventListener("click", () => {
      ++creatspans[i].innerHTML;
      let amount = cartData[i].price;
      let result = Number(amount * creatspans[i].innerHTML);
      creatfour[i].innerHTML = result;
    });

    //event in save button
    let completedProducts = [];
    save[i].addEventListener("click", function (e) {
      if (confirm("The purchase will be made")) {
        var num = Number(creatspans[i].innerHTML);
        creatbtntwo[i].disabled = true;
        creatbuttons[i].disabled = true;
        creatbuttons[i].style.display = "none";
        creatbtntwo[i].innerHTML = `<i class='fa fa-check-circle text-dark' style='font-size:25px'></i>`;
        creatbtntwo[i].style.border = "1px solid white";
        creatbtntwo[i].style.width = "40px";
        creatbtntwo[i].style.backgroundColor = "white";
        exit[i].disabled = true;
        exit[i].innerHTML =  `<button class='disableExitBtn bg-light'style='border:1px solid white' disabled><i class='fa fa-check' style='color:green'></i></button>`;
        save[i].innerHTML = "completed";
        exit[i].style.backgroundColor = "white";
        exit[i].style.border = "1px solid white"
        save[i].style.backgroundColor = "white";
        save[i].style.color = "green";
        save[i].style.border = "1px solid white";
        save[i].disabled = true;

        if(localStorage.sells){
          let currentSells = localStorage.sells;
          currentSells = JSON.parse(currentSells);
          console.log(currentSells);
          currentSells.push(cartData[i].id);
          localStorage.setItem("sells", JSON.stringify(currentSells));
        }else{
          completedProducts.push(cartData[i].id);
          localStorage.setItem("sells", JSON.stringify(completedProducts));
        }

        //get data by ajax call
        $.ajax({
          url: `http://localhost:8000/api/products/sell/${cartData[i].id}`,
          type: "post",
          headers: { Authorization: `Bearer ${token}` },
          dataType: "json",
          data: { amount: num },
          success: function (response) {
            console.log(response);
          },
          error: function (error) {
            console.log(error);
          },
        });
      } else {
        e.preventDefault();
      }
    });
  }

  //------------------------- Handle delete product from carts ----------------------------//

  let exit = document.querySelectorAll('.exitbtn')
  exit.forEach((item,index) => {
    item.addEventListener('click', (e) => {
      if (this.confirm("are you sure from delete")) {
        creattrows[index].style.display = "none";
        var cartData = JSON.parse(localStorage.getItem("carts"));
        cartData.splice(index, 1);
        localStorage.setItem("carts", JSON.stringify(cartData));
      } else {
        e.preventDefault();
      }
    })
  })

  //event in decreament button
  for (let i = 0; i < creatbtntwo.length; i++) {
    creatbtntwo[i].addEventListener("click", () => {
      if (creatspans[i].innerHTML > 1) {
        --creatspans[i].innerHTML;
        let amount = cartData[i].price;
        let result = Number(amount * creatspans[i].innerHTML);
        creatfour[i].innerHTML = result;
      }
    });
  }
});
