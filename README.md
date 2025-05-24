# FED1-exam-Nirush (Lens of Wanderlust 📸)

# Goal 🥅

To apply and enhance the skills gained throughout the Front-End Development - 1 program by creating a fully functional and responsive web application. This project will involve interpreting a brief, planning an effective solution, designing an intuitive user interface, and building the application using the following technologies and methodologies: HTML, CSS, Vanilla JavaScript, and project management best practices. The project will focus on delivering a polished and tested user experience that showcases our ability to design, develop, and optimize a modern, responsive website.

## Restrictions 🚫

You may only use HTML, CSS and JavaScript – no CSS or JavaScript Frameworks are permitted in this project (this includes Tailwind, Bootstrap, Vue, Svelte, React and similar packages).

## Brief 💼

You have been hired to build a front-end user interface for an existing API blogging application. The client has asked for a responsive web application that allows users to view dynamic blog posts. You will use your own account that you create to act as the owner to test the functionality. When you submit the project, your client needs to be able to register, login and manage their blog posts.

## Project Overview 📝

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum orci eu lacus facilisis, at aliquam libero interdum. Fusce vel ullamcorper odio, eu dapibus purus. Curabitur et nisi vitae libero mollis viverra sit amet non mi. Sed eget velit sed nulla laoreet posuere in sit amet sapien. Proin pharetra augue quis ante egestas, vel scelerisque nunc vehicula. Sed condimentum lacinia libero sit amet maximus. Vivamus et mi sit amet leo aliquam luctus eget a sapien. Donec ornare dui vel purus aliquam, ut gravida nunc tempor. Aliquam erat volutpat. Etiam laoreet ligula leo, ac venenatis libero pretium ut. Quisque et magna nec metus euismod tristique ut ut felis.

## Pages and User Stories 🙋🏼‍♂️

### Blog Feed Page - GET /blog/posts/<name>

/index.html

The Blog Feed Page needs to consist of a carousel and a list of at least 12 posts.

- As a user, I want to see an interactive banner carousel on the blog feed page, so that I can view a rotation of the 3 latest posts.
- As a user, I want to click on the previous or next button in the carousel to animate and reveal another post, to ensure I can see different posts easily.
- As a user, I want the carousel to return to the first post after reaching the end of the list, and vice versa when clicking previous on the first post.
- As a user, I want to click on a button for each carousel item, taking me to the blog post page to read more.
- As a user, I want to view a list of the 12 latest posts in a responsive thumbnail grid on the blog feed page, so I can easily select which post to read.
- As a user, I want each thumbnail image in the blog post feed to be clickable, taking me to the blog post page to read more about that specific blog post.

### Specific Blog Post Page - GET /blog/posts/<name>/<id>

/post/index.html

The Specific Blog Post Page features more details about a specific blog post that was navigated to from the thumbnail of the Blog Feed Page.

- As a user, I want to see a responsive layout showing the post’s title, author, publication date, image banner, and main content fetched from the API.
- As a user, I want each specific blog page to have a “share” icon that has shareable URL including a query string or hash parameter that contains the post ID, so I can share the post with others easily.

### Create Blog Post Page - POST /blog/posts/<name>

/post/create.html

The Create Blog Post Page features a form that accepts inputs from the owner in order to create a blog post.

As the owner, I want the blog post create page to be available only when logged in, to ensure no unauthorized blog posts are created.
The blog post form needs to accept a title, body and media inputs and be visible on the Blog Feed Page once created.

### Blog Post Edit Page - PUT /blog/posts/<name>/<id>

DELETE /blog/posts/<name>/<id>

/post/edit.html

The Blog Post Edit Page features a form that gives an owner the ability to edit or delete a post.

- As the owner, I want the blog post edit page to be available only for me when logged in, to ensure no unauthorized edits or deletions can be made to my posts.
- As the owner, I want a delete button on the edit form that sends a DELETE request to the API for this post ID on the edit page, so I can easily remove my post if needed.
- As the owner, I want a validated edit form that allows me to update the title, body content, or image by sending a POST request to the API for this post ID, ensuring I can keep my posts up to date easily.

### Account Login Page - POST /auth/login

/account/login.html

- As the owner, I want a validated login form that allows me to request and save a token to my browser by entering my email and password, allowing me to manage posts.

### Account Register Page - POST /auth/register

/account/register.html

- As the owner, I want a validated register form that allows me to create a new account by entering my email and password.

## Resources

- [Mobile Design](https://squarepumpkin.netlify.app/)
- [Desktop Design](https://squarepumpkin.netlify.app/)
- [Production deploy](https://squarepumpkin.netlify.app/)
- [Deployment CI](https://app.netlify.com/sites/squarepumpkin/overview)

## Features

- SEO friendly
- Responsive
- Prebuilt components
- E2E testing with every pull request

### Production

Production is the enviromewnt the end-user experience. This is the final product that will be deployed to the public. This enviroment is hosted on Netlify.

### Staging

Staging is the enviroment where the team can test the latest features and bug fixes. This enviroment is hosted on Vercel.

## Built with 🏗️

<img src="/image/html-logo.png" width="50" height="50"> <img src="/image/css-logo.webp" width="50" height="50"> <img src="/image/js-logo.png" width="50" height="50">

## Testing and debug: 🧪

- https://validator.w3.org/
- https://wave.webaim.org/

# Required Software

Git: Version control system for tracking changes and collaborating. Download from git-scm.com.
Visual Studio Code (VS Code): Recommended code editor for its extensive support for JavaScript development. Download from code.visualstudio.com.

## Dependencies in use:

- [Prettier](https://prettier.io/) - An opinionated code formatter

## Contact 📬

[LinkedIn](https://www.linkedin.com/in/nirushan-rajamanoharan-056765209/)

## Authors ✍🏽

- Nirushan Rajamanoharan (@Nirush4)
