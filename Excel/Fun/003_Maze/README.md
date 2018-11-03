# Maze generation with recursive backtracker algorithm

Inspired by Coding Challenge #10, what you can check on [Youtube](https://www.youtube.com/watch?v=HyK_Q5rrcr4&t=72s).

It is using the recursive backtracker algorithm, which is using the following logic (from [Wikipedia](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker)) to generate a maze:

1. Create a large grid with cells; at the beginning all cells have four walls.
2. Make the initial cell the current cell and mark it as visited
3. While there are unvisited cells
   1. If the current cell has any neighbours which have not been visited
      1. Choose randomly one of the unvisited neighbours
      2. Push the current cell to the stack
      3. Remove the wall between the current cell and the chosen cell
      4. Make the chosen cell the current cell and mark it as visited
   2. Else if stack is not empty
      1. Pop a cell from the stack
      2. Make it the current cell
 
 ![Maze](https://github.com/viszi/codes/blob/master/Excel/Fun/003_Maze/images/001_Maze.png)
 
 # How it works?
 
 To make it a bit interactive the user can give the number of rows and columns for the grid, and the starting position from where we would like to start the maze generation.
 
 1. Setting up the grid on a sheet
 
    Borders will act as the walls, the outside border will be a single line (which we will never remove, will act as a solid wall). 
    The interior borders will be double lines.
    
    ![Borders](https://github.com/viszi/codes/blob/master/Excel/Fun/003_Maze/images/002_Borders.png)
    
    Creating such borders in VBA is easy (just use the built-in VBA recorder to see how it works).
    ```
    'set the borders of the playground from cell B2
    With ThisWorkbook.Sheets(sheet).Cells(2, "B").Resize(row, column)
        .Borders(xlEdgeLeft).LineStyle = xlContinuous
        .Borders(xlEdgeRight).LineStyle = xlContinuous
        .Borders(xlEdgeTop).LineStyle = xlContinuous
        .Borders(xlEdgeBottom).LineStyle = xlContinuous
        .Borders(xlInsideVertical).LineStyle = xlDouble
        .Borders(xlInsideHorizontal).LineStyle = xlDouble
    End With
    ```
  
 2. Visited and unvisited cells
 
    In this project we have to distinguish somehow the visited and unvisited cells. 
    E.g. we can fill-up unvisited cells with 0 and once we visited we can change the cell value to 1.
    However I am using cell background color in this case. If background is white (RGB = 255,255,255), then cell was visited.
 
    ```
    'changing the background color from non-white to white will tell us we visited that cell
    If Cells(x, y).Interior.color <> rgb(255, 255, 255) Then
        Cells(x, y).Interior.color = rgb(255, 255, 255)
    End If
    ```
    
 3. Adjacent unvisited cells
  
    We have to determine in which direction we can go from a cell, we can select only unvisited cells from the top, right, bottom and left and we cannot go outside of the maze.
    Let's see an example (where x is the currently active cell, T is for top, R is for right ...)
     
    ![Adjacent](https://github.com/viszi/codes/blob/master/Excel/Fun/003_Maze/images/003_Adjecent_cells.png)
     
    We can see that top and bottom cells are already visited, so only left and right can be selected.
    Number of unvisited cells can be calculated quite easy by checking the background colors of the touching cells.
     
    ```
    cellNeighbours = 0
    If Cells(x, y-1).Interior.Color <> rgb(255, 255, 255) Then cellNeighbours = cellNeighbours + 1  'top cell
    If Cells(x+1, y).Interior.Color <> rgb(255, 255, 255) Then cellNeighbours = cellNeighbours + 1  'right cell
    If Cells(x, y+1).Interior.Color <> rgb(255, 255, 255) Then cellNeighbours = cellNeighbours + 1  'bottom cell
    If Cells(x-1, y).Interior.Color <> rgb(255, 255, 255) Then cellNeighbours = cellNeighbours + 1  'left cell
    ```
     
    This will give us only the number of the adjacent cells, but program still don't know which directions are valid.

    Let's assign different numbers to the directions. 

    ![Directions](https://github.com/viszi/codes/blob/master/Excel/Fun/003_Maze/images/004_Directions.png)

    Now we get 5 as a result, what we can display in binary format like this "0101" and this format is telling to us that only the 2nd (right)
    and the 4th (left) directions are free, so we should choose only one of them. We can use Excel function DEC2BIN to get the binary format of a decimal number.
 
 4. Removing a wall

    If we go up, then we have to remove the upper wall changing the linestyle to nothing.

    ``` 
     Cells(currentR, currentC).Borders(xlEdgeBottom).LineStyle = xlNone
    ```
 
    (Ps. In the example and in the code I am moving to the next cell first and only after that removing the wall, so what was top will be
    bottom, what was left will be right.)
 
 5. Storing the path what we already took

    Sooner or later we will be in a dead-end (no unvisited cells will be around us), which means that we have to go back in the maze. We have to memorize the sequence of the visited cells in a reversed way (LIFO = Last in, first out). 
    We are using an array and every time we are moving appending to it the coordinates of the last visited cell. 

    In case of dead-end we will read out the last element of the array and will go to that coordinate.

    In Excel size of the array can be changed with the *REDIM*. We need to resize the array without loosing its content so *REDIM PRESERVE* must be used. The below code will increase the size of the array by 1 element.

    ```
    ReDim Preserve cellStack(1 To UBound(cellStack) + 1)
    ``` 

    The last element of the array can be fetched like this

    ```
    variable = cellStack(UBound(cellStack))
    ```

    To delete the last element from the array we have to shrink it down by 1.

    ```
    ReDim Preserve cellStack(1 To UBound(cellStack) - 1)
    ```


I hope you enjoyed it. Feel free to modify/improve this code.
