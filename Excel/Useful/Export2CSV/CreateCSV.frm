VERSION 5.00
Begin {C62A69F0-16DC-11CE-9E98-00AA00574A4F} CreateCSV 
   Caption         =   "Export Data to CSV"
   ClientHeight    =   3465
   ClientLeft      =   45
   ClientTop       =   375
   ClientWidth     =   5355
   OleObjectBlob   =   "CreateCSV.frx":0000
   StartUpPosition =   1  'CenterOwner
End
Attribute VB_Name = "CreateCSV"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Option Explicit
Dim rngAdatok As Range          'global variable to hold the range which needs to be exported
Dim AllowEvents As Boolean
Const myApps = "CreateMyCSV"    'name of this application

Private Sub UserForm_Initialize()
'This procedure is running when the userform is loaded.
'We are setting up the position of the form and the default values

    Const Separators As String = ";@,@.@|@:@@*@Tab@"""      'list of potential separators between the fields
    Const Qualifires As String = "'@"""                     'list of possible field qualifiers
    Dim arrySep
    Dim i As Long
    Dim TopOffset As Integer
    Dim LeftOffset As Integer

    AllowEvents = False

    TopOffset = (Application.UsableHeight / 2) - (Me.Height / 2)
    LeftOffset = (Application.UsableWidth / 2) - (Me.Width / 2)

    'let's position the form to the middle of the active screen
    Me.Top = Application.Top + TopOffset
    Me.Left = Application.Left + LeftOffset

    'create an array of field separators from constant Separators
    arrySep = Split(Separators, "@")
    'add separators to the relevant combobox on the userform
    cbSeparator.List = arrySep
    'make active the first element
    cbSeparator.ListIndex = 0

    'create an array from constant Qualifiers
    arrySep = Split(Qualifires, "@")
    'add the list to the relevant combobox on the userform
    'here we are not making active the first element, because it is not mandatory
    cbTextQualifier.List = arrySep
    
    'Load the saved/default settings
    Defaults
    
    'format the field which hold split files by number of lines to an easy to read value
    txRows = Format(txRows.Value, "### ### ###")
    
    If Len(ActiveSheet.UsedRange.Address) > 0 Then
          Me.opRegion3.Value = 1
    End If

    AllowEvents = True

End Sub

Private Sub btCancel_Click()
'This procedure is called when user clicks on button Cancel
'It will close the form

    Unload Me

End Sub

Private Sub btExport_click()
'This procedure is called when user clicks on button Export
'Based on the value of checkbox Unicode we will run either sub-routine UnicodeSave or AnsiSave

    If chUnicode Then
        UnicodeSave
    Else
        AnsiSave
    End If
End Sub

Private Sub AnsiSave()
'This procedure will save a non-unicode version of the file, which could work in most of the cases
'if there is no special character is in the exported area

    Dim FileNum As Integer
    Dim DestFile As String
    Dim c As Long, i As Long
    Dim arryFile, extension As String, filename As String
    Dim adat As Range
    Dim vRows, vLastRow, vFirstRow As Long
    Dim txtOut As String
    Dim sep, quali

    vRows = rngAdatok.Rows.Count    'number of rows to export
    vFirstRow = rngAdatok.Range("A1").Row
    vLastRow = vRows + vFirstRow - 1
    c = 1                           'counter for the created files
    i = 1                           'count how many rows we have processed

    'setting up the field separator based on the value on the form
    If Me.cbSeparator = "Tab" Then
        sep = vbTab
    Else
        sep = Me.cbSeparator
    End If

    'setting up the field qualifiers based on the value on the form
    If Me.cbTextQualifier = " " Then
        quali = ""
    Else
        quali = Me.cbTextQualifier
    End If

    DestFile = txFile.Value
    FileNum = FreeFile()
    Open DestFile For Output As #FileNum

    'we are fetching every cells from the export range and starting to add them to a string
    'between the fields we are adding the field separator and if requested field qualifiers
    'if requested we are removing extra spaces and leading zeros from the data
    For Each adat In rngAdatok
        If i = adat.Row - vFirstRow + 1 Then
            txtOut = txtOut & quali & Convert(adat) & quali & sep
        Else
            Print #FileNum, Left(txtOut, Len(txtOut) - Len(sep))
            txtOut = quali & Convert(adat) & quali & sep
            i = i + 1                   'this will count how many lines we exported so far
            
            If i = txRows * c + 1 Then  'when we reached the maximum number of lines to be added a file we open a new file
                arryFile = Split(txFile.Value, ".")
                extension = arryFile(UBound(arryFile))
                filename = Left(txFile.Value, Len(txFile.Value) - Len(extension) - 1)
                DestFile = filename & c & "." & extension
                c = c + 1

                Close FileNum
                FileNum = FreeFile()
                Open DestFile For Output As #FileNum
            End If
        End If
    Next adat

    Print #FileNum, Left(txtOut, Len(txtOut) - Len(sep))
    Close FileNum

    lbResult = "Completed"

End Sub

