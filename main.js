const grid = document.getElementById("grid");
const LoadBtn = document.getElementById("LoadBtn");
const apiUrl = "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=3";

async function fetchdog() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    renderGrid(data);
  } catch (err) {
    console.log("Error when fetching", err);
  }
}


function renderGrid(items) {
  grid.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.className = 'thumb';
    img.src = item.url;
    img.alt = item.id;

  


    card.appendChild(img);
    grid.appendChild(card);
  });
}
LoadBtn.addEventListener("click", fetchdog);
