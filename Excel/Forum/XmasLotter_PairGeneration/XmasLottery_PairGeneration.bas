Attribute VB_Name = "Module1"
Option Explicit

Sub XmasLottery()
    Dim names As New Collection     'collection of original names / az eredeti nevek tömbje
    Dim bucket As New Collection    'bucket with undrawn names / kalap a még ki nem húzott nevekkel
    Dim lastrow As Long             'variant to hold number of rows / sorok számát tartalmazó lista
    Dim i As Long
    Dim namedrawn As String         'randomly selected name / kihúzott nevet tartalmazó változó
    Dim random As Long              'variant for a random number / változó véletlenszám

    'find the last used row in column C, where names are listed
    'nézzük meg hány sor van a C-oszlopban ahol a nevek vannak felsorolva
    lastrow = Range("C" & Rows.Count).End(xlUp).Row

    'add to collection unique names from column C - error handling is needed to avoid problems with duplicate names
    'feltöltjük egyedi nevekkel a tömböket - a hiba kezelés arra kell ha egy név véletlenül ismétlõdne
    On Error Resume Next
    For i = 1 To lastrow
        If Len(Cells(i + 1, "C")) > 0 Then
            names.Add Cells(i + 1, "C"), CStr(Cells(i + 1, "C"))
            bucket.Add names(i), CStr(names(i))
        End If
    Next i
    On Error GoTo 0

    'feed the random generation with a non-constant number
    'véletlenszám generátor elindítása egy változó számmal
    Randomize Second(Now)

    'loop through the names and draw randomly another name from the bucket
    'menjünk végig a neveken és a kalapból húzzunk a kalapból egy másik nevet
    For i = 1 To names.Count
        'print the first name from the pair / pár elsõ nevét kiírjuk
        Cells(i + 1, "A") = names(i)

        'find randomly another name from the bucket
        'válasszunk egy másik nevet a kalapból
        namedrawn = ""
        Do
            random = Int(Rnd() * bucket.Count) + 1
            namedrawn = bucket(random)
        Loop Until namedrawn <> names(i)

        'print the other name from the pair / pár második nevét is kiírjuk
        Cells(i + 1, "B") = namedrawn
        'remove from the bucket the drawn name / kalapból töröljük a már valasztott nevet
        bucket.Remove (random)
    Next i

End Sub

