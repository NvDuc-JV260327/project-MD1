let userList = JSON.parse(localStorage.getItem('users')) || []; //Lấy dữ liệu từ localStorage
let tbody = document.getElementById('table-body'); //Thẻ tbody
let displayList = [...userList]; //danh sách này sẽ hiện ra màn hình
let paginationlist = document.getElementById('pagination-list'); //chứa danh sách số trang
let btnRight = document.querySelector('.arrow-right'); //nút mở trang tiếp theo
let btnLeft = document.querySelector('.arrow-left'); //nút mở trang trước

//Hàm render lại dữ liệu,hiện ra màn hình
// function renderUserList(userList) {
//     tbody.innerHTML = ''; // Làm trống màn hình
//     userList.forEach(function(element) { //duyệt qua toàn bộ danh sách user
//         let tr = document.createElement('tr'); //tạo 1 thẻ tr
//         //tạo các thẻ td chứa thông tin từng user trong tr
//         tr.innerHTML = `<td>${element.usercode}</td> 
//                 <td>${element.username}</td>
//                 <td>${element.email}</td>
//                 <td class="uppercase">${element.role}</td>
//                 <td>${element.birthday}</td>
//                 <td>
//                   <span class="status-cell ${element.status.toLowerCase()}">
//                   <span class="dot"></span>${element.status}</span>
//                 </td>
//                 <td>
//                   <i id="${element.usercode}" class="fa-solid fa-trash"></i>
//                   <i id="${element.usercode}" class="fa-solid fa-pen"></i>
//                 </td>`
//         tbody.appendChild(tr); //Nhét các tr vào tbody để hiện ra màn hình
//     })
// }

//TÍNH NĂNG PHÂN TRANG//
let currentPage = 1; //page hiện tại
let userPerPage = 5; //số user hiển thị trên 1 trang
//hàm in danh sách ra màn hình
function renderUser(userList) {
  tbody.innerHTML = ''; //làm trống màn hình
  //tính vị trí bắt đầu và kết thúc in các user
  let start = (currentPage - 1) * userPerPage; //công thức
  let end = start + userPerPage; //công thức
  //lấy dữ liệu trang cần in ra
  let pageUser = userList.slice(start, end);
  //duyệt qua danh sách user của trang hiện tại để tạo thẻ
  pageUser.forEach(function(element) {
    let tr = document.createElement('tr'); //tạo tr lưu các thông tin của user 
    tr.innerHTML = `<td>${element.usercode}</td> 
                <td>${element.username}</td>
                <td>${element.email}</td>
                <td class="uppercase">${element.role}</td>
                <td>${element.birthday}</td>
                <td>
                  <span class="status-cell ${element.status.toLowerCase()}">
                  <span class="dot"></span>${element.status}</span>
                </td>
                <td>
                  <i id="${element.usercode}" class="fa-solid fa-trash"></i>
                  <i id="${element.usercode}" class="fa-solid fa-pen"></i>
                </td>`;
    tbody.appendChild(tr); //nhét tr vào tbody để in ra màn hình   
  })
}
//hàm render số page
function renderPagination(userList) {
  paginationlist.innerHTML = '';
  //tính tổng số trang cần hiện ra
  let totalPage = Math.ceil(userList.length / userPerPage);
  for(let i = 1; i <= totalPage; i++) {
    let li = document.createElement('li'); //tạo các li để hiện ra số trang trong ul
    li.innerText = i; //tên các thẻ là số của trang
    li.style.cursor = 'pointer'; //khi trỏ vào số trang sẽ hiện bàn tay
    //nhận biết trang hiện tại ở trang số bao nhiêu
    if(i === currentPage) { 
      li.style.backgroundColor = 'green';
      li.style.color = 'white'
    }
    //click vào trang khác
    li.addEventListener('click', function() {
      currentPage = i;
      renderUser(displayList);
      renderPagination(displayList);
    })
    paginationlist.appendChild(li); //nhét vào ul để hiện ra số trang
  }
}
renderUser(displayList);
renderPagination(displayList);

//gắn sự kiện cho 2 nút chuyển trang tới - lui
btnRight.addEventListener('click', function() {
  let totalPage = Math.ceil(displayList.length / userPerPage);
  if(currentPage < totalPage) {
    currentPage++;
    renderUser(displayList);
    renderPagination(displayList);
  }
})
btnLeft.addEventListener('click', function() {
  let totalPage = Math.ceil(displayList.length / userPerPage);
  if(currentPage > 1) {
    currentPage--;
    renderUser(displayList);
    renderPagination(displayList);
  }
})
//Xóa, Sửa 1 user
tbody.addEventListener('click', function(e) { //Gắn sự kiện khi click vào tbody
  //Xóa 1 user
  if(e.target.classList.contains('fa-trash')) { //nếu ấn vào thùng rác bất kỳ
    let deleteUsercode = e.target.id; // lấy usercode của user được click vào
    let deleteIndex = userList.findIndex(user => user.usercode === deleteUsercode); //lấy index của user cần xóa bằng findindex
    userList.splice(deleteIndex, 1); //xóa user ở vị trí index vừa lấy
    localStorage.setItem('users', JSON.stringify(userList)); //Cập nhật lại dữ liệu trong localStorage
    displayList = [...userList];
    renderUser(displayList); //Load lại màn hình
    renderPagination(displayList);
  }

  //Sửa 1 user
  if(e.target.classList.contains('fa-pen')) { //nếu ấn vào logo sửa
    let editUsercode = e.target.id; //lấy id user cần sửa
    // let editIndex = userList.findIndex(user => user.usercode === editUsercode); //lấy index cần sửa
    localStorage.setItem('editusercode', editUsercode); //lưu usercode cần sửa vào localStorage
    window.location.href = 'edit-user.html'; //Điều hướng sang trang sửa
  }
})

//tính năng tìm kiếm
let searchInput = document.getElementById('search-box'); //ô tìm kiếm
let btnSearch = document.querySelector('.fa-magnifying-glass'); //nút tìm kiếm
btnSearch.addEventListener('click', function() {
  let keyword = searchInput.value;
  let result = userList.filter(user => user.username.toLowerCase().includes(keyword));
  displayList = result;
  currentPage = 1;
  renderUser(displayList);
  renderPagination(displayList);
  searchInput.value = '';
})
