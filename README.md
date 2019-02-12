# [SetList]

SetList is a web app that provides guitar players, novice and experienced alike, with the ability to look up chords on the fly, save songs to specific lists of their creation, play along with a metronome to perfect their timing, and hone their skills to play the songs they love with practice sessions based on customized goals.

## Quick Links

* [Staging Server Link](#)
* [Live Server Link](#)
* [Full Project Spec](./docs/readme.md)

## Installing

Clone the repo:

```
$ git clone https://github.com/fs-tech-degs/capstone-TracySpitler.git
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
Database connected successfully!
```

**_with NPM:_**

```
$ npm start
```

_Terminal output:_

```
your@computer:~$ npm start
Server running on: 3000
Database connected successfully!
```

__The site is now available in your browser at localhost:3000__

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
