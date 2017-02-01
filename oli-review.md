# Code Review for Stephanie Tan

## Project Repo

[Github](https://github.com/Stephanietan/project-2-starter)
[Hosted on Herokuapp](http://sojour.herokuapp.com)

## Review

#### Project Purpose

GA SG WDI Project 2

#### Project Organization

#### Features

* Feature 1: Journal Post Crud.
  * User can create, view, update and delete their own journals. Users can also view journals by other users.
* Feature 2: User authentication.
  * Author can update and delete their posts. Non-authors can't as ejs views checks whether req.user matches blog post author and displays the update and delete buttons accordingly.
* Feature 3: Logged in users are able to comment on other posts.
  * Users can comment on theirs and other authors' journals. They can check their posted comments which is displayed on a separate page.

#### Areas of Success (Code, Organization)

* Organization
  * Centralized router to keep controllers organized
* User interface
  * Straightforward and self-explanatory!

#### Areas for Improvement (Code, Organization)

* Code
  * Linter errors :)
  * Optional: user authentication in views/controllers/both based on your preference.  
* Views
  * Use EJS and partials to reduce the number of view files and in the spirit of keeping code DRY.
  * More accurate naming of view files
* Public folder
  * Store CSS file in public folder

## Additional Notes

Your project is in a good place to welcome more add-ons so i'm looking forward to your profile avatar function etc. :)
