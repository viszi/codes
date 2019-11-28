This Excel Macro helped me in the work to mass maintain supplier communication method (which could be e-mail, fax or nothing) in Oracle EBS 12 (which is using webforms to update supplier data, R11 used Java Forms).

If you have authorization to change Supplier Communication one-by-one, then this macro can help you by using Internet Explorer.

## Usage

You have to set the server name and window name (which is displayed in the webbrowser) in cell F1 and F2. 
Login to Oracle EBS and open supplier maintenance form.
Fill out the table with the required data and click on "Start Load" button.
Before saving anything it asks your confirmation for the first 5 records, if there was no issue in the first 5 attempts then you can ask to do the rest of the load automatically.

## How it works?

The macro connects to the first Internet Explorer session and fills out the webform for you.





