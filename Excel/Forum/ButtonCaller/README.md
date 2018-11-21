A solution to know which button was clicked to load a form and perform desired action. 

# Problem

User is having multiple buttons on a sheet which opens the same form, but when button OK is pressed on the form different actions must be completed.

# Solution

Application.Caller will tell us which button was used to call the routine.
AlternateText or Caption of the button can be stored in property Tag on the form or in a global variable.
