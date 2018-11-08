Attribute VB_Name = "Life"
Option Explicit
Dim current(), future()

Sub GameofLife()
    Dim row As Long, column As Long
    Dim i As Long, j As Long
    Dim steps As Long, maxsteps As Long
    Dim pausetime As Single
    Dim sbar As Boolean

    Const wsStart = "Start"
    Const wsLife = "Life"

    row = Sheets(wsStart).Range("B2")           'read the number of rows for the playground
    column = Sheets(wsStart).Range("B3")        'read the number of columns for the playground
    maxsteps = Sheets(wsStart).Range("B4")      'read how many times we should calculate the next generation
    pausetime = Sheets(wsStart).Range("B5")     'read what should be the delay for showing the result
    steps = 0

    'in statusbar we will show the number of steps taken / needed
    sbar = Application.DisplayStatusBar
    If Not sbar Then Application.DisplayStatusBar = True

    'setup arrays which will hold the cell values: 0 - dead, 1 - live
    ReDim current(1 To row, 1 To column)
    ReDim future(1 To row, 1 To column)

    Randomize Second(Now)

    'initialize starting state with 0/1
    For i = 1 To row
        For j = 1 To column
            current(i, j) = Int(Rnd() * 2)
        Next j
    Next i

    'setup the playfield
    Call Setup(wsLife, row, column)
    
    'wait 1 sec to make the playfield
    Application.Wait (Now + TimeSerial(0, 0, 1))


    Do While steps < maxsteps
        'go thourgh the cells and calculate the next state for every cell
        For i = 1 To row
            For j = 1 To column
                Call nextGeneration(i, j, row, column)
            Next j
        Next i

        If EndOfGame() Then
            Application.DisplayStatusBar = False
            Exit Do
        End If

        'the next generation becomes the curent
        current = future

        'display board from cell B2
        Sheets(wsLife).Cells(2, 2).Resize(row, column) = current
        
        steps = steps + 1
        Application.StatusBar = "Round: " & steps & " Requested: " & maxsteps
        
        'sleep a bit to slow down the animation
        Call Sleep(pausetime)
    Loop

End Sub

Function nextGeneration(x As Long, y As Long, maxx As Long, maxy As Long)
    Dim i As Single, j As Single
    Dim neighbours As Single

    'in the next loop we are checking not just all surrounding cells but the original cell
    'we should adjust the result with the original cell
    neighbours = -current(x, y)

    For i = -1 To 1
        For j = -1 To 1
            'check if we are inside of the playground or not
            If x + i >= 1 And x + i <= maxx And y + j >= 1 And y + j <= maxy Then
                neighbours = neighbours + current(x + i, y + j)
            End If
        Next j
    Next i

    'Any live cell with fewer than two live neighbors dies, as if by under population.
    If current(x, y) = 1 And neighbours < 2 Then future(x, y) = 0

    'Any live cell with two or three live neighbors lives on to the next generation.
    If current(x, y) = 1 And (neighbours = 2 Or neighbours = 3) Then future(x, y) = 1

    'Any live cell with more than three live neighbors dies, as if by overpopulation.
    If current(x, y) = 1 And neighbours > 3 Then future(x, y) = 0

    'Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    If current(x, y) = 0 And neighbours = 3 Then future(x, y) = 1

End Function

Sub Setup(sheet As String, row As Long, column As Long)

    'activate given sheet
    Sheets(sheet).Activate

    'turn off gridlines
    ActiveWindow.DisplayGridlines = False

    'clear sheet from column D
    Columns("B:XFD").Clear

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

    'make cells square: height is in points (1/72 of an inch), height is in pixels
    Columns("B").Resize(, column).ColumnWidth = 2.43
    Rows("2").Resize(row).RowHeight = 17
End Sub

Function EndOfGame() As Boolean
    'check if there is no change in population
    Dim i As Long, j As Long
    Dim hit As Boolean

    hit = False
    i = 1
    Do
        j = 1
        Do
            If current(i, j) <> future(i, j) Then hit = True
            j = j + 1
        Loop Until hit Or j > UBound(current, 2)
        i = i + 1
    Loop Until hit Or i > UBound(current, 1)
End Function

Function Sleep(delay As Single)
    Dim start As Single

    start = VBA.Timer()
    Do While VBA.Timer() < (start + delay / 100)
        DoEvents
    Loop

End Function

