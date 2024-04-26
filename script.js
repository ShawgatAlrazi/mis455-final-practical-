const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const showAllButton = document.getElementById('show-all-button');
let meals = [];

searchInput.addEventListener('input', function() {
    const searchText = searchInput.value;
    if (searchText.length > 0) { // Only search if the input is not empty
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(response => response.json())
            .then(data => {
                meals = data.meals;
                displayMeals(meals.slice(0, 5)); // Display first 5 meals
                if (meals.length > 5) {
                    showAllButton.style.display = 'block'; // Show the "SHOW ALL" button if there are more than 5 meals
                } else {
                    showAllButton.style.display = 'none';
                }
            });
    } else {
        resultsContainer.innerHTML = ''; // Clear the results if the input is empty
        showAllButton.style.display = 'none'; // Hide the "SHOW ALL" button
    }
});

showAllButton.addEventListener('click', function() {
    displayMeals(meals); // Display all meals when the "SHOW ALL" button is clicked
    showAllButton.style.display = 'none'; // Hide the "SHOW ALL" button
});

function displayMeals(meals) {
    resultsContainer.innerHTML = '';
    meals.forEach(meal => {
        const mealElement = document.createElement('div');
        mealElement.classList.add('card');
        mealElement.style.width = '18rem';
        mealElement.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
                <p><strong>Cooking Instructions:</strong> ${meal.strInstructions}</p>
            </div>
        `;
        resultsContainer.appendChild(mealElement);
    });
}
