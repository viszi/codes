This Excel Macro helped me in the work to mass maintain supplier communication method (which could be e-mail, fax or nothing) in Oracle EBS 12 (which is using webforms to update supplier data, R11 used Java Forms).

If you have authorization to change Supplier Communication one-by-one, then this macro can help you by using Internet Explorer.

## Usage

- You have to set the server name and window name (which is displayed in the webbrowser) in cell F1 and F2. 
- Login to Oracle EBS and open supplier maintenance form.
- Fill out the table with the required data and click on "Start Load" button.

Before saving anything it asks your confirmation for the first 5 records, if there was no issue in the first 5 attempts then you can ask to do the rest of the load automatically.

![Macro](https://github.com/viszi/codes/blob/master/OracleEBS/SupplierCommunication/images/00_Main.png)

I suggest to do not run Excel on full-screen, because you will not see the changes made in the background. Arrange Oracle EBS and Excel windows side-by-side to be able to monitor the activity. 

## How it works?

The macro connects to the first Internet Explorer session and fills out the webform for you. You have to open manually the Oracle EBS Supplier Maintenance form.

![Start](https://github.com/viszi/codes/blob/master/OracleEBS/SupplierCommunication/images/01_Starting%20Page.png)

Macro will search for supplier number and or name (which one you have entered) and open the address book for that supplier.
The address book contains all registered locations of the supplier and based on data in column C (Site Code) macro will open that location by clicking on Manage sites.

![Site](https://github.com/viszi/codes/blob/master/OracleEBS/SupplierCommunication/images/02_Selecting%20Location%20from%20AddressBook.png)

On the site page the Communication tab must be selected manually for the first time and the macro will do changes on the form.

![Communication](https://github.com/viszi/codes/blob/master/OracleEBS/SupplierCommunication/images/03%20Communication%20page.png)

Before saving the change it will ask your confirmation and if you accept the next record will be processed otherwise the macro stops.







