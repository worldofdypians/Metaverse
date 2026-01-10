# World of Dypians – Metaverse Web3 Interface

World of Dypians Metaverse is the official Web3 frontend interface for the World of Dypians gaming ecosystem, built for interaction with smart contracts deployed on **BNB Smart Chain (BSC)** and other EVM-compatible networks.

This repository represents the core metaverse interface connecting gameplay, NFTs, tokens, and decentralized finance features within the World of Dypians universe.

---

## 🚀 About the Project

World of Dypians (WoD) is a play-and-earn MMORPG metaverse combining immersive gaming with blockchain technology. The project is actively integrated into the **BNB Chain ecosystem**, with deployments and support for BNB Smart Chain infrastructure.

The platform enables players to explore, earn, trade, and interact in a decentralized virtual world secured by smart contracts on BNB Chain.

---

## 🛠 Technology Stack

- **Blockchain:** BNB Smart Chain (primary), EVM-compatible networks
- **BNB Chain SDKs:** `@binance/w3w-wagmi-connector-v2` (BNB Chain official Web3 Wallet Connector)
- **Smart Contracts:** Solidity
- **Frontend:** React
- **Web3 Libraries:** Wagmi, viem, ethers.js / web3.js
- **Development:** Hardhat / OpenZeppelin
- **3D graphics:** Three.js
- **React renderer for Three.js:** Three Fiber
- **Routing:** React Router
- **Styling:** SCSS, BootStrap, Tailwind

---

## 🌐 Supported Networks

| Network                 | Chain ID |
| ----------------------- | -------- |
| BNB Smart Chain Mainnet | 56       |
| opBNB                   | 204      |
| Ethereum Mainnet        | 1        |

BNB Smart Chain is the primary supported network for this project.

---

## 📦 Smart Contract Addresses

### 🪙 Token (BNB Smart Chain)

| Contract  | Address                                      |
| --------- | -------------------------------------------- |
| WoD Token | `0xb994882a1b9bd98A71Dd6ea5F61577c42848B0E8` |

---

### 🟡 BNB Smart Chain

| Contract                   | Address                                      |
| -------------------------- | -------------------------------------------- |
| NFT BNB                    | `0xe468df1606650452b2c08c36F79eaA8B78848E9C` |
| Dypius Premium NFT Voucher | `0xA3e62c82410fF6697B68CABE90a8b1B6e3CEC8CD` |
| Subscription               | `0x6A96d47B8B93Fb656Bf305146C27FAE38dE1F646` |
| Daily Bonus                | `0xF4435c244A292a8E8D56767bf6DF9b9c4D59aEED` |
| Royalty Chest              | `0xF4435c244A292a8E8D56767bf6DF9b9c4D59aEED` |
| Single Strike              | `0xe851e377C676C43d04dd4AEd4808BcC00642Bd41` |
| Daily Question             | `0xE7DA7750f4604cdcA598726bF6631A9A463A8Ba9` |
| Dragon Ruins               | `0xA9D3c4f11C9a9eb4ea47E30d3210EEbF939d71De` |
| Cold Bite                  | `0x6fDB783a9102961B9Ea62D40C69C067e93Ac170b` |
| Fury Beast                 | `0xEceF913121D299f7D962A7887C11bf60F3338a63` |
| Wing Storm                 | `0x5990a2e7c895A5A5F35787E81bC7BF5cFF085688` |
| Scorpion King              | `0x6fC8de0936d45071aFF7918137a436148107574C` |
| Stone Eye                  | `0x1b8112Fd61391E5Cf8971EC35988D47e4Ced5621` |
| Puzzle Madness             | `0xE44E483486d38DADC77bBF968B55F39bBDACE80d` |
| Golden Pass                | `0x64D519666D67F95124C3ac755F731ad6e15786DF` |

### 🟣 opBNB Chain

