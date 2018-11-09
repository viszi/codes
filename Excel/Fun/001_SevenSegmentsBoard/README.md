# Seven segments board
In this project we are creating more seven segment displays to be able to display words. On the board the text will be running from right to left.
This is an improved version of the first [seven segments display](https://github.com/viszi/codes/tree/master/Excel/Fun/001_SevenSegments).

You can download the
- final Excel version and
- the module file what you can import to an Excel file.

## Goal
We would like to display more letters at the same time, so we need more seven segment displays. To make it fun let's animate the text; it will run from right to left.
Let's try to display all kind of characters, not just numbers and letters from A to G. However there is a limitation, because some letters (like Q, K, Z or M) cannot be shown on a seven segment display.

![Board](https://github.com/viszi/codes/blob/master/Excel/Fun/001_SevenSegmentsBoard/images/001_Board.png)


## How it works?
It is really similar to the seven segment display code - I am just highlighting the major differences.
1. SetupBoard

   Here we create 10 displays next to each other. The only change from the other project that we use a '''For ... Next''' loop and a new variable called 'gap' to draw them.
   
2. DisplayText

   The 10 displays will show different characters at the same time, so I have created a 10 element long array which will contains only 1 character for every display.
   The content of this array will be displayed on the board (first element of the array is displayed on most right, last element is on left).
   
   Depends on how we are changing the content of the array we can achieve an animation (Excel not good at in it).
   Here I choose that content of the array will be shifted to a direction and the next character of the string is added to the array.
   Lines 68-78 are responsible for that.
   
3. GetCode

   In the Excel file user can create her/his own mapping how a character should be displayed: column M-P holds the necessary values.
   This function will grab the actual mapping from here to know which segments should be on or off.

## Variations/Improvements
1. On 7-segments we cannot display all characters (like K, Z, M), but there are 9 or 14 or 16-segments displays which can do it.
2. Change the animation interactively (like scrolling from left to right, right to left, or blinking text etc).
3. Put the mapping table (column M-P) into memory to make it quicker.
