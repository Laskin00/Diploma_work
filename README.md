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

### Create tables

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
user_uuid VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    session_token VARCHAR(255),
    email VARCHAR(255) NOT NULL,
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
    connection_id SERIAL NOT NULL UNIQUE,
    is_owner boolean NOT NULL DEFAULT false,
    user_uuid VARCHAR(255) NOT NULL REFERENCES users(user_uuid),
    meeting_uuid VARCHAR(255) NOT NULL REFERENCES meetings(meeting_uuid),
    CONSTRAINT muc_pk PRIMARY KEY(user_uuid,meeting_uuid)
);

DROP TABLE IF EXISTS meetingcomments CASCADE;
CREATE TABLE meetingcomments(
    comment_id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    comment_content VARCHAR(255) NOT NULL,
    user_uuid VARCHAR(255) NOT NULL REFERENCES users(user_uuid),
    meeting_uuid VARCHAR(255) NOT NULL REFERENCES meetings(meeting_uuid)
);

INSERT INTO users(user_uuid,first_name,last_name,is_admin,email,pwd) VALUES('1admin1','Admin','Admin',True,'ad@abv.bg','$2a$10$9NJul0512jUPAG1afkwfw.VHFDKHEBZuIbf8.noen0BACrWcv03u6');

### Setup connection

Go in application.properties in the back-end project and setup the correct values for your database
