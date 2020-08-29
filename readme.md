
# TETRIS

![Screenshot](./assets/screenshot.png)
***

**Module I final project - Ironhack's Fullstack Web Development Bootcamp.**

**By Gilad Tsabar**

***

## About
### Description

>**Tetris is a tile-matching video game created by Russian software engineer Alexey Pajitnov in 1984. It has been published by several companies, most prominently during a dispute over the appropriation of the game's rights in the late 1980s.**

>Initial release date: June 6, 1984.

>Designer: Alexey Pajitnov


_source: Wikipedia_

## Motivation
Since Tetris was my ultimate childhood game, I've had the urge to build my own tribute version.

## Stack
+ This game was written in vanilla ES6 Javascript. CSS3 for formatting and HTML as entry point.

+ All elements in this projects have been created using DOM manipulation in javascript. 

+ For testing I've used Jest.

---
# Classes

## Main
### run
Run class method holds the game logic. this is where the magic happens. At first is the startScreen function is being called.
__startScreen__ initialize the stage, and sets a welcome message for the user, encouraging to start a game.
__startGame__ removes the message and reveals the board. then is the game is initialized (__initGame__) and start to __drop__ the

## Stage
Holds functions related to the scene. The background, app header and the board, and score elements.
### createGrid(cols, rows)


## Board
Consists of a grid of DIV's. A div with the class 'row' for each row in the grid containing div childrens with the class 'col'. If a Tetromino is being placed on the board, the div get a block-cell class and the color style in the appropriate position. Respectively it get cleared if the block is not longer in place.
Here are also the movement and colision checks functions 

## Score
In here there is a header and 2 paragraph elements which get updated whenever the the score or the level is changed.

---

# ToDo
Some thing planned to do at some point in the future:
+ Change the score system to award multiline cleanup.
+ Add mobile support
+ Add multiplayer support

# Credits

__Background images:__

*Casey Horner (@mischievous_penguins)*
[Unsplash](https://unsplash.com/photos/G2jAOMGGlPE)

*Jonathan Rados (@jonathanrados)* 
[Unsplash](https://unsplash.com/photos/Sbxt82CsMxA)

*Smit Patel (@mesmitpatel)*
[Unsplash](https://unsplash.com/photos/Ms_ofLBLj68)
