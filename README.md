# Getting Started with the SacState Room Reservation Project

Welcome to the SacState Room Reservation project! This guide will help you set up the project on your local machine, even if you're new to web development.

## Prerequisites

Before you begin, make sure you have the following tools installed:

- **Git:** Used for version control. You can download it from [https://git-scm.com/](https://git-scm.com/).
- **Node.js:** A JavaScript runtime environment. Download the LTS version from [https://nodejs.org/en/download](https://nodejs.org/en/download). This also installs **npm** (Node Package Manager).

### Verifying Installation

Open your terminal or command prompt and run the following commands to check if Git, Node.js, and npm are installed correctly:

```zsh
git -v
node -v
npm -v
```

You should see version numbers for each tool. If you get an error message, double-check that you've installed them correctly and that they're added to your system's PATH.

Example output:

```zsh
git -v
git version 2.39.5 (Apple Git-154)

node -v
v22.14.0

npm -v
10.9.2
```

If you followed all the steps above and you are getting errors, ask Chad Geppetti for help.

---

## Project Setup
1. Clone the Repository:

First, clone the project repository to your local machine using Git. Open your terminal, navigate to the directory where you want to store the project, and run:

```zsh
git close https://github.com/BrayanCSUS/LowkeyVital
```

*or*

Use my prefered method. ***GitHub Copilot***. 

2. Install Dependencies:

Navigate to the project directory:

```zsh
cd SacStateRoomReservation
```

Install the project dependencies using npm:

```zsh
npm install --force
```

The --force flag is used to resolve potential dependency conflicts. It ensures that all necessary packages are installed correctly. This step might take a few minutes.

3. Start the Development Server:

Once the dependencies are installed, start the development server:

```zsh
npm run dev
```

This command will start the application and make it accessible in your web browser. The terminal output will usually tell you the exact address (e.g., localhost:3000).

4. Access the Application:

Open your web browser and go to the address provided in the terminal output (usually http://localhost:3000). You should now see the SacState Room Reservation application running!

## Contributing
- ***Commit Frequently***: Commit your changes regularly with clear and concise messages.
- ***Branching***: Create a new branch for each feature or bug fix you're working on.
- ***Push Your Changes***: Once you're done with a feature or bug fix, push your branch to the remote repository.
- ***Pull Requests***: Submit a pull request to merge your changes into the main branch.

## Troubleshooting
If you encounter any issues during the setup process, here are a few things to try:

- ***Check the Terminal Output***: Carefully read the error messages in the terminal for clues about what went wrong.
- ***Google the Error Message***: Search the web for the error message to find potential solutions.
- ***Ask for Help***: Don't hesitate to ask for help from other team members or experienced developers.

Good luck, and happy coding!