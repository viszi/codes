# Seven segments display
This code was inspired by Coding Challenge 117 by The Coding Train. You can watch it on [Youtube](https://www.youtube.com/watch?v=MlRlgbrAVOs&t).

You can download the
- final Excel version and
- the module file what you can import to an Excel file.

## Goal
The main goal is to mimic an old, electronic display, which uses seven segments to display a number or a character. Please check the relevant page on [Wikipedia](https://en.wikipedia.org/wiki/Seven-segment_display).

## How it works?
I have created few procedures to separate the main tasks of the program:
1. SetupDisplay()
   It is used to create seven rectangular shapes on the activesheet at the requested position. Shapes will be the segments; we are drawing only the outlines of the shapes at the beginning. Shape is turned on by filling up with red color.
   Segments are called A, B, C, D, E, F and G as Wikipedia is suggesting it.

   The only challenge is to figure out how to place the shapes close to each other. 
   ```ActiveSheet.Shapes.AddShape(msoShapeRoundedRectangle, xpos, ypos, width, height)``` creates the shape on the given spot.

2. DisplayNumbers()
   This routine is responsible to figure out which segments should be turned on or off to display a character. Eg. Code "0110011" means that A segment is off, B and C is on, D and E is off, F and G is on again. This will result number "4" on the display.

   ```ShapeOnOff``` procedure is called to turn on/off the given segment.

3. RemoveSegments()
   It just removes from the sheet those shapes which was created by the SetupDisplay.

## Variation
1. If we replace more displays next to each other we can display even a running text.
2. On 7-segments we cannot display any charcters (like K, Z, M), but there are 9 or 14 or 16-segments displays.
