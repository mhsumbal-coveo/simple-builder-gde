setTimeout(() => {
    const genaistate = localStorage.getItem("genai-toggle") ? localStorage.getItem("genai-toggle") : "true";
    const smartsnippetstate = localStorage.getItem("smartsnippet-toggle") ? localStorage.getItem("smartsnippet-toggle") : "true";

    // Check if atomic-generated-answer exists
    const answerElement = document.querySelector('atomic-generated-answer');
    if (answerElement) {
        // Style and toggle functionality for toggleButton1
        console.log(genaistate)
        genaistate === "true" ? answerElement.style.display = 'block' : answerElement.style.display = 'none';
        const toggleButton1 = document.createElement('button');
        toggleButton1.textContent = genaistate === "true" ? 'Disable GenAI' : 'Enable GenAI';
        toggleButton1.style.position = 'fixed';
        toggleButton1.style.top = '20px';
        toggleButton1.style.right = '20px';
        toggleButton1.style.backgroundColor = '#007bff';
        toggleButton1.style.color = 'white';
        toggleButton1.style.border = 'none';
        toggleButton1.style.padding = '10px 20px';
        toggleButton1.style.cursor = 'pointer';
        toggleButton1.style.borderRadius = '5px';
        document.body.appendChild(toggleButton1);

        toggleButton1.addEventListener('click', function () {
            if (answerElement.style.display === 'none') {
                localStorage.setItem("genai-toggle", "true");
                answerElement.style.display = 'block';
                toggleButton1.textContent = 'Disable GenAI';
            } else {
                localStorage.setItem("genai-toggle", "false");
                answerElement.style.display = 'none';
                toggleButton1.textContent = 'Enable GenAI';
            }
        });
    }

    // Check if atomic-smart-snippet and atomic-smart-snippet-suggestions exist
    const smartsnippet = document.querySelector('atomic-smart-snippet');
    const smartsnippetsuggestions = document.querySelector('atomic-smart-snippet-suggestions');
    if (smartsnippet && smartsnippetsuggestions) {
        // Style and toggle functionality for toggleButton2
        smartsnippetstate === "true" ? smartsnippet.style.display = 'block' : smartsnippet.style.display = 'none';
        smartsnippetstate === "true" ? smartsnippetsuggestions.style.display = 'block' : smartsnippetsuggestions.style.display = 'none';
        const toggleButton2 = document.createElement('button');
        toggleButton2.textContent = smartsnippetstate === "true"  ? 'Disable Smart Snippets' : 'Enable Smart Snippets';
        toggleButton2.style.position = 'fixed';
        toggleButton2.style.top = '20px';
        toggleButton2.style.right = answerElement? '160px' : '20px';
        toggleButton2.style.backgroundColor = '#007bff';
        toggleButton2.style.color = 'white';
        toggleButton2.style.border = 'none';
        toggleButton2.style.padding = '10px 20px';
        toggleButton2.style.cursor = 'pointer';
        toggleButton2.style.borderRadius = '5px';
        document.body.appendChild(toggleButton2);

        toggleButton2.addEventListener('click', function () {
            if (smartsnippet.style.display === 'none') {
                localStorage.setItem("smartsnippet-toggle", "true");
                smartsnippet.style.display = 'block';
                smartsnippetsuggestions.style.display = 'block';
                toggleButton2.textContent = 'Disable Smart Snippets';
            } else {
                localStorage.setItem("smartsnippet-toggle", "false");
                smartsnippet.style.display = 'none';
                smartsnippetsuggestions.style.display = 'none';
                toggleButton2.textContent = 'Enable Smart Snippets';
            }
        });
    }
}, 1000);