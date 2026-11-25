
import { useState } from "react";
import "./SmartCoach.css";

function SmartCoach({
  currentUser,
  workouts = [],
  completed = [],
  myFoods = [],
  caloriesBurned = 0,
  caloriesEaten = 0,
  foodGoal = 2000,
  onClose
}) {
  const storageKey = `fitflow_coach_${currentUser?.email || "guest"}`;

  const [messages, setMessages] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return saved || [
        {
          role: "assistant",
          text: `Hey ${currentUser?.name || "there"}! 👋 I'm your FitFlow Smart Coach. I can help you with workouts, nutrition, fitness goals and progress. What would you like to know?`
        }
      ];
    } catch {
      return [
        {
          role: "assistant",
          text: "Hey! 👋 Welcome to FitFlow Smart Coach. How can I help you today?"
        }
      ];
    }
  });

  const [input, setInput] = useState("");

  function saveMessages(updatedMessages) {
    setMessages(updatedMessages);
    localStorage.setItem(storageKey, JSON.stringify(updatedMessages));
  }

  function getResponse(question) {
    const q = question.toLowerCase();

    if (
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("hey")
    ) {
      return "Hello! 💪 Welcome back! I'm ready to help you stay consistent. Ask me about workouts, food or your fitness progress.";
    }

    if (
      q.includes("workout") ||
      q.includes("exercise") ||
      q.includes("training")
    ) {
      if (workouts.length === 0) {
        return "Your workout library is currently empty. Add some workout plans to get started!";
      }

      const suggestions = workouts.slice(0, 3);

      return `Here are some workouts from your library:\n\n${suggestions
        .map((w, i) => `${i + 1}. ${w.name} (${w.minutes} minutes) - ${w.level}`)
        .join("\n")}\n\nChoose a workout that matches your fitness level and remember to warm up!`;
    }

    if (
      q.includes("food") ||
      q.includes("nutrition") ||
      q.includes("eat") ||
      q.includes("diet") ||
      q.includes("meal")
    ) {
      return `🥗 Your nutrition update:\n\n• Calories consumed today: ${caloriesEaten} kcal\n• Daily calorie goal: ${foodGoal} kcal\n• Food entries today: ${myFoods.filter(f => new Date(f.date).toDateString() === new Date().toDateString()).length}\n\nTry to include protein, vegetables, fruits and enough water in your daily meals.`;
    }

    if (
      q.includes("progress") ||
      q.includes("result") ||
      q.includes("improve")
    ) {
      return `📊 Here's your fitness progress:\n\n• Completed workouts: ${completed.length}\n• Calories burned (recorded): ${caloriesBurned} kcal\n\nConsistency is more important than perfection. Keep following your workout schedule and track your progress regularly!`;
    }

    if (
      q.includes("calorie") ||
      q.includes("burn") ||
      q.includes("weight loss") ||
      q.includes("fat loss")
    ) {
      return `🔥 Your calorie summary:\n\n• Calories consumed today: ${caloriesEaten} kcal\n• Calories burned (recorded): ${caloriesBurned} kcal\n\nFor fat loss, focus on a sustainable calorie deficit, strength training, sufficient protein and good sleep. Remember, exercise calorie estimates are approximate.`;
    }

    if (
      q.includes("muscle") ||
      q.includes("strength") ||
      q.includes("build")
    ) {
      return "💪 To build muscle:\n\n1. Follow a consistent strength-training routine.\n2. Gradually increase your training difficulty.\n3. Eat enough protein and overall calories.\n4. Give your muscles time to recover.\n5. Sleep around 7–9 hours when possible.\n\nConsistency is the key!";
    }

    if (
      q.includes("water") ||
      q.includes("hydration")
    ) {
      return "💧 Stay hydrated throughout the day! Your water needs depend on your activity, climate and body. Drink regularly, especially around workouts, and adjust for sweating.";
    }

    if (
      q.includes("rest") ||
      q.includes("recovery") ||
      q.includes("sleep")
    ) {
      return "😴 Recovery is an important part of fitness!\n\n• Allow muscles time to recover.\n• Get adequate sleep.\n• Include rest or light activity days.\n• Avoid training through unusual pain.\n\nYour body needs recovery to become stronger.";
    }

    if (
      q.includes("motivat") ||
      q.includes("lazy") ||
      q.includes("consistent")
    ) {
      return "🚀 Remember why you started!\n\nYou don't need to be perfect every day. Start with one small action, complete today's workout and keep moving forward. Small steps create big results!";
    }

    if (
      q.includes("goal") ||
      q.includes("plan")
    ) {
      return "🎯 A good fitness plan includes:\n\n1. A clear and realistic goal.\n2. Regular strength training.\n3. Balanced nutrition.\n4. Enough recovery and sleep.\n5. Weekly progress tracking.\n\nChoose a goal and stay consistent!";
    }

    return "I'm here to help with your fitness journey! 💪 Try asking me about workouts, nutrition, calories, muscle building, recovery or your progress.";
  }

  function sendMessage(e) {
    e.preventDefault();

    const question = input.trim();

    if (!question) return;

    const updatedMessages = [
      ...messages,
      { role: "user", text: question },
      { role: "assistant", text: getResponse(question) }
    ];

    saveMessages(updatedMessages);
    setInput("");
  }

  function clearChat() {
    const initialMessages = [
      {
        role: "assistant",
        text: "Chat cleared! 👋 I'm ready for your next fitness question."
      }
    ];

    saveMessages(initialMessages);
  }

  const quickQuestions = [
    "Suggest a workout",
    "Check my progress",
    "Nutrition advice",
    "How to build muscle?"
  ];

  return (
    <section className="coach-panel">
      <div className="coach-header">
        <div className="coach-heading">
          <div className="coach-avatar">✦</div>
          <div>
            <h2>Smart AI Coach</h2>
            <span className="coach-status">
              <i></i> Your personal fitness assistant
            </span>
          </div>
        </div>

        <div className="coach-header-actions">
          <button type="button" onClick={clearChat}>
            Clear Chat
          </button>

          {onClose && (
            <button type="button" onClick={onClose}>
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="coach-welcome">
        <span>✦</span>
        <h3>Your Fitness. Your Personal Coach.</h3>
        <p>
          Ask questions and get fitness guidance based on
          your FitFlow activity.
        </p>
      </div>

      <div className="coach-quick-questions">
        {quickQuestions.map((question) => (
          <button
            type="button"
            key={question}
            onClick={() => {
              const updatedMessages = [
                ...messages,
                { role: "user", text: question },
                { role: "assistant", text: getResponse(question) }
              ];

              saveMessages(updatedMessages);
            }}
          >
            {question}
          </button>
        ))}
      </div>

      <div className="coach-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`coach-message ${message.role}`}
          >
            {message.role === "assistant" && (
              <span className="message-avatar">✦</span>
            )}

            <div className="message-bubble">
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form className="coach-input-area" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your fitness coach anything..."
        />

        <button type="submit" disabled={!input.trim()}>
          Send ➤
        </button>
      </form>

      <p className="coach-disclaimer">
        FitFlow Smart Coach provides general fitness guidance,
        not medical advice.
      </p>
    </section>
  );
}

export default SmartCoach;
