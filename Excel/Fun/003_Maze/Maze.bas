Attribute VB_Name = "Maze"
Option Explicit
Dim unvisitedCells As Long

Sub Maze()
    Dim i As Long, row As Long, column As Long, chance As Double
    Dim currentR As Long, currentC As Long
    Dim neighbours As Long, neighboursPOS As String, validEntry As Boolean
    Dim random As Long
    Dim cellStack(), pop
    Dim delay As Single
    Dim sbar As Boolean

    Const wsStart = "Start"
    Const wsMaze = "Maze Generator"

    row = Sheets(wsStart).Range("B2")          'how many rows we want to have in the playfield
    column = Sheets(wsStart).Range("B3")       'how many columns we watn to have in the playfield
    delay = Sheets(wsStart).Range("B4")

    'checking if playfield is too small or not playable
    If Not IsNumeric(row) Or row < 2 Or Not IsNumeric(column) Or column < 2 Then
        Exit Sub
    End If

    'setup the board
    Call Setup(wsMaze, row, column)

    'in statusbar we will show the number of unvisited cells
    sbar = Application.DisplayStatusBar
    If Not sbar Then Application.DisplayStatusBar = True

    'to see how many cells we can check later
    unvisitedCells = row * column
    Application.StatusBar = "Unvisited cells: " & unvisitedCells

    'give 1 second to Excel to redraw the screen
    Call Sleep(100)

    'starting position in the maze: the first cell (1,1) is actually B2 which is in Excel (2,2)
    If Sheets(wsStart).Range("B6") >= 1 And Sheets(wsStart).Range("B6") <= row Then
        currentR = Int(Sheets(wsStart).Range("B6")) + 1
    Else
        currentR = 2
    End If

    If Sheets(wsStart).Range("B7") >= 1 And Sheets(wsStart).Range("B7") <= column Then
        currentC = Sheets(wsStart).Range("B7") + 1
    Else
        currentC = 2
    End If

    'mark the starting cell
    Call cellVisited(currentR, currentC)

    'create a stack where we store the path what we have taken
    ReDim cellStack(1 To 1)

    'add actual element to the stack
    cellStack(1) = currentR & "," & currentC

    'make it a bit random
    Randomize Second(Now)

    'this loop is going over and over until we are having non-visited cells
    Do
        'find unvisited neighbour cells
        neighbours = cellNeighbours(currentR, currentC, row, column)

        'if we have an unvisited neighbour lets use it
        If neighbours Then
            'the we are converting the value to a binary format so from decimal 11 we will have 1011
            neighboursPOS = right("0000" & Application.WorksheetFunction.Dec2Bin(neighbours), 4)

            validEntry = False
            'select a random neighbours, order is: top, right, bottom, left
            Do
                random = Int(Rnd() * 4) + 1
                If Mid(neighboursPOS, random, 1) = "1" Then validEntry = True
            Loop Until validEntry

            'remove the wall between the cells in the randomly selected direction
            Select Case random
            Case 1  'top
                currentR = currentR - 1
                Cells(currentR, currentC).Borders(xlEdgeBottom).LineStyle = xlNone
            Case 2  'right
                currentC = currentC + 1
                Cells(currentR, currentC).Borders(xlEdgeLeft).LineStyle = xlNone
            Case 3  'bottom
                currentR = currentR + 1
                Cells(currentR, currentC).Borders(xlEdgeTop).LineStyle = xlNone
            Case 4  'left
                currentC = currentC - 1
                Cells(currentR, currentC).Borders(xlEdgeRight).LineStyle = xlNone
            End Select

            'increase the stack size
            ReDim Preserve cellStack(1 To UBound(cellStack) + 1)

            'add to stack the randomly selected cell
            cellStack(UBound(cellStack)) = currentR & "," & currentC

            'mark current cell as visited
            Call cellVisited(currentR, currentC)
            Application.StatusBar = "Unvisited cells: " & unvisitedCells
        Else
            'if we have a way to go back then use it
            If UBound(cellStack) > 1 Then
                pop = Split(cellStack(UBound(cellStack)), ",")

                'make the previous cell the current cell
                currentR = pop(0)
                currentC = pop(1)

                'remove from the stack the used cell
                ReDim Preserve cellStack(1 To UBound(cellStack) - 1)
            Else
                Exit Do
            End If
        End If

        'put a small delay to animation
        Call Sleep(delay)

    Loop While unvisitedCells > 0

    'turn off statusbar
    Application.DisplayStatusBar = sbar

