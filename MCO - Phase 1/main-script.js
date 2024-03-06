function signup() {
    document.getElementById("signupForm").addEventListener("submit", function(event) {
        // Prevent form submission
        event.preventDefault();

        // Retrieve user input
        var email = document.getElementById("email").value;
        var lastName = document.getElementById("lname").value;
        var firstName = document.getElementById("fname").value;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Check if username already exists in localStorage
        if (localStorage.getItem(username) != null) {
            // If the username exists, alert the user
            alert("Username already taken!");
            
        } else {
            // Create user information object
            var userInfo = {
                email: email,
                lastName: lastName,
                firstName: firstName,
                username: username,
                password: password
            }

            // Store user information in localStorage
            localStorage.setItem(username, JSON.stringify(userInfo));

            // Reset the form
            document.getElementById("signupForm").reset();
            document.getElementById("username").value = "";

            alert("Account created successfully!");

            // Redirect to login page
            window.location.href = "login.html";
        }

        
    });
}

function login(){
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        var userInfoString = localStorage.getItem(username);

        if (userInfoString) {
            var userInfo = JSON.parse(userInfoString);
            
            if (userInfo.password === password) {
                alert("Login successful!");

                // this means that a user has logged in
                localStorage.setItem("loggedIn", true);

                // stores the logged-in user
                localStorage.setItem("loggedInUser", username);

                window.location.href = "index.html";
            } else {
                alert("Incorrect username or password.");
            }
        } else {
            alert("Username not found. Please sign up.");
        }
    });
}

function check_login(){
    var loggedIn = localStorage.getItem("loggedIn");
    var loginContainer = document.querySelector(".login");
    if (loggedIn === 'true') {
        loginContainer.innerHTML = '<img class="profile-pic" src="images/default-profile.jpg" alt="Profile Picture">'; // displays profile pic if user is logged in
    } else {
       loginContainer.innerHTML = '<button class="login-button" id="loginButton" onclick="window.location.href=\'login.html\'">Login</button>'; // displays the login button if user is logged out
    }
}

function check_login_account_toggle() {
    var loggedIn = localStorage.getItem("loggedIn");
    var loginContainer = document.querySelector(".login");
    var accountButton = document.getElementById("accountButton");
    var createPost = document.getElementById("create-post-button");
    if (loggedIn === 'true') {
        loginContainer.innerHTML = '<img class="profile-pic" src="images/default-profile.jpg" alt="Profile Picture">'; // displays profile pic if user is logged in
        
        // reset account href after user logs in
        accountButton.href = "profile.html"; // this is to redirect the user
        accountButton.style.color = ""; // this removes the gray color

        // resets create post after user logs in
        createPost.href = "create-post.html"; // this is to redirect the user
        createPost.style.backgroundColor = ""; // this removes the gray color
        
    } else {
        loginContainer.innerHTML = '<button class="login-button" id="loginButton" onclick="window.location.href=\'login.html\'">Login</button>'; // displays the login button if user is logged out
        // disables account href when user is logged out
        accountButton.href = "#";
        accountButton.style.color = "gray";
        
        // disables create post button
        createPost.href = "#";
        createPost.style.backgroundColor = "gray";
    }
}

