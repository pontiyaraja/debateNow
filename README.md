# RESTful-Web-Services-with-Node.js-and-Express

### 01. What Is REST

    npm install express --save
    npm install gulp -g
    npm install gulp-nodemon --save
    gulp


### 02. Getting Data | 02_02-Implementing HTTP Get

http://localhost/api/user/


### 02. Getting Data | 02_03-Wiring up to MongoDB and Mongoose

    npm install mongoose --save

http://localhost/api/user/


### 02. Getting Data | 02_04-Filtering with the Query String

http://localhost/api/user?username=pontiya


### 02. Getting Data | 02_05-Getting a Single Item

http://localhost/api/user/{id}


### 03. Posting Data | 03_02-Using Bodyparser

    npm install body-parser --save

### 03. Posting Data | 03_03-Testing with Postman

POSTMAN

POST -> localhost:8080/api/user/

Content-Type: Application/json

raw

    {
        "username": "ponting1",
	"password": "hellboy",
	"email": "ponting@pand.in",
	"phone": "9787867894",
	"firstName": "pontingR",
	"lastName": "raja",
	"fbId": "pontiya"
    }


### 03. Posting Data | 03_04-Saving Data

Same on the previous step and:

POST -> localhost/api/user/553f67eeccaee53c0501de36


### 03. Posting Data | 03_05-Code Cleanup


### 03. Posting Data | 03_06-Injecting Our Model


### 04. Updating Data | 04_02-Implementing Put


PUT -> localhost/api/user/553f67e1ccaee53c0501de35

Content-Type: Application/json

    {
	"username": "ponting1",
	"password": "hellboy",
	"email": "ponting@pand.in",
	"phone": "9787867894",
	"firstName": "pontingR",
	"lastName": "raja",
	"fbId": "pontiya"
    }


http://localhost/api/user/


### 04. Updating Data | 04_03-Testing Put

### 04. Updating Data | 04_04-Middleware

### 04. Updating Data | 04_05-Implementing Patch

### 04. Updating Data | 04_06-Testing Patch

PATCH -> localhost/api/user/553f67e1ccaee53c0501de35

Content-Type: Application/json

    {

        "userName": "Pan"
    }


GET -> localhost/api/user/553f67e1ccaee53c0501de35


### 04. Updating Data | 04_07-Implementing Remove


DELETE -> localhost/api/user/553f67e1ccaee53c0501de35



### 05. Testing | 05_01-Introduction

Unit Testing -> mocha  
Integration Tests -> supertests  

### 05. Testing | 05_03-Postman and Bugs


### 05. Testing | 05_04-Unit Tests with Mocha

    npm install gulp-mocha should sinon --save


### 05. Testing | 05_05-Gulpmocha

    gulp test


### 05. Testing | 05_06-Integration Tests with Supertest

    npm install supertest gulp-env --save
    gulp test

### 06. HATEOAS | 06_02-The Problem Around Navigating APIs

### 06. HATEOAS | 06_03-Adding Hypermedia to Our API
