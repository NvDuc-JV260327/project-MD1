let userList = JSON.parse(localStorage.getItem('users')) || []; //Lấy dữ liệu tài khoản từ localStorage

let eye = document.querySelector('.fa-eye'); // Mắt hiện mk
let eyeSlash = document.querySelector('.fa-eye-slash'); // Mắt tắt mk
let inputPassword = document.getElementById('password'); // Đầu vào pass    
let inputEmail = document.getElementById('email'); // Đầu vào email
let inputUsername = document.getElementById('username'); // Đầu vào username
let btn = document.querySelector('.btn'); // nút signup
let validationHeader = document.querySelector('.sign-up-validation-header'); //Phần đầu + ERROR + dấu x

// Hiện / ẩn mật khẩu
eye.addEventListener('click', function() {
    inputPassword.type = 'text'; // Đổi type pass sang kiểu text để hiện
    eye.style.display = 'none'; 
    eyeSlash.style.display = 'block';
});
eyeSlash.addEventListener('click', function() {
    inputPassword.type = 'password'; // Trở về kiểu pass
    eye.style.display = 'block';
    eyeSlash.style.display = 'none';
})

// Validate
let msg = document.getElementById('msg'); // messeger container(to nhất)
let signupValidate = document.getElementById('sign-up-validation'); // Chứa Error và các phần báo rỗng
let x = document.querySelector('.fa-circle-xmark'); // nút x tắt thông báo lỗi 

btn.addEventListener('click', function(e) { //Các sự kiện khi ấn nút
    e.preventDefault();
    let noError = true;

    let checkEmail = inputEmail.value; //giá trị email đầu vào
    let checkUsername = inputUsername.value; //giá trị username đầu vào
    let checkPassword = inputPassword.value; //giá trị pass đầu vào
    let emailBlank = document.querySelector('.email-cannot-blank'); //Báo mail trống
    let usernameBlank = document.querySelector('.username-cannot-blank'); //Báo username trống
    let passwordBlank = document.querySelector('.password-cannot-blank'); //Báo pass trống

    //Báo rỗng
    msg.classList.remove('show'); //reset msg
    validationHeader.classList.add('hidden'); //reset phần chứa error và báo rỗng
    emailBlank.classList.add('hidden'); //reset khi bấm nút
    usernameBlank.classList.add('hidden'); //reset email rỗng
    passwordBlank.classList.add('hidden'); //reset pass rỗng
    signupValidate.classList.add('hidden'); //reset phần error

    if(checkEmail === '') { // Báo mail rỗng
        emailBlank.classList.remove('hidden')
        signupValidate.classList.remove('hidden');
        msg.classList.add('show');
        noError = false;
        }
    if(checkUsername === '') { //Báo username rỗng
        usernameBlank.classList.remove('hidden');
        signupValidate.classList.remove('hidden');
        msg.classList.add('show');
        noError = false;
        }
    if(checkPassword === '') { //Báo pass rỗng
        passwordBlank.classList.remove('hidden');
        signupValidate.classList.remove('hidden');
        msg.classList.add('show');
        noError = false;
        }

    // Sign-up ERROR
    let signupError = document.getElementById('sign-up-error'); // to nhất phần báo lỗi
    let emailExistError = document.querySelector('.email-exist'); //email đã tồn tại
    let formatEmailError = document.querySelector('.email-error'); // Định dạng email lỗi
    let passwordLengthError = document.querySelector('.password-min-length-error'); // Pass không đủ 8 ký tự
    let passwordNumberRequiredError = document.querySelector('.password-number-required-error'); // Mật khẩu phải gồm chữ số
    let passwordUppercaseLowercaseError = document.querySelector('.password-uppercase-lowercase-error'); //Mật khẩu phải gồm cả chữ hoa, chữ thường

    signupError.classList.add('hidden'); //Reset div báo lỗi
    
    //Email đã tồn tại
    emailExistError.classList.add('hidden'); //Reset 
    let emailExist = userList.some(user => user.email === checkEmail);
    if(emailExist) {
        emailExistError.classList.remove('hidden');
        signupError.classList.remove('hidden');
        msg.classList.add('show');
        noError = false;
    }

    //Email không đúng định dạng
    formatEmailError.classList.add('hidden');  //Reset  
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    if(checkEmail !== '' && !emailRegex.test(checkEmail)) {
        formatEmailError.classList.remove('hidden');
        signupError.classList.remove('hidden');
        msg.classList.add('show');
        noError = false;
    }

    //Pass không đủ ký tự
    passwordLengthError.classList.add('hidden'); //Reset
    if(checkPassword !== '' && checkPassword.length < 8 && !emailExist) {
        passwordLengthError.classList.remove('hidden');
        signupError.classList.remove('hidden');
        msg.classList.add('show');
        noError = false;
    }

    //Pass không chứa ký tự số
    passwordNumberRequiredError.classList.add('hidden'); // Reset
    let passwordRegexNumber = /[0-9]/;
    if(checkPassword !== '' && checkPassword.length >= 8 && !passwordRegexNumber.test(checkPassword) && !emailExist) {
        passwordNumberRequiredError.classList.remove('hidden');
        signupError.classList.remove('hidden');
        msg.classList.add('show');
        noError = false;
    }
    //Pass không chứa chữ hoa hoặc chữ thường
    passwordUppercaseLowercaseError.classList.add('hidden');
    let passwordRegexUppercase = /[A-Z]/
    let passwordRegexLowercase = /[a-z]/
    if(checkPassword !== '' && checkPassword.length >= 8 && (!passwordRegexUppercase.test(checkPassword) || !passwordRegexLowercase.test(checkPassword)) && !emailExist) {
        passwordUppercaseLowercaseError.classList.remove('hidden');
        signupError.classList.remove('hidden');
        msg.classList.add('show');
        noError = false;
    }

    //sign-up toast
    let signupToast = document.getElementById('sign-up-toast'); //Báo đăng ký thành công
    signupToast.classList.add('hidden'); //Reset
    if(noError) { // Nếu không có lỗi input
        let newUser = { 
            usercode: Date.now(),
            username: checkUsername,
            email: checkEmail,
            password: checkPassword,
            role: 'admin',
            birthday: '1997-07-05',
            status: 'Deactive',
            description:
            'National again month truth. Actually civil table put nearly base.',
        }
        userList.push(newUser);
        localStorage.setItem('users', JSON.stringify(userList));

        signupToast.classList.remove('hidden'); // Thông báo đăng ký thành công
        msg.classList.add('show');
        setTimeout(function(){ //Chuyển hướng sang đăng nhập sau 2s
            window.location.href = 'sign-in.html'
        }, 2000);
    }
})

//Tắt thông báo lỗi
x.style.cursor = 'pointer' 
x.addEventListener('click', function() {
    signupValidate.classList.add('hidden');
    validationHeader.classList.add('hidden');
    msg.classList.remove('show')
});
