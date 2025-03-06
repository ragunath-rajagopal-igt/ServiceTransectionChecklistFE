
# Project & Prerequisties Sotware

Name: ACTs

Technology Used:

Angular v19, NgModule, LazyLoading

Prerequisites:

    •	Node LTS
    •	nodejs
    •   mongodb
    •	Visual Studio
        o	ESLint Extension
        o   SonarLint

## Installation

  Install the necessary global packages:

  ```
  npm install -g @angular/cli
  
  ```
Clone the repository and navigate to the project directory:

## Front-end

```
  git clone "repo_url"
  cd pacts-admin
  npm install
```
Start the application on the web

```
ng serve
```

#### Update the Backend App Url in environment file:

    pacts-admin/src/environments/environtment.ts // for Dev

    pacts-admin/src/environments/environtment.prod.ts // for Prod

```
export const environment = {
  appVersion: packageInfo.version,
  production: false,  
  apiUrl: 'http://localhost:3000/api', # Update your service url here
};
```



Start the application on the web

```
npm run dev
```


Build the application on the web

```
ng build --configuration production // After successfull build, you can find a newly created folder "acts" with files
```
