## Installation 

I- Ganache :
1) Install Ganache from https://www.trufflesuite.com/ganache.
2) Open Ganache with the Quick Start option and change the PORT NUMBER to 8545 in Settings -> Server (see image 1-Ganache Port Number).
3) Change the Mnenomic to : "vacuum market liberty mention source kiss behind chimney network glare forward visit" in Settings -> ACCOUNTS & KEYS. This will allow you to have the same addresses as in our tests in order to be consistent with the address ethereum brdge will use (see image 2-Ganache Mnemonic).

II- Metamask :
1)Install Metamask from https://metamask.io/.
2)Add a custom RPC with as new URL of RPC "HTTP://127.0.0.1:8545" and select this network as the current Metamask network(see image 3-Custom RPC Metamask).


III- Conda :
1) Download Miniconda installer for Windows from https://docs.conda.io/projects/conda/en/latest/user-guide/install/windows.html.
2) Execute the .exe and follow the instructions.

##Deployment

1) Extract MMM_source.tar.
2) Open the anaconda prompt that you can find on the Windows start menu after the installation of Conda and go to the extracted MMM_source folder (ex: cd ../desktop/MMM_source).
3) Run the command "setup.sh" on the anaconda prompt (If a there is a problem with executing .sh files under WINDOWS, download Git from https://git-scm.com/) and wait for it to finish.
4) Open the anaconda prompt and run the command "conda activate MMM".
5) On the same anaconda prompt, go to ../MMM_source/src then run "truffle migrate --reset".
6) Open a command prompt and go to ../MMM_source/src/ethereum-bridge then run the command "ethereum-bridge -H localhost:8545 -a 1 --dev" and leave it open (Wait until you have "Ctrcl + C to exit" writed on the command prompt).
7) Open another command prompt and go to ../MMM_source/src then run "truffle migrate --reset" another time.
8) On the same prompt, run the command "npm start".
9) Wait for a localhost:3000 web page to open.

## Functionalities

Those buttons are development features to facilitate testing. They appear only when using the bridge account having the address "0x340d10f3a238eaf78566017db25C5237F6664893". 

#[Send ETH]: Send 5 ETH to Smart Contract for Provable's fee to retrieve the Memes Of The Day from the database.
#[Update best memes]: Get the most liked memes to display in the Memes Of The Day tab(It takes about 10-20 sec to update).
#[Get Pool Money]: Displays on the web page console the amount of Wei invested by users on the memes of the day.
#[Send Rewards]: Send the rewards to the investors and the creator of the winning meme.

N.B : Refresh the page when you change the metamask current account.

## Usage

The actual implementation doesn't apply the 24 hours phase system to facilitate the testing and demonstration.

Different tabs of the menu :

# Home 
The main page where memes are displayed and where users can like memes and upload new memes.
See "Home.png" for a quick guide.

# Memes Of The Day
The best memes from the previous day that users can invest on.(Empty until you don't trigger the [Update best memes] button)

# My Memes
Allows you to display the memes posted by the current account selected on Metamask.

# My investments 
Allows you to display the investments posted by the current account selected on Metamask.




