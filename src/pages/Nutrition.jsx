export default function Nutrition({
  caloriesEaten,
  foodGoal,
  setFoodGoal,
  todayFoods,
  caloriesBurned,
  nutritionCategories,
  foodSearch,
  setFoodSearch,
  foodCategory,
  setFoodCategory,
  filteredFoods,
  addCatalogFood,
  deleteFood,
  addFood
}) {
  return (
    <>
      <section className="nutrition-hero">
        <div className="nutrition-hero-text">
          <span className="nutrition-eyebrow">
            EAT WELL · FEEL STRONG
          </span>

          <h2>
            Fuel your body.<br />
            <span>Reach your goals.</span>
          </h2>

          <p>
            Discover foods, check their calories and keep track of your
            daily nutrition.
          </p>

          <button
            className="nutrition-hero-btn"
            onClick={() =>
              document.getElementById("food-library")?.scrollIntoView({
                behavior: "smooth"
              })
            }
          >
            Explore foods ↓
          </button>
        </div>

        <div className="nutrition-hero-image" />
      </section>

      <section className="nutrition-summary">
        <article className="nutrition-total-card">
          <div className="nutrition-summary-top">
            <div>
              <small>YOUR DAILY INTAKE</small>
              <h3>Calories consumed</h3>
            </div>
            <span>🔥</span>
          </div>

          <div className="nutrition-big-number">
            {caloriesEaten.toLocaleString()} <small>kcal</small>
          </div>

          <div className="nutrition-progress-track">
            <div
              className="nutrition-progress-fill"
              style={{
                width: `${Math.min(
                  100,
                  caloriesEaten / Math.max(1, foodGoal) * 100
                )}%`
              }}
            />
          </div>

          <div className="nutrition-progress-label">
            <span>
              {Math.max(
                0,
                foodGoal - caloriesEaten
              ).toLocaleString()} kcal remaining
            </span>
            <span>Goal: {foodGoal.toLocaleString()} kcal</span>
          </div>

          <label className="goal-input-label">
            Daily calorie goal
            <input
              type="number"
              min="1"
              value={foodGoal}
              onChange={e =>
                setFoodGoal(Math.max(1, Number(e.target.value)))
              }
            />
          </label>
        </article>

        <article className="nutrition-mini-stat">
          <span className="nutrition-stat-icon">🍽️</span>
          <small>FOOD ITEMS TODAY</small>
          <h2>{todayFoods.length}</h2>
          <p>Items added to your food log</p>
        </article>

        <article className="nutrition-mini-stat">
          <span className="nutrition-stat-icon">⚡</span>
          <small>CALORIES BURNED</small>
          <h2>{caloriesBurned.toLocaleString()}</h2>
          <p>Total workout calories</p>
        </article>
      </section>

      <section className="nutrition-section" id="food-library">
        <div className="nutrition-section-heading">
          <div>
            <span className="nutrition-eyebrow">FOOD EXPLORER</span>
            <h2>Discover healthy foods</h2>
            <p>
              Choose a food to see its estimated calories per serving.
            </p>
          </div>
        </div>

        <div className="nutrition-tools">
          <input
            value={foodSearch}
            onChange={e => setFoodSearch(e.target.value)}
            placeholder="Search foods..."
          />

          <div className="nutrition-category-list">
            {nutritionCategories.map(c => (
              <button
                key={c}
                className={
                  foodCategory === c
                    ? "nutrition-category active"
                    : "nutrition-category"
                }
                onClick={() => setFoodCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="food-card-grid">
          {filteredFoods.map(food => (
            <article className="food-card" key={food.id}>
              <div className="food-card-image">
                <img
                  src={food.image}
                  alt={food.name}
                  loading="lazy"
                />
                <span>{food.category}</span>
              </div>

              <div className="food-card-content">
                <h3>{food.name}</h3>
                <p className="food-serving">{food.serving}</p>

                <div className="food-card-bottom">
                  <div className="food-calorie-value">
                    {food.calories}<small> kcal</small>
                  </div>

                  <button onClick={() => addCatalogFood(food)}>
                    + Add to meal
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="pro-panel">
            <h3>No foods found</h3>
            <p>Try a different food name or category.</p>
          </div>
        )}
      </section>

      <section className="nutrition-bottom-grid">
        <article className="pro-panel nutrition-log-panel">
          <div className="panel-heading">
            <div>
              <span className="nutrition-eyebrow">YOUR MEALS</span>
              <h3>Today's food log</h3>
              <p>Foods you have added today.</p>
            </div>

            <span className="nutrition-log-count">
              {todayFoods.length} items
            </span>
          </div>

          {todayFoods.length === 0 ? (
            <div className="nutrition-empty">
              <span>🥗</span>
              <h3>Your food log is empty</h3>
              <p>
                Add foods from the food explorer to start tracking your
                daily calories.
              </p>
            </div>
          ) : (
            todayFoods.map(food => (
              <div className="nutrition-log-item" key={food.id}>
                {food.image ? (
                  <img src={food.image} alt={food.food} />
                ) : (
                  <div className="custom-food-icon">🍴</div>
                )}

                <div className="nutrition-log-name">
                  <b>{food.food}</b>
                  <small>{food.serving || "Custom serving"}</small>
                </div>

                <strong>{food.calories} kcal</strong>

                <button
                  className="delete-btn"
                  onClick={() => deleteFood(food.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </article>

        <article className="pro-panel custom-food-panel">
          <span className="nutrition-eyebrow">CUSTOM ENTRY</span>
          <h3>Add your own food</h3>
          <p>
            Can't find a food in the library? Enter its name and calorie
            value here.
          </p>

          <form
            onSubmit={addFood}
            className="pro-form custom-food-form"
          >
            <label>
              Food name
              <input
                name="food"
                placeholder="e.g. Homemade dosa"
                required
              />
            </label>

            <label>
              Calories (kcal)
              <input
                name="calories"
                type="number"
                min="1"
                placeholder="e.g. 150"
                required
              />
            </label>

            <button className="primary-btn">
              Add Custom Food
            </button>
          </form>

          <div className="nutrition-tip">
            <span>💡</span>
            <p>
              Tip: Check the serving size when entering calories for
              better tracking accuracy.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}