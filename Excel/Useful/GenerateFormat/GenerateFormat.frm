VERSION 5.00
Begin {C62A69F0-16DC-11CE-9E98-00AA00574A4F} GenerateFormat 
   Caption         =   "Convert selection to format"
   ClientHeight    =   2535
   ClientLeft      =   45
   ClientTop       =   330
   ClientWidth     =   4680
   OleObjectBlob   =   "GenerateFormat.frx":0000
   StartUpPosition =   1  'CenterOwner
End
Attribute VB_Name = "GenerateFormat"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Option Explicit
Dim vOriginalSepBoxA As Variant
Dim vOriginalSepBoxB As Variant

Private Sub UserForm_Initialize()

    Dim TopOffset As Integer
    Dim LeftOffset As Integer

    TopOffset = (Application.UsableHeight / 2) - (Me.Height / 2)
    LeftOffset = (Application.UsableWidth / 2) - (Me.Width / 2)

    'position the form to the middle of the active screen
    Me.Top = Application.Top + TopOffset
    Me.Left = Application.Left + LeftOffset

    'Load the saved/default settings
    Defaults

    'remember for the original settings when moving between BO and SQL
    vOriginalSepBoxA = vSepBoxA
    vOriginalSepBoxB = vSepBoxB

End Sub

'---------------------------------------------------------------------------------------
' Procedure : vBO_Click
' Author    : viszi
' Date      : 2011.12.04.
' Purpose   : If Business Objec format is used then change other settings to the needed values
'---------------------------------------------------------------------------------------
'
Private Sub vBO_Click()

    If vBO Then
        SepCheckA = False
        SepCheckB = True
        vSepBoxA = ""
        vSepBoxB = vOriginalSepBoxB
        FillNumCheck = True
        FillCharCheck = True
        vSingleLine = True
    End If

End Sub

'---------------------------------------------------------------------------------------
' Procedure : vSQL_Click
' Author    : viszi
' Date      : 2011.12.04.
' Purpose   : If SQL format is used then change other settings to the needed values
'---------------------------------------------------------------------------------------
'
Private Sub vSQL_Click()

    If vSQL Then
        SepCheckA = True
        SepCheckB = True
        vSepBoxA = vOriginalSepBoxA
        vSepBoxB = ","
        FillNumCheck = False
        FillCharCheck = False
        vSingleLine = False
    End If

End Sub

'---------------------------------------------------------------------------------------
' Procedure : ButtonOK_Click
' Author    : viszi
' Date      : 2011.12.05.
' Purpose   : Create the output by pressing button OK
'---------------------------------------------------------------------------------------
'
Private Sub ButtonOK_Click()
    Dim SelRange As Range
    Dim FirstRow As Long
    Dim Lastrow As Long
    Dim i As Long
    Dim result As Variant
    Dim vSepBoxA1

    If vSQL Or vBO Then

        If Not InputValidation Then
            MsgBox ("Invalid argument in Fill length or Offset field!")
            Exit Sub
        End If

        Set SelRange = Selection
        SelRange.Select

        FirstRow = SelRange.Row
        
        'if a whole column was selected then find the last used line in it
        If SelRange.Count > 10000 Then
            Lastrow = ActiveSheet.Cells(Rows.Count, SelRange.Column).End(xlUp).Row
        Else
            Lastrow = FirstRow + SelRange.Count - 1
        End If

        If vSingleLine Then
            result = "'"

            For i = FirstRow To Lastrow
                result = result & vSepBoxA & Convert(Cells(i, SelRange.Column).Value) & vSepBoxA & vSepBoxB
            Next i
            Cells(FirstRow, SelRange.Column + vOffsetValue).Value = Left(result, Len(result) - Len(vSepBoxB))

            Cells(FirstRow, SelRange.Column + vOffsetValue).Copy
        Else
            If IsSpecialChars() Then
                vSepBoxA1 = "'" & vSepBoxA
            Else
                vSepBoxA1 = vSepBoxA
            End If

            For i = FirstRow To Lastrow - 1
                Cells(i, SelRange.Column).Offset(0, vOffsetValue).Value = vSepBoxA1 & Convert(Cells(i, SelRange.Column).Value) & vSepBoxA & vSepBoxB
            Next i
            
            result = vSepBoxA1 & Convert(Cells(Lastrow, SelRange.Column).Value) & vSepBoxA

            If IsNumeric(result) Then
                Cells(Lastrow, SelRange.Column).Offset(0, vOffsetValue).Value = "'" & result
            Else
                Cells(Lastrow, SelRange.Column).Offset(0, vOffsetValue).Value = result
            End If

            Range(Cells(FirstRow, SelRange.Column + vOffsetValue), Cells(Lastrow, SelRange.Column + vOffsetValue)).Copy
        End If
    End If

    Unload Me

