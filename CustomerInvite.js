
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

//Global Variables
var EARTH_RADIUS = 6371;
var INTERCOM_LATITUDE = 37.788802;
var INTERCOM_LONGITUDE = -122.4025067;

//Converts degrees to radians
function toRad(x) {
    return x * Math.PI / 180;
}

async function asyncForEach(array, callback){
    for(let index = 0; index < array.length; index++){
        await callback(array[index], index, array);
    }
}

//Boolean: within 100km of Intercom SF
function isWithin100(customerLatitude, customerLongitude) {
    var x1 = INTERCOM_LATITUDE-customerLatitude;
    var dLat = toRad(x1);  
    var x2 = INTERCOM_LONGITUDE-customerLongitude;
    var dLon = toRad(x2);  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(toRad(customerLatitude)) * Math.cos(toRad(INTERCOM_LATITUDE)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = EARTH_RADIUS * c; 
    return d < 100;
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

//Sort compareCustomers array by ascending user id
async function sort(arr){
    return arr.sort(compareCustomers);
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

var myArgs = process.argv.slice(2);

async function run(){
    var result = await readFile(myArgs[0]);
    var log = await genArr(result);
    var final = await sort(log);
    console.log(final);

}

run();

//Exports for testing
module.exports = {
    compareCustomers,
    isWithin100,
    readFile,
    genArr,
    sort,
};
