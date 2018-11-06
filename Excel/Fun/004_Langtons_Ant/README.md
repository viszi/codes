# Langton's Ant

This fun project is based on [Coding Challenge #89](https://www.youtube.com/watch?v=G1EgjgMo48U&t=366s).


## Goal
On a grid with white and black cells we move an object (the "ant") using the following rules:

1. If the background color of the cell where we are right now is white, then we turn to right, change the color of the cell to black and move forward.
2. If the cell is black, then we turn to left, change the color to white and move forward.

![Wiki Ant](https://upload.wikimedia.org/wikipedia/commons/0/09/LangtonsAntAnimated.gif)

These simple rules can generate unexpected patterns. Please check the relevant [Wikipedia page](https://en.wikipedia.org/wiki/Langton%27s_ant) for the details/examples.

![Excel Screen](https://github.com/viszi/codes/blob/master/Excel/Fun/004_Langtons_Ant/images/001_LangtonsAnt.png)

You can download a 
 - working Excel file and
 - the module file what you can import to an Excel file.

## How it works?

1. Setting up the playground where the ant will move

   On an empty (cleared) sheet we are just drawing borders around the requested number of cells and setting all of them to white.
   The code is quite simple for this part:
   
   ```
   'set the borders of the playground from cell B2
   With ThisWorkbook.Sheets(sheet).Cells(2, 2).Resize(row, column)
        .Borders(xlEdgeLeft).LineStyle = xlContinuous
        .Borders(xlEdgeRight).LineStyle = xlContinuous
        .Borders(xlEdgeTop).LineStyle = xlContinuous
        .Borders(xlEdgeBottom).LineStyle = xlContinuous
        .Borders(xlInsideVertical).LineStyle = xlContinuous
        .Borders(xlInsideHorizontal).LineStyle = xlContinuous
        .Interior.color = rgb(255, 255, 255)    'give a white background color
   End With
   ```

2. Need a loop to make many steps

   The most obvious choice is to use *For ... Next* loop, because we know how many times we would like move the ant forward, but *Do ... Loop* was used in this case and the pseudo-code for that part is:

   ```
   Do While steps < requested_steps
      1. Based on the background color of the currently used cell figure out the movement direction
      2. Invert the color of the current cell
      3. Move to the selected direction
   Loop
   ```

3. Changing background color

   Cells(x,y).Interior.Color can be used to read and update the background color of a cell. We can add the color as RGB (e.g. = RGB(0,0,0) is black) or use the keywords for some basic colors (e.g. vbRed, vbBlack etc).

   ```
   If Cells(x,y).Interior.color = vbWhite then
        Cells(x,y).Interior.color = vbBlack
   Else
        Cells(x,y).Interior.color = vbWhite
   End If
   ```

4. Figuring out the direction
   
   We have to determine in every step to which direction we will go next time. Direction is always changing, it is relative to the previou step; if we go to right next time we can go down or up (which will relative right or left); if we went down next time it will be either left or right. 

   Just imagine a circle; if you are moving to right you are moving clockwise, left is the opposite way.
   
   ![Turning](https://github.com/viszi/codes/blob/master/Excel/Fun/004_Langtons_Ant/images/002_Turning.png)

   We can use many *IF* statements to make the turning, like this:

   ```
   If direction = "up" Then
        If turn = "right" Then
            direction = "right"
        Else
            direction = "left"
   If direction = "right" Then
        If turn = "right" Then
            direction = "down"
        Else
            direction = "up"
    ...
    ```

    However if the 4 directions are numbers like 0 = up, 1 = right, 2 = down and 3 = left, then adding 1 to a direction will give us the same result as the above longer code for turning right (1 = right and 1+1 will give us 2 which is down). 

    In Excel VB we can have Sub (sub-routines) and Function. The later can be used if you want to get back a result of a calculation.

    ```
    Function Turn(dir)
        direction = direction + dir
    End Function
    ```

    With this function the only problem is that it can give us value which is not in range 0 .. 3, so we need some restrictions/checkings in it.

    ```
    Function Turn(dir)
        '0 is up, 1 is right, 2 is down, 3 is left
        direction = direction + dir 

        If dir = 1 And direction > 3 Then direction = 0
        If dir = -1 And direction < 0 Then direction = 3
    End Function
    ```

5. Moving forward

   This is the last part where we must be cautious, because we are going either to next/previous row or next/previous column based on the selected direction.

   E.g. If direction is down then moving forward means to go next row (increment the actual row number by 1).

   *Select Case .. End Select* statement is much easier to read then *If .. Then* statement we can try to use it in our code.

   ```
   'Depends on the direction we have to change row or column number
   Select Case direction
   Case up
        currentR = currentR - 1         'row number is decreased by 1
   Case right
        currentC = currentC + 1         'column number is increased by 1
   Case down
        currentR = currentR + 1         'row number is increased by 1
   Case left
        currentC = currentC - 1         'column number is decreased by 1
   End Select
   ```

Please check the final code to see how the above mentioned blocks were combined to achieve the final result.

## Variatons

1. Display the position of the ant in every step.
2. Multiple ants on the same grid will generate different patterns.
