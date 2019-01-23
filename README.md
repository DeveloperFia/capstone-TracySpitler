> **Capstone Node Base Repo**
> Below are various sections of content that will need to be filled for various milestones. Fill out what you can now, and enhance this content later.


# [SetList]

SetList is a web app that provides guitar players, novice and experienced alike, with the ability to look up chords on the fly, save songs to specific lists of their creation, play along with a metronome to perfect their timing, and hone their skills to play the songs they love with practice sessions based on customized goals.

## Quick Links

* [Staging Server Link](https://ts-capstone-setlist-staging.herokuapp.com/start)
* [Live Server Link](https://ts-capstone-setlist-live.herokuapp.com/start)
* [Full Project Spec](./docs/readme.md)

## Installing

Clone the repo:

```
$ git clone https://github.com/FullSail/capstone-TracySpitler.git
```

### Prerequisites

__Packages and services needed to run this repo's codebase and commands to install them.__

_Install from link:_

* [Node](https://nodejs.org/en/) (v10.12.0)
* [NPM](https://www.npmjs.com/get-npm) (6.4.1)
* [Git](https://git-scm.com/) (2.13.1)

_Check installation versions:_

```
$ node -v
```
```
$ npm -v
```
```
$ git --version
```

_Install from terminal or command line:_

* [Nodemon](https://nodemon.io/) (1.18.4)

```
$ npm install -g nodemon
```

_Database (For Mac: you must have Homebrew installed first. For Windows: download MongoDB from the link.)_
* [Mac Install Tutorial](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
* [Homebrew](https://brew.sh/) (1.8.0)
* __[MongoDB](https://www.mongodb.com/)__

### Development Environment

After cloning the repo, cd into project folder

```
$ cd capstone-TracySpitler
```

Install npm (this will also install dependencies)

```
$ npm install
```

Set up the environment variables

_.env_

```
MONGO_HOST=localhost
MONGO_DATABASE=setlist
```

Start the server

**_with Nodemon:_**

```
$ nodemon bin/www
```

_Terminal output:_

```
your@computer:~$ nodemon bin/www
[nodemon] 1.18.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node bin/www`
Server running on: 3000
DATABASE CONNECTED SUCCESSFULLY
```

**_with NPM:_**

```
$ npm start
```

_Terminal output:_

```
your@computer:~$ npm start
Server running on: 3000
DATABASE CONNECTED SUCCESSFULLY
```

__The site is now available in your browser at localhost:3000__

## Live Deployment with Heroku

Set up a MongoDB database or use a service like [mLab](https://mlab.com/)

Log in or sign up with [Heroku](https://www.heroku.com/)

Create an app for the both the staging (release) and master branches. (_You can create a [pipeline](https://devcenter.heroku.com/articles/pipelines) for auto deployment_)

Under the ```Settings``` tab, set the necessary config vars:
```
MONGO_HOST
MONGO_DATABASE
SECRET
```

*__Using mLab:__*

The Mongo URI will look like this: mongodb://<dbuser>:<dbpassword>@ds151814.mlab.com:51814/setlist-staging

_Examples:_

* ```MONGO_HOST``` would equal ```<dbuser>:<dbpassword>@ds151814.mlab.com:51814```
* ``` MONGO_DATABASE``` would equal ```setlist-staging```
* ```SECRET``` needs to be a secure and randomized string.

Under the ```Deploy``` tab, connect to GitHub and set and up the respective branch deployment.

For the initial deployment, you can push a change to your staging (release) or master branch, or manually deploy a branch on Heroku.

__Your app should now be up and running on Heroku__

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
