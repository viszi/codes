Updating of Supplier Descrptivie Flexfields in Oracle EBS 12 can be done with this macro. Flexfields can be different in other EBS implementation, so use this as a guideline to create your own version.

If you have authorization to change Supplier Communication one-by-one, then this macro can help you by using Internet Explorer.

## Usage

- You have to set the server name and window name (which is displayed in the webbrowser) in cell F1 and F2.
- Set your EBS date format in cell F3. All dates in the Excel will be converted into the given format.
- Login to Oracle EBS and open supplier maintenance form.
- Fill out the table with the required data and click on "Start Load" button.

Before saving anything it asks your confirmation for the first 5 records, if there was no issue in the first 5 attempts then you can ask to do the rest of the load automatically.

![Macro](https://github.com/viszi/codes/blob/master/OracleEBS/SupplierManageSite/images/00_Main.png)

I suggest to do not run Excel on full-screen, because you will not see the changes made in the background. Arrange Oracle EBS and Excel windows side-by-side to be able to monitor the activity. 

## How it works?

The macro connects to the first Internet Explorer session and fills out the webform for you. You have to open manually the Oracle EBS Supplier Maintenance form.

![Start](https://github.com/viszi/codes/blob/master/OracleEBS/SupplierCommunication/images/01_Starting%20Page.png)
Macro will search for supplier number and or name (which one you have entered) and open the address book for that supplier.
The address book contains all registered locations of the supplier and based on data in column C (Site Code) macro will open that location by clicking on Manage sites.

![Site](https://github.com/viszi/codes/blob/master/OracleEBS/SupplierManageSite/images/01_ManageSite.png)
On the Uses tab Descriptive flexfield page will be opened.

![Communication](https://github.com/viszi/codes/blob/master/OracleEBS/SupplierManageSite/images/02_DescriptiveFF.png)
Before saving the change it will ask your confirmation and if you accept the next record will be processed otherwise the macro stops.
