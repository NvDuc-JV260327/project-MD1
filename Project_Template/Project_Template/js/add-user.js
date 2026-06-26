let userList = JSON.parse(localStorage.getItem('users')) || [];

//lấy các thẻ HTML
let userCode = document.getElementById('user-code');
let userName = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let role = document.getElementById('role');
let birthday = document.getElementById('dob');
let description = document.querySelector('.description');
let eye = document.querySelector('.fa-eye');
let eyeSlash = document.querySelector('.fa-eye-slash');
let btnBack = document.querySelector('.back-btn');
let btnAdd = document.querySelector('.add-btn');

//hiện, ẩn mật khẩu
eye.addEventListener('click', function(){
    password.type = 'text';
    eye.style.display = 'none';
    eyeSlash.style.display = 'block';
})
eyeSlash.addEventListener('click', function() {
    password.type = 'password';
    eyeSlash.style.display = 'none';
    eye.style.display = 'block';
})

//sự kiện khi ấn nút back
btnBack.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'dashboard.html';
})

//các thẻ HTML thông báo
let msg = document.getElementById('msg'); //hiển thị tất cả thông báo
let addError = document.getElementById('add-error'); //thông báo add lỗi
let addToast = document.getElementById('add-toast'); //thông báo add thành công

//function hiển thị các lỗi
function msgError() {
    msg.classList.add('show');
    addError.classList.remove('hidden');
}

//sự kiện khi ấn nút add
btnAdd.addEventListener('click', function(e) {
    e.preventDefault();

    //ẩn các thông báo
    msg.classList.remove('show');
    addError.classList.add('hidden');
    document.querySelector('.email-username-password-empty').classList.add('hidden'); //bỏ trống email, username, pass 
    document.querySelector('.email-error').classList.add('hidden'); //email sai định dạng
    document.querySelector('.email-exist').classList.add('hidden'); //email đã tồn tại
    document.querySelector('.password-min-length-error').classList.add('hidden'); //pass không đủ 8 ký tự
    document.querySelector('.password-number-required-error').classList.add('hidden'); //pass không chứa ký tự số
    document.querySelector('.password-uppercase-lowercase-error').classList.add('hidden'); //pass phải bảo gồm chữ hoa-chữ thường
    document.getElementById('add-toast').classList.add('hidden'); // add thành công
    
    let noError = true; //biến kiểm tra có lỗi không

    //username, email, pass không được bỏ trống 
    if(userName.value === '' || email.value === '' || password.value === '') {
        noError = false;
        document.querySelector('.email-username-password-empty').classList.remove('hidden');
        msgError();
    }
    //email phải đúng định dạng
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email.value) && userName.value !== '' && email.value !== '' && password.value !== '' ) {
        noError = false;
        document.querySelector('.email-error').classList.remove('hidden');
        msgError();
    }
    //email đã tồn tại
    let checkEmail = userList.find(user => user.email === email.value);
    if(checkEmail && userName.value !== '' && email.value !== '' && password.value !== '') {
        noError = false;
        document.querySelector('.email-exist').classList.remove('hidden');
        msgError();
    }
    
    //pass tối thiểu 8 ký tự
    if(password.value.length < 8 && emailRegex.test(email.value) && userName.value !== '' && email.value !== '' && password.value !== '' && !checkEmail) {
        noError = false;
        document.querySelector('.password-min-length-error').classList.remove('hidden'); 
        msgError();
    }
    //pass phải bao gồm cả chữ và số
    let hasNumber = /[0-9]/;
    if(!hasNumber.test(password.value) && password.value.length >= 8 && userName.value !== '' && email.value !== '' && password.value !== '' && !checkEmail && emailRegex.test(email.value)) {
        noError = false;
        document.querySelector('.password-number-required-error').classList.remove('hidden');
        msgError();
    }
    
    //pass phải bao gồm chữ thường và chữ hoa
    let hasUpper = /[A-Z]/;
    let hasLower = /[a-z]/;
    if((!hasUpper.test(password.value) || !hasLower.test(password.value)) && hasNumber.test(password.value) && password.value.length >= 8 && userName.value !== '' && email.value !== '' && password.value !== '' && emailRegex.test(email.value) && !checkEmail) {
        noError = false;
        document.querySelector('.password-uppercase-lowercase-error').classList.remove('hidden');
        msgError();
    }

    //nếu không có lỗi đầu vào
    if(noError) {
        let user = {
            usercode: `U${Date.now()}`,
            username: userName.value,
            email: email.value,
            password: password.value,
            role: role.value,
            birthday: birthday.value,
            status: document.querySelector('input[name="status"]:checked').value,
            description: description.value,
        }
    userCode.value = user.usercode;
    userList.push(user);
    localStorage.setItem('users', JSON.stringify(userList));
    //thông báo add thành công
    document.getElementById('add-toast').classList.remove('hidden');
    msg.classList.add('show');
    setTimeout(function() {
        window.location.href = 'dashboard.html';
    }, 2000);
    }
})
