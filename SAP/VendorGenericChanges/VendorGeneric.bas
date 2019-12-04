Attribute VB_Name = "VendorGeneric"
Option Explicit
Dim SapGuiAuto, SAPApp, Connection, session, WScript

Sub Vendor_Generic()
    Dim wbInput As Workbook
    Dim wsInput As Worksheet
    Dim RowCount As Long, c As Long, Changerow As Long, i As Long, j As Long
    Dim Runtime As Date
    Dim ErrorBar As String
    Dim ErrorCount As Long
    Dim DateFormat As String
    Dim LineStatus As Boolean
    Dim AutoConfirm As Boolean
    Dim Confirmed As Long

    Const StartRow = 7
    Const colStatus = 12
    Const colVendorID = 1
    Const colGSL = 2
    Const colPhone = 3
    Const ColMobile = 4
    Const colFax = 5
    Const colEmail = 6
    Const colCommMethod = 7
    Const colNote = 8
    Const colTax1 = 9
    Const colTax3 = 10
    Const ColVAT = 11

    Set wbInput = ActiveWorkbook
    Set wsInput = wbInput.ActiveSheet
    RowCount = wsInput.Cells(StartRow, colVendorID).CurrentRegion.Rows.Count - 1
    Runtime = Now

    Confirmed = 0
    AutoConfirm = False

    Dim vFeedback
    vFeedback = Application.InputBox(Prompt:="Number of records to load? (Maximum: " & RowCount & ")", Title:="Confirm", Default:=RowCount, Type:=1)

    'stop run if cancel or wrong input was given
    If VarType(vFeedback) <> 11 And IsNumeric(vFeedback) And vFeedback <= RowCount Then
        'process only requested number of rows
        Changerow = vFeedback

        'binding start
        If Not IsObject(SAPApp) Then
            Set SapGuiAuto = GetObject("SAPGUI")
            Set SAPApp = SapGuiAuto.GetScriptingEngine
        End If
        If Not IsObject(Connection) Then
            Set Connection = SAPApp.Children(0)
        End If
        If Not IsObject(session) Then
            Set session = Connection.Children(0)
        End If
        If IsObject(WScript) Then
            WScript.ConnectObject session, "on"
            WScript.ConnectObject SAPApp, "on"
        End If

        With wsInput
            'run script only if input was given
            If Changerow >= 1 Then
                'SAP macro starts
                'if transaction is not matching with the given one let's start it
                If session.info.transaction <> .Range("K2") Then
                    'session.findById("wnd[0]").maximize
                    session.findById("wnd[0]/tbar[0]/okcd").Text = "/nMK02"
                    session.findById("wnd[0]").sendVKey 0
                End If

                For c = 0 To Changerow - 1

                    session.findById("wnd[0]/usr/ctxtRF02K-LIFNR").Text = .Cells(c + StartRow, colVendorID)    'vendor id
                    session.findById("wnd[0]/tbar[1]/btn[8]").press                  'deselect all screens
                    session.findById("wnd[0]/usr/chkRF02K-D0110").Selected = True    'select address
                    session.findById("wnd[0]/usr/chkRF02K-D0120").Selected = True    'select control
                    session.findById("wnd[0]").sendVKey 0                            'open vendor

                    ErrorBar = ""
                    ErrorCount = 0

                    Do
                        ErrorBar = Statusbar

                        If Len(ErrorBar) > 0 Then
                            If ErrorBar <> "0" Then
                                .Cells(c + StartRow, colStatus) = ErrorBar  'we got an error message
                            End If
                            ErrorCount = ErrorCount + 1
                        End If
                    Loop Until ErrorBar = "" Or ErrorCount > 13         'don't stuck in error queue

                    If ErrorBar = "" Then

                        If Len(Trim(.Cells(c + StartRow, colGSL))) = 9 Then
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtADDR1_DATA-SORT2").Text = Trim(.Cells(c + StartRow, colGSL))
                        End If

                        Select Case UCase(Trim(.Cells(c + StartRow, colPhone)))
                        Case "DELETE"
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-TEL_NUMBER").Text = ""      'emptying phone number
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-TEL_EXTENS").Text = ""      'emptying phone extension
                        Case ""
                        Case Else
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-TEL_NUMBER").Text = Trim(.Cells(c + StartRow, colPhone))    'adding new phone number
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-TEL_EXTENS").Text = ""      'emptying phone extension
                        End Select

                        Select Case UCase(Trim(.Cells(c + StartRow, ColMobile)))
                        Case "DELETE"
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-MOB_NUMBER").Text = ""      'emptying mobile number
                        Case ""
                        Case Else
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-MOB_NUMBER").Text = Trim(.Cells(c + StartRow, ColMobile))    'adding new phone number
                        End Select

                        Select Case UCase(Trim(.Cells(c + StartRow, colFax)))
                        Case "DELETE"
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-FAX_NUMBER").Text = ""      'emptying fax number
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-FAX_EXTENS").Text = ""      'emptying fax extension
                        Case ""
                        Case Else
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-FAX_NUMBER").Text = Trim(.Cells(c + StartRow, colFax))    'adding new fax number
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-FAX_EXTENS").Text = ""      'emptying fax extension
                        End Select

                        Select Case UCase(Trim(.Cells(c + StartRow, colEmail)))
                        Case "DELETE"
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-SMTP_ADDR").Text = ""      'emptying email addr
                        Case ""
                        Case Else
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-SMTP_ADDR").Text = Trim(.Cells(c + StartRow, colEmail))    'adding new email addr
                        End Select

                        Select Case UCase(.Cells(c + StartRow, colCommMethod))
                        Case "FAX"
                            If Len(session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-FAX_NUMBER").Text) > 1 Then
                                session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/cmbADDR1_DATA-DEFLT_COMM").Key = "FAX"
                            Else
                                MsgBox "Please maintain the correct fax number", vbOKOnly, "Confirmation"
                            End If
                        Case "EMAIL"
                            If Len(session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-SMTP_ADDR").Text) > 3 Or _
                               InStr(1, UCase(session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/txtSZA1_D0100-SMTP_ADDR").Text), "X@X") = 0 Then
                                session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/cmbADDR1_DATA-DEFLT_COMM").Key = "INT"
                            Else
                                MsgBox "Please maintain the correct email address", vbOKOnly, "Confirmation"
                            End If
                        Case "NONE", "DELETE"
                            session.findById("wnd[0]/usr/subADDRESS:SAPLSZA1:0300/subCOUNTRY_SCREEN:SAPLSZA1:0301/cmbADDR1_DATA-DEFLT_COMM").Key = ""
                        End Select

                        If Len(.Cells(c + StartRow, colTax1) & .Cells(c + StartRow, colTax3) & .Cells(c + StartRow, ColVAT)) > 0 Then
                            'we have to go to the next screen to change tax numbers

                            session.findById("wnd[0]/tbar[1]/btn[8]").press
                            ErrorBar = ""
                            ErrorCount = 0

                            Do
                                ErrorBar = Statusbar

                                If Len(ErrorBar) > 0 Then
                                    If ErrorBar <> "0" Then
                                        .Cells(c + StartRow, colStatus) = ErrorBar  'we got an error message
                                    End If
                                    ErrorCount = ErrorCount + 1
                                End If
                            Loop Until ErrorBar = "" Or ErrorCount > 13         'don't stuck in error queue

                            If ErrorBar = "" Then

                                If .Cells(c + StartRow, colTax1) <> "" Then
                                    session.findById("wnd[0]/usr/txtLFA1-STCD1").Text = Trim(.Cells(c + StartRow, colTax1))  'update tax1
                                End If

                                If .Cells(c + StartRow, colTax3) <> "" Then
                                    session.findById("wnd[0]/usr/txtLFA1-STCD3").Text = Trim(.Cells(c + StartRow, colTax3))  'update tax3
                                End If

                                If .Cells(c + StartRow, colTax1) <> "" Then
                                    session.findById("wnd[0]/usr/txtLFA1-STCEG").Text = Trim(.Cells(c + StartRow, ColVAT))  'update VAT
                                End If

                            End If
                        End If

                        'we can ignore the confirmation screen by setting the flag
                        If AutoConfirm Then
                            vFeedback = vbOK
                        Else
                            vFeedback = MsgBox("Check proposed changes", vbOKCancel, "Confirmation")
                        End If

                        If vFeedback = vbCancel Then
                            .Cells(c + StartRow, colStatus) = "Cancelled"
                            Set wbInput = Nothing
                            Set wsInput = Nothing

                            Exit Sub
                        End If

                        session.findById("wnd[0]/tbar[0]/btn[11]").press        'press save

                        ErrorBar = ""
                        ErrorCount = 0

                        Do
                            ErrorBar = Statusbar

                            If Len(ErrorBar) > 0 Then
                                If ErrorBar <> "0" Then
                                    .Cells(c + StartRow, colStatus) = ErrorBar  'we got an error message
                                End If
                                ErrorCount = ErrorCount + 1
                            End If
                        Loop Until ErrorBar = "" Or ErrorCount > 13         'don't stuck in error queue

                        If ErrorBar = "" Then
                            .Cells(c + StartRow, colStatus) = "Done"
                            Confirmed = Confirmed + 1

                            'if autoconfirm is not on, but we have at least 5 changes then ask to turn it on
                            If Not AutoConfirm And Confirmed Mod 5 = 0 Then
                                vFeedback = MsgBox("It seems there scrip is running fine." & vbNewLine & "Can we turn-off manual confirmation?", vbYesNo, "Switch to AutoConfirm")

                                If vFeedback = vbYes Then
                                    AutoConfirm = True
                                End If
                            End If
                        Else
                            .Cells(c + StartRow, colStatus) = "Fail"        'were not able to save the change
                            Set wbInput = Nothing
                            Set wsInput = Nothing

                            Exit Sub
                        End If
                    End If
                    'SAP macro ends

                    'have a visual feedback for users after every 5th records: scroll screen, add progress bar
                    If c Mod 5 = 0 Then
                        wbInput.Activate
                        Application.Goto .Cells(c + StartRow, 1), True
                        .Range("A" & (ActiveCell.Row)).Show
                    End If
                Next c
            End If
        End With

        wbInput.Activate

        If Changerow >= 1 Then
            MsgBox Changerow & " records were updated in " & Format(Now - Runtime, "ttttt"), vbOKOnly, "Information"
        End If
    End If

    Set wbInput = Nothing
    Set wsInput = Nothing

End Sub

Function Statusbar() As String
    Dim s_bar

    Set s_bar = session.findById("wnd[0]/sbar")

    Select Case s_bar.messagetype
    Case "E"    'Error
        Statusbar = s_bar.Text
    Case "W"    'Warning
        Statusbar = "0"
        session.findById("wnd[0]").sendVKey 0
    Case "A"    'Abort
        Statusbar = s_bar.Text
    Case "S"    'Success
        Statusbar = ""
    Case "I"    'Information
        Statusbar = ""
    Case Else
        Statusbar = ""
    End Select

End Function
