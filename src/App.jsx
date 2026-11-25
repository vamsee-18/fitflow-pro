
import { useEffect, useState } from "react";

import Dashboard from "./pages/Dashboard.jsx";
import WorkoutLibrary from "./pages/WorkoutLibrary.jsx";
import Schedule from "./pages/Schedule.jsx";
import Nutrition from "./pages/Nutrition.jsx";
import Progress from "./pages/Progress.jsx";
import SmartCoach from "./components/SmartCoach.jsx";

import "./App.css";

const ADMIN = {
  name: "Admin",
  email: "admin@fitflow.demo",
  password: "admin123",
  role: "admin",
};

const defaultWorkouts = [
  { id: 101, name: "Chest Builder", category: "Chest", level: "Beginner", minutes: 30, calories: 220, exercises: "Push-ups, Bench Press, Dumbbell Fly", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900" },
  { id: 102, name: "Back Strength", category: "Back", level: "Intermediate", minutes: 40, calories: 280, exercises: "Lat Pulldown, Seated Row, Deadlift", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900" },
  { id: 103, name: "Leg Power", category: "Legs", level: "Intermediate", minutes: 45, calories: 350, exercises: "Squats, Lunges, Leg Press", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900" },
  { id: 104, name: "Arm Sculpt", category: "Arms", level: "Beginner", minutes: 25, calories: 160, exercises: "Bicep Curls, Tricep Pushdown, Hammer Curls", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900" },
  { id: 105, name: "Core Crusher", category: "Abs", level: "Beginner", minutes: 20, calories: 150, exercises: "Plank, Crunches, Leg Raises", image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=900" },
  { id: 106, name: "Full Body Strength", category: "Full Body", level: "Advanced", minutes: 50, calories: 400, exercises: "Squats, Push-ups, Rows, Lunges", image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=900" },
  { id: 107, name: "Fat Burn Cardio", category: "Cardio", level: "Beginner", minutes: 25, calories: 250, exercises: "Jumping Jacks, High Knees, Burpees", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=900" },
  { id: 108, name: "Morning Yoga", category: "Yoga", level: "Beginner", minutes: 20, calories: 100, exercises: "Sun Salutation, Cobra, Child's Pose", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900" },
  { id: 109, name: "Shoulder Builder", category: "Shoulders", level: "Intermediate", minutes: 35, calories: 230, exercises: "Shoulder Press, Lateral Raises, Front Raises", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900" },
  { id: 110, name: "HIIT Challenge", category: "Cardio", level: "Advanced", minutes: 30, calories: 320, exercises: "Sprint, Burpees, Mountain Climbers", image: "https://images.unsplash.com/photo-1517838277536-fb6e6e1c4f12?w=900" },
  { id: 111, name: "Lower Body Burn", category: "Legs", level: "Beginner", minutes: 30, calories: 240, exercises: "Bodyweight Squats, Step-ups, Glute Bridge", image: "https://images.unsplash.com/photo-1434596922112-19c563067271?w=900" },
  { id: 112, name: "Stretch & Recover", category: "Yoga", level: "Beginner", minutes: 15, calories: 70, exercises: "Hamstring Stretch, Shoulder Stretch, Cat-Cow", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900" },
];

const foodCatalog = [
  { id: 1, name: "Banana", category: "Fruits", serving: "1 medium", calories: 105, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=700" },
  { id: 2, name: "Apple", category: "Fruits", serving: "1 medium", calories: 95, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=700" },
  { id: 3, name: "Orange", category: "Fruits", serving: "1 medium", calories: 62, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=700" },
  { id: 4, name: "Watermelon", category: "Fruits", serving: "1 cup", calories: 46, image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=700" },
  { id: 5, name: "Broccoli", category: "Vegetables", serving: "100 g", calories: 34, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=700" },
  { id: 6, name: "Carrot", category: "Vegetables", serving: "100 g", calories: 41, image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=700" },
  { id: 7, name: "Tomato", category: "Vegetables", serving: "1 medium", calories: 22, image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=700" },
  { id: 8, name: "Avocado", category: "Vegetables", serving: "Half fruit", calories: 160, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=700" },
  { id: 9, name: "Boiled Egg", category: "Protein", serving: "1 large", calories: 78, image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=700" },
  { id: 10, name: "Chicken Breast", category: "Protein", serving: "100 g cooked", calories: 165, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=700" },
  { id: 11, name: "Paneer", category: "Protein", serving: "100 g", calories: 265, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700" },
  { id: 12, name: "Soy Chunks", category: "Protein", serving: "50 g dry", calories: 173, image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=700" },
  { id: 13, name: "Milk", category: "Dairy", serving: "200 ml", calories: 122, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=700" },
  { id: 14, name: "Greek Yogurt", category: "Dairy", serving: "100 g", calories: 59, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700" },
  { id: 15, name: "Oats", category: "Grains", serving: "40 g dry", calories: 152, image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=700" },
  { id: 16, name: "Cooked Rice", category: "Grains", serving: "100 g", calories: 130, image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=700" },
  { id: 17, name: "Almonds", category: "Nuts", serving: "10 almonds", calories: 70, image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=700" },
  { id: 18, name: "Peanut Butter", category: "Nuts", serving: "1 tbsp", calories: 94, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700" },
];

const readData = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [users, setUsers] = useState(() => {
    const saved = readData("fitflow_users", []);
    return saved.some(u => u.email === ADMIN.email)
      ? saved
      : [...saved, ADMIN];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const email = localStorage.getItem("fitflow_session");
    const saved = readData("fitflow_users", []);
    return saved.find(u => u.email === email) ||
      (email === ADMIN.email ? ADMIN : null);
  });

  const [workouts, setWorkouts] = useState(() => {
    const saved = readData("fitflow_workouts", []);
    return [
      ...defaultWorkouts,
      ...saved.filter(w => !defaultWorkouts.some(d => d.id === w.id))
    ];
  });

  const [activities, setActivities] = useState(() =>
    readData("fitflow_activities", [])
  );

  const [foods, setFoods] = useState(() =>
    readData("fitflow_foods", [])
  );

  const [profiles, setProfiles] = useState(() =>
    readData("fitflow_profiles", {})
  );

  const [mode, setMode] = useState("login");
  const [page, setPage] = useState("Dashboard");
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("fitflow_theme") || "dark"
  );
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [weight, setWeight] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [foodSearch, setFoodSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState("All");
  const [foodGoal, setFoodGoal] = useState(2000);

  useEffect(() => {
    localStorage.setItem("fitflow_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("fitflow_workouts", JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem("fitflow_activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("fitflow_foods", JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem("fitflow_profiles", JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem("fitflow_theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!timerRunning) return;

    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [timerRunning]);

  function handleAuth(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim().toLowerCase();
    const password = String(form.get("password"));
    let user;

    if (mode === "signup") {
      const name = String(form.get("name")).trim();

      if (!name) return setMessage("Please enter your name.");

      if (users.some(u => u.email === email)) {
        return setMessage("Email already registered.");
      }

      user = { name, email, password, role: "user" };
      setUsers(old => [...old, user]);
    } else {
      user = users.find(
        u => u.email === email && u.password === password
      );

      if (!user) return setMessage("Incorrect email or password.");
    }

    setCurrentUser(user);
    localStorage.setItem("fitflow_session", user.email);
    setPage("Dashboard");
    setMessage("");
  }

  function logout() {
    localStorage.removeItem("fitflow_session");
    setCurrentUser(null);
    setTimerRunning(false);
    setSelectedWorkout(null);
    setMode("login");
  }

  function completeWorkout(workout) {
    setActivities(old => [
      ...old,
      {
        ...workout,
        email: currentUser.email,
        date: new Date().toISOString()
      }
    ]);

    setSelectedWorkout(null);
    setSeconds(0);
    setTimerRunning(false);
    setPage("Dashboard");
  }

  function addFood(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const food = String(form.get("food")).trim();
    const calories = Number(form.get("calories"));

    if (!food || calories <= 0) return;

    setFoods(old => [
      ...old,
      {
        id: Date.now(),
        food,
        calories,
        image: "",
        serving: "Custom serving",
        email: currentUser.email,
        date: new Date().toISOString()
      }
    ]);

    e.currentTarget.reset();
  }

  function addCatalogFood(food) {
    setFoods(old => [
      ...old,
      {
        id: Date.now() + Math.random(),
        food: food.name,
        calories: food.calories,
        image: food.image,
        serving: food.serving,
        email: currentUser.email,
        date: new Date().toISOString()
      }
    ]);
  }

  function deleteFood(foodId) {
    setFoods(old => old.filter(f => f.id !== foodId));
  }

  function saveWeight(e) {
    e.preventDefault();

    if (Number(weight) <= 0) return;

    setActivities(old => [
      ...old,
      {
        weight: Number(weight),
        email: currentUser.email,
        date: new Date().toISOString()
      }
    ]);

    setWeight("");
  }

  function saveProfile(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    setProfiles(old => ({
      ...old,
      [currentUser.email]: {
        age: form.get("age"),
        height: form.get("height"),
        goal: form.get("goal"),
        target: form.get("target")
      }
    }));

    alert("Profile saved successfully!");
  }

  if (!currentUser) {
    return (
      <main className={`auth-page ${theme}`}>
        <section className="auth-card">
          <div className="brand-mark">
            ✦ FITFLOW<span>PRO</span>
          </div>

          <p className="auth-tagline">YOUR FITNESS. YOUR JOURNEY.</p>

          <h2>
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>

          <p className="muted">Your stronger self starts today.</p>

          <div className="auth-tabs">
            <button
              className={mode === "login" ? "selected" : ""}
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
            >
              Login
            </button>

            <button
              className={mode === "signup" ? "selected" : ""}
              onClick={() => {
                setMode("signup");
                setMessage("");
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth}>
            {mode === "signup" && (
              <input
                name="name"
                placeholder="Full name"
                required
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />

            <button className="primary-btn" type="submit">
              {mode === "login" ? "Login to FitFlow" : "Create Account"}
            </button>
          </form>

          <p className="message">{message}</p>

          <div className="demo">
            <b>Demo Admin Access</b>
            <p>admin@fitflow.demo</p>
            <p>Password: admin123</p>
          </div>
        </section>
      </main>
    );
  }

  const isAdmin = currentUser.role === "admin";

  const myActivities = activities.filter(
    a => a.email === currentUser.email
  );

  const myFoods = foods.filter(
    f => f.email === currentUser.email
  );

  const today = new Date().toDateString();

  const todayFoods = myFoods.filter(
    f => new Date(f.date).toDateString() === today
  );

  const completed = myActivities.filter(a => a.calories);

  const caloriesBurned = completed.reduce(
    (sum, a) => sum + Number(a.calories || 0),
    0
  );

  const caloriesEaten = todayFoods.reduce(
    (sum, f) => sum + Number(f.calories || 0),
    0
  );

  const myProfile = profiles[currentUser.email] || {};

  const categories = [
    "All",
    ...new Set(workouts.map(w => w.category))
  ];

  const filteredWorkouts = workouts.filter(w =>
    (category === "All" || w.category === category) &&
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  const nutritionCategories = [
    "All",
    "Fruits",
    "Vegetables",
    "Protein",
    "Dairy",
    "Grains",
    "Nuts"
  ];

  const filteredFoods = foodCatalog.filter(f =>
    (foodCategory === "All" || f.category === foodCategory) &&
    f.name.toLowerCase().includes(foodSearch.toLowerCase())
  );

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - 6 + i);

    const label = date.toLocaleDateString("en", {
      weekday: "short"
    });

    const dayActivities = completed.filter(a => {
      const activityDate = new Date(a.date);

      return (
        !Number.isNaN(activityDate.getTime()) &&
        activityDate.toDateString() === date.toDateString()
      );
    });

    return {
      day: label,
      calories: dayActivities.reduce(
        (sum, a) => sum + Number(a.calories || 0),
        0
      ),
      workouts: dayActivities.length
    };
  });

  const navItems = [
    ["Dashboard", "⌂"],
    ["Workout Library", "✦"],
    ["Schedule", "▦"],
    ["Nutrition", "◈"],
    ["Progress", "↗"],
    ["Smart AI Coach", "🤖"],
    ["Profile", "◎"]
  ];

  function getWorkoutImage(workout) {
    return (
      workout.image ||
      defaultWorkouts.find(w => w.id === workout.id)?.image ||
      defaultWorkouts[5].image
    );
  }

  function handleViewWorkout(workout) {
    setSelectedWorkout(workout);
    setSeconds(0);
    setTimerRunning(false);
  }

  return (
    <div className={`pro-app ${theme}`}>
      <aside className="pro-sidebar">
        <div className="brand-mark">
          ✦ FITFLOW<span>PRO</span>
        </div>

        <div className="side-user">
          <div className="avatar">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <b>{currentUser.name}</b>
            <small>
              {isAdmin ? "Administrator" : "Fitness Member"}
            </small>
          </div>
        </div>

        <small className="nav-label">WORKSPACE</small>

        {navItems.map(([name, icon]) => (
          <button
            key={name}
            className={page === name ? "nav-active" : ""}
            onClick={() => {
              setPage(name);
              setSelectedWorkout(null);
              setTimerRunning(false);
            }}
          >
            <span>{icon}</span>
            {name}
          </button>
        ))}

        {isAdmin && (
          <>
            <small className="nav-label">MANAGEMENT</small>

            <button
              className={page === "Admin Panel" ? "nav-active" : ""}
              onClick={() => {
                setPage("Admin Panel");
                setSelectedWorkout(null);
              }}
            >
              <span>⚙</span>
              Admin Panel
            </button>
          </>
        )}

        <div className="sidebar-bottom">
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            <span>{theme === "dark" ? "☀" : "☾"}</span>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          <button onClick={logout}>
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="pro-main">
        <header className="topbar">
          <div>
            <small>FITNESS MANAGEMENT</small>
            <h1>{page}</h1>
          </div>

          <div className="top-user">
            <span>●</span>
            {currentUser.name}
          </div>
        </header>

        {page === "Dashboard" && (
          <Dashboard
            completed={completed}
            caloriesBurned={caloriesBurned}
            caloriesEaten={caloriesEaten}
            workouts={workouts}
            chartData={chartData}
            getWorkoutImage={getWorkoutImage}
            onExploreWorkouts={() => setPage("Workout Library")}
            onViewProgress={() => setPage("Progress")}
            onViewAllWorkouts={() => setPage("Workout Library")}
            onViewWorkout={workout => {
              handleViewWorkout(workout);
              setPage("Workout Library");
            }}
          />
        )}

        {page === "Workout Library" && (
          <WorkoutLibrary
            workouts={workouts}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={categories}
            filteredWorkouts={filteredWorkouts}
            selectedWorkout={selectedWorkout}
            getWorkoutImage={getWorkoutImage}
            handleViewWorkout={handleViewWorkout}
            setSelectedWorkout={setSelectedWorkout}
            timerRunning={timerRunning}
            setTimerRunning={setTimerRunning}
            seconds={seconds}
            setSeconds={setSeconds}
            completeWorkout={completeWorkout}
          />
        )}

        {page === "Schedule" && <Schedule />}

        {page === "Nutrition" && (
          <Nutrition
            caloriesEaten={caloriesEaten}
            foodGoal={foodGoal}
            setFoodGoal={setFoodGoal}
            todayFoods={todayFoods}
            caloriesBurned={caloriesBurned}
            nutritionCategories={nutritionCategories}
            foodSearch={foodSearch}
            setFoodSearch={setFoodSearch}
            foodCategory={foodCategory}
            setFoodCategory={setFoodCategory}
            filteredFoods={filteredFoods}
            addCatalogFood={addCatalogFood}
            deleteFood={deleteFood}
            addFood={addFood}
          />
        )}

        {page === "Progress" && (
          <Progress
            completed={completed}
            caloriesBurned={caloriesBurned}
            myActivities={myActivities}
            myFoods={myFoods}
            chartData={chartData}
            weight={weight}
            setWeight={setWeight}
            saveWeight={saveWeight}
          />
        )}

        {page === "Smart AI Coach" && (
          <SmartCoach
            currentUser={currentUser}
            workouts={workouts}
            completed={completed}
            myFoods={myFoods}
            caloriesBurned={caloriesBurned}
            caloriesEaten={caloriesEaten}
            foodGoal={foodGoal}
            onClose={() => setPage("Dashboard")}
          />
        )}

        {page === "Profile" && (
          <section className="pro-panel profile-panel">
            <div className="profile-avatar">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>

            <h2>{currentUser.name}</h2>
            <p>{currentUser.email}</p>

            <form onSubmit={saveProfile} className="pro-form">
              <label>
                Age
                <input
                  name="age"
                  type="number"
                  min="1"
                  defaultValue={myProfile.age || ""}
                  placeholder="Your age"
                />
              </label>

              <label>
                Height (cm)
                <input
                  name="height"
                  type="number"
                  min="1"
                  defaultValue={myProfile.height || ""}
                  placeholder="Your height"
                />
              </label>

              <label>
                Fitness Goal
                <select
                  name="goal"
                  defaultValue={myProfile.goal || "Build Muscle"}
                >
                  <option>Build Muscle</option>
                  <option>Lose Fat</option>
                  <option>Stay Fit</option>
                  <option>Improve Endurance</option>
                </select>
              </label>

              <label>
                Target Weight (kg)
                <input
                  name="target"
                  type="number"
                  min="1"
                  defaultValue={myProfile.target || ""}
                  placeholder="Target weight"
                />
              </label>

              <button className="primary-btn">Save Profile</button>
            </form>
          </section>
        )}

        {page === "Admin Panel" && isAdmin && (
          <>
            <section className="stat-grid">
              <article className="stat-card">
                <span>👥</span>
                <small>REGISTERED USERS</small>
                <h2>{users.filter(u => u.role === "user").length}</h2>
              </article>

              <article className="stat-card">
                <span>✦</span>
                <small>WORKOUT PLANS</small>
                <h2>{workouts.length}</h2>
              </article>

              <article className="stat-card">
                <span>✓</span>
                <small>COMPLETED ACTIVITIES</small>
                <h2>{activities.filter(a => a.calories).length}</h2>
              </article>

              <article className="stat-card">
                <span>◈</span>
                <small>FOOD ENTRIES</small>
                <h2>{foods.length}</h2>
              </article>
            </section>

            <section className="pro-panel">
              <h3>Registered Members</h3>

              {users.filter(u => u.role === "user").map(u => (
                <p key={u.email}>
                  {u.name} — {u.email}
                </p>
              ))}

              {users.filter(u => u.role === "user").length === 0 && (
                <p>No registered members yet.</p>
              )}
            </section>

            <section className="pro-panel">
              <h3>Workout Library Management</h3>

              {workouts.map(w => (
                <div className="admin-workout" key={w.id}>
                  <div>
                    <b>{w.name}</b>
                    <small>
                      {w.category} · {w.level} · {w.minutes} min
                    </small>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      setWorkouts(old =>
                        old.filter(x => x.id !== w.id)
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}

              <button
                className="primary-btn"
                onClick={() =>
                  setWorkouts(old => [
                    ...old,
                    {
                      id: Date.now(),
                      name: "New Admin Workout",
                      category: "Full Body",
                      level: "Beginner",
                      minutes: 30,
                      calories: 180,
                      exercises: "Squats, Push-ups, Plank",
                      image: defaultWorkouts[5].image
                    }
                  ])
                }
              >
                Add Custom Workout
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
