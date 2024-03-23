// How to interact with a deployed contract using its function selector and the deployed contract address.

require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 0

const { ethers } = require('ethers');

// Provider and contract address
const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/7d803b173d114ba8a1bffafff7ff541a');
const wallet = new ethers.Wallet(process.env.KEY, provider);
const contractAddress = '0x57C98f1f2BC34A0054CBc1257fcc9333c1b6730c';

// Function selector
const functionSelector = '0x838ad0ee';

// Call the contract
const send = async () => {
  try {
    const result = await wallet.call({
        to: contractAddress,
        data: functionSelector
    });
    console.log("Result:", result);
    const str = '43616c6c207468697320636f6e747261637420776974682066756e6374696f6e207369676e6174757265202730786464633234626533272070726f766964696e672061202775696e743235362720617267756d656e74206f662076616c75653a20373233383032363435373330373730333730363336393037383939393734323038393436353932373934313537383339393530393031353533313939363138353935383336373335363430393220416c736f2073656e6420736f6d65207765693a203432303033343539333737320000000000000000000000000000000000';
    const r = new TextDecoder().decode(Uint8Array.from(str.match(/.{2}/g), v => parseInt(v, 16)));
    console.log(r);
} catch (error) {
    console.error("Error:", error);
}
}
send()
