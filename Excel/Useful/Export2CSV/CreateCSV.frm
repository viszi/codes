VERSION 5.00
Begin {C62A69F0-16DC-11CE-9E98-00AA00574A4F} CreateCSV 
   Caption         =   "Export Data to CSV"
   ClientHeight    =   3630
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

Dim rngAdatok As Range
Dim AllowEvents As Boolean
Const myApps = "CreateMyCSV"


Private Sub UserForm_Initialize()
    Const Separators As String = ";@,@.@|@:@@*@Tab@"""
    Const Qualifires As String = "'@"""
    Dim arrySep
    Dim i As Long
    Dim TopOffset As Integer
    Dim LeftOffset As Integer

    AllowEvents = False

    TopOffset = (Application.UsableHeight / 2) - (Me.Height / 2)
    LeftOffset = (Application.UsableWidth / 2) - (Me.Width / 2)

    'position the form to the middle of the active screen
    Me.Top = Application.Top + TopOffset
    Me.Left = Application.Left + LeftOffset

    arrySep = Split(Separators, "@")
    cbSeparator.List = arrySep
    cbSeparator.ListIndex = 0

    arrySep = Split(Qualifires, "@")
    cbTextQualifier.List = arrySep

    'Load the saved/default settings
    Defaults

    Select Case Application.DecimalSeparator
    Case ","
        txRows = Format(txRows.Value, "###,###,###")
    Case " "
        txRows = Format(txRows.Value, "### ### ###")
    Case Else
        txRows = Format(txRows.Value, "#########")
    End Select

    If Len(ActiveSheet.UsedRange.Address) > 0 Then
        Me.opRegion3.Value = 1
    End If

    AllowEvents = True

End Sub

Private Sub btCancel_Click()

    Unload Me

End Sub

Private Sub btExport_click()

    If chUnicode Then
        UnicodeSave
    Else
        AnsiSave
    End If
End Sub

Private Sub AnsiSave()
    Dim FileNum As Integer
    Dim DestFile As String
    Dim c As Long, i As Long
    Dim arryFile, extension As String, filename As String
    Dim adat As Range
    Dim vRows, vLastRow, vFirstRow As Long
    Dim txtOut As String
    Dim sep, quali
    Dim txtLineBreak As String, b As Long

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

    txtLineBreak = ""
    If chBreak Then
        If txBreaks.Value >= 1 Then
            For b = 1 To Int(txBreaks.Value)
                txtLineBreak = txtLineBreak & vbNewLine
            Next b
        End If
    End If

    DestFile = txFile.Value
    FileNum = FreeFile()
    Open DestFile For Output As #FileNum

    For Each adat In rngAdatok
        If i = adat.Row - vFirstRow + 1 Then
            txtOut = txtOut & quali & Convert(adat, adat.text) & quali & sep
        Else
            Print #FileNum, Left(txtOut, Len(txtOut) - Len(sep))
            txtOut = quali & Convert(adat, adat.text) & quali & sep
            i = i + 1
            If i = txRows * c + 1 Then
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
    Dim DestFile As String
    Dim c As Long, i As Long
    Dim arryFile, extension As String, filename As String
    Dim adat As Range
    Dim vRows, vLastRow, vFirstRow As Long
    Dim txtOut As String
    Dim sep, quali
    Dim fs As Object
    Dim a As Object
    Dim txtLineBreak As String, b As Long

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

    txtLineBreak = ""
    If chBreak Then
        If txBreaks.Value >= 1 Then
            For b = 1 To Int(txBreaks.Value)
                txtLineBreak = txtLineBreak & vbNewLine
            Next b
        End If
    End If

    DestFile = txFile.Value

    Set fs = CreateObject("Scripting.FileSystemObject")
    Set a = fs.CreateTextFile(DestFile, True, True)

    For Each adat In rngAdatok
        If i = adat.Row - vFirstRow + 1 Then
            txtOut = txtOut & quali & Convert(adat, adat.text) & quali & sep
        Else
            a.writeline (Left(txtOut, Len(txtOut) - Len(sep)) & txtLineBreak)
            txtOut = quali & Convert(adat, adat.text) & quali & sep
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

    a.writeline (Left(txtOut, Len(txtOut) - Len(sep)) & txtLineBreak)
    a.Close

    lbResult = "Completed"

End Sub

Private Sub opRegion1_Click()
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
    On Error GoTo Hiba
    Set rngAdatok = ActiveCell.CurrentRegion
    rngAdatok.Select
    Exit Sub

