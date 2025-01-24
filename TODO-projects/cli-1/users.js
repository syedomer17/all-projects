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

export async function registerUser() {
  const db = readDB();
  console.log("DB Users: ", db.users); // Debug line to check users array
  const username = readline.question("Enter a username: ");
  const password = readline.question("Enter a password: ", { hideEchoBack: true });
  const userExists = db.users.find((user) => user.username === username);

  if (userExists) {
    console.log("User already exists! Please choose a different username.");
    return;
  }

  db.users.push({ username, password, todos: [] });
  writeDB(db);
  console.log("User registered successfully!");
}

export async function loginUser() {
  const db = readDB();
  const username = readline.question("Enter your username: ");
  const password = readline.question("Enter your password: ", { hideEchoBack: true });
  const user = db.users.find((u) => u.username === username && u.password === password);

  if (user) {
    console.log("Login successful!");
    return user;
  } else {
    console.log("Invalid credentials! Please try again.");
    return null;
  }
}

export async function deleteUser(loggedInUser) {
  if (!loggedInUser) {
    console.log("You need to log in first!");
    return;
  }

  const db = readDB();
  const userIndex = db.users.findIndex((u) => u.username === loggedInUser.username);

  if (userIndex > -1) {
    db.users.splice(userIndex, 1);
    writeDB(db);
    console.log("User deleted successfully!");
  } else {
    console.log("User not found!");
  }
}
