let userList = JSON.parse(localStorage.getItem('users')) || []; //Lấy dữ liệu từ localStorage
let tbody = document.getElementById('table-body'); //Thẻ tbody

//Hàm render lại dữ liệu,hiện ra màn hình
function renderUserList() {
    tbody.innerHTML = ''; // Làm trống màn hình
    userList.forEach(function(element) { //duyệt qua toàn bộ danh sách user
        let tr = document.createElement('tr'); //tạo 1 thẻ tr
        //tạo các thẻ td chứa thông tin từng user trong tr
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
                </td>`
        tbody.appendChild(tr); //Nhét các tr vào tbody để hiện ra màn hình
    })
}    

renderUserList(); 

//Xóa, Sửa 1 user
tbody.addEventListener('click', function(e) { //Gắn sự kiện khi click vào tbody
  //Xóa 1 user
  if(e.target.classList.contains('fa-trash')) { //nếu ấn vào thùng rác bất kỳ
    let deleteUsercode = e.target.id; // lấy usercode của user được click vào
    let deleteIndex = userList.findIndex(user => user.usercode === deleteUsercode); //lấy index của user cần xóa bằng findindex
    userList.splice(deleteIndex, 1); //xóa user ở vị trí index vừa lấy
    localStorage.setItem('users', JSON.stringify(userList)); //Cập nhật lại dữ liệu trong localStorage
    renderUserList(); //Load lại màn hình
  }

  //Sửa 1 user
  if(e.target.classList.contains('fa-pen')) { //nếu ấn vào logo sửa
    let editUsercode = e.target.id; //lấy id user cần sửa
    let editIndex = userList.findIndex(user => user.usercode === editUsercode); //lấy index cần sửa
    localStorage.setItem('editindex', editIndex); //lưu index cần sửa vào localStorage
    window.location.href = 'edit-user.html'; //Điều hướng sang trang sửa
  }
})
