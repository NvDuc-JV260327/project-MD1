let userList = JSON.parse(localStorage.getItem('users')) || []; //lấy dữ liệu user từ loacalStogage về
let editIndex = Number(localStorage.getItem('editindex'));

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

//giá trị trong các thẻ HTML
let inputUserCode = userCode.value;
let inputUserName = userName.value;
let inputEmail = email.value;
let inputPassword = password.value;

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

    if(noError === true) {
        let user = {
            usercode: userList[editIndex].usercode,
            username: userName.value,
            email: userList[editIndex].email,
            password: password.value,
            role: role.value,
            birthday: birthday.value,
            status: document.querySelector('input[name = "status"]:checked').value,
            description:description.value,
        }
        userList.splice(editIndex, 1, user);
        localStorage.setItem('users', JSON.stringify(userList));
        localStorage.removeItem('editindex');
        window.location.href = 'dashboard.html';
    }
})
