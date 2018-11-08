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

      If we want to hide the cell content then format ";;;" should be used 
      [Here](https://exceljet.net/custom-number-formats) are some examples.
      
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
