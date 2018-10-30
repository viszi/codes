# How the given code was written?

Excel has a built-in macro recorder, which can be used to see a version (not the optimal) of a code for a given problem. 
It is not necessary to know all objects and methods by heart, becasuse you have the built-in macro recorder and the unlimited wisdom of the internet.

However I strongly suggest before starting to create Excel macros to be familiar with (= know how to use)
* existing Excel functions (like SUM, VLOOKUP, MATCH etc)
* basics of Visual Basic for Application language (like run code, use variables etc).

## 1. Creating the 7-segment display

Just open an empty Excel file and record the creation of a seven segment display. (Don't worry about to give a name and to have rounded edges.) 

![7-segment display](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/7_Segment_Display_with_Labeled_Segments.svg/220px-7_Segment_Display_with_Labeled_Segments.svg.png)

So click on Record Macro button and then use Insert -> Shapes -> Rectangle or Rectangle with rounded corners to add to the active sheet one-by one the shapes.

You will get something like this, far away from perfect.
![First drawing](https://github.com/viszi/codes/blob/master/Excel/Fun/001_SevenSegments/images/001_Drawing_shapes.png)

As you check the code you will see the pattern that below line is repeated 7 times

    ActiveSheet.Shapes.AddShape(msoShapeRectangle, number1, number2, number3, number4).Select

This line tells to Excel to draw a rectangle shape to the given x-position (number1) and y-position (number2) with a width (number3) and a height number4).

Just change the numbers in the code and you will see how it will affect the result. 
Try this example if you lost!

    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 100, 10, 80, 10).Select
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 180, 20, 10, 80).Select
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 180, 110, 10, 80).Select
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 100, 190, 80, 10).Select
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 90, 110, 10, 80).Select
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 90, 20, 10, 80).Select
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 100, 100, 80, 10).Select

2 more things and we are ready by creating the 7-segment display from VBA.

First let's give for every shape a name (Excel is just assigning a sequential name to it). The Wikipedia page says that segments are named as A, B, C, D, E, F and G.

    Selection.Name = "A"
    
Above code will rename the selected shape to A, but we cannot add this to anywhere in the code (e.g. if you add after the last line, then the last selected shape will be renamed to "A", but we want to rename the first segment in this way).
The solution is that we are drawing a shape and renaming it immediately.

    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 100, 10, 80, 10).Select
    Selection.Name = "A"
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 180, 20, 10, 80).Select
    Selection.Name = "B"
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 180, 110, 10, 80).Select
    Selection.Name = "C"
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 100, 190, 80, 10).Select
    Selection.Name = "D"
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 90, 110, 10, 80).Select
    Selection.Name = "E"
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 90, 20, 10, 80).Select
    Selection.Name = "F"
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 100, 100, 80, 10).Select
    Selection.Name = "G"

If you delete all shapes from the active sheet and re-run the program no visual change will be there, but if you enable on Home tab -> Editing section -> Find & Select -> Selection pane,
then you will see that shapes are having the given names.

![Names of shapes](https://github.com/viszi/codes/blob/master/Excel/Fun/001_SevenSegments/images/002_Naming_shapes.png)

Last thing is to remove the fill of the shapes (we need only the outline). The code for that is

    Selection.ShapeRange.Fill.Visible = msoFalse
    
It is changing only the last selected item, so we have to use 7 times after every shape drawing and renaming it.

    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 100, 10, 80, 10).Select
    Selection.Name = "A"
    Selection.ShapeRange.Fill.Visible = msoFalse    
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 180, 20, 10, 80).Select
    Selection.Name = "B"
    Selection.ShapeRange.Fill.Visible = msoFalse    
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 180, 110, 10, 80).Select
    Selection.Name = "C"
    Selection.ShapeRange.Fill.Visible = msoFalse    
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 100, 190, 80, 10).Select
    Selection.Name = "D"
    Selection.ShapeRange.Fill.Visible = msoFalse    
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 90, 110, 10, 80).Select
    Selection.Name = "E"
    Selection.ShapeRange.Fill.Visible = msoFalse    
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 90, 20, 10, 80).Select
    Selection.Name = "F"
    Selection.ShapeRange.Fill.Visible = msoFalse    
    ActiveSheet.Shapes.AddShape(msoShapeRectangle, 100, 100, 80, 10).Select
    Selection.Name = "G"
    Selection.ShapeRange.Fill.Visible = msoFalse    

This code will draw for us the 7 segments, but as you have realized we are drawing + renaming + unfilling 7 times, the code is almost the same.
It can be simplified if we are creating a procedure (a sub-routine) and passing to it the correct values. Let's call this routine as ShapeCreate(), which will accept some parameters.

    Sub ShapeCreate(xpos, ypos, width, height, name)

        ActiveSheet.Shapes.AddShape(msoShapeRectangle, xpos, ypos, width, height).Select
        Selection.Name = name
        Selection.ShapeRange.Fill.Visible = msoFalse   

    End Sub

In our original code the 3 lines can be replaced with only 1 from now

    Call ShapeCreate(100, 10, 80, 10, "A")
    Call ShapeCreate(180, 20, 10, 80, "B")
    Call ShapeCreate(180, 110, 10, 80, "C")
    Call ShapeCreate(100, 190, 80, 10, "D")
    Call ShapeCreate(90, 110, 10, 80, "E")
    Call ShapeCreate(90, 20, 10, 80, "F")
    Call ShapeCreate(100, 100, 80, 10, "G")

### Conclusion

So far we created the basic shapes with the help of built-in macro recorder and made some improvements. Result looks like this.

