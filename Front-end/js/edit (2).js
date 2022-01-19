
function searchNav() {

    let searchInp = document.getElementById('searchVal');
    let myDiv = '';
    for (var i = 0; i < mydata.data.length; i++) {
  
      if (mydata.data[i].title.includes(searchInp.value)) {
        myDiv = ` <div class="col-md-4">
        <div class="card mt-4" style="max-width: 16rem;
        max-height: 25rem;">
          <img src="../public/cat-images/images/${i}.jpg"style="max-width:16rem; max-height: 13;" alt="...">
          <div class="card-body">
            <h5 class="card-title">${mydata.data[i]['title']}</h5>
            <a href="#" class="btn btn-danger ">Bestseller</a>
            <div class="ml-1 mt-2">
              <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
                <i class="fas fa-star text-primary "></i>
            </div>
     <div class="mt-2">   
     <a  href="" style="text-decoration: none ;" class="card-text gr">${mydata.data[i]['price']}<i class="fas fa-shopping-cart gr"></i>
     </a> 
     </div>
  
     </div>`
  
      }
    }
    let myGrid = document.getElementById('grid');
    myGrid.innerHTML = myDiv;
    console.log(myDiv)
  


 
}






// open page display my card on click

function showCard(Id, Title, Price, Decraption, Image) {

    // will work in three step
    //step one catch data and store it in localstorage 
  
    let products = []
    let cartDetails = {
      id: Id,
      title: Title,
      price: Price,
      description: Decraption,
      image: Image
    }
    products.push(cartDetails);
    // 2 set data and open window
  
    localStorage.setItem('opencard', JSON.stringify(products))
    let newWin = open('/html/detailsProduct.html', "_self");
    console.log(opendata)
    //3 disply in card
    //  $("#grid2").append(opendata); in   second page 
  
  
  
  }
  