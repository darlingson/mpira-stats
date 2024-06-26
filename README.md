## Malawi Football Stats Web App with Express & TypeScript

This project is aimed to serve as a playground for mastering backend development. The project will be built using Express.js as the backend server, Appwrite as the production database, SQLite as the development environment database, and TypeScript as the development language.

### Project Goals

* Master backend development using Express and TypeScript.
* Develop a RESTful API to serve Malawian football stats using Appwrite.
* Develop an API following industry best practices for API design and implementation. including but not limited to:
    * **RESTful principles:** Utilize RESTful design patterns for a well-structured and predictable API. This involves using clear resource URLs, standard HTTP verbs (GET, POST, PUT, DELETE), and JSON data format.
    * **Descriptive naming:** Employ clear and consistent names for API endpoints, parameters, and responses to enhance developer understanding.
    * **Comprehensive documentation:** Provide thorough API documentation that includes clear explanations for each endpoint, code samples, usage scenarios, and error handling details.
    * **Robust error handling:** Implement informative error messages with appropriate HTTP status codes to guide developers in troubleshooting API interactions.
    * **Security considerations:** Enforce security measures to protect your API from unauthorized access and potential vulnerabilities. This may involve authentication, authorization, and data validation techniques.

### Prerequisites

* Node.js and npm installed ([https://nodejs.org/en/learn/getting-started/how-to-install-nodejs](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs))
* An Appwrite server with a database ([https://appwrite.io/](https://appwrite.io/))
* SQLite database (optional, for development) - [https://www.sqlite.org/](https://www.sqlite.org/)

### Technologies Used

* **Express:** Web framework for Node.js to handle API requests and responses ([https://expressjs.com/](https://expressjs.com/))
* **TypeScript:** Adds static typing to JavaScript for improved code maintainability ([https://www.typescriptlang.org/](https://www.typescriptlang.org/))
* **Appwrite:** Open-source backend server to handle database operations ([https://appwrite.io/](https://appwrite.io/))
* **SQLite** (optional): Lightweight SQL database for development ([https://www.sqlite.org/](https://www.sqlite.org/))

### Development Workflow

* Develop the API using Express and TypeScript, adhering to RESTful principles and industry best practices.
* Implement environment-specific configurations to use Appwrite in production and SQLite (optional) in development.
* Build the user interface to display the retrieved football stats in a clear and interactive manner.
* The API should be accessible to developers for programmatic interaction.
* The user interface should be accessible through a web browser for users to explore the football stats.


### Running the Application

* **Development:**
  * Run the API server:
    ```bash
    npm run start:dev  # (or similar script)
    ```
* **Production:**
  * Configure and deploy the API server and the built frontend assets to a suitable hosting environment.
