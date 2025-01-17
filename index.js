// Listen for form submission
document.getElementById('searchPageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const accessToken = document.getElementById('accessToken').value;
    const organizationId = document.getElementById('organizationId').value;
    const searchPageName = document.getElementById('searchPageName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Save search page data to Firebase Realtime Database
    saveSearchPageData(searchPageName, accessToken, organizationId, username, password);
});

// Function to save search page data to Firebase Realtime Database
function saveSearchPageData(searchPageName, accessToken, organizationId, username, password) {
    // Save search page data to Firebase Realtime Database


        // If authentication is enabled, create user in Firebase Authentication
        if (true) {
            firebase.auth().createUserWithEmailAndPassword(username, password)
                .then((userCredential) => {
                    console.log('User created successfully:', userCredential.user);
                    // Redirect to search page
                    
                    const searchPageRef = firebase.database().ref('searchPages/' + searchPageName);
                    searchPageRef.set({
                        accesstoken: accessToken,
                        organizationid: organizationId,
                        html: samplepage,
                        username: username,
                        authenticationenabled: false
                    })
                    .then(() => {
                        console.log('Search page data saved successfully.');
                    window.location.href = 'searchpage.html?searchPageName=' + searchPageName;
                }) .catch(error => {
                    console.error('Error saving search page data:', error);
                });
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    alert(error.message);
                });
        } else {
            // Redirect to search page
            window.location.href = 'searchpage.html?searchPageName=' + searchPageName;
        }
   
   
}