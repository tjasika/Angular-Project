# Tjaša's Angular App
A single-page Angular application that connects to an API to manage users and absences.


### Features
* Authentication with client credentials
* Users page with search, sort and absence management
* Absences page with date navigation
* Settings page for API configuration

### How to run the app
Locally:
```
npm install
ng serve --open
```

Using Docker:
* On Linux: `sudo docker compose up --build`
* On Windows: `docker compose up --build`
  
Then open `http://localhost:4200`

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.7.
