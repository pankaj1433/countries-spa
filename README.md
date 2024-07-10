# Countries SPA

Countries Single-Page Web Application using React that interacts with the REST Countries API
(https://restcountries.com/).

- The application allow users to view a list of countries and their details
- Additionally, users can search for countries by name, language, or currency, all within a single page.
- Users can also mark countries as their favorites.

## Deployed At

https://pankaj1433.github.io/countries-spa/

## Install Dependencies

### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm format`

Runs prettier to format the code

## Requirements

- Build the frontend of the application using React to create a seamless single-page experience.
- Utilize the REST Countries API (https://restcountries.com/) to fetch the list of countries and their details.
- Display a list of countries on the page, showing their name, flag, and basic information like population,
  language(s), and currency/currencies.
- Implement a search functionality that allows users to search for countries by name, language, or currency
  without triggering a page reload.
- Use Ag-Grid to display the list.
- Display the search results in a list format, showing relevant information for each country, all within the same
  page.
- Allow users to view the full details of a country when clicking on row, without navigating to a separate page.
- Implement a favorites feature that allows users to mark countries as favorites and view their list of favorite
  countries.
- Use local storage to persist the user's favorite countries between page reloads.
- Add appropriate error handling for cases like API failures or invalid requests.

## Optional Requirements

- Implement pagination for the list of countries, showing a limited number of countries per page, but ensure it
  remains a single-page application.
- Include sorting options for the list of countries, e.g., sort by name, population, or currency.
- Add a feature to filter countries based on various criteria, e.g., filter by language or currency.
- Style Ag-Grid for visual appeal and usability
