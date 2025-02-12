let allMeals = [];

async function fetchMeals() {
  try {
    const response = await fetch("meals.json");
    const data = await response.json();
    allMeals = data.meals;
    displayMeals(allMeals);
  } catch (error) {
    console.error("Тағамдарды алу кезінде қате орын алды:", error);
  }
}

function displayMeals(meals) {
  const container = document.getElementById("meals-container");
  container.innerHTML = "";

  meals.forEach((meal) => {
    const mealCard = `
            <div class="card" data-name="${meal.strMeal.toLowerCase()}">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"> 
                <div class="card-content">
                    <h3>${meal.strMeal}</h3> 
                        <div class="icon">
                            Калория мөлшері: <br>
                            ${meal.strCalories}<br>
                            <p class='zoz'>инструкция:<br>${
                              meal.strInstructions
                            }</p>
                            ${meal.strTags} 
                        </div>
                    </div>
                </div>
            </div>
        `;
    container.innerHTML += mealCard;
  });
}

function filterMeals() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const filteredMeals = allMeals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchInput)
  );
  displayMeals(filteredMeals);
}

fetchMeals();
