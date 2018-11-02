# Export to Text file

Users of Excel are using quite often the comma separated file format to get/send data from another application which does not support natively Excel.
"Save as" option supports TAB-delimited and comma seperated file generations, but there is no quick solution to save a file where fields are separated by a PIPE (|) or semi-colon.

With this macro you can export data into a flat file (text file), where 
 - the fields are separated by the choosen character (which can be comma, tab, semi-colon, colon, pipe etc)
 - you can give how many rows should be in the file (if exported data does not fit into the given rows, then multiple files will be created),
 - unnecessary spaces and leading zeros in-front of number values can be removed during exporting.

**Screenshot of the userform**

![Form screen](https://github.com/viszi/codes/blob/master/Excel/Useful/Export2CSV/images/001_From.png)

Enjoy it!

Please create your own version from it or let me know what should be changed.