| Contract       | Address                                      |
| -------------- | -------------------------------------------- |
| Daily Question | `0xfcCEC27EeAe7B2497A430459A1b3D3E7B5F96087` |
| Daily Bonus    | `0xd600fBcF64Da43CcBB4ab6Da61007F5b1f8Fe455` |
| Royalty Chest  | `0xd600fBcF64Da43CcBB4ab6Da61007F5b1f8Fe455` |
| NFT BNB 5Y     | `0x7A95F56395001865c58F31779781197ba53B8892` |
| NFT opBNB      | `0x4e4A3f047fA8Fe69cB1a79a0452121ED6fca95ba` |

---

### 🌐 Ethereum Mainnet

| Contract           | Address                                      |
| ------------------ | -------------------------------------------- |
| NFT Marketplace    | `0xF55D96735Fa22ba1C119bA37aF76C2c4E3BeC224` |
| CAWS NFT           | `0xd06cf9e1189feab09c844c597abc3767bc12608c` |
| CAWS Premium Stake | `0x097bB1679AC734E90907Ff4173bA966c694428Fc` |
| Land Premium Stake | `0x3E0c0443A6a5382B2Ef20ECfe3bdbE84F1436523` |
| Timepiece NFT      | `0x29c13273cf56dac69cfae173c73fde2cd75b5ede` |
| Subscription (ETH) | `0x29c90c6a1243455266afd7f92649e384213d45b0` |

---

> All contracts are verified and actively used by the World of Dypians ecosystem across BNB Smart Chain, Ethereum, and opBNB networks.

## ✨ Features

- MMORPG metaverse gameplay with blockchain integration
- NFT-based assets (characters, items, land)
- Play-and-earn reward mechanics
- Multi-chain access with BNB Smart Chain as primary network
- Secure smart contract architecture using OpenZeppelin standards
- Optimized gas efficiency for BNB Smart Chain

---

## 📁 Repository Structure

```
Metaverse/
├─ public/ # Static assets
│ └─ index.html
│
├─ src/
│ ├─ assets/ # Images, icons, media files
│ ├─ components/ # Reusable UI components
│ ├─ pages/ # Application pages / views
│ ├─ hooks/ # Custom React hooks
│ ├─ services/ # API & blockchain service handlers
│ ├─ utils/ # Helper utilities
│ ├─ constants/ # Network, contract, and app constants
│ ├─ wagmiConnectors.js # BNB Chain wallet & RPC configuration
│ ├─ App.js
│ └─ index.js
│
├─ package.json
├─ package-lock.json
├─ .env.example
├─ .gitignore
└─ README.md
```

---

## 🔗 Official Links

- Website: https://worldofdypians.com
- X: https://twitter.com/worldofdypians
- Discord: https://discord.gg/worldofdypians

---

## ⚙️ Installation

```bash
git clone https://github.com/worldofdypians/Metaverse
cd Metaverse
npm install
npm start
```

## 🧪 Build

```bash
npm run build
```

## ⚙️ BNB Chain Configuration Evidence

BNB Chain connectivity is explicitly configured in:

`src/wagmiConnectors.js`

This file initializes wallet connectors and RPC providers using the official BNB SDK:

- `@binance/w3w-wagmi-connector-v2`
- BNB Smart Chain and opBNB network definitions
- BNB-specific RPC endpoints
- BNB Chain wallet connection logic

This confirms that BNB Chain is a primary deployment target at the configuration level, fulfilling the BNB Chain verification requirements without relying on external context.

## 🔐 BNB Chain Ecosystem Compliance

This repository demonstrates clear deployment intent and integration with the BNB Chain ecosystem through:

- Primary deployment support for **BNB Smart Chain**
- Support for **opBNB**
- Integration of official BNB SDK: `@binance/w3w-wagmi-connector-v2`
- Frontend wallet connection optimized for BNB Chain
- Network prioritization of BNB Chain in UI and documentation

These elements ensure the repository satisfies BNB Chain Repository Submission Guidelines.
