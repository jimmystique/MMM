#!/bin/bash

eval "$(conda shell.bash hook)"
conda create -n MMM  -y 
conda activate MMM
git clone https://github.com/oraclize/ethereum-bridge.git src/ethereum-bridge
conda install -c conda-forge nodejs
npm install
npm rebuild node-sass
cd src; truffle compile 

