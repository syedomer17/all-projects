import readline from "readline-sync";
import { registerUser, loginUser, deleteUser } from "./users.js";
import { addTask, editTask, deleteTask } from "./todos.js";

async function main() {
  let loggedInUser = null;

  while (true) {
    console.clear();
    console.log("----------------------------------");
    console.log("-----------Todo CLI---------------");
    console.log("----------------------------------");

    const options = [
      "Exit",
      "Register",
      "Login",
      "Add Task",
      "Edit Task",
      "Delete Task",
      "Delete User",
    ];

    options.map((x, index) => console.log(`${index}. ${x}`));

    const userInput = readline.questionInt("Select your option : ");

    switch (userInput) {
      case 0:
        console.log("Exiting... Goodbye!");
        process.exit(0);
      case 1:
        await registerUser();
        break;
      case 2:
        loggedInUser = await loginUser();
        break;
      case 3:
        await addTask(loggedInUser);
        break;
      case 4:
        await editTask(loggedInUser);
        break;
      case 5:
        await deleteTask(loggedInUser);
        break;
      case 6:
        await deleteUser(loggedInUser);
        loggedInUser = null;
        break;
      default:
        console.log("Invalid option! Please select a valid option.");
    }

    readline.question("Press Enter to continue...");
  }
}

main();
