# Changes

## Client

- The index page now fetches games released between 2015 and 2017.
- The index page shows 15 random games.
- Games are sorted by average rating in descending order by default.
- Added sorting option to switch between average rating and release date.
- Each game card now shows image, title, formatted release date, average rating with ratings count, and genre.
- The game detail page now shows title, description, large image, formatted release date, average rating, developer, genre, and reviews.
- Each review shows username, review text, and rating.
- Added a back button on the detail page.
- Cleaned the client code to use simpler syntax and easier variable names.

## Server

- Updated `gameController.ts` to accept `fromDate` and `toDate` query parameters.
- Added a release date filter in `gameController.ts` using `Op.between`.
- Updated `gameResolvers.ts` to accept `fromDate` and `toDate` in the games resolver arguments.
- Added the same release date filtering logic in `gameResolvers.ts`.
- Updated the GraphQL game query argument type to include `fromDate` and `toDate`.
