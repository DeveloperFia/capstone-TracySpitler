<!-- TOC -->

- [1. Application Definition Statement](#1-application-definition-statement)
    - [1.1. Audience](#11-audience)
        - [1.1.1. Primary](#111-primary)
        - [1.1.2. Secondary](#112-secondary)
        - [1.1.3. Demographics](#113-demographics)
    - [1.2. Problem](#12-problem)
    - [1.3. Solution](#13-solution)
        - [1.3.1. Competition](#131-competition)
        - [1.3.2. SetList](#132-setlist)
    - [1.4. Unique Value Proposition](#14-unique-value-proposition)
    - [1.5. User Stories](#15-user-stories)
        - [1.5.1. Functional Requirements (Features)](#151-functional-requirements-features)
- [2. Spec](#2-spec)
    - [2.1. Sitemap](#21-sitemap)
    - [2.2. Programming Languages](#22-programming-languages)
    - [2.3. Technical Requirements](#23-technical-requirements)
    - [2.4. Integrations](#24-integrations)

<!-- /TOC -->

# 1. Application Definition Statement

SetList is a web app that provides guitar players, novice and experienced alike, with the ability to look up chords on the fly, save songs to specific lists of their creation, play along with a metronome to perfect their timing, and hone their skills to play the songs they love with practice sessions based on customized goals.

## 1.1. Audience

### 1.1.1. Primary
Those who know how to play guitar.

Musicians can effortlessly add songs to a setlist for a gig or to a practice list for rehearsal. The list will display some convenient and helpful details about each song at a glance, and with greater detail in a click.

### 1.1.2. Secondary
Those who want to learn how to play guitar.

Anyone who's interested in picking up the guitar and learning something new can use this web app. Between chord references and practice sessions, they can get better at what they've picked up in no time!

### 1.1.3. Demographics

Music really resonates with all demographics, but a recent study from Fender shows that half of all guitar beginners are now women. Most guitar players learn from apps or online tutors. The biggest interest in learning an instrument is to discover a life skill or to play in social settings for small groups. 

[Source](https://www.digitalmusicnews.com/2018/10/17/new-guitar-female/)

## 1.2. Problem

Paper song-books and set lists just don't cut it. They get ruined, you can't search through them to quickly find what you're looking for, it becomes tedious to keep diagrams of the chords needed. Musicians and students need an app that keeps all their lists in one organized place, with the most pertinent information about a song at hand. No one wants to find themselves wasting valuable time hunting for the answer to questions like, "What fret is the capo on?", "How do I play an Am chord?", "How does this song go again?", or even "What key is this song in, and what chords are in that key?".

## 1.3. Solution

### 1.3.1. Competition

* [UberChord](https://www.uberchord.com/) is a great app (only for iOS) for learning how to play guitar. It has lessons and gives you real-time feedback on what you play. You can also look up guitar chords, and use their tuner.
* [All Guitar Chords](http://www.all-guitar-chords.com/ ) is a site that shows you chords on a fretboard on the screen. They also have a metronome and tuner.
* [SmartChord](https://play.google.com/store/apps/details?id=de.smartchord.droid) has what seems to be all the things: metronome, tuner, songbook, the circle of 5ths, transposer, multiple instruments, ear trainer. I wouldn't know what they don't include.
* [SongBook](https://play.google.com/store/apps/details?id=com.linkesoft.songbook&hl=en_US) is an application that saves songbooks, displays chords and lyrics, and has multiple instruments.

### 1.3.2. SetList

The SetList app enables users to create and edit lists of songs depending on their needs. To add a song, the user will search, select, and save it to any list they choose. Along with the title and artist, respectively, selecting a list will show the user a few key details such as the key, if there is a capo and if so, what fret it's on, and also the BPM. Upon further selection of the song, there will be additional details such as the chords that make up the key with diagrams.

Added features to help anyone who plays include a metronome for timing, and practice sessions. The user can set goals in order to practice for a set period of time, to learn a chord or chord progression, for deliberate practice of a single song, or even a list of songs. Songs can be arranged by difficulty or a customized set.

## 1.4. Unique Value Proposition

The UberChord, All Guitar Chords, and SmartChord apps, while very thorough and extensive, are too hard to navigate on the fly. They work great while you're at home learning something and you have the time to do the research, but when you're at practice with your bandmates, or at a gig, or even practicing at home to make sure you can play something fast enough or back to back, you need an app that can provide the important material without slowing you down.

SongBook appears the closest to what this project is, however, SetList will also have a song playback feature, a metronome, particular song details such as the key and BPM, and also practice sessions. A feature that SongBook has that I would like to incorporate into SetList is the display of lyrics with the corresponding chords, and integrating the appropriate data for various instruments.

## 1.5. User Stories

[https://github.com/fullsail/capstone-TracySpitler/labels/user%20story](https://github.com/fullsail/capstone-TracySpitler/labels/user%20story)

### 1.5.1. Functional Requirements (Features)

[https://github.com/fullsail/capstone-TracySpitler/labels/func.%20req.](https://github.com/fullsail/capstone-TracySpitler/labels/func.%20req.)

# 2. Spec

## 2.1. Sitemap

* [Sitemap](https://drive.google.com/open?id=1m-mAcjsawdyQIvkvYifbdZdD9dpalCuD) - The purple boxes are the landing pages based on if a user is logged in or not
* [Ongoing XD Prototype](https://xd.adobe.com/view/0080287f-3f2c-4143-4b0a-b2b20c0f9f20-76b1/)

## 2.2. Programming Languages

Identify what programming languages you are using. Provide links to their respective documentation sites.
* [JavaScript](https://www.javascript.com/)
* [JQuery](https://jquery.com/)
* [CSS](https://devdocs.io/css/)

## 2.3. Technical Requirements

* [Express.js](https://expressjs.com/) (Node) - framework
* [MongoDB](https://www.mongodb.com/) - database
* [PUG](https://pugjs.org/api/getting-started.html) - templating engine
* [Bootstrap](https://getbootstrap.com/) - styling
* [JQuery](https://jquery.com/) - javascript library

## 2.4. Integrations

* [Spotify API](https://developer.spotify.com/documentation/web-api/) - This is used to gather data about a song. Data is used to filtering songs, display pertinent information to the user, extract chord information from UberChords, and power the metronome for individual songs in a list.
* [UberChord API](https://api.uberchord.com/) - This is used to retrieve data on guitar chords. The data is used to render SVG images of the chords to the user with the correct finger placement and also to display the notes in a key.
