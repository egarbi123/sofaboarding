# README

[SofaBoarding](https://sofa-boarding.herokuapp.com/)

### Summary

[SofaBoarding](https://sofa-boarding.herokuapp.com/) is single-page web application which allows users to:

* Create an account
* Upload a photo for personalization
* Find and connect with new friends
* Have live chat sessions with friends
* Plan events and invite friends to these events

### Struture

#### Back End
SofaBoarding was build with Ruby on Rails using a postgreSQL database.  Requests are sent to the database using AJAX, and responses are sent back as JSON via jbuilder.  Images are stored and uploaded using AWS.  For live chat capability, Action Cable integrates WebSockets for a direct and immediate connection between users.

#### Front End
The front end to this single page web application is built with React for quick rendering and Redux to maintain global state.

### Technology used

* React.js - Front-end rendering
* Redux - Front-end global state management
* BCrypt - User authentication / password protection
* ActionCable - Live chat capability

