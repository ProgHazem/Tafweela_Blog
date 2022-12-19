# Api Blog Tafweela with Adonis V5 With Typescript
## First Adonis structure is MVC. I Changed this some cycle for this structure.
- covert MVC To Modules.
- Used JWT in Authentication instated of opaque access token.

## This Api Blog contains 3 Modules
1. Auth Module
2. Role Module
3. Post Module

### I used Middleware, ORM Lucdia, Create Command for Create Module for what i need, used bouncer for create policy for module, used relations in models. Validators, Hashing, handling Exceptions, used Strategies for changing in model serialization finally making Testing. 

## To Run This project I used node v14.17.5
- `npm run install`
- `npm run dev` use this link for baseURL http://localhost:3333/api/v1/
- `npm run test`

## use this collection for apis in this project `Tafweela Api.postman_collection.json`
