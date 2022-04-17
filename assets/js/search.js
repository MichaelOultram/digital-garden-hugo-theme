import lunr from "/js/lunr.js";

// Search elements
const searchQuery = document.getElementById("search-query");
const searchResults = document.getElementById("search-results");
searchQuery.focus();

// Initialize lunr. Load dictionary
async function prepareSearch() {
    const dictionary = await fetch("/index.json").then(response => response.json());
    const idx = lunr(function () {
        this.ref('id')
        this.field('title', {
            boost: 15
        })
        this.field('categories')
        this.field('technology')
        this.field('content', {
            boost: 10
        })


        for (const key in dictionary) {
            let item = {
                id: key,
                ...dictionary[key]
            };
            item.categories = item.categories.join(" ");
            item.technology = item.technology.join(" ");
            this.add(item);
        }
    });
    window.idx = idx;

    // Setup auto searching
    function updateSearch() {
        let results = (searchQuery.value) ? idx.search(searchQuery.value + "~2") : [];
        let resultList = '';
        for (const n in results) {
            const item = dictionary[results[n].ref];
            resultList += '<li><p><a href="' + item.url + '">' + item.title + '</a></p>';
            resultList += '<p>' + item.content.substring(0, 150) + '...</p></li>';
        }

        searchResults.innerHTML = (resultList) ? resultList : "<p>No results found</p>";
    }
    searchQuery.addEventListener('input', updateSearch);
    updateSearch();
}
prepareSearch();

