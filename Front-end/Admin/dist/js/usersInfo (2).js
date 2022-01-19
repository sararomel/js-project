//====================================== Check authorization and authentication ===========================//
// Get user role and token from local_storage
const user_role = localStorage.user_role;
const token = localStorage.token;

if (user_role != 2 || !token) {
  window.open('/html/login.html' , "_self");
};


var back = document.getElementById('back');
var users = document.getElementById('users');
var usersData = [];
var searchInput = document.querySelector('#search');
var usersCounter = document.querySelector('#users-counter');

const filters = {
    searchText : '',
};

// Generte row for new user
const generateUser = item => {
  //create div container all users
  var user = document.createElement('div');
  user.classList.add('card-header');
  user.classList.add('p-4');

  // create span for user email
  var email = document.createElement('span');
  email.classList.add('fw-bold');
  email.classList.add('h4');
  email.innerHTML = item.email;
  user.appendChild(email);

  // Create btn to delete any user
  if (item.role == 1) {
    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('btn-danger');
    deleteBtn.classList.add('pull-right');
    deleteBtn.innerHTML = 'Delete';
    user.appendChild(deleteBtn);

    // How To Delete User
    deleteBtn.addEventListener('click', (e) => {
      var usersRows = document.getElementsByClassName('card-header');
      console.log(usersRows);

      if (confirm('Are You Sure You Want Do This?')) {
        $.ajax({
          url: `http://localhost:8000/api/user/delete/${item.id}`,
          type: 'Delete',
          headers: { "Authorization": `Bearer ${token}` },
          dataType: 'json',
          success: function (response) {
            if (response.data == true) location.reload();
          },
          error: function (error) {
            console.log(error);
          }

        });
        //================ End Of Delete User ==================//
      }
    })
  };

  // Add all elements into container
  users.appendChild(user);
};


//=============================== Search for users =========================//
const renderSearch = (arr , filter)=>{
    const searchResult =  arr.filter(user=>{
      return user.email.toLowerCase().includes(filter.searchText.toLowerCase());
    });

    usersCounter.innerHTML = `<span>Users : ${searchResult.length}</span>`;
    users.innerHTML = '';
    if(searchResult.length != 0){
      searchResult.forEach(item=>{
        generateUser(item);
      })
    } else {
      users.innerHTML = `<p class="h5 text-light py-4 text-center">No users found with email "${filter.searchText}"</p>`
    }
}


back.addEventListener('click', () => {
  window.open("/Admin/index.html", "_self")
});



//========================== Get all users ===================================//
$.ajax({
  url: 'http://localhost:8000/api/users',
  type: 'GET',
  headers: { "Authorization": `Bearer ${token}` },
  dataType: 'json',
  success: async function (response) {
    console.log('from ajax call');
    usersData = await response;

    // Loop for all users
    usersData.data.forEach(item => {
      generateUser(item);
      usersCounter.innerHTML = `<span>Users : ${usersData.data.length}</span>`;
    })

  },
  error: function (error) {
    console.log(error);
  }
});
// End Of Ajax Call


//========== fire event for search in products ========//
searchInput.addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderSearch(usersData.data, filters);
})


