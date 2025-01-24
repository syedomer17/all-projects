import fs from "fs";
import readline from "readline-sync";

const dbFile = "db.json";

function readDB() {
  if (!fs.existsSync(dbFile)) {
    // Initialize db if it doesn't exist
    const initialData = { users: [] };
    fs.writeFileSync(dbFile, JSON.stringify(initialData, null, 2));
    console.log("DB initialized: ", initialData); // Debug line to check
    return initialData;
  }
  const data = fs.readFileSync(dbFile, "utf-8");
  console.log("Read DB: ", data); // Debug line to check
  return JSON.parse(data);
}

function writeDB(data) {
  console.log("Writing DB: ", data); // Debug line to check data being written
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

export async function addTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("You need to log in first!");
    return;
  }

  const db = readDB();
  const title = readline.question("Enter task title: ");
  const description = readline.question("Enter task description: ");

  const user = db.users.find((u) => u.username === loggedInUser.username);
  const newTask = { id: Date.now(), title, description };
  user.todos.push(newTask);

  writeDB(db);
  console.log("Task added successfully!");
}

export async function editTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("You need to log in first!");
    return;
  }

  const db = readDB();
  const user = db.users.find((u) => u.username === loggedInUser.username);

  if (user.todos.length === 0) {
    console.log("No tasks found!");
    return;
  }

  console.log("Your tasks:");
  user.todos.forEach((task) => console.log(`${task.id}: ${task.title}`));

  const taskId = readline.questionInt("Enter the task ID to edit: ");
  const task = user.todos.find((t) => t.id === taskId);

  if (task) {
    const newTitle = readline.question("Enter new title: ");
    const newDescription = readline.question("Enter new description: ");
    task.title = newTitle || task.title;
    task.description = newDescription || task.description;

    writeDB(db);
    console.log("Task updated successfully!");
  } else {
    console.log("Task not found!");
  }
}

export async function deleteTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("You need to log in first!");
    return;
  }

  const db = readDB();
  const user = db.users.find((u) => u.username === loggedInUser.username);

  if (user.todos.length === 0) {
    console.log("No tasks found!");
    return;
  }

  console.log("Your tasks:");
  user.todos.forEach((task) => console.log(`${task.id}: ${task.title}`));

  const taskId = readline.questionInt("Enter the task ID to delete: ");
  const taskIndex = user.todos.findIndex((t) => t.id === taskId);

  if (taskIndex > -1) {
    user.todos.splice(taskIndex, 1);
    writeDB(db);
    console.log("Task deleted successfully!");
  } else {
    console.log("Task not found!");
  }
}
