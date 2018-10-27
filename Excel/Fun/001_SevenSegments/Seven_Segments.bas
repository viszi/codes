Attribute VB_Name = "SevenSegments"
Option Explicit

Const abcdefgCodes = "1111110:0110000:1101101:1111001:0110011:1011011:1011111:1110000:1111111:1111011:1110111:0011111:1001110:0111101:1001111:1000111:1000111"
Const abcdefgReset = "0000000"

Sub SetupDisplay()
'This routine is creating the seven segments on the active sheet on the requested position

    'at the beginning the segments should not be filled
    Const fill = msoFalse

    'draw shapes on the active sheet
    'the arguments: x position, y position, width, height, segment name, filled or not
    Call ShapeCreate(100, 10, 80, 10, "A-seg", fill)
    Call ShapeCreate(180, 20, 10, 80, "B-seg", fill)
    Call ShapeCreate(180, 110, 10, 80, "C-seg", fill)
    Call ShapeCreate(100, 190, 80, 10, "D-seg", fill)
    Call ShapeCreate(90, 110, 10, 80, "E-seg", fill)
    Call ShapeCreate(90, 20, 10, 80, "F-seg", fill)
    Call ShapeCreate(100, 100, 80, 10, "G-seg", fill)

    'unselect the last shape
    Range("A2").Select

End Sub

Sub DisplayNumbers()
'In this routine we are looping through the available display codes which describes which segment should be
'on or off to display a number or letter

    Dim i As Single, c As Single
    Dim splitCodes

    'set to initate state all segments
    For i = 1 To 7
      Call ShapeOnOff(i, Mid(abcdefgReset, i, 1))
    Next i

    'load the display codes into an array
    splitCodes = Split(abcdefgCodes, ":")

    'go through possible display values: 0-9, ABCDEF
    For c = 0 To UBound(splitCodes) - 1
        Range("A2") = c
        'display the 7-segment of the code
        For i = 1 To 7
            Call ShapeOnOff(i, Mid(splitCodes(c), i, 1))
        Next i
        'wait 1 sec before showing the next value
        Call Sleep(100)
    Next c

End Sub

Sub ShapeOnOff(nameID, onoff)
'This routing gets a segment id and the flag which tells to turn it on or off

    Dim status As String
    Dim name As String

    'on of status converted to a boolean
    If onoff = "1" Then
        status = msoTrue
    Else
        status = msoFalse
    End If

    'we named the segments in the official name (from A to G) but to the code got a number (from 1 to 7)
    'we are replacing the segment number with the official segment name
    'This code part can be easily eliminated if we are just nameing the segments from 1 to 7
    Select Case nameID
    Case 1
        name = "A-seg"
    Case 2
        name = "B-seg"
    Case 3
        name = "C-seg"
    Case 4
        name = "D-seg"
    Case 5
        name = "E-seg"
    Case 6
        name = "F-seg"
    Case 7
        name = "G-seg"
    End Select

    'we are turning on or off the visibility of given segment
    ActiveSheet.Shapes.Item(name).Select
    With Selection.ShapeRange.fill
        .Visible = status
        .Transparency = 0
        .Solid
    End With

    'unselect the last segment
    Range("A1").Select
    
End Sub

Sub ShapeCreate(xpos, ypos, width, height, name, bFill)
'This routine is creating a rectangular shape at the given position and size
'It is called from the SetupDisplay sub-routine

    ActiveSheet.Shapes.AddShape(msoShapeRoundedRectangle, xpos, ypos, width, height).Select
    With Selection.ShapeRange.fill
        .Visible = bFill
        .ForeColor.RGB = RGB(255, 0, 0)
        .Transparency = 0
    End With
    
    With Selection.ShapeRange.Line
        .Visible = msoTrue
        .ForeColor.RGB = RGB(255, 0, 0)
        .Transparency = 0
    End With

    Selection.name = name
    
End Sub

Sub RemoveSegments()
'This function removes all shapes from the activesheet which have "-seg" in their name

Dim shps As Shape

For Each shps In ActiveSheet.Shapes
    If InStr(1, shps.name, "-seg") > 0 Then
        shps.Delete
    End If
Next shps

End Sub

Function Sleep(delay As Single)
'This function waits for the given time
'For 1 sec delay call it as Sleep(100)

    Dim start As Single

    start = VBA.Timer()
    Do While VBA.Timer() < (start + delay / 100)
        DoEvents
    Loop

End Function