![Finished shapes](https://github.com/viszi/codes/blob/master/Excel/Fun/001_SevenSegments/images/003_Shapes.png)

## 2. Logic to display numbers and characters

If we are turning on and off the 7-segments in the correct pattern then we could display numbers or characters. The next table shows which segments should be on or off for a number:

Digit|a|b|c|d|e|f|g
-|-|-|-|-|-|-|-
0|**on**|**on**|**on**|**on**|**on**|**on**|off
1|off|**on**|**on**|off|off|off|off
2|**on**|**on**|off|**on**|**on**|off|**on**
3|**on**|**on**|**on**|**on**|off|off|**on**
4|off|**on**|**on**|off|off|**on**|**on**
5|**on**|off|**on**|**on**|off|**on**|**on**
6|**on**|off|**on**|**on**|**on**|**on**|**on**
7|**on**|**on**|**on**|off|off|off|off
8|**on**|**on**|**on**|**on**|**on**|**on**|**on**
9|**on**|**on**|**on**|**on**|off|**on**|**on**

Instead of "on" we could say 1, and for "off" 0. Number 4 can be written as 0 1 1 0 0 1 1, and without spaces it will be 0110011.

It is clear that all 7-segments must be changed to display correctly a number. We must loop through all segments (shapes) and change them.
One way in VBA is to ```For ... Next``` loop.

    For i = 1 to 7 
        'segment i status = on or off
    Next i

We should write a procedure which accepts 2 parameters, the first is the segment and the second is the status of the fill (on or off).

    Sub ShapeOnOff(segmentname, onoff)

        ActiveSheet.Shapes.Item(segmentname).Select
        Selection.ShapeRange.fill.Visible = onoff

    End Sub
   
There are two problems with the above procedure:
1. In the "onoff" status we will send 1 (for on) and 0 (off), but the visible attribute expects "msoTrue" or "msoFalse"
2. Segment name must be A, B, C .. G, because this is how we named the shapes, but how we can get the correct segment name? 

First can be easily solved with an ```IF .. THEN .. ELSE``` statement:

    If onoff = 1 then
        status = msoTrue
    Else
        status = msoFalse
    End if    

For the second the issue is that instead of "B" we will give to the program 2. We could use many ```IF .. THEN .. ELSE``` statements, but let's explore the
```Select Case``` statement. Which based on the input jumps to the matching line immediately and performs the given actions. 

    Select Case segmentname
    Case 1
        segment = "A"
    Case 2
        segment = "B"        
    Case 3
        segment = "C"
    Case 4
        segment = "D"
    Case 5
        segment = "E"
    Case 6
        segment = "F"
    Case 7
        segment = "G"
    End Select

Based on these changes we will have a complex ShapeOnOff procedure.

    Sub ShapeOnOff(segmentname, onoff)
        Dim status As String
        Dim name As String

        If onoff = "1" Then
            status = msoTrue
        Else
            status = msoFalse
        End If

        Select Case segmentname
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

        ActiveSheet.Shapes.Item(name).Select
        Selection.ShapeRange.Fill.Visible = status

    End Sub

## 3. Let's display number 4

We know that 4 can be displayed by this combination "0110011", which describes the status of every segment (1st is off, 2nd is on etc.)
Let's call the procedure Display4().

    Sub Display4()

        For i = 1 To 7
            Call ShapeOnOff(i, ???)
        Next i
    
    End Sub

The only problem that how we are giving to the ShapeOnOff function the correct value?

MID is a function in Excel which returns the given part of a text. eg. MID("Rock",2,1) will give us the 2nd character only, which is "o".
So MID("0110011",7,1) will give us 1 - the 7th character.

Here is the updated code: 

    Sub Display4()

        For i = 1 To 7
            onoff = Mid("0110011",i,1)
            Call ShapeOnOff(i, onoff)
        Next i
    
    End Sub

Results look promising.

![Number 4](https://github.com/viszi/codes/blob/master/Excel/Fun/001_SevenSegments/images/004_Display_4.png)

## 4. Let's display any numbers

We succesfully displayed number 4, but how about the rest?
It is simple: we have to use the correct display code and not what we used for number 4. These codes are not changing so we should store in a constant.

    Const number4 = "0110011"
    Const number5 = "1011011"
    Const number....

We can do this better, let's store them in an array. The 0th element (which is the first element) of the array will contain the display code for number 0
and the 9th element for number 9. Synthax for creating an array is ```Dim numbers(size) as <data type>``` , where size is how many elements we would need in the array.
You can give a just a number like 5, in this case it will have 5+1=6 elements of the array or you can say ```Dim numbers(1 to 5)``` and in this case you will have only 5.
Data type could be a String or an Int (an integer number) or Double (a decimal number).

The below code is displaying all numbers from 0-9, between the numbers it waits 1 second.

	Sub DisplayNumbers()
		Dim numbers(9) As String * 7

		numbers(0) = "1111110"
		numbers(1) = "0110000"
		numbers(2) = "1101101"
		numbers(3) = "1111001"
		numbers(4) = "0110011"
		numbers(5) = "1011011"
		numbers(6) = "1011111"
		numbers(7) = "1110000"
		numbers(8) = "1111111"
		numbers(9) = "1111011"

		For c = 0 To 9
			For i = 1 To 7
				onoff = Mid(numbers(c), i, 1)
				Call ShapeOnOff(i, onoff)
			Next i
            Range("A1").Select
			Application.Wait (Now() + TimeSerial(0, 0, 1))
		Next c

	End Sub

## Conclusion

I hope you enjoyed this, I tried to explain how the codes work. This code can be improved, but the goal was to be readable for even a beginner user.
