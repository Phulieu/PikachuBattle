/**
 * Pokemon battle game
 * Author: Lieu Minh Phu - Parker
 * Date:   12 November 2022
 * Filename: game.js
 * Purpose: This file contains some functions to play the Pokemon battle game.
 */
"use strict";
// Declare variables
let squirtelHP = 48;
let pikachuHP = 35;

const squirtleMissRate = 30;
const pikachuMissRate = 5;

const attack = 15;
/**
* 	checkIfMiss
*	Summary. 	Checks to see if a pokemon attack was successful or missed
*	@param		number		missRate	The percent chance that a pokemon will miss their attack
*	@return		boolean		Value indicates if an attack was successful
*/
function checkIfMiss(number) {
    let randomNumber = Math.floor(Math.random()*101);
    console.log(randomNumber);
    if (number > randomNumber) {
        return true;
    }else{
        return false;
    }
}





/**
*	checkIfGameOver
*	Summary.	Checks to see if either pokemon has Fainted. If so, it ends the game.
*	@return		boolean		Value indicates if the game is over
*/
function checkIfGameOver() {
    let gameOver = false;
    if (pikachuHP <= 0) {
        gameOver = true;
        document.getElementById("gameText").innerHTML = "Pikachu has fainted!";
    }
    if (squirtelHP <= 0) {
        gameOver = true;
        document.getElementById("gameText").innerHTML = "Squirtle has fainted!";
    }
    return gameOver;
}



/**
*	shock
*	Summary.	completes the players shock attack and starts the opponents turn if the game is not over
*/

function shock(){
    document.getElementById("shock").disabled = true;
    let isMiss = checkIfMiss(pikachuMissRate);
    if(isMiss) {
        document.getElementById("gameText").innerHTML = "Pikachu Missed!";
    }else{
        document.getElementById("gameText").innerHTML = "";
        squirtelHP -= attack;
        document.getElementById("squirtleHP").innerHTML = squirtelHP;
        let percentSquirtle = (squirtelHP/48*100);
        if (squirtelHP > 0){
            document.getElementById("squirtleHPbar").style = `width: ${percentSquirtle}%;`;
        }else{
            document.getElementById("squirtleHPbar").style = `width: 0%;`;
        }
        document.getElementById("oppImg").classList.add("hit");
        document.getElementById("oppImg").style.backgroundColor = "grey";
        setTimeout(function() {
            document.getElementById("oppImg").classList.remove("hit");
            document.getElementById("oppImg").style.backgroundColor = "transparent";
        },1000)
    }
    let isGameOver = checkIfGameOver();
    if (!isGameOver) {
        setTimeout(opponentTurn,1000);
    }
}
document.getElementById("shock").addEventListener("click",shock);


/**
*	opponentTurn
*	Summary.	completes the opponents attack and starts the player's turn if the game is not over
*/
function opponentTurn(){
    let isMiss = checkIfMiss(squirtleMissRate);
    if(isMiss){
        document.getElementById("gameText").innerHTML = "Squirtle Missed!";
    }else{
        document.getElementById("gameText").innerHTML = "Squirtle attacks with Water Gun";
        pikachuHP -= attack;
        document.getElementById("pikachuHP").innerHTML = pikachuHP;
        let percentPikachu = pikachuHP/35*100;
        if (pikachuHP > 0){
            document.getElementById("pikachuHPbar").style = `width: ${percentPikachu}%`;
        }else{
            document.getElementById("pikachuHPbar").style = `width: 0%`;
        }
        document.getElementById("playerImg").classList.add("hit");
        document.getElementById("playerImg").style.backgroundColor = "grey";
        setTimeout(function() {
            document.getElementById("playerImg").classList.remove("hit");
            document.getElementById("playerImg").style.backgroundColor = "transparent";
        },1000)
    }
    let isGameOver = checkIfGameOver();
    if(!isGameOver){
        setTimeout(function(){
            document.getElementById("shock").disabled = false;
            document.getElementById("gameText").innerHTML = "What will Pikachu do ?";
        },1000);
    }
}