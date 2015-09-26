# Voteplex #

### Simple Full Stack JavaScript MEAN App  
for [freeCodeCamp](http://www.freecodecamp.com) **basejumps**.

This is a simple **Polling App**, where you can create, vote, and share Polls and Surveys with your friends.
It is build using [yeoman angular-full-stack](https://github.com/DaftMonk/generator-angular-fullstack) generator.

You can check the running project here: http://vote-plex.herokuapp.com/.

#### Features

* Custom Logo
* Paginated polls explorer
* Pages sorting by date/popularity
* Facebook, Twitter, Google+ share buttons
* URL friendly human-readable permalink, with unique short id
* Animated Charts

#### Note

I arbitrarily decided to fulfill the requests from **Bonus User Story #1** only partially.

I tried to model this app to be simple, but as close as possible to a *Real World* project.
In my opinion, a serious polling service should allow voting to authenticated users only, and only
a single time. So I decided to force the unauthenticated users to login/subscribe to vote, and tracked them.
