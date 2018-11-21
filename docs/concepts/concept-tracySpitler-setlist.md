# [Setlist]

This Setlist app will keep track of varying set lists, or songbooks, filled with as many songs as you desire. Archiving the songs you play in a list will not only help you remember which songs to play and when to play them but will also let you see important details at a glance. Practice what you know, create a list for what you don't, and keep playing.

## Quick Links

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Importance Summary](#importance-summary)

## Features

__No Authorization:__

* Sign Up/Login
* Search for chords (API)

__User's Can:__

* Search for chords (API)
* Create and manipulate set lists/songbooks (CRUD)

    _Lists Include:_
    * Button to add a song
    * List of songs
    * Option to remove list

* Create and manipulate songs in list (CRUD)

    _Songs Include:_
    * Add manually or search and select with the Spotify API
    * Details:
        * Title
        * Artist
        * Length
        * Instrument (guitar - could include others later)
        * BPM (beats per minute)
        * Key
        * Chords (multiple)
    * Option to edit/remove song
    * Save to list (text input or chosen value from dropdown)

## Technology Stack

* Framework: [Express.js](https://expressjs.com/) (Node)
* Database: [MongoDB](https://www.mongodb.com/)
* API for guitar chords: [UberChord](https://api.uberchord.com/)
* API for song data: [Spotify](https://developer.spotify.com/)
* Templating Engine: [PUG](https://pugjs.org/api/getting-started.html)
* Style: [Bootstrap](https://getbootstrap.com/) and custom css
* JS Library: [JQuery](https://jquery.com/)

## Importance Summary

I play a little music, and unfortunately, I always forget more than I remember. Those I know who also play an instrument try to either commit everything to memory, which we all know doesn't work as well as we would like, or they write it down. Writing it down has its issues as well; it becomes easily misplaced or unavailable when you need it most. These are the problems I want this web app to solve.
