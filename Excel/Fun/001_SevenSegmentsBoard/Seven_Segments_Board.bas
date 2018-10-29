Attribute VB_Name = "SevenSegmentsBoard"
Option Explicit

Sub SetupBoard()
'Procedure to create the seven-segments board, which contains 10 seven-segment display on the active sheet
    
    Const color = vbRed     'color of the display board
    Const fill = msoFalse   'msoFalse / msoTrue
    Const gap = 1           'let's have a small gap between the corners of the segments
    Const offset = 50       'gap between the 10 board elements
    Dim i As Single

    'draw the 10 displays, every display has 7 segments
    For i = 0 To 9
        Call ShapeCreate(20 + offset * i, 50, 30, 5, 9 - i & "A", fill, color)
        Call ShapeCreate(50 + gap + offset * i, 55 + gap, 5, 30, 9 - i & "B", fill, color)
        Call ShapeCreate(50 + gap + offset * i, 90 + gap * 3, 5, 30, 9 - i & "C", fill, color)
        Call ShapeCreate(20 + offset * i, 120 + gap * 4, 30, 5, 9 - i & "D", fill, color)
        Call ShapeCreate(15 - gap + offset * i, 90 + gap * 3, 5, 30, 9 - i & "E", fill, color)
        Call ShapeCreate(15 - gap + offset * i, 55 + gap, 5, 30, 9 - i & "F", fill, color)
        Call ShapeCreate(20 + offset * i, 85 + gap * 2, 30, 5, 9 - i & "G", fill, color)
    Next i

    'unselect the last drawn shape
    Range("A2").Select
    
End Sub

Sub RemoveBoard()
'This procedure removes all shapes which could be part of the seven segmen display board
    
    Dim shp As Shape
    
    'loop through the shapes on the active sheet and delete everything which has 2 character long name and it is ending with a letter in A..G
    For Each shp In ActiveSheet.Shapes
        If Len(shp.name) = 2 And InStr(1, "ABCDEFG", Right(shp.name, 1)) Then
            shp.Delete
        End If
    Next shp

End Sub

Sub DisplayText()
'This procedure will display the input text on the board
'It adds the input text character to an array called displays one by one (first time only the first character, second time
'the first 2 characters and so on)
'The actual content of the displays array will be shown on the board

    Dim i As Long, c As Long, p As Long, j As Long
    Dim text As String                          'variable for the input text what we have to display
    Dim code As String * 7                      'variable for the seven segment display codes
    Dim displays(9) As String * 1               'the 10 element long array - 1 element for every display - which contains the shown text

    'clear contents of all displays
    For c = 0 To 9
        'reset
        For i = 1 To 7
            Call ShapeOnOff(c, i, Mid("0000000", i, 1))
        Next i
    Next c

    text = Trim(Range("C2"))

    'start to display the given text
    'the display array will hold the characters and once a character is displayed,
    'then we will shift the characters in the array to the left and add a new letter from the text to the array
    For j = 0 To 9 + Len(text)
        'shif displays to left
        For p = 8 To 0 Step -1
            displays(p + 1) = displays(p)
        Next p

        'add to 0. position the next char from the input if there are any
        If j < Len(text) Then
            displays(0) = Mid(text, j + 1, 1)
        Else
            displays(0) = ""
        End If

        'print all letters stored in displays
        For c = 0 To 9
            'get the 7-segment display code from the code table (which is on the active sheet) for the character stored in the array
            code = GetCode(displays(c))

            'display the character as per 7-segment display code
            For i = 1 To 7
                Call ShapeOnOff(c, i, Mid(code, i, 1))
            Next i
        Next c

        Range("A1").Select

        'wait a bit for animation
        Call Sleep(10)
    Next j

End Sub

Function GetCode(char) As String
'The function gets the seven segment display code from the code table, which is on the active sheet from cell M1

    Dim rngCodeTable As Range
    Dim position As Single, i As Single

    'select the first column of the code table
    Set rngCodeTable = Range("M2").CurrentRegion.Resize(, 1)

    'try to find the given charcter in first column of the code table
    'skip any unexpected errors for non-existing characters in code table
    On Error Resume Next
    position = Application.WorksheetFunction.Match(LCase(CStr(char)), rngCodeTable, 0)
    On Error GoTo 0

    'put together the code (0 and 1) into a string - column N-P will concatenated
    If position > 0 Then
        GetCode = ""
        For i = 1 To 7
            GetCode = GetCode & CStr(Cells(position, 13 + i))
        Next i
    End If

    'if no display code was found use a blank
    If GetCode = "" Then GetCode = "0000000"
    
    'release the code table variable
    Set rngCodeTable = Nothing

End Function

Sub ShapeOnOff(display, segment, onoff)
'This routing gets the display number (0..9), segment id (1..7) and the flag which tells to turn it on or off

    Dim status As String
    Dim name As String

    'on/off status converted to a boolean
    If onoff = "1" Then
        status = msoTrue
    Else
        status = msoFalse
    End If

    'we named the segments in the official name (from A to G) but the code sent a number (from 1 to 7)
    'we are replacing the segment number with the official segment name
    'This code part can be easily eliminated if we are just nameing the segments from 1 to 7 instead of A to G
    Select Case segment
    Case 1
        name = "A"
    Case 2
        name = "B"
    Case 3
        name = "C"
    Case 4
        name = "D"
    Case 5
        name = "E"
    Case 6
        name = "F"
    Case 7
        name = "G"
    End Select

    'we are turning on or off the visibility of given segment
    ActiveSheet.Shapes.Item(display & name).Select
    With Selection.ShapeRange.fill
        .Visible = status
        .Transparency = 0
        .Solid
    End With

End Sub

Sub ShapeCreate(xpos, ypos, width, height, name, bFill, color)
'This routine is creating a rectangular shape at the given position and size
'It is called from the SetupBoard sub-routine

    ActiveSheet.Shapes.AddShape(msoShapeRoundedRectangle, xpos, ypos, width, height).Select
    With Selection.ShapeRange.fill
        .Visible = bFill
        .ForeColor.RGB = color
        .Transparency = 0
    End With
    
    With Selection.ShapeRange.Line
        .Visible = msoTrue
        .ForeColor.RGB = color
        .Transparency = 0
        .DashStyle = msoLineDash
    End With

    Selection.name = name
    
End Sub

Function Sleep(delay As Single)
    Dim start As Single

    start = VBA.Timer()
    Do While VBA.Timer() < (start + delay / 100)
        DoEvents
    Loop

End Function
