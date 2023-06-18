# Project setup

## Back-end setup

    Clone the project. Import maven project in intelij/eclipse. Run the project.

## Front-end setup

    Go in the front-end/react directory. Run npm install. Run npm start.

## Database setup

### Create a postgres database

docker run --name meetingapp -d --rm \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=123123 \
  -e POSTGRES_DB=meetingapp \
  -p 5432:5433\
  docker.io/postgres:13.4

### Enter the database

Enter the container using the docker interface. In the terminal execute: psql -U postgres

### Create tables

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
user_uuid VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    session_token VARCHAR(255),
    email VARCHAR(255) NOT NULL,
	image_url VARCHAR(255),
    pwd VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS meetings CASCADE;
CREATE TABLE meetings(
    meeting_uuid VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
    meeting_date DATE DEFAULT CURRENT_DATE,
    meeting_time TIME DEFAULT CURRENT_TIME,
    meeting_location VARCHAR(255),
    description VARCHAR(255),
    invite_token VARCHAR(255)
);

DROP TABLE IF EXISTS meetinguserconnections CASCADE;
CREATE TABLE meetinguserconnections(
	id INT,
    connection_id SERIAL NOT NULL UNIQUE,
    is_owner boolean NOT NULL DEFAULT false,
    user_uuid VARCHAR(255) NOT NULL REFERENCES users(user_uuid) ON DELETE CASCADE,
    meeting_uuid VARCHAR(255) NOT NULL REFERENCES meetings(meeting_uuid) ON DELETE CASCADE,
    CONSTRAINT muc_pk PRIMARY KEY(user_uuid,meeting_uuid)
);

DROP TABLE IF EXISTS meetingcomments CASCADE;
CREATE TABLE meetingcomments(
    comment_id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    comment_content VARCHAR(255) NOT NULL,
    user_uuid VARCHAR(255) NOT NULL REFERENCES users(user_uuid) ON DELETE CASCADE,
    meeting_uuid VARCHAR(255) NOT NULL REFERENCES meetings(meeting_uuid) ON DELETE CASCADE
);

-- USER SEED
INSERT INTO users(user_uuid,first_name,last_name,is_admin,email,pwd) VALUES('1admin1','Test','Admin',True,'ad@abv.bg','$2a$10$9NJul0512jUPAG1afkwfw.VHFDKHEBZuIbf8.noen0BACrWcv03u6');
INSERT INTO users(user_uuid,first_name,last_name,is_admin,email,pwd,image_url) VALUES('2','Michael','Scott',False,'michael.scott@office.com','$2a$10$.l5es2w3.tkO5HUKnF9KHOUHBq4zsJLx90IrgVB6iMZY9ESzM5rtC','https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/MichaelScott.png/220px-MichaelScott.png');
INSERT INTO users(user_uuid,first_name,last_name,is_admin,email,pwd,image_url) VALUES('3','Jim','Halpert',False,'jim.halpert@office.com','$2a$10$.l5es2w3.tkO5HUKnF9KHOUHBq4zsJLx90IrgVB6iMZY9ESzM5rtC','https://decider.com/wp-content/uploads/2017/11/jim-halpert.jpg?quality=75&strip=all&w=646&h=431&crop=1');
INSERT INTO users(user_uuid,first_name,last_name,is_admin,email,pwd,image_url) VALUES('4','Pam','Beesly',False,'pam.beesly@office.com','$2a$10$.l5es2w3.tkO5HUKnF9KHOUHBq4zsJLx90IrgVB6iMZY9ESzM5rtC','https://pbs.twimg.com/profile_images/1550486343641333761/J5gT8cvf_400x400.jpg');
INSERT INTO users(user_uuid,first_name,last_name,is_admin,email,pwd,image_url) VALUES('5','Dwight','Schrute',False,'dwight.schrute@office.com','$2a$10$.l5es2w3.tkO5HUKnF9KHOUHBq4zsJLx90IrgVB6iMZY9ESzM5rtC','https://www.myany.city/sites/default/files/styles/scaled_cropped_medium__260x260/public/field/image/node-related-images/sample-dwight-k-schrute.jpg?itok=8TfRscbA');

-- MEETING SEED
INSERT INTO meetings(meeting_uuid, meeting_location,description,invite_token) VALUES('1','The office', 'A normal work meeting', 'TheOffice');

-- MUC SEED
INSERT INTO meetinguserconnections(id,is_owner,user_uuid,meeting_uuid) VALUES(1,true,'2','1');
INSERT INTO meetinguserconnections(id,is_owner,user_uuid,meeting_uuid) VALUES(2,false,'3','1');
INSERT INTO meetinguserconnections(id,is_owner,user_uuid,meeting_uuid) VALUES(3,false,'4','1');
INSERT INTO meetinguserconnections(id,is_owner,user_uuid,meeting_uuid) VALUES(4,false,'5','1');


### Setup connection

Go in application.properties in the back-end project and setup the correct values for your database.

Example: 

spring.jpa.hibernate.ddl-auto= update

spring.datasource.url=jdbc:postgresql://localhost:5433/meetingapp
spring.datasource.username=postgres
spring.datasource.password=123123
spring.jpa.properties.hibernate.dialect= org.hibernate.dialect.PostgreSQLDialect
server.error.whitelabel.enabled=false
