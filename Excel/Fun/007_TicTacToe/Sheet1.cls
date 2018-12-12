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

Private Sub Worksheet_SelectionChange(ByVal Target As Range)
    Dim row As Long, column As Long, player As String

    row = Range("B4")
    column = Range("B5")

    'run the code only if user clicked inside the playground
    If Not Intersect(Target, Cells(2, 4).Resize(row, column)) Is Nothing Then
        'we should run any code only if a single cell was selected
        If Target.Count = 1 Then
            'if cell is not already taken (it is empty) and we know who is the current player we can mark the cell
            If Target.Value = "" And Range("B7") <> "" Then
                Application.EnableEvents = False

                'marking the selected cell
                Target.Value = Range("B7")

                'check if last marking is resulting a win or not
                If Check_Win(Target.Value, Target, row, column) Then
                    'game over and display the winner
                    Range("A9") = "Player " & Range("B7") & " won the game!"
                    Range("B7") = ""
                    'highlight with a color the cells which resulted the win
                    Call Colorize
                Else
                    'if there is no win, then switch to the other player
                    If Range("B7") = "X" Then
                        Range("B7") = "O"
                    Else
                        Range("B7") = "X"
                    End If
                End If
                Application.EnableEvents = True
            End If
        End If
    End If

End Sub
