# Oregon-In-Tents
A place for people to review Oregon Campgrounds

[Click Here for the live site](https://oregon-in-tents.herokuapp.com/)

Vistors can sign-up to become users. Users are able to add, edit and delete campgrounds. Users can also comment on campgrounds. This is intended to be a social site for people to discuss their favorite campgrounds around the beautiful state of Oregon. 

As you'll see, the front-end is still a little bit ugly as I've only minimally styled it with Bootstrap. The main focus of this project was playing around with back-end technologies.

---

### Front-End
* HTML/CSS
* Bootstrap

### Back-End
* Node.js
  * Express
    * body-parser - middleware to parse `req.body`
    * connect-flash - middleware to flash messages to the user
* Passport - authentication middleware
* MongoDB - noSQL database
  * Mongoose - object modeling
  * mLab - mongoDB hosting
