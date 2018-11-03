Attribute VB_Name = "Module1"
Option Explicit

Sub XmasLottery()
    Dim names As New Collection     'collection of original names / az eredeti nevek t�mbje
    Dim bucket As New Collection    'bucket with undrawn names / kalap a m�g ki nem h�zott nevekkel
    Dim lastrow As Long             'variant to hold number of rows / sorok sz�m�t tartalmaz� lista
    Dim i As Long
    Dim namedrawn As String         'randomly selected name / kih�zott nevet tartalmaz� v�ltoz�
    Dim random As Long              'variant for a random number / v�ltoz� v�letlensz�m

    'find the last used row in column C, where names are listed
    'n�zz�k meg h�ny sor van a C-oszlopban ahol a nevek vannak felsorolva
    lastrow = Range("C" & Rows.Count).End(xlUp).Row

    'add to collection unique names from column C - error handling is needed to avoid problems with duplicate names
    'felt�ltj�k egyedi nevekkel a t�mb�ket - a hiba kezel�s arra kell ha egy n�v v�letlen�l ism�tl�dne
    On Error Resume Next
    For i = 1 To lastrow
        If Len(Cells(i + 1, "C")) > 0 Then
            names.Add Cells(i + 1, "C"), CStr(Cells(i + 1, "C"))
            bucket.Add names(i), CStr(names(i))
        End If
    Next i
    On Error GoTo 0

    'feed the random generation with a non-constant number
    'v�letlensz�m gener�tor elind�t�sa egy v�ltoz� sz�mmal
    Randomize Second(Now)

    'loop through the names and draw randomly another name from the bucket
    'menj�nk v�gig a neveken �s a kalapb�l h�zzunk a kalapb�l egy m�sik nevet
    For i = 1 To names.Count
        'print the first name from the pair / p�r els� nev�t ki�rjuk
        Cells(i + 1, "A") = names(i)

        'find randomly another name from the bucket
        'v�lasszunk egy m�sik nevet a kalapb�l
        namedrawn = ""
        Do
            random = Int(Rnd() * bucket.Count) + 1
            namedrawn = bucket(random)
        Loop Until namedrawn <> names(i)

        'print the other name from the pair / p�r m�sodik nev�t is ki�rjuk
        Cells(i + 1, "B") = namedrawn
        'remove from the bucket the drawn name / kalapb�l t�r�lj�k a m�r valasztott nevet
        bucket.Remove (random)
    Next i

End Sub

