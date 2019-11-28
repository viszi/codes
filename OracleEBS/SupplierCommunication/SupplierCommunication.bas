Attribute VB_Name = "SupplierCommunication"
Option Explicit
Sub Supplier_Communication()
    Dim wbInput As Workbook
    Dim wsInput As Worksheet
    Dim RowCount As Long, c As Long, Changerow As Long, i As Long
    Dim Runtime As Date
    Dim IE As Object
    Dim objElement As Object
    Dim objCollection As Object
    Dim hit As Boolean
    Dim fSplit
    Dim Autoconfirm As Boolean
    Dim Confirmed As Long

    Const StartRow = 7
    Const colStatus = 6
    Const colSupplierNumber = 1
    Const colSupplierName = 2
    Const colSiteCode = 3
    Const colCommMethod = 4
    Const colDestination = 5

    Set wbInput = ActiveWorkbook
    Set wsInput = wbInput.ActiveSheet
    RowCount = wsInput.Cells(StartRow, colSiteCode).CurrentRegion.Rows.Count - 1
    Runtime = Now

    Autoconfirm = False
    Confirmed = 0

    Dim vFeedback
    vFeedback = Application.InputBox(prompt:="Number of records to load? (Maximum: " & RowCount & ")", Title:="Confirm", Default:=RowCount, Type:=1)

    'stop run if cancel or wrong input was given
    If VarType(vFeedback) <> 11 And IsNumeric(vFeedback) And vFeedback <= RowCount Then
        'process only requested number of rows
        Changerow = vFeedback

        With wsInput
            If Changerow >= 1 Then
                'find correct IE window

                If .Range("F1") = "" Then
                    MsgBox "Missing server URL!"
                    Exit Sub
                End If

                If .Range("F2") = "" Then
                    MsgBox "Missing window name!"
                    Exit Sub
                End If

                Dim srchWindow As String
                Dim srchURL As String
                srchURL = Trim(.Range("F1"))
                srchWindow = Trim(.Range("F2"))
                hit = False

                'find correct IE window
                With CreateObject("Shell.Application").Windows
                    If .Count > 0 Then
                        i = -1
                        Do
                            i = i + 1
                            Select Case i
                            Case 0
                                Set IE = .Item(0)
                            Case 1
                                Set IE = .Item(1)
                            Case 2
                                Set IE = .Item(2)
                            Case 3
                                Set IE = .Item(3)
                            Case 4
                                Set IE = .Item(4)
                            Case 5
                                Set IE = .Item(5)
                            Case 6
                                Set IE = .Item(6)
                            Case 7
                                Set IE = .Item(7)
                            Case 8
                                Set IE = .Item(8)
                            Case 9
                                Set IE = .Item(9)
                            End Select
                            On Error Resume Next
                            If IE.LocationName = srchWindow And Left(IE.LocationURL, Len(srchURL)) = srchURL Then
                                If Err.Number <> 91 Then
                                hit = True
                                End If
                            End If
                            On Error GoTo 0
                        Loop Until hit Or i = .Count

                        If Not hit Then
                            MsgBox "Correct Internet Explorer window was not found!"
                            Set IE = Nothing
                            Set wsInput = Nothing
                            Set wbInput = Nothing
                            Exit Sub
                        End If
                    Else
                        MsgBox "Correct Internet Explorer window was not found!"
                        Set IE = Nothing
                        Set wsInput = Nothing
                        Set wbInput = Nothing
                        Exit Sub
                    End If
                End With

                'loop through the records for upload
                Dim searchfield As String
                For c = 0 To Changerow - 1

                    'if supplier number was given then we will search for it else for supplier name
                    If Len(.Cells(c + StartRow, colSupplierNumber)) > 0 Then
                        'searchfield = "SearchSuppNum"
                        IE.document.getElementById("SearchSuppNum").Value = Left(.Cells(c + StartRow, colSupplierNumber), 6)
                    Else
                        'searchfield = "SearchSuppName"
                        IE.document.getElementById("SearchSuppName").Value = Trim(.Cells(c + StartRow, colSupplierName))
                    End If

                    'click on GO button
                    IE.document.getElementById("GoButton").Click

                    'Wait while IE re-loading...
                    Do While IE.Busy
                        Application.Wait DateAdd("s", 1, Now)
                    Loop

                    'if not address book is opened, then we should click on update button
                    On Error Resume Next
                    If Len(IE.document.getElementById("N16:EditImage:0").Name) > 0 Then
                        IE.document.getElementById("N16:EditImage:0").Click
                    End If
                    On Error GoTo 0

                    'Wait while IE re-loading...
                    Do While IE.Busy
                        Application.Wait DateAdd("s", 1, Now)
                    Loop

                    'click on "Address Book" link
                    IE.document.getElementById("POS_HT_SP_B_ADDR_BK").Click

                    'Wait while IE re-loading...
                    Do While IE.Busy
                        Application.Wait DateAdd("s", 1, Now)
                    Loop

                    'wait a bit more
                    Application.Wait (Now + TimeSerial(0, 0, 1))

                    'search for sitecode
                    IE.document.getElementById("stName").Value = Trim(.Cells(c + StartRow, colSiteCode))
                    IE.document.getElementById("GoBtn").Click

                    'Wait while IE re-loading...
                    Do While IE.Busy
                        Application.Wait DateAdd("s", 1, Now)
                    Loop

                    'wait a bit more
                    Application.Wait (Now + TimeSerial(0, 0, 1))

                    'find the correct sitecode if there are multiple hits
                    i = 0
                    hit = False

                    Do
                        If UCase(IE.document.getElementById("N32:addressName:" & CStr(i)).innerText) = UCase(.Cells(c + StartRow, colSiteCode)) Then
                            hit = True
                            IE.document.getElementById("N32:mngSites:" & CStr(i)).Click
                        Else
                            i = i + 1
                        End If
                    Loop Until hit Or i > 15

                    'Wait while IE re-loading...
                    Do While IE.Busy
                        Application.Wait DateAdd("s", 1, Now)
                    Loop

                    If c = 0 Then
                        MsgBox "Click on Communication tab if it is not selected yet", vbOKOnly, "Confirmation"
                    End If

                    'set communication to desired
                    Select Case UCase(.Cells(c + StartRow, colCommMethod))
                    Case "EMAIL", "E-MAIL"
                        IE.document.getElementById("N20:ntfMethod:0").Value = "EMAIL"
                        IE.document.getElementById("N20:email:0").Value = .Cells(c + StartRow, colDestination)
                    Case "FAX"
                        IE.document.getElementById("N20:ntfMethod:0").Value = "FAX"
                        'split up input to area code and number
                        fSplit = Split(.Cells(c + StartRow, colDestination), "-")
                        If UBound(fSplit) > 0 Then
                            IE.document.getElementById("N20:faxAreaCode:0").Value = fSplit(0)
                            IE.document.getElementById("N20:fax:0").Value = fSplit(1)
                        Else
                            IE.document.getElementById("N20:fax:0").Value = .Cells(c + StartRow, colDestination)
                        End If
                    Case Else
                        IE.document.getElementById("N20:ntfMethod:0").Value = "NONE"
                    End Select

                    If Autoconfirm Then
                        vFeedback = vbOK
                    Else
                        vFeedback = MsgBox("Check proposed changes", vbOKCancel, "Confirmation")
                    End If

                    If vFeedback = vbCancel Then
                        .Cells(c + StartRow, colStatus) = "Cancelled"
                        Set IE = Nothing
                        Set objElement = Nothing
                        Set objCollection = Nothing
                        Exit Sub
                    Else
                        'apply changes
                        IE.document.getElementById("applyBtn").Click

                        'wait for IE load
                        Do While IE.Busy
                            Application.Wait DateAdd("s", 1, Now)
                        Loop

                        'go to Suppliers tab
                        IE.document.getElementById("POS_HT_SP_B_SUPP").Click

                        'wait for IE load
                        Do While IE.Busy
                            Application.Wait DateAdd("s", 1, Now)
                        Loop
                        .Cells(c + StartRow, colStatus) = "Done"
                        Confirmed = Confirmed + 1

                        If Not Autoconfirm And Confirmed Mod 5 = 0 Then
                            vFeedback = MsgBox("It seems there scrip is running fine." & vbNewLine & "Can we turn-off manual confirmation?", vbYesNo, "Switch to AutoConfirm")

                            If vFeedback = vbYes Then
                                Autoconfirm = True
                            End If
                        End If

                    End If

                    'have a visual feedback for users after every 5th records: scroll screen, add progress bar
                    If c Mod 5 = 0 Then
                        wbInput.Activate
                        Application.Goto .Cells(c + StartRow, 1), True
                        .Range("A" & (ActiveCell.Row)).Show
                    End If
                Next c
            End If
        End With
    End If

    wbInput.Activate

    If c >= 1 Then
        MsgBox c & " records were updated in " & Format(Now - Runtime, "ttttt"), vbOKOnly, "Information"
    End If

    ' Clean up
    Set IE = Nothing
    Set objElement = Nothing
    Set objCollection = Nothing

End Sub
