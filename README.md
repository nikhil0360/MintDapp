# MintFolio

MintFolio is a one-stop Dapp for your all your NFT needs, Whether you are a dev, artist or a new collector. Our Dapp allows you to mint, burn, check rarity, sell, list, generate ... NFTs. Fork and lauch your new NFT collections in minutes! You can quickly join the NFT world with just a simple click.

- MintFolio dapp has a cross-chain Marketplace to Sell, List and Explore NFTs
- Minter to mint “RandomSVG Collection” with completely on-chain NFT metadata
- Minter to mint “CryptoDevs Collection”, which is a generative art NFT collection with unique traits (We are doing NFT drop for **CryptoDevs**)
- NFT Burner to burn your CryptoDevs and earn rewards
- Your collections page lets you view all your NFTs in your wallet
- Rarity viewer to see the rarity of an NFT in its collection
- Transactions page to see all your actions and events

All the functionality is achievable using a click of a **button**!

### **How can this dapp help developers 👩‍💻🧑‍💻 -**

Developers can easily clone the Github repository, change contract address to their smart contract address and voila! they have a working dapp with all the above functionalities

### **How can this dapp help artists 🖌 -**

An artist can now launch their next NFT Collection in a matter of minutes! Not kidding. Using Moralis generative art engine, they can make their artwork, upload it to IPFS and use our custom python script to create a provenance hash to prove the sequence of mint.

### **How can this dapp help novice collectors 🖼 -**

Cross-chain marketplace explorer to list and buy NFTs, mint new NFT with a click of a button, view rarity of NFTs with Rarity viewer

### **How can this dapp help new web3 users 👋 -**

We have designed the dapp to be user-centric, informative, clean and fun to improve the onboarding experience.

MintFolio aims to provide all flavours of NFT functionality and utilities to users; even people with absolutely no idea about the web3 ecosystem can learn about the essence behind this digital token (beyond artworks) and help them mint and sell NFTs with ease.

# `Tech Stack`
⚡ Lightning-fast transactions powered by **Polygon** Network.

📦 Storing NFTs artwork and metadata on **IPFS**.

🛠 Boilerplate and backend server service to Sync all your users and smart contracts events straight into databaseto powered by **Moralis**

⛓ Randomness use to generate random SVG art using **Chainlink** VRF


# `ethereum-boilerplate-NFT-Marketplace`

This Project is a fork of Ethereum Boilerplate and demostrates how you can build your own NFT Marketplace. This project of course work on any EVM-compatible blockchain such as Polygon, Avalanche, Binance Smart Chain and other such chains.

![Preview](preview.gif)

# ⭐️ `Star us`
If this boilerplate helps you build Ethereum dapps faster - please star this project, every star makes us very happy!

# 🚀 Quick Start

📄 Clone or fork `ethereum-nft-marketplace-boilerplate`:
```sh
git clone https://github.com/ethereum-boilerplate/ethereum-nft-marketplace-boilerplate.git
```
💿 Install all dependencies:
```sh
cd ethereum-nft-marketplace-boilerplate
yarn install
```
✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server))
Example:
```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```

🔎 Locate the MoralisDappProvider in `src/providers/MoralisDappProvider/MoralisDappProvider.js` and paste the deployed marketplace smart contract address and ABI
```jsx
const [contractABI, setContractABI] = useState();
const [marketAddress, setMarketAddress] = useState();
```

🔃 Sync the `MarketItemCreated` event `/src/contracts/marketplaceBoilerplate.sol` contract with your Moralis Server, making the tableName `MarketItems`
```jsx
event MarketItemCreated (
  uint indexed itemId,
  address indexed nftContract,
  uint256 indexed tokenId,
  address seller,
  address owner,
  uint256 price,
  bool sold
);
```

🚴‍♂️ Run your App:
```sh
yarn start
```
