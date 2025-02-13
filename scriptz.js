const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const quantityElement = document.getElementById('quantity');
const orderButton = document.querySelector('.order-btn');

let quantity = 1;

decreaseButton.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
});

increaseButton.addEventListener('click', () => {
    quantity++;
    quantityElement.textContent = quantity;
});

// orderButton.addEventListener('click', () => {
//     alert(`Сіз ${quantity} дана CheeseBurger тапсырыс бердіңіз.`);
// });

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
                <img class='imglar' src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="card-content">
                    <h3>${meal.strMeal}</h3>
                    <h3 class="">${meal.money}<br></h3>
                    <button class="but" onclick="orderMeal('${meal.strMeal}')">Тапсырыс беру</button>
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

function orderMeal(mealName) {
    alert(`Сіз ${mealName} тапсырыс бердіңіз.`);
}

document.getElementById("search").addEventListener("input", filterMeals);

fetchMeals();
