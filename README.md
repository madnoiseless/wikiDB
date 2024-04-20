# WikiDB Project README

This project is a web application built using the Node.js framework and MongoDB as the database. It utilizes the Express framework for routing and EJS for templating. The primary purpose of this application is to manage and manipulate articles within the WikiDB database.

## Prerequisites

Before running the application, make sure you have the following installed:

1. Node.js
2. npm
3. MongoDB

## Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory: `cd wikiDB`.
3. Install the dependencies by running `npm install`.
4. Create a MongoDB database named `wikiDB`.
5. Update the `mongoose.connect` line in `app.js` with your MongoDB connection string if needed.

## Running the Application

1. Start the MongoDB server.
2. Run the application by executing `node app.js` in your terminal.
3. The server will start running on port 3000. You can access the application through a web browser at `http://localhost:3000`.

## Features

The application provides the following functionalities:

1. **CRUD Operations on All Articles**:
	* GET `/articles`: Retrieve all articles from the database.
	* POST `/articles`: Add a new article to the database.
	* DELETE `/articles`: Delete all articles from the database.
2. **CRUD Operations on Specific Articles**:
	* GET `/articles/:articleTitle`: Retrieve an article with the specified title.
	* PUT `/articles/:articleTitle`: Update an article with the specified title.
	* PATCH `/articles/:articleTitle`: Partially update an article with the specified title.
	* DELETE `/articles/:articleTitle`: Delete an article with the specified title.

## Technologies Used

* Node.js
* Express
* MongoDB
* Mongoose (MongoDB object modeling tool)
* EJS (Embedded JavaScript templates)

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.