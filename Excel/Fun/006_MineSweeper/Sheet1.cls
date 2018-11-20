VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "Sheet1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Option Explicit

Private Sub Worksheet_SelectionChange(ByVal target As Range)
    Dim row As Long, column As Long, mines As Long
    Dim cell As Range
    
    row = Range("B4")
    column = Range("B5")
    mines = Range("B8")

    'run reveal and check programs if click was inside the playfield
    If Not Intersect(target, Cells(2, 4).Resize(row, column)) Is Nothing Then
        With target
            'if we are not in marking mode do the checkings
            If Not Range("B11") Then
                'make visible the clicked cell or cells if they were empty
                Call Reveal(.row, .column, row, column)

                'check if we clicked on a bomb
                If .Value = "B" Then
                    'game over reveal the full playfield
                    With Cells(2, 4).Resize(row, column)
                        'change the color
                        .Interior.color = rgb(255, 255, 255)
                        .NumberFormat = "General"
                    End With

                    'set bomb color to red and font white
                    .Interior.color = rgb(255, 0, 0)
                    .Font.color = rgb(255, 255, 255)
                End If
            Else
                'we would like to mark the actual cell instead of reveal
                'if already marked restore to unrevealed
                If .Interior.color = rgb(200, 200, 200) Then
                    .Interior.color = rgb(255, 200, 0)
                    Range("B9") = Range("B9") + 1
                Else
                    .Interior.color = rgb(200, 200, 200)
                    Range("B9") = Range("B9") - 1
                End If
            End If


            'check game status
            'if won reveal the playfield
            If GameWon(row, column, mines) Then
                'reveal the the playfield
                For Each cell In Cells(2, 4).Resize(row, column)
                    If cell.Interior.color <> rgb(255, 255, 255) Then
                        cell.Interior.color = rgb(255, 255, 255)
                        cell.NumberFormat = "General"
                    End If

                    If cell.Value = "B" Then
                        cell.Interior.color = rgb(0, 255, 0)
                    End If
                Next cell
            End If
        End With
    End If
End Sub