function profile(){
        var loggedInUser = localStorage.getItem("loggedInUser");

        if (loggedInUser) {
            var userInfoString = localStorage.getItem(loggedInUser);

            if (userInfoString) {
                try {
                    var userInfo = JSON.parse(userInfoString);

                    document.getElementById("username").textContent = loggedInUser;
                    document.getElementById("password").textContent = userInfo.password;
                    document.getElementById("realname").textContent = userInfo.firstName + " " + userInfo.lastName;
                    document.getElementById("email").textContent = userInfo.email;
                } catch (error) {
                    console.error("Error parsing user information:", error);
                    console.log("User information string:", userInfoString);
                }
            } else {
                console.log("User information not found in localStorage.");
            }
        } else {
            console.log("Logged-in username not found in localStorage.");
        }

        // Select all the user detail elements
        const userDetailElements = document.querySelectorAll('.user-detail');

        // Iterate over each user detail element
        userDetailElements.forEach((userDetail) => {
            // Get the edit button and user info element within this user detail element
            const button = userDetail.querySelector('.edit-button');
            const userInfoElement = userDetail.querySelector('.user-info');

            // Add event listener to the button
            button.addEventListener('click', () => {
                // Get the current value
                const currentValue = userInfoElement.innerText;

                // Ask for a new value
                const newValue = prompt('Enter a new value:', currentValue);

                // If a new value is provided, update the element
                if (newValue) {
                    userInfoElement.innerText = newValue;

                    // Update the corresponding property in userInfo
                    switch (userInfoElement.id) {
                        case 'username':
                            // Remove the old key-value pair
                            localStorage.removeItem(loggedInUser);
                            localStorage.setItem("loggedInUser", newValue);
                            
                            loggedInUser = newValue;
                            userInfo.username = newValue;

                            break;
                        case 'password':
                            userInfo.password = newValue;
                            break;
                        case 'realname':
                            // Assuming the real name is always in the format "firstName lastName"
                            const [firstName, lastName] = newValue.split(' ');
                            userInfo.firstName = firstName;
                            userInfo.lastName = lastName;
                            break;
                        case 'email':
                            userInfo.email = newValue;
                            break;
                    }

                    // Update the user information in localStorage
                    localStorage.setItem(loggedInUser, JSON.stringify(userInfo));
                }
            });
        });
}

function logout() {
    localStorage.removeItem("loggedInUser");

    localStorage.setItem("loggedIn", false);
    window.location.href = "login.html";
}

function editProfilePic() {
    // Trigger the file input click event
    document.getElementById('fileInput').click();

    // Listen for the file input change event
    document.getElementById('fileInput').addEventListener('change', function(e) {
        // Get the selected file
        var file = e.target.files[0];
        if (file) {
            // Create a new FileReader object
            var reader = new FileReader();

            // Listen for the load event
            reader.addEventListener('load', function() {
                // Set the profile picture source to the selected file data URL
                document.querySelector('.profile-pic').src = reader.result;
                document.querySelector('.edit-pic').src = reader.result;
            });

            // Read the selected file as a data URL
            reader.readAsDataURL(file);
        }
    })
}

// COMMENT

function showCommentBox() {
    var commentBox = document.getElementById('commentBox');
    var addCommentBtn = document.querySelector('.add-comment-btn');

    commentBox.style.display = 'block';
    addCommentBtn.style.display = 'none';
}


function addComment() {
    var newCommentText = document.getElementById('newComment').value;

    if (newCommentText.trim() === '') {
        alert('Please enter a comment.');
        return;
    }

    var username = "User";


    var newCommentElement = document.createElement('div');
    newCommentElement.className = 'comment';

    newCommentElement.innerHTML = `
    <div class="comment-header">
        <div class="user-info">
            <img class="edit-pic" src="images/default-profile.jpg" alt="Edit Profile">
            <span id="username" class="user-info">${username}</span>
        </div>
    <span class="comment-time">Just now</span>
    </div>
    <p>${newCommentText}</p>
    `;


    var lastCommentSections = document.querySelectorAll('.comments-section');
    var lastCommentSection = lastCommentSections[lastCommentSections.length - 1];

    var lastComment = lastCommentSection.querySelector('.comment:last-child');

    if (lastComment) {
        lastComment.insertAdjacentElement('afterend', newCommentElement);
    } else {
        lastCommentSection.appendChild(newCommentElement);
    }

    document.getElementById('commentBox').style.display = 'none';

    var addCommentBtn = document.querySelector('.add-comment-btn');
    addCommentBtn.style.display = 'block';

    document.getElementById('newComment').value = '';
}
