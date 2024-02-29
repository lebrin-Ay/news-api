const apiBaseUrl = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1";
const newsContainer = document.querySelector(".news_container");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const singleNews = document.getElementById("singleNews");

let currentPage = 1;
const limit = 10;

// function to fetch all news
function getNews(page, limit) {
  const urlNews = `${apiBaseUrl}/news?page=${page}&limit=${limit}`;
  fetch(urlNews)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network Error");
    }
    return response.json();
  })
  .then(news => {
    displayNews(news);
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

// function to display the news 
function displayNews(news) {
  newsContainer.innerHTML = "";
  news.forEach(newsItem => {
    const newsElement = document.createElement("div");
    newsElement.classList.add("news_item");

    const imgElement = document.createElement("img");
    imgElement.src = newsItem.avatar;

    const titleElement = document.createElement("h3");
    titleElement.textContent = newsItem.title;

    const authorElement = document.createElement("p");
    authorElement.textContent = newsItem.author;

    const urlElement = document.createElement("p");
    // urlElement.classList.add("long_content");
    urlElement.textContent = newsItem.url;

    const newsUrl = document.createElement('a');
    newsUrl.href = urlElement.href = `news.html?id=${newsItem.id}`  // Open news item in a new page
    newsUrl.textContent = "Read more";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete_btn");
    deleteBtn.addEventListener("click", () => {
      deleteNewsItem(newsItem.id);
    });


    newsElement.appendChild(imgElement);
    newsElement.appendChild(titleElement);
    newsElement.appendChild(authorElement);
    newsElement.appendChild(urlElement);
    newsElement.appendChild(newsUrl);
    newsElement.appendChild(deleteBtn);

    newsContainer.appendChild(newsElement);
  });
}

// function to delete news item 
function deleteNewsItem(newsId) {
  const deleteNews = `${apiBaseUrl}/news/${newsId}`;

  fetch(deleteNews, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Unable to delete item");
    }
    getNews(currentPage, limit)
  })
  .catch(error => {
    console.error(error);
  })
}

// Pagination
backBtn.addEventListener("click", () => {
  if (currentPage > 1 ) {
    currentPage--;
    getNews(currentPage, limit)
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  getNews(currentPage, limit)
});

getNews(currentPage, limit);



