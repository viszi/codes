The Excel file contains a SAP script which can update vendor's generic information like phone/fax/email/tax information by using SAP's standard vendor management transaction code MK02.
If you have authorization to t-code MK02 and SAP Scripting is allowed in your organization, then you can update data of multiple vendors. No access is needed to mass change t-codes (like XK99 or LSMW).

## Usage

- Login to SAP and open standard t-code MK02 for vendor change.
- Fill out the Excel table with the required data and click on "Start Load" button.

Before saving anything the Excel macro asks your confirmation for the first 5 records, if there was no issue in the first 5 attempts then you can ask to do the rest of the load automatically.

![Macro](https://github.com/viszi/codes/blob/master/SAP/VendorGenericChanges/images/00_Main.png)

I suggest to do not run Excel on full-screen, because you will not see the changes made in the background. Arrange SAP screen and Excel windows side-by-side to be able to monitor the activity. 

## How it works?

The macro connects to your first active SAP session and fills out the form for you. 

![Start](https://github.com/viszi/codes/blob/master/SAP/VendorGenericChanges/images/01_VendorChange.png)

Macro opens the selected vendor record and makes the required changes on Communication or Control section.

![Communication](https://github.com/viszi/codes/blob/master/SAP/VendorGenericChanges/images/02_Communication.png)

Before saving the change it will ask your confirmation and if you accept the next record will be processed otherwise the macro stops.
