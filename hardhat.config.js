/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan"); 

const { API_KEY, API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.0",
   etherscan: {
      apiKey: API_KEY,
   },
   networks: {
      main: {
	 chainId: 43114,
         url: API_URL,
         accounts: [PRIVATE_KEY]
      }
   },
}
