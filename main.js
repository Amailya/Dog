const grid = document.getElementById("grid");
const LoadBtn = document.getElementById("LoadBtn");
const Loading = document.getElementById("Loading");
const breedSelect = document.getElementById("breedSelect");
const apiBreeds = 'https://api.thedogapi.com/v1/breeds';
const apiUrl = 'https://api.thedogapi.com/v1/images/search?size=med&limit=10';

async function fetchDogs(breedId = '') {
  try {
    Loading.style.display = 'block';
    const res = await fetch(apiUrl);
    const data = await res.json();
    renderGrid(data);
  } catch (err) {
    console.log("Error when fetching", err);
  }
}

async function fetchBreeds() {
  try {
    const res = await fetch(apiBreeds);
    const data = await res.json();
    renderBreeds(data);
  } catch (err) {
    console.log("Error when fetching", err);
  }
}

function renderGrid(items) {
  grid.innerHTML = "";
  Loading.style.display = 'none';
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

function renderBreeds(items){
  breedSelect.innerHTML = '<option value="">dog breed</option>';
  items.forEach((breed) => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

LoadBtn.addEventListener('click', () => fetchDogs());

breedSelect.addEventListener('change', () => {
  fetchDogs(breedSelect.value);
});

fetchBreeds();
fetchDogs();