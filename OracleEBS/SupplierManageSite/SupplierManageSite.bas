Attribute VB_Name = "SupplierManageSite"
'Option Explicit

Sub Supplier_ManageSite()
    Dim wbInput As Workbook
    Dim wsInput As Worksheet
    Dim RowCount As Long, c As Long, Changerow As Long, i As Long
    Dim Runtime As Date
    Dim IE As Object
    Dim objElement As Object
    Dim objCollection As Object
    Dim hit As Boolean
    Dim FormatDate As String
    Dim hWND As Long, childHWND As Long
    Dim Autoconfirm As Boolean
    Dim Confirmed As Long

    Const StartRow = 7
    Const colStatus = 12
    Const colSupplierNumber = 1
    Const colSupplierName = 2
    Const colSiteCode = 3
    Const colLegacyID = 4
    Const colTaxID = 5
    Const colGatekeeper = 6
    Const colLimit = 7
    Const colInactiveDate = 8
    Const colBlockReason = 9
    Const colBlockComment = 10
    Const colASPFlag = 11

    Set wbInput = ActiveWorkbook
    Set wsInput = wbInput.ActiveSheet
    RowCount = wsInput.Cells(StartRow, colSiteCode).CurrentRegion.Rows.Count - 1
    Runtime = Now

    Autoconfirm = True
    Confirmed = 0

    Dim vFeedback
    vFeedback = Application.InputBox(prompt:="Number of records to load? (Maximum: " & RowCount & ")", Title:="Confirm", Default:=RowCount, Type:=1)

    'stop run if cancel or wrong input was given
    If VarType(vFeedback) <> 11 And IsNumeric(vFeedback) And vFeedback <= RowCount Then
        'process only requested number of rows
        Changerow = vFeedback

        With wsInput
            If Changerow >= 1 Then

                If .Range("G1") = "" Then
                    MsgBox "Missing server URL!"
                    Exit Sub
                End If

                If .Range("G2") = "" Then
                    MsgBox "Missing window name!"
                    Exit Sub
                End If

                Dim srchWindow As String
                Dim srchURL As String
                srchURL = Trim(.Range("G1"))
                srchWindow = Trim(.Range("G2"))
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

                FormatDate = UCase(.Range("G3"))

                'loop through the records for upload
                For c = 0 To Changerow - 1

                    'if supplier number was given then we will search for it else for supplier name
                    If Len(.Cells(c + StartRow, colSupplierNumber)) > 0 Then
                        IE.document.getElementById("SearchSuppNum").Value = .Cells(c + StartRow, colSupplierNumber)
                    Else
                        IE.document.getElementById("SearchSuppName").Value = Trim(.Cells(c + StartRow, colSupplierName))
                    End If

                    'click on GO button
                    IE.document.getElementById("GoButton").Click

                    'Wait while IE re-loading...
                    Do While IE.Busy
                        Application.Wait DateAdd("s", 1, Now)
                    Loop

                    'if address book not opened automatically, then we should click on update button
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
                        MsgBox "Click on Uses tab if it is not selected yet", vbOKOnly, "Confirmation"
                    End If

                    'fix purchasing flag if it is not checked
                    'sometimes it gives error 91
                    On Error Resume Next
                    If IE.document.getElementById("N11:purchasing:0").Checked <> True Then
                        IE.document.getElementById("N11:purchasing:0").Checked = True
                    End If
                    On Error GoTo 0

                    'set inactive date
                    Select Case UCase(.Cells(c + StartRow, colInactiveDate))
                    Case "DELETE"
                        IE.document.getElementById("N11:EditDateEnabled:0").Value = ""
                    Case "", "BLANK"
                    Case Else
                        Application.Wait (Now + TimeSerial(0, 0, 1))
                        If IsDate(.Cells(c + StartRow, colInactiveDate)) Then
                            IE.document.getElementById("N11:EditDateEnabled:0").Value = Format(.Cells(c + StartRow, colInactiveDate), FormatDate)
                        End If
                    End Select

                    'click on descriptive flexfield button
                    IE.document.getElementById("N11:dffItem:0").Click

                    'Wait while IE re-loading...
                    Do While IE.Busy
                        Application.Wait DateAdd("s", 1, Now)
                    Loop

                    'set legacy vendor number
                    Select Case UCase(.Cells(c + StartRow, colLegacyID))
                    Case "DELETE"
                        IE.document.getElementById("DFFlex0").Value = ""
                    Case "", "BLANK"
                    Case Else
                        If IsNumeric(.Cells(c + StartRow, colLegacyID)) Then
                            IE.document.getElementById("DFFlex0").Value = .Cells(c + StartRow, colLegacyID) * 1
                        Else
                            IE.document.getElementById("DFFlex0").Value = .Cells(c + StartRow, colLegacyID)
                        End If
                    End Select

                    'set tax number
                    Select Case UCase(.Cells(c + StartRow, colTaxID))
                    Case "DELETE"
                        IE.document.getElementById("DFFlex5").Value = ""
                    Case "", "BLANK"
                    Case Else
                        IE.document.getElementById("DFFlex5").Value = .Cells(c + StartRow, colTaxID)
                    End Select

                    'set inactive reason
                    Select Case UCase(.Cells(c + StartRow, colBlockReason))
                    Case "DELETE"
                        IE.document.getElementById("DFFlex7").Value = ""
                        IE.document.getElementById("DFFlex8").Value = ""
                    Case "", "BLANK"
                    Case "AUDIT FINDING", "BANKRUPT", "BLACK MARKED", "BLACKLIST"
                        IE.document.getElementById("DFFlex7").Value = .Cells(c + StartRow, colBlockReason)
                        IE.document.getElementById("DFFlex8").Value = .Cells(c + StartRow, colBlockComment)
                    Case "CLOSED DOWN", "EHS FINDING", "FINANCIAL CONCERNS"
                        IE.document.getElementById("DFFlex7").Value = .Cells(c + StartRow, colBlockReason)
                        IE.document.getElementById("DFFlex8").Value = .Cells(c + StartRow, colBlockComment)
                    Case "GE BUSINESS DECISION", "LEGAL ISSUES", "NO LONGER REQUIRED"
                        IE.document.getElementById("DFFlex7").Value = .Cells(c + StartRow, colBlockReason)
                        IE.document.getElementById("DFFlex8").Value = .Cells(c + StartRow, colBlockComment)
                    Case "QUALITY ISSUES", "QUALITY OF GOODS/SERVICES"
                        IE.document.getElementById("DFFlex7").Value = .Cells(c + StartRow, colBlockReason)
                        IE.document.getElementById("DFFlex8").Value = .Cells(c + StartRow, colBlockComment)
                    Case "SOURCING INITIATED", "SUPPLIER BUSINESS CLOSED", "SUPPLIER INTEGRITY/COMPLIANCE FINDING", "SUPPLIER RESOURCE CONCERNS"
                        IE.document.getElementById("DFFlex7").Value = .Cells(c + StartRow, colBlockReason)
                        IE.document.getElementById("DFFlex8").Value = .Cells(c + StartRow, colBlockComment)
                    Case "TAKEOVER", "WATCHLISTED"
                        IE.document.getElementById("DFFlex7").Value = .Cells(c + StartRow, colBlockReason)
                        IE.document.getElementById("DFFlex8").Value = .Cells(c + StartRow, colBlockComment)
                    Case "OTHERS"
                        IE.document.getElementById("DFFlex7").Value = .Cells(c + StartRow, colBlockReason)
                        If .Cells(c + StartRow, colBlockComment) = "" Then
                            IE.document.getElementById("DFFlex8").Value = "Not specified"
                        Else
                            IE.document.getElementById("DFFlex8").Value = .Cells(c + StartRow, colBlockComment)
                        End If
                    Case Else
                        If IsDate(.Cells(c + StartRow, colInactiveDate)) Then
                            IE.document.getElementById("DFFlex7").Value = "No Longer Required"
                        End If
                    End Select

                    'set gatekeeper
                    Select Case UCase(.Cells(c + StartRow, colGatekeeper))
                    Case "DELETE"
                        IE.document.getElementById("DFFlex11").Value = ""
                    Case "", "BLANK"
                    Case Else
                        IE.document.getElementById("DFFlex11").Value = .Cells(c + StartRow, colGatekeeper)
                    End Select

                    'set threshold limit
                    Select Case UCase(.Cells(c + StartRow, colLimit))
                    Case "DELETE"
                        IE.document.getElementById("DFFlex12").Value = ""
                    Case "", "BLANK"
                    Case "0", Is <= 0
                        IE.document.getElementById("DFFlex12").Value = "1"
                    Case Else
                        IE.document.getElementById("DFFlex12").Value = Int(.Cells(c + StartRow, colLimit))
                    End Select

                    'set ASP flag
                    Select Case UCase(.Cells(c + StartRow, colASPFlag))
                    Case "DELETE"
                        IE.document.getElementById("DFFlex14").Value = ""
                    Case "ASP STANDARD RISK", "ASP HEIGHTENED RISK"
                        IE.document.getElementById("DFFlex14").Value = Trim(.Cells(c + StartRow, colASPFlag))
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
                        'apply changes first time
                        IE.document.getElementById("applyBtn").Click

                        'wait for IE load
                        Do While IE.Busy
                            Application.Wait DateAdd("s", 1, Now)
                        Loop

                        'apply changes second time
                        IE.document.getElementById("applyBtn").Click

                        'wait for IE load
                        Do While IE.Busy
                            Application.Wait DateAdd("s", 1, Now)
                        Loop

                        'stop a bit more
                        Application.Wait (Now + TimeSerial(0, 0, 1))

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
                        Application.Wait (Now + TimeSerial(0, 0, 1))
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
