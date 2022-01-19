let opendata = JSON.parse(localStorage.getItem("opencard"));
let mycardDetails = `<div class="col-md-12">
<div class="card mt-4 align-center" style="max-width: 300rem;
max-height: 60rem;">
 <a href="category.html" class="text-left mt-0"><i class=" fa fa-arrow-circle-left fa-3x m-5 exit text-dark "></i></a>

  <div class="col-md-12 ceneter ">
  <img src="../public/cat-images/images/${opendata[0]["image"]}" style="max-width: 20rem;max-height: 15rem; " alt="...">
  </div>

  <div class="card-body ceneter">
    <h5 class="card-title">${opendata[0]["title"]}</h5>
    <h5 class="card-title">${opendata[0]["price"]} $</h5>
    <h5 class="card-title">${opendata[0]["description"]}</h5>

    <div id="star-container" class="ml-1 mt-2">
      
    </div>
       <i class="fas fa-shopping-cart gr"></i>   
       </div> 
     </div>  
</div>`;
$("#grid2").append(mycardDetails);

function drowStars(numOfstars = 0) {
  for (let i = 0; i < numOfstars; i++) {
    // debugger;
    let icon = `<i id="star-${
      i + 1
    }" class="fas fa-star text-gray " style="cursor: pointer" onclick="makeRate('star-${
      i + 1
    }')">
        </i>`;

    $("#star-container").append(icon); //= "<i class='fas fa-star text-primary '></i>";
  }
  for (let i = 0; i < 5 - numOfstars; i++) {
    let icon = `<i id="star-${
      i + numOfstars
    }"  class="fas fa-star text-gray " style="cursor: pointer" onclick="makeRate('star-${
      i + 1
    }')"></i>`;
    $("#star-container").append(icon);
  }
}
drowStars(opendata[0]["rate"]);

function makeRate(c) {
  var storedRate = [];
  var r = opendata[0]["rate"];
  var found = false;
  let num_stars = c;
  if (localStorage.rated) {
    storedRate = JSON.parse(localStorage.rated);
    for (item in storedRate) {
      if (storedRate[item].id == opendata[0]["id"]) found = true;
    }
    if (!found) {
      storedRate.push({ id: opendata[0]["id"] });
      document.getElementById("star-container").innerHTML = "";
      if (num_stars == "star-1") {
        r = 1;
        drowStars(1);
      } else if (num_stars == "star-2") {
        r = 2;
        drowStars(2);
      } else if (num_stars == "star-3") {
        r = 3;
        drowStars(3);
      } else if (num_stars == "star-4") {
        r = 4;
        drowStars(4);
      } else {
        r = 5;
        drowStars(5);
      }
    }
  } else {
    storedRate.push({ id: opendata[0]["id"] });
    document.getElementById("star-container").innerHTML = "";
    if (num_stars == "star-1") {
      r = 1;
      drowStars(1);
    } else if (num_stars == "star-2") {
      r = 2;
      drowStars(2);
    } else if (num_stars == "star-3") {
      r = 3;
      drowStars(3);
    } else if (num_stars == "star-4") {
      r = 4;
      drowStars(4);
    } else {
      r = 5;
      drowStars(5);
    }
  }
  localStorage.setItem("rated", JSON.stringify(storedRate));
  $.ajax({
    url: `http://localhost:8000/api/products/rate/${opendata[0].id}`,
    type: "POST",
    data: { rate: r },
    headers: { Authorization: `Bearer ${token}` },
    dataType: "json",
    success: function (response) {
      console.log(response);
      let cartDetails = {
        id: opendata[0].id,
        title: opendata[0].title,
        price: opendata[0].price,
        description: opendata[0].description,
        image: opendata[0].image,
        amount: opendata[0].amount,
        creat: opendata[0].creat,
        numb: opendata[0].numb,
        rate: r,
        type: opendata[0].type,
        update: opendata[0].update,
      };
      localStorage.setItem("opencard", JSON.stringify([cartDetails]));
      // location.reload();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function drowStars(numOfstars = 0) {
  let c = 1;
  for (let i = 0; i < numOfstars; i++) {
    let icon = `<i id="star-${
      i + 1
    }" class="fas fa-star text-primary " style="cursor: pointer" onclick="makeRate('star-${c}')">
        </i>`;
    c++;
    $("#star-container").append(icon); //= "<i class='fas fa-star text-primary '></i>";
  }
  for (let i = 0; i < 5 - numOfstars; i++) {
    let icon = `<i id="star-${
      i + numOfstars
    }"  class="fas fa-star text-gray " style="cursor: pointer" onclick="makeRate('star-${c}')"></i>`;
    $("#star-container").append(icon);
    c++;
  }
}
