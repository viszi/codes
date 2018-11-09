Attribute VB_Name = "LangtonsAnt"
Option Explicit
Const up = 0
Const right = 1
Const down = 2
Const left = 3
Dim currentR As Long, currentC As Long, direction As Integer
Dim row As Long, column As Long

Sub LangtonsAnt()
    Dim i As Long
    Dim steps As Long, max_steps As Long
    Dim pausetime As Integer, start As Single
    Dim sbar As Boolean
    
    Const wsStart = "Start"
    Const wsAnt = "Langtons Ant"

    row = Sheets(wsStart).Range("B2")           'how many rows we want to have in the playfield
    column = Sheets(wsStart).Range("B3")        'how many columns we watn to have in the playfield
    max_steps = Sheets(wsStart).Range("B4")     'how many steps we would like to take
    pausetime = Sheets(wsStart).Range("B5")

    'in statusbar we will show the number of steps taken / needed
    sbar = Application.DisplayStatusBar
    If Not sbar Then Application.DisplayStatusBar = True
    
    'checking if playfield is too small or not playable
    If Not IsNumeric(row) Or row < 2 Or Not IsNumeric(column) Or column < 2 Then
        Exit Sub
    End If

    'setup the playground
    Call Setup(wsAnt, row, column)
    'wait 1 sec to make the playground
    Application.Wait (Now + TimeSerial(0, 0, 1))

    'initial position and direction
    currentR = Sheets(wsStart).Range("B7")
    currentC = Sheets(wsStart).Range("B8")
    
    'mark the starting position as block
    Cells(1 + currentR, 1 + currentC).Interior.color = vbBlack

    'set the correct initial direction as given
    Select Case Sheets(wsStart).Range("B9")
    Case "up"
        direction = up
    Case "right"
        direction = right
    Case "down"
        direction = down
    Case "left"
        direction = left
    End Select

    steps = 1

    'make steps until we have not reached the requested number of steps
    Do While steps < max_steps
        'step forward
        Call moveStep

        'use the rules
        '1. if cell is white: turn to right and make cell black
        '2. if cell is black: turn to left and make cell white
        If Cells(1 + currentR, 1 + currentC).Interior.color = vbWhite Then
            Call turn(1)    'adding 1 to the current direction will turn right
            Cells(1 + currentR, 1 + currentC).Interior.color = vbBlack
        Else
            Call turn(-1)
            Cells(1 + currentR, 1 + currentC).Interior.color = vbWhite
        End If

        steps = steps + 1
        
        'display the counter on statusbar
        Application.StatusBar = "Step: " & steps & "  / Requested: " & max_steps

        'wait a bit to finish the animation
        If pausetime > 0 Then
            start = VBA.Timer()
            Do While VBA.Timer() < (start + pausetime / 100)
                DoEvents
            Loop
        End If
    Loop

    'restore the original statusbar
    Application.DisplayStatusBar = sbar
    
End Sub

Function turn(dir)
'Adjust the direction by 1 or -1

    '0 is up, 1 is right, 2 is down, 3 is left
    'adding 1 to direction will turn the ant right, -1 turns to left
    direction = direction + dir
    
    If dir = 1 And direction > left Then direction = up
    If dir = -1 And direction < up Then direction = left

End Function

Function moveStep()
'Step forward by 1 cell

    'Depends on the direction we have to change row or column number
    Select Case direction
    Case up
        currentR = currentR - 1         'going up means that row number is decreased by 1
    Case right
        currentC = currentC + 1         'going right means that column number is increased by 1
    Case down
        currentR = currentR + 1         'going down means that row number is increased by 1
    Case left
        currentC = currentC - 1         'going left means that column number is decreased by 1
    End Select

    'if we have to go outside of the playground, then continue the step on other side
    If currentR < 1 Then
        currentR = row
    End If

    If currentR > row Then
        currentR = 1
    End If

    If currentC < 1 Then
        currentC = column
    End If

    If currentC > column Then
        currentC = 1
    End If

End Function

Sub Setup(sheet As String, row As Long, column As Long)

    'activate given sheet
    Sheets(sheet).Activate
    
    Application.ScreenUpdating = False

    'turn off gridlines
    ActiveWindow.DisplayGridlines = False

    'clear sheet from column B
    Columns("B:XFD").Clear

    'set the borders of the playground from cell B2
    With ThisWorkbook.Sheets(sheet).Cells(2, 2).Resize(row, column)
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
        .NumberFormat = ";;;"                   'hide cell content
        .Interior.color = rgb(255, 255, 255)    'give a white background color
    End With

    'make cells square: height is in points (1/72 of an inch), height is in pixels
    Columns("B").Resize(, column).ColumnWidth = 2.43
    Rows("2").Resize(row).RowHeight = 17

    Application.ScreenUpdating = True

End Sub
