# Test automation - Playwright

## About

This repository demonstrates my expertise in writing automated tests using **Playwright**. The main objective of this project is to highlight my ability to design, implement, and execute robust tests for web applications. Through this project, I showcase my proficiency in test automation and my understanding of best practices for ensuring web application quality.

## Test Architecture

This repository follows a modular architecture to maintain test readability and reusability. Key components include:

-   **flow** - includes user interactions for specific pages or workflows,
-   **pages** - contain page objects that interact with elements on specific pages,
-   **src** - the root folder containing core components like configuration, helpers, factories, data, enums and interfaces,
-   **test files** - groups tests by features or modules.

## Tests list:

### userManagement.spec.ts

-   **Register a new user via UI** - test navigates to the homepage, redirects to the registration page, verifies the visibility and attributes of elements, then completes the form to register a user.

-   **Login with a registered user** - test navigates to the homepage, redirects to the login page, verifies the visibility and attributes of elements, fills the login form with user credentials, submits the form, and verifies the account page content, including the user ID in the URL.

-   **Delete registered user with API** - test authenticates the user via API, checks if the user exists, deletes the user using API requests, and verifies that the user has been successfully removed from the database.

## Setup and running tests

1. Clone this repository: `git clone https://github.com/Barto52/test-automation-playwright.git` or download as a ZIP file.
2. Install dependencies: `npm install -D`.
3. Install Playwright browsers: `npx playwright install`.
4. Download GAD 2.7.9 from [official GAD repo](https://github.com/jaktestowac/gad-gui-api-demo).
5. Navigate to the GAD folder, open CMD.
6. Run the command `npm run start` to launch the GAD application.
7. Run tests: `npx playwright test`.
