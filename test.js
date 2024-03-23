require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 0;

const { ethers } = require('ethers');
const web3 = require('web3');
const { BigNumber } = require("@ethersproject/bignumber");

// Provider and contract address
const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/7d803b173d114ba8a1bffafff7ff541a');
const wallet = new ethers.Wallet(process.env.KEY, provider);
const contractAddress = '0x57C98f1f2BC34A0054CBc1257fcc9333c1b6730c';

// Function selector
const functionSelector = '0xddc24be3';
const input = BigNumber.from("72380264573077037063690789997420894659279415783995090155319961859583673564092");

// Encode function arguments (if any)
const encodedArguments = ethers.utils.defaultAbiCoder.encode(
  ['uint256'],
  [input]); // Corrected the types and values

// Concatenate function selector and arguments
const data = ethers.utils.hexConcat([functionSelector, encodedArguments]);


// Call the contract
  async function send() {
    try {
      const tx = await wallet.sendTransaction({
        to: contractAddress,
        value: web3.utils.toWei('0.000000420034593772', 'ether'),
        data: data
      });
      console.log("Transaction hash:", tx.hash);
    } catch (error) {
      console.error("Error:", error);
    }
  }

send();
