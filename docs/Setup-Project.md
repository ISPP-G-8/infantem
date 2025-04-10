# Infantem 
## Index
- [Introduction](#infantem)
- [Setup guide](#setup-guide)
  - [Linux setup](#linux-setup)
  - [Windows setup](#windows-setup)
  - [Mac setup](#mac-setup)
- [Checking Everything Works](#checking-everything-works)
- [Contributing](#contributing)

## Setup guide

### Linux setup

Follow these steps to set up the project on a Linux machine:

#### 1. Clone the repository
```sh
git clone https://github.com/ISPP-G-8/infantem.git  # With HTTP or SSH 
cd infantem 
```

#### 2. Backend Setup 

- Install Java (Recommended: Java 21):
  - **Ubuntu/Debian**:
    ```sh
    sudo apt update && sudo apt install openjdk-21-jdk
    java --version
    ```
  - **Fedora**:
    ```sh
    sudo dnf install java-21-openjdk
    java --version
    ```
  - **Arch Linux**:
    ```sh
    sudo pacman -S jdk-openjdk
    java --version
    ```

- Install MySQL:
  ```sh
  sudo apt install mysql-server  # For Ubuntu/Debian
  sudo dnf install mysql-server  # For Fedora
  sudo pacman -S mysql  # For Arch Linux
  ```
- Secure MySQL installation:
  ```sh
  sudo mysql_secure_installation
  ```
  Follow the prompts to set a root password and disable insecure settings.

- Create the database and user:
  ```sh
  sudo mysql -u root -p
  CREATE DATABASE infantem_db;
  CREATE USER 'spring_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';
  GRANT ALL PRIVILEGES ON infantem_db.* TO 'spring_user'@'localhost';
  FLUSH PRIVILEGES;
  EXIT;
  ```

- Build and run the backend:
  ```sh
  ./mvnw spring-boot:run
  ```

#### 3. Frontend Setup 

- Install Node.js and npm:
  - **Ubuntu/Debian**:
    ```sh
    sudo apt install nodejs npm
    ```
  - **Fedora**:
    ```sh
    sudo dnf install nodejs npm
    ```
  - **Arch Linux**:
    ```sh
    sudo pacman -S nodejs npm
    ```
  - Verify installation:
    ```sh
    node -v && npm -v
    ```
- Install dependencies:
  ```sh
  cd frontend
  npm install
  ```
- Install Expo CLI:
  ```sh
  npm install -g expo-cli
  ```
- Start the development server:
  ```sh
  npm start < --ios | --android | --web >
  ```
  Running `npm start` without options will show the Expo developer tools where you can select the platform manually.

### Windows setup

To set up the project on a Windows machine, follow these steps:

#### 1. Clone the repository
Open **PowerShell** (or **Command Prompt**) and run the following commands to clone the repository:
```sh
git clone https://github.com/ISPP-G-8/infantem.git  # With HTTP or SSH 
cd infantem 
 ```

#### 2. Backend Setup

- Install Java (Recommended: Java 21):
  - Download and install **OpenJDK 21** from the [AdoptOpenJDK website](https://adoptopenjdk.net/).
  - After installation, verify the installation with:
    ```powershell
    java --version
    ```

- Install MySQL:
  - Download the **MySQL Installer** from the [official MySQL website](https://dev.mysql.com/downloads/installer/).
  - Run the installer and select the **MySQL Server** option.
  - Follow the installation wizard to install MySQL. During installation, make sure you set a root password.
  - After installation, ensure MySQL is running by checking the **MySQL Workbench** or using:
    ```powershell
    mysql -u root -p
    ```
    Enter your root password when prompted.

- Create the database and user:
  - Run the following in **PowerShell**:
    ```powershell
    mysql -u root -p
    ```
  - Enter the root password and execute the following SQL commands:
    ```sql
    CREATE DATABASE infantem_db;
    CREATE USER 'spring_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';
    GRANT ALL PRIVILEGES ON infantem_db.* TO 'spring_user'@'localhost';
    FLUSH PRIVILEGES;
    EXIT;
    ```

- Build and run the backend:
  - Open **PowerShell** in the `infantem` directory (or in VSC).
  - Run the following command to build and start the backend:
    ```powershell
    .\mvnw spring-boot:run
    ```

#### 3. Frontend Setup

- Install Node.js and npm:
  - Download and install **Node.js** from the [official website](https://nodejs.org/).
  - Verify the installation by running:
    ```powershell
    node -v 
    npm -v
    ```

- Install dependencies:
  - Change to the **frontend** directory:
    ```powershell
    cd frontend
    ```
  - Run the following command to install the required dependencies:
    ```powershell
    npm install
    ```

- Install Expo CLI:
  ```powershell
  npm install -g expo-cli
  ```

- Start the development server:
  - For the web:
    ```powershell
    npm expo start --web
    ```
  - For iOS (if using a macOS machine with a simulator):
    ```powershell
    npm expo start --ios
    ```
  - For Android (if you have an emulator set up):
    ```powershell
    npm expo start --android
    ```

Running `npm expo start` without options will show the **Expo Developer Tools**, where you can select the platform manually.

### Mac setup

Follow these steps to set up the project on a macOS machine:

#### 1. Clone the repository
```sh
git clone https://github.com/ISPP-G-8/infantem.git  # With HTTP or SSH
cd infantem
```

#### 2. Backend Setup

- Install Java (Recommended: Java 21):
  ```sh
  brew install openjdk@21
  ```
  Configure `JAVA_HOME`:
  ```sh
  echo 'export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"' >> ~/.zshrc
  echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc
  source ~/.zshrc
  ```
  Verify installation:
  ```sh
  java -version
  ```

- Install MySQL:
  ```sh
  brew install mysql
  ```
  Start MySQL service:
  ```sh
  brew services start mysql
  ```
  Verify MySQL installation:
  ```sh
  mysql -u root -p
  ```
  Secure MySQL installation:
  ```sh
  mysql_secure_installation
  ```

- Create the database and user:
  ```sh
  mysql -u root -p
  ```
  Enter the root password and execute:
  ```sql
  CREATE DATABASE infantem_db;
  CREATE USER 'spring_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';
  GRANT ALL PRIVILEGES ON infantem_db.* TO 'spring_user'@'localhost';
  FLUSH PRIVILEGES;
  EXIT;
  ```

- Build and run the backend:
  ```sh
  ./mvnw spring-boot:run
  ```

#### 3. Frontend Setup

- Install Node.js and npm:
  ```sh
  brew install node
  ```
  Verify installation:
  ```sh
  node -v && npm -v
  ```

- Install dependencies:
  ```sh
  cd frontend
  npm install
  ```

- Install Expo CLI:
  ```sh
  npm install -g expo-cli
  ```

- Start the development server:
  - For the web:
    ```sh
    npx expo start --web
    ```
  - For iOS (if you have Xcode installed and a simulator set up):
    ```sh
    npx expo start --ios
    ```
  - For Android (if you have an Android emulator set up with Android Studio):
    ```sh
    npx expo start --android
    ```

Running `npx expo start` without options will show the Expo developer tools where you can select the platform manually.

## Checking Everything Works

1. Start the backend and ensure it runs without errors (Default port is 8080).
2. Start the frontend and verify that it compiles successfully (Default port is 8081).
3. Open the app in a web browser, emulator, or physical device and check that it loads correctly.
4. Ensure that the frontend can communicate with the backend:
   - The `App` component in the frontend makes a request to `${apiUrl}/api/v1/example`.
   - If the backend is running correctly, the app should display:
     ```
     Backend is up and running! :D
     ```
   - If the connection fails, it will display:
     ```
     Failed to connect to the backend.
     ```
   - If the request is still in progress, it will display:
     ```
     Checking backend status...
     ```

## Contributing
If you have experience setting up the project on Windows or macOS, please help complete those sections! Feel free to update the README. 

