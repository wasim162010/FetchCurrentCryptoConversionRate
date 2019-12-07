/*

Note this program uses below libs :
cryptocompare to fetch the current conbversion rates of cryptos in USD.
jquery-csv.js, qjuery to read the csv files

Note : To test the program, only dew records were taken from transaction 2.csv file.

*/


var cscsc = require("jquery-csv")
var fs = require('fs');
var $ = jQuery = require("jquery");
require('./jquery-csv.js');

//fetch crypto values
var arthmetic = require("./arthmetic");
const cc = require("cryptocompare")
global.fetch = require('node-fetch')

var sample ='transactions 2.csv'; //csv file
cc.setApiKey("c970ce7f24965939d85ba651b207cf8e8577541ba4d0b170cc1d01afa74784fa") //api key to access cryptocompare API.

let DollarEqui={} //getting used.

function CallOperations() {
    
    /*
    process.argv params  order and what they refer to 
    0 /usr/local/bin/node
    1 /Users/52143805/checkcryptocompare/checkusingfs.js
    2 function name that needs to be called
    3 Crypto , i.e. should be either BTC,ETH, XRP, or All , incase portfolio for all needs to be calculated
    4 Date, should be passed in case if you want to call function which expects date as a parameter.
    5 Currency , in this case it should be USD.
    */

    for (let j = 0; j < process.argv.length; j++) {
        console.log(j + ' -> ' + (process.argv[j]));
    }
    
    let functionToBeCalled = process.argv[2]

    if(functionToBeCalled == "FetchPortfolioForToken") { 
        //to call this pass : node <file name> "FetchPortfolioForToken" "BTC"
        //    ex                 node checkusingfs.js "FetchPortfolioForToken" "BTC"
        console.log("calling FetchPortfolioForToken")
        FetchPortfolioForToken(process.argv[3])
    }
    else if(functionToBeCalled == "FetchPortfolioForAllTokens") {
        //to call this pass : node <file name> "FetchPortfolioForAllTokens"
        //    ex                 node checkusingfs.js FetchPortfolioForAllTokens
        console.log("calling FetchPortfolioForAllTokens")
        FetchPortfolioForAllTokens();
    }
    else if(functionToBeCalled == "FetchTokenValForSpeDate" ) {
        //to call this pass : node <file name>  "FetchTokenValForSpeDate" "BTC" "12/06/2019"
        // ex                  node checkusingfs.js "FetchTokenValForSpeDate" "BTC" "12/06/2019"
        console.log("calling FetchTokenValForSpeDate")
        FetchTokenValForSpeDate(process.argv[3].trim(), process.argv[4].trim())
    }
    else if(functionToBeCalled == "FetchAllForSpeDate" ) {
        //to call this pass : node <file name> "FetchAllForSpeDate" "12/06/2019"
        // ex                  node checkusingfs.js "FetchAllForSpeDate" "12/06/2019"
        console.log("calling FetchAllForSpeDate")
        FetchAllForSpeDate(process.argv[3].trim())
    }
    else {
        console.log("Match did not found")
    }
}

CallOperations();

//FetchPortfolioForToken("BTC")
/*
 FetchPortfolioForToken : used to find the portfolio value for that token in USD
*/
function FetchPortfolioForToken(_token) { //testing done
    let tempDeposits=0, tempWithdrawals=0, _portfolioInDollars =0 // cryptoValue=0
    DollarEqui = {}
    cc.priceMulti(_token, "USD")
    .then(value => { // then 
        DollarEqui = value;
        fs.readFile(sample,'UTF-8',function(err, csv) { //reading file
            $.csv.toArrays(csv, {},function(err, data) { //iterting through rows
                for(var i=0, len=data.length; i<len; i++) { //for loop
                    if(data[i][2] == _token) { //date and coin comparison
                        if(data[i][1] == "DEPOSIT") {
                                tempDeposits = tempDeposits + Number(data[i][3])
                        }
                        else if(data[i][1] == "WITHDRAWAL" )  {
                                tempWithdrawals = tempWithdrawals + Number(data[i][3])
                            }
                    } //date and coin comparison
                } //for loop
                console.log("Portfolio In Dollars "+ (tempDeposits - tempWithdrawals) * DollarEqui[_token]["USD"])
            }); //iterting through rows
        });//reading file         
    }) // then  
}

