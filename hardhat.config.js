/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan"); 

const { MAIN_API_URL, MAIN_PRIVATE_KEY, API_KEY, API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.0",
   etherscan: {
      apiKey: API_KEY,
   },
   networks: {
      rinkeby: {
         url: API_URL,
         accounts: [PRIVATE_KEY]
      },
      main: {
         url: MAIN_API_URL,
         accounts: [MAIN_PRIVATE_KEY]
      }
   },
}
