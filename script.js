const apikey = '28f6a37d3de040eebf4442cefe5d9595';
const blogcontainer = document.getElementById("blog-container");
const search = document.getElementById("serach-input")
const searchbutton = document.getElementById("serach-button")

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=apple&pageSize=100&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}





searchbutton.addEventListener('click', async () => {
    const query = search.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        }
        catch (error) {
            console.log("error fetchung news by query", error)

        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }

}

function displayBlogs(articles) {
    blogcontainer.innerHTML = ""; // Clear existing content
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage; // Corrected property name
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
        title.textContent = truncatedTitle;
        const desc = document.createElement("p");
        desc.textContent = article.description; // Corrected property name

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(desc);
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank")
        })

        blogcontainer.appendChild(blogCard);
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
});
