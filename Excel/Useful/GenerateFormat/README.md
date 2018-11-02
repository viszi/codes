# Generate from the selection input to SQL or Business Object

In my work I am using SQL and Business Object and in many times I have the data on the Excel sheet which needs to be inputed to SQL or BO in the correct format.

SQL requires to have a comma between all values and strings must be between apostrophes, while our BO is needing a string where values are left padded.

**Screenshot of the userform**

![Form](https://github.com/viszi/codes/blob/master/Excel/Useful/GenerateFormat/images/001_Form.png)

First select a column or range and run the macro to open the user form, where you can
 - set which format should be created
   1. SQL will generate an output like this:
   ```'Abkhazia',
      'Afghanistan',
      'Albania',
      '1234', ...
   ```
   2. BO will generate an output like this:
   ```'Abkhazia',
      'Afghanistan',
      'Albania',
      '0000001234', ...
  - pad number to a left with any given character
  - trim extra spaces and remove leading zeroes from numbers during converting.

This macro was designed to help in my work environment.
