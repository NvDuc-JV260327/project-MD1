let userList = JSON.parse(localStorage.getItem('users')) || []; //lấy dữ liệu user từ loacalStogage về
// let editIndex = Number(localStorage.getItem('editindex'));
let editUserCode = localStorage.getItem('editusercode');
let editIndex = userList.findIndex(user => user.usercode === editUserCode);
//lấy liên kết tới các thẻ HTML
let userCode = document.getElementById('user-code'); //link usercode 
let userName = document.getElementById('username'); //link username
let email = document.getElementById('email'); //link email
let password = document.getElementById('password'); //link pass 
let eye = document.querySelector('.fa-eye'); //link mắt mở pass
let eyeSlash = document.querySelector('.fa-eye-slash'); //link mắt ẩn pass
let btnBack = document.querySelector('.back-btn'); //nút back
let btnSave = document.querySelector('.save-btn'); //nút save
let role = document.getElementById('role'); //phân quyền admin hoặc user
let birthday = document.getElementById('dob'); //sinh nhật
let statusOption = document.querySelector('input[name = "status"]:checked'); //trạng thái hoạt động
let description = document.querySelector('.description-text-input'); //miêu tả

//hiện và ẩn pass
eye.addEventListener('click', function() {
    password.type = 'text';
    eye.style.display = 'none';
    eyeSlash.style.display = 'block';
});
eyeSlash.addEventListener('click', function() {
    password.type = 'password';
    eye.style.display = 'block';
    eyeSlash.style.display = 'none';
});

//đổ dữ liệu user cần sửa lên form
userCode.value = userList[editIndex].usercode; 
email.value = userList[editIndex].email;
userName.value = userList[editIndex].username;
password.value = userList[editIndex].password;
role.value = userList[editIndex].role;
birthday.value = userList[editIndex].birthday;
description.value = userList[editIndex].description;
let statusList = document.querySelectorAll('input[name = "status"]'); //đổ dữ lệu status
statusList.forEach(radio => {
    if(radio.value === userList[editIndex].status) {
        radio.checked = true;
    }
})

email.disabled = false; //cho phép sửa mail

//thêm thông báo lỗi định dạng mail
let divEmailError = document.createElement('div');
divEmailError.classList.add('email-format-error', 'hidden');
divEmailError.innerHTML = 
    `<i class="fa-solid fa-circle-exclamation"></i>
    <span class="edit-error-message">
    Email không đúng định dạng
    </span>`;
document.getElementById('edit-error').appendChild(divEmailError);   

//thêm thông báo email không được bỏ trống
let divEmailEmpty = document.createElement('div');
divEmailEmpty.classList.add('email-empty-error', 'hidden');
divEmailEmpty.innerHTML = 
    `<i class="fa-solid fa-circle-exclamation"></i>
    <span class="edit-error-message">
    Email không được để trống
    </span>`
document.getElementById('edit-error').appendChild(divEmailEmpty);

//gắn sự kiện khi ấn nút back
btnBack.addEventListener('click', function() {
    localStorage.removeItem('editindex')
    window.location.href = 'dashboard.html'; //trở về dashboard
});

//SỰ KIỆN ẤN NÚT SAVE

//funntion show các thẻ thông báo khi có lỗi 
function showError() {
    document.getElementById('msg').classList.add('show');
    document.getElementById('edit-error').classList.remove('hidden');
}

//gắn sự kiện 
btnSave.addEventListener('click', function(e) {
    e.preventDefault();
    let noError = true;
    //reset ẩn các thông báo lỗi
    document.getElementById('msg').classList.remove('show'); //ẩn msg lỗi - msg báo thành công
    document.getElementById('edit-error').classList.add('hidden'); //ẩn msg lỗi
    
    //lỗi để trống user và password
    document.querySelector('.username-and-password-empty').classList.add('hidden');
    if(userName.value === '' || password.value === '') {
        noError = false;
        document.querySelector('.username-and-password-empty').classList.remove('hidden');
        showError();
    }
    //lỗi pass nhỏ hơn 8 ký tự
    document.querySelector('.password-min-length-error').classList.add('hidden');
    if(password.value.length < 8 && password.value !== '' && userName.value !== '') {
        noError = false;
        document.querySelector('.password-min-length-error').classList.remove('hidden');
        showError();
    }
    //lỗi bỏ trống email
    document.querySelector('.email-empty-error').classList.add('hidden');
    if(email.value === '') {
        noError = false;
       document.querySelector('.email-empty-error').classList.remove('hidden');
       showError();
    }

    //lỗi mail không đúng định dạng
    document.querySelector('.email-format-error').classList.add('hidden');
    let emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email.value) && email.value != '') {
        noError = false;
        document.querySelector('.email-format-error').classList.remove('hidden');
        showError();
    }
    //nếu không có lỗi gì
    document.getElementById('edit-toast').classList.add('hidden');
    if(noError === true) {
        let user = {
            usercode: userList[editIndex].usercode,
            username: userName.value,
            email: email.value,
            password: password.value,
            role: role.value,
            birthday: birthday.value,
            status: document.querySelector('input[name = "status"]:checked').value,
            description:description.value,
        }
        userList.splice(editIndex, 1, user);
        localStorage.setItem('users', JSON.stringify(userList));
        localStorage.removeItem('editusercode');
        document.getElementById('edit-toast').classList.remove('hidden');
        document.getElementById('msg').classList.add('show');
        setTimeout(function() {
            window.location.href = 'dashboard.html';
        }, 2000);
    }
})
