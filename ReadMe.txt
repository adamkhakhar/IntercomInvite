For this problem, I decided to use Javascript.
The program has 3 parts:
Customer object: Stores user id and name.
isWithin100 function: determines if given latitude and longitude is within 100km of
Intercom SF.
readFile function: reads .txt JSON file and usable JSON file.
genArr function: creates closestCustomer array from JSON.

How to install and execute code:
Put .txt JSON file in same directory as script.
In command line while in the same directory as script type:
node CustomerInvite.js (TEXT_FILE_NAME.txt)

How to run test cases:
I chose to do manual unit testing instead of using a library
such as Jasmine because the script is small and simple.
In command line run:
node Testing.js