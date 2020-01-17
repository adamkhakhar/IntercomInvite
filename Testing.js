const functions = require("./CustomerInvite.js");

//Customer Object
class Customer {
    constructor(userID, name) {
        this.userID = userID;
        this.name = name;
    }
    print() {
        return "Name: " + this.name + " | UserId: " + this.userId;
    }
}

//Compare function to help sort customer by ascending user id
function compareCustomers(a, b) {
    const aUserID = a.userID;
    const bUserID = b.userID;
    let comparison = 0;
    if(aUserID > bUserID){
        comparison = 1;
    }
    else if(aUserID < bUserID){
        comparison = -1;
    }
    return comparison;
}

//Sort compareCustomers array by ascending user id
async function sort(arr){
    return arr.sort(compareCustomers);
}

//Reads JSON from file and returns parsed JSON
async function readFile(fileName) {
    var fs = require('fs');
    var textByLine = fs.readFileSync(fileName).toString().split("\n");

    textByLine = textByLine.toString().replace('\'', '');
    var beg = '[';
    var end = ']';
    textByLine = beg.concat(textByLine, end);

    return JSON.parse(textByLine);
}

async function asyncForEach(array, callback){
    for(let index = 0; index < array.length; index++){
        await callback(array[index], index, array);
    }
}

//Creates array of close customers
async function genArr(data){
    var closeCustomers = [];
    await asyncForEach(data, async(item) => {
        var latitude = item.latitude;
        var longitude = item.longitude;
        if (isWithin100(latitude, longitude)) {
            closeCustomers.push(new Customer(item.user_id, item.name));
        }
    });
    return closeCustomers;
}


//compareCustomers, sort
var cust = new Customer(1, "Bob");
console.log("compareCustomers, sort Testing");
var arr = [cust];
if (!arr == sort(arr)) {
    console.log("ERROR: sort - singleton");
} else {
    console.log("sort - singleton");
}

var cust2 = new Customer(2, "Bob2");
arr.push(cust2);
var newArr = [cust, cust2];
if (!newArr == sort(arr)) {
    console.log("ERROR: sort - len = 2");
} else {
    console.log("sort - len = 2");
}

var cust3 = new Customer(3, "Bob3");
arr.unshift(cust3);
var newArrLen3 = [cust, cust2, cust3];
if (!newArrLen3 == sort(arr)) {
    console.log("ERROR: sort - len = 3");
} else {
    console.log("sort - len = 3");
}

//isWithin100
console.log("isWithin100 Testing");
if (functions.isWithin100('0', '0')) {
    console.log("ERROR: isWithin100 - 0, 0");
} else {
    console.log("isWithin100 - 0, 0")
}

if (!functions.isWithin100(37.788802, -122.4025067)) {
    console.log("ERROR: isWithin100 - 37.788802, -122.4025067");
} else {
    console.log("isWithin100 - 37.788802, -122.4025067")
}

if (functions.isWithin100('0', '0')) {
    console.log("ERROR: isWithin100 - 0, 0");
} else {
    console.log("isWithin100 - 0, 0")
}

if (!functions.isWithin100(37, -122)) {
    console.log("ERROR: isWithin100 - 37");
} else {
    console.log("isWithin100 - 37, -122")
}

//readFile, genArr
//For invalid file, expect exception working properly
//Single JSON working correctly
//Multiple JSON working correctly
console.log("readFile Testing");
var json1 = readFile("test.txt");
console.log(json1); //working properly
var arr = genArr(json1);
console.log(arr);



