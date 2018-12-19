# Problem

User would like to calculate leasing cost of certain items, but the monthly fee of the leasing company is not constant, it is changing time to time.

|Leasing Company|Leasing Fee|Period Start|Period End|
|---------------|-----------|------------|----------|
|Company A|5.0%|01/01/2017|12/31/2017|
|Company A|1.5%|01/01/2018|03/31/2018|
|Company A|5.0%|04/01/2018|10/31/2018|
|Company A|2.0%|11/01/2018|12/31/2018|

# Solution

For the final result we have to figure out that how many months were used in every periods.

e.g. if leasing started in 4th July 2017 and it will end 24th December 2018, then 4 periods will be used.

|Leasing Fee|Period Start|Period End|Actual Start|Actual End|Completed Months|Excel Formula|
|-----------|------------|----------|------------|----------|---------------------|-------------|
|5.0%|01/01/2017|12/31/2017|07/04/2017|12/31/2017|5|=DATEDIF(7/4/2017,12/31/2017 + 1,"m")|
|1.5%|01/01/2018|03/31/2018|01/01/2018|03/31/2018|12|=DATEDIF(1/1/2018,3/31/2018 + 1,"m")|
|5.0%|04/01/2018|10/31/2018|04/01/2018|10/31/2018|6|=DATEDIF(4/1/2018,10/31/2018 + 1,"m")|
|2.0%|11/01/2018|12/31/2018|11/01/2018|12/24/2018|1|=DATEDIF(11/1/2018,12/24/2018 + 1,"m")|

As you can see I am using the [DATEFDIF](https://support.office.com/en-us/article/datedif-function-25dba1a4-2812-480b-84dd-8b32a451b35c?NS=EXCEL&Version=16&SysLcid=1033&UiLcid=1033&AppVer=ZXL160&HelpId=xlmain11.chm60399&ui=en-US&rs=en-US&ad=US) function, which is "hidden" in Excel, you cannot find among the existing formulas, but if you type it
manually it will work for you. 

If you don't want to use DATEDIF, then you can use this formula ```=(YEAR(end date)-YEAR(start date))*12+MONTH(end date)-MONTH(start date)```

We would like to get the result in a single cell, we have to build an array formula (CSE = Control + Shift + Enter).
```
= quantity * monthly cost * SUM(<monthly fee>*<number of used months>) 
```

If you open the final file then in column J you will see the final formula, and

 - quantity is in column C
 - monthly cost in column E
 - starting date is in colum D
 - leasing end is always the today date (this calculates for you only the final leasing cost for yesterday!)
 