Private Sub UnicodeSave()
'This procedure will save a unicode version of the file, this should be used if you have accented/special char
'in the exported range
    
    Dim DestFile As String
    Dim c As Long, i As Long
    Dim arryFile, extension As String, filename As String
    Dim adat As Range
    Dim vRows, vLastRow, vFirstRow As Long
    Dim txtOut As String
    Dim sep, quali
    Dim fs As Object
    Dim a As Object

    vRows = rngAdatok.Rows.Count    'number of rows to export
    vFirstRow = rngAdatok.Range("A1").Row
    vLastRow = vRows + vFirstRow - 1
    c = 1                           'counter for the created files
    i = 1                           'count how many rows we have processed

    If Me.cbSeparator = "Tab" Then
        sep = vbTab
    Else
        sep = Me.cbSeparator
    End If
    
    If Me.cbTextQualifier = " " Then
        quali = ""
    Else
        quali = Me.cbTextQualifier
    End If

    
    DestFile = txFile.Value

    Set fs = CreateObject("Scripting.FileSystemObject")
    Set a = fs.CreateTextFile(DestFile, True, True)

    For Each adat In rngAdatok
        If i = adat.Row - vFirstRow + 1 Then
            txtOut = txtOut & quali & Convert(adat) & quali & sep
        Else
            a.writeline (Left(txtOut, Len(txtOut) - Len(sep)))
            txtOut = quali & Convert(adat) & quali & sep
            i = i + 1
            If i = txRows * c + 1 Then
                arryFile = Split(txFile.Value, ".")
                extension = arryFile(UBound(arryFile))
                filename = Left(txFile.Value, Len(txFile.Value) - Len(extension) - 1)
                DestFile = filename & c & "." & extension
                c = c + 1

                a.Close
                Set a = fs.CreateTextFile(DestFile, True, True)
        End If
        End If
    Next adat

    a.writeline (Left(txtOut, Len(txtOut) - Len(sep)))
    a.Close

    lbResult = "Completed"

End Sub

Private Sub opRegion1_Click()
'This procedure is called when user selects the first option in Region
'It will open an inputbox where user can enter/select a range
    
    On Error GoTo Hiba
    Set rngAdatok = Application.InputBox("Select range to export", "Selection", Type:=8)
    rngAdatok.Select
    Set rngAdatok = Intersect(rngAdatok, ActiveSheet.UsedRange)

    Exit Sub

Hiba:
    MsgBox "No range was selected", vbCritical + vbOKOnly, "Error"
    Unload Me

End Sub

Private Sub opRegion2_Click()
'This procedure is called when user selects the second option in Region
'It will try to use the region which contains the active cell

    On Error GoTo Hiba
    Set rngAdatok = ActiveCell.CurrentRegion
    rngAdatok.Select
    Exit Sub

Hiba:
    MsgBox "No range was selected", vbCritical + vbOKOnly, "Error"
    Unload Me

End Sub

Private Sub opRegion3_Click()
'This procedure is called when user selects the third option in Region
'It will try to use the used range of the active sheet

    On Error GoTo Hiba
    Set rngAdatok = ActiveSheet.UsedRange
    rngAdatok.Select
    Exit Sub

Hiba:
    MsgBox "No range was selected", vbCritical + vbOKOnly, "Error"
    Unload Me

End Sub

Private Sub txFile_Enter()
'This procedure is called when user clicks into the file field
'User will get a window where a folder and file must be selected
    
    SelectFile

End Sub

Private Sub SelectFile()
'This procedure guides the user to select a folder and file

    Dim fd As Object

    Set fd = Application.FileDialog(msoFileDialogSaveAs)
    With fd
        .AllowMultiSelect = False
        .Title = "Select a location and filename"
        .ButtonName = "&Save As"
        .InitialFileName = "GKAccounts"
        .Show
        On Error GoTo Hiba
        txFile = .SelectedItems(1)
    End With
    Exit Sub

Hiba:
    txFile = "c:\Test\test.csv"

End Sub

Private Sub bDelete_Click()
'This procedure will delete from Windows Registry the default values for this program

    Call DeleteSetting(myApps, "Defaults")

End Sub

Private Sub bLoad_Click()
'This procedure will load from Windows Registry the default values for this program
'Like what should be default field separator

    Defaults

End Sub

Private Sub Defaults()
'This procedure is checks the Windows Registry for keywords and will pass them to the program
'If nothing is found in registry it will use the starting values

    cbSeparator = GetSetting(myApps, "Defaults", "FieldSeparator", ";")
    cbTextQualifier = GetSetting(myApps, "Defaults", "TextQualifier", " ")
    txRows = GetSetting(myApps, "Defaults", "Lines", "1000000")
    chLimit = GetSetting(myApps, "Defaults", "UseLines", False)
    chTrim = GetSetting(myApps, "Defaults", "Trim", False)
    chValue = GetSetting(myApps, "Defaults", "Value", False)
    txFile = GetSetting(myApps, "Defaults", "File", "C:\Temp\test.csv")


End Sub

Private Sub bSave_Click()
'This procedure saving into Windows Registry the settings of this program

    Call SaveSetting(myApps, "Defaults", "FieldSeparator", cbSeparator)
    Call SaveSetting(myApps, "Defaults", "TextQualifier", cbTextQualifier)
    Call SaveSetting(myApps, "Defaults", "Lines", txRows)
    Call SaveSetting(myApps, "Defaults", "UseLines", chLimit)
    Call SaveSetting(myApps, "Defaults", "Trim", chTrim)
    Call SaveSetting(myApps, "Defaults", "Value", chValue)
    Call SaveSetting(myApps, "Defaults", "File", txFile)

End Sub

Private Sub chLimit_Click()

    txRows.Enabled = Not txRows.Enabled

End Sub

Private Sub txRows_AfterUpdate()

    If AllowEvents Then txRows = Format(txRows.Value, "### ### ###")

End Sub

Private Function Convert(be)
'This procedure is removing extra spaces or leading zeros from the input if the necessary checkboxes are turned on

    Convert = be

    If Me.chValue And IsNumeric(be) Then be = be * 1
    If Me.chTrim Then be = Trim(be)

    Convert = be

End Function
