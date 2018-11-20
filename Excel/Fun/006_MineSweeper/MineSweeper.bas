Attribute VB_Name = "MineSweeper"
Option Explicit
Dim Board()             'B there is a bomb, 0 no bomb in adjecent cells, number of bomb(s) in adjecent cells
Dim totalmines As Long  'number of placed bombs

Sub MineSweeper()
    Dim i As Long, row As Long, column As Long, chance As Double

    row = Range("B4")           'how many rows we want to have in the playfield
    column = Range("B5")        'how many columns we watn to have in the playfield
    chance = Range("B6")        'chance if there is a mine in the cell

    'checking if playfield is too small or not playable
    If Not IsNumeric(row) Or row < 2 Or Not IsNumeric(column) Or column < 2 Then
        Exit Sub
    End If

    'initalize board array
    ReDim Board(1 To row, 1 To column)
    
    'add random mines to board
    Call SetupMines(row, column, chance)

    'setup the board
    Call Setup(ActiveSheet.name, row, column)

    'show the board (at the beginning everything is hidden)
    Call ShowBoard

End Sub

Sub SetupMines(row, column, chance)
'This process is adding to an array all cells and starting to remove random cells from the array
'Once the array has only as many items as many mines we need it marks the remaining cells as bomb holders

    Dim tmpArr(), tmpArr2()
    Dim x As Long, y As Long, randomElement As Long

    'make it a bit random
    Randomize Second(Now)

    'based on board size and chance calculate how many mines we should have
    totalmines = Int(row * column * chance)

    'create a temporary array which will contain all cells of the board
    ReDim tmpArr(1 To row * column)

    'add the cell references (row and column id, like 5:2) to the array
    For x = 1 To UBound(tmpArr)         'fill up with references
        tmpArr(x) = Int((x - 1) / column) + 1 & ":" & ((x - 1) Mod column) + 1
    Next x

    'this loop will be repated until size of the array is not reaching the requested amount
    Do
        ReDim tmpArr2(1 To UBound(tmpArr) - 1)          'create a new temp array
        randomElement = Int(Rnd() * UBound(tmpArr)) + 1 'select a random element which will be removed

        For x = 1 To UBound(tmpArr2)                    'copy to new array cells except the random selected
            If x >= randomElement Then
                y = x + 1                               'skip the randomly selected element
            Else
                y = x
            End If
            tmpArr2(x) = tmpArr(y)
        Next x

        ReDim tmpArr(1 To UBound(tmpArr2))              'reset the original temp array
        tmpArr = tmpArr2                                'copy the array to the original
    Loop While UBound(tmpArr) > totalmines

    'the temp array contains the cell references where we have the mines
    'marked those cells on the board with B as bomb
    Dim aSplit
    For x = 1 To UBound(tmpArr)
        aSplit = Split(tmpArr(x), ":")
        Board(aSplit(0), aSplit(1)) = "B"
    Next x

    'go through all cells on the board to figure out how many adjecent mines we have
    For x = 1 To UBound(Board, 1)
        For y = 1 To UBound(Board, 2)
            If Board(x, y) <> "B" Then
                Board(x, y) = CountMines(x, y, UBound(Board, 1), UBound(Board, 2))
            End If
        Next y
    Next x

End Sub

Function CountMines(x As Long, y As Long, maxrow As Long, maxcolumn As Long)
'This function counts the bombs around any given cell

    Dim i As Long, j As Long, bombs As Long

    bombs = 0

    For i = -1 To 1
        For j = -1 To 1
            'loop around the selected cells to count the near bombs
            If (x + i >= 1 And y + j >= 1 And x + i <= maxrow And y + j <= maxcolumn) Then
                If Board(x + i, y + j) = "B" Then
                    bombs = bombs + 1
                End If
            End If
        Next j
    Next i

    CountMines = bombs

End Function

Sub ShowBoard()
'This process display the content of the board

    Dim x As Long, y As Long, showValue

    For x = 1 To UBound(Board, 1)
        For y = 1 To UBound(Board, 2)
            If Board(x, y) = 0 Then
                showValue = ""
            Else
                showValue = Board(x, y)
            Cells(2, 4).offset(x - 1, y - 1) = showValue
            End If
        Next y
    Next x
End Sub

Sub Setup(sheet As String, row As Long, column As Long)

    'turn off gridlines
    ActiveWindow.DisplayGridlines = False

    'clear sheet from column D
    Columns("D:XFD").Clear

    'set the borders of the playground from cell D2
    With ThisWorkbook.Sheets(sheet).Cells(2, 4).Resize(row, column)
        .Borders(xlDiagonalDown).LineStyle = xlNone
        .Borders(xlDiagonalUp).LineStyle = xlNone
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
        .Interior.color = rgb(200, 200, 200)    'give a gray background color
    End With

    'make cells square: width is in points (1/72 of an inch), height is in pixels
    Columns("D").Resize(, column).ColumnWidth = 2.43
    Rows("2").Resize(row).RowHeight = 17

    Range("B8") = totalmines                    'display how many mines were placed
    Range("B9") = 0                             'reset displaying markers

End Sub

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

Function GameWon(x As Long, y As Long, totalmines As Long) As Boolean
'This function checks if we won or not by counting that only those cells are not revealed which
'contains bombs or not

    Dim mines As Long, i As Long, j As Long

    mines = 0
    GameWon = False
    
    'loop through the playfield and if only mines are not revealed than game was won
    For i = 0 To x
        For j = 0 To y
            If Cells(i + 2, j + 4).Interior.color = rgb(200, 200, 200) Or _
               Cells(i + 2, j + 4).Interior.color = rgb(255, 200, 0) Then
                mines = mines + 1
            End If
        Next j
    Next i

    If mines = totalmines Then
        GameWon = True
    End If

End Function
