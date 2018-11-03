Attribute VB_Name = "Clock"
Option Explicit
Dim stopFlag As Boolean

Sub clockStart()

    'create the outer part of the clock
    Call arcCreate("arcHR", 200, 50, 100, 150, 255, 100)
    Call arcCreate("arcMIN", 200, 50, 110, 150, 100, 255)
    Call arcCreate("arcSEC", 200, 50, 120, 255, 100, 150)

    'align the centered the created shapes
    ActiveSheet.Shapes.Range(Array("arcHR", "arcMIN", "arcSEC")).Select
    Selection.ShapeRange.Align msoAlignMiddles, msoFalse
    Selection.ShapeRange.Align msoAlignCenters, msoFalse
    Range("D1").Select

    'duplicate clock hands with no visible lines; its length is double of the original hand
    Call lineCreate("lineHR2", 200, 170 + (170 - 120), 200, 120, False, 255, 255, 255)
    Call lineCreate("lineMIN2", 200, 170 + (170 - 110), 200, 110, False, 255, 255, 255)
    Call lineCreate("lineSEC2", 200, 170 + (170 - 80), 200, 80, False, 255, 255, 255)

    'create visible part of clock hands
    Call lineCreate("lineHR1", 200, 170, 200, 120, True, 150, 255, 100)
    Call lineCreate("lineMIN1", 200, 170, 200, 110, True, 150, 100, 255)
    Call lineCreate("lineSEC1", 200, 170, 200, 80, True, 255, 100, 150)

    'merge the duplicated clock hands with the original: rotation of this is much easier than rotating
    'only the clock hands
    If Not isShapeCreated("lineHR") Then
        ActiveSheet.Shapes.Range(Array("lineHR1", "lineHR2")).Group.Select
        Selection.ShapeRange.name = "lineHR"
    End If

    If Not isShapeCreated("lineMIN") Then
        ActiveSheet.Shapes.Range(Array("lineMIN1", "lineMIN2")).Group.Select
        Selection.ShapeRange.name = "lineMIN"
    End If

    If Not isShapeCreated("lineSEC") Then
        ActiveSheet.Shapes.Range(Array("lineSEC1", "lineSEC2")).Group.Select
        Selection.ShapeRange.name = "lineSEC"
    End If
    
    'unselect all shape
    Range("A1").Select

    'clock should run until it is not stopped
    stopFlag = False
    Do
        Call moveIt
        Range("D11") = Time     'print actual time to cell D11
        Call Sleep(100)
    Loop Until stopFlag
 
End Sub

Sub clockStop()
'Stop the clock
    
    stopFlag = True

End Sub

Sub arcCreate(name As String, x, y, w, red, green, blue)
    Dim i As Long

    'if shape is alread exists do not touch it
    If isShapeCreated(name) Then Exit Sub

    'addshape: shape type, x position, y position, size x, size y
    ActiveSheet.Shapes.AddShape(msoShapeArc, x, y, w, w).Select
    Selection.ShapeRange.name = name

    With Selection.ShapeRange.line
        .visible = msoTrue
        .ForeColor.rgb = rgb(red, green, blue)
        .Weight = 8
    End With

End Sub

Sub lineCreate(name As String, x, y, w, h, visible As Boolean, red, green, blue)
    Dim i As Long

    'if shape is alread exists do not touch it
    If isShapeCreated(name) Then Exit Sub

    'msoConnectorStraight, start x, start y, end x, end y
    ActiveSheet.Shapes.AddConnector(msoConnectorStraight, x, y, w, h).Select
    Selection.ShapeRange.name = name

    With Selection.ShapeRange.line
        If visible Then
            .visible = msoTrue
            .ForeColor.rgb = rgb(red, green, blue)
            .Weight = 2
        Else
            .visible = msoFalse
        End If
    End With

End Sub

Sub moveIt()
'This will move the hands and update the outer part of the clock

    Dim currentTime As Double
    Dim currentHR As Single, currentMIN As Single, currentSEC As Single

    currentTime = Now
    currentHR = Hour(currentTime) Mod 12
    currentMIN = Minute(currentTime)
    currentSEC = Second(currentTime)

    Call moveArc("arcHR", currentHR, 12)
    Call moveArc("arcMIN", currentMIN, 60)
    Call moveArc("arcSEC", currentSEC, 60)

    Call rotateLine("lineHR", currentHR, 12)
    Call rotateLine("lineMIN", currentMIN, 60)
    Call rotateLine("lineSEC", currentSEC, 60)

End Sub

Sub moveArc(arc As String, timepart As Single, maxtime As Single)
'Redraw the outer part of the clock

    Dim arcAngle As Double

    'for hours 12 hours equals to 360 degree, for the others 60 mins/seconds
    arcAngle = 360 / maxtime * timepart
    
    'we have to update only the ending point of the shape
    ActiveSheet.Shapes.Item(arc).Adjustments.Item(2) = arcAngle - 90

End Sub

Sub rotateLine(line As String, timepart As Single, maxtime As Single)
'Redraw the clock hand

    Dim arcAngle As Double

    arcAngle = 360 / maxtime * timepart

    'we have to rotate the selected hand
    ActiveSheet.Shapes.Item(line).Rotation = arcAngle

End Sub

Function isShapeCreated(shpname As String, Optional exact As Boolean = False) As Boolean
'Check if we already have a shape with that name

    Dim shp As shape, hit As Boolean

    hit = False

    If exact Then
        For Each shp In ActiveSheet.Shapes
            If shpname = shp.name Then hit = True
        Next shp
    Else
        For Each shp In ActiveSheet.Shapes
            If InStr(1, shpname, shp.name) Then hit = True
        Next shp
    End If

    isShapeCreated = hit

End Function

Function Sleep(delay As Single)
    Dim start As Single

    start = VBA.Timer()
    Do While VBA.Timer() < (start + delay / 100)
        DoEvents
    Loop

End Function