End Sub

'---------------------------------------------------------------------------------------
' Procedure : ButtonCancel_Click
' Author    : viszi
' Date      : 2011.12.05.
' Purpose   : Button Cancel will close the userform
'---------------------------------------------------------------------------------------
'
Private Sub ButtonCancel_Click()

    Unload Me

End Sub

'---------------------------------------------------------------------------------------
' Procedure : FillNumCheck_Click
' Author    : viszi
' Date      : 2011.12.04.
' Purpose   : If we have to pad a number to the left we must have the padding character (like 0) too
'---------------------------------------------------------------------------------------
'
Private Sub FillNumCheck_Click()

If FillNumCheck Then
    FillCharCheck = True
Else
    FillCharCheck = False
End If

End Sub

'---------------------------------------------------------------------------------------
' Procedure : FillCharCheck_Click
' Author    : viszi
' Date      : 2011.12.04.
' Purpose   : If we have to pad a number to the left we must have the padding character (like 0) too
'---------------------------------------------------------------------------------------
'
Private Sub FillCharCheck_Click()

If FillCharCheck Then
    FillNumCheck = True
Else
    FillNumCheck = False
End If

End Sub

'---------------------------------------------------------------------------------------
' Procedure : Convert
' Author    : viszi
' Date      : 2011.12.04.
' Purpose   : Trim and convert the input if it is needed
'---------------------------------------------------------------------------------------
'
Function Convert(szoveg As Variant)
    Dim Temp As Variant

    Temp = szoveg

    If vTrim Then
        Temp = WorksheetFunction.Trim(szoveg)
    End If
    
    If vValue Then
        If IsNumeric(Temp) Then
            Temp = Val(Temp)
        End If
    End If

    If FillNumCheck And IsNumeric(vFillNum) And Val(vFillNum) > Len(Temp) Then
        Temp = WorksheetFunction.Rept(vFillChar, (Val(vFillNum) - Len(Temp)) / Len(vFillChar)) & Temp
    End If

    Convert = Temp

End Function

'---------------------------------------------------------------------------------------
' Procedure : bSaveDefaults_Click
' Author    : viszi
' Date      : 2012.01.19.
' Purpose   : Save the current settings to registry
'             HKEY_CURRENT_USER\Software\VB and VBA Program Settings\BOSQLConverter\Defaults
'---------------------------------------------------------------------------------------
'
Private Sub bSaveDefaults_Click()

    Call SaveSetting("BOSQLConverter", "Defaults", "ConvertToSQL", vSQL)
    Call SaveSetting("BOSQLConverter", "Defaults", "ConvertToBO", vBO)
    Call SaveSetting("BOSQLConverter", "Defaults", "Separator1Status", SepCheckA)
    Call SaveSetting("BOSQLConverter", "Defaults", "Separator2Status", SepCheckB)
    Call SaveSetting("BOSQLConverter", "Defaults", "Separator1Char", vSepBoxA)
    Call SaveSetting("BOSQLConverter", "Defaults", "Separator2Char", vSepBoxB)
    Call SaveSetting("BOSQLConverter", "Defaults", "FillLengthStatus", FillNumCheck)
    Call SaveSetting("BOSQLConverter", "Defaults", "FillLenth", vFillNum)
    Call SaveSetting("BOSQLConverter", "Defaults", "FillCharStatus", FillCharCheck)
    Call SaveSetting("BOSQLConverter", "Defaults", "FillChar", vFillChar)
    Call SaveSetting("BOSQLConverter", "Defaults", "SingleLineStatus", vSingleLine)
    Call SaveSetting("BOSQLConverter", "Defaults", "OffsetValue", vOffsetValue)
    Call SaveSetting("BOSQLConverter", "Defaults", "TrimStatus", vTrim)
    Call SaveSetting("BOSQLConverter", "Defaults", "ValueStatus", vValue)