//FetchPortfolioForAllTokens()
/*
 FetchPortfolioForAllTokens : used to find the portfolio value per token in USD
*/
function FetchPortfolioForAllTokens() {  // testing done
    console.log("FetchPortfoliForAllTokens")
    let _portfolioInCrypto =0, _portfolioInDollars =0 
    let _dollarEqui=0, btcCal=0,ethCal=0,xrpCal=0
    let btcDeposits=0, btcWithdrawal=0,ethDeposits=0, ethWithdrawal=0,xrpDeposits=0,xrpWithdrawals=0
    DollarEqui = {}
    cc.priceMulti(['BTC', 'ETH', 'XRP'], "USD")
    .then(value => { // then 
        DollarEqui = value;
        console.log(DollarEqui)
        fs.readFile(sample,'UTF-8',function(err, csv) { //reading file
            $.csv.toArrays(csv, {},function(err, data) { //iterting through rows
                for(var i=0, len=data.length; i<len; i++) { //for loop
                    if(data[i][2] == "BTC") { 
                        
                        if(data[i][1] == "DEPOSIT") {
                                btcDeposits = btcDeposits + Number(data[i][3])
                            }
                            else if(data[i][1] == "WITHDRAWAL" )  {
                                btcWithdrawal = btcWithdrawal + Number(data[i][3])
                            }
                    } 
                    else  if(data[i][2] == "ETH") { 
                        if(data[i][1] == "DEPOSIT") {
                                ethDeposits = ethDeposits + Number(data[i][3])
                            }
                            else if(data[i][1] == "WITHDRAWAL" )  {
                                ethWithdrawal = ethWithdrawal + Number(data[i][3])
                            }
                    }
                    if(data[i][2] == "XRP") { 
                        if(data[i][1] == "DEPOSIT") {
                                xrpDeposits = xrpDeposits + Number(data[i][3])
                            }
                            else if(data[i][1] == "WITHDRAWAL" )  {
                                xrpWithdrawals = xrpWithdrawals + Number(data[i][3])
                            }
                    }  
                    
                } //for loop
                console.log( DollarEqui)
                console.log("Portfolio In Dollars for BTC "+ " btcDeposits " + btcDeposits + " btcWithdrawal " + btcWithdrawal + " total " + (btcDeposits - btcWithdrawal)  * DollarEqui["BTC"]["USD"])
                console.log("Portfolio In Dollars for ETH "+ " ethDeposits " + ethDeposits + " ethWithdrawal " + ethWithdrawal + " total " + (ethDeposits - ethWithdrawal)  * DollarEqui["ETH"]["USD"])
                console.log("Portfolio In Dollars for BTC "+ " xrpDeposits " + xrpDeposits + " xrpWithdrawals " + xrpWithdrawals + " total "  + (xrpDeposits - xrpWithdrawals) * DollarEqui["XRP"]["USD"])
            }); //iterting through rows
        });//reading file         
    }) // then 
} 

//FetchTokenValForSpeDate("BTC","12/06/2019")   // working
/*
 FetchTokenValForSpeDate : used to find the portfolio value of that token in USD on that date
*/
function FetchTokenValForSpeDate(_token,_date) { // testing done
    console.log("FetchTokenValForSpeDate")
    let dateString =  new Date(_date).toDateString();
    let tempDeposits=0, tempWithdrawals=0, _portfolioInDollars =0, cryptoValue=0
    let curValue =0
    DollarEqui = {}
    cc.priceMulti(_token, "USD")
    .then(value => { // then 
        DollarEqui = value;
        console.log(DollarEqui)
        fs.readFile(sample,'UTF-8',function(err, csv) { //reading file
            $.csv.toArrays(csv, {},function(err, data) { //iterting through rows
                for(var i=0, len=data.length; i<len; i++) { //for loop
                    if(dateString == new Date (data[i][0] * 1000).toDateString() && data[i][0] != "timestamp" && data[i][2] == _token) { //date and coin comparison
                        tempDeposits =0
                        tempWithdrawals=0
                        if(data[i][1] == "DEPOSIT") {
                                tempDeposits = tempDeposits + Number(data[i][3])
                        }
                            else if(data[i][1] == "WITHDRAWAL" )  {
                                tempWithdrawals = tempWithdrawals + Number(data[i][3])
                            }
                            cryptoValue = cryptoValue + (tempDeposits - tempWithdrawals)
                            
                    } //date and coin comparison
                } //for loop
                console.log( DollarEqui)
                console.log("Portfolio In Dollars "+ cryptoValue * DollarEqui[_token]["USD"])
            }); //iterting through rows
        });//reading file         
    }) // then     
}

/*
FetchAllForSpeDate : portfolio value per token in USD on that date
*/
//FetchAllForSpeDate("12/06/2019")
function FetchAllForSpeDate(_date) {  //working   testing done
    console.log("FetchAllForSpeDate")
    let btcDeposits=0, btcWithdrawal=0,ethDeposits=0, ethWithdrawal=0,xrpDeposits=0,xrpWithdrawals=0
    let dateString =  new Date(_date).toDateString(); 
    cc.priceMulti(['BTC', 'ETH', 'XRP'], "USD")
    .then(value => {
        DollarEqui = value;
        
        fs.readFile(sample,'UTF-8',function(err, csv) { //read files started.  
          
            $.csv.toArrays(csv, {},function(err, data) { //iterate through rows 
        
              for(var i=0, len=data.length; i<len; i++) { // for loop
                  
                if( dateString == new Date (data[i][0] * 1000).toDateString()) {//} && data[i][0] != "timestamp") { // top if                        
                    if(data[i][2] == "BTC") { // BTC
                            if(data[i][1] == "DEPOSIT") 
                                btcDeposits = btcDeposits + Number(data[i][3])
                            else if(data[i][1] == "WITHDRAWAL" )  
                                btcWithdrawal = btcWithdrawal + Number(data[i][3])
                        }
        
                    else if(data[i][2] == "ETH" ) { // ETH
                            if(data[i][1] == "DEPOSIT")
                                ethDeposits = ethDeposits + Number(data[i][3])
                            else if(data[i][1] == "WITHDRAWAL" ) 
                                ethWithdrawal = ethWithdrawal + Number(data[i][3])
                        }
        
                    else if(data[i][2] == "XRP") { // XRP
                            if(data[i][1] == "DEPOSIT")
                                xrpDeposits = xrpDeposits + Number(data[i][3])
                            else if(data[i][1] == "WITHDRAWAL") 
                                xrpWithdrawals = xrpWithdrawals + Number(data[i][3])
                        } 
                  } // top if 
              }// for loop
              console.log("DollarEqui")
              console.log("Portfolio In Dollars for BTC "+ (btcDeposits - btcWithdrawal) * DollarEqui["BTC"]["USD"])
              console.log("Portfolio In Dollars for ETH "+ (ethDeposits - ethWithdrawal) * DollarEqui["ETH"]["USD"])
              console.log("Portfolio In Dollars for XRP "+ (xrpDeposits - xrpWithdrawals) * DollarEqui["XRP"]["USD"])
            

            }); //iterate through rows 
          });  //read files ended  
    }) //then
} 
