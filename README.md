# Tjaša's Angular App
A single-page Angular application that connects to an API to manage users and absences.


### Features
* Authentication with client credentials
* Users page with search, sort and absence management
    * View user and absence details in modals
    * Filtered to display only users with "valid" alphanumeric names
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
  
Wait a couple of minutes, then open `http://localhost:4200` - first time users will be prompted to enter their API credentials.

### Possible improvements
* Add pagination for large user lists
* Add form validation when adding users and absences

### Notes
This was my first Angular project — coming from a React background, I found the concepts familiar but the framework conventions were an interesting challenge to get used to.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.7.
