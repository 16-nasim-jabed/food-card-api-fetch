const countryInput = document.getElementById('countryInput');
        const searchBtn = document.getElementById('searchBtn');
        const cardsContainer = document.getElementById('cardsContainer');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const errorMessage = document.getElementById('errorMessage');
        const resultsCounter = document.getElementById('resultsCounter');
        const countText = document.getElementById('countText');

        // Search function
        async function searchMeals() {
            const country = countryInput.value.trim();
            
            if (!country) {
                alert('Please enter a country name!');
                return;
            }

            // Show loading, hide others
            loadingSpinner.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            resultsCounter.classList.add('hidden');
            cardsContainer.innerHTML = '';

            try {
                // Fetch from API
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
                const data = await response.json();

                // Hide loading
                loadingSpinner.classList.add('hidden');

                // Check if no results
                if (!data.meals) {
                    errorMessage.classList.remove('hidden');
                    return;
                }

                // Show results count
                countText.textContent = `Found ${data.meals.length} meals!`;
                resultsCounter.classList.remove('hidden');

                // Create cards
                data.meals.forEach(meal => {
                    const card = document.createElement('div');
                    card.className = 'bg-white rounded-lg shadow-md overflow-hidden';
                    
                    card.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover">
                        <div class="p-4">
                            <h3 class="font-semibold text-gray-800 text-center">${meal.strMeal}</h3>
                        </div>
                    `;
                    
                    cardsContainer.appendChild(card);
                });

            } catch (error) {
                loadingSpinner.classList.add('hidden');
                errorMessage.classList.remove('hidden');
            }
        }

        // Event listeners
        searchBtn.addEventListener('click', searchMeals);
        countryInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchMeals();
            }
        });