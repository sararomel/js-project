//====================================== Check authorization and authentication ===========================//
// Get user role from local_storage
const user_role = localStorage.user_role;
const token = localStorage.token;

if (user_role != 2 || !token) {
  window.open('/html/login.html', "_self");
};

var back = document.querySelector('#back');
var addProduct = document.querySelector('#add');
var searchInput = document.querySelector('#search');
var productsCounter = document.querySelector('#products-counter');

const filters = {
  searchText: '',
};

// Generate products in html code
const generateProduct = (item) => {
  return products.innerHTML += `<div class="row card-body">
    <div class="col"><span class="h3">${item.title}</span> <span>( Rate : ${item.rate} )</span><br><small>${item.description}</small></div>
      <div class="col text-end">
        <form class="form" id="${item.id}">
          <input type="hidden" name="title" value="${item.title}">
          <input type="hidden" name="description" value="${item.description}">
          <input type="hidden" name="type" value="${item.type}">
          <span class="fw-bold">Amount :
            <input type="number" name="amount" value="${item.amount}" class="counter"></input>
          </span>
          <spnan class="fw-bold"> Price :
            <input type="number" name="price" value="${item.price}" class="price"></input>
          </spnan>
          <input type="button" value="Save" class="btn btn-primary mx-3 save"></input>
          <input type="button" value="remove" class="btn btn-danger mx-3 remove"></input>
        </form>
      </div>
    </div>
  </div>`;
};


//==================================== Function for search in products ===========================//
const renderSearch = (arr, filter) => {
  const SearchResult = arr.filter((item) => {
    return item.title.toLowerCase().includes(filter.searchText.toLowerCase());
  });

  //=========== Loop for all results of search ============//

  productsCounter.innerHTML = `Products : ${SearchResult.length}`;
  if (SearchResult.length != 0) {
    products.innerHTML = '';
    SearchResult.forEach(item =>{
      generateProduct(item);
    });
  } else {
    products.innerHTML = `<p class="h5 text-light py-4 text-center">No product found with title "${filter.searchText}"</p>`
  }
}






back.addEventListener('click', () => {
  window.open("/Admin/index.html", "_self")
});


//========================== Get all products ===================================//

$.ajax({
  url: 'http://localhost:8000/api/products',
  type: 'GET',
  dataType: 'json',
  success: async function (response) {
    productsData = await response;
    productsData.data = productsData.data.reverse();
    productsCounter.innerHTML = `Products : ${productsData.data.length}`;

    if (productsData.data.length != 0) {
      
      //=========== Loop for all products ============//
      productsData.data.forEach(item => {
        generateProduct(item);
      });

    } else {
      products.innerHTML = `<p class="h5 text-light py-4 text-center">No product found in your storage</p>`
    }


    var saveItem = document.getElementsByClassName('save');
    var removeItem = document.getElementsByClassName('remove');
    var allForms = document.getElementsByClassName('form');
    var alert = document.getElementsByClassName('alert')[0];
    var closeAlert = document.getElementsByClassName('close')[0];
    var productsRows = document.getElementsByClassName('card-body');

    closeAlert.addEventListener('click', () => {
      alert.style.display = 'none';
    })

    for (let i = 0; i < removeItem.length; i++) {

      removeItem[i].addEventListener('click', () => {

        if (confirm('Are You Sure You Want To Delete It?')) {
          //================== Delete Current Item =============//

          $.ajax({
            url: `http://localhost:8000/api/products/delete/${allForms[i].id}`,
            headers: { "Authorization": `Bearer ${token}` },
            type: 'Delete',
            dataType: 'json',
            success: function (response) {
              console.log(response);
              productsRows[i].style.display = 'none';
            },
            error: function (error) {
              console.log(error);
            }
          });
          //===================== End Of Delete Item ===============//
        };

      });


      saveItem[i].addEventListener('click', () => {

        //================== Update product =============//
        $.ajax({
          url: `http://localhost:8000/api/products/${allForms[i].id}`,
          type: 'POST',
          headers: { "Authorization": `Bearer ${token}` },
          data: $(`#${allForms[i].id}`).serialize(),
          dataType: 'json',
          success: function (response) {
            console.log(response);
            alert.style.display = 'block';
          },
          error: function (error) {
            console.log(error);
          }
        });
        //================== End Of Update Data ========//

      })

    }

  },
  error: function (error) {
    console.log(error);
  }
});
// End Of Ajax Call For Get All Products


//============================= Add New Product ====================================//

addProduct.addEventListener('click', () => {
  $.ajax({
    url: 'http://localhost:8000/api/products',
    type: 'POST',
    headers: { "Authorization": `Bearer ${token}` },
    data: $('#addNewProduct').serialize(),
    dataType: 'json',
    success: function (response) {
      console.log('from ajax call');
      console.log(response);
      location.reload();
    },
    error: function (error) {
      console.log(error);
    }

  });
  // End Of Ajax Call
})

//============================= End Of Add Product ====================================//


//========== fire event for search in products ========//
searchInput.addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderSearch(productsData.data, filters);
})

