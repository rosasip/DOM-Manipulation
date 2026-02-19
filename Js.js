
document.addEventListener('DOMContentLoaded', function() {

    // Get references to key DOM elements 
    const filterButton = document.getElementById('filterButton');
    const addButton = document.getElementById('addButton');
    const filterForm = document.getElementById('filterContent');
    const addForm = document.getElementById('newContent');
    
    // Checkbox elements inside filter form
    const opinionCheck = document.getElementById('opinionCheckbox');
    const recipeCheck = document.getElementById('recipeCheckbox');
    const updateCheck = document.getElementById('updateCheckbox');
    
    // Get the container that holds all articles
    const articleList = document.getElementById('articleList');
    
    filterButton.addEventListener('click', function() {
        // Toggle display of filter form between block and none
        if (filterForm.style.display === 'none') {
            filterForm.style.display = 'block';
        } else {
            filterForm.style.display = 'none';
        }
    });
    
   function showAddNew() {
    const addForm = document.getElementById('newContent');
    if (addForm) {
        if (addForm.style.display === "none" || addForm.style.display === "") {
            addForm.style.display = "block";
        } else {
            addForm.style.display = "none";
        }
    }
}
    
    // Filtering function: show/hide based on checkbox state 
    function filterArticles() {
        // Get all article elements currently in the DOM (including newly added ones)
        const articles = document.querySelectorAll('#articleList > article');
        
        // Determine which types are checked
        const showOpinion = opinionCheck.checked;
        const showRecipe = recipeCheck.checked;
        const showUpdate = updateCheck.checked;
        
        articles.forEach(article => {
            // Determine article type by class list
            if (article.classList.contains('opinion')) {
                article.style.display = showOpinion ? '' : 'none'; 
            } else if (article.classList.contains('recipe')) {
                article.style.display = showRecipe ? '' : 'none';
            } else if (article.classList.contains('update')) {
                article.style.display = showUpdate ? '' : 'none';
            } else {
                article.style.display = ''; // show
            }
        });
    }
    window.filterArticles = filterArticles;
    
 // new article functionality 
    window.addNewArticle = function() {
        // Get form input values
        const titleInput = document.getElementById('inputHeader');
        const textArea = document.getElementById('inputArticle');
        const opinionRadio = document.getElementById('opinionRadio');
        const recipeRadio = document.getElementById('recipeRadio');
        const lifeRadio = document.getElementById('lifeRadio');
        
        const title = titleInput.value.trim();
        const text = textArea.value.trim();
        
        // Determine selected type
        let articleType = null;
        if (opinionRadio.checked) {
            articleType = 'opinion';
        } else if (recipeRadio.checked) {
            articleType = 'recipe';
        } else if (lifeRadio.checked) {
            articleType = 'update'; // "Life Update" maps to class "update"
        }
        
        // Basic validation: require title, text, and type
        if (!title || !text || !articleType) {
            alert('Please fill in title, text, and select a type.');
            return;
        }
        
        // Create new article element
        const newArticle = document.createElement('article');
        newArticle.className = articleType; // e.g., "opinion", "recipe", "update"
        const articleCount = document.querySelectorAll('#articleList > article').length + 1;
        newArticle.id = 'a' + Date.now(); // simple unique ID
        
        // Build inner HTML structure matching existing articles
        // Marker span
        const markerSpan = document.createElement('span');
        markerSpan.className = 'marker';
        // Capitalize first letter for display
        let displayType = articleType === 'update' ? 'Update' : (articleType.charAt(0).toUpperCase() + articleType.slice(1));
        markerSpan.textContent = displayType;
        
        // Title (h2)
        const titleH2 = document.createElement('h2');
        titleH2.textContent = title;
        
        // Paragraph for text
        const textP = document.createElement('p');
        textP.textContent = text;
        
        // Read more paragraph and link
        const readMoreP = document.createElement('p');
        const readMoreLink = document.createElement('a');
        readMoreLink.href = 'moreDetails.html';
        readMoreLink.textContent = 'Read more...';
        readMoreP.appendChild(readMoreLink);
        
        // Assemble article
        newArticle.appendChild(markerSpan);
        newArticle.appendChild(titleH2);
        newArticle.appendChild(textP);
        newArticle.appendChild(readMoreP);
        
        // Append to articleList
        articleList.appendChild(newArticle);
        
        // Clear form inputs
        titleInput.value = '';
        textArea.value = '';
        // Uncheck radio buttons
        opinionRadio.checked = false;
        recipeRadio.checked = false;
        lifeRadio.checked = false;
        
        // Apply current filter to the new article (so it respects checkbox state)
        filterArticles();
    };
    filterArticles(); 
});

window.showFilter = function() {
    const filterForm = document.getElementById('filterContent');
    if (filterForm.style.display === 'none') {
        filterForm.style.display = 'block';
    } else {
        filterForm.style.display = 'none';
    }
};

window.showAddNew = function() {
    const addForm = document.getElementById('newContent');
    if (addForm.style.display === 'flex') {
        addForm.style.display = 'none';
    } else {
        addForm.style.display = 'flex';
    }
};

window.addEventListener('load', function() {
    // Reset forms to CSS default: filter visible, add hidden.
    document.getElementById('filterContent').style.display = 'block';
    document.getElementById('newContent').style.display = 'none';
    
    // Re-run filter to ensure visibility
    window.filterArticles();
});