End Sub

'---------------------------------------------------------------------------------------
' Procedure : bLoadDefaults_Click
' Author    : viszi
' Date      : 2012.01.19.
' Purpose   : Load the saved values from the registry
'             HKEY_CURRENT_USER\Software\VB and VBA Program Settings\BOSQLConverter\Defaults
'---------------------------------------------------------------------------------------
'
Private Sub bLoadDefaults_Click()

    Defaults

End Sub

'---------------------------------------------------------------------------------------
' Procedure : bDeleteDefaults_Click
' Author    : viszi
' Date      : 2012.01.19.
' Purpose   : Delete the saved values from the registry
'             HKEY_CURRENT_USER\Software\VB and VBA Program Settings\BOSQLConverter\Defaults
'---------------------------------------------------------------------------------------
'
Private Sub bDeleteDefaults_Click()

    Call DeleteSetting("BOSQLConverter", "Defaults")

End Sub

'---------------------------------------------------------------------------------------
' Procedure : Defaults
' Author    : viszi
' Date      : 2012.01.19.
' Purpose   : Load the saved values from the registry
'             HKEY_CURRENT_USER\Software\VB and VBA Program Settings\BOSQLConverter\Defaults
'---------------------------------------------------------------------------------------
'
Private Sub Defaults()

    vSQL = GetSetting("BOSQLConverter", "Defaults", "ConvertToSQL", False)
    vBO = GetSetting("BOSQLConverter", "Defaults", "ConvertToBO", False)
    SepCheckA = GetSetting("BOSQLConverter", "Defaults", "Separator1Status", False)
    SepCheckB = GetSetting("BOSQLConverter", "Defaults", "Separator2Status", False)
    vSepBoxA = GetSetting("BOSQLConverter", "Defaults", "Separator1Char", "'")
    vSepBoxB = GetSetting("BOSQLConverter", "Defaults", "Separator2Char", ";")
    FillNumCheck = GetSetting("BOSQLConverter", "Defaults", "FillLengthStatus", FillNumCheck)
    vFillNum = GetSetting("BOSQLConverter", "Defaults", "FillLenth", 10)
    FillCharCheck = GetSetting("BOSQLConverter", "Defaults", "FillCharStatus", False)
    vFillChar = GetSetting("BOSQLConverter", "Defaults", "FillChar", 0)
    vSingleLine = GetSetting("BOSQLConverter", "Defaults", "SingleLineStatus", False)
    vOffsetValue = GetSetting("BOSQLConverter", "Defaults", "OffsetValue", 2)
    vTrim = GetSetting("BOSQLConverter", "Defaults", "TrimStatus", True)
    vValue = GetSetting("BOSQLConverter", "Defaults", "ValueStatus", True)

End Sub

'---------------------------------------------------------------------------------------
' Procedure : InputValidation
' Author    : viszi
' Date      : 2012. 06. 26.
' Purpose   : Check the offset and the fill length and stop if they are not correct
'---------------------------------------------------------------------------------------
'
Function InputValidation() As Boolean

    InputValidation = True

    If vOffsetValue < 0 Or Not IsNumeric(vOffsetValue) Then
        InputValidation = False
    End If

    If FillNumCheck Then
        If vFillNum < 1 Or Not IsNumeric(vFillNum) Then
            InputValidation = False
        End If
    End If


End Function

Function IsSpecialChars() As Boolean
    Const vChars = "+:-:%:':=:@:.:,"  'list of chars separated by : with special meanings in Excel
    Dim aChars As Variant
    Dim i As Integer

    IsSpecialChars = False

    aChars = Split(vChars, ":")

    i = 0

    Do
        If vSepBoxA = aChars(i) Then IsSpecialChars = True
        i = i + 1
    Loop Until IsSpecialChars Or i > UBound(aChars)

End Function
