# QuantumBot API's

This project provides a collection of Firebase APIs located in the `functions/api/` directory. It allows you to perform various operations using Firebase services.

## Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/Justin-Connors/QuantumBot-API.git
  ```

2. Install dependencies:

  ```bash
  cd your-repo
  npm install
  ```

3. Set up Firebase:

  - Create a new Firebase project on the [Firebase Console](https://console.firebase.google.com/).
  - Create a firestore database
  - Run ```firebase deploy --only functions``` 
  - If you only want to deploy certain function(s) you can run 
  - ```firebase deploy --only functions:functionName, functionName, ect ..```

## Usage

To try out the project, follow these steps:

1. Start the development server:

  ```bash
  npm run serve
  ```

2. Make requests to the available API endpoints using tools like [Postman](https://www.postman.com/).

## API Endpoints

- Loom video showing API endpoints: [Video Link](https://www.loom.com/share/63cc7b9e5ed84942bf8832d349336795)

The following API endpoints are available:

- `/api/addMessage`: add's a message to the message collection of the chats collection
- `/api/createChat`: creates a chat in the chats collection
- `/api/getChat`: gets a chat from the chats collection
- `/api/logEvent`: logs events of the firestore database
- `/api/login`: logs-in a user
- `/api/logout`: logs-out a user
- `/api/sendMessage`: sends a message to the message collection
- `/api/userProfile`: gets the userId and returns the userId, email, and name
