# Assessment app for KNOLSKAPE

## For local setup

### Steps
1. git clone https://github.com/ayusho/knolskape-app.git

2. npm i

3. npm run dev

Note: Keep the mongodb service running before running the application, for development instance, sample data will be seeded on the server start.
Please keep in mind that you need to pass an id in URL for POST/PUT/Delete requests as is mentioned in the API references. 
For eg. http://knolskape.herokuapp.com/api/student/5d6029772a286b0017b05bff/submit

### Rest API collection reference
POSTMAN Link: https://www.getpostman.com/collections/9c7b9f1ce012d85b4797

DB Design schema:
Link: https://github.com/ayusho/knolskape-app/blob/master/docs/db.json

#### Assumptions:

1. Role based authentication and authorisation for the APIs out of scope. 
2. DB schema was designed adhering to the assignment document requirements and doesn't cover all the complex scenarios.
3. Unit tests were not covered in this assignment.
4. Dockerfile is written but application not dockerised because of system insufficiency. (Windows Home)

