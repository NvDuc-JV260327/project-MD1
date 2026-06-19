let userList = JSON.parse(localStorage.getItem('users')) || [];

let msg = document.getElementById('msg'); //MSG - to nhất phần báo lỗi
let loginValidate = document.getElementById('login-validation'); //Chứa (logo báo lỗi, báo email,pass để trống)
let loginValidationHeader = document.querySelector('.login-validation-header'); //logo báo lỗi
let loginValidationContent = document.querySelector('.login-validation-content'); //chứa thông báo (email,pass) trống
let passwordBlank = document.querySelector('.password-cannot-blank'); //thông báo pass trống
let emailBlank = document.querySelector('.email-cannot-blank'); //thông báo email trống
let email = document.getElementById('email'); // đường dẫn lấy mail
let password = document.getElementById('password'); //đường dẫn lấy pass
let btnSignin = document.querySelector('.btn'); //Nút đăng nhập
let closeBtn = document.querySelector('.close-btn'); // nút x để tắt thông báo error
let loginToast = document.getElementById('login-toast'); // Thông báo đăng nhập thành công
let loginError = document.getElementById('login-error'); // Thông báo email hoặc pass không tồn tại

//Gắn sự kiện khi bấm đăng nhập
btnSignin.addEventListener('click', function(e) {
    e.preventDefault();
    let inputEmail = email.value; //đầu vào email
    let inputPassword = password.value; //đầu vào pass
    let hasError = false; //quyết định có hiển thị báo lỗi không
    
    msg.classList.remove('show'); //reset ẩn msg
    loginValidate.classList.add('hidden'); //reset ẩn thông báo (logo báo lỗi, báo email,pass để trống)
    loginValidationContent.classList.add('hidden'); //reset ẩn thông báo để trống (email, pass)
    loginToast.classList.add('hidden'); //reset ẩn thông báo đăng nhập thành công
    loginError.classList.add('hidden'); ////reset ẩn thông báo email hoặc pass không tồn tại

    //Nếu mail trống
    emailBlank.classList.add('hidden'); //reset ẩn tb 
    if(inputEmail === '') {
        hasError = true;
        emailBlank.classList.remove('hidden');
    }
    //Nếu pass trống
    passwordBlank.classList.add('hidden'); // reset ẩn tb
    if(inputPassword === '') {
        hasError = true;
        passwordBlank.classList.remove('hidden');
    }
    if(hasError) { //nếu có phần để trống
        msg.classList.add('show');
        loginValidate.classList.remove('hidden');
        loginValidationContent.classList.remove('hidden');
    } else { //Nếu không có phần để trống
        let findAccount = userList.find( //tìm kiếm có tài khoản nào khớp không
            (user) => user.email === inputEmail && user.password === inputPassword);
        if(findAccount) { //Nếu có tài khoản khớp
            //Báo đăng nhập thành công
            loginToast.classList.remove('hidden');
            msg.classList.add('show');
            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            //Báo email hoặc pass không tồn tại
            loginError.classList.remove('hidden');
            msg.classList.add('show');
        }           
    }
})

//Đóng thông báo lỗi bằng nút x
closeBtn.style.cursor = 'pointer';
closeBtn.addEventListener('click', function() {
    loginValidate.classList.add('hidden');
})
