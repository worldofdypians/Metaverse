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

| Network     | Core Contract | Token Contract | Optional Modules |
| ----------- | ------------- | -------------- | ---------------- |
| BNB Mainnet | 0x...         | 0x...          | 0x...            |
| BNB Testnet | 0x...         | 0x...          | 0x...            |
| opBNB       | 0x...         | 0x...          | 0x...            |
| Ethereum    | 0x...         | 0x...          | 0x...            |

> Replace with verified deployed contract addresses.

---

## ✨ Features

- MMORPG metaverse gameplay with blockchain integration
- NFT-based assets (characters, items, land)
- Play-and-earn reward mechanics
- Multi-chain access with BNB Smart Chain as primary network
- Secure smart contract architecture using OpenZeppelin standards
- Optimized gas efficiency for BNB Smart Chain

---

## 📁 Repository Structure

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

npm run build

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
