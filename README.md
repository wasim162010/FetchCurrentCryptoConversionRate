# PropineAssignment

Note this program uses below libs :
cryptocompare to fetch the current conbversion rates of cryptos in USD.
jquery-csv.js, qjuery to read the csv files

Note : To test the program, only dew records were taken from transaction 2.csv file.

Install  :

npm install --save cryptocompare

refer https://www.npmjs.com/package/cryptocompare


Language used to write the program : node js

How to call methods usingf command line args : F
  
 
a) "FetchPortfolioForToken"  node <filename> "FetchPortfolioForToken" "BTC" .See below example :
  
BLRCLM52143805:checkcryptocompare 52143805$ node checkusingfs.js "FetchPortfolioForToken" "BTC"
0 -> /usr/local/bin/node
1 -> /Users/52143805/checkcryptocompare/checkusingfs.js
2 -> FetchPortfolioForToken
3 -> BTC
calling FetchPortfolioForToken
Portfolio In Dollars 8721.427464540004

b) "FetchPortfolioForAllTokens" node <filename> "FetchPortfolioForAllTokens" .See below example :

BLRCLM52143805:checkcryptocompare 52143805$ node checkusingfs.js FetchPortfolioForAllTokens
0 -> /usr/local/bin/node
1 -> /Users/52143805/checkcryptocompare/checkusingfs.js
2 -> FetchPortfolioForAllTokens
calling FetchPortfolioForAllTokens
FetchPortfoliForAllTokens
{ BTC: { USD: 7534.41 }, ETH: { USD: 149.04 }, XRP: { USD: 0.2268 } }
{ BTC: { USD: 7534.41 }, ETH: { USD: 149.04 }, XRP: { USD: 0.2268 } }
Portfolio In Dollars for BTC  btcDeposits 3.4574540000000002 btcWithdrawal 2.3 total 8720.732992140003
Portfolio In Dollars for ETH  ethDeposits 1.1312350000000002 ethWithdrawal 2.605839 total -219.77498015999996
Portfolio In Dollars for BTC  xrpDeposits 1.713272 xrpWithdrawals 2.737186 total -0.2322236952

c) "FetchTokenValForSpeDate  node <filename> "FetchTokenValForSpeDate" "BTC" "12/06/2019" .See below example :

BLRCLM52143805:checkcryptocompare 52143805$ node checkusingfs.js "FetchTokenValForSpeDate" "BTC" "12/06/2019"
0 -> /usr/local/bin/node
1 -> /Users/52143805/checkcryptocompare/checkusingfs.js
2 -> FetchTokenValForSpeDate
3 -> BTC
4 -> 12/06/2019
calling FetchTokenValForSpeDate
FetchTokenValForSpeDate
{ BTC: { USD: 7535.12 } }
{ BTC: { USD: 7535.12 } }
Portfolio In Dollars 1507.0239999999997

d) "FetchAllForSpeDate"    node <filename> "FetchAllForSpeDate" "12/06/2019" . See below example

BLRCLM52143805:checkcryptocompare 52143805$ node checkusingfs.js "FetchAllForSpeDate" "12/06/2019"
0 -> /usr/local/bin/node
1 -> /Users/52143805/checkcryptocompare/checkusingfs.js
2 -> FetchAllForSpeDate
3 -> 12/06/2019
calling FetchAllForSpeDate
FetchAllForSpeDate
DollarEqui
Portfolio In Dollars for BTC 1507.0140000000013
Portfolio In Dollars for ETH -299.90872
Portfolio In Dollars for XRP -0.3004118
© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
