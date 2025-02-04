// Retrieve the search page name from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const searchPageName = urlParams.get('searchPageName');
const language = urlParams.get('language');
var htmlContent = ``;
var searchPage = null;
// Reference to the Firebase Realtime Database
const database = firebase.database();

// Get login container and search page content div
const loginContainer = document.getElementById('loginContainer');
const searchPageContent = document.getElementById('searchPageContent');

// Get login inputs and login button
const usernameInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');








/* 
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        showSearchPage(user);
    } else {
        // User is not signed in
        showLoginPage();
    }
});
 */


showSearchPage()

var firstcheck = true;



// Function to show the search page content
function showSearchPage(user) {
    loginContainer.style.display = 'none';
    searchPageContent.style.display = 'block';
    database.ref('previewPages/' + searchPageName).once('value')
    .then(snapshot => {
        const searchPageData = snapshot.val();
        if (searchPageData) {
            searchPage = searchPageData;
            // Render the search page content
                searchPageContent.style.display = 'block';
                // Hide the login container
                loginContainer.style.display = 'none';
                renderSearchPage(searchPageData);
            
            
        } else {
            console.error('Search page not found in Firebase.');
            document.getElementById('searchPageContent').innerHTML = `<h1>Search Page Not Found</h1>`;
        }
    })
    .catch(error => {

        if(!firstcheck){
            console.error('Error retrieving search page content from Firebase:', error);
            alert(error);
        }
        firstcheck = false;

        firebase.auth().signOut().then(() => {
            // Sign-out successful
            showLoginPage();
        }).catch((error) => {
            // An error happened
            console.error('Error signing out:', error);
        });
    });
}

// Function to show the login page content
function showLoginPage() {
    loginContainer.style.display = 'block';
    searchPageContent.style.display = 'none';
}

// Add event listener to the login button
loginButton.addEventListener('click', function() {
    // Get username and password values
    const email = usernameInput.value;
    const password = passwordInput.value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log(user);
        // Show the search page content
        showSearchPage(user);
        // Render the search page content

    })
    .catch((error) => {
        // Handle errors here (e.g., display error message)
        alert(error.message);
    });
});





function renderSearchPage(searchPageData) {
    const accessToken = searchPageData.accesstoken;
    const organizationId = searchPageData.organizationid;
    const authentication = searchPageData.authentication;
    const html = searchPageData.html;
     htmlContent = html;

    if (accessToken && organizationId) {
        // Update HTML elements with access token and organization ID
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'module');
        scriptTag.setAttribute('src', `https://static.cloud.coveo.com/atomic/v3/atomic.esm.js`);
        document.head.appendChild(scriptTag);
        document.title = searchPageName;
        scriptTag.onload = async () => {
            await customElements.whenDefined('atomic-search-interface');
            const searchInterface = document.querySelector('atomic-search-interface');
            console.log(searchInterface)
            console.log(language)
            if(language){
                searchInterface.language = language;
            }
            // Initialization
            await searchInterface.initialize({
                accessToken: accessToken,
                organizationId: organizationId,
               /*  organizationEndpoints: await searchInterface.getOrganizationEndpoints(organizationId), */
            });
    
            // Trigger a first search
            searchInterface.executeFirstSearch();
        };
    } else {
        // If access token or organization ID is missing, redirect back to home page
    }



    // Render the search page HTML content
    document.getElementById('searchPageContent').innerHTML = htmlContent;
}