End Sub

Function cellNeighbours(x As Long, y As Long, maxrow As Long, maxcolumn As Long) As String
'This function tells not just how many unvisited cells are around the active cell, but even where
'they are located. If there is an unvisited cell above then it will return 8, if at the right then 4,
'at te bottom 2 and on the left 2. In case of multiple adjecent cells then it returns the sum of it.
'eg. 11 means that there is one at the top, one at the bottom and one on the left, because 11 = 8 + 2 + 1

    Dim i As Long, j As Long

    'cellNeighbours(top = 8|0 , right = 4|0 , bottom = 2|0 , left = 2|0)
    cellNeighbours = 0
    'top
    If x - 1 >= 2 And x - 1 <= maxrow + 1 And Cells(x - 1, y).Interior.color <> rgb(255, 255, 255) Then
        cellNeighbours = cellNeighbours + 8
    End If
    
    'right
    If y + 1 >= 2 And y + 1 <= maxcolumn + 2 And Cells(x, y + 1).Interior.color <> rgb(255, 255, 255) Then
        cellNeighbours = cellNeighbours + 4
    End If
    
    'bottom
    If x + 1 >= 2 And x + 1 <= maxrow + 1 And Cells(x + 1, y).Interior.color <> rgb(255, 255, 255) Then
        cellNeighbours = cellNeighbours + 2
    End If
    
    'left
    If y - 1 >= 2 And y - 1 <= maxcolumn + 2 And Cells(x, y - 1).Interior.color <> rgb(255, 255, 255) Then
        cellNeighbours = cellNeighbours + 1
    End If

End Function

Sub cellVisited(x As Long, y As Long)

    'mark the cell as visited (bg color is white) and update the unvisited cells counter
    If Cells(x, y).Interior.color <> rgb(255, 255, 255) Then
        Cells(x, y).Interior.color = rgb(255, 255, 255)
        unvisitedCells = unvisitedCells - 1
    End If
    
End Sub

Sub Setup(sheet As String, row As Long, column As Long)
    
    'activate given sheet
    Sheets(sheet).Activate
    
    Application.ScreenUpdating = False
    
    'turn off gridlines
    ActiveWindow.DisplayGridlines = False
        
    'clear sheet from column D
    Columns("B:XFD").Clear

    'set the borders of the playground from cell B2
    With ThisWorkbook.Sheets(sheet).Cells(2, "B").Resize(row, column)
        .Borders(xlDiagonalDown).LineStyle = xlNone
        .Borders(xlDiagonalUp).LineStyle = xlNone
        .Borders(xlEdgeLeft).LineStyle = xlContinuous
        .Borders(xlEdgeRight).LineStyle = xlContinuous
        .Borders(xlEdgeTop).LineStyle = xlContinuous
        .Borders(xlEdgeBottom).LineStyle = xlContinuous
        .Borders(xlInsideVertical).LineStyle = xlDouble
        .Borders(xlInsideHorizontal).LineStyle = xlDouble
        .HorizontalAlignment = xlCenter
        .VerticalAlignment = xlCenter
        .Locked = False                         'allow change for the cell
        .NumberFormat = ";;;"                   'hide cell content
        .Interior.color = rgb(200, 200, 200)    'give a gray background color
    End With

    'make cells square: height is in points (1/72 of an inch), height is in pixels
    Columns("D").Resize(, column).ColumnWidth = 2.43
    Rows("2").Resize(row).RowHeight = 17
    
    Application.ScreenUpdating = True

End Sub

Function Sleep(delay As Single)
    Dim start As Single

    start = VBA.Timer()
    Do While VBA.Timer() < (start + delay / 100)
        DoEvents
    Loop

End Function
