# Analog clock on a worksheet

This code was inspired by Coding Challenge 74 by The Coding Train. You can watch it on [Youtube](https://www.youtube.com/watch?v=E4RyStef-gY&t=685s).

You can download the
 - final Excel version and
 - the module file what you can import to an Excel file.

![Clock](https://github.com/viszi/codes/blob/master/Excel/Fun/002_Clock/images/001_Clock.png)

## How it works?

1. The clock
   
   First we have to create the clock itself. For the outer shapes use arcs (Insert -> Shapes -> Basic Shapes -> Arc) for the hour, minute and seconds.
Each arc is having a bit different size. 
   For the clock hands we can draw lines.
   
   If we create a procedure which can draw an arc or line in a given position, then our code will be more generic / easy to maintain.
   
   ```
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

  
  Using the above sub-routine drawing the hour arc will be only just 1 line:
  
   ```
    Call arcCreate("arcHR", 200, 50, 100, 150, 255, 100)
   ```

2. Animating the outer part

   Arcs are having a starting and ending point; we have to adjust only the end point. The values should be between 0 and 360, but at 12 o'clock the value is -90.
   
   We have to map the time values between -90 and 270. Eg. the value to for 5 p.m. (and 5 a.m. too) will be 60. The formula is
   
   ```
   = (360/12 hrs * 5 hrs) - 90
   ```
   
   ```
   Sub moveArc(arc As String, timepart As Single, maxtime As Single)
   'Redraw the outer part of the clock
   
    Dim arcAngle As Double

    'for hours 12 hours equals to 360 degree, for the others 60 mins/seconds
    arcAngle = 360 / maxtime * timepart
    
    'we have to update only the ending point of the shape
    ActiveSheet.Shapes.Item(arc).Adjustments.Item(2) = arcAngle - 90
   End Sub
   ```

3. Animating the hands

   Lines can be rotated at a given angle, and because 0 degree is at 12 o'clock and 180 at 6 o'clock it is much easier.

   ```
   Sub rotateLine(line As String, timepart As Single, maxtime As Single)
   'Redraw the clock hand

    Dim arcAngle As Double

    arcAngle = 360 / maxtime * timepart

    'we have to rotate the selected hand
    ActiveSheet.Shapes.Item(line).Rotation = arcAngle

   End Sub
   ```
   
4. Redraw the outer part and the hands

   In step 2 and 3 we found a way to animate the parts of the clock, so the only remaining task is to call the animation every seconds.
   Procedure MoveIt is called every seconds and will update the positions of the parts.
   
   ```
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
