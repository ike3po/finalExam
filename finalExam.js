/**
 *   @author Thrasher, Isaac
 *   @version 0.0.2
 *   @summary Final Exam || created: 12.15.2016
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');

let continueResponse;
let choices = [];

function main () {
    setContinueResponse();
    while (continueResponse === 1) {
        welcome();
        populateNum();
        userChoice();
        writeNum();
        setContinueResponse();
    }
    goodBye();
}

main();

function welcome() {
    process.stdout.write('\x1Bc');
    PROMPT.question(`Welcome to the number guessing game!  Please press enter to continue! `);
}

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question(`\n Do you want to continue?  Press 0 for no and 1 for yes:  `));
        }
    }
    else {
        continueResponse = 1;
    }
}

function populateNum() {
    let fileContents = IO.readFileSync(`data.csv`, 'utf8');
    let lines = fileContents.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        choices.push(lines[i].toString().split(/,/));
    }
}

function userChoice(choice) {
    const COLUMNS = 2, NUMBER = 0, GUESS = 1;
    choices[choice] = [];
    for (let i = 0; i < COLUMNS; i++) {
        let finished = 0;
        if (i === NUMBER) {
            while (finished !== 1 || typeof choices[choice][i] === 'undefined' ) {
                   choices[choice][i] = (Math.floor((Math.random() * 100) + 1));
                if (choices[choice][i] !== 'undefined' || choices[choice] !== 'null' ) {
                    finished = 1;
                }

            }
        }
        else if (i === GUESS){
            while (finished !== 1 || typeof choices[choice][i] === 'undefined' || !/^[a-zA-Z0-9 ]{1,30}$/.test(choices[choice][i])){
                choices[choice][i] = (PROMPT.question(`\nI have picked out a number please guess a number between one and one hundred: `));
                if (choices[choice] > 1 && choices[choice] < 100){
                    console.log("That is an incorrect input please try again!");
                }
                else if ( /^[a-zA-Z0-9 ]{1,30}$/.test(choices[choice][i])) {
                    finished = 1;
                }
            }
        }
}
if (choices[choice][0] == choices[choice][1]){
    PROMPT.question(`\nYou guessed the number I picked correctly! The number I picked was ${choices[choice][0]}  Please press enter to continue! `);
}
else if (choices[choice][0] !== choices[choice][1]){
    PROMPT.question(`\nThe number you picked was incorrect! The number I picked was ${choices[choice][0]}!  Please press enter to continue! `);
}
}


function writeNum() {
    const COLUMNS = 6;
    for (let i = 0; i < choices.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (j < COLUMNS - 1) {
                IO.appendFileSync(`dataX.csv`, `${choices[i][j]},`, 'utf8');
            } else {
                IO.appendFileSync(`dataX.csv`, choices[i][j], 'utf8');
            }
        }
        IO.appendFileSync(`dataX.csv`, "\n", 'utf8');
    }
}

function goodBye() {
    process.stdout.write('\x1Bc');
    console.log(`Thanks for playing the number guessing game!`);
}