Hiba:
    MsgBox "No range was selected", vbCritical + vbOKOnly, "Error"
    Unload Me

End Sub

Private Sub opRegion3_Click()
    On Error GoTo Hiba
    Set rngAdatok = ActiveSheet.UsedRange
    rngAdatok.Select
    Exit Sub

Hiba:
    MsgBox "No range was selected", vbCritical + vbOKOnly, "Error"
    Unload Me

End Sub

Private Sub txFile_DblClick(ByVal Cancel As MSForms.ReturnBoolean)

    SelectFile

End Sub


Private Sub txFile_Enter()

    SelectFile

End Sub

Private Sub SelectFile()
    Dim fd As Object
    Dim ext As String
    Dim i As Long

    Set fd = Application.FileDialog(msoFileDialogSaveAs)
    
    ext = "*.csv"
    
    With fd
        .AllowMultiSelect = False
        .Title = "Select a location and filename"
        .FilterIndex = 5        'use CSV
        .ButtonName = "&Save As"
        .InitialFileName = Left(ThisWorkbook.Name, InStr(1, ThisWorkbook.Name, ".")) & "csv"
        .Show
        On Error GoTo Hiba
        txFile = .SelectedItems(1)
    End With
    Exit Sub

Hiba:
    txFile = Application.DefaultFilePath & "\export.csv"

End Sub

Private Sub bDelete_Click()

    Call DeleteSetting(myApps, "Defaults")

End Sub

Private Sub bLoad_Click()

    Defaults

End Sub

Private Sub Defaults()

    'Load the stored values from Windows Registry or fail back to generic
    cbSeparator = GetSetting(myApps, "Defaults", "FieldSeparator", ";")
    cbTextQualifier = GetSetting(myApps, "Defaults", "TextQualifier", " ")
    txRows = GetSetting(myApps, "Defaults", "Lines", "1000000")
    chLimit = GetSetting(myApps, "Defaults", "UseLines", False)
    chTrim = GetSetting(myApps, "Defaults", "Trim", False)
    chValue = GetSetting(myApps, "Defaults", "Value", False)
    txFile = GetSetting(myApps, "Defaults", "File", Application.DefaultFilePath & "\export.csv")
    chBreak = GetSetting(myApps, "Defaults", "Breaks", False)
    txBreaks = GetSetting(myApps, "Defaults", "NewLines", "1")

End Sub

Private Sub bSave_Click()

    'Save the new default values to Windows Registry
    Call SaveSetting(myApps, "Defaults", "FieldSeparator", cbSeparator)
    Call SaveSetting(myApps, "Defaults", "TextQualifier", cbTextQualifier)
    Call SaveSetting(myApps, "Defaults", "Lines", txRows)
    Call SaveSetting(myApps, "Defaults", "UseLines", chLimit)
    Call SaveSetting(myApps, "Defaults", "Trim", chTrim)
    Call SaveSetting(myApps, "Defaults", "Value", chValue)
    Call SaveSetting(myApps, "Defaults", "File", txFile)
    Call SaveSetting(myApps, "Defaults", "Breaks", chBreak)
    Call SaveSetting(myApps, "Defaults", "NewLines", txBreaks)

End Sub

Private Sub chLimit_Click()

    txRows.Enabled = Not txRows.Enabled

End Sub

Private Sub chBreak_Click()

    txBreaks.Enabled = Not txBreaks.Enabled

End Sub

Private Sub txRows_AfterUpdate()

    'if given value is not numeric fail back to default value
    If Not IsNumeric(txRows) Then
        txRows = GetSetting(myApps, "Defaults", "Lines", "1000000")
    Else
        If AllowEvents Then
            txRows = Format(Abs(txRows.Value), "### ### ###")
        End If
    End If

End Sub

Private Sub txBreaks_afterupdate()

    'if given value is not numeric fail back to default value
    If Not IsNumeric(txBreaks) Then
        txBreaks = GetSetting(myApps, "Defaults", "NewLines", "1")
    Else
        If AllowEvents Then
            txBreaks = Format(Abs(txBreaks.Value), "# ###")
        End If
    End If

End Sub

Private Function Convert(be, errorbe)

    If IsError(be) Then
        Convert = errorbe
        Exit Function
    End If

    Convert = be

    If Me.chValue And IsNumeric(be) Then be = be * 1
    If Me.chTrim Then be = Trim(be)

    Convert = be

End Function
