# Conway's Game of Life

Another project inspired by [Coding Challenge #85](https://www.youtube.com/watch?v=FWSR_7kZuYg).

![Life](https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif)

## Goal

There is grid, where each cell can have two different states: alive or dead. The future statues of any cell is determined by the surrounding cells by these rules:
1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction. 

In other words cell will be alive only if there are 2 or 3 live neighbours.

Based on the initial state interesting patterns can be seen on the grid.

Please check the relevant [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) page for more info and examples.

You can download a 
 - working Excel file and
 - the module file what you can import to an Excel file.

## How it works?

1. Playfield

   We are generating the playground just like we did for Langton's Ant, but we will add a conditional formatting for the cells inside the playground. This conditional formatting will do the "animation" for us, because with the code we will change the value of every cells to 0 (=dead) or 1 (=alive). Alive cells will have a black background color.

   We have to hide the numbers (0|1) in the cells, because it will not look good. 

   ![Numbers](https://github.com/viszi/codes/blob/master/Excel/Fun/005_Game_of_Life/images/001_Numbers.png)

   For that we can use two options:
   1. Make the font color to the same as background color, so make it font color white for cells with zeros and black for the ones.
   2. Use a special number formatting which does not show the numbers. In Excel you can create custom number formats, for us right now it is enough to know that a custom number format can have upto 4 parts separated by semi-colons.
      
      - The first part is responsible for the displaying of positive numbers, e.g. "+" will put a plus sign in all cells with positive numbers.
      - The second part is doing the negative numbers, e.g. "-" will a minus sign
      - The third part is printing zero values, e.g. "/"
      - The fourth part is for text values. e.g. "#" will do  

      If we want to hide the cell content then format ";;;" should be used. [Here](https://exceljet.net/custom-number-formats) are some examples.
      
      ```
      'set the borders of the playground from cell B2
      With ThisWorkbook.Sheets(sheet).Cells(2, 2).Resize(row, column)
        .Borders(xlEdgeLeft).LineStyle = xlContinuous
        .Borders(xlEdgeRight).LineStyle = xlContinuous
        .Borders(xlEdgeTop).LineStyle = xlContinuous
        .Borders(xlEdgeBottom).LineStyle = xlContinuous
        .Borders(xlInsideVertical).LineStyle = xlContinuous
        .Borders(xlInsideHorizontal).LineStyle = xlContinuous
        .HorizontalAlignment = xlCenter
        .VerticalAlignment = xlCenter
        .Locked = False                         'allow change for the cell
        .FormulaHidden = True                   'hide cell content in formula editor
        .NumberFormat = ";;;"                   'hide displaying cell content
        
        'add conditional formatting: if cell value is 1, background should be black
        .FormatConditions.Add Type:=xlCellValue, Operator:=xlEqual, Formula1:="=1"
        .FormatConditions(1).Interior.color = 0
      End With
      ```
2. Generations (current and future)

   We have to calculate the statues of every cells on the grid and for that we are storing the actual grid content in an array called "current()".
    
   *A) Starting*

   At start we have to initialize this array with random values. It can be done easily with 2 *For ... Next* loops.

   ```
   'initialize starting state with 0/1
   For i = 1 To row
        For j = 1 To column
            current(i, j) = Int(Rnd() * 2)
        Next j
   Next i
   ```

   *B) Future generation*

   To get the future value of a cell we have to check the status of its neighbours. We cannot change the values of the cells until we have not checked all cells on the grid. For this we are using another array, called future() where we will store the new values of the cells.

   On the grid a cell will have 8 neighbours (except on the edges). We have to go around the cell and count how many alive cells we can find and if it is 2 or 3 then future status of the cell will be alive, for other cases it will be dead.

   ![Generation](https://github.com/viszi/codes/blob/master/Excel/Fun/005_Game_of_Life/images/002_Generations.png)

   We can use again *For ... Next* loops to check the neighbours and count the alive cells.

   ```
   For offsetX = -1 To 1
        For offsetY = -1 To 1
            neighbours = neighbours + current(x + offsetX, y + offsetY)
        Next offsetY
   Next offsetX
   ```

   The problem with the above code is that
   - on edges we will not have neighbours on every side and
   - we are counting ourself as well (not just the neighbours).

   The solution for the edges is to check that x + offsetX is greater than 1 (if not we are on the top) or smaller than maximum number of rows. Same should be done for y + offsetY, but here we need a number between 1 and maximum number of columns.
    
   Counting ourself can be done by an *IF ... THEN* statement, when offsetX = 0 and offsetY = 0 then we are in the middle and it should not be counted.
   The other option is to count the middle cell too, but we will adjusting the final result with the value of cell.

   Once we have the number of alive neighbours we can figure out the future value of the middle cell. We have 4 rules (underpopulation/staying alive/overpopulation/reproduction):

   ```
   'Any live cell with fewer than two live neighbors dies, as if by under population.
   If current(x, y) = 1 And neighbours < 2 Then future(x, y) = 0

   'Any live cell with two or three live neighbors lives on to the next generation.
   If current(x, y) = 1 And (neighbours = 2 Or neighbours = 3) Then future(x, y) = 1

   'Any live cell with more than three live neighbors dies, as if by overpopulation.
   If current(x, y) = 1 And neighbours > 3 Then future(x, y) = 0

   'Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
   If current(x, y) = 0 And neighbours = 3 Then future(x, y) = 1
   ```

   ... but it can be simplified to this.

   ```
   If neighbours = 2 Or neighbours = 3 Then 
      future(x, y) = 1 
   Else
      future(x, y) = 0
   End If
   ``` 

   *C) Display future generations*

   As soon as we calculated the statues of all cells we have to do 2 things:
   - copy the future values into the current array (which will be the base of the next future generation) 
   - display the result.

   Copy is really simple, because both arrays are having same number or rows/columns:

   ```
      current = future
   ```

   Values of the current array can be quickly added to a range like this:

   ```
      Cells(2, 2).Resize(row, column) = current
   ```

   Animation (changing cell between black and white) will be done by the existing conditional formatting.


3. End of simulation

   We can give how many evolutions (rounds) we would like to simulate, but it can happen during simulation we are reaching a constant state where there will be no more changes (no new dead or alive cells).

   Let's compare future and current array and if they are different we can continue the simulation.


Please check the final code to see how the above mentioned blocks were combined to achieve the final result.

# Variatons

1. Changing the survival logic
   Game of Life is symbolized as B3/S23 - which means a cell is Born if it has exactly 3 neighbours, Survives if it has 2 or 3 living neighbour). 
   Highlife version is using rule B36/S23.
