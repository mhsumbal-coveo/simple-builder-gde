// Retrieve the search page name from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const searchPageName = urlParams.get('searchPageName');
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


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        showSearchPage(user);
    } else {
        // User is not signed in
        showLoginPage();
    }
});

// Function to show the search page content
function showSearchPage(user) {
    loginContainer.style.display = 'none';
    searchPageContent.style.display = 'block';
    database.ref('searchPages/' + searchPageName).once('value')
    .then(snapshot => {
        const searchPageData = snapshot.val();
        if (searchPageData) {
            searchPage = searchPageData;
            // Render the search page content
            if(user.email == searchPageData.username){
                searchPageContent.style.display = 'block';
                // Hide the login container
                loginContainer.style.display = 'none';
                renderSearchPage(searchPageData);
            }else{
                alert('You are not authorized to view this page');
                firebase.auth().signOut().then(() => {
                    // Sign-out successful
                    showLoginPage();
                }).catch((error) => {
                    // An error happened
                    console.error('Error signing out:', error);
                });
            }
            
        } else {
            console.error('Search page not found in Firebase.');
            document.getElementById('searchPageContent').innerHTML = `<h1>Search Page Not Found</h1>`;
        }
    })
    .catch(error => {
        console.error('Error retrieving search page content from Firebase:', error);
        alert(error.message);
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

// Get the modal
const modal = document.getElementById('editorModal');

// Get the button that opens the modal
const btn = document.getElementById('editButton');

const publishBtn = document.getElementById('PublishButton');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = 'block';
    openMonacoEditor();
}


publishBtn.onclick = function() {
    const searchPageRef = firebase.database().ref('previewPages/' + searchPageName);
    searchPageRef.set({
        html: htmlContent,
        accesstoken: searchPage.accesstoken,
        organizationid: searchPage.organizationid,
    })
    .then(() => {
        console.log('Search page data saved successfully.');
    window.location.href = 'preview.html?searchPageName=' + searchPageName;
}) .catch(error => {
    console.error('Error saving search page data:', error);
});

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    document.querySelector('.monaco-editor').remove();
    modal.style.display = 'none';
}



// Function to open Monaco code editor
function openMonacoEditor() {
    const editorContainer = document.getElementById('editorContainer');

    // Initialize Monaco Editor
    require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs' } });
    require(['vs/editor/editor.main'], function () {
        // Create the editor
        const editor = monaco.editor.create(editorContainer, {
            value: htmlContent, // Set initial content
            language: 'html',   // Set language
            automaticLayout: true // Automatically adjust editor layout
        });

        // Save button click event handler
        document.getElementById('saveButton').addEventListener('click', function() {
            const editedHtmlContent = editor.getValue();
            document.querySelector('.monaco-editor').remove();
            // Push edited HTML content to Firebase
            pushToDatabase(editedHtmlContent);
            // Close the modal after saving
            modal.style.display = 'none';
            window.location.reload();
        });
    });
}

// Function to push edited HTML content to Firebase Realtime Database
function pushToDatabase(htmlContent) {
    // Push the edited HTML content to Firebase Realtime Database
    database.ref('searchPages/' + searchPageName).update({
        html: htmlContent
    }).then(() => {
        console.log('HTML content updated in Firebase.');
    }).catch(error => {
        console.error('Error updating HTML content in Firebase:', error);
    });
}

// Retrieve search page content from Firebase Realtime Database


// Function to render the search page content
function renderSearchPage(searchPageData) {
    console.log(searchPageData)
    const accessToken = searchPageData.accesstoken;
    const organizationId = searchPageData.organizationid;
    const authentication = searchPageData.authentication;
    const html = searchPageData.html;
     htmlContent = html;
    if (accessToken && organizationId) {
        // Update HTML elements with access token and organization ID
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'module');
        scriptTag.setAttribute('src', `https://static.cloud.coveo.com/atomic/v2/atomic.esm.js`);
        document.head.appendChild(scriptTag);
    
        scriptTag.onload = async () => {
            await customElements.whenDefined('atomic-search-interface');
            const searchInterface = document.querySelector('atomic-search-interface');
    
            // Initialization
            await searchInterface.initialize({
                accessToken: accessToken,
                organizationId: organizationId,
                organizationEndpoints: await searchInterface.getOrganizationEndpoints(organizationId),
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
