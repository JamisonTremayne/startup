# Pixel Hoarder

[My Notes](notes.md)

Pixel Hoarder will be a simple web idle game that can be played be users. Players have to collect pixels that periodically appear on the screen, and get ways to automate their pixel gathering.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Pixel Hoarder is an epic web idle game! The game keeps track of users and progress that they have made, which they can make by gathering pixels! Gathering more pixels allows them to upgrade their graphics card, allowing for more and more pixels to appear, and eventually tools to help them become the Lord of Pixels! 

### Design

![Design image](pixelhoarderroughlayoutdesign.png)

### Key features

- Secure login over HTTPS
- Interactive UI for clicking pixels
- Progression system through shop
- Friend system through tribes
- Saved game progress through database storage
- Offline progress through time stamping

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Makes the structure of the application. Two web pages, one for logging in and one for gameplay.
- **CSS** - Stylization for UI and gameplay.
- **React** - Interactive UI elements, such as clicking on pixels, and also provides login and tribe display.
- **Service** - Backend service which includes the following endpoints:
    - Login
    - Pixel Clicking
    - Upgrade Purchase
    - Tribe Friend Requests
    - Tribe Pixel Gifting
    - Offline Progress Rewards
- **DB/Login** - Stores user data (including usernames, encrypted passwords, etc), authentication tokens for signed in users, and game data of the user (including time stamps, pixel amounts, and purchased upgrades)
- **WebSocket** - When friends within tribes reach certain milestones, notifications are sent to other members of the tribe. Additionally, when giving/receiving gifts from other players, involved members receive notifications.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://pixelhoarder.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I made HTML bases for Login, Register, Game, and Social pages.
- [x] **Proper HTML element usage** - I used proper HTML element usage (as far as I'm aware hopefully).
- [x] **Links** - I included links to navigate to other pages as well as to the Github repository.
- [x] **Text** - I used several instances of text being displayed to the pages.
- [x] **3rd party API placeholder** - I included a place for a random quote generator during the game, although I might change this idea when we come to it later.
- [x] **Images** - I included the main title of the game as an image.
- [x] **Login placeholder** - I made a login placeholder page and form, as well as one for registration.
- [x] **DB data placeholder** - I include buttons for login and registration that can update the database with user information, as well as include references to the player's pixel count, which would also be stored there.
- [x] **WebSocket placeholder** - I included a Social Page which currently is set up to show the top high-scores of players and update realtime, but the social page could also potentially include other things.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Visually appealing colors and layout. No overflowing elements.** - I spent a lot of time making sure things looked good, didn't overlap, and had a decent color scheme (but I'm also not an artist so maybe my judgement is off).
- [x] **Use of a CSS framework** - I used Tailwind to help with some of the formatting, especially for the text inputs for Login/Registration.
- [x] **All visual elements styled using CSS** - All visual elements have been styled using CSS.
- [x] **Responsive to window resizing using flexbox and/or grid display** - Testing wasn't extensive, but I did include flexboxes and grid displays in certain parts of the pages to help with adjusting window sizes.
- [x] **Use of a imported font** - I imported a font called *Pixelify Sans* and used it throughout my website.
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I used all of the listed types of selectors. I used element, class, and ID selectors many times, and I used pseudo selectors for some elements such as links and buttons to help with formatting hovering and clicking animations.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I bundled my startup project using Vite.
- [x] **Components** - I added components for my various pages and pieces of the project.
- [x] **Router** - I have routers set up so that my website is now a single-page application.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - I added functionality for all systems, or at least mocked them out if they weren't fully implemented. There is a mocked out Websocket functionality with random popup messages, mocked out authentication system that saves accounts to local storage, and mocked out saved progress also through local storage, but everything else is roughly fully functional. There are game mechanics that may want to continue to be fleshed out in the future.
- [x] **Hooks** - I used hooks throughout the project, including state and effect hooks regularly to keep track of variables, update them, and use intervals. 

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Node.js/Express HTTP service** - I made a Node.js/Express HTTP service.
- [X] **Static middleware for frontend** - I used middleware for displaying the static files in the frontend I think, my understanding of what this means might be a bit off.
- [X] **Calls to third party endpoints** - I called to the quote.cs260.click third party to get random quotes. Hopefully that one is worthy.
- [X] **Backend service endpoints** - I made backend service endpoints for all the endpoints I needed, including authentication endpoints, user data endpoints, and score endpoints.
- [X] **Frontend calls service endpoints** - I call the service endpoints from the frontend to get the appropriate data.
- [X] **Supports registration, login, logout, and restricted endpoint** - I have supported registration, login, logout, and restricted functionalities with endpoints from my backend server. Hurray.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Stores data in MongoDB** - I store user game data in MongoDB.
- [X] **Stores credentials in MongoDB** - I account information, as well as authentication tokens, in MongoDB.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
