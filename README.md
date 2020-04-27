# MMM

## Getting started  


### Preliminary requirements 

#### Ganache
1. Install [Ganache](https://www.trufflesuite.com/ganache).
2. Open Ganache with the Quick Start option and change the PORT NUMBER to 8545 in Settings -> Server.
3. Change the Mnenomic to : **"vacuum market liberty mention source kiss behind chimney network glare forward visit"** in Settings -> ACCOUNTS & KEYS. This will allow you to have the same addresses as in our tests in order to be consistent with the address ethereum brdge will use.


#### Metamask  
1. Install [Metamask](https://metamask.io/).
2. Add a custom RPC with as new URL of RPC "HTTP://127.0.0.1:8545" and select this network as the current Metamask network.
3. Add the account address ```0x340d10f3a238eaf78566017db25C5237F6664893``` (it will be the bridge account).
4. Add other accounts.

#### Miniconda :
Install Miniconda  [here](https://docs.conda.io/en/latest/miniconda.html). \
Miniconda will be used to build an independant environment for the project.


### Installation 
Execute the command 
```
./setup.sh
```
to install all the application dependencies.


## Application deployment 

### Activate the MMM environment
To activate the MMM environment that contains the necessary dependencies for the next steps, execute the command :
```
conda activate MMM
```


### Blockchain initialization 
Start or restart Ganache to initialize the blockchain. To restart it go to Setting -> Restart. \
10 accounts will be displayed with a balance of 100 ETH each.


### Lauching bridge 
Make sure that you are using the MMM environment, activate it if not. \
Go to the ```ethereum-bridge``` folder in ```src``` and execute the command :
```
./ethereum-bridge -H localhost:8545 -a 1 --dev
```


### Smart contract deployment 
Open a new terminal, and make sure that you are using the MMM environment, activate it if not. \
Go to the ```src``` folder and execute the command :
```
truffle migrate --reset
```
This will deploy the smart contract. You will see on Ganache that a user has spent a few ether when deploying the smart contract.


### Start application 
1. To run the application, execute the command : 
```
npm start
```
2. Wait until the page is loaded. If an error appears, reset your metamask accounts and refresh the page.




## Usage 
The actual implementation doesn't apply the 24 hours phase system to facilitate the testing and demonstration. 



### Bridge account functionalities
Use the bridge account of address ```0x340d10f3a238eaf78566017db25C5237F6664893``` to get a few tools to ease the demonstration.
Under this account, you will have the possibility to : 
1. Send Ether 5 by 5 to the smart contract, this step is mandatory to retrieve the best memes
2. Update the best memes. This takes around 10 to 20 seconds.
3. Get the pool money (the amount to be split and distributed)
4. Send rewards (distribute the amount in the pool money)



### Menu 
The menu has different tabs:

##### Home 
The main page where memes are displayed and where users can like memes and upload new memes.

##### Memes Of The Day
The best memes that have been uploaded the previous day that users can gamble on. (Empty until you don't trigger the [Update best memes] button with the bridge account)

##### My Memes
Allows you to display the memes posted by the current account selected on Metamask.

##### My investments 
Allows you to display the bets posted by the current account selected on Metamask.

### Upload meme
At the top right of homepage, you will find a button dedicated to upload memes.

### Gamble 
Go to the My Investments page, click on Invest and pick the sum you want to bet.

