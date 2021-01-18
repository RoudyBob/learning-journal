// user signup
function userSignUp() {
    // console.log('userSignUp Function Called');
    let userEmail = document.getElementById('emailSignup').value;
    let userPass = document.getElementById('pwdSignup').value;
    let newUserData = { user: { email: userEmail, password: userPass } };
    console.log(`NEWUSERDATA ==> ${newUserData.user.email}  ${newUserData.user.password}`);

    fetch('http://localhost:3000/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData)
    })
    .then(response => response.json())
    .then(function (response) {
        console.log(response.sessionToken);
        let token = response.sessionToken;
        localStorage.setItem('SessionToken', token);
        tokenChecker()
    })
    .catch((err) => { console.log(err) })
};

// user login
function userLogin() {
    // console.log('userLogin Function Called');
    let userEmail = document.getElementById('emailLogin').value;
    let userPass = document.getElementById('pwdLogin').value;
    console.log(userEmail, userPass);

    let userData = { user: { email: userEmail, password: userPass } };
    console.log(`USERLOGINDATA ==> ${userData.user.email}  ${userData.user.password}`);

    fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(function (response) {
        if (response.sessionToken) {
            console.log(response.sessionToken);
            let token = response.sessionToken;
            localStorage.setItem('SessionToken', token);
        } 
        tokenChecker()
    })
    .catch((err) => { console.log(err) })
}

// user logout
function userLogout() {
    localStorage.setItem('SessionToken', undefined);
    console.log(`sessionToken ==> ${localStorage.sessionToken}`);
    tokenChecker();
}

// token checker function
function tokenChecker() {
    // console.log('tokenChecker Function Called');
    let display = document.getElementById('journals');
    let header = document.createElement('h5');
    let accessToken = localStorage.getItem('SessionToken');
    let text = 'Login or signup to get started!';

    for (i = 0; i = display.childNodes.length; i++) {
        display.removeChild(display.firstChild);
    };

    if (accessToken === 'undefined') {
        display.appendChild(header);
        header.textContent = text;
        header.setAttribute('id', 'defaultlogin');
    } else {
        null
    };
}

tokenChecker();