
import { useEffect, useState } from "react";
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

// Estimated calories per listed serving
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

function WeeklyAreaChart({ data }) {
  const max = Math.max(100, ...data.map(d => d.calories));
  const points = data.map((d, i) => {
    const x = 45 + i * (610 / Math.max(1, data.length - 1));
    const y = 175 - (d.calories / max) * 145;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 700 220" width="100%" height="100%">
      {[30, 75, 120, 175].map(y => <line key={y} x1="45" y1={y} x2="655" y2={y} stroke="currentColor" strokeOpacity=".15" strokeDasharray="4 5" />)}
      <polygon points={`45,175 ${points} 655,175`} fill="#9675ff" opacity=".16" />
      <polyline points={points} fill="none" stroke="#9675ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => {
        const x = 45 + i * (610 / Math.max(1, data.length - 1));
        const y = 175 - (d.calories / max) * 145;
        return <g key={i}><circle cx={x} cy={y} r="5" fill="#9675ff" /><text x={x} y="205" textAnchor="middle" fill="currentColor" fontSize="12">{d.day}</text></g>;
      })}
    </svg>
  );
}

function WeeklyBarChart({ data }) {
  const max = Math.max(1, ...data.map(d => d.workouts));
  return (
    <svg viewBox="0 0 700 220" width="100%" height="100%">
      {[30, 75, 120, 175].map(y => <line key={y} x1="35" y1={y} x2="665" y2={y} stroke="currentColor" strokeOpacity=".15" strokeDasharray="4 5" />)}
      {data.map((d, i) => {
        const x = 55 + i * 88;
        const height = (d.workouts / max) * 140;
        return <g key={i}><rect x={x} y={175 - height} width="42" height={Math.max(2, height)} rx="6" fill="#9675ff" /><text x={x + 21} y="205" textAnchor="middle" fill="currentColor" fontSize="12">{d.day}</text></g>;
      })}
    </svg>
  );
}

