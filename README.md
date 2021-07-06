# Starwars
## Problem Statament
Server:
- You should develop an Apollo GraphQL API
- Your GraphQL API should wrap the Star Wars API (https://swapi.dev/)
- Your GraphQL API should have a Query type that resolves all People
(https://swapi.dev/api/people/), but only the Person's details (name, height,
mass, gender, homeworld).
- The People Query should cater for pagination, you will notice the next
property in the response. When given a page number, the respective People
page should be returned (i.e. https://swapi.dev/api/people/?page=2)
- Your GraphQL API should have a Query type that resolves (searches for) a
particular Person People) given their name (i.e. https://swapi.dev/api/people/?
search=Anakin Skywalker)

Client:
- You should develop a React Single Page App SPA
- Your SPA should consume the above GraphQL API
- Your SPA should have a Home page listing the first page of People as queried
from the above GraphQL API.
- Additionally there should be pagination implemented allowing for a particular
People page to be Queried when a page number is selected
- When a Person is clicked on, a Detail page outlining the Person's details
should be displayed, in a thoughtful (styled) manner.
Fullstack Engineer Test SW/React/Node) 3
- The User should be able to navigate back to the Home page to the previously
active People page from the Detail page

## Resources
Star Wars API (https://swapi.dev/)

Prerequisites
- NodeJS installed
- Npm/yarn Installed
- Good Internet to retrieve data from Star Wars API (https://swapi.dev/)


## Getting Started
A step by step guide on how to test this project locally

- Clone this repo to your computer locally

```
git clone https://github.com/jomasim/starwars 
 ```
```
cd starwars
```

- Install the all dependencies
``` 
yarn 
```
- Start/Run 
```
yarn dev
```
- On your favorite browser, navigate to http://localhost:1234)


## Live Demo(Heroku)
https://starwarpp.herokuapp.com/

## Tools Used
- Apollo GraphQL server
- Apollo GraphQL client
- React
- NodeJS
- Typescript
- Styled components