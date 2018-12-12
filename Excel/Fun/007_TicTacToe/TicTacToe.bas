Attribute VB_Name = "TicTacToe"
Option Explicit
Dim positions(5) As String      'this array will contain the cells which resulted a win

Sub TicTacToe()
    Dim row As Long, column As Long

    row = Range("B4")           'how many rows we want to have in the playfield
    column = Range("B5")        'how many columns we watn to have in the playfield
  
    'checking if playfield is too small or not playable
    If Not IsNumeric(row) Or row < 2 Or Not IsNumeric(column) Or column < 2 Then
        Exit Sub
    End If

    'setup the board
    Call Setup(ActiveSheet.Name, row, column)

End Sub

Function Check_Win(player As String, cell As Range, p_row As Long, p_column As Long) As Boolean
    Dim adjecents As Single
    Dim i As Single

    'initialize the variants
    Check_Win = False
    adjecents = 0
    Erase positions

    'let's assume that current cell is part of the winning cells
    positions(0) = cell.Address

    'First let's check horizontally the grid
    'Let's check 4 cells on left side the current cell one by one: start with the closest cell if it is having the same
    'value as of the current cell, check the next one. We should break out of the loop if the checked cell is
    'different from the current cell
    For i = 1 To 4
        If cell.column - i > 3 Then             'we should not go outside of playground
            If cell.Offset(, -i) = player Then
                adjecents = adjecents + 1
                positions(adjecents) = cell.Offset(, -i).Address
            Else
                Exit For
            End If
        End If
    Next i

    'Let's continue the horizontal check, but now validate cells to right
    For i = 1 To 4
        If cell.column + i < p_column + 4 Then    'we should not go outside of playground
            If cell.Offset(, i) = player Then
                adjecents = adjecents + 1
                positions(adjecents) = cell.Offset(, i).Address
            Else
                Exit For
            End If
        End If
    Next i

    'if horizontal check (the combined result of going left and right) reaches 4, then user won the game
    If adjecents = 4 Then
        Check_Win = True
        Exit Function
    End If

    'Let's continue the check in vertical direction, first check 4 cells above the current one
    'we should start the counting of the same cells from zero again
    adjecents = 0

    'Check max. 4 cells above the current cell
    For i = 1 To 4
        If cell.row - i > 1 Then
            If cell.Offset(-i) = player Then
                adjecents = adjecents + 1
                positions(adjecents) = cell.Offset(-i).Address
            Else
                Exit For
            End If
        End If
    Next i

    'Check 4 cells below the current cell
    For i = 1 To 4
        If cell.row + i < p_row + 2 Then
            If cell.Offset(i) = player Then
                adjecents = adjecents + 1
                positions(adjecents) = cell.Offset(i).Address
            Else
                Exit For
            End If
        End If
    Next i

    'if vertical check (the combined result of going up and down) reaches 4, then user won the game
    If adjecents = 4 Then
        Check_Win = True
        Exit Function
    End If

    'Here we start the diagonal checks, which could have 2 x 2 combo:
    '1. left and up + right and down
    '2. left and down + right and up
    
    adjecents = 0

    'Diagonal 1A: left + up
    For i = 1 To 4
        If cell.column - i > 3 And cell.row - i > 1 Then                     'we should not go outside of playground
            If cell.Offset(-i, -i) = player Then
                adjecents = adjecents + 1
                positions(adjecents) = cell.Offset(-i, -i).Address
            Else
                Exit For
            End If
        End If
    Next i

    'Diagonal 1B: right + down
    For i = 1 To 4
        If cell.column + i < p_column + 4 And cell.row + i < p_row + 2 Then   'we should not go outside of playground
            If cell.Offset(i, i) = player Then
                adjecents = adjecents + 1
                positions(adjecents) = cell.Offset(i, i).Address
            Else
                Exit For
            End If
        End If
    Next i

    If adjecents = 4 Then
        Check_Win = True
        Exit Function
    End If

    adjecents = 0

    'Diagonal 2A: left + down
    For i = 1 To 4
        If cell.column - i > 3 And cell.row + i < p_row + 2 Then          'we should not go outside of playground
            If cell.Offset(i, -i) = player Then
                adjecents = adjecents + 1
                positions(adjecents) = cell.Offset(i, -i).Address
            Else
                Exit For
            End If
        End If
    Next i

    'Diagonal 2B: right + up
    For i = 1 To 4
        If cell.column + i < p_column + 4 And cell.row - i > 1 Then       'we should not go outside of playground
            If cell.Offset(-i, i) = player Then
                adjecents = adjecents + 1
                positions(adjecents) = cell.Offset(-i, i).Address
            Else
                Exit For
            End If
        End If
    Next i

    If adjecents = 4 Then
        Check_Win = True
        Exit Function
    End If

End Function

Sub Colorize()
    Dim i As Single

    'loop through the array which contains the cell addresses
    For i = 0 To 4
        With Range(positions(i))
            .Interior.Color = RGB(200, 200, 200)
        End With
    Next i

End Sub

Sub Setup(sheet As String, row As Long, column As Long)

    'turn off gridlines
    ActiveWindow.DisplayGridlines = False

    'clear sheet from column D
    Columns("D:XFD").Clear

    'set active player to X
    Range("B7") = "X"

    'clear the field where winner of previous game is displayed
    Range("A9").ClearContents

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
        
        'add conditional formatting: if cell value is X the font color is blue, for O is red
        .FormatConditions.Add Type:=xlCellValue, Operator:=xlEqual, Formula1:="X"
        .FormatConditions(1).Font.Color = RGB(0, 0, 255)
        .FormatConditions.Add Type:=xlCellValue, Operator:=xlEqual, Formula1:="O"
        .FormatConditions(2).Font.Color = RGB(255, 0, 0)
        
        .Font.Bold = True
    End With

    'make cells square: width is in points (1/72 of an inch), height is in pixels
    Columns("D").Resize(, column).ColumnWidth = 2.43
    Rows("2").Resize(row).RowHeight = 17

End Sub
