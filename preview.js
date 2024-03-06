const urlParams = new URLSearchParams(window.location.search);
const searchPageName = urlParams.get('searchPageName');
const database = firebase.database();



console.log(searchPageName)

database.ref('previewPages/' + searchPageName).once('value')
.then(snapshot => {
    const searchPageData = snapshot.val();

    if (searchPageData) {
        // Render the search page content
        console.log(searchPageData)
        renderSearchPage(searchPageData)
        
    } else {
        console.error('Search page not found in Firebase.');
        document.getElementById('searchPageContent').innerHTML = `<h1>Search Page Not Found</h1>`;
    }
})
.catch(error => {
    console.error('Error retrieving search page content from Firebase:', error);
    alert(error.message);
});


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