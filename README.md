# FINAL PROJECT - BIRD WATCHERS (FÅGELSPANARNA)

This is a mob-programming project that was made as the final project of Technigo Boot camp spring 2021. The project has been developed by [Anna Lenksjö](https://github.com/annalenksjo), [Elle Frankenberg](https://github.com/ElleFrankenberg) and [Tobias Hagberg](https://github.com/TobiasHagberg). 


The project is a fullstack application mainly targeted towards kids, and the purpose is to "collect" birds they have seen. The user must create an account/log in to get to their profile where the birds are collected. To collect a new bird the user goes to the page "Fågelbiblioteket" (bird library) to search for and add a bird. There is also a top list to see other users and a possibility to go to their profiles. 

## The process

We started out by making a detailed wire frame on **Figma** for the overview of all functionality and design in different devices. With this base we could plan and determine which pages, components, and endpoints we would need. We started by setting up most of the backend to have it in place before we added the frontend functionality. With this in place we started to create basic components and structure the pages. 

We put a lot of time in to the design, both in planning and executing. We chose not to use any design libraries to be able to customize the design. The design is made with styled components.

During the project we worked continuously with **Trello** for keeping track of tasks and for planning.

In the end of the project we went all of the code to make sure it was consistent and functional, and did a general clean up of the code. 
The application is responsive and tested in Chrome, Firefox & Safari.

Illustations made by [August Florén](https://augustfloren.portfoliobox.net)


###  Technological stack

- Frontend in React, Redux 
- Backend in Node.js, Express.js
- MongoDB database
- Mongoose
- Bcrypt
- Navigation using React Router

###  Other tools

- Trello
- Figma
- Postman
- Cloudinary


## View it live

### Frontend application
https://fagelspaning.netlify.app/


### Deployed API
https://final-project-elle-anna-tobias.herokuapp.com/

**OPEN ENDPOINTS**
0	
path	"/"
methods	"GET"

1
path	"/register"
methods "POST"

2
path	"/login"
methods "POST"

**AUTHENTICATED ENDPOINTS**
3	
path	"/birds"
methods	"GET"   "POST"

4	
path	"/birds/:_id"
methods	"GET"

5
path	"/users"
methods	"GET"

6
path	"/users/:_id"
methods	"GET"	"DELETE"

7
path	"/users/:_id/addbird"
methods	"POST"

