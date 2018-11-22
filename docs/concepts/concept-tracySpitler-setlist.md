# [Setlist]

This Setlist app will keep track of varying set lists, or songbooks, filled with as many songs as you desire. Archiving the songs you play in a list will not only help you remember which songs to play and when to play them but will also let you see important details at a glance, and practice sessions help you retain what you've learned. Practice what you know, create a list for what you don't, and keep playing.

## Quick Links

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Importance Summary](#importance-summary)

## Features

__No Authorization:__

* Sign Up/Login
* Search for chords (API)
* Metronome (input for BPM)

__User's Can:__

* Search for chords (API)
* Metronome (input for BPM)
* Create and manipulate set lists/songbooks (CRUD)

    _Lists Include:_
    * Button to add a song
    * List of songs
    * Option to remove list

* Create and manipulate songs in list (CRUD)

    _Songs Include:_
    * Add manually or search and select with the Spotify API
    * Details (some display on click expansion):
        * Title
        * Artist
        * Length
        * Instrument (guitar - could include others later)
        * BPM (beats per minute)
        * Key
        * Chords (multiple - including SVG display with finger placement)
        * Difficulty level
    * Option to edit/remove song
    * Save to list (text input or chosen value from dropdown)
    * Button to start/stop metronome (uses song BPM)

* Practice Session (with a visual display of progress based on goal)

    * Set a goal
        * Number of songs - by difficulty level
        * Amount of time
        * Deliberate practice of a single song
        * Single chord or chord progression
    * Keeps track of time the user has spent practicing (length of songs, timer data)

## API Uses

__Spotify API__

* Retrieves song data based on query
    * BPM used for metronome
    * Song key gets sent to UberChord API
    * Other data is used to populate info fields

__UberChord__

* Retrieves chord data based on query
    * Chord data used to make SVG image
    * Uses the key from Spotify song data to retrieve all chords in that key (then display SVG)

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
