Hello team!

Welcome to my compact React app that enables searching for a GitHub user by their username.

I chose `Next.js` to create this app for several reasons:

- Next.js provides server-side rendering by default, which helps to avoid CORS errors.
- Next.js includes built-in support for CSS Modules, making it convenient to utilize this sophisticated approach to style components.
- Next.js features a straightforward file-system-based routing system, simplifying the creation of new pages and routes by merely adding new files to the 'pages' directory.
- Next.js is built by Vercel that provides an easy deploy on Vercel.

Additionally, I installed the following libraries:

- `SASS`, which enables the use of mixins and nesting within classes;
- `Jest`, along with all necessary environment libraries.

The app comprises two pages: the search page and the user details page.

The search page allows searching for any GitHub user. When a user is found and either the search button or the Enter key is clicked, the app redirects to the user details page. If the user does not exist, an error message appears below the search input.

The user details page displays the avatar, username, a link to the user's GitHub page, a back button, and a list of repositories. If a user has more than 10 repositories, pagination appears beneath the list. If the user does not have public repositories, a corresponding message is displayed on the page.

Usernames to test:

- with zero repos: 2;
- with three repos: kate;
- with many repos: yyx990803.

If a non-existent username is entered into the URL, the app redirects to a 404 page with a link to the search page.

The design is minimalistic and fully responsive. It features spinners as indicators to inform users that requests are being processed, hover effects over essential elements (applied only to the desktop version), and stylish pagination with dots to conceal extra pages.

I wrote tests for two large components, covering mock requests and conditional rendering, as well as for a significant function called 'generatePages' that creates an array of buttons for pagination.

If I had more time, I would:

- write tests for each component and function;
- implement error handling not only for cases involving non-existent users, but also for cases where requests to GitHub for specific repository pages return errors;
- introduce a dark theme;
- enhance the pagination functionality by adding ellipsis features, such as a dropdown for hidden pages or the ability to display the next range of pages by clicking on the ellipsis;
- implement some kind of a skeleton library instead on the spinner on the user details page to create a better visual representation for the user.

In order to maintain the compact nature of this app, I refrained from using some libraries that could have simplified the coding process, such as:

- `Classnames`, which enables passing two or more classnames to the className prop in a straightforward manner, reducing CSS repetitions;
- `Lodash`, which offers useful functions for working with arrays, such as range;
- `Axios`, which provides a more convenient way to handle requests.

## Getting Started

To set up this project, please follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using `yarn install`.
3. Create a GitHub Personal Access Token by following these steps:

- Go to your GitHub Settings > Developer settings > Personal access tokens.
- Click on "Generate new token."
- Provide a token description.
- Select the necessary scopes for your token ("repo", "user").
- Click "Generate token" and copy the generated token.

4. Create a `.env.local` file in the root of the project directory and add your GitHub access token as an environment variable: `GITHUB_ACCESS_TOKEN=your_access_token_here`
5. Launch the development server using `yarn dev`.

To run tests: `yarn test`

Thank you for testing and I really hope you will enjoy.

Have a great rest of the day!
