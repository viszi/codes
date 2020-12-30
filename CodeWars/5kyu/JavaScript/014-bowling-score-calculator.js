// https://www.codewars.com/kata/5427db696f30afd74b0006a3
// A game consists of 10 frames. In each frame the player rolls 1 or 2 balls, except for the 10th frame, where the player rolls 2 or 3 balls.
// The total score is the sum of your scores for the 10 frames
// If you knock down fewer than 10 pins with 2 balls, your frame score is the number of pins knocked down
// If you knock down all 10 pins with 2 balls (spare), you score the amount of pins knocked down plus a bonus - amount of pins knocked down with the next ball
// If you knock down all 10 pins with 1 ball (strike), you score the amount of pins knocked down plus a bonus - amount of pins knocked down with the next 2 balls

// Rules for 10th frame
// As the 10th frame is the last one, in case of spare or strike there will be no next balls for the bonus. To account for that:
// if the last frame is a spare, player rolls 1 bonus ball.
// if the last frame is a strike, player rolls 2 bonus balls.
// These bonus balls on 10th frame are only counted as a bonus to the respective spare or strike.
// http://en.wikipedia.org/wiki/Ten-pin_bowling#Scoring

function bowlingScore(rolls) {
    //count which frame we are in and what is the score and bonus
    let frame = 1;
    let frameScore = 0;
    let bonus = 0;
    let bonus_balls = 0;

    //know if we are in the first roll or not
    let firstRoll = true;

    //count the total score
    let total = 0;

    //loop through the array
    rolls.forEach(score => {
        //for first roll the output could be: 1) next roll or 2) strike 
        //in both cases we can have bonus points
        if (firstRoll) {
            //know the achieved score
            frameScore = score;

            //if we have bonus ball from previous strike or spare then count it
            bonus = (bonus_balls > 0) ? score : 0;
            //decrease the number of bonus balls
            (bonus_balls > 0) ? bonus_balls-- : 0;

            //increment the total score: in the bonus frame only bonus we should count
            if (frame < 11) {
                total += score + bonus;
            } else {
                total += bonus;
            }

            if (score === 10) {
                //if we have bonus balls then add 10 to the total for the first 10 frames: in bonus frames only bonus points counts
                if (frame < 11) {
                    total += (bonus_balls > 0) * 10
                }

                //we get 2 bonus balls in the first 10 frames
                if (frame < 11) {
                    bonus_balls = 2;
                }

                //next frame starts
                frame++;
            } else {
                //we go for a second roll
                firstRoll = false;
            }
        } else {
            //for the 2nd roll the output could be: 1) spare if framescore is 10 or 2) simple score
            frameScore += score;

            //if we have bonus ball from previous strike or spare then count it
            bonus = (bonus_balls > 0) ? score : 0;
            //decrease the number of bonus balls
            (bonus_balls > 0) ? bonus_balls-- : 0;

            //for spare we can get 1 bonus ball
            if (frameScore === 10) {
                bonus_balls = 1;
            }

            //increment the total score
            if (frame < 11) {
                total += score + bonus;
            } else {
                total += bonus;
            }

            //next frame starts with a first roll
            firstRoll = true;

            //next frame starts
            frame++;
        }
    })

    return total;
}


function bowlingScore(rolls) {

    let frame = 1;
    let total = 0;
    let frameScore = 0;
    let firstRoll = true;

    for (let i = 0; i < rolls.length; i++) {
        let score = rolls[i];

        if (frame >= 10) {
            //The 10th frame is a bit different:
            //If you roll a strike in the first shot of the 10th frame, you get 2 more shots.
            //If you roll a spare in the first two shots of the 10th frame, you get 1 more shot.
            //If you leave the 10th frame open after two shots, the game is over and you do not get an additional shot.
            //How to Score: The score for the 10th frame is the total number of pins knocked down in the 10th frame.

            total += score;

        } else if (firstRoll) {

            frameScore = score;

            //add to scores the current score
            total += score;

            if (score === 10) {
                //add the next 2 scores to total
                total += rolls[i + 1];
                total += rolls[i + 2];

                //increment the frame counter
                frame++
            } else {
                //we have to roll another in this frame
                firstRoll = false;
            }
        } else {
            //add current score to total
            total += score;

            frameScore += score;

            if (frameScore === 10) {
                //add next score to total
                total += rolls[i + 1];
            }

            firstRoll = true;
            frame++;
        }
    }

    return total;
}

//same as above but with reduce
function bowlingScore(rolls) {

    let frame = 1;
    let sum = 0;
    let frameScore = 0;
    let firstRoll = true;

    return rolls.reduce((total, score, index) => {
        if (frame >= 10) {
            return total += score;
        } else if (firstRoll) {
            frameScore = score;
            sum = score;

            if (score === 10) {
                sum += rolls[index + 1] + rolls[index + 2];
                frame++
            } else {
                firstRoll = false;
            }
            return total += sum;
        } else {
            sum = score;

            frameScore += score;

            if (frameScore === 10) {
                sum += rolls[index + 1];
            }

            firstRoll = true;
            frame++;
            return total += sum;
        }
    },0);
}



console.log(bowlingScore([8, 2, 5, 4, 9, 0, 10, 10, 5, 5, 5, 3, 6, 3, 9, 1, 9, 1, 10]), 149);
console.log(bowlingScore([10, 10, 2, 8, 10, 9, 1, 10, 10, 4, 6, 0, 10, 7, 3, 7]), 190);
console.log(bowlingScore([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]), 300);
console.log(bowlingScore([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 1, 0]), 11);
console.log(bowlingScore([9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9]), 190);
console.log(bowlingScore([9, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), 20);
console.log(bowlingScore([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), 0);
console.log(bowlingScore([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 1, 0]), 12);