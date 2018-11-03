# Problem

For every name in a column we should select randomly another name without any repetition.

## Solution

We have to iterate the following steps:
1. Print out the first name of the pair.
2. Create a list which holds the unselected names - I called this as bucket
3. Select an item from this list randomly 

   a. Check that selected name is different from the first name of the pair.
   
   b. If name is same then go back to step 3.
4. Print out the selected name, this will be the second name of the pair.
5. Remove this name from the bucket.
