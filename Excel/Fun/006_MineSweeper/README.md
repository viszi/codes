# MineSweeper

The adaptation of the famous puzzle game on an Excel worksheet.

![puzzle](https://github.com/viszi/codes/blob/master/Excel/Fun/006_MineSweeper/images/001_puzzle.png)

![solution](https://github.com/viszi/codes/blob/master/Excel/Fun/006_MineSweeper/images/002_solved.png)

You can download a

- working Excel file and
- the module file what you can import to an Excel file.

This was also a Coding Train challenge, please check #71 on [YouTube](https://www.youtube.com/watch?v=LFU5ZlrR21E&t=2643s).

## How it works?

1. Playfield
   
   We are generating the playground just like we did for [Langton's Ant](https://github.com/viszi/codes/tree/master/Excel/Fun/004_Langtons_Ant) or for [Game of Life](https://github.com/viszi/codes/tree/master/Excel/Fun/005_Game_of_Life).

   We have to hide the cell values (which could be a B for mines or a number), because at the beginning we don't want to show for the player which cells contain the bombs.
   For this we can use the following techniques:

   1. Make the font color to the same as the cell's background color.
   2. Use a special number formatting which does not show the numbers. Format ";;;" will do the trick.

   All cell values are stored in a two-dimensional (2D) array to make our life easier. We can loop through the array quicker than reading the cell values every time.

2. Placing bombs randomly

   At the start we have to find random spots on the grid for the bombs. The user can determine the size of the grid and the chance of placing a bomb into a cell.

   During the grid initalization we can generate a random number and if that number is smaller than the chance we can mark the cell as a bomb-holder. The code for that:

   ```
   For i = 1 To row
        For j = 1 To column

            something = Rnd()
            If something <= chance Then
                Board(i, j) = "B"
            End If

        Next j
   Next i
   ```

   However if we use this approach it could happen that we will have much less or more mines on the grid than required. In the next chart you can see that how many mines were placed on a 9x9 grid with a chance 13%. We expect to have 10 mines on the board, but based on 10,000 simulations only in 657 cases we had 10 mines.  
   ![random](https://github.com/viszi/codes/blob/master/Excel/Fun/006_MineSweeper/images/003_random.png)

   We have to find a better solution to place the necessary amount of mines on the field. The new logic is the following:

   1. Determine first how many mines we should have.
   2. Start to remove cells with random position from the grid.
   3. Do step 2 until the number of the remaining cells are not equal to the number of mines.

   With this logic we can assign to every mine a unique cell. How we can do this in Excel?

   1. Number of mines is a simple calculation.

      ```
      'based on board size and chance calculate how many mines we should have
      totalmines = Int(row * column * chance)
      ```

   2. Let's create an array which will contain all cells with their position. 
      e.g. the position of cell in row 3 and in column 5 will be 3,5
      At start the array will look like this [(1,1),(1,2),(1,3)...(3,5),(3,6)...]

      The code for this is:

      ```
      'create a temporary array which will contain all cells of the board
      ReDim tmpArr(1 To row * column)

      'add the cell references (row and column id, like 5:2) to the array
      For x = 1 To UBound(tmpArr)         'fill up with references
        tmpArr(x) = Int((x - 1) / column) + 1 & "," & ((x - 1) Mod column) + 1
      Next x
      ```

   3. Select randomly an element of this array and delete it from it.
      e.g. if we delete the 2nd element of the array the result will be like this [(1,1),(1,3)...(3,5),(3,6)...]

      In Excel we cannot delete just an element of an array, the workaround solution is to create another array which is 1 element smaller than
      the original and start copy the elements from the original to the new array except that element what we want to drop/pop. After the copy
      "rename" the new array to the original name. 
   
      ```
      'select a random element which will be removed
      randomElement = Int(Rnd() * UBound(tmpArr)) + 1 

      'create a new temp array which is smaller by one element than the original
      ReDim tmpArr2(1 To UBound(tmpArr) - 1)        
    
      'copy to new array the elements except the random selected
      For x = 1 To UBound(tmpArr2)                    
            If x >= randomElement Then
                y = x + 1                               
            Else
                y = x
            End If
            tmpArr2(x) = tmpArr(y)
      Next x

      ReDim tmpArr(1 To UBound(tmpArr2))              'reset the original temp array
      tmpArr = tmpArr2                                'copy the array to the original
      ```

   4. We have to iterate the above step until the array contains only as many elements as we need. This is a job for *Do..Loop* statement.
      
      ```
      Do
         'all steps mentioned in the above point
      Loop While UBound(tmpArr) > totalmines
      ```

   5. Assign bombs to the remaining cells. In the array we stored the position of the cells, the final array could be something like this:
      [(2,4),(4,8),(6,9),...]

      This means that the 4th cell in the 2nd row, the 8th cell in row 4 etc. should have a bomb. We can do this in the following way:

     ```
     'marked the remaining cells on the board with B as bomb
      Dim aSplit
      For x = 1 To UBound(tmpArr)
         aSplit = Split(tmpArr(x), ",")
         Board(aSplit(0), aSplit(1)) = "B"
      Next x
     ```

3. Counting bombs around a cell

   In the game we are showing to the user how many bombs can be found around the selected cells (based on this information player can figure out where the mines can be on the grid). After we have placed the bombs, we have to go through the remaining cells and count how many bombs are around it.

   ![Zone](https://github.com/viszi/codes/blob/master/Excel/Fun/006_MineSweeper/images/004_zone.png)

   This is a job for two *For...Next* statements.

   I have put this into a function called CountMines(),

   ``` 
   Function CountMines(x As Long, y As Long, maxrow As Long, maxcolumn As Long)
   'This function counts the bombs around any given cell

    Dim i As Long, j As Long, bombs As Long

    bombs = 0   

    For i = -1 To 1
        For j = -1 To 1
            'loop around the selected cells to count the near bombs - maxrow and maxcolumn is used to not go through the edges of the grid
            If (x + i >= 1 And y + j >= 1 And x + i <= maxrow And y + j <= maxcolumn) Then
                If Board(x + i, y + j) = "B" Then
                    bombs = bombs + 1
                End If
            End If
        Next j
    Next i

    CountMines = bombs

    End Function
    ```
      
4. Reveal a cell

   When player clicks on a cell we can reveal/show the content of that cell. If there is a bomb, then player loses the game. If there is no bomb, then a number will be shown indicating how many bombs are around the cell. if there are no bombs around the cell blank value will be shown.

   For the reveal we are using Worksheet_SelectionChange() event, which means that some codes have to be added to the worksheet itself. Right code of the sheet name and select *View Code*.

   ![Worksheet code](https://github.com/viszi/codes/blob/master/Excel/Fun/006_MineSweeper/images/005_Worksheet_code.png)

   During reveal we are doing the followings:

   1. Checking if cell contains a mine or not. If there is a mine, if yes then game is over.
   2. Changing the cell color from grey to white to distingush with color the already revealed cells from the still hidden ones.
   3. Changing the number format of the cell to "General". This makes visible the content of the cell. (Until this only the number format prevents to show to the player the cell value!)

   Let's see how we can achive these in VBA?

   First we should control that reveal action is running only on the playfield, there is no point to run any code if user is clicking on a cell which is not part of the game. In this function *INTERSECT* can help us.

   The below code checks if clicked cell (called Target in VBA) is inside the playgound (which starts from D2 and runs for as many rows and columns as the variables tells) or not. If it is inside, then we given codes will be executed.

   ```
   If Not Intersect(target, Cells(2, 4).Resize(row, column)) Is Nothing Then
      'some codes
   End If
   ```

   Changing the cell color to white and number format to "General" can be done, with these lines:

   ```
   Target.Interior.color = rgb(255, 255, 255)
   Target.NumberFormat = "General"
   ```

   Checking if the selected cell contains a mine or not is a simple task:

   ```
   If Target.Value = "B" then   'game is over
      'lets unhide all cells
       With Cells(2, 4).Resize(row, column)
           'change the color
            .Interior.color = rgb(255, 255, 255)
            .NumberFormat = "General"
       End With
   End If
   ```

5. Reveal multiple cells

   In MineSweeper when player selects a field which have ZERO bombs in adjacent cells, then all adjacent cells will be recursively revealed. This is called [flood fill](https://en.wikipedia.org/wiki/Flood_fill). 

   All we have to do is to write a function what we can call recursively. The logic is simple:

   If the cell is not revealed yet, then 
      a) reveal it
      b) if cell is blank (has ZERO adjecent bomb) then
         loop through the adjecent, non-revealed cells and
         i) reveal it
         ii) if the adjacent cell is blank again, then do the same things as in step a)-b)  

   The Reveal() sub-routine was written to achive this. It is called to check a single cell, but if that cell is BLANK, then it starts to check the adjecent, non-revealed cells and calls himself with an adjecent cell. 

   ```
   Sub Reveal(x As Long, y As Long, maxrow, maxcolumn)
   'This process unhide the cell content by changing the cell color to white and setting number format to generic

    Dim i As Long, j As Long

    With Cells(x, y)
        'reveal the cell content
        .Interior.color = rgb(255, 255, 255)
        .NumberFormat = "General"
        'check if cell was empty let's check that is there any adjecent empty cell
        If Cells(x, y) = "" Then
            For i = -1 To 1
                For j = -1 To 1
                    'coordinates must be greater then D2 (2,4) and smaller than playfield (row+starting row, column + starting column)
                    If (x + i >= 2 And y + j >= 4 And x + i <= maxrow + 2 And y + j <= maxcolumn + 4) And (i * j = 0) Then
                        'i*j = 0 ensures that empty cells which are touching each others by a corner will not be revealed
                        'if cell is not revealed (color is still grey) let's call this function again to make a reveal (flood-fill)
                        If Cells(x + i, y + j).Interior.color <> rgb(255, 255, 255) Then
                            Call Reveal(x + i, y + j, maxrow, maxcolumn)
                        End If
                    End If
                Next j
            Next i
        End If
    End With
   End Sub
   ```

6. Marking a potential mine

   In the game player can mark fields if (s)he thinks there is a mine, without revealing that field. In this version I implemented this the following way:

   1. Marked cells will have orange color (gray is used for untouched fields, white is for the already revealed ones).
   2. Added a check box form control to the sheet to tell Excel that selecting a cell was made to reveal or mark the cell.

   Only we have to do is to check during the clicking what is the status of the check box. 
   If check box is selected, then instead of calling the reveal routine we are just changing the color of the cell to orange or if it is already orange changing it back to grey.

   How we can know if the check box is selected or not?

   We can link the form control to a cell, and that cell will contains always the value of the form control. In case of a check box, the linked cell will contain either TRUE or FALSE. I linked the control to cell B11. In the code we should read the value of that cell.

   ![Checkbox](https://github.com/viszi/codes/blob/master/Excel/Fun/006_MineSweeper/images/006_Checkbox.png)

   ```
   If Range("B11") = True then
     'we would like to mark the actual cell instead of reveal
     'if already marked restore to unrevealed
      If Target.Interior.color = rgb(200, 200, 200) Then
          Target.Interior.color = rgb(255, 200, 0)
      Else
          Target.Interior.color = rgb(200, 200, 200)
      End If
   End If
   ```

That is all. Please check the final code to see how the above mentioned blocks were combined to achieve the final result.

## Variations

1. Create a version on a Userform
2. Fix bugs