export default function App() {
  const [users, setUsers] = useState(() => {
    const saved = readData("fitflow_users", []);
    return saved.some(u => u.email === ADMIN.email) ? saved : [...saved, ADMIN];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const email = localStorage.getItem("fitflow_session");
    const saved = readData("fitflow_users", []);
    return saved.find(u => u.email === email) || (email === ADMIN.email ? ADMIN : null);
  });

  const [workouts, setWorkouts] = useState(() => {
    const saved = readData("fitflow_workouts", []);
    return [...defaultWorkouts, ...saved.filter(w => !defaultWorkouts.some(d => d.id === w.id))];
  });

  const [activities, setActivities] = useState(() => readData("fitflow_activities", []));
  const [foods, setFoods] = useState(() => readData("fitflow_foods", []));
  const [profiles, setProfiles] = useState(() => readData("fitflow_profiles", {}));

  const [mode, setMode] = useState("login");
  const [page, setPage] = useState("Dashboard");
  const [theme, setTheme] = useState(() => localStorage.getItem("fitflow_theme") || "dark");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [weight, setWeight] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Nutrition controls
  const [foodSearch, setFoodSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState("All");
  const [foodGoal, setFoodGoal] = useState(2000);

  useEffect(() => localStorage.setItem("fitflow_users", JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem("fitflow_workouts", JSON.stringify(workouts)), [workouts]);
  useEffect(() => localStorage.setItem("fitflow_activities", JSON.stringify(activities)), [activities]);
  useEffect(() => localStorage.setItem("fitflow_foods", JSON.stringify(foods)), [foods]);
  useEffect(() => localStorage.setItem("fitflow_profiles", JSON.stringify(profiles)), [profiles]);
  useEffect(() => localStorage.setItem("fitflow_theme", theme), [theme]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
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
      if (users.some(u => u.email === email)) return setMessage("Email already registered.");
      user = { name, email, password, role: "user" };
      setUsers(old => [...old, user]);
    } else {
      user = users.find(u => u.email === email && u.password === password);
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
    setActivities(old => [...old, { ...workout, email: currentUser.email, date: new Date().toISOString() }]);
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

    setFoods(old => [...old, {
      id: Date.now(),
      food,
      calories,
      image: "",
      serving: "Custom serving",
      email: currentUser.email,
      date: new Date().toISOString()
    }]);
    e.currentTarget.reset();
  }

  function addCatalogFood(food) {
    setFoods(old => [...old, {
      id: Date.now() + Math.random(),
      food: food.name,
      calories: food.calories,
      image: food.image,
      serving: food.serving,
      email: currentUser.email,
      date: new Date().toISOString()
    }]);
  }

  function deleteFood(foodId) {
    setFoods(old => old.filter(f => f.id !== foodId));
  }

  function saveWeight(e) {
    e.preventDefault();
    if (Number(weight) <= 0) return;
    setActivities(old => [...old, { weight: Number(weight), email: currentUser.email, date: new Date().toISOString() }]);
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
          <div className="brand-mark">✦ FITFLOW<span>PRO</span></div>
          <p className="auth-tagline">YOUR FITNESS. YOUR JOURNEY.</p>
          <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
          <p className="muted">Your stronger self starts today.</p>
          <div className="auth-tabs">
            <button className={mode === "login" ? "selected" : ""} onClick={() => { setMode("login"); setMessage(""); }}>Login</button>
            <button className={mode === "signup" ? "selected" : ""} onClick={() => { setMode("signup"); setMessage(""); }}>Sign Up</button>
          </div>
          <form onSubmit={handleAuth}>
            {mode === "signup" && <input name="name" placeholder="Full name" required />}
            <input name="email" type="email" placeholder="Email address" required />
            <input name="password" type="password" placeholder="Password" required />
            <button className="primary-btn" type="submit">{mode === "login" ? "Login to FitFlow" : "Create Account"}</button>
          </form>
          <p className="message">{message}</p>
          <div className="demo"><b>Demo Admin Access</b><p>admin@fitflow.demo</p><p>Password: admin123</p></div>
        </section>
      </main>
    );
  }

  const isAdmin = currentUser.role === "admin";
  const myActivities = activities.filter(a => a.email === currentUser.email);
  const myFoods = foods.filter(f => f.email === currentUser.email);
  const today = new Date().toDateString();
  const todayFoods = myFoods.filter(f => new Date(f.date).toDateString() === today);
  const completed = myActivities.filter(a => a.calories);
  const caloriesBurned = completed.reduce((sum, a) => sum + Number(a.calories || 0), 0);
  const caloriesEaten = todayFoods.reduce((sum, f) => sum + Number(f.calories || 0), 0);
  const myProfile = profiles[currentUser.email] || {};

  const categories = ["All", ...new Set(workouts.map(w => w.category))];
  const filteredWorkouts = workouts.filter(w =>
    (category === "All" || w.category === category) &&
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  const nutritionCategories = ["All", "Fruits", "Vegetables", "Protein", "Dairy", "Grains", "Nuts"];
  const filteredFoods = foodCatalog.filter(f =>
    (foodCategory === "All" || f.category === foodCategory) &&
    f.name.toLowerCase().includes(foodSearch.toLowerCase())
  );

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - 6 + i);
    const label = date.toLocaleDateString("en", { weekday: "short" });
    const dayActivities = completed.filter(a => {
      const activityDate = new Date(a.date);
      return !Number.isNaN(activityDate.getTime()) && activityDate.toDateString() === date.toDateString();
    });
    return {
      day: label,
      calories: dayActivities.reduce((sum, a) => sum + Number(a.calories || 0), 0),
      workouts: dayActivities.length
    };
  });

  const navItems = [
    ["Dashboard", "⌂"], ["Workout Library", "✦"], ["Schedule", "▦"],
    ["Nutrition", "◈"], ["Progress", "↗"], ["Profile", "◎"]
  ];

  function getWorkoutImage(workout) {
    return workout.image || defaultWorkouts.find(w => w.id === workout.id)?.image || defaultWorkouts[5].image;
  }

  return (
    <div className={`pro-app ${theme}`}>
      <aside className="pro-sidebar">
        <div className="brand-mark">✦ FITFLOW<span>PRO</span></div>
        <div className="side-user">
          <div className="avatar">{currentUser.name.charAt(0).toUpperCase()}</div>
          <div><b>{currentUser.name}</b><small>{isAdmin ? "Administrator" : "Fitness Member"}</small></div>
        </div>
        <small className="nav-label">WORKSPACE</small>
        {navItems.map(([name, icon]) => (
          <button key={name} className={page === name ? "nav-active" : ""} onClick={() => { setPage(name); setSelectedWorkout(null); setTimerRunning(false); }}>
            <span>{icon}</span>{name}
          </button>
        ))}
        {isAdmin && <>
          <small className="nav-label">MANAGEMENT</small>
          <button className={page === "Admin Panel" ? "nav-active" : ""} onClick={() => { setPage("Admin Panel"); setSelectedWorkout(null); }}><span>⚙</span>Admin Panel</button>
        </>}
        <div className="sidebar-bottom">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><span>{theme === "dark" ? "☀" : "☾"}</span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</button>
          <button onClick={logout}><span>↪</span>Logout</button>
        </div>
      </aside>

      <main className="pro-main">
        <header className="topbar">
          <div><small>FITNESS MANAGEMENT</small><h1>{page}</h1></div>
          <div className="top-user"><span>●</span>{currentUser.name}</div>
        </header>

        {page === "Dashboard" && <>
          <section className="welcome-banner">
            <div><small>YOUR FITNESS JOURNEY</small><h2>Build your strongest self.</h2><p>Every workout brings you one step closer to your goal.</p><button className="primary-btn" onClick={() => setPage("Workout Library")}>Explore Workouts →</button></div>
            <div className="banner-icon">🏋️</div>
          </section>
          <section className="stat-grid">
            <article className="stat-card"><span>✦</span><small>WORKOUTS COMPLETED</small><h2>{completed.length}</h2><p>Keep your momentum going</p></article>
            <article className="stat-card"><span>🔥</span><small>CALORIES BURNED</small><h2>{caloriesBurned.toLocaleString()}</h2><p>kcal burned</p></article>
            <article className="stat-card"><span>◈</span><small>CALORIES CONSUMED TODAY</small><h2>{caloriesEaten.toLocaleString()}</h2><p>kcal tracked today</p></article>
            <article className="stat-card"><span>◎</span><small>WORKOUT LIBRARY</small><h2>{workouts.length}</h2><p>Available workout plans</p></article>
          </section>
          <section className="dashboard-grid">
            <article className="pro-panel chart-panel"><div className="panel-heading"><div><h3>Weekly Activity</h3><p>Your workout calories this week</p></div><span className="chart-tag">LAST 7 DAYS</span></div><div className="chart-area"><WeeklyAreaChart data={chartData} /></div></article>
            <article className="pro-panel goal-panel"><h3>Your Fitness Goal</h3><p>Stay consistent and make progress.</p><div className="goal-circle"><div><b>{completed.length}</b><small>workouts</small></div></div><p className="goal-note">Complete workouts to build your weekly record.</p><button className="secondary-btn" onClick={() => setPage("Progress")}>View Progress</button></article>
          </section>
          <section className="pro-panel">
            <div className="panel-heading"><div><h3>Recommended Workouts</h3><p>Choose a session for today</p></div><button className="text-btn" onClick={() => setPage("Workout Library")}>View all →</button></div>
            <div className="mini-workouts">{workouts.slice(0, 3).map(w => <div className="mini-workout" key={w.id}><div className="mini-workout-image" style={{ backgroundImage: `url("${getWorkoutImage(w)}")` }} /><b>{w.name}</b><small>{w.category} · {w.minutes} min</small><button onClick={() => { setSelectedWorkout(w); setPage("Workout Library"); }}>View workout →</button></div>)}</div>
          </section>
        </>}

        {page === "Workout Library" && <>
          <section className="page-intro"><h2>Find your next workout</h2><p>Explore professional training plans for every fitness level.</p></section>
          <div className="library-tools"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search workouts..." /><select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></div>
          {selectedWorkout && <section className="pro-panel selected-workout">
            <button className="close-btn" onClick={() => { setSelectedWorkout(null); setTimerRunning(false); setSeconds(0); }}>✕</button>
            <div className="detail-workout-image" style={{ backgroundImage: `url("${getWorkoutImage(selectedWorkout)}")` }}><span>{selectedWorkout.category} TRAINING</span></div>
            <small>WORKOUT DETAILS</small><h2>{selectedWorkout.name}</h2><p>{selectedWorkout.exercises}</p>
            <div className="detail-meta"><span>◷ {selectedWorkout.minutes} minutes</span><span>🔥 {selectedWorkout.calories} kcal</span><span>✦ {selectedWorkout.level}</span></div>
            <h3>Workout Timer</h3><div className="timer-display">{String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</div>
            <button className="primary-btn" onClick={() => setTimerRunning(!timerRunning)}>{timerRunning ? "Pause Timer" : "Start Timer"}</button>
            <button className="secondary-btn" onClick={() => { setTimerRunning(false); setSeconds(0); }}>Reset Timer</button>
            <button className="primary-btn" onClick={() => completeWorkout(selectedWorkout)}>Complete Workout</button>
          </section>}
          <div className="workout-library">{filteredWorkouts.map(w => <article className="library-card" key={w.id}><div className="library-image" style={{ backgroundImage: `url("${getWorkoutImage(w)}")` }}><small>{w.category}</small><span className="image-overlay">FITFLOW TRAINING</span></div><div className="library-content"><span className="level-tag">{w.level}</span><h3>{w.name}</h3><p>{w.exercises}</p><div className="workout-meta"><span>◷ {w.minutes} min</span><span>🔥 {w.calories} kcal</span></div><button className="primary-btn" onClick={() => { setSelectedWorkout(w); setSeconds(0); setTimerRunning(false); }}>View Workout</button></div></article>)}</div>
          {filteredWorkouts.length === 0 && <section className="pro-panel"><h3>No workouts found</h3><p>Try another search or category.</p></section>}
        </>}

        {page === "Schedule" && <section className="pro-panel"><h2>Weekly Workout Schedule</h2><p>Plan your fitness week and stay consistent.</p><div className="schedule-grid">{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, i) => <article key={day}><small>DAY {i + 1}</small><h3>{day}</h3><p>{["Chest & Triceps", "Cardio", "Back & Biceps", "Active Recovery", "Legs", "Full Body", "Rest Day"][i]}</p><span>{i === 6 ? "Recovery" : "Training day"}</span></article>)}</div></section>}

        {/* UPDATED NUTRITION PAGE */}
        {page === "Nutrition" && <>
          <section className="nutrition-hero">
            <div className="nutrition-hero-text">
              <span className="nutrition-eyebrow">EAT WELL · FEEL STRONG</span>
              <h2>Fuel your body.<br /><span>Reach your goals.</span></h2>
              <p>Discover foods, check their calories and keep track of your daily nutrition.</p>
              <button className="nutrition-hero-btn" onClick={() => document.getElementById("food-library")?.scrollIntoView({ behavior: "smooth" })}>Explore foods ↓</button>
            </div>
            <div className="nutrition-hero-image" />
          </section>

          <section className="nutrition-summary">
            <article className="nutrition-total-card">
              <div className="nutrition-summary-top"><div><small>YOUR DAILY INTAKE</small><h3>Calories consumed</h3></div><span>🔥</span></div>
              <div className="nutrition-big-number">{caloriesEaten.toLocaleString()} <small>kcal</small></div>
              <div className="nutrition-progress-track"><div className="nutrition-progress-fill" style={{ width: `${Math.min(100, caloriesEaten / Math.max(1, foodGoal) * 100)}%` }} /></div>
              <div className="nutrition-progress-label"><span>{Math.max(0, foodGoal - caloriesEaten).toLocaleString()} kcal remaining</span><span>Goal: {foodGoal.toLocaleString()} kcal</span></div>
              <label className="goal-input-label">Daily calorie goal
                <input type="number" min="1" value={foodGoal} onChange={e => setFoodGoal(Math.max(1, Number(e.target.value)))} />
              </label>
            </article>
            <article className="nutrition-mini-stat"><span className="nutrition-stat-icon">🍽️</span><small>FOOD ITEMS TODAY</small><h2>{todayFoods.length}</h2><p>Items added to your food log</p></article>
            <article className="nutrition-mini-stat"><span className="nutrition-stat-icon">⚡</span><small>CALORIES BURNED</small><h2>{caloriesBurned.toLocaleString()}</h2><p>Total workout calories</p></article>
          </section>

          <section className="nutrition-section" id="food-library">
            <div className="nutrition-section-heading"><div><span className="nutrition-eyebrow">FOOD EXPLORER</span><h2>Discover healthy foods</h2><p>Choose a food to see its estimated calories per serving.</p></div></div>
            <div className="nutrition-tools">
              <input value={foodSearch} onChange={e => setFoodSearch(e.target.value)} placeholder="Search foods..." />
              <div className="nutrition-category-list">{nutritionCategories.map(c => <button key={c} className={foodCategory === c ? "nutrition-category active" : "nutrition-category"} onClick={() => setFoodCategory(c)}>{c}</button>)}</div>
            </div>
            <div className="food-card-grid">
              {filteredFoods.map(food => <article className="food-card" key={food.id}>
                <div className="food-card-image"><img src={food.image} alt={food.name} loading="lazy" /><span>{food.category}</span></div>
                <div className="food-card-content"><h3>{food.name}</h3><p className="food-serving">{food.serving}</p><div className="food-card-bottom"><div className="food-calorie-value">{food.calories}<small> kcal</small></div><button onClick={() => addCatalogFood(food)}>+ Add to meal</button></div></div>
              </article>)}
            </div>
            {filteredFoods.length === 0 && <div className="pro-panel"><h3>No foods found</h3><p>Try a different food name or category.</p></div>}
          </section>

          <section className="nutrition-bottom-grid">
            <article className="pro-panel nutrition-log-panel">
              <div className="panel-heading"><div><span className="nutrition-eyebrow">YOUR MEALS</span><h3>Today's food log</h3><p>Foods you have added today.</p></div><span className="nutrition-log-count">{todayFoods.length} items</span></div>
              {todayFoods.length === 0 ? <div className="nutrition-empty"><span>🥗</span><h3>Your food log is empty</h3><p>Add foods from the food explorer to start tracking your daily calories.</p></div> :
                todayFoods.map(food => <div className="nutrition-log-item" key={food.id}>
                  {food.image ? <img src={food.image} alt={food.food} /> : <div className="custom-food-icon">🍴</div>}
                  <div className="nutrition-log-name"><b>{food.food}</b><small>{food.serving || "Custom serving"}</small></div>
                  <strong>{food.calories} kcal</strong>
                  <button className="delete-btn" onClick={() => deleteFood(food.id)}>Delete</button>
                </div>)}
            </article>

            <article className="pro-panel custom-food-panel">
              <span className="nutrition-eyebrow">CUSTOM ENTRY</span>
              <h3>Add your own food</h3>
              <p>Can't find a food in the library? Enter its name and calorie value here.</p>
              <form onSubmit={addFood} className="pro-form custom-food-form">
                <label>Food name<input name="food" placeholder="e.g. Homemade dosa" required /></label>
                <label>Calories (kcal)<input name="calories" type="number" min="1" placeholder="e.g. 150" required /></label>
                <button className="primary-btn">Add Custom Food</button>
              </form>
              <div className="nutrition-tip"><span>💡</span><p>Tip: Check the serving size when entering calories for better tracking accuracy.</p></div>
            </article>
          </section>
        </>}

        {page === "Progress" && <>
          <section className="stat-grid">
            <article className="stat-card"><span>✦</span><small>WORKOUTS</small><h2>{completed.length}</h2></article>
            <article className="stat-card"><span>🔥</span><small>CALORIES BURNED</small><h2>{caloriesBurned}</h2></article>
            <article className="stat-card"><span>⚖</span><small>WEIGHT ENTRIES</small><h2>{myActivities.filter(a => a.weight).length}</h2></article>
            <article className="stat-card"><span>◈</span><small>MEALS TRACKED</small><h2>{myFoods.length}</h2></article>
          </section>
          <section className="pro-panel"><h3>Weekly Workout Report</h3><div className="chart-area"><WeeklyBarChart data={chartData} /></div></section>
          <section className="pro-panel"><h3>Record Your Weight</h3><form onSubmit={saveWeight} className="inline-form"><input type="number" step="0.1" min="1" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight in kg" required /><button className="primary-btn">Save Weight</button></form>{myActivities.filter(a => a.weight).map((a, i) => <p key={i}>{new Date(a.date).toLocaleDateString()}: {a.weight} kg</p>)}</section>
        </>}

        {page === "Profile" && <section className="pro-panel profile-panel">
          <div className="profile-avatar">{currentUser.name.charAt(0).toUpperCase()}</div><h2>{currentUser.name}</h2><p>{currentUser.email}</p>
          <form onSubmit={saveProfile} className="pro-form">
            <label>Age<input name="age" type="number" min="1" defaultValue={myProfile.age || ""} placeholder="Your age" /></label>
            <label>Height (cm)<input name="height" type="number" min="1" defaultValue={myProfile.height || ""} placeholder="Your height" /></label>
            <label>Fitness Goal<select name="goal" defaultValue={myProfile.goal || "Build Muscle"}><option>Build Muscle</option><option>Lose Fat</option><option>Stay Fit</option><option>Improve Endurance</option></select></label>
            <label>Target Weight (kg)<input name="target" type="number" min="1" defaultValue={myProfile.target || ""} placeholder="Target weight" /></label>
            <button className="primary-btn">Save Profile</button>
          </form>
        </section>}

        {page === "Admin Panel" && isAdmin && <>
          <section className="stat-grid">
            <article className="stat-card"><span>👥</span><small>REGISTERED USERS</small><h2>{users.filter(u => u.role === "user").length}</h2></article>
            <article className="stat-card"><span>✦</span><small>WORKOUT PLANS</small><h2>{workouts.length}</h2></article>
            <article className="stat-card"><span>✓</span><small>COMPLETED ACTIVITIES</small><h2>{activities.filter(a => a.calories).length}</h2></article>
            <article className="stat-card"><span>◈</span><small>FOOD ENTRIES</small><h2>{foods.length}</h2></article>
          </section>
          <section className="pro-panel"><h3>Registered Members</h3>{users.filter(u => u.role === "user").map(u => <p key={u.email}>{u.name} — {u.email}</p>)}{users.filter(u => u.role === "user").length === 0 && <p>No registered members yet.</p>}</section>
          <section className="pro-panel"><h3>Workout Library Management</h3>{workouts.map(w => <div className="admin-workout" key={w.id}><div><b>{w.name}</b><small>{w.category} · {w.level} · {w.minutes} min</small></div><button className="delete-btn" onClick={() => setWorkouts(old => old.filter(x => x.id !== w.id))}>Delete</button></div>)}<button className="primary-btn" onClick={() => setWorkouts(old => [...old, { id: Date.now(), name: "New Admin Workout", category: "Full Body", level: "Beginner", minutes: 30, calories: 180, exercises: "Squats, Push-ups, Plank", image: defaultWorkouts[5].image }])}>Add Custom Workout</button></section>
        </>}
      </main>
    </div>
  );
}
