const BigNumber = window.BigNumber;
window.IS_CONNECTED = false;
window.WALLET_TYPE = "";
window.the_graph_result = {};
const TOKEN_ADDRESS = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17";
const TOKEN_IDYP_ADDRESS = "0xbd100d061e120b2c67a24453cf6368e63f1be056";

const TOKENS_DISBURSED_PER_YEAR = [
  360_000, 540_000, 900_000, 1_200_000,

  360_000, 540_000, 900_000, 1_200_000,

  360_000, 540_000, 900_000, 1_200_000,

  360_000, 540_000, 900_000, 1_200_000,
];

const LP_IDs = {
  eth: [
    "0xba7872534a6c9097d805d8bee97e030f4e372e54-0xa7d6f5fa9b0be0e98b3b40e6ac884e53f2f9460e",
    "0xba7872534a6c9097d805d8bee97e030f4e372e54-0x0b0a544ae6131801522e3ac1fbac6d311094c94c",
    "0xba7872534a6c9097d805d8bee97e030f4e372e54-0x16caad63bdfc3ec4a2850336b28efe17e802b896",
    "0xba7872534a6c9097d805d8bee97e030f4e372e54-0x512ff8739d39e55d75d80046921e7de20c3e9bff",
  ],
  wbtc: [
    "0x44b77e9ce8a20160290fcbaa44196744f354c1b7-0xef71de5cb40f7985feb92aa49d8e3e84063af3bb",
    "0x44b77e9ce8a20160290fcbaa44196744f354c1b7-0x8b0e324eede360cab670a6ad12940736d74f701e",
    "0x44b77e9ce8a20160290fcbaa44196744f354c1b7-0x78e2da2eda6df49bae46e3b51528baf5c106e654",
    "0x44b77e9ce8a20160290fcbaa44196744f354c1b7-0x350f3fe979bfad4766298713c83b387c2d2d7a7a",
  ],
  usdt: [
    "0x76911e11fddb742d75b83c9e1f611f48f19234e4-0x4a76fc15d3fbf3855127ec5da8aaf02de7ca06b3",
    "0x76911e11fddb742d75b83c9e1f611f48f19234e4-0xf4abc60a08b546fa879508f4261eb4400b55099d",
    "0x76911e11fddb742d75b83c9e1f611f48f19234e4-0x13f421aa823f7d90730812a33f8cac8656e47dfa",
    "0x76911e11fddb742d75b83c9e1f611f48f19234e4-0x86690bbe7a9683a8bad4812c2e816fd17bc9715c",
  ],
  usdc: [
    "0xabd9c284116b2e757e3d4f6e36c5050aead24e0c-0x2b5d7a865a3888836d15d69dccbad682663dcdbb",
    "0xabd9c284116b2e757e3d4f6e36c5050aead24e0c-0xa52250f98293c17c894d58cf4f78c925dc8955d0",
    "0xabd9c284116b2e757e3d4f6e36c5050aead24e0c-0x924becc8f4059987e4bc4b741b7c354ff52c25e4",
    "0xabd9c284116b2e757e3d4f6e36c5050aead24e0c-0xbe528593781988974d83c2655cba4c45fc75c033",
  ],
};

const LP_ID_LIST = Object.keys(LP_IDs)
  .map((key) => LP_IDs[key])
  .flat();
const TOKENS_DISBURSED_PER_YEAR_BY_LP_ID = {};
LP_ID_LIST.forEach(
  (lp_id, i) =>
    (TOKENS_DISBURSED_PER_YEAR_BY_LP_ID[lp_id] = TOKENS_DISBURSED_PER_YEAR[i])
);
const VAULT_ADDRESSES_LIST = LP_ID_LIST.map((id) => id.split("-")[1]);

window.LP_ID_LIST = LP_ID_LIST;

function getTokenContract(address) {
  return getContract({ address, ABI: window.TOKEN_ABI });
}

function getVaultContract(address) {
  return getContract({ address, ABI: window.VAULT_ABI });
}

function getPrices(coingecko_ids = "ethereum", vs_currencies = "usd") {
  return new Promise((resolve, reject) => {
    window.$.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coingecko_ids}&vs_currencies=${vs_currencies}`
    )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

window.getPrices = getPrices;

class STAKING {
  constructor(ticker = "STAKING", token = "TOKEN") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "depositTime",
      "cliffTime",
      "lastClaimedTime",
      "totalEarnedTokens",
      "totalEarnedEth",
      "getPendingDivs",
      "getPendingDivsEth",
      "tokensToBeDisbursedOrBurnt",
      "tokensToBeSwapped",
      "getNumberOfHolders",
      "getDepositorsList",
      "swapAttemptPeriod",
      "lastSwapExecutionTime",
      "contractDeployTime",
      "disburseDuration",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["deposit", "withdraw", "claimAs", "claim"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        let value = 0;
        console.log(value);

        let { latestGasPrice, maxPriorityFeePerGas } = await getMaxFee();
        console.log({ latestGasPrice, maxPriorityFeePerGas });

        let gas = window.config.default_gas_amount;
        try {
          let estimatedGas = await contract.methods[fn_name](
            ...args
          ).estimateGas({ gas });
          if (estimatedGas) {
            gas = Math.min(estimatedGas, gas);
            //console.log('estimatedgas'+gas)
          }
        } catch (e) {
          console.warn(e);
        }
        return await contract.methods[fn_name](...args).send({
          value,
          gas,
          from: await getCoinbase(),
        });
      };
    });

    // [
    // 	"claim"
    // ].forEach(fn_name => {
    // 	this[fn_name] = async function(...args) {
    // 		let contract = await getContract(this.ticker)
    // 		let value = 0;
    // 		let gas = window.config.default_gas_amount
    // 		return (await contract.methods[fn_name](...args).send({value, gas, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
    // 	}
    // })
  }

  async depositTOKEN(amount) {
    let token_contract = await getContract({ key: this.token });
    let staking_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(staking_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
        })
    );
    batch.add(
      staking_contract.methods.deposit(amount).send.request({
        gas: window.config.default_gas_amount,
        from: await getCoinbase(),
      })
    );
    return batch.execute();
  }
}

class STAKINGAVAX {
  constructor(ticker = "STAKINGAVAX", token = "TOKENAVAX") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "depositTime",
      "cliffTime",
      "lastClaimedTime",
      "totalEarnedTokens",
      "totalEarnedEth",
      "getPendingDivs",
      "getPendingDivsEth",
      "tokensToBeDisbursedOrBurnt",
      "tokensToBeSwapped",
      "getNumberOfHolders",
      "getDepositorsList",
      "swapAttemptPeriod",
      "lastSwapExecutionTime",
      "contractDeployTime",
      "disburseDuration",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["deposit", "withdraw", "claim", "claimAs"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        let value = 0;

        return await contract.methods[fn_name](...args).send({
          value,
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        });
      };
    });
  }

  async depositTOKEN(amount) {
    let token_contract = await getContract({ key: this.token });
    let staking_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(staking_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    batch.add(
      staking_contract.methods.deposit(amount).send.request({
        gas: window.config.default_gas_amount,
        from: await getCoinbase(),
        gasPrice: window.config.default_gasprice_gwei * 1e9,
      })
    );
    return batch.execute();
  }
}

class STAKINGBSC {
  constructor(ticker = "STAKINGBSC", token = "TOKEN") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "depositTime",
      "cliffTime",
      "lastClaimedTime",
      "totalEarnedTokens",
      "totalEarnedEth",
      "getPendingDivs",
      "getPendingDivsEth",
      "tokensToBeDisbursedOrBurnt",
      "tokensToBeSwapped",
      "getNumberOfHolders",
      "getDepositorsList",
      "swapAttemptPeriod",
      "lastSwapExecutionTime",
      "contractDeployTime",
      "disburseDuration",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["deposit", "withdraw", "claim", "claimAs"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        let value = 0;
        console.log(value);
        let gas = window.config.default_gas_amount;

        return await contract.methods[fn_name](...args).send({
          value,
          gas,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        });
      };
    });
  }

  async depositTOKEN(amount) {
    let token_contract = await getContract({ key: this.token });
    let staking_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(staking_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    batch.add(
      staking_contract.methods.deposit(amount).send.request({
        gas: window.config.default_gas_amount,
        from: await getCoinbase(),
        gasPrice: window.config.default_gasprice_gwei * 1e9,
      })
    );
    return batch.execute();
  }
}

class TOKEN {
  constructor(key = "TOKEN") {
    this.key = key;
    let address = window.config[key.toLowerCase() + "_address"];
    this._address = address;
  }

  async transfer(to, amount) {
    let contract = await getContract({ key: this.key });

    let { latestGasPrice, maxPriorityFeePerGas } = await getMaxFee();
    console.log({ latestGasPrice, maxPriorityFeePerGas });

    let gas = window.config.default_gas_amount;
    try {
      let estimatedGas = await contract.methods["transfer"](
        to,
        amount
      ).estimateGas({ gas });
      if (estimatedGas) {
        gas = Math.min(estimatedGas, gas);
        //console.log('TRANSFER '+gas)
      }
    } catch (e) {
      console.warn(e);
    }
    return await contract.methods
      .transfer(to, amount)
      .send({ gas, from: await getCoinbase() });
  }
  async totalSupply() {
    let contract = await getContract({ key: this.key });
    return await contract.methods.totalSupply().call();
  }
  async approve(spender, amount) {
    let contract = await getContract({ key: this.key });
    let gas = window.config.default_gas_amount;

    let { latestGasPrice, maxPriorityFeePerGas } = await getMaxFee();
    console.log({ latestGasPrice, maxPriorityFeePerGas });

    try {
      let estimatedGas = await contract.methods["approve"](
        spender,
        amount
      ).estimateGas({ gas });
      if (estimatedGas) {
        gas = Math.min(estimatedGas, gas);
        //console.log('estimatedgas'+gas)
      }
    } catch (e) {
      console.warn(e);
    }
    return await contract.methods
      .approve(spender, amount)
      .send({ gas, from: await getCoinbase() });
  }

  async balanceOf(address) {
    let contract = await getContract({ key: this.key });

    return await contract.methods.balanceOf(address).call();
  }
}

class TOKENAVAX {
  constructor(key = "TOKENAVAX") {
    this.key = key;
    let address = window.config[key.toLowerCase() + "_address"];
    this._address = address;
  }

  async transfer(to, amount) {
    let contract = await getContract({ key: this.key });

    return await contract.methods.transfer(to, amount).send({
      gas: window.config.default_gas_amount,
      from: await getCoinbase(),
      gasPrice: window.config.default_gasprice_gwei * 1e9,
    });
  }
  async totalSupply() {
    let contract = await getContract({ key: this.key });
    return await contract.methods.totalSupply().call();
  }
  async approve(spender, amount) {
    let contract = await getContract({ key: this.key });
    let gas = window.config.default_gas_amount;

    return await contract.methods.approve(spender, amount).send({
      gas,
      from: await getCoinbase(),
      gasPrice: window.config.default_gasprice_gwei * 1e9,
    });
  }
  async balanceOf(address) {
    let contract = await getContract({ key: this.key });
    return await contract.methods.balanceOf(address).call();
  }
}

class TOKENBSC {
  constructor(key = "TOKENBSC") {
    this.key = key;
    let address = window.config[key.toLowerCase() + "_address"];
    this._address = address;
  }

  async transfer(to, amount) {
    let contract = await getContract({ key: this.key });

    let gas = window.config.default_gas_amount;
    try {
      let estimatedGas = await contract.methods["transfer"](
        to,
        amount
      ).estimateGas({ gas });
      if (estimatedGas) {
        gas = Math.min(estimatedGas, gas);
        //console.log('TRANSFER '+gas)
      }
    } catch (e) {
      console.warn(e);
    }
    return await contract.methods.transfer(to, amount).send({
      gas,
      from: await getCoinbase(),
      gasPrice: window.config.default_gasprice_gwei * 1e9,
    });
  }
  async totalSupply() {
    let contract = await getContract({ key: this.key });
    return await contract.methods.totalSupply().call();
  }
  async approve(spender, amount) {
    let contract = await getContract({ key: this.key });
    let gas = window.config.default_gas_amount;
    try {
      let estimatedGas = await contract.methods["approve"](
        spender,
        amount
      ).estimateGas({ gas });
      if (estimatedGas) {
        gas = Math.min(estimatedGas, gas);
        //console.log('estimatedgas'+gas)
      }
    } catch (e) {
      console.warn(e);
    }
    return await contract.methods.approve(spender, amount).send({
      gas,
      from: await getCoinbase(),
      gasPrice: window.config.default_gasprice_gwei * 1e9,
    });
  }
  async balanceOf(address) {
    let contract = await getContract({ key: this.key });
    return await contract.methods.balanceOf(address).call();
  }
}

class CONSTANT_STAKING_NEW {
  constructor(ticker = "CONSTANT_STAKING_30", token = "REWARD_TOKEN") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "stakingTime",
      "LOCKUP_TIME",
      "lastClaimedTime",
      "totalEarnedTokens",
      "getPendingDivs",
      "totalReferralFeeEarned",
      "getNumberOfHolders",
      "getStakersList",
      "getTotalPendingDivs",
      "getNumberOfReferredStakers",
      "getReferredStaker",
      "getActiveReferredStaker",
      "contractStartTime",
      "REWARD_INTERVAL",
      "rewardsPendingClaim",
      "getPendingDivs",
      "ADMIN_CAN_CLAIM_AFTER",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["stake", "unstake", "claim", "reInvest", "stakeExternal"].forEach(
      (fn_name) => {
        this[fn_name] = async function (...args) {
          let contract = await getContract({ key: this.ticker });
          let value = 0;
          //console.log(value)
          let gas = window.config.default_gas_amount;
          // try {
          // 	let estimatedGas = await contract.methods[fn_name](...args).estimateGas({ gas })
          // 	if (estimatedGas) {
          // 		gas = Math.min(estimatedGas, gas)
          // 		console.log('estimatedgas'+gas)
          // 	}
          // } catch (e) {
          // 	console.warn(e)
          // }
          return await contract.methods[fn_name](...args).send({
            value,
            gas,
            from: await getCoinbase(),
            gasPrice: window.config.default_gasprice_gwei * 1e9,
          });
        };
      }
    );
  }

  async depositTOKEN(amount, referrer) {
    let token_contract = await getContract({ key: this.token });
    let staking_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(staking_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    batch.add(
      staking_contract.methods.deposit(amount, referrer).send.request({
        gas: window.config.default_gas_amount,
        from: await getCoinbase(),
        gasPrice: window.config.default_gasprice_gwei * 1e9,
      })
    );
    return batch.execute();
  }
}

class CONSTANT_STAKING_OLD {
  constructor(ticker = "CONSTANT_STAKINGOLD_30", token = "REWARD_TOKEN") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "stakingTime",
      "LOCKUP_TIME",
      "lastClaimedTime",
      "totalEarnedTokens",
      "getPendingDivs",
      "totalReferralFeeEarned",
      "getNumberOfHolders",
      "getStakersList",
      "getTotalPendingDivs",
      "getNumberOfReferredStakers",
      "getReferredStaker",
      "getActiveReferredStaker",
      "contractStartTime",
      "REWARD_INTERVAL",
      "ADMIN_CAN_CLAIM_AFTER",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["stake", "unstake", "claim", "reInvest"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        let value = 0;
        // console.log(value)
        console.log(contract);

        let { latestGasPrice, maxPriorityFeePerGas } = await getMaxFee();
        console.log({ latestGasPrice, maxPriorityFeePerGas });

        let gas = window.config.default_gas_amount;
        try {
          let estimatedGas = await contract.methods[fn_name](
            ...args
          ).estimateGas({ gas });
          if (estimatedGas) {
            gas = Math.min(estimatedGas, gas);
            console.log("estimatedgas" + gas);
          }
        } catch (e) {
          console.warn(e);
        }
        return await contract.methods[fn_name](...args).send({
          value,
          gas,
          from: await getCoinbase(),
        });
        // return (await contract.methods[fn_name](...args).send({ value, gas, from: await getCoinbase(), maxFeePerGas: latestGasPrice, maxPriorityFeePerGas: maxPriorityFeePerGas }))
      };
    });
  }

  async depositTOKEN(amount, referrer) {
    let token_contract = await getContract({ key: this.token });
    let staking_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(staking_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
        })
    );
    batch.add(
      staking_contract.methods.deposit(amount, referrer).send.request({
        gas: window.config.default_gas_amount,
        from: await getCoinbase(),
      })
    );
    return batch.execute();
  }
}

class CONSTANT_STAKING {
  constructor(ticker = "CONSTANT_STAKING_30", token = "REWARD_TOKEN") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "stakingTime",
      "LOCKUP_TIME",
      "lastClaimedTime",
      "totalEarnedTokens",
      "getPendingDivs",
      "totalReferralFeeEarned",
      "getNumberOfHolders",
      "getStakersList",
      "getTotalPendingDivs",
      "getNumberOfReferredStakers",
      "getReferredStaker",
      "getActiveReferredStaker",
      "contractStartTime",
      "REWARD_INTERVAL",
      "ADMIN_CAN_CLAIM_AFTER",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["stake", "stakeExternal", "unstake", "claim", "reInvest"].forEach(
      (fn_name) => {
        this[fn_name] = async function (...args) {
          let contract = await getContract({ key: this.ticker });
          let value = 0;
          // console.log(value)

          let { latestGasPrice, maxPriorityFeePerGas } = await getMaxFee();
          console.log({ latestGasPrice, maxPriorityFeePerGas });

          let gas = window.config.default_gas_amount;
          try {
            let estimatedGas = await contract.methods[fn_name](
              ...args
            ).estimateGas({ gas });
            if (estimatedGas) {
              gas = Math.min(estimatedGas, gas);
              console.log("estimatedgas" + gas);
            }
          } catch (e) {
            console.warn(e);
          }
          return await contract.methods[fn_name](...args).send({
            value,
            gas,
            from: await getCoinbase(),
          });
          // return (await contract.methods[fn_name](...args).send({ value, gas, from: await getCoinbase(), maxFeePerGas: latestGasPrice, maxPriorityFeePerGas: maxPriorityFeePerGas }))
        };
      }
    );
  }

  async depositTOKEN(amount, referrer) {
    let token_contract = await getContract({ key: this.token });
    let staking_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(staking_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
        })
    );
    batch.add(
      staking_contract.methods.deposit(amount, referrer).send.request({
        gas: window.config.default_gas_amount,
        from: await getCoinbase(),
      })
    );
    return batch.execute();
  }
}

class CONSTANT_STAKINGAVAX {
  constructor(ticker = "CONSTANT_STAKINGAVAX_30", token = "REWARD_TOKENAVAX") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "stakingTime",
      "LOCKUP_TIME",
      "lastClaimedTime",
      "totalEarnedTokens",
      "getPendingDivs",
      "totalReferralFeeEarned",
      "getNumberOfHolders",
      "getStakersList",
      "getTotalPendingDivs",
      "getNumberOfReferredStakers",
      "getReferredStaker",
      "getActiveReferredStaker",
      "contractStartTime",
      "REWARD_INTERVAL",
      "rewardsPendingClaim",
      "getPendingDivs",
      "ADMIN_CAN_CLAIM_AFTER",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["stake", "unstake", "claim", "reInvest", "stakeExternal"].forEach(
      (fn_name) => {
        this[fn_name] = async function (...args) {
          let contract = await getContract({ key: this.ticker });
          let value = 0;
          console.log(value);
          let gas = window.config.default_gas_amount;
          try {
            let estimatedGas = await contract.methods[fn_name](
              ...args
            ).estimateGas({ gas });
            if (estimatedGas) {
              gas = Math.min(estimatedGas, gas);
              console.log("estimatedgas" + gas);
            }
          } catch (e) {
            console.warn(e);
          }
          return await contract.methods[fn_name](...args).send({
            value,
            gas,
            from: await getCoinbase(),
            gasPrice: window.config.default_gasprice_gwei * 1e9,
          });
        };
      }
    );
  }

  async depositTOKEN(amount, referrer) {
    let token_contract = await getContract({ key: this.token });
    let staking_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(staking_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    batch.add(
      staking_contract.methods.deposit(amount, referrer).send.request({
        gas: window.config.default_gas_amount,
        from: await getCoinbase(),
        gasPrice: window.config.default_gasprice_gwei * 1e9,
      })
    );
    return batch.execute();
  }
}

class CONSTANT_STAKINGBSC_NEW {
  constructor(ticker = "CONSTANT_STAKING_30", token = "REWARD_TOKENBSC") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "stakingTime",
      "LOCKUP_TIME",
      "lastClaimedTime",
      "totalEarnedTokens",
      "getPendingDivs",
      "totalReferralFeeEarned",
      "getNumberOfHolders",
      "getStakersList",
      "getTotalPendingDivs",
      "getNumberOfReferredStakers",
      "getReferredStaker",
      "getActiveReferredStaker",
      "contractStartTime",
      "REWARD_INTERVAL",
      "rewardsPendingClaim",
      "getPendingDivs",
      "ADMIN_CAN_CLAIM_AFTER",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["stake", "unstake", "claim", "reInvest", "stakeExternal"].forEach(
      (fn_name) => {
        this[fn_name] = async function (...args) {
          let contract = await getContract({ key: this.ticker });
          let value = 0;

          let gas = window.config.default_gas_amount;

          return await contract.methods[fn_name](...args).send({
            value,
            gas,
            from: await getCoinbase(),
            gasPrice: window.config.default_gasprice_gwei * 1e9,
          });
        };
      }
    );
  }

  async depositTOKEN(amount, referrer) {
    let token_contract = await getContract({ key: this.token });
    let staking_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(staking_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    batch.add(
      staking_contract.methods.deposit(amount, referrer).send.request({
        gas: window.config.default_gas_amount,
        from: await getCoinbase(),
        gasPrice: window.config.default_gasprice_gwei * 1e9,
      })
    );
    return batch.execute();
  }
}

class CONSTANT_STAKING_NEWAVAX {
  constructor(ticker = "CONSTANT_STAKINGAVAX_30", token = "REWARD_TOKENAVAX") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "stakingTime",
      "LOCKUP_TIME",
      "lastClaimedTime",
      "totalEarnedTokens",
      "getPendingDivs",
      "totalReferralFeeEarned",
      "getNumberOfHolders",
      "getStakersList",
      "getTotalPendingDivs",
      "getNumberOfReferredStakers",
      "getReferredStaker",
      "getActiveReferredStaker",
      "contractStartTime",
      "REWARD_INTERVAL",
      "rewardsPendingClaim",
      "getPendingDivs",
      "ADMIN_CAN_CLAIM_AFTER",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["stake", "unstake", "claim", "reInvest", "stakeExternal"].forEach(
      (fn_name) => {
        this[fn_name] = async function (...args) {
          let contract = await getContract({ key: this.ticker });
          let value = 0;

          let gas = window.config.default_gas_amount;
          return await contract.methods[fn_name](...args).send({
            value,
            gas,
            from: await getCoinbase(),
            gasPrice: window.config.default_gasprice_gwei * 1e9,
          });
        };
      }
    );
  }

  async depositTOKEN(amount, referrer) {
    let token_contract = await getContract({ key: this.token });
    let staking_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(staking_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    batch.add(
      staking_contract.methods.deposit(amount, referrer).send.request({
        gas: window.config.default_gas_amount,
        from: await getCoinbase(),
        gasPrice: window.config.default_gasprice_gwei * 1e9,
      })
    );
    return batch.execute();
  }
}

class BUYBACK_STAKING {
  constructor(ticker = "BUYBACK_STAKING", token = "REWARD_TOKEN") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "stakingTime",
      "LOCKUP_TIME",
      "lastClaimedTime",
      "totalEarnedTokens",
      "getPendingDivs",
      "getNumberOfHolders",
      "getStakersList",
      "getTotalPendingDivs",
      "contractStartTime",
      "REWARD_INTERVAL",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["stake", "unstake", "reInvest", "claim"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        let value = 0;
        console.log(value);
        let gas = window.config.default_gas_amount;

        let { latestGasPrice, maxPriorityFeePerGas } = await getMaxFee();
        console.log({ latestGasPrice, maxPriorityFeePerGas });

        //console.log({latestGasPrice})
        // try {
        // 	let estimatedGas = await contract.methods[fn_name](...args).estimateGas({ gas })
        // 	if (estimatedGas) {
        // 		gas = Math.min(estimatedGas, gas)
        // 		console.log('estimatedgas'+gas)
        // 	}
        // } catch (e) {
        // 	console.warn(e)
        // }
        return await contract.methods[fn_name](...args).send({
          value,
          gas,
          from: await getCoinbase(),
        });
      };
    });
  }
}

class BUYBACK_STAKINGAVAX {
  constructor(ticker = "BUYBACK_STAKINGAVAX", token = "REWARD_TOKEN") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "stakingTime",
      "LOCKUP_TIME",
      "lastClaimedTime",
      "totalEarnedTokens",
      "getPendingDivs",
      "getNumberOfHolders",
      "getStakersList",
      "getTotalPendingDivs",
      "contractStartTime",
      "REWARD_INTERVAL",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["stake", "unstake", "reInvest", "claim"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        let value = 0;
        console.log(value);
        return await contract.methods[fn_name](...args).send({
          value,
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        });
      };
    });
  }
}

class BUYBACK_STAKINGBSC {
  constructor(ticker = "BUYBACK_STAKINGBSC", token = "REWARD_TOKEN") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "owner",
      "depositedTokens",
      "stakingTime",
      "LOCKUP_TIME",
      "lastClaimedTime",
      "totalEarnedTokens",
      "getPendingDivs",
      "getNumberOfHolders",
      "getStakersList",
      "getTotalPendingDivs",
      "contractStartTime",
      "REWARD_INTERVAL",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["stake", "unstake", "reInvest", "claim"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        let value = 0;
        console.log(value);
        let gas = window.config.default_gas_amount;

        return await contract.methods[fn_name](...args).send({
          value,
          gas,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        });
      };
    });
  }
}

class VAULT {
  constructor(vaultAddress, tokenAddress) {
    this._address = vaultAddress;
    this.tokenAddress = tokenAddress;
    [
      "owner",
      "getExchangeRateStored",
      "LOCKUP_DURATION",
      "UNDERLYING_DECIMALS",
      "TRUSTED_CTOKEN_ADDRESS",
      "MIN_ETH_FEE_IN_WEI",
      "FEE_PERCENT_X_100",
      "FEE_PERCENT_TO_BUYBACK_X_100",
      "REWARD_INTERVAL",
      "contractStartTime",
      "getNumberOfHolders",
      "cTokenBalance",
      "depositTokenBalance",
      "totalTokensDepositedByUser",
      "totalTokensWithdrawnByUser",
      "totalEarnedCompoundDivs",
      "totalEarnedEthDivs",
      "totalEarnedTokenDivs",
      "totalEarnedPlatformTokenDivs",
      "depositTime",
      "lastClaimedTime",
      "totalDepositedTokens",
      "totalCTokens",
      "tokenDivsBalance",
      "ethDivsBalance",
      "platformTokenDivsBalance",
      "totalEthDisbursed",
      "totalTokensDisbursed",
      "tokenDivsOwing",
      "ethDivsOwing",
      "getDepositorsList",
      "platformTokenDivsOwing",
      "getEstimatedCompoundDivsOwing",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getVaultContract(vaultAddress);
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["claim", "getExchangeRateCurrent", "deposit", "withdraw"].forEach(
      (fn_name) => {
        this[fn_name] = async function (args, value = 0) {
          let contract = await getVaultContract(vaultAddress);
          return await contract.methods[fn_name](...args).send({
            value,
            from: await getCoinbase(),
          });
        };
      }
    );
  }

  approveToken = async (amount) => {
    let token_contract = await getTokenContract(this.tokenAddress);
    return await token_contract.methods
      .approve(this._address, amount)
      .send({ value, from: await getCoinbase() });
  };

  getTvlUsdAndApyPercent = async (
    UNDERLYING_DECIMALS = 18,
    PLATFORM_TOKEN_DECIMALS = 18
  ) => {
    let ethBalance = await window.ethweb3.eth.getBalance(this._address);
    let underlyingBalance1 = await this.totalDepositedTokens();
    let underlyingBalance2 = await (
      await getTokenContract(this.tokenAddress)
    ).methods
      .balanceOf(this._address)
      .call();
    let platformTokenBalance = await (
      await getTokenContract(window.config.token_dyp_address)
    ).methods
      .balanceOf(this._address)
      .call();

    ethBalance = ethBalance / 1e18;
    underlyingBalance1 = underlyingBalance1 / 10 ** UNDERLYING_DECIMALS;
    underlyingBalance2 = underlyingBalance2 / 10 ** UNDERLYING_DECIMALS;
    let underlyingBalance = underlyingBalance1 + underlyingBalance2;
    platformTokenBalance = platformTokenBalance / 10 ** PLATFORM_TOKEN_DECIMALS;

    let underlyingId = window.config.cg_ids[this.tokenAddress.toLowerCase()];
    let platformTokenId =
      window.config.cg_ids[window.config.token_dyp_address.toLowerCase()];
    let priceIds = `ethereum,${underlyingId},${platformTokenId}`;
    let prices = await getPrices(priceIds);

    let ethUsdValue = ethBalance * prices["ethereum"]["usd"] || 0;
    let underlyingUsdValue =
      underlyingBalance * prices[underlyingId]["usd"] || 0;
    let platformTokenUsdValue =
      platformTokenBalance * prices[platformTokenId]["usd"] || 0;

    let tvlUsd = ethUsdValue + underlyingUsdValue + platformTokenUsdValue || 0;

    // ------- apy percent calculations ----------
    let apyPercent = 0;

    let platformTokenApyPercent = 0;

    let contractStartTime = await this.contractStartTime();
    let now = Math.floor(Date.now() / 1e3);
    let daysSinceDeployment = Math.floor(
      Math.max(1, (now - contractStartTime) / 60 / 60 / 24 || 1)
    );
    let totalEthDisbursed = await this.totalEthDisbursed();
    let totalTokensDisbursed = await this.totalTokensDisbursed();

    totalEthDisbursed = totalEthDisbursed / 1e18;
    totalTokensDisbursed = totalTokensDisbursed / 10 ** UNDERLYING_DECIMALS;

    let usdValueOfEthDisbursed =
      totalEthDisbursed * prices["ethereum"]["usd"] || 0;
    let usdValueOfTokenDisbursed =
      totalTokensDisbursed * prices[underlyingId]["usd"] || 0;
    let usdValueDisbursed =
      usdValueOfEthDisbursed + usdValueOfTokenDisbursed || 0;
    let usdValueDisbursedPerDay = usdValueDisbursed / daysSinceDeployment;

    let usdValueDisbursedPerYear = usdValueDisbursedPerDay * 365;

    let usdValueOfDepositedTokens =
      underlyingBalance1 * prices[underlyingId]["usd"] || 1;

    let feesApyPercent =
      (usdValueDisbursedPerYear / usdValueOfDepositedTokens) * 100;

    let compoundApyPercent = 0;

    let ctokenAddr = await this.TRUSTED_CTOKEN_ADDRESS();

    let compResult = await window.jQuery.ajax({
      url: `https://api.compound.finance/api/v2/ctoken?addresses=${ctokenAddr}&network=${window.config.compound_network}`,
      method: "GET",
      headers: {
        "compound-api-key": window.config.compound_api_key,
      },
    });

    if (!compResult.error) {
      compoundApyPercent =
        (Number(compResult.cToken[0]?.supply_rate?.value) || 0) * 100;
    }

    //console.log({compResult, compoundApyPercent})

    apyPercent =
      platformTokenApyPercent + compoundApyPercent + feesApyPercent || 0;

    // console.log({
    // 	tvlUsd,ethUsdValue,underlyingUsdValue,platformTokenUsdValue,
    // 	underlyingBalance, ethBalance, platformTokenBalance,
    //
    // 	feesApyPercent, platformTokenApyPercent, compoundApyPercent, apyPercent
    // })

    // console.log({
    // 	usdValueDisbursed, usdValueDisbursedPerDay, usdValueDisbursedPerYear,
    // 	usdValueOfDepositedTokens
    // })

    return { tvl_usd: tvlUsd, apy_percent: apyPercent };
  };
}

class VAULT_NEW {
  constructor(vaultAddress, tokenAddress) {
    this._address = vaultAddress;
    this.tokenAddress = tokenAddress;
    [
      "owner",
      "getExchangeRateStored",
      "LOCKUP_DURATION",
      "UNDERLYING_DECIMALS",
      "TRUSTED_CTOKEN_ADDRESS",
      "MIN_ETH_FEE_IN_WEI",
      "FEE_PERCENT_X_100",
      "FEE_PERCENT_TO_BUYBACK_X_100",
      "REWARD_INTERVAL",
      "contractStartTime",
      "getNumberOfHolders",
      "cTokenBalance",
      "depositTokenBalance",
      "totalTokensDepositedByUser",
      "totalTokensWithdrawnByUser",
      "totalEarnedCompoundDivs",
      "totalEarnedEthDivs",
      "totalEarnedTokenDivs",
      "totalEarnedPlatformTokenDivs",
      "depositTime",
      "lastClaimedTime",
      "totalDepositedTokens",
      "totalCTokens",
      "tokenDivsBalance",
      "ethDivsBalance",
      "platformTokenDivsBalance",
      "totalEthDisbursed",
      "totalTokensDisbursed",
      "tokenDivsOwing",
      "ethDivsOwing",
      "getDepositorsList",
      "platformTokenDivsOwing",
      "getEstimatedCompoundDivsOwing",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getVaultContract(vaultAddress);
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["claim", "getExchangeRateCurrent", "deposit", "withdraw"].forEach(
      (fn_name) => {
        this[fn_name] = async function (args, value = 0) {
          let contract = await getVaultContract(vaultAddress);
          return await contract.methods[fn_name](...args).send({
            value,
            from: await getCoinbase(),
          });
        };
      }
    );
  }

  approveToken = async (amount) => {
    let token_contract = await getTokenContract(this.tokenAddress);

    return await token_contract.methods
      .approve(this._address, amount)
      .send({ value, from: await getCoinbase() });
  };

  getTvlUsdAndApyPercent = async (
    UNDERLYING_DECIMALS = 18,
    PLATFORM_TOKEN_DECIMALS = 18
  ) => {
    let ethBalance = await window.infuraWeb3.eth.getBalance(this._address);
    let underlyingBalance1 = await this.totalDepositedTokens();

    let underlyingBalance2 = await (
      await getTokenContract(this.tokenAddress)
    ).methods
      .balanceOf(this._address)
      .call();

    let platformTokenBalance = await (
      await getTokenContract(window.config.reward_token_idyp_address)
    ).methods
      .balanceOf(this._address)
      .call();

    ethBalance = ethBalance / 1e18;
    underlyingBalance1 = underlyingBalance1 / 10 ** UNDERLYING_DECIMALS;
    underlyingBalance2 = underlyingBalance2 / 10 ** UNDERLYING_DECIMALS;
    let underlyingBalance = underlyingBalance1 + underlyingBalance2;
    platformTokenBalance = platformTokenBalance / 10 ** PLATFORM_TOKEN_DECIMALS;

    let underlyingId = window.config.cg_ids[this.tokenAddress.toLowerCase()];

    let platformTokenId =
      window.config.cg_ids[
        window.config.reward_token_idyp_address.toLowerCase()
      ];

    let priceIds = `ethereum,${underlyingId},${platformTokenId}`;

    let prices = await getPrices(priceIds);
    let ethUsdValue = ethBalance * prices["ethereum"]["usd"] || 0;
    let underlyingUsdValue =
      underlyingBalance * prices[underlyingId]["usd"] || 0;
    let platformTokenUsdValue =
      platformTokenBalance * prices[platformTokenId]["usd"] || 0;

    let tvlUsd = ethUsdValue + underlyingUsdValue + platformTokenUsdValue || 0;

    // ------- apy percent calculations ----------
    let apyPercent = 0;

    let platformTokenApyPercent = 0;

    let contractStartTime = await this.contractStartTime();
    let now = Math.floor(Date.now() / 1e3);
    let daysSinceDeployment = Math.floor(
      Math.max(1, (now - contractStartTime) / 60 / 60 / 24 || 1)
    );
    let totalEthDisbursed = await this.totalEthDisbursed();
    let totalTokensDisbursed = await this.totalTokensDisbursed();

    totalEthDisbursed = totalEthDisbursed / 1e18;
    totalTokensDisbursed = totalTokensDisbursed / 10 ** UNDERLYING_DECIMALS;

    let usdValueOfEthDisbursed =
      totalEthDisbursed * prices["ethereum"]["usd"] || 0;
    let usdValueOfTokenDisbursed =
      totalTokensDisbursed * prices[underlyingId]["usd"] || 0;
    let usdValueDisbursed =
      usdValueOfEthDisbursed + usdValueOfTokenDisbursed || 0;
    let usdValueDisbursedPerDay = usdValueDisbursed / daysSinceDeployment;

    let usdValueDisbursedPerYear = usdValueDisbursedPerDay * 365;

    let usdValueOfDepositedTokens =
      underlyingBalance1 * prices[underlyingId]["usd"] || 1;

    let feesApyPercent =
      (usdValueDisbursedPerYear / usdValueOfDepositedTokens) * 100;

    let compoundApyPercent = 0;

    let ctokenAddr = await this.TRUSTED_CTOKEN_ADDRESS();

    let compResult = await window.jQuery.ajax({
      url: `https://api.compound.finance/api/v2/ctoken?addresses=${ctokenAddr}&network=${window.config.compound_network}`,
      method: "GET",
      headers: {
        "compound-api-key": window.config.compound_api_key,
      },
    });

    if (!compResult.error) {
      compoundApyPercent =
        (Number(compResult.cToken[0]?.supply_rate?.value) || 0) * 100;
    }

    //console.log({compResult, compoundApyPercent})

    apyPercent =
      platformTokenApyPercent + compoundApyPercent + feesApyPercent || 0;

    // console.log({
    // 	tvlUsd,ethUsdValue,underlyingUsdValue,platformTokenUsdValue,
    // 	underlyingBalance, ethBalance, platformTokenBalance,
    //
    // 	feesApyPercent, platformTokenApyPercent, compoundApyPercent, apyPercent
    // })

    // console.log({
    // 	usdValueDisbursed, usdValueDisbursedPerDay, usdValueDisbursedPerYear,
    // 	usdValueOfDepositedTokens
    // })

    return { tvl_usd: tvlUsd, apy_percent: apyPercent };
  };
}

// ALL THE ADDRESSES IN CONFIG MUST BE LOWERCASE
window.config = {
  cg_ids: {
    // lowercase contract address => coingecko id
    "0x6b175474e89094c44da98b954eedeac495271d0f": "dai",
    "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17": "defi-yield-protocol",
    "0xdac17f958d2ee523a2206206994597c13d831ec7": "tether",
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "weth",
    "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": "bitcoin",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "dai",
    "0xbd100d061e120b2c67a24453cf6368e63f1be056": "idefiyieldprotocol",
  },
  admin_address: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
  vote_duration_in_seconds: 259200, // 5 minutes for test
  weth_address: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", // LOWERCASE! avax
  weth2_address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // ethereum

  farmweth_address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //farm weth

  token_weth_address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //vault weth

  wethavax_address: "0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15",
  wethbsc_address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",

  // WBNB !! weth_address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // LOWERCASE!

  infura_endpoint:
    "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e",
  bsc_endpoint: "https://bsc-dataseed.binance.org/",
  avax_endpoint: "https://api.avax.network/ext/bc/C/rpc",

  BUSD_address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
  USDCe_address: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
  USDC_address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  platform_token_address: "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17",
  locker_address: "0x4c695f6198cd4e56efcbf750d0b8961d28885f57",
  lockereth_address: "0x0c5d9AA95329517918AA7b82BfDa25d60446E1ac",

  //DYP-ETH 3 days
  token_address: "0xBa7872534a6C9097d805d8BEE97e030f4e372e54",
  staking_address: "0xa7d6F5fa9b0be0e98b3b40E6aC884e53F2F9460e",

  //DYP-ETH 30 days
  token_dyp30_address: "0xBa7872534a6C9097d805d8BEE97e030f4e372e54",
  staking_dyp30_address: "0x0b0A544AE6131801522E3aC1FBAc6D311094c94c",

  //DYP-ETH 60 days
  token_dyp60_address: "0xBa7872534a6C9097d805d8BEE97e030f4e372e54",
  staking_dyp60_address: "0x16cAaD63BDFC3Ec4A2850336B28efE17e802b896",

  //DYP-ETH 60 days
  token_dyp90_address: "0xBa7872534a6C9097d805d8BEE97e030f4e372e54",
  staking_dyp90_address: "0x512FF8739d39e55d75d80046921E7dE20c3e9BFf",

  //DYP-WBTC 3 days
  token_wbtc3_address: "0x44B77e9cE8A20160290FcBAA44196744F354C1b7",
  staking_wbtc3_address: "0xeF71DE5Cb40f7985FEb92AA49D8e3E84063Af3BB",

  //DYP-WBTC 30 days
  token_wbtc30_address: "0x44B77e9cE8A20160290FcBAA44196744F354C1b7",
  staking_wbtc30_address: "0x8B0e324EEdE360CaB670a6AD12940736d74f701e",

  //DYP-WBTC 60 days
  token_wbtc60_address: "0x44B77e9cE8A20160290FcBAA44196744F354C1b7",
  staking_wbtc60_address: "0x78e2dA2eda6dF49BaE46E3B51528BAF5c106e654",

  //DYP-WBTC 90 days
  token_wbtc90_address: "0x44B77e9cE8A20160290FcBAA44196744F354C1b7",
  staking_wbtc90_address: "0x350F3fE979bfad4766298713c83b387C2D2D7a7a",

  //DYP-USDC 3 days
  token_usdc3_address: "0xabD9C284116B2e757E3D4f6E36C5050AEaD24e0c",
  staking_usdc3_address: "0x2b5D7a865A3888836d15d69dCCBad682663DCDbb",

  //DYP-USDC 30 days
  token_usdc30_address: "0xabD9C284116B2e757E3D4f6E36C5050AEaD24e0c",
  staking_usdc30_address: "0xa52250f98293c17C894d58cf4f78c925dC8955d0",

  //DYP-USDC 60 days
  token_usdc60_address: "0xabD9C284116B2e757E3D4f6E36C5050AEaD24e0c",
  staking_usdc60_address: "0x924BECC8F4059987E4bc4B741B7C354FF52c25e4",

  //DYP-USDC 90 days
  token_usdc90_address: "0xabD9C284116B2e757E3D4f6E36C5050AEaD24e0c",
  staking_usdc90_address: "0xbE528593781988974D83C2655CBA4c45FC75c033",

  //DYP-USDT 3 days
  token_usdt3_address: "0x76911E11FddB742D75b83C9e1F611F48f19234E4",
  staking_usdt3_address: "0x4a76Fc15D3fbf3855127eC5DA8AAf02DE7ca06b3",

  //DYP-USDT 30 days
  token_usdt30_address: "0x76911E11FddB742D75b83C9e1F611F48f19234E4",
  staking_usdt30_address: "0xF4abc60a08B546fA879508F4261eb4400B55099D",

  //DYP-USDT 60 days
  token_usdt60_address: "0x76911E11FddB742D75b83C9e1F611F48f19234E4",
  staking_usdt60_address: "0x13F421Aa823f7D90730812a33F8Cac8656E47dfa",

  //DYP-USDT 90 days
  token_usdt90_address: "0x76911E11FddB742D75b83C9e1F611F48f19234E4",
  staking_usdt90_address: "0x86690BbE7a9683A8bAd4812C2e816fd17bC9715C",

  token_dai_address: "0xa964d4ff6C14822Fc64CE4eC5Dc707D869DaC0bA",
  staking_dai_address: "0x850942B57DD500b73bBdB9F713789Ca72D10D235",

  reward_token_address: "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17", //REWARD TOKEN
  reward_tokenavax_address: "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17", //REWARD TOKEN

  weth_address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  etherscan_baseURL: "https://etherscan.io",
  snowtrace_baseURL: "https://snowtrace.io",
  bscscan_baseURL: "https://bscscan.com/",

  max_proposals_per_call: 4,
  // default_gasprice_gwei: 60,
  default_gas_amount: 1200000,
  token_decimals: 18,
  lp_amplify_factor: 1,
  whitelist_nft: "WorldOfDypians Whitelist",
  beta_test: "WorldOfDypians Beta Tester Application",

  constant_stakingold_30_address: "0x7Fc2174670d672AD7f666aF0704C2D961EF32c73",
  constant_stakingold_60_address: "0x036e336eA3ac2E255124CF775C4FDab94b2C42e4",
  constant_stakingold_90_address: "0x0A32749D95217b7Ee50127E24711c97849b70C6a",
  constant_stakingold_120_address: "0x82df1450eFD6b504EE069F5e4548F2D5Cb229880",

  // Constant staking iDYP
  constant_stakingold_130_address: "0x9ea966b4023049bff858bb5e698ecff24ea54c4a",
  constant_stakingold_140_address: "0x3fab09acaeddaf579d7a72c24ef3e9eb1d2975c4",
  constant_stakingold_150_address: "0x50014432772b4123d04181727c6edeab34f5f988",
  constant_stakingold_160_address: "0xd4be7a106ed193bee39d6389a481ec76027b2660",

  /*buyback*/
  buyback_staking_address: "0xe5262f38bf13410a79149cb40429f8dc5e830542",
  slippage_tolerance_percent: 3, // 3% slippage tolerance
  tx_max_wait_seconds: 20 * 60, // 20 mins - deposit and withdraw tx will fail (swap will fail) after this duration of being pending
  uniswap_router_address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",

  //constant staking New
  constant_stakingnew_new1_address:
    "0xa4da28B8e42680916b557459D338aF6e2D8d458f",
  constant_stakingnew_new2_address:
    "0x8A30Be7B2780b503ff27dBeaCdecC4Fe2587Af5d",

  //Buyback new
  buyback_staking1_1_address: "0xdCBB5B2148f0cf1Abd7757Ba04A5821fEaD80587",
  buyback_staking1_2_address: "0xDC65C4277d626d6A29C9Dc42Eb396d354fa5E85b",
  constant_stakingnew_new3_address:
    "0x471beCc72AD487249efE521bf9b6744b882830DF",
  constant_stakingnew_new4_address:
    "0x7b7132E7BF4e754855191a978F3979e1E3c8617b",

  //Buyback new avax
  buyback_stakingavax1_1_address: "0xC905D5DD9A4f26eD059F76929D11476B2844A7c3",
  buyback_stakingavax1_2_address: "0x267434f01ac323C6A5BCf41Fa111701eE0165a37",

  //constant staking for Buyback New avax
  constant_stakingnew_newavax3_address:
    "0xe6B307CD185f2A541a661eA312E3e7939Ea9d218",
  constant_stakingnew_newavax4_address:
    "0x934819D227B7095595eC9cA6604eF2Dd0C3a9EA2",

  //Farming new
  token_new_address: "0x7463286a379f6f128058bb92b355e3d6e8bdb219",
  token_newavax_address: "0x66eecc97203704d9e2db4a431cb0e9ce92539d5a",
  token_newbsc_address: "0x1bC61d08A300892e784eD37b2d0E63C85D1d57fb",

  constant_stakingnew_newavax5_address:
    "0x1cA9Fc98f3b997E08bC04691414e33B1835aa7e5",
  constant_stakingnew_newavax9_address:
    "0x9FF3DC1f7042bAF46651029C7284Fc3B93e21a4D",
  constant_stakingnew_newavax8_address:
    "0x4c16093Da4BA7a604A1Fe8CD5d387cC904B3D407",
  constant_stakingnew_newavax7_address:
    "0xC2ba0abFc89A5A258e6440D82BB95A5e2B541581",
  constant_stakingnew_newavax6_address:
    "0x6a258Bd17456e057A7c6102177EC2f9d64D5F9e4",

  constant_stakingdaiavax_address: "0x16429e51A64B7f88D4C018fbf66266A693df64b3",
  constant_stakingdaieth_address: "0x44bEd8ea3296bda44870d0Da98575520De1735d4",

  constant_stakingdaibsc_address: "0xa9efab22cCbfeAbB6dc4583d81421e76342faf8b",

  farming_new_1_address: "0xa68BBe793ad52d0E62bBf34A67F02235bA69E737",
  farming_newavax_1_address: "0x035d65babF595758D7A439D5870BAdc44218D028",
  farming_newavax_2_address: "0x6c325DfEA0d18387D423C869E328Ef005cBA024F",
  farming_newavax_3_address: "0x85C4f0CEA0994dE365dC47ba22dD0FD9899F93Ab",
  farming_newavax_4_address: "0x6f5dC6777b2B4667Bf183D093111867239518af5",
  farming_newavax_5_address: "0x10E105676CAC55b74cb6500a8Fb5d2f84804393D",

  constant_stakingnew_new5_address:
    "0x0b92E7f074e7Ade0181A29647ea8474522e6A7C2",

  //Farming New
  farming_new_2_address: "0xCFd970494a0b3C52a81dcE1EcBFF2245e6b0B0E7",
  constant_stakingnew_new6_address:
    "0xff32a38016422F51e8C0aF5D333472392822FeEf",

  //Farming New
  farming_new_3_address: "0x49D02CF81Cc352517350F25E200365360426aF94",
  constant_stakingnew_new7_address:
    "0x62AAE8C0c50038236d075AC595Ae0BE4F201bBdd",

  //Farming New
  farming_new_4_address: "0xf51965c570419F2576ec9AeAD6A3C5F674424A99",
  constant_stakingnew_new8_address:
    "0xb67F464b558e3055C2B6F017546Ed53b2e6333d7",

  //Farming New
  farming_new_5_address: "0x997A7254E5567d0A70329DEFCc1E4d29d71Ba224",
  constant_stakingnew_new9_address:
    "0x1aB008CbfC99d0CA7e3FD8987ce1ebf832506F53",

  reward_token_idyp_address: "0xbd100d061e120b2c67a24453cf6368e63f1be056",

  USDC_address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

  claim_as_eth_address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  claim_as_ethavax_address: "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",

  claim_as_usdt_address: "0xdac17f958d2ee523a2206206994597c13d831ec7",

  constant_staking_200_address: "0x45152e167cc2ebd4011138f646dc80eec9c8582e",
  constant_staking_300_address: "0x45152e167cc2ebd4011138f646dc80eec9c8582e",

  reward_token_dyps_address: "0xd4f11Bf85D751F426EF59b705E42b3da3357250f",
  reward_token_dypsavax_address: "0x4689545A1389E7778Fd4e66F854C91Bf8aBacBA9",
  reward_token_dypsbsc_address: "0x4B2dfB131B0AE1D6d5D0c9a3a09c028a5cD10554",

  //Constant Staking DYP -> DAI
  reward_token_daieth_address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  reward_token_dai_address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  reward_token_daiavax_address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
  reward_token_daibsc_address: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",

  token_wbtc_address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  token_usdt_address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  token_usdc_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  token_dai_address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",

  vault_weth_address: "0x28eabA060E5EF0d41eeB20d41aafaE8f685739d9",
  vault_wbtc_address: "0x2F2cff66fEB7320FC9Adf91b7B74bFb5a80C7C35",
  vault_usdt_address: "0xA987aEE0189Af45d5FA95a9FBBCB4374228f375E",
  vault_usdc_address: "0x251B9ee6cEd97565A821C5608014a107ddc9C98F",
  vault_dai_address: "0x54F30bFfeb925F47225e148f0bAe17a452d6b8c0",

  subscription_address: "0xba4b2bab726f645677681ddc74b29543d10b28af",
  subscriptioneth_address: "0x943023d8e0f591C08a0E2B922452a7Dc37173C9b",
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
  MAX_LOCKS_TO_LOAD_PER_CALL: 10,
  pangolin_router_address: "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106",
  pancakeswap_router_address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  uniswap_router_address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",

  compound_api_key: null,
  compound_network: "mainnet",

  api_baseurl: "https://app-tools-avax.dyp.finance",
  apieth_baseurl: "https://app-tools.dyp.finance",
  subgraph_url:
    "https://graphiql-avax.dyp.finance/subgraphs/name/dasconnor/pangolin-dex",
  subgrapheth_url:
    "https://graphiql.dyp.finance/subgraphs/name/davekaj/uniswap",
  subgraphGraphEth:
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  subgraphGraphAvax:
    "https://api.thegraph.com/subgraphs/name/dasconnor/pangolin-dex",
  indexing_status_endpoint: "https://graph-node-avax.dyp.finance/graphql",
  indexing_status_endpointeth: "https://graph-node.dyp.finance/graphql",

  farm_api: "https://farm-info.dyp.finance",

  metamask_message: "I want to login, let me in!",
  metamask_message2: "I want to login to DYP TOOLS, let me in!",
  metamask_admin_account: "0x471ad9812b2537ffc66eba4d474cc55c32dec4f8",
  constant_stakingidypavax_3_address:
    "0xF035ec2562fbc4963e8c1c63f5c473D9696c59E3",
  constant_stakingavax_30_address: "0xF035ec2562fbc4963e8c1c63f5c473D9696c59E3",

  constant_stakingidypavax_4_address:
    "0xb1875eeBbcF4456188968f439896053809698a8B",

  constant_stakingnew_newavax1_address:
    "0x1A4fd0E9046aeD92B6344F17B0a53969F4d5309B",
  constant_stakingnew_newavax2_address:
    "0x5566B51a1B7D5E6CAC57a68182C63Cb615cAf3f9",

  //Constant Staking iDYP AVAX
  constant_stakingidypavax_1_address:
    "0x8f28110325a727f70b64bffebf2b9dc94b932452",
  constant_stakingidypavax_2_address:
    "0x5536e02336771cfa0317d4b6a042f3c38749535e",
  constant_stakingidypavax_5_address:
    "0xaf411bf994da1435a3150b874395b86376c5f2d5",
  constant_stakingidypavax_6_address:
    "0xd13bdc0c9a9931cf959739631b1290b6bee0c018",

  //Constant Staking iDYP bsc
  constant_stakingidyp_1_address: "0x58366902082b90fca01be07d929478bd48acfb19",
  constant_stakingidyp_2_address: "0x160ff3c4a6e9aa8e4271aa71226cc811bfef7ed9",
  constant_stakingidyp_5_address: "0x7e766f7005c7a9e74123b156697b582eecb8d2d7",
  constant_stakingidyp_6_address: "0x4c04e53f9aaa17fc2c914694b4aae57a9d1be445",

  submission_form_link: "https://forms.gle/SFX1DyUh8TcNeysz6",

  // lowercase base tokens on uniswap
  // order matters!
  base_tokens: [
    "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", // wavax
    "0xd586e7f844cea2f87f50152665bcbc2c279d8d70", //dai.e
    "0xc7198437980c041c805a1edcba50c1ce5db95118", //usdt.e
  ],

  baseEth_tokens: [
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // usdc
    "0xdac17f958d2ee523a2206206994597c13d831ec7", // usdt
    "0x6b175474e89094c44da98b954eedeac495271d0f", // dai
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // weth
    "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", // wbtc
  ],

  // add supported subscription tokens here, lowercase
  // THESE TOKENS MUST HAVE BEEN ALREADY ADDED TO SMART CONTRACT!
  subscription_tokens: {
    "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7": {
      symbol: "WAVAX",
      decimals: 18,
    },
    "0x60781c2586d68229fde47564546784ab3faca982": {
      symbol: "PNG",
      decimals: 18,
    },
    "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab": {
      symbol: "WETH.e",
      decimals: 18,
    },
    "0xc7198437980c041c805a1edcba50c1ce5db95118": {
      symbol: "USDT.e",
      decimals: 6,
    },
    "0xd586e7f844cea2f87f50152665bcbc2c279d8d70": {
      symbol: "DAI.e",
      decimals: 18,
    },
  },

  // add supported subscription tokens here, lowercase
  // THESE TOKENS MUST HAVE BEEN ALREADY ADDED TO SMART CONTRACT!
  subscriptioneth_tokens: {
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
      symbol: "WETH",
      decimals: 18,
    },
    "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": {
      symbol: "WBTC",
      decimals: 8,
    },
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
      symbol: "USDC",
      decimals: 6,
    },
    "0xdac17f958d2ee523a2206206994597c13d831ec7": {
      symbol: "USDT",
      decimals: 6,
    },
    "0x6b175474e89094c44da98b954eedeac495271d0f": {
      symbol: "DAI",
      decimals: 18,
    },
  },

  automated_trust_scores: {
    perfect_scoring: {
      // minimum numbers for 100% scores
      tx_no: 2000,
      lp_holder_no: 250,
      daily_volume_usd: 10000,
      liquidity_usd: 50000,
    },
    weights: {
      // sum of all weights must be 1, 1 = 100%
      tx_no: 0.1,
      lp_holder_no: 0.2,
      daily_volume_usd: 0.2,
      liquidity_usd: 0.2,
      information: 0.3,
    },
    display_order: [
      "information",
      "liquidity_usd",
      "daily_volume_usd",
      "lp_holder_no",
      "tx_no",
    ],
    display_names: {
      information: "Information",
      liquidity_usd: "Liquidity",
      daily_volume_usd: "Daily Volume",
      lp_holder_no: "LP Holders",
      tx_no: "Transactions",
    },
  },

  //governance eth
  new_governance_address: "0x1766d076ae227443B98AA836Bd43895ADd6B0AB4",

  //governance avax
  new_governanceavax_address: "0x4d3deb73df067d6466facad196b22411422909ab",
  new_governancebsc_address: "0x2cf8b55a6a492c2f8e750ad1fa4e4a858044deea",

  //bridge eth-avax

  token_dyp_eth_address: "0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17",
  token_dyp_bsc_address: "0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17",

  bridge_eth_address: "0xd374c29d98e9A33FA4D08fca1d72d7319EA4Bc58",
  bridge_bsc_address: "0x229eD0B61bEA41710A79A3634E06B1A619a0EBCb",

  //bridge eth-bsc

  token_dyp_bsceth_address: "0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17",
  token_dyp_bscbsc_address: "0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17",

  bridge_bsceth_address: "0x81A0d2f173590A23636DB6a475BC7E32aAae946C",
  bridge_bscbsc_address: "0x229eD0B61bEA41710A79A3634E06B1A619a0EBCb",

  //bridge eth-avax idyp
  token_idyp_eth_address: "0xBD100d061E120b2c67A24453CF6368E63f1Be056",
  token_idyp_bsc_address: "0xBD100d061E120b2c67A24453CF6368E63f1Be056",

  bridge_idypeth_address: "0x9D8a633cee6438004099478AF3120Aa7e506b774",
  bridge_idypbsc_address: "0x6e08239150D8E76920Cf5ffaa2293e89bE345CA9",

  //bridge eth-bsc idyp

  token_idyp_bsceth_address: "0xBD100d061E120b2c67A24453CF6368E63f1Be056",
  token_idyp_bscbsc_address: "0xBD100d061E120b2c67A24453CF6368E63f1Be056",

  bridge_idypbsceth_address: "0x70C89Bd30d8543a594f83C57ed92240a1B4925Fe",
  bridge_idypbscbsc_address: "0x66f8449b73C42Bb0820a8132348bfE2820Cfd6B8",

  chain_ids: {
    ETH: 1, // 4 = rinkeby, 1 = main, 42 = kovan, 43114 = AVAX
    AVAX: 43114, // 43114 = AVAX
    BSC: 56, // 97 = testnet, 56 = main
    1: "ETH",
    43114: "AVAX",
    56: "BSC",
  },

  SIGNATURE_API_URLAVAX: "https://bridge-avax.dyp.finance",
  SIGNATURE_API_URLBSC: "https://bridge-api.dyp.finance",

  SIGNATURE_API_URLAVAXiDYP: "https://ibridge-avax.dyp.finance",
  SIGNATURE_API_URLBSCiDYP: "https://ibridge-api.dyp.finance",

  /* MINT NFT Rinkeby */
  // nft_address: "0x3B7E527eFd16cC9E8bEF0F4d3BCD7cCDbb7d6EC4",
  // nftstaking_address: "0x971D729274fD5856E23A0DEB8C7ECB52A5ac6F8f",
  // nftstaking_address50: "0x971D729274fD5856E23A0DEB8C7ECB52A5ac6F8f",

  /* MINT NFT */
  nft_address: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
  nftstaking_address: "0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A",
  nftstaking_address50: "0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A",

  /* MINT LANDNFT */
  landnft_address: "0xcd60d912655281908ee557ce1add61e983385a03",
  landnftstake_address: "0x6821710b0d6e9e10acfd8433ad023f874ed782f1",

  /* MINT LANDNFT GOERLI */
  // landnft_address: "0x1a6101ec1364cc1bb671a2be2a6c2fd0764b3dfc",
  // landnftstake_address: "0x428d702b625dc2a917d087679e5cf99bddbcdd13",

  //buyback bsc
  buyback_stakingbsc1_1_address: "0x94b1a7b57c441890b7a0f64291b39ad6f7e14804",
  buyback_stakingbsc1_2_address: "0x4ef782e66244a0cf002016aa1db3019448c670ae",

  constant_stakingnewbsc_new3_address:
    "0x9af074cE714FE1Eb32448052a38D274E93C5dc28",
  constant_stakingnewbsc_new4_address:
    "0xDBfb96e2899d52B469C1a1C35eD71fBBa228d2cC",

  reward_tokenbsc_address2: "0xbd100d061e120b2c67a24453cf6368e63f1be056",

  //farming bsc

  farming_newbsc_1_address: "0x537dc4fee298ea79a7f65676735415f1e2882f92",
  constant_stakingnewbsc_new5_address:
    "0xc794cdb8d6ac5eb42d5aba9c1e641ae17c239c8c",
  farming_newbsc_2_address: "0x219717bf0bc33b2764a6c1a772f75305458bda3d",
  constant_stakingnewbsc_new6_address:
    "0x23609b1f5274160564e4afc5eb9329a8bf81c744",

  farming_newbsc_3_address: "0xd1151a2434931f34bcfa6c27639b67c1a23d93af",
  constant_stakingnewbsc_new7_address:
    "0x264922696b9972687522b6e98bf78a0430e2163c",

  farming_newbsc_4_address: "0xed869ba773c3f1a1adcc87930ca36ee2dc73435d",
  constant_stakingnewbsc_new8_address:
    "0x9df0a645beb6f7adfadc56f3689e79405337efe2",

  farming_newbsc_5_address: "0x415b1624710296717fa96cad84f53454e8f02d18",
  constant_stakingnewbsc_new9_address:
    "0xbd574278febad04b7a0694c37def4f2ecfa9354a",

  //staking bsc

  constant_stakingbsc_new10_address:
    "0xef9e50A19358CCC8816d9BC2c2355aea596efd06",
  constant_stakingbsc_new11_address:
    "0xfc4493e85fd5424456f22135db6864dd4e4ed662",

  constant_stakingbsc_new12_address:
    "0xf13aDbEb27ea9d9469D95e925e56a1CF79c06E90",
  constant_stakingbsc_new13_address:
    "0xaF411BF994dA1435A3150B874395B86376C5f2d5",
};

window.infuraWeb3 = new Web3(window.config.infura_endpoint);
window.bscWeb3 = new Web3(window.config.bsc_endpoint);
window.avaxWeb3 = new Web3(window.config.avax_endpoint);

window.REWARD_TOKEN_ABI = window.TOKEN_ABI;
window.REWARD_TOKENAVAX_ABI = window.TOKENAVAX_ABI;
window.reward_token = new TOKEN("REWARD_TOKEN");
window.reward_tokenavax = new TOKENAVAX("REWARD_TOKENAVAX");
window.constant_stakingavax_30 = new TOKENAVAX("REWARD_TOKENAVAX");

window.farming_newavax_1 = new STAKINGAVAX("FARMING_NEWAVAX_1");
window.FARMING_NEWAVAX_1_ABI = window.FARMING_NEW_ABI;

window.farming_newavax_2 = new STAKINGAVAX("FARMING_NEWAVAX_2");
window.FARMING_NEWAVAX_2_ABI = window.FARMING_NEW_ABI;

window.farming_newavax_3 = new STAKINGAVAX("FARMING_NEWAVAX_3");
window.FARMING_NEWAVAX_3_ABI = window.FARMING_NEW_ABI;

window.farming_newavax_4 = new STAKINGAVAX("FARMING_NEWAVAX_4");
window.FARMING_NEWAVAX_4_ABI = window.FARMING_NEW_ABI;

window.farming_newavax_5 = new STAKINGAVAX("FARMING_NEWAVAX_5");
window.FARMING_NEWAVAX_5_ABI = window.FARMING_NEW_ABI;

window.FARMWETH_ABI = window.TOKEN_ABI;
window.TOKEN_NEW_ABI = window.TOKEN_ABI;
window.TOKEN_NEWAVAX_ABI = window.TOKEN_ABI;
window.TOKEN_NEWBSC_ABI = window.TOKENBSC_ABI;

window.farmweth = new TOKEN("FARMWETH");

//DYP-ETH
window.token = new TOKEN();
window.staking = new STAKING();

window.wethavax = new TOKENAVAX("WETHAVAX");
window.WETHAVAX_ABI = window.TOKEN_ABI;

window.wethbsc = new TOKENBSC("WETHBSC");
window.WETHBSC_ABI = window.TOKENBSC_ABI;

window.token_dyp_30 = new TOKEN("TOKEN_DYP30");
window.staking_dyp_30 = new STAKING("STAKING_DYP30", "TOKEN_DYP30");

window.token_dyp_60 = new TOKEN("TOKEN_DYP30");
window.staking_dyp_60 = new STAKING("STAKING_DYP60", "TOKEN_DYP60");

window.token_dyp_90 = new TOKEN("TOKEN_DYP90");
window.staking_dyp_90 = new STAKING("STAKING_DYP90", "TOKEN_DYP90");

//DYP-WBTC
window.token_wbtc_3 = new TOKEN("TOKEN_WBTC3");
window.staking_wbtc_3 = new STAKING("STAKING_WBTC3", "TOKEN_WBTC3");

window.token_wbtc_30 = new TOKEN("TOKEN_WBTC30");
window.staking_wbtc_30 = new STAKING("STAKING_WBTC30", "TOKEN_WBTC30");

window.token_wbtc_60 = new TOKEN("TOKEN_WBTC60");
window.staking_wbtc_60 = new STAKING("STAKING_WBTC60", "TOKEN_WBTC60");

window.token_wbtc_90 = new TOKEN("TOKEN_WBTC90");
window.staking_wbtc_90 = new STAKING("STAKING_WBTC90", "TOKEN_WBTC90");

window.farming_newbsc_1 = new STAKINGBSC("FARMING_NEWBSC_1");
window.farming_newbsc_2 = new STAKINGBSC("FARMING_NEWBSC_2");
window.farming_newbsc_3 = new STAKINGBSC("FARMING_NEWBSC_3");
window.farming_newbsc_4 = new STAKINGBSC("FARMING_NEWBSC_4");
window.farming_newbsc_5 = new STAKINGBSC("FARMING_NEWBSC_5");

window.FARMING_NEWBSC_1_ABI = window.FARMING_NEWBSC_ABI;
window.FARMING_NEWBSC_2_ABI = window.FARMING_NEWBSC_ABI;
window.FARMING_NEWBSC_3_ABI = window.FARMING_NEWBSC_ABI;
window.FARMING_NEWBSC_4_ABI = window.FARMING_NEWBSC_ABI;
window.FARMING_NEWBSC_5_ABI = window.FARMING_NEWBSC_ABI;

window.constant_stakingnewbsc_new5 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGNEWBSC_NEW5"
);

window.constant_stakingnewbsc_new6 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGNEWBSC_NEW6"
);

window.constant_stakingnewbsc_new7 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGNEWBSC_NEW7"
);

window.constant_stakingnewbsc_new8 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGNEWBSC_NEW8"
);

window.constant_stakingnewbsc_new9 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGNEWBSC_NEW9"
);

window.CONSTANT_STAKINGNEWBSC_NEW5_ABI = window.CONSTANT_STAKINGBSC_NEW_ABI;
window.CONSTANT_STAKINGNEWBSC_NEW6_ABI = window.CONSTANT_STAKINGBSC_NEW_ABI;
window.CONSTANT_STAKINGNEWBSC_NEW7_ABI = window.CONSTANT_STAKINGBSC_NEW_ABI;
window.CONSTANT_STAKINGNEWBSC_NEW8_ABI = window.CONSTANT_STAKINGBSC_NEW_ABI;
window.CONSTANT_STAKINGNEWBSC_NEW9_ABI = window.CONSTANT_STAKINGBSC_NEW_ABI;

//staking bsc

window.constant_stakingbsc_new10 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGBSC_NEW10"
);
window.constant_stakingbsc_new11 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGBSC_NEW11"
);

window.constant_stakingbsc_new12 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGBSC_NEW12"
);
window.constant_stakingbsc_new13 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGBSC_NEW13"
);

window.CONSTANT_STAKINGBSC_NEW10_ABI = window.CONSTANT_STAKING_OLD_ABI;
window.CONSTANT_STAKINGBSC_NEW11_ABI = window.CONSTANT_STAKING_OLD_ABI;
window.CONSTANT_STAKINGBSC_NEW12_ABI = window.CONSTANT_STAKING_OLD_ABI;
window.CONSTANT_STAKINGBSC_NEW13_ABI = window.CONSTANT_STAKING_OLD_ABI;

//DYP-USDC
window.token_usdc_3 = new TOKEN("TOKEN_USDC3");
window.staking_usdc_3 = new STAKING("STAKING_USDC3", "TOKEN_USDC3");

window.token_usdc_30 = new TOKEN("TOKEN_USDC30");
window.staking_usdc_30 = new STAKING("STAKING_USDC30", "TOKEN_USDC30");

window.token_usdc_60 = new TOKEN("TOKEN_USDC60");
window.staking_usdc_60 = new STAKING("STAKING_USDC60", "TOKEN_USDC60");

window.token_usdc_90 = new TOKEN("TOKEN_USDC90");
window.staking_usdc_90 = new STAKING("STAKING_USDC90", "TOKEN_USDC90");

//DYP-USDT
window.token_usdt_3 = new TOKEN("TOKEN_USDT3");
window.staking_usdt_3 = new STAKING("STAKING_USDT3", "TOKEN_USDT3");

window.token_usdt_30 = new TOKEN("TOKEN_USDT30");
window.staking_usdt_30 = new STAKING("STAKING_USDT30", "TOKEN_USDT30");

window.token_usdt_60 = new TOKEN("TOKEN_USDT60");
window.staking_usdt_60 = new STAKING("STAKING_USDT60", "TOKEN_USDT60");

window.token_usdt_90 = new TOKEN("TOKEN_USDT90");
window.staking_usdt_90 = new STAKING("STAKING_USDT90", "TOKEN_USDT90");

window.token_dai = new TOKEN("TOKEN_DAI");
window.staking_dai = new STAKING("STAKING_DAI", "TOKEN_DAI");

// constant staking
window.constant_staking_30 = new CONSTANT_STAKING_OLD("CONSTANT_STAKINGOLD_30");
window.constant_staking_60 = new CONSTANT_STAKING_OLD("CONSTANT_STAKINGOLD_60");
window.constant_staking_90 = new CONSTANT_STAKING_OLD("CONSTANT_STAKINGOLD_90");
window.constant_staking_120 = new CONSTANT_STAKING_OLD(
  "CONSTANT_STAKINGOLD_120"
);

/*buyback*/
window.buyback_staking = new BUYBACK_STAKING("BUYBACK_STAKING");

window.REWARD_TOKEN_IDYP_ABI = window.TOKEN_ABI;
window.reward_token_idyp = new TOKEN("REWARD_TOKEN_IDYP");

window.REWARD_TOKEN_DYPS_ABI = window.TOKEN_ABI;
window.token_dyps = new TOKEN("REWARD_TOKEN_DYPS");
window.token_dypsavax = new TOKENAVAX("REWARD_TOKEN_DYPSAVAX");
window.REWARD_TOKEN_DYPSAVAX_ABI = window.TOKENAVAX_ABI;

window.token_dypsbsc = new TOKENAVAX("REWARD_TOKEN_DYPSBSC");
window.REWARD_TOKEN_DYPSBSC_ABI = window.TOKENBSC_ABI;

//constant staking for Buyback New
window.constant_stakingbsc_new3 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEWBSC_NEW3"
);

window.constant_stakingbsc_new4 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEWBSC_NEW4"
);

window.CONSTANT_STAKINGNEWBSC_NEW3_ABI = window.CONSTANT_STAKINGNEW_ABI;
window.CONSTANT_STAKINGNEWBSC_NEW4_ABI = window.CONSTANT_STAKINGNEW_ABI;

// window.token_dyps = new TOKEN(window.config.reward_token_dyps_address)
//constant staking NEW CONTRACTS
window.constant_staking_newavax1 = new CONSTANT_STAKING_NEWAVAX(
  "CONSTANT_STAKINGNEW_NEWAVAX1"
);
window.constant_staking_newavax2 = new CONSTANT_STAKING_NEWAVAX(
  "CONSTANT_STAKINGNEW_NEWAVAX2"
);
window.constant_stakingdaieth = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGDAIETH"
);

window.constant_stakingdaiavax = new CONSTANT_STAKING_NEWAVAX(
  "CONSTANT_STAKINGDAIAVAX"
);

window.CONSTANT_STAKINGDAIAVAX_ABI = window.CONSTANT_STAKING_IDYP_ABI;
window.CONSTANT_STAKINGDAIETH_ABI = window.CONSTANT_STAKINGDAI_ABI;

window.constant_stakingdaibsc = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGDAIBSC"
);

window.CONSTANT_STAKINGDAIBSC_ABI = window.CONSTANT_STAKING_DAI_ABI;

/* Constant Staking iDYP */
window.constant_stakingidyp_1 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGIDYP_1"
);
window.constant_stakingidyp_2 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGIDYP_2"
);
window.constant_stakingidyp_5 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGIDYP_5"
);
window.constant_stakingidyp_6 = new CONSTANT_STAKINGBSC_NEW(
  "CONSTANT_STAKINGIDYP_6"
);

window.CONSTANT_STAKINGIDYP_1_ABI = window.CONSTANT_STAKING_IDYP_ABI;
window.CONSTANT_STAKINGIDYP_2_ABI = window.CONSTANT_STAKING_IDYP_ABI;
window.CONSTANT_STAKINGIDYP_5_ABI = window.CONSTANT_STAKING_IDYP_ABI;
window.CONSTANT_STAKINGIDYP_6_ABI = window.CONSTANT_STAKING_IDYP_ABI;

window.constant_staking_new1 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEW1"
);
window.constant_staking_new2 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEW2"
);
window.constant_staking_newdai = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEWDAI"
);

window.constant_staking_new10 = new CONSTANT_STAKING_NEWAVAX(
  "CONSTANT_STAKINGIDYPAVAX_3"
);
window.constant_staking_new11 = new CONSTANT_STAKING_NEWAVAX(
  "CONSTANT_STAKINGIDYPAVAX_4"
);

window.CONSTANT_STAKINGIDYPAVAX_3_ABI = window.CONSTANT_STAKING_IDYP_ABI;
window.CONSTANT_STAKINGIDYPAVAX_4_ABI = window.CONSTANT_STAKING_IDYP_ABI;

window.CONSTANT_STAKINGNEW_NEW1_ABI = window.CONSTANT_STAKINGNEW_ABI;
window.CONSTANT_STAKINGNEW_NEW2_ABI = window.CONSTANT_STAKINGNEW_ABI;

window.CONSTANT_STAKINGNEW_NEWAVAX1_ABI = window.CONSTANT_STAKINGNEW_ABI;
window.CONSTANT_STAKINGNEW_NEWAVAX2_ABI = window.CONSTANT_STAKINGNEW_ABI;

//Constant staking DYP -> DAI
window.REWARD_TOKEN_DAI_ABI = window.TOKEN_ABI;
window.reward_token_dai = new TOKEN("REWARD_TOKEN_DAI");

window.reward_token_daiavax = new TOKENAVAX("REWARD_TOKEN_DAIAVAX");
window.REWARD_TOKEN_DAIAVAX_ABI = window.TOKENAVAX_ABI;

window.reward_token_daieth = new TOKEN("REWARD_TOKEN_DAIETH");
window.REWARD_TOKEN_DAIETH_ABI = window.TOKEN_ABI;

window.reward_token_daibsc = new TOKENAVAX("REWARD_TOKEN_DAIBSC");
window.REWARD_TOKEN_DAIBSC_ABI = window.TOKENBSC_ABI;

window.constant_stakingdai = new CONSTANT_STAKING_NEW("CONSTANT_STAKINGDAI");

//Constant staking new for Buyback
window.buyback_staking1_1 = new BUYBACK_STAKING("BUYBACK_STAKING1_1");
window.buyback_staking1_2 = new BUYBACK_STAKING("BUYBACK_STAKING1_2");

window.buyback_stakingavax1_1 = new BUYBACK_STAKINGAVAX(
  "BUYBACK_STAKINGAVAX1_1"
);
window.buyback_stakingavax1_2 = new BUYBACK_STAKINGAVAX(
  "BUYBACK_STAKINGAVAX1_2"
);

window.constant_staking_new3 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEW3"
);
window.constant_staking_new4 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEW4"
);

window.constant_staking_newavax3 = new CONSTANT_STAKING_NEWAVAX(
  "CONSTANT_STAKINGNEW_NEWAVAX3"
);
window.constant_staking_newavax4 = new CONSTANT_STAKING_NEWAVAX(
  "CONSTANT_STAKINGNEW_NEWAVAX4"
);

window.CONSTANT_STAKINGNEW_NEWAVAX3_ABI = window.CONSTANT_STAKINGAVAX_ABI;
window.CONSTANT_STAKINGNEW_NEWAVAX4_ABI = window.CONSTANT_STAKINGAVAX_ABI;

/* Farming New */
window.token_new = new TOKEN("TOKEN_NEW");
window.token_newavax = new TOKENAVAX("TOKEN_NEWAVAX");
window.token_newbsc = new TOKENAVAX("TOKEN_NEWBSC");

window.farming_new_1 = new STAKING("FARMING_NEW_1");

window.constant_staking_new5 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEW5"
);

window.farming_new_2 = new STAKING("FARMING_NEW_2");
window.constant_staking_new6 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEW6"
);

window.constant_staking_newavax5 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEWAVAX5"
);

window.constant_staking_newavax6 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEWAVAX6"
);

window.constant_staking_newavax7 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEWAVAX7"
);

window.constant_staking_newavax8 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEWAVAX8"
);

window.constant_staking_newavax9 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEWAVAX9"
);

window.farming_new_3 = new STAKING("FARMING_NEW_3");
window.constant_staking_new7 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEW7"
);

window.farming_new_4 = new STAKING("FARMING_NEW_4");
window.constant_staking_new8 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEW8"
);

window.farming_new_5 = new STAKING("FARMING_NEW_5");
window.constant_staking_new9 = new CONSTANT_STAKING_NEW(
  "CONSTANT_STAKINGNEW_NEW9"
);

/* VST */
window.constant_staking_200 = new CONSTANT_STAKING("CONSTANT_STAKING_200");
window.constant_staking_300 = new CONSTANT_STAKING("CONSTANT_STAKING_300");

/* Constant staking iDYP */
window.constant_staking_idyp_1 = new CONSTANT_STAKING_OLD(
  "CONSTANT_STAKINGOLD_130"
);
window.constant_staking_idyp_2 = new CONSTANT_STAKING_OLD(
  "CONSTANT_STAKINGOLD_140"
);
window.constant_staking_idyp_3 = new CONSTANT_STAKING_OLD(
  "CONSTANT_STAKINGOLD_150"
);
window.constant_staking_idyp_4 = new CONSTANT_STAKING_OLD(
  "CONSTANT_STAKINGOLD_160"
);

/* Constant Staking iDYP AVAX */
window.constant_staking_idypavax_1 = new CONSTANT_STAKING_NEWAVAX(
  "CONSTANT_STAKINGIDYPAVAX_1"
);
window.constant_staking_idypavax_2 = new CONSTANT_STAKING_NEWAVAX(
  "CONSTANT_STAKINGIDYPAVAX_2"
);
window.constant_staking_idypavax_5 = new CONSTANT_STAKING_NEWAVAX(
  "CONSTANT_STAKINGIDYPAVAX_5"
);
window.constant_staking_idypavax_6 = new CONSTANT_STAKING_NEWAVAX(
  "CONSTANT_STAKINGIDYPAVAX_6"
);

//governance eth

class NEW_GOVERNANCE {
  constructor(ticker = "NEW_GOVERNANCE", token = "REWARD_TOKEN") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "QUORUM",
      "MIN_BALANCE_TO_INIT_PROPOSAL",
      "VOTE_DURATION",
      "RESULT_EXECUTION_ALLOWANCE_PERIOD",
      "actions",
      "optionOneVotes",
      "optionTwoVotes",
      "stakingPools",
      "newGovernances",
      "proposalStartTime",
      "isProposalExecuted",
      "totalDepositedTokens",
      "votesForProposalByAddress",
      "votedForOption",
      "lastVotedProposalStartTime",
      "lastIndex",
      "getProposal",
      "isProposalOpen",
      "isProposalExecutible",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    [
      "proposeDisburseOrBurn",
      "proposeNewQuorum",
      "proposeNewMinBalanceToInitProposal",
      "proposeText",
      "proposeUpgradeGovernance",
      "addVotes",
      "removeVotes",
      "withdrawAllTokens",
      "executeProposal",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        let value = 0;
        console.log(value);
        let gas = window.config.default_gas_amount;
        try {
          let estimatedGas = await contract.methods[fn_name](
            ...args
          ).estimateGas({ gas });
          if (estimatedGas) {
            gas = Math.min(estimatedGas, gas);
            //console.log('estimatedgas'+gas)
          }
        } catch (e) {
          console.warn(e);
        }
        if (fn_name == "proposeText") {
          gas = undefined;
        }
        return await contract.methods[fn_name](...args).send({
          value,
          gas,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        });
      };
    });
  }

  async addVotesOneClick(proposalId, option, amount) {
    let token_contract = await getContract({ key: this.token });
    let governance_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(governance_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    batch.add(
      governance_contract.methods
        .addVotes(proposalId, option, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    return batch.execute();
  }
}

window.new_governance = new NEW_GOVERNANCE();

//governance avax

class NEW_GOVERNANCEAVAX {
  constructor(ticker = "NEW_GOVERNANCEAVAX", token = "REWARD_TOKEN") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "QUORUM",
      "MIN_BALANCE_TO_INIT_PROPOSAL",
      "VOTE_DURATION",
      "RESULT_EXECUTION_ALLOWANCE_PERIOD",
      "actions",
      "optionOneVotes",
      "optionTwoVotes",
      "stakingPools",
      "newGovernances",
      "proposalStartTime",
      "isProposalExecuted",
      "totalDepositedTokens",
      "votesForProposalByAddress",
      "votedForOption",
      "lastVotedProposalStartTime",
      "lastIndex",
      "getProposal",
      "isProposalOpen",
      "isProposalExecutible",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    [
      "proposeDisburseOrBurn",
      "proposeNewQuorum",
      "proposeNewMinBalanceToInitProposal",
      "proposeText",
      "proposeUpgradeGovernance",
      "addVotes",
      "removeVotes",
      "withdrawAllTokens",
      "executeProposal",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        let value = 0;
        console.log(value);
        let gas = window.config.default_gas_amount;
        try {
          let estimatedGas = await contract.methods[fn_name](
            ...args
          ).estimateGas({ gas });
          if (estimatedGas) {
            gas = Math.min(estimatedGas, gas);
            //console.log('estimatedgas'+gas)
          }
        } catch (e) {
          console.warn(e);
        }
        if (fn_name == "proposeText") {
          gas = undefined;
        }
        return await contract.methods[fn_name](...args).send({
          value,
          gas,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        });
      };
    });
  }

  async addVotesOneClick(proposalId, option, amount) {
    let token_contract = await getContract({ key: this.token });
    let governance_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(governance_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    batch.add(
      governance_contract.methods
        .addVotes(proposalId, option, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    return batch.execute();
  }
}

window.new_governanceavax = new NEW_GOVERNANCEAVAX();

class NEW_GOVERNANCEBSC {
  constructor(ticker = "NEW_GOVERNANCEBSC", token = "REWARD_TOKEN") {
    this.ticker = ticker;
    this.token = token;
    let address = window.config[ticker.toLowerCase() + "_address"];
    this._address = address;
    [
      "QUORUM",
      "MIN_BALANCE_TO_INIT_PROPOSAL",
      "VOTE_DURATION",
      "RESULT_EXECUTION_ALLOWANCE_PERIOD",
      "actions",
      "optionOneVotes",
      "optionTwoVotes",
      "stakingPools",
      "newGovernances",
      "proposalStartTime",
      "isProposalExecuted",
      "totalDepositedTokens",
      "votesForProposalByAddress",
      "votedForOption",
      "lastVotedProposalStartTime",
      "lastIndex",
      "getProposal",
      "isProposalOpen",
      "isProposalExecutible",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        return await contract.methods[fn_name](...args).call();
      };
    });

    [
      "proposeDisburseOrBurn",
      "proposeNewQuorum",
      "proposeNewMinBalanceToInitProposal",
      "proposeText",
      "proposeUpgradeGovernance",
      "addVotes",
      "removeVotes",
      "withdrawAllTokens",
      "executeProposal",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract({ key: this.ticker });
        let value = 0;
        console.log(value);
        let gas = window.config.default_gas_amount;
        try {
          let estimatedGas = await contract.methods[fn_name](
            ...args
          ).estimateGas({ gas });
          if (estimatedGas) {
            gas = Math.min(estimatedGas, gas);
            //console.log('estimatedgas'+gas)
          }
        } catch (e) {
          console.warn(e);
        }
        if (fn_name == "proposeText") {
          gas = undefined;
        }
        return await contract.methods[fn_name](...args).send({
          value,
          gas,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        });
      };
    });
  }

  async addVotesOneClick(proposalId, option, amount) {
    let token_contract = await getContract({ key: this.token });
    let governance_contract = await getContract({ key: this.ticker });
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(governance_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    batch.add(
      governance_contract.methods
        .addVotes(proposalId, option, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    return batch.execute();
  }
}

window.new_governancebsc = new NEW_GOVERNANCEBSC();

window.CONSTANT_STAKINGIDYPAVAX_1_ABI = window.CONSTANT_STAKING_IDYP_ABI;
window.CONSTANT_STAKINGIDYPAVAX_2_ABI = window.CONSTANT_STAKING_IDYP_ABI;
window.CONSTANT_STAKINGIDYPAVAX_5_ABI = window.CONSTANT_STAKING_IDYP_ABI;
window.CONSTANT_STAKINGIDYPAVAX_6_ABI = window.CONSTANT_STAKING_IDYP_ABI;

function getBridgeContract(address) {
  return getContract({ address, ABI: window.BRIDGE_ABI });
}

class BRIDGE {
  constructor(bridgeAddress, tokenAddress) {
    this._address = bridgeAddress;
    this.tokenAddress = tokenAddress;

    ["deposit", "withdraw"].forEach((fn_name) => {
      this[fn_name] = async function (args, value = 0) {
        let contract = await getBridgeContract(bridgeAddress);
        return await contract.methods[fn_name](...args).send({
          value,
          from: await getCoinbase(),
        });
      };
    });
  }

  approveToken = async (amount) => {
    let token_contract = await getTokenContract(this.tokenAddress);
    return await token_contract.methods
      .approve(this._address, amount)
      .send({ value, from: await getCoinbase() });
  };
}

/**
 *
 * @param {"TOKEN" | "STAKING" | "NFTSTAKING" | "NFTSTAKING50" } key
 */
async function getContractNFT(key) {
  let ABI = window[key + "_ABI"];
  let address = window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      key === "NFTSTAKING50" ? window.NFTSTAKING_ABI : ABI,
      // key === "NFTSTAKING"
      //     ? "0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A"
      //     : key === 'NFTSTAKING50' ? '0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A'
      //     : address,
      key === "NFTSTAKING"
        ? "0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A"
        : key === "NFTSTAKING50"
        ? "0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A"
        : address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class NFT {
  constructor(key = "NFT") {
    this.key = key;
    [
      "MAX_CAWS",
      "balanceOf",
      "baseURI",
      "cawsPrice",
      "maxCawsPurchase",
      "ownerOf",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractNFT(this.key);
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["mintCaws"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractNFT(this.key);
        return await contract.methods[fn_name](...args).send({
          from: await getCoinbase(),
        });
      };
    });
  }

  async mintNFT(amount) {
    let nft_contract = await getContractNFT("NFT");
    let priceCaws = await nft_contract.methods.cawsPrice().call();
    let value = new BigNumber(priceCaws).times(amount);

    let second = nft_contract.methods
      .mintCaws(amount)
      .send({ value, from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }

  async approveStake(addr) {
    let nft_contract = await getContractNFT("NFT");
    let staking_addr = addr;
    return await nft_contract.methods
      .setApprovalForAll(staking_addr, true)
      .send();
  }

  async checkapproveStake(useraddr, addr) {
    let nft_contract = await getContractNFT("NFT");

    return await nft_contract.methods.isApprovedForAll(useraddr, addr).call();
  }

  async depositStake() {
    let nft_contract = await getContractNFT("NFT");

    return await nft_contract.methods.deposit([]).send();
  }

  async checkLockoutTime() {
    let nft_contract = await getContractNFT("NFTSTAKING");
    const time = await nft_contract.methods.LOCKUP_TIME().call();
    return time;
  }

  async checkLockoutTime50() {
    let nft_contract = await getContractNFT("NFTSTAKING50");
    const time = await nft_contract.methods.LOCKUP_TIME().call();
    return time;
  }
}

window.nft = new NFT();

/**
 *
 * @param {"TOKEN" | "LANDNFTSTAKE" } key
 */
async function getContractLandNFT(key) {
  let ABI = window[key + "_ABI"];
  let address = window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      key === "LANDNFTSTAKE"
        ? window.LANDMINTING_ABI
        : key === "LANDNFTSTAKING"
        ? window.LANDSTAKING_ABI
        : ABI,

      key === "LANDNFTSTAKE"
        ? "0xcd60d912655281908ee557ce1add61e983385a03"
        : key === "LANDNFTSTAKING"
        ? "0x6821710b0d6e9e10acfd8433ad023f874ed782f1"
        : address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class LANDNFT {
  constructor(key = "LANDNFTSTAKE") {
    this.key = key;
    [
      "MAX_MINT",
      "balanceOf",
      "baseURI",
      "landPrice",
      "maxLandPurchase",
      "ownerOf",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractLandNFT(this.key);
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["mintWodGenesis"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractLandNFT(this.key);
        return await contract.methods[fn_name](...args).send({
          from: await getCoinbase(),
        });
      };
    });
  }

  async mintNFT(amount, cawsArray) {
    const nft_contract = await getContractLandNFT("LANDNFTSTAKE");
    // const cawsContract = await getContractNFT("NFT");
    // const cawsStakeContract = await getContractNFT("NFTSTAKING");
    let countDiscount = cawsArray.length;
    // const coinbase = await getCoinbase();
    let newPrice = 0;
    let landnft = await nft_contract.methods.landPrice().call();
    const landPriceDiscount = await nft_contract.methods
      .LandPriceDiscount()
      .call();
    // if (cawsArray.length !== 0) {
    //   for (let i = 0; i < cawsArray.length; i++) {
    //     const result = await nft_contract.methods.cawsUsed(cawsArray[i]).call();
    //     if (result === false) {
    //       const cawsResult = await cawsContract.methods
    //         .ownerOf(cawsArray[i])
    //         .call();
    //       //Check if user is ownerOf Caws
    //       if (cawsResult === coinbase) {
    //         countDiscount++;
    //         continue;
    //       }
    //       //Check if user has deposited Caws in Staking
    //       const stakeResult = await cawsStakeContract.methods
    //         .calculateReward(coinbase, cawsArray[i])
    //         .call();
    //       if (stakeResult > 0) {
    //         countDiscount++;
    //       }
    //     }
    //   }
    // }

    if (countDiscount != 0) {
      newPrice =
        (landPriceDiscount * countDiscount +
          landnft * (amount - countDiscount)) /
        1e18;
    } else newPrice = (landnft * amount) / 1e18;

    const value = newPrice * 1e18;
    console.log(cawsArray, newPrice);
    let second = nft_contract.methods
      .mintWodGenesis(amount, cawsArray)
      .send({ value, from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }

  async approveStake(addr) {
    let nft_contract = await getContractLandNFT("LANDNFTSTAKE");
    let staking_addr = addr;
    return await nft_contract.methods
      .setApprovalForAll(staking_addr, true)
      .send();
  }

  async checkapproveStake(useraddr, addr) {
    let nft_contract = await getContractLandNFT("LANDNFTSTAKE");
    return await nft_contract.methods.isApprovedForAll(useraddr, addr).call();
  }

  async depositStake() {
    let nft_contract = await getContractLandNFT("LANDNFTSTAKING");
    return await nft_contract.methods.deposit([]).send();
  }

  async checkLockoutTime() {
    let nft_contract = await getContractLandNFT("LANDNFTSTAKING");
    const time = await nft_contract.methods.LOCKUP_TIME().call();
    return time;
  }
}

window.landnft = new LANDNFT();

window.token_dyps = new TOKEN("REWARD_TOKEN_DYPS");

window.token_dyp_eth = new TOKEN("TOKEN_DYP_ETH");
window.token_dyp_bsc = new TOKEN("TOKEN_DYP_BSC");

window.bridge_eth = new BRIDGE(
  window.config.bridge_eth_address,
  window.config.token_dyp_eth_address
);
window.bridge_bsc = new BRIDGE(
  window.config.bridge_bsc_address,
  window.config.token_dyp_bsc_address
);

//bridge eth-bsc
window.bridge_bsceth = new BRIDGE(
  window.config.bridge_bsceth_address,
  window.config.token_dyp_bsceth_address
);
window.bridge_bscbsc = new BRIDGE(
  window.config.bridge_bscbsc_address,
  window.config.token_dyp_bscbsc_address
);

window.token_dyp_bsceth = new TOKEN("TOKEN_DYP_BSCETH");
window.token_dyp_bscbsc = new TOKEN("TOKEN_DYP_BSCBSC");

//bridge eth-avax idyp
window.token_idyp_eth = new TOKEN("TOKEN_IDYP_ETH");
window.token_idyp_bsc = new TOKEN("TOKEN_IDYP_BSC");

window.bridge_idypeth = new BRIDGE(
  window.config.bridge_idypeth_address,
  window.config.token_idyp_eth_address
);
window.bridge_idypbsc = new BRIDGE(
  window.config.bridge_idypbsc_address,
  window.config.token_idyp_bsc_address
);

//bridge eth-bsc idyp
window.token_idyp_bsceth = new TOKEN("TOKEN_IDYP_BSCETH");
window.token_idyp_bscbsc = new TOKEN("TOKEN_IDYP_BSCBSC");

window.bridge_idypbsceth = new BRIDGE(
  window.config.bridge_idypbsceth_address,
  window.config.token_idyp_bsceth_address
);
window.bridge_idypbscbsc = new BRIDGE(
  window.config.bridge_idypbscbsc_address,
  window.config.token_idyp_bscbsc_address
);

window.buyback_stakingbsc1_1 = new BUYBACK_STAKINGBSC("BUYBACK_STAKINGBSC1_1");
window.buyback_stakingbsc1_2 = new BUYBACK_STAKINGBSC("BUYBACK_STAKINGBSC1_2");

window.BUYBACK_STAKINGBSC1_1_ABI = window.BUYBACK_STAKINGBSC1_1_ABI;
window.BUYBACK_STAKINGBSC1_1_ABI = window.BUYBACK_STAKINGBSC1_2_ABI;

async function getTokenHolderBalanceAll(holder, token_address, network) {
  if (network == 1) {
    let tokenContract = new window.infuraWeb3.eth.Contract(
      window.TOKEN_ABI,
      token_address,
      { from: undefined }
    );
    return await tokenContract.methods.balanceOf(holder).call();
  }
  if (network == 2) {
    let tokenContract = new window.avaxWeb3.eth.Contract(
      window.TOKEN_ABI,
      token_address,
      { from: undefined }
    );
    return await tokenContract.methods.balanceOf(holder).call();
  }

  if (network == 3) {
    let tokenContract = new window.bscWeb3.eth.Contract(
      window.TOKEN_ABI,
      token_address,
      { from: undefined }
    );
    return await tokenContract.methods.balanceOf(holder).call();
  }
  return 0;
}

window.getTokenHolderBalanceAll = getTokenHolderBalanceAll;

//mint

async function latestMint() {
  return await window.$.get("https://mint.dyp.finance/api/v1/latest/mint").then(
    (result) => {
      return parseInt(result.total);
    }
  );
}

function range(start, end, step = 1) {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
}

async function getNft(id) {
  return await window.$.get(`https://mint.dyp.finance/metadata/${id}`).then(
    (result) => {
      return result;
    }
  );
}

async function getLandNft(id) {
  return await window.$.get(
    `https://mint.worldofdypians.com/metadata/${id}`
  ).then((result) => {
    return result;
  });
}

async function myNftListContract(address) {
  let nft_contract = await getContractNFT("NFT");

  let getBalanceOf = await nft_contract.methods.balanceOf(address).call();

  let nftList = [];

  for (let i = 0; i < getBalanceOf; i++)
    nftList.push(
      await nft_contract.methods.tokenOfOwnerByIndex(address, i).call()
    );

  return nftList;
}

async function myNftLandListContract(address) {
  let nft_contract = await getContractLandNFT("LANDNFTSTAKE");

  let getBalanceOf = await nft_contract.methods.balanceOf(address).call();

  let nftList = [];

  for (let i = 0; i < getBalanceOf; i++)
    nftList.push(
      await nft_contract.methods.tokenOfOwnerByIndex(address, i).call()
    );

  return nftList;
}

async function myNftList(address) {
  return await window.$.get(
    `https://mint.dyp.finance/api/v1/my/${address}`
  ).then((result) => {
    return result;
  });
}

// window.config_eth = {
// 	weth_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // LOWERCASE!
// 	platform_token_address: '0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17',
// 	locker_address: '0x0c5d9AA95329517918AA7b82BfDa25d60446E1ac',
//
// 	subscription_address: '0x943023d8e0f591C08a0E2B922452a7Dc37173C9b',
// 	ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
// 	MAX_LOCKS_TO_LOAD_PER_CALL: 10,
//
// 	api_baseurl: 'https://app-tools.dyp.finance',
// 	subgraph_url: 'https://graphiql.dyp.finance/subgraphs/name/davekaj/uniswap',
// 	indexing_status_endpoint: 'https://graph-node.dyp.finance/graphql',
// 	farm_api: 'https://farm-info.dyp.finance',
//
// 	metamask_message: "I want to login, let me in!",
// 	metamask_admin_account: "0x471AD9812B2537Ffc66EbA4d474cC55c32DEc4F8",
//
// 	submission_form_link: 'https://docs.google.com/forms/d/e/1FAIpQLSdstsJBKnWuxCt9uqd2saC7AaRVSpuPtPdoTRmqdzpSdk14HA/viewform?usp=pp_url',
//
// 	// lowercase base tokens on uniswap
// 	// order matters!
// 	base_tokens: [
// 		'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // usdc
// 		'0xdac17f958d2ee523a2206206994597c13d831ec7', // usdt
// 		'0x6b175474e89094c44da98b954eedeac495271d0f', // dai
// 		'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // weth
// 		'0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' // wbtc
// 	],
//
// 	// add supported subscription tokens here, lowercase
// 	// THESE TOKENS MUST HAVE BEEN ALREADY ADDED TO SMART CONTRACT!
// 	subscription_tokens: {
// 		'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': {
// 			symbol: 'WETH', decimals: 18
// 		},
// 		'0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': {
// 			symbol: 'WBTC', decimals: 8
// 		},
// 		'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': {
// 			symbol: 'USDC', decimals: 6
// 		},
// 		'0xdac17f958d2ee523a2206206994597c13d831ec7': {
// 			symbol: 'USDT', decimals: 6
// 		},
// 		'0x6b175474e89094c44da98b954eedeac495271d0f': {
// 			symbol: 'DAI', decimals: 18
// 		}
// 	},
//
// 	automated_trust_scores: {
// 		perfect_scoring: { // minimum numbers for 100% scores
// 			tx_no: 2000,
// 			lp_holder_no: 250,
// 			daily_volume_usd: 10000,
// 			liquidity_usd: 1000000
// 		},
// 		weights: { // sum of all weights must be 1, 1 = 100%
// 			tx_no: .1,
// 			lp_holder_no: .2,
// 			daily_volume_usd: .2,
// 			liquidity_usd: .2,
// 			information: .3
// 		},
// 		display_order: [
// 			"information",
// 			"liquidity_usd",
// 			"daily_volume_usd",
// 			"lp_holder_no",
// 			"tx_no",
// 		],
// 		display_names: {
// 			"information": "Information",
// 			"liquidity_usd": "Liquidity (Pool)",
// 			"daily_volume_usd": "Daily Volume USD",
// 			"lp_holder_no": "LP Holders",
// 			"tx_no": "Transactions",
// 		}
// 	}
// }

// lowercase coingecko IDs by contract address for basetokens
window.tokenCG = {
  "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984": "uniswap",
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "usd-coin",
};

//window.UNISWAP_PAIR_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
//window.LOCKER_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"unlockTimestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"platformTokensLocked","type":"uint256"},{"indexed":false,"internalType":"bool","name":"claimed","type":"bool"}],"name":"Locked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"unlockTimestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"platformTokensLocked","type":"uint256"},{"indexed":false,"internalType":"bool","name":"claimed","type":"bool"}],"name":"Unlocked","type":"event"},{"inputs":[],"name":"MAX_LOCK_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_BASETOKEN_PERCENT_ETH_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ONE_HUNDRED_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PLATFORM_TOKEN","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SLIPPAGE_TOLERANCE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"baseToken","type":"address"}],"name":"addBaseToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"claimExtraTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"lockId","type":"uint256"}],"name":"claimUnlocked","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"}],"name":"createLock","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getActiveLockIds","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getActiveLockIdsByRecipient","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getActiveLockIdsByToken","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getActiveLockIdsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"name":"getActiveLockIdsLengthByRecipient","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getActiveLockIdsLengthByToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getBaseTokens","outputs":[{"internalType":"address[]","name":"result","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBaseTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getInactiveLockIds","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getInactiveLockIdsByRecipient","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getInactiveLockIdsByToken","outputs":[{"internalType":"uint256[]","name":"result","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getInactiveLockIdsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"name":"getInactiveLockIdsLengthByRecipient","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getInactiveLockIdsLengthByToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getLockById","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bool","name":"claimed","type":"bool"},{"internalType":"uint256","name":"platformTokensLocked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"getLockedTokens","outputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLockedTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"getLocksByIds","outputs":[{"internalType":"uint256[]","name":"_ids","type":"uint256[]"},{"internalType":"address[]","name":"tokens","type":"address[]"},{"internalType":"uint256[]","name":"unlockTimestamps","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"address[]","name":"recipients","type":"address[]"},{"internalType":"bool[]","name":"claimeds","type":"bool[]"},{"internalType":"uint256[]","name":"platformTokensLockeds","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"address","name":"baseToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getMinLockCreationFeeInWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"getTokensBalances","outputs":[{"internalType":"uint256[]","name":"balances","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"locks","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bool","name":"claimed","type":"bool"},{"internalType":"uint256","name":"platformTokensLocked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"locksLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"baseToken","type":"address"}],"name":"removeBaseToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapRouterV2","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]

window.CONSTANT_STAKINGDAI_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_uniswapV2RouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedDepositTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedRewardTokenAddress",
        type: "address",
      },
      { internalType: "uint256", name: "referralFeeRateX100", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "uint256", name: "rewardRateX100", type: "uint256" },
      { internalType: "uint256", name: "rewardInterval", type: "uint256" },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_newLockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "ReferralFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReferralFeeTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "TrustedDepositContractAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "TrustedDepositContractRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REFERRAL_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DEPOSIT_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_REWARD_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_WETH_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "addTrustedDepositContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminCanClaimAfter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_amountOutMin_claim", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getActiveReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "referrer", type: "address" }],
    name: "getNumberOfReferredStakers",
    outputs: [
      { internalType: "uint256", name: "_activeStakers", type: "uint256" },
      { internalType: "uint256", name: "_totalStakers", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTrustedDepositContract",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_reinvest",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "referrals",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "removeTrustedDepositContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "referralFeeRateX100", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newLockupTime", type: "uint256" },
    ],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newReferralFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setReferralFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newRewardRate", type: "uint256" },
    ],
    name: "setRewardRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "_newUniswapV2Router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToStake", type: "uint256" },
      { internalType: "address", name: "referrer", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedReferralFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalReferralFeeEarned",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.BUYBACK_STAKING1_1_ABI = [
  {
    inputs: [
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "trustedPlatformTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedDepositTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "adminCanClaimAfter", type: "uint256" },
      { internalType: "uint256", name: "rewardRateX100", type: "uint256" },
      { internalType: "uint256", name: "rewardInterval", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "StakingContractChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DEPOSIT_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_STAKING_CONTRACT_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "addTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "removeTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "lockupTime", type: "uint256" }],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedStakingContractAddress",
        type: "address",
      },
    ],
    name: "setStakingContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToDeposit", type: "uint256" },
      { internalType: "address", name: "depositToken", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_75Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_25Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_stakingReferralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDepositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "trustedDepositTokens",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.BUYBACK_STAKING1_2_ABI = [
  {
    inputs: [
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "trustedPlatformTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedDepositTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "adminCanClaimAfter", type: "uint256" },
      { internalType: "uint256", name: "rewardRateX100", type: "uint256" },
      { internalType: "uint256", name: "rewardInterval", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "StakingContractChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DEPOSIT_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_STAKING_CONTRACT_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "addTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "removeTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "lockupTime", type: "uint256" }],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedStakingContractAddress",
        type: "address",
      },
    ],
    name: "setStakingContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToDeposit", type: "uint256" },
      { internalType: "address", name: "depositToken", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_75Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_25Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_stakingReferralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDepositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "trustedDepositTokens",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.NFTSTAKING_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingDestinationAddress",
        type: "address",
      },
      { internalType: "uint256", name: "_rate", type: "uint256" },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
      { internalType: "address", name: "_erc20Address", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newExpiration",
        type: "uint256",
      },
    ],
    name: "ExpirationChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newLockTime",
        type: "uint256",
      },
    ],
    name: "LockTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "RateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_depositBlocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "calculateReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "calculateRewards",
    outputs: [
      { internalType: "uint256[]", name: "rewards", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "depositsOf",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "erc20Address",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "expiration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      { internalType: "uint256", name: "", type: "uint256" },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_expiration", type: "uint256" }],
    name: "setExpiration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockTime", type: "uint256" }],
    name: "setLockTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rate", type: "uint256" }],
    name: "setRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingDestinationAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.LANDMINTING_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "LandPriceDiscount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_MINT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_WOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WOD_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cawsContract",
    outputs: [
      { internalType: "contract CawsContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "cawsUsed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencySetStartingIndexBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "landPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxLandPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "mintWodGenesis",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "reserveWod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setStartingIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeContract",
    outputs: [
      { internalType: "contract StakeContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.LANDSTAKING_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingDestinationAddress",
        type: "address",
      },
      { internalType: "uint256", name: "_rate", type: "uint256" },
      { internalType: "uint256", name: "_expiration", type: "uint256" },
      { internalType: "address", name: "_erc20Address", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newExpiration",
        type: "uint256",
      },
    ],
    name: "ExpirationChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newLockTime",
        type: "uint256",
      },
    ],
    name: "LockTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "RateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "_depositBlocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "calculateReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "calculateRewards",
    outputs: [
      { internalType: "uint256[]", name: "rewards", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "depositsOf",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "erc20Address",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "expiration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_expiration", type: "uint256" }],
    name: "setExpiration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockTime", type: "uint256" }],
    name: "setLockTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rate", type: "uint256" }],
    name: "setRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingDestinationAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "CAWS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_CAWS",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cawsPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencySetStartingIndexBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxCawsPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintCaws",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveCaws",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setStartingIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.BRIDGE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "blocknumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "CHAIN_ID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ONE_DAY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "claimedWithdrawalsByOtherChainDepositId",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dailyTokenWithdrawLimitPerAccount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastDepositIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastUpdatedTokenWithdrawAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastUpdatedTokenWithdrawTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newDailyTokenWithdrawLimitPerAccount",
        type: "uint256",
      },
    ],
    name: "setDailyLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newVerifyAddress",
        type: "address",
      },
    ],
    name: "setVerifyAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifyAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.NEW_GOVERNANCE_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "enum Governance.Option",
        name: "option",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMinBalanceToInitProposal",
        type: "uint256",
      },
    ],
    name: "changeMinBalanceToInitProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newQuorum",
        type: "uint256",
      },
    ],
    name: "changeQuorum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "executeProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "PoolCallReverted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "PoolCallReverted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
    ],
    name: "PoolCallSucceeded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "enum Governance.PoolGroupName",
        name: "poolGroupName",
        type: "uint8",
      },
    ],
    name: "proposeDisburseOrBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMinBalance",
        type: "uint256",
      },
    ],
    name: "proposeNewMinBalanceToInitProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newQuorum",
        type: "uint256",
      },
    ],
    name: "proposeNewQuorum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "text",
        type: "string",
      },
    ],
    name: "proposeText",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Governance.PoolGroupName",
        name: "poolGroupName",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "newGovernance",
        type: "address",
      },
    ],
    name: "proposeUpgradeGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "removeVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20TokenFromPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyLegacyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyLegacyERC20TokenFromPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAllTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "actions",
    outputs: [
      {
        internalType: "enum Governance.Action",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ADMIN_CAN_CLAIM_AFTER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ADMIN_FEATURES_EXPIRE_AFTER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "getProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
      {
        internalType: "enum Governance.Action",
        name: "_proposalAction",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_optionOneVotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_optionTwoVotes",
        type: "uint256",
      },
      {
        internalType: "contract StakingPool[]",
        name: "_stakingPool",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_newGovernance",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_proposalStartTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isProposalExecuted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_newQuorum",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_proposalText",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_newMinBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Governance.PoolGroupName",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "hardcodedStakingPools",
    outputs: [
      {
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "isProposalExecuted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "isProposalExecutible",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "isProposalOpen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastVotedProposalStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_BALANCE_TO_INIT_PROPOSAL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newGovernances",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newMinBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newQuorums",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "optionOneVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "optionTwoVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalTexts",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "QUORUM",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RESULT_EXECUTION_ALLOWANCE_PERIOD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "stakingPools",
    outputs: [
      {
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalDepositedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VOTE_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "votedForOption",
    outputs: [
      {
        internalType: "enum Governance.Option",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "votesForProposalByAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

window.NEW_GOVERNANCEAVAX_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "enum Governance.Option",
        name: "option",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMinBalanceToInitProposal",
        type: "uint256",
      },
    ],
    name: "changeMinBalanceToInitProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newQuorum",
        type: "uint256",
      },
    ],
    name: "changeQuorum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "executeProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "PoolCallReverted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "PoolCallReverted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
    ],
    name: "PoolCallSucceeded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "enum Governance.PoolGroupName",
        name: "poolGroupName",
        type: "uint8",
      },
    ],
    name: "proposeDisburseOrBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMinBalance",
        type: "uint256",
      },
    ],
    name: "proposeNewMinBalanceToInitProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newQuorum",
        type: "uint256",
      },
    ],
    name: "proposeNewQuorum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "text",
        type: "string",
      },
    ],
    name: "proposeText",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Governance.PoolGroupName",
        name: "poolGroupName",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "newGovernance",
        type: "address",
      },
    ],
    name: "proposeUpgradeGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "removeVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20TokenFromPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyLegacyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyLegacyERC20TokenFromPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAllTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "actions",
    outputs: [
      {
        internalType: "enum Governance.Action",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ADMIN_CAN_CLAIM_AFTER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ADMIN_FEATURES_EXPIRE_AFTER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "getProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
      {
        internalType: "enum Governance.Action",
        name: "_proposalAction",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_optionOneVotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_optionTwoVotes",
        type: "uint256",
      },
      {
        internalType: "contract StakingPool[]",
        name: "_stakingPool",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_newGovernance",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_proposalStartTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isProposalExecuted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_newQuorum",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_proposalText",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_newMinBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Governance.PoolGroupName",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "hardcodedStakingPools",
    outputs: [
      {
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "isProposalExecuted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "isProposalExecutible",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "isProposalOpen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastVotedProposalStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_BALANCE_TO_INIT_PROPOSAL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newGovernances",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newMinBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newQuorums",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "optionOneVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "optionTwoVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalTexts",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "QUORUM",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RESULT_EXECUTION_ALLOWANCE_PERIOD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "stakingPools",
    outputs: [
      {
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalDepositedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VOTE_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "votedForOption",
    outputs: [
      {
        internalType: "enum Governance.Option",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "votesForProposalByAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

window.NEW_GOVERNANCEBSC_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "enum Governance.Option",
        name: "option",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMinBalanceToInitProposal",
        type: "uint256",
      },
    ],
    name: "changeMinBalanceToInitProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newQuorum",
        type: "uint256",
      },
    ],
    name: "changeQuorum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "executeProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "PoolCallReverted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "PoolCallReverted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
    ],
    name: "PoolCallSucceeded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "enum Governance.PoolGroupName",
        name: "poolGroupName",
        type: "uint8",
      },
    ],
    name: "proposeDisburseOrBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMinBalance",
        type: "uint256",
      },
    ],
    name: "proposeNewMinBalanceToInitProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newQuorum",
        type: "uint256",
      },
    ],
    name: "proposeNewQuorum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "text",
        type: "string",
      },
    ],
    name: "proposeText",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Governance.PoolGroupName",
        name: "poolGroupName",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "newGovernance",
        type: "address",
      },
    ],
    name: "proposeUpgradeGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "removeVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20TokenFromPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyLegacyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyLegacyERC20TokenFromPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAllTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "actions",
    outputs: [
      {
        internalType: "enum Governance.Action",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ADMIN_CAN_CLAIM_AFTER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ADMIN_FEATURES_EXPIRE_AFTER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "getProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
      {
        internalType: "enum Governance.Action",
        name: "_proposalAction",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_optionOneVotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_optionTwoVotes",
        type: "uint256",
      },
      {
        internalType: "contract StakingPool[]",
        name: "_stakingPool",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_newGovernance",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_proposalStartTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isProposalExecuted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_newQuorum",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_proposalText",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_newMinBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Governance.PoolGroupName",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "hardcodedStakingPools",
    outputs: [
      {
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "isProposalExecuted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "isProposalExecutible",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "isProposalOpen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastVotedProposalStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_BALANCE_TO_INIT_PROPOSAL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newGovernances",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newMinBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newQuorums",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "optionOneVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "optionTwoVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalTexts",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "QUORUM",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RESULT_EXECUTION_ALLOWANCE_PERIOD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "stakingPools",
    outputs: [
      {
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalDepositedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VOTE_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "votedForOption",
    outputs: [
      {
        internalType: "enum Governance.Option",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "votesForProposalByAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

window.ERC20_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "_to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "remaining", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_spender", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "_newOwner", type: "address" },
    ],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

window.TOKEN_ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "remaining",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "approveAndCall",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseApproval",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_addedValue",
        type: "uint256",
      },
    ],
    name: "increaseApproval",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "initialSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.UNISWAP_PAIR_ABI = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    payable: false,
    inputs: [],
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "spender",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "value",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Burn",
    inputs: [
      {
        type: "address",
        name: "sender",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount0",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount1",
        internalType: "uint256",
        indexed: false,
      },
      { type: "address", name: "to", internalType: "address", indexed: true },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Mint",
    inputs: [
      {
        type: "address",
        name: "sender",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount0",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount1",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Swap",
    inputs: [
      {
        type: "address",
        name: "sender",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount0In",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount1In",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount0Out",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount1Out",
        internalType: "uint256",
        indexed: false,
      },
      { type: "address", name: "to", internalType: "address", indexed: true },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Sync",
    inputs: [
      {
        type: "uint112",
        name: "reserve0",
        internalType: "uint112",
        indexed: false,
      },
      {
        type: "uint112",
        name: "reserve1",
        internalType: "uint112",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { type: "address", name: "from", internalType: "address", indexed: true },
      { type: "address", name: "to", internalType: "address", indexed: true },
      {
        type: "uint256",
        name: "value",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "bytes32", name: "", internalType: "bytes32" }],
    name: "DOMAIN_SEPARATOR",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "MINIMUM_LIQUIDITY",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "bytes32", name: "", internalType: "bytes32" }],
    name: "PERMIT_TYPEHASH",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "allowance",
    inputs: [
      { type: "address", name: "", internalType: "address" },
      { type: "address", name: "", internalType: "address" },
    ],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "approve",
    inputs: [
      { type: "address", name: "spender", internalType: "address" },
      { type: "uint256", name: "value", internalType: "uint256" },
    ],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "balanceOf",
    inputs: [{ type: "address", name: "", internalType: "address" }],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [
      { type: "uint256", name: "amount0", internalType: "uint256" },
      { type: "uint256", name: "amount1", internalType: "uint256" },
    ],
    name: "burn",
    inputs: [{ type: "address", name: "to", internalType: "address" }],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint8", name: "", internalType: "uint8" }],
    name: "decimals",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "factory",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [
      { type: "uint112", name: "_reserve0", internalType: "uint112" },
      { type: "uint112", name: "_reserve1", internalType: "uint112" },
      { type: "uint32", name: "_blockTimestampLast", internalType: "uint32" },
    ],
    name: "getReserves",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [],
    name: "initialize",
    inputs: [
      { type: "address", name: "_token0", internalType: "address" },
      { type: "address", name: "_token1", internalType: "address" },
    ],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "kLast",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [{ type: "uint256", name: "liquidity", internalType: "uint256" }],
    name: "mint",
    inputs: [{ type: "address", name: "to", internalType: "address" }],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "name",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "nonces",
    inputs: [{ type: "address", name: "", internalType: "address" }],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [],
    name: "permit",
    inputs: [
      { type: "address", name: "owner", internalType: "address" },
      { type: "address", name: "spender", internalType: "address" },
      { type: "uint256", name: "value", internalType: "uint256" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
      { type: "uint8", name: "v", internalType: "uint8" },
      { type: "bytes32", name: "r", internalType: "bytes32" },
      { type: "bytes32", name: "s", internalType: "bytes32" },
    ],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "price0CumulativeLast",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "price1CumulativeLast",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [],
    name: "skim",
    inputs: [{ type: "address", name: "to", internalType: "address" }],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [],
    name: "swap",
    inputs: [
      { type: "uint256", name: "amount0Out", internalType: "uint256" },
      { type: "uint256", name: "amount1Out", internalType: "uint256" },
      { type: "address", name: "to", internalType: "address" },
      { type: "bytes", name: "data", internalType: "bytes" },
    ],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "symbol",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [],
    name: "sync",
    inputs: [],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "token0",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "token1",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "view",
    payable: false,
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalSupply",
    inputs: [],
    constant: true,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "transfer",
    inputs: [
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "value", internalType: "uint256" },
    ],
    constant: false,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    payable: false,
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "transferFrom",
    inputs: [
      { type: "address", name: "from", internalType: "address" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "value", internalType: "uint256" },
    ],
    constant: false,
  },
];

window.UNISWAP_PAIRETH_ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Swap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve0",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve1",
        type: "uint112",
      },
    ],
    name: "Sync",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "burn",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      { internalType: "uint112", name: "_reserve0", type: "uint112" },
      { internalType: "uint112", name: "_reserve1", type: "uint112" },
      { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_token0", type: "address" },
      { internalType: "address", name: "_token1", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "kLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "liquidity", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "skim",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "amount0Out", type: "uint256" },
      { internalType: "uint256", name: "amount1Out", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "swap",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "sync",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token0",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token1",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.LOCKER_ABI = [
  { type: "constructor", stateMutability: "nonpayable", inputs: [] },
  {
    type: "event",
    name: "Locked",
    inputs: [
      { type: "uint256", name: "id", internalType: "uint256", indexed: true },
      {
        type: "address",
        name: "token",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "recipient",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "unlockTimestamp",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "platformTokensLocked",
        internalType: "uint256",
        indexed: false,
      },
      { type: "bool", name: "claimed", internalType: "bool", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unlocked",
    inputs: [
      { type: "uint256", name: "id", internalType: "uint256", indexed: true },
      {
        type: "address",
        name: "token",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "recipient",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "unlockTimestamp",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "platformTokensLocked",
        internalType: "uint256",
        indexed: false,
      },
      { type: "bool", name: "claimed", internalType: "bool", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "MAX_LOCK_DURATION",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "MINIMUM_BASETOKEN_PERCENT_ETH_X_100",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "ONE_HUNDRED_X_100",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "PLATFORM_TOKEN",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "SLIPPAGE_TOLERANCE_X_100",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addBaseToken",
    inputs: [{ type: "address", name: "baseToken", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "claimEther",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "claimExtraTokens",
    inputs: [{ type: "address", name: "token", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "claimUnlocked",
    inputs: [{ type: "uint256", name: "lockId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "createLock",
    inputs: [
      { type: "address", name: "pair", internalType: "address" },
      { type: "address", name: "baseToken", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
      { type: "uint256", name: "unlockTimestamp", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getActiveLockIds",
    inputs: [
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getActiveLockIdsByRecipient",
    inputs: [
      { type: "address", name: "recipient", internalType: "address" },
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getActiveLockIdsByToken",
    inputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getActiveLockIdsLength",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getActiveLockIdsLengthByRecipient",
    inputs: [{ type: "address", name: "recipient", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getActiveLockIdsLengthByToken",
    inputs: [{ type: "address", name: "token", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address[]", name: "result", internalType: "address[]" }],
    name: "getBaseTokens",
    inputs: [
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getBaseTokensLength",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getInactiveLockIds",
    inputs: [
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getInactiveLockIdsByRecipient",
    inputs: [
      { type: "address", name: "recipient", internalType: "address" },
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256[]", name: "result", internalType: "uint256[]" }],
    name: "getInactiveLockIdsByToken",
    inputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getInactiveLockIdsLength",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getInactiveLockIdsLengthByRecipient",
    inputs: [{ type: "address", name: "recipient", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getInactiveLockIdsLengthByToken",
    inputs: [{ type: "address", name: "token", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "unlockTimestamp", internalType: "uint256" },
      { type: "uint256", name: "amount", internalType: "uint256" },
      { type: "address", name: "recipient", internalType: "address" },
      { type: "bool", name: "claimed", internalType: "bool" },
      {
        type: "uint256",
        name: "platformTokensLocked",
        internalType: "uint256",
      },
    ],
    name: "getLockById",
    inputs: [{ type: "uint256", name: "id", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address[]", name: "tokens", internalType: "address[]" }],
    name: "getLockedTokens",
    inputs: [
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      { type: "uint256", name: "endIndex", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getLockedTokensLength",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256[]", name: "_ids", internalType: "uint256[]" },
      { type: "address[]", name: "tokens", internalType: "address[]" },
      {
        type: "uint256[]",
        name: "unlockTimestamps",
        internalType: "uint256[]",
      },
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
      { type: "address[]", name: "recipients", internalType: "address[]" },
      { type: "bool[]", name: "claimeds", internalType: "bool[]" },
      {
        type: "uint256[]",
        name: "platformTokensLockeds",
        internalType: "uint256[]",
      },
    ],
    name: "getLocksByIds",
    inputs: [{ type: "uint256[]", name: "ids", internalType: "uint256[]" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getMinLockCreationFeeInWei",
    inputs: [
      { type: "address", name: "pair", internalType: "address" },
      { type: "address", name: "baseToken", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256[]", name: "balances", internalType: "uint256[]" },
    ],
    name: "getTokensBalances",
    inputs: [{ type: "address[]", name: "tokens", internalType: "address[]" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "unlockTimestamp", internalType: "uint256" },
      { type: "uint256", name: "amount", internalType: "uint256" },
      { type: "address", name: "recipient", internalType: "address" },
      { type: "bool", name: "claimed", internalType: "bool" },
      {
        type: "uint256",
        name: "platformTokensLocked",
        internalType: "uint256",
      },
    ],
    name: "locks",
    inputs: [{ type: "uint256", name: "", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "locksLength",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "", internalType: "contract IPangolinRouter02" },
    ],
    name: "pangolinRouter",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "removeBaseToken",
    inputs: [{ type: "address", name: "baseToken", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "renounceOwnership",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "tokenBalances",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
  },
  { type: "receive", stateMutability: "payable" },
];

window.LOCKERETH_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokensLocked",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "claimed", type: "bool" },
    ],
    name: "Locked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokensLocked",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "claimed", type: "bool" },
    ],
    name: "Unlocked",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_LOCK_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINIMUM_BASETOKEN_PERCENT_ETH_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PLATFORM_TOKEN",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "baseToken", type: "address" }],
    name: "addBaseToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimEther",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "claimExtraTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "lockId", type: "uint256" }],
    name: "claimUnlocked",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "pair", type: "address" },
      { internalType: "address", name: "baseToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "unlockTimestamp", type: "uint256" },
    ],
    name: "createLock",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getActiveLockIds",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getActiveLockIdsByRecipient",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getActiveLockIdsByToken",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveLockIdsLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "recipient", type: "address" }],
    name: "getActiveLockIdsLengthByRecipient",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "getActiveLockIdsLengthByToken",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getBaseTokens",
    outputs: [{ internalType: "address[]", name: "result", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBaseTokensLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getInactiveLockIds",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getInactiveLockIdsByRecipient",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getInactiveLockIdsByToken",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInactiveLockIdsLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "recipient", type: "address" }],
    name: "getInactiveLockIdsLengthByRecipient",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "getInactiveLockIdsLengthByToken",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    name: "getLockById",
    outputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "unlockTimestamp", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "bool", name: "claimed", type: "bool" },
      {
        internalType: "uint256",
        name: "platformTokensLocked",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getLockedTokens",
    outputs: [{ internalType: "address[]", name: "tokens", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLockedTokensLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256[]", name: "ids", type: "uint256[]" }],
    name: "getLocksByIds",
    outputs: [
      { internalType: "uint256[]", name: "_ids", type: "uint256[]" },
      { internalType: "address[]", name: "tokens", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "unlockTimestamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      { internalType: "address[]", name: "recipients", type: "address[]" },
      { internalType: "bool[]", name: "claimeds", type: "bool[]" },
      {
        internalType: "uint256[]",
        name: "platformTokensLockeds",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "pair", type: "address" },
      { internalType: "address", name: "baseToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "getMinLockCreationFeeInWei",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address[]", name: "tokens", type: "address[]" }],
    name: "getTokensBalances",
    outputs: [
      { internalType: "uint256[]", name: "balances", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "locks",
    outputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "unlockTimestamp", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "bool", name: "claimed", type: "bool" },
      {
        internalType: "uint256",
        name: "platformTokensLocked",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "locksLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "baseToken", type: "address" }],
    name: "removeBaseToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "tokenBalances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      {
        internalType: "contract IUniswapV2Router02",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

window.SUBSCRIPTION_ABI = [
  { type: "constructor", stateMutability: "nonpayable", inputs: [] },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Subscribe",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "platformTokenAmount",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SubscriptionFeeSet",
    inputs: [
      {
        type: "uint256",
        name: "amountDai",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SupportedTokenAdded",
    inputs: [
      {
        type: "address",
        name: "tokenAddress",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SupportedTokenRemoved",
    inputs: [
      {
        type: "address",
        name: "tokenAddress",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unsubscribe",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "platformTokenAmount",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "ONE_HUNDRED_X_100",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "SLIPPAGE_TOLERANCE_X_100",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "TRUSTED_DAI_ADDRESS",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addSupportedToken",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getEstimatedTokenSubscriptionAmount",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "isTokenSupported",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "removeSupportedToken",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "renounceOwnership",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setSubscriptionFee",
    inputs: [
      {
        type: "uint256",
        name: "newSubscriptionFeeInDai",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "subscribe",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "subscriptionFeeInDai",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "subscriptionPlatformTokenAmount",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "", internalType: "contract IUniswapV2Router" },
    ],
    name: "uniswapRouterV2",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "unsubscribe",
    inputs: [],
  },
];

window.SUBSCRIPTIONETH_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Unsubscribe",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unsubscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.PANGOLIN_ROUTER_ABI = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "_factory", internalType: "address" },
      { type: "address", name: "_WAVAX", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "WAVAX",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      { type: "uint256", name: "amountA", internalType: "uint256" },
      { type: "uint256", name: "amountB", internalType: "uint256" },
      { type: "uint256", name: "liquidity", internalType: "uint256" },
    ],
    name: "addLiquidity",
    inputs: [
      { type: "address", name: "tokenA", internalType: "address" },
      { type: "address", name: "tokenB", internalType: "address" },
      { type: "uint256", name: "amountADesired", internalType: "uint256" },
      { type: "uint256", name: "amountBDesired", internalType: "uint256" },
      { type: "uint256", name: "amountAMin", internalType: "uint256" },
      { type: "uint256", name: "amountBMin", internalType: "uint256" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      { type: "uint256", name: "amountToken", internalType: "uint256" },
      { type: "uint256", name: "amountAVAX", internalType: "uint256" },
      { type: "uint256", name: "liquidity", internalType: "uint256" },
    ],
    name: "addLiquidityAVAX",
    inputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "amountTokenDesired", internalType: "uint256" },
      { type: "uint256", name: "amountTokenMin", internalType: "uint256" },
      { type: "uint256", name: "amountAVAXMin", internalType: "uint256" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "factory",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "pure",
    outputs: [{ type: "uint256", name: "amountIn", internalType: "uint256" }],
    name: "getAmountIn",
    inputs: [
      { type: "uint256", name: "amountOut", internalType: "uint256" },
      { type: "uint256", name: "reserveIn", internalType: "uint256" },
      { type: "uint256", name: "reserveOut", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "pure",
    outputs: [{ type: "uint256", name: "amountOut", internalType: "uint256" }],
    name: "getAmountOut",
    inputs: [
      { type: "uint256", name: "amountIn", internalType: "uint256" },
      { type: "uint256", name: "reserveIn", internalType: "uint256" },
      { type: "uint256", name: "reserveOut", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "getAmountsIn",
    inputs: [
      { type: "uint256", name: "amountOut", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "getAmountsOut",
    inputs: [
      { type: "uint256", name: "amountIn", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
    ],
  },
  {
    type: "function",
    stateMutability: "pure",
    outputs: [{ type: "uint256", name: "amountB", internalType: "uint256" }],
    name: "quote",
    inputs: [
      { type: "uint256", name: "amountA", internalType: "uint256" },
      { type: "uint256", name: "reserveA", internalType: "uint256" },
      { type: "uint256", name: "reserveB", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      { type: "uint256", name: "amountA", internalType: "uint256" },
      { type: "uint256", name: "amountB", internalType: "uint256" },
    ],
    name: "removeLiquidity",
    inputs: [
      { type: "address", name: "tokenA", internalType: "address" },
      { type: "address", name: "tokenB", internalType: "address" },
      { type: "uint256", name: "liquidity", internalType: "uint256" },
      { type: "uint256", name: "amountAMin", internalType: "uint256" },
      { type: "uint256", name: "amountBMin", internalType: "uint256" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      { type: "uint256", name: "amountToken", internalType: "uint256" },
      { type: "uint256", name: "amountAVAX", internalType: "uint256" },
    ],
    name: "removeLiquidityAVAX",
    inputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "liquidity", internalType: "uint256" },
      { type: "uint256", name: "amountTokenMin", internalType: "uint256" },
      { type: "uint256", name: "amountAVAXMin", internalType: "uint256" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "uint256", name: "amountAVAX", internalType: "uint256" }],
    name: "removeLiquidityAVAXSupportingFeeOnTransferTokens",
    inputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "liquidity", internalType: "uint256" },
      { type: "uint256", name: "amountTokenMin", internalType: "uint256" },
      { type: "uint256", name: "amountAVAXMin", internalType: "uint256" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      { type: "uint256", name: "amountToken", internalType: "uint256" },
      { type: "uint256", name: "amountAVAX", internalType: "uint256" },
    ],
    name: "removeLiquidityAVAXWithPermit",
    inputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "liquidity", internalType: "uint256" },
      { type: "uint256", name: "amountTokenMin", internalType: "uint256" },
      { type: "uint256", name: "amountAVAXMin", internalType: "uint256" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
      { type: "bool", name: "approveMax", internalType: "bool" },
      { type: "uint8", name: "v", internalType: "uint8" },
      { type: "bytes32", name: "r", internalType: "bytes32" },
      { type: "bytes32", name: "s", internalType: "bytes32" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "uint256", name: "amountAVAX", internalType: "uint256" }],
    name: "removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens",
    inputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "uint256", name: "liquidity", internalType: "uint256" },
      { type: "uint256", name: "amountTokenMin", internalType: "uint256" },
      { type: "uint256", name: "amountAVAXMin", internalType: "uint256" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
      { type: "bool", name: "approveMax", internalType: "bool" },
      { type: "uint8", name: "v", internalType: "uint8" },
      { type: "bytes32", name: "r", internalType: "bytes32" },
      { type: "bytes32", name: "s", internalType: "bytes32" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      { type: "uint256", name: "amountA", internalType: "uint256" },
      { type: "uint256", name: "amountB", internalType: "uint256" },
    ],
    name: "removeLiquidityWithPermit",
    inputs: [
      { type: "address", name: "tokenA", internalType: "address" },
      { type: "address", name: "tokenB", internalType: "address" },
      { type: "uint256", name: "liquidity", internalType: "uint256" },
      { type: "uint256", name: "amountAMin", internalType: "uint256" },
      { type: "uint256", name: "amountBMin", internalType: "uint256" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
      { type: "bool", name: "approveMax", internalType: "bool" },
      { type: "uint8", name: "v", internalType: "uint8" },
      { type: "bytes32", name: "r", internalType: "bytes32" },
      { type: "bytes32", name: "s", internalType: "bytes32" },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "swapAVAXForExactTokens",
    inputs: [
      { type: "uint256", name: "amountOut", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "swapExactAVAXForTokens",
    inputs: [
      { type: "uint256", name: "amountOutMin", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "swapExactAVAXForTokensSupportingFeeOnTransferTokens",
    inputs: [
      { type: "uint256", name: "amountOutMin", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "swapExactTokensForAVAX",
    inputs: [
      { type: "uint256", name: "amountIn", internalType: "uint256" },
      { type: "uint256", name: "amountOutMin", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "swapExactTokensForAVAXSupportingFeeOnTransferTokens",
    inputs: [
      { type: "uint256", name: "amountIn", internalType: "uint256" },
      { type: "uint256", name: "amountOutMin", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "swapExactTokensForTokens",
    inputs: [
      { type: "uint256", name: "amountIn", internalType: "uint256" },
      { type: "uint256", name: "amountOutMin", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    inputs: [
      { type: "uint256", name: "amountIn", internalType: "uint256" },
      { type: "uint256", name: "amountOutMin", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "swapTokensForExactAVAX",
    inputs: [
      { type: "uint256", name: "amountOut", internalType: "uint256" },
      { type: "uint256", name: "amountInMax", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      { type: "uint256[]", name: "amounts", internalType: "uint256[]" },
    ],
    name: "swapTokensForExactTokens",
    inputs: [
      { type: "uint256", name: "amountOut", internalType: "uint256" },
      { type: "uint256", name: "amountInMax", internalType: "uint256" },
      { type: "address[]", name: "path", internalType: "address[]" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "deadline", internalType: "uint256" },
    ],
  },
  { type: "receive", stateMutability: "payable" },
];

window.UNISWAP_ROUTER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_factory", type: "address" },
      { internalType: "address", name: "_WETH", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "amountADesired", type: "uint256" },
      { internalType: "uint256", name: "amountBDesired", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountTokenDesired", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "addLiquidityETH",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "reserveIn", type: "uint256" },
      { internalType: "uint256", name: "reserveOut", type: "uint256" },
    ],
    name: "getAmountIn",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "reserveIn", type: "uint256" },
      { internalType: "uint256", name: "reserveOut", type: "uint256" },
    ],
    name: "getAmountOut",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsIn",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "reserveA", type: "uint256" },
      { internalType: "uint256", name: "reserveB", type: "uint256" },
    ],
    name: "quote",
    outputs: [{ internalType: "uint256", name: "amountB", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidityETH",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidityETHSupportingFeeOnTransferTokens",
    outputs: [{ internalType: "uint256", name: "amountETH", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityETHWithPermit",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    outputs: [{ internalType: "uint256", name: "amountETH", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityWithPermit",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapETHForExactTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactETHForTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForETH",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapTokensForExactETH",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapTokensForExactTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

window.PANCAKESWAP_ROUTER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_factory", type: "address" },
      { internalType: "address", name: "_WETH", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "amountADesired", type: "uint256" },
      { internalType: "uint256", name: "amountBDesired", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountTokenDesired", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "addLiquidityETH",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "reserveIn", type: "uint256" },
      { internalType: "uint256", name: "reserveOut", type: "uint256" },
    ],
    name: "getAmountIn",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "reserveIn", type: "uint256" },
      { internalType: "uint256", name: "reserveOut", type: "uint256" },
    ],
    name: "getAmountOut",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsIn",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "reserveA", type: "uint256" },
      { internalType: "uint256", name: "reserveB", type: "uint256" },
    ],
    name: "quote",
    outputs: [{ internalType: "uint256", name: "amountB", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidityETH",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidityETHSupportingFeeOnTransferTokens",
    outputs: [{ internalType: "uint256", name: "amountETH", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityETHWithPermit",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    outputs: [{ internalType: "uint256", name: "amountETH", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityWithPermit",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapETHForExactTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactETHForTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForETH",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapTokensForExactETH",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapTokensForExactTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

window.CONSTANT_STAKING_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReferralFeeTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_CAN_CLAIM_AFTER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REFERRAL_FEE_RATE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "depositedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
    ],
    name: "getActiveReferredStaker",
    outputs: [
      {
        internalType: "address",
        name: "_staker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_totalEarned",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
    ],
    name: "getNumberOfReferredStakers",
    outputs: [
      {
        internalType: "uint256",
        name: "_activeStakers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalStakers",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getPendingDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
    ],
    name: "getReferredStaker",
    outputs: [
      {
        internalType: "address",
        name: "_staker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_totalEarned",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endIndex",
        type: "uint256",
      },
    ],
    name: "getStakersList",
    outputs: [
      {
        internalType: "address[]",
        name: "stakers",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "stakedTokens",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getTotalPendingDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastClaimedTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "referrals",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewardsPendingClaim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountToStake",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeExternal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedReferralFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalReferralFeeEarned",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyLegacyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedStakingContractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

window.GOVERNANCE_ABI = [
  {
    inputs: [],
    name: "MIN_BALANCE_TO_INIT_PROPOSAL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "QUORUM",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RESULT_EXECUTION_ALLOWANCE_PERIOD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VOTE_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "actions",
    outputs: [
      {
        internalType: "enum Governance.Action",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "enum Governance.Option",
        name: "option",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "executeProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "getProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
      {
        internalType: "enum Governance.Action",
        name: "_proposalAction",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_optionOneVotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_optionTwoVotes",
        type: "uint256",
      },
      {
        internalType: "contract StakingPool",
        name: "_stakingPool",
        type: "address",
      },
      {
        internalType: "address",
        name: "_newGovernance",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_proposalStartTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isProposalExecuted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "isProposalExecuted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "isProposalExecutible",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
    ],
    name: "isProposalOpen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastVotedProposalStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "newGovernances",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "optionOneVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "optionTwoVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract StakingPool",
        name: "pool",
        type: "address",
      },
    ],
    name: "proposeDisburseOrBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract StakingPool",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "newGovernance",
        type: "address",
      },
    ],
    name: "proposeUpgradeGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "removeVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "stakingPools",
    outputs: [
      {
        internalType: "contract StakingPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalDepositedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "votedForOption",
    outputs: [
      {
        internalType: "enum Governance.Option",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "votesForProposalByAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAllTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.STAKING_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "swapPath",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EthRewardsDisbursed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EthRewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsDisbursed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "BURN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAGIC_NUMBER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "SWAP_PATH",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addContractBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminCanClaimAfter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "burnOrDisburseTokensPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "burnRewardTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cliffTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractDeployTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToDeposit",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "depositTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "depositedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disburseAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disburseDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disbursePercentX100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disburseRewardTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToWithdraw",
        type: "uint256",
      },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endIndex",
        type: "uint256",
      },
    ],
    name: "getDepositorsList",
    outputs: [
      {
        internalType: "address[]",
        name: "stakers",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "stakedTokens",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMaxSwappableAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingDisbursement",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getPendingDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getPendingDivsEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastBurnOrTokenDistributeTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastClaimedTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastDisburseTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastEthDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastSwapExecutionTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "swapAttemptPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensToBeDisbursedOrBurnt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensToBeSwapped",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewardsEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalEthDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferAnyOldERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedDepositTokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedRewardTokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      {
        internalType: "contract IUniswapV2Router02",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Pair",
    outputs: [
      {
        internalType: "contract IUniswapV2Pair",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToWithdraw",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.BUYBACK_STAKING_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_CAN_CLAIM_AFTER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "addTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "depositedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToWithdraw",
        type: "uint256",
      },
    ],
    name: "emergencyUnstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getPendingDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endIndex",
        type: "uint256",
      },
    ],
    name: "getStakersList",
    outputs: [
      {
        internalType: "address[]",
        name: "stakers",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "stakedTokens",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getTotalPendingDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastClaimedTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "removeTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewardsPendingClaim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToDeposit",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "depositToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "trustedDepositTokens",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToWithdraw",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CONSTANT_STAKINGNEW_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_uniswapV2RouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedDepositTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedRewardTokenAddress",
        type: "address",
      },
      { internalType: "uint256", name: "referralFeeRateX100", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "uint256", name: "rewardRateX100", type: "uint256" },
      { internalType: "uint256", name: "rewardInterval", type: "uint256" },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_newLockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "ReferralFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReferralFeeTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "TrustedDepositContractAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "TrustedDepositContractRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REFERRAL_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DEPOSIT_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_REWARD_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "addTrustedDepositContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminCanClaimAfter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_amountOutMin_claim", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      {
        internalType: "uint256",
        name: "_amountOutMin_stakingReferralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "depositByContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getActiveReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "referrer", type: "address" }],
    name: "getNumberOfReferredStakers",
    outputs: [
      { internalType: "uint256", name: "_activeStakers", type: "uint256" },
      { internalType: "uint256", name: "_totalStakers", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTrustedDepositContract",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_reinvest",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "referrals",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "removeTrustedDepositContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "referralFeeRateX100", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newLockupTime", type: "uint256" },
    ],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newReferralFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setReferralFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "_newUniswapV2Router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToStake", type: "uint256" },
      { internalType: "address", name: "referrer", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedReferralFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalReferralFeeEarned",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CONSTANT_STAKINGBSC_NEW_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_uniswapV2RouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedDepositTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedRewardTokenAddress",
        type: "address",
      },
      { internalType: "uint256", name: "referralFeeRateX100", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "uint256", name: "rewardRateX100", type: "uint256" },
      { internalType: "uint256", name: "rewardInterval", type: "uint256" },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_newLockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "ReferralFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReferralFeeTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "TrustedDepositContractAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "TrustedDepositContractRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REFERRAL_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DEPOSIT_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_REWARD_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "addTrustedDepositContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminCanClaimAfter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_amountOutMin_claim", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      {
        internalType: "uint256",
        name: "_amountOutMin_stakingReferralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "depositByContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getActiveReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "referrer", type: "address" }],
    name: "getNumberOfReferredStakers",
    outputs: [
      { internalType: "uint256", name: "_activeStakers", type: "uint256" },
      { internalType: "uint256", name: "_totalStakers", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTrustedDepositContract",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_reinvest",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "referrals",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "removeTrustedDepositContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "referralFeeRateX100", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newLockupTime", type: "uint256" },
    ],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newReferralFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setReferralFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "_newUniswapV2Router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToStake", type: "uint256" },
      { internalType: "address", name: "referrer", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedReferralFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalReferralFeeEarned",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.BUYBACK_STAKINGBSC1_1_ABI = [
  {
    inputs: [
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "trustedPlatformTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedDepositTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "adminCanClaimAfter", type: "uint256" },
      { internalType: "uint256", name: "rewardRateX100", type: "uint256" },
      { internalType: "uint256", name: "rewardInterval", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "StakingContractChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DEPOSIT_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_STAKING_CONTRACT_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "addTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "removeTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "lockupTime", type: "uint256" }],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedStakingContractAddress",
        type: "address",
      },
    ],
    name: "setStakingContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToDeposit", type: "uint256" },
      { internalType: "address", name: "depositToken", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_75Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_25Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_stakingReferralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDepositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "trustedDepositTokens",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.BUYBACK_STAKINGBSC1_2_ABI = [
  {
    inputs: [
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "trustedPlatformTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedDepositTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "adminCanClaimAfter", type: "uint256" },
      { internalType: "uint256", name: "rewardRateX100", type: "uint256" },
      { internalType: "uint256", name: "rewardInterval", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "StakingContractChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DEPOSIT_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_STAKING_CONTRACT_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "addTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "removeTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "lockupTime", type: "uint256" }],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedStakingContractAddress",
        type: "address",
      },
    ],
    name: "setStakingContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToDeposit", type: "uint256" },
      { internalType: "address", name: "depositToken", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_75Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_25Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_stakingReferralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDepositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "trustedDepositTokens",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.FARMING_NEW_ABI = [
  {
    inputs: [
      { internalType: "address[]", name: "swapPath", type: "address[]" },
      {
        internalType: "address",
        name: "_uniswapV2RouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "ClaimableTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "ClaimableTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EthRewardsDisbursed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EthRewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newMagicNumber",
        type: "uint256",
      },
    ],
    name: "MagicNumberChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsDisbursed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "BURN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAGIC_NUMBER",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "SWAP_PATH",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "addContractBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedClaimableTokenAddress",
        type: "address",
      },
    ],
    name: "addTrustedClaimableToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminCanClaimAfter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "burnOrDisburseTokensPeriod",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "burnRewardTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_claimAsToken_dyp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_attemptSwap",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "claimAsToken", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_claimAsToken_weth",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_claimAsToken_dyp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_attemptSwap",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claimAs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cliffTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractDeployTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "depositToken", type: "address" },
      { internalType: "uint256", name: "amountToStake", type: "uint256" },
      { internalType: "uint256[]", name: "minAmounts", type: "uint256[]" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disburseAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disburseDuration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disbursePercentX100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disburseRewardTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getDepositorsList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMaxSwappableAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingDisbursement",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivsEth",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastBurnOrTokenDistributeTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastDisburseTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastDivPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastEthDivPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastSwapExecutionTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedClaimableTokenAddress",
        type: "address",
      },
    ],
    name: "removeTrustedClaimableToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newMagicNumber", type: "uint256" },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_uniswapV2RouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newLockupTime", type: "uint256" },
    ],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newMagicNumber", type: "uint256" },
    ],
    name: "setMagicNumber",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "swapAttemptPeriod",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensToBeDisbursedOrBurnt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensToBeSwapped",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewardsEth",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDivPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedEth",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalEthDivPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedBaseTokenAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "trustedClaimableTokens",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedDepositTokenAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedPlatformTokenAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedRewardTokenAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedStakingContractAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Pair",
    outputs: [
      { internalType: "contract IUniswapV2Pair", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "withdrawAsToken", type: "address" },
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      { internalType: "uint256[]", name: "minAmounts", type: "uint256[]" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.FARMING_NEWBSC_ABI = [
  {
    inputs: [
      { internalType: "address[]", name: "swapPath", type: "address[]" },
      {
        internalType: "address",
        name: "_uniswapV2RouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "ClaimableTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "ClaimableTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EthRewardsDisbursed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EthRewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newMagicNumber",
        type: "uint256",
      },
    ],
    name: "MagicNumberChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsDisbursed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "BURN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAGIC_NUMBER",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "SWAP_PATH",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "addContractBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedClaimableTokenAddress",
        type: "address",
      },
    ],
    name: "addTrustedClaimableToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminCanClaimAfter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "burnOrDisburseTokensPeriod",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "burnRewardTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_claimAsToken_dyp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_attemptSwap",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "claimAsToken", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_claimAsToken_weth",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_claimAsToken_dyp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_attemptSwap",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claimAs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cliffTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractDeployTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "depositToken", type: "address" },
      { internalType: "uint256", name: "amountToStake", type: "uint256" },
      { internalType: "uint256[]", name: "minAmounts", type: "uint256[]" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disburseAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disburseDuration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disbursePercentX100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disburseRewardTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getDepositorsList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMaxSwappableAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingDisbursement",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivsEth",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastBurnOrTokenDistributeTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastDisburseTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastDivPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastEthDivPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastSwapExecutionTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedClaimableTokenAddress",
        type: "address",
      },
    ],
    name: "removeTrustedClaimableToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newMagicNumber", type: "uint256" },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_uniswapV2RouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newLockupTime", type: "uint256" },
    ],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newMagicNumber", type: "uint256" },
    ],
    name: "setMagicNumber",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "swapAttemptPeriod",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensToBeDisbursedOrBurnt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensToBeSwapped",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewardsEth",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDivPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedEth",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalEthDivPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedBaseTokenAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "trustedClaimableTokens",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedDepositTokenAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedPlatformTokenAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedRewardTokenAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedStakingContractAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Pair",
    outputs: [
      { internalType: "contract IUniswapV2Pair", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "withdrawAsToken", type: "address" },
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      { internalType: "uint256[]", name: "minAmounts", type: "uint256[]" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CONSTANT_STAKING_OLD_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReferralFeeTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_CAN_CLAIM_AFTER",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REFERRAL_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
    ],
    name: "emergencyUnstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getActiveReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "referrer", type: "address" }],
    name: "getNumberOfReferredStakers",
    outputs: [
      { internalType: "uint256", name: "_activeStakers", type: "uint256" },
      { internalType: "uint256", name: "_totalStakers", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "referrals",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToStake", type: "uint256" },
      { internalType: "address", name: "referrer", type: "address" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedReferralFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalReferralFeeEarned",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyLegacyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.VAULT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CompoundRewardClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EtherRewardClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EtherRewardDisbursed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PlatformTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PlatformTokenRewardClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenRewardClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenRewardDisbursed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "BURN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FEE_PERCENT_TO_BUYBACK_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FEE_PERCENT_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_ETH_FEE_IN_WEI",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "POINT_MULTIPLIER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RETURN_PERCENT_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_CTOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DEPOSIT_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addPlatformTokenBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "cTokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_platformTokens",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimCompoundDivs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimEthDivs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "claimExtraTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_platformTokens",
        type: "uint256",
      },
    ],
    name: "claimPlatformTokenDivs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimTokenDivs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_ethFeeBuyBack",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "depositTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "depositTokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ethDivsBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "ethDivsOwing",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cTokenBalance",
        type: "uint256",
      },
    ],
    name: "getConvertedBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endIndex",
        type: "uint256",
      },
    ],
    name: "getDepositorsList",
    outputs: [
      {
        internalType: "address[]",
        name: "stakers",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "stakedTokens",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getEstimatedCompoundDivsOwing",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getExchangeRateCurrent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getExchangeRateStored",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastClaimedTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastEthDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastTokenDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "platformTokenDivsBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "platformTokenDivsOwing",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenDivsBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "tokenDivsOwing",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalCTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDepositedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedCompoundDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedEthDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedPlatformTokenDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedTokenDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalEthDisbursed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalEthDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalTokenDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalTokensDepositedByUser",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalTokensDisbursed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalTokensWithdrawnByUser",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_ethFeeBuyBack",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_tokenFeeBuyBack",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

window.STAKINGAVAX_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addContractBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedClaimableTokenAddress",
        type: "address",
      },
    ],
    name: "addTrustedClaimableToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "burnRewardTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "claimAsToken",
        type: "address",
      },
    ],
    name: "claimAs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToDeposit",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "swapPath",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "ClaimableTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "ClaimableTokenRemoved",
    type: "event",
  },
  {
    inputs: [],
    name: "disburseRewardTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToWithdraw",
        type: "uint256",
      },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EthRewardsDisbursed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EthRewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedClaimableTokenAddress",
        type: "address",
      },
    ],
    name: "removeTrustedClaimableToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsDisbursed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferAnyOldERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToWithdraw",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminCanClaimAfter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BURN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "burnOrDisburseTokensPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cliffTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractDeployTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "depositedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "depositTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disburseAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disburseDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disbursePercentX100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endIndex",
        type: "uint256",
      },
    ],
    name: "getDepositorsList",
    outputs: [
      {
        internalType: "address[]",
        name: "stakers",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "stakedTokens",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMaxSwappableAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingDisbursement",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getPendingDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getPendingDivsEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastBurnOrTokenDistributeTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastClaimedTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastDisburseTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastEthDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastSwapExecutionTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAGIC_NUMBER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "SWAP_PATH",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "swapAttemptPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensToBeDisbursedOrBurnt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensToBeSwapped",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewardsEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalEthDivPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "trustedClaimableTokens",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedDepositTokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedRewardTokenAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      {
        internalType: "contract IPangolinRouter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Pair",
    outputs: [
      {
        internalType: "contract IUniswapV2Pair",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

window.BUYBACK_STAKINGAVAX_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_CAN_CLAIM_AFTER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "addTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "depositedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToWithdraw",
        type: "uint256",
      },
    ],
    name: "emergencyUnstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getPendingDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endIndex",
        type: "uint256",
      },
    ],
    name: "getStakersList",
    outputs: [
      {
        internalType: "address[]",
        name: "stakers",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "stakedTokens",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getTotalPendingDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastClaimedTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "removeTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewardsPendingClaim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToDeposit",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "depositToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "trustedDepositTokens",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToWithdraw",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.BUYBACK_STAKINGAVAX1_1_ABI = [
  {
    inputs: [
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "trustedPlatformTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedDepositTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "adminCanClaimAfter", type: "uint256" },
      { internalType: "uint256", name: "rewardRateX100", type: "uint256" },
      { internalType: "uint256", name: "rewardInterval", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "StakingContractChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DEPOSIT_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_STAKING_CONTRACT_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "addTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "removeTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "lockupTime", type: "uint256" }],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedStakingContractAddress",
        type: "address",
      },
    ],
    name: "setStakingContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToDeposit", type: "uint256" },
      { internalType: "address", name: "depositToken", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_75Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_25Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_stakingReferralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDepositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "trustedDepositTokens",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.BUYBACK_STAKINGAVAX1_2_ABI = [
  {
    inputs: [
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "trustedPlatformTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedDepositTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "adminCanClaimAfter", type: "uint256" },
      { internalType: "uint256", name: "rewardRateX100", type: "uint256" },
      { internalType: "uint256", name: "rewardInterval", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "DepositTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "StakingContractChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DEPOSIT_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_STAKING_CONTRACT_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "addTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddress", type: "address" },
    ],
    name: "removeTrustedDepositToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "lockupTime", type: "uint256" }],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedStakingContractAddress",
        type: "address",
      },
    ],
    name: "setStakingContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToDeposit", type: "uint256" },
      { internalType: "address", name: "depositToken", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_75Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_25Percent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_stakingReferralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDepositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "trustedDepositTokens",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      { internalType: "uint256", name: "_amountOutMin", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CONSTANT_STAKINGAVAX_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReferralFeeTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_CAN_CLAIM_AFTER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REFERRAL_FEE_RATE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_TOKEN_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "depositedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
    ],
    name: "getActiveReferredStaker",
    outputs: [
      {
        internalType: "address",
        name: "_staker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_totalEarned",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
    ],
    name: "getNumberOfReferredStakers",
    outputs: [
      {
        internalType: "uint256",
        name: "_activeStakers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalStakers",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getPendingDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
    ],
    name: "getReferredStaker",
    outputs: [
      {
        internalType: "address",
        name: "_staker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_totalEarned",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endIndex",
        type: "uint256",
      },
    ],
    name: "getStakersList",
    outputs: [
      {
        internalType: "address[]",
        name: "stakers",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "stakedTokens",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address",
      },
    ],
    name: "getTotalPendingDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastClaimedTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "referrals",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewardsPendingClaim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountToStake",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeExternal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedReferralFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalEarnedTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalReferralFeeEarned",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyLegacyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedStakingContractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

window.TOKENAVAX_ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "remaining",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "approveAndCall",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseApproval",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_addedValue",
        type: "uint256",
      },
    ],
    name: "increaseApproval",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "initialSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.TOKENBSC_ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "remaining",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "approveAndCall",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseApproval",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_addedValue",
        type: "uint256",
      },
    ],
    name: "increaseApproval",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "initialSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CONSTANT_STAKING_IDYP_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReferralFeeTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_CAN_CLAIM_AFTER",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REFERRAL_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
    ],
    name: "emergencyUnstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getActiveReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "referrer", type: "address" }],
    name: "getNumberOfReferredStakers",
    outputs: [
      { internalType: "uint256", name: "_activeStakers", type: "uint256" },
      { internalType: "uint256", name: "_totalStakers", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "referrals",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToStake", type: "uint256" },
      { internalType: "address", name: "referrer", type: "address" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedReferralFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalReferralFeeEarned",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyLegacyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CONSTANT_STAKING_DAI_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_uniswapV2RouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedDepositTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "trustedRewardTokenAddress",
        type: "address",
      },
      { internalType: "uint256", name: "referralFeeRateX100", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "uint256", name: "rewardRateX100", type: "uint256" },
      { internalType: "uint256", name: "rewardInterval", type: "uint256" },
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "EmergencyDeclared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "FeeRecipientAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_newLockupTime",
        type: "uint256",
      },
    ],
    name: "LockupTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "ReferralFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReferralFeeTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Reinvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "StakingFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "TrustedDepositContractAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "TrustedDepositContractRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UniswapV2RouterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFee",
        type: "uint256",
      },
    ],
    name: "UnstakingFeeChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "EMERGENCY_WAIT_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REFERRAL_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_INTERVAL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DEPOSIT_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_REWARD_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_WETH_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKING_FEE_RATE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "addTrustedDepositContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "adminCanClaimAfter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "adminClaimableTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_amountOutMin_claim", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "claimAnyToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "declareEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "depositedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRecipientAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getActiveReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "referrer", type: "address" }],
    name: "getNumberOfReferredStakers",
    outputs: [
      { internalType: "uint256", name: "_activeStakers", type: "uint256" },
      { internalType: "uint256", name: "_totalStakers", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "i", type: "uint256" },
    ],
    name: "getReferredStaker",
    outputs: [
      { internalType: "address", name: "_staker", type: "address" },
      { internalType: "uint256", name: "_totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "startIndex", type: "uint256" },
      { internalType: "uint256", name: "endIndex", type: "uint256" },
    ],
    name: "getStakersList",
    outputs: [
      { internalType: "address[]", name: "stakers", type: "address[]" },
      {
        internalType: "uint256[]",
        name: "stakingTimestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "lastClaimedTimeStamps",
        type: "uint256[]",
      },
      { internalType: "uint256[]", name: "stakedTokens", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_holder", type: "address" }],
    name: "getTotalPendingDivs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTrustedDepositContract",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lastClaimedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutMin_reinvest",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "reInvest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "referrals",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "removeTrustedDepositContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "rewardsPendingClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "lockupTime", type: "uint256" },
      { internalType: "uint256", name: "referralFeeRateX100", type: "uint256" },
      { internalType: "uint256", name: "stakingFeeRateX100", type: "uint256" },
      {
        internalType: "uint256",
        name: "unstakingFeeRateX100",
        type: "uint256",
      },
      { internalType: "address", name: "router", type: "address" },
      {
        internalType: "address",
        name: "_feeRecipientAddress",
        type: "address",
      },
    ],
    name: "setContractVariables",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newFeeRecipientAddress",
        type: "address",
      },
    ],
    name: "setFeeRecipientAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newLockupTime", type: "uint256" },
    ],
    name: "setLockupTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newReferralFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setReferralFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newRewardRate", type: "uint256" },
    ],
    name: "setRewardRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newStakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setStakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "_newUniswapV2Router",
        type: "address",
      },
    ],
    name: "setUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newUnstakingFeeRateX100",
        type: "uint256",
      },
    ],
    name: "setUnstakingFeeRateX100",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToStake", type: "uint256" },
      { internalType: "address", name: "referrer", type: "address" },
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedReferralFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalEarnedTokens",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "totalReferralFeeEarned",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountToWithdraw", type: "uint256" },
      {
        internalType: "uint256",
        name: "_amountOutMin_referralFee",
        type: "uint256",
      },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.FARMWETH_ABI = window.TOKEN_ABI;
window.TOKEN_WETH = window.TOKEN_ABI;
window.TOKEN_WBTC = window.TOKEN_ABI;
window.TOKEN_USDT = window.TOKEN_ABI;
window.TOKEN_USDC = window.TOKEN_ABI;
window.TOKEN_DAI = window.TOKEN_ABI;

window.REWARD_TOKEN_ABI = window.TOKEN_ABI;

window.rebase_factors = [
  1, 1, 1, 1, 1e4, 1e4, 1e4, 1e4, 1e4, 1e4, 1e4, 1e4, 1e4, 1e4, 1e4, 1e4,
];

window.rebase_factorsavax = [1, 1, 1, 1, 1, 1, 1, 1, 1];

window.rebase_factorsbsc = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

  1, 1, 1, 1, 1,
];

/* Farming New */
window.token_new = new TOKEN("TOKEN_NEW");

// window.token_weth = new TOKEN(window.config.token_weth_address)
window.token_weth = new TOKEN("TOKEN_WETH");
window.token_wbtc = new TOKEN("TOKEN_WBTC");
window.token_usdc = new TOKEN("TOKEN_USDC");
window.token_usdt = new TOKEN("TOKEN_USDT");
window.token_dai = new TOKEN("TOKEN_DAI");

window.vault_weth = new VAULT_NEW(
  window.config.vault_weth_address,
  window.config.token_weth_address
);
window.vault_wbtc = new VAULT_NEW(
  window.config.vault_wbtc_address,
  window.config.token_wbtc_address
);
window.vault_usdt = new VAULT_NEW(
  window.config.vault_usdt_address,
  window.config.token_usdt_address
);
window.vault_usdc = new VAULT_NEW(
  window.config.vault_usdc_address,
  window.config.token_usdc_address
);
window.vault_dai = new VAULT_NEW(
  window.config.vault_dai_address,
  window.config.token_dai_address
);

window.farming_new_1 = new STAKING("FARMING_NEW_1");

window.farming_new_2 = new STAKING("FARMING_NEW_2");

window.farming_new_3 = new STAKING("FARMING_NEW_3");

window.farming_new_4 = new STAKING("FARMING_NEW_4");

window.farming_new_5 = new STAKING("FARMING_NEW_5");

window.constant_staking_30 = new CONSTANT_STAKING_OLD("CONSTANT_STAKINGOLD_30");

// window.token_idyp = new TOKEN(window.config.reward_token_idyp_address)

window.isConnectedOneTime = false;
window.oneTimeConnectionEvents = [];
function addOneTimeWalletConnectionListener(fn) {
  oneTimeConnectionEvents.push(fn);
  console.log({ oneTimeConnectionEvents });
}
function removeOneTimeWalletConnectionListener(fn) {
  oneTimeConnectionEvents = oneTimeConnectionEvents.filter((e) => e != fn);
  console.log({ oneTimeConnectionEvents });
}

function getData(ajaxurl) {
  return $.ajax({
    url: ajaxurl,
    type: "GET",
  });
}

async function getMaxFee() {
  let maxPriorityFeePerGas = new BigNumber(10000000000).toFixed(0) * 1;
  let latestGasPrice = await window.web3.eth.getGasPrice();
  latestGasPrice =
    new BigNumber(latestGasPrice * 1.125 + maxPriorityFeePerGas).toFixed(0) * 1;

  return { latestGasPrice, maxPriorityFeePerGas };
}

// function to connect metamask
async function connectWallet() {
  function onConnect() {
    if (!isConnectedOneTime) {
      window.isConnectedOneTime = true;
      window.oneTimeConnectionEvents.forEach((fn) => fn());
    }
  }
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum?.enable();
      console.log("Connected!");
      if (window.ethereum.isCoin98) {
        window.WALLET_TYPE = "coin98";
      }
      if (window.ethereum.isMetaMask) {
        window.WALLET_TYPE = "metamask";
      }
      let coinbase_address = await window.ethereum?.request({
        method: "eth_accounts",
      });
      window.coinbase_address = coinbase_address.pop();
      onConnect();
      return true;
    } catch (e) {
      console.error(e);
      throw new Error("User denied wallet connection!");
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    console.log("connected to old web3");
    onConnect();
    return true;
  } else {
    throw new Error("No web3 detected!");
  }
}

function param(name) {
  var f = new RegExp("\\b" + name + "=([^&]+)").exec(document.location.search);
  if (f) return decodeURIComponent(f[1].replace(/\+/g, " "));
}

window.param = param;

window.cached_contracts = Object.create(null);

function getCoinbase() {
  if (window.WALLET_TYPE == "coin98") {
    return window.coinbase_address.toLowerCase();
  } else {
    return window.web3.eth?.getCoinbase();
  }
}

async function getContract({ key, address = null, ABI = null }) {
  ABI = ABI || window[key + "_ABI"];
  address = address || window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key + "-" + address.toLowerCase()]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key + "-" + address?.toLowerCase()] =
      new window.web3.eth.Contract(ABI, address, {
        from: await getCoinbase(),
      });
  }
  return window.cached_contracts[key + "-" + address.toLowerCase()];
}

function wait(ms) {
  console.log("Waiting " + ms + "ms");
  return new Promise((r) =>
    setTimeout(() => {
      r(true);
      console.log("Wait over!");
    }, ms)
  );
}

function getPrice(coingecko_id = "ethereum", vs_currency = "usd") {
  return new Promise((resolve, reject) => {
    window.$.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coingecko_id}&vs_currencies=${vs_currency}`
    )
      .then((result) => {
        resolve(result[coingecko_id][vs_currency]);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getActiveLockIdsLengthByRecipient(recipient) {
  let lockerContract = await getContract({ key: "LOCKER" });
  return await lockerContract.methods
    .getActiveLockIdsLengthByRecipient(recipient)
    .call();
}

async function getActiveLockIdsLengthByRecipientETH(recipient) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  return await lockerContract.methods
    .getActiveLockIdsLengthByRecipient(recipient)
    .call();
}

async function getActiveLockIdsLengthByToken(tokenAddress) {
  let lockerContract = await getContract({ key: "LOCKER" });
  return await lockerContract.methods
    .getActiveLockIdsLengthByToken(tokenAddress)
    .call();
}

async function getActiveLockIdsLengthByTokenETH(tokenAddress) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  return await lockerContract.methods
    .getActiveLockIdsLengthByToken(tokenAddress)
    .call();
}

async function getActiveLocksByToken(tokenAddress, startIndex, endIndex) {
  let lockerContract = await getContract({ key: "LOCKER" });
  let lockIds = await lockerContract.methods
    .getActiveLockIdsByToken(tokenAddress, startIndex, endIndex)
    .call();
  let locks = await lockerContract.methods.getLocksByIds(lockIds).call();
  return processedLocks(locks);
}

window.buyback_tokens = {
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
    symbol: "WETH",
    decimals: 18,
  },
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": {
    symbol: "WBTC",
    decimals: 8,
  },
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
    symbol: "USDC",
    decimals: 6,
  },
  "0xdac17f958d2ee523a2206206994597c13d831ec7": {
    symbol: "USDT",
    decimals: 6,
  },
  // '0x6b175474e89094c44da98b954eedeac495271d0f': {
  // 	symbol: 'DAI', decimals: 18
  // },
  // '0x514910771af9ca656af840dff83e8264ecf986ca': {
  // 	symbol: 'LINK', decimals: 18
  // }
};

window.buyback_tokens_farming = {
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
    symbol: "WETH",
    decimals: 18,
  },
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": {
    symbol: "WBTC",
    decimals: 8,
  },
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
    symbol: "USDC",
    decimals: 6,
  },
  "0xdac17f958d2ee523a2206206994597c13d831ec7": {
    symbol: "USDT",
    decimals: 6,
  },
  // '0x6b175474e89094c44da98b954eedeac495271d0f': {
  // 	symbol: 'DAI', decimals: 18
  // },
  // '0x514910771af9ca656af840dff83e8264ecf986ca': {
  // 	symbol: 'LINK', decimals: 18
  // },
  // '0xbd100d061e120b2c67a24453cf6368e63f1be056': {
  // 	symbol: 'iDYP', decimals: 18
  // }
};

window.buyback_tokens_farmingavax = {
  "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7": {
    symbol: "WAVAX",
    decimals: 18,
  },
  "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab": {
    symbol: "WETH.e",
    decimals: 18,
  },
  "0x50b7545627a5162f82a992c33b87adc75187b218": {
    symbol: "WBTC.e",
    decimals: 8,
  },
  "0x60781c2586d68229fde47564546784ab3faca982": {
    symbol: "PNG",
    decimals: 18,
  },
  "0xc7198437980c041c805a1edcba50c1ce5db95118": {
    symbol: "USDT.e",
    decimals: 6,
  },
  "0x8729438eb15e2c8b576fcc6aecda6a148776c0f5": {
    symbol: "QI",
    decimals: 18,
  },
  "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664": {
    symbol: "USDC.e",
    decimals: 6,
  },
  "0xd586e7f844cea2f87f50152665bcbc2c279d8d70": {
    symbol: "DAI.e",
    decimals: 18,
  },
  "0xd1c3f94de7e5b45fa4edbba472491a9f4b166fc4": {
    symbol: "XAVA",
    decimals: 18,
  },
  "0x5947bb275c521040051d82396192181b413227a3": {
    symbol: "LINK.e",
    decimals: 18,
  },
  "0xbd100d061e120b2c67a24453cf6368e63f1be056": {
    symbol: "iDYP",
    decimals: 18,
  },
};

window.buyback_tokensbsc = {
  "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c": {
    symbol: "WBNB",
    decimals: 18,
  },
  "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c": {
    symbol: "BTCB",
    decimals: 18,
  },
  "0x2170ed0880ac9a755fd29b2688956bd959f933f8": {
    symbol: "ETH",
    decimals: 18,
  },
  "0xe9e7cea3dedca5984780bafc599bd69add087d56": {
    symbol: "BUSD",
    decimals: 18,
  },
  "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82": {
    symbol: "CAKE",
    decimals: 18,
  },
};

const LP_IDs_V2 = {
  weth: [
    "0x7463286a379f6f128058bb92b355e3d6e8bdb219-0xa68bbe793ad52d0e62bbf34a67f02235ba69e737",
    "0x7463286a379f6f128058bb92b355e3d6e8bdb219-0xcfd970494a0b3c52a81dce1ecbff2245e6b0b0e7",
    "0x7463286a379f6f128058bb92b355e3d6e8bdb219-0x49d02cf81cc352517350f25e200365360426af94",
    "0x7463286a379f6f128058bb92b355e3d6e8bdb219-0xf51965c570419f2576ec9aead6a3c5f674424a99",
    "0x7463286a379f6f128058bb92b355e3d6e8bdb219-0x997a7254e5567d0a70329defcc1e4d29d71ba224",
  ],
};

window.LP_IDs_V2 = LP_IDs_V2;

const LP_ID_LIST_V2 = Object.keys(LP_IDs_V2)
  .map((key) => LP_IDs_V2[key])
  .flat();

const LP_IDs_V2Avax = {
  wavax: [
    "0x66eecc97203704d9e2db4a431cb0e9ce92539d5a-0x035d65babf595758d7a439d5870badc44218d028",
    "0x66eecc97203704d9e2db4a431cb0e9ce92539d5a-0x6c325dfea0d18387d423c869e328ef005cba024f",
    "0x66eecc97203704d9e2db4a431cb0e9ce92539d5a-0x85c4f0cea0994de365dc47ba22dd0fd9899f93ab",
    "0x66eecc97203704d9e2db4a431cb0e9ce92539d5a-0x6f5dc6777b2b4667bf183d093111867239518af5",
    "0x66eecc97203704d9e2db4a431cb0e9ce92539d5a-0x10e105676cac55b74cb6500a8fb5d2f84804393d",
  ],
};

const LP_IDs_V2BNB = {
  wbnb: [
    "0x1bc61d08a300892e784ed37b2d0e63c85d1d57fb-0x537dc4fee298ea79a7f65676735415f1e2882f92",
    "0x1bc61d08a300892e784ed37b2d0e63c85d1d57fb-0x219717bf0bc33b2764a6c1a772f75305458bda3d",
    "0x1bc61d08a300892e784ed37b2d0e63c85d1d57fb-0xd1151a2434931f34bcfa6c27639b67c1a23d93af",
    "0x1bc61d08a300892e784ed37b2d0e63c85d1d57fb-0xed869ba773c3f1a1adcc87930ca36ee2dc73435d",
    "0x1bc61d08a300892e784ed37b2d0e63c85d1d57fb-0x415b1624710296717fa96cad84f53454e8f02d18",
  ],
};

window.LP_IDs_V2Avax = LP_IDs_V2Avax;
window.LP_IDs_V2BNB = LP_IDs_V2BNB;

const LP_ID_LIST_V2Avax = Object.keys(LP_IDs_V2Avax)
  .map((key) => LP_IDs_V2Avax[key])
  .flat();
window.LP_ID_LIST_V2Avax = LP_ID_LIST_V2Avax;

const LP_ID_LIST_V2BNB = Object.keys(LP_IDs_V2BNB)
  .map((key) => LP_IDs_V2BNB[key])
  .flat();
window.LP_ID_LIST_V2BNB = LP_ID_LIST_V2BNB;

window.LP_ID_LIST_V2 = LP_ID_LIST_V2;

window.the_graph_result_eth_v2 = {};

window.the_graph_result_avax_v2 = {};

async function get_the_graph_avax_v2() {
  try {
    const res = await getData("https://api.dyp.finance/api/the_graph_avax_v2");
    window.the_graph_result_avax_v2 = res.the_graph_avax_v2;
  } catch (err) {
    console.log(err);
  }
  return window.the_graph_result_avax_v2;
}

window.get_the_graph_avax_v2 = get_the_graph_avax_v2;

async function get_the_graph_eth_v2() {
  try {
    const res = await getData("https://api.dyp.finance/api/the_graph_eth_v2");
    window.the_graph_result_eth_v2 = res.the_graph_eth_v2;
  } catch (err) {
    console.log(err);
  }
  return window.the_graph_result_eth_v2;
}

window.get_the_graph_eth_v2 = get_the_graph_eth_v2;

window.the_graph_result_bsc_v2 = {};

async function get_the_graph_bsc_v2() {
  try {
    const res = await getData("https://api.dyp.finance/api/the_graph_bsc_v2");
    window.the_graph_result_bsc_v2 = res.the_graph_bsc_v2;
  } catch (err) {
    console.log(err);
  }
  return window.the_graph_result_bsc_v2;
}

window.get_the_graph_bsc_v2 = get_the_graph_bsc_v2;

async function get_apy_and_tvl(usd_values) {
  let { token_data, lp_data, usd_per_eth } = usd_values;

  let token_price_usd = token_data[TOKEN_ADDRESS].token_price_usd * 1;
  let balances_by_address = {},
    number_of_holders_by_address = {};
  let lp_ids = Object.keys(lp_data);
  let addrs = lp_ids.map((a) => a.split("-")[1]);
  let token_balances = await get_token_balances({
    TOKEN_ADDRESS,
    HOLDERS_LIST: addrs,
  });
  addrs.forEach((addr, i) => (balances_by_address[addr] = token_balances[i]));

  await wait(2000);

  let number_of_holders = await get_number_of_stakers(addrs);
  addrs.forEach(
    (addr, i) => (number_of_holders_by_address[addr] = number_of_holders[i])
  );

  lp_ids.forEach((lp_id) => {
    let apy = 0,
      tvl_usd = 0;

    let pool_address = lp_id.split("-")[1];
    let token_balance = new BigNumber(balances_by_address[pool_address] || 0);
    let token_balance_value_usd =
      token_balance.div(1e18).times(token_price_usd).toFixed(2) * 1;

    tvl_usd =
      token_balance_value_usd + lp_data[lp_id].usd_value_of_lp_staked * 1;

    apy =
      (
        (TOKENS_DISBURSED_PER_YEAR_BY_LP_ID[lp_id] * token_price_usd * 100) /
        (lp_data[lp_id].usd_value_of_lp_staked || 1)
      ).toFixed(2) * 1;

    lp_data[lp_id].apy = apy;
    lp_data[lp_id].tvl_usd = tvl_usd;
    lp_data[lp_id].stakers_num = number_of_holders_by_address[pool_address];
  });

  return { token_data, lp_data, usd_per_eth, token_price_usd };
}

Object.keys(window.config)
  .filter(
    (k) =>
      k.startsWith("token_") ||
      k.startsWith("staking_") ||
      k.startsWith("stakingavax_") ||
      k.startsWith("reward_tokenavax") ||
      k.startsWith("farming_newavax_1") ||
      k.startsWith("farming_newavax_2") ||
      k.startsWith("farming_newavax_3") ||
      k.startsWith("farming_newavax_4") ||
      k.startsWith("farming_newavax_5") ||
      k.startsWith("farming_newbsc_1") ||
      k.startsWith("farming_newbsc_2") ||
      k.startsWith("farming_newbsc_3") ||
      k.startsWith("farming_newbsc_4") ||
      k.startsWith("farming_newbsc_5") ||
      k.startsWith("constant_stakingnew_new1") ||
      k.startsWith("constant_stakingidyp_6") ||
      k.startsWith("constant_stakingidyp_5") ||
      k.startsWith("constant_stakingidyp_2") ||
      k.startsWith("constant_stakingidyp_1") ||
      k.startsWith("constant_stakingnew_new2") ||
      k.startsWith("constant_stakingidypavax_3") ||
      k.startsWith("constant_stakingidypavax_4") ||
      k.startsWith("constant_stakingnew_newavax1") ||
      k.startsWith("constant_stakingnewbsc_new3") ||
      k.startsWith("constant_stakingnewbsc_new4") ||
      k.startsWith("constant_stakingnewbsc_new5") ||
      k.startsWith("constant_stakingnewbsc_new6") ||
      k.startsWith("constant_stakingnewbsc_new7") ||
      k.startsWith("constant_stakingnewbsc_new8") ||
      k.startsWith("constant_stakingnewbsc_new9") ||
      k.startsWith("constant_stakingbsc_new10") ||
      k.startsWith("constant_stakingbsc_new11") ||
      k.startsWith("constant_stakingbsc_new12") ||
      k.startsWith("constant_stakingbsc_new13") ||
      k.startsWith("constant_stakingnew_newavax2") ||
      k.startsWith("constant_stakingdaiavax") ||
      k.startsWith("constant_stakingdaieth") ||
      k.startsWith("constant_stakingdaibsc") ||
      k.startsWith("reward_token_daiavax") ||
      k.startsWith("reward_token_daieth") ||
      k.startsWith("reward_token_daibsc") ||
      k.startsWith("constant_staking_") ||
      k.startsWith("constant_stakingnew_") ||
      k.startsWith("buyback_staking1_1_") ||
      k.startsWith("buyback_staking1_2_") ||
      k.startsWith("buyback_stakingavax1_1_") ||
      k.startsWith("buyback_stakingavax1_2_") ||
      k.startsWith("reward_token_idyp") ||
      k.startsWith("reward_token_dyps") ||
      k.startsWith("token_dyp_eth") ||
      k.startsWith("token_dyp_bsc") ||
      k.startsWith("token_idyp_eth") ||
      k.startsWith("token_idyp_bsc") ||
      k.startsWith("token_dyp_bsceth") ||
      k.startsWith("token_dyp_bscbsc") ||
      k.startsWith("token_idyp_bsceth") ||
      k.startsWith("token_idyp_bscbsc") ||
      k.startsWith("reward_token_dypsavax") ||
      k.startsWith("reward_token_dypsbsc") ||
      k.startsWith("farmweth") ||
      k.startsWith("weth") ||
      k.startsWith("wethavax") ||
      k.startsWith("wethbsc") ||
      k.startsWith("farming_new_") ||
      k.startsWith("constant_stakingdai_") ||
      k.startsWith("constant_stakingidypavax_1") ||
      k.startsWith("constant_stakingidypavax_2") ||
      k.startsWith("constant_stakingidypavax_5") ||
      k.startsWith("constant_stakingidypavax_6") ||
      k.startsWith("constant_stakingnew_newavax3") ||
      k.startsWith("constant_stakingnew_newavax4") ||
      k.startsWith("new_governance") ||
      k.startsWith("new_governanceavax") ||
      k.startsWith("new_governancebsc") ||
      k.startsWith("buyback_stakingbsc1_1") ||
      k.startsWith("buyback_stakingbsc1_2") ||
      (k.startsWith("constant_stakingold_") && k.endsWith("_address"))
  )
  .forEach((k) => {
    window[k.replace("_address", "_ABI").toUpperCase()] = k.startsWith("token_")
      ? window.TOKEN_ABI
      : k.startsWith("reward_token_idyp")
      ? window.TOKEN_ABI
      : k.startsWith("buyback_stakingbsc1_1")
      ? window.BUYBACK_STAKINGBSC1_1_ABI
      : k.startsWith("buyback_stakingbsc1_2")
      ? window.BUYBACK_STAKINGBSC1_2_ABI
      : k.startsWith("stakingavax_")
      ? window.STAKINGAVAX_ABI
      : k.startsWith("reward_token_dyps")
      ? window.TOKEN_ABI
      : k.startsWith("token_dyp_eth")
      ? window.TOKEN_ABI
      : k.startsWith("token_idyp_eth")
      ? window.TOKEN_ABI
      : k.startsWith("token_dyp_bsc")
      ? window.TOKEN_ABI
      : k.startsWith("token_idyp_bsc")
      ? window.TOKEN_ABI
      : k.startsWith("token_dyp_bscbsc")
      ? window.TOKEN_ABI
      : k.startsWith("token_idyp_bscbsc")
      ? window.TOKEN_ABI
      : k.startsWith("token_dyp_bsceth")
      ? window.TOKEN_ABI
      : k.startsWith("token_idyp_bsceth")
      ? window.TOKEN_ABI
      : k.startsWith("reward_token_dypsavax")
      ? window.TOKENAVAX_ABI
      : k.startsWith("reward_token_dypsbsc")
      ? window.TOKENBSC_ABI
      : k.startsWith("farmweth")
      ? window.TOKEN_ABI
      : k.includes("weth") && !k.includes("wethavax") && !k.includes("wethbsc")
      ? window.VAULT_ABI
      : k.includes("wethavax")
      ? window.TOKENAVAX_ABI
      : k.includes("wethbsc")
      ? window.TOKENBSC_ABI
      : k.includes("reward_token_daiavax")
      ? window.TOKENAVAX_ABI
      : k.includes("reward_token_daieth")
      ? window.TOKEN_ABI
      : k.includes("reward_token_daibsc")
      ? window.TOKENBSC_ABI
      : k.includes("reward_tokenavax")
      ? window.TOKENAVAX_ABI
      : k.includes("farming_newavax_1")
      ? window.FARMING_NEW_ABI
      : k.includes("farming_newavax_2")
      ? window.FARMING_NEW_ABI
      : k.includes("farming_newavax_3")
      ? window.FARMING_NEW_ABI
      : k.includes("farming_newavax_4")
      ? window.FARMING_NEW_ABI
      : k.includes("farming_newavax_5")
      ? window.FARMING_NEW_ABI
      : k.includes("farming_newbsc_1")
      ? window.FARMING_NEWBSC_ABI
      : k.includes("farming_newbsc_2")
      ? window.FARMING_NEWBSC_ABI
      : k.includes("farming_newbsc_3")
      ? window.FARMING_NEWBSC_ABI
      : k.includes("farming_newbsc_4")
      ? window.FARMING_NEWBSC_ABI
      : k.includes("farming_newbsc_5")
      ? window.FARMING_NEWBSC_ABI
      : k.startsWith("constant_staking_")
      ? window.CONSTANT_STAKING_ABI
      : k.startsWith("constant_stakingnew_")
      ? window.CONSTANT_STAKINGNEW_ABI
      : k.startsWith("buyback_staking1_1_")
      ? window.BUYBACK_STAKING1_1_ABI
      : k.startsWith("buyback_stakingavax1_1_")
      ? window.BUYBACK_STAKINGAVAX1_1_ABI
      : k.startsWith("buyback_stakingavax1_2_")
      ? window.BUYBACK_STAKINGAVAX1_2_ABI
      : k.startsWith("constant_stakingnew_newavax3")
      ? window.CONSTANT_STAKINGAVAX_ABI
      : k.startsWith("constant_stakingnew_newavax4")
      ? window.CONSTANT_STAKINGAVAX_ABI
      : k.startsWith("buyback_staking1_2_")
      ? window.BUYBACK_STAKING1_2_ABI
      : k.startsWith("constant_stakingidypavax_3")
      ? window.CONSTANT_STAKING_IDYP_ABI
      : k.startsWith("constant_stakingnew_new1")
      ? window.CONSTANT_STAKINGNEW_ABI
      : k.startsWith("constant_stakingidyp_6")
      ? window.CONSTANT_STAKING_IDYP_ABI
      : k.startsWith("constant_stakingidyp_5")
      ? window.CONSTANT_STAKING_IDYP_ABI
      : k.startsWith("constant_stakingidyp_2")
      ? window.CONSTANT_STAKING_IDYP_ABI
      : k.startsWith("constant_stakingidyp_1")
      ? window.CONSTANT_STAKING_IDYP_ABI
      : k.startsWith("constant_stakingnew_new2")
      ? window.CONSTANT_STAKINGNEW_ABI
      : k.startsWith("constant_stakingidypavax_4")
      ? window.CONSTANT_STAKING_IDYP_ABI
      : k.startsWith("constant_stakingnew_newavax1")
      ? window.CONSTANT_STAKINGNEW_ABI
      : k.startsWith("constant_stakingnewbsc_new3")
      ? window.CONSTANT_STAKINGNEW_ABI
      : k.startsWith("constant_stakingnewbsc_new4")
      ? window.CONSTANT_STAKINGNEW_ABI
      : k.startsWith("constant_stakingnewbsc_new5")
      ? window.CONSTANT_STAKINGBSC_NEW_ABI
      : k.startsWith("constant_stakingnewbsc_new6")
      ? window.CONSTANT_STAKINGBSC_NEW_ABI
      : k.startsWith("constant_stakingnewbsc_new7")
      ? window.CONSTANT_STAKINGBSC_NEW_ABI
      : k.startsWith("constant_stakingnewbsc_new8")
      ? window.CONSTANT_STAKINGBSC_NEW_ABI
      : k.startsWith("constant_stakingnewbsc_new9")
      ? window.CONSTANT_STAKINGBSC_NEW_ABI
      : k.startsWith("constant_stakingbsc_new10")
      ? window.CONSTANT_STAKING_OLD_ABI
      : k.startsWith("constant_stakingbsc_new11")
      ? window.CONSTANT_STAKING_OLD_ABI
      : k.startsWith("constant_stakingbsc_new12")
      ? window.CONSTANT_STAKING_OLD_ABI
      : k.startsWith("constant_stakingbsc_new13")
      ? window.CONSTANT_STAKING_OLD_ABI
      : k.startsWith("constant_stakingbsc_new14")
      ? window.CONSTANT_STAKINGBSC_NEW_ABI
      : k.startsWith("constant_stakingnew_newavax2")
      ? window.CONSTANT_STAKINGNEW_ABI
      : k.startsWith("constant_stakingdaieth")
      ? window.CONSTANT_STAKINGDAI_ABI
      : k.startsWith("constant_stakingdaiavax")
      ? window.CONSTANT_STAKING_DAI_ABI
      : k.startsWith("constant_stakingdaibsc")
      ? window.CONSTANT_STAKING_DAI_ABI
      : k.startsWith("constant_stakingidypavax_1")
      ? window.CONSTANT_STAKING_IDYP_ABI
      : k.startsWith("constant_stakingidypavax_2")
      ? window.CONSTANT_STAKING_IDYP_ABI
      : k.startsWith("constant_stakingidypavax_5")
      ? window.CONSTANT_STAKING_IDYP_ABI
      : k.startsWith("constant_stakingidypavax_6")
      ? window.CONSTANT_STAKING_IDYP_ABI
      : k.startsWith("farming_new_")
      ? window.FARMING_NEW_ABI
      : k.startsWith("constant_stakingdai_")
      ? window.CONSTANT_STAKING_DAI_ABI
      : k.startsWith("constant_stakingold_")
      ? window.CONSTANT_STAKING_OLD_ABI
      : k.startsWith("new_governance")
      ? window.NEW_GOVERNANCE_ABI
      : k.startsWith("new_governanceavax")
      ? window.NEW_GOVERNANCEAVAX_ABI
      : k.startsWith("new_governancebsc")
      ? window.NEW_GOVERNANCEBSC_ABI
      : window.STAKING_ABI;
  });

async function refreshBalance() {
  //await wait(10000)
  let coinbase;
  try {
    if (!window.IS_CONNECTED) throw new Error("Wallet Not Connected!");
    coinbase = await getCoinbase();
  } catch (e) {
    console.warn(e);
  }

  let reward_token = window.reward_token;
  //console.log('coinbase' + coinbase)

  let _tvl30 = await reward_token.balanceOf(
    "0x7fc2174670d672ad7f666af0704c2d961ef32c73"
  );
  _tvl30 = _tvl30 / 1e18;

  let _tvl60 = await reward_token.balanceOf(
    "0x036e336ea3ac2e255124cf775c4fdab94b2c42e4"
  );
  _tvl60 = _tvl60 / 1e18;

  let _tvl90 = await reward_token.balanceOf(
    "0x0a32749d95217b7ee50127e24711c97849b70c6a"
  );
  _tvl90 = _tvl90 / 1e18;

  let _tvl120 = await reward_token.balanceOf(
    "0x82df1450efd6b504ee069f5e4548f2d5cb229880"
  );
  _tvl120 = _tvl120 / 1e18 + 0.1;

  let _buyback = await reward_token.balanceOf(
    "0xe5262f38bf13410a79149cb40429f8dc5e830542"
  );
  _buyback = _buyback / 1e18;

  // console.log({_buyback})

  let [usdPerToken] = await Promise.all([
    window.getPrice("defi-yield-protocol"),
  ]);
  let valueee = (_tvl30 + _tvl60 + _tvl90 + _tvl120 + _buyback) * usdPerToken;
  //console.log('usdper '+valueee)
  return valueee;
}

function get_usd_values({ token_contract_addresses, lp_ids }) {
  return new Promise((resolve, reject) => {
    fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{

tokens(where:{
id_in: ${JSON.stringify(
          token_contract_addresses.map((a) => a.toLowerCase())
        )}}) {
id
symbol
name
decimals
untrackedVolumeUSD
derivedETH
}

bundle(id: 1) {
id
ethPrice
}

liquidityPositions(where: 
{id_in: 
${JSON.stringify(lp_ids.map((id) => id.toLowerCase()))},
}) {
id
pair {
reserveUSD
totalSupply
}
liquidityTokenBalance
}
}
`,
        variables: null,
      }),
    })
      .then((res) => res.json())
      .then((res) => handleTheGraphData(res))
      .catch(reject);

    function handleTheGraphData(response) {
      try {
        let data = response.data;
        if (!data) return reject(response);

        console.log(data);

        let usd_per_eth = new BigNumber(data.bundle.ethPrice).toFixed(2) * 1;

        let token_data = {},
          lp_data = {};

        data.tokens.forEach((t) => {
          token_data[t.id] = {
            token_volume_usd_all_time:
              new BigNumber(t.untrackedVolumeUSD).toFixed(2) * 1,
            token_price_usd:
              new BigNumber(t.derivedETH).times(usd_per_eth).toFixed(2) * 1,
          };
        });

        data.liquidityPositions.forEach((lp) => {
          let usd_per_lp =
            new BigNumber(lp.pair.reserveUSD)
              .div(lp.pair.totalSupply)
              .toFixed(2) * 1;
          let lp_staked = lp.liquidityTokenBalance;
          let usd_value_of_lp_staked =
            new BigNumber(lp_staked).times(usd_per_lp).toFixed(2) * 1;
          lp_data[lp.id] = {
            lp_staked,
            usd_per_lp,
            usd_value_of_lp_staked,
          };
        });
        resolve({ token_data, lp_data, usd_per_eth });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    }
  });
}

async function get_number_of_stakers(staking_pools_list) {
  let coinbase;
  try {
    if (!window.IS_CONNECTED) throw new Error("Wallet Not Connected!");
    coinbase = await getCoinbase();
  } catch (e) {
    console.warn(e);
  } finally {
    if (!coinbase) {
      return await Promise.all(
        staking_pools_list.map(() => Promise.resolve(0))
      );
    }
  }

  return (
    await Promise.all(
      staking_pools_list.map((contract_address) => {
        let contract = new window.web3.eth.Contract(
          window.STAKING_ABI,
          contract_address,
          { from: coinbase }
        );
        return contract.methods.getNumberOfHolders().call();
      })
    )
  ).map((h) => Number(h));
}

async function get_token_balances({ TOKEN_ADDRESS, HOLDERS_LIST }) {
  let coinbase;
  try {
    if (!window.IS_CONNECTED) throw new Error("Wallet Not Connected!");
    coinbase = await getCoinbase();
  } catch (e) {
    console.warn(e);
  } finally {
    if (!coinbase) {
      return await Promise.all(HOLDERS_LIST.map(() => Promise.resolve(0)));
    }
  }

  let token_contract = new window.web3.eth.Contract(
    window.TOKEN_ABI,
    TOKEN_ADDRESS,
    { from: coinbase }
  );

  return await Promise.all(
    HOLDERS_LIST.map((h) => {
      return token_contract.methods.balanceOf(h).call();
    })
  );
}

async function get_usd_values_with_apy_and_tvl(...arguments) {
  return await get_apy_and_tvl(await get_usd_values(...arguments));
}

async function refresh_the_graph_result() {
  let result = await get_usd_values_with_apy_and_tvl({
    token_contract_addresses: [TOKEN_ADDRESS],
    lp_ids: LP_ID_LIST,
  });
  window.the_graph_result = result;
  window.TVL_FARMING_POOLS = await refreshBalance();
  return result;
}

async function refresh_the_graph_resultavax() {
  let result = await get_usd_values_with_apy_and_tvl({
    token_contract_addresses: [TOKEN_ADDRESS, TOKEN_IDYP_ADDRESS],
    lp_ids: LP_ID_LIST,
  });
  window.the_graph_result = result;
  //window.TVL_FARMING_POOLS = await refreshBalance()
  return result;
}

window.get_usd_values = get_usd_values;
window.get_token_balances = get_token_balances;
window.get_apy_and_tvl = get_apy_and_tvl;
window.get_number_of_stakers = get_number_of_stakers;
window.refresh_the_graph_result = refresh_the_graph_result;
window.refresh_the_graph_resultavax = refresh_the_graph_resultavax;

async function getActiveLocksByTokenETH(tokenAddress, startIndex, endIndex) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  let lockIds = await lockerContract.methods
    .getActiveLockIdsByToken(tokenAddress, startIndex, endIndex)
    .call();
  let locks = await lockerContract.methods.getLocksByIds(lockIds).call();
  return processedLocks(locks);
}

async function getActiveLocksByRecipient(recipient, startIndex, endIndex) {
  let lockerContract = await getContract({ key: "LOCKER" });
  let lockIds = await lockerContract.methods
    .getActiveLockIdsByRecipient(recipient, startIndex, endIndex)
    .call();
  let locks = await lockerContract.methods.getLocksByIds(lockIds).call();
  return processedLocks(locks);
}

async function getActiveLocksByRecipientETH(recipient, startIndex, endIndex) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  let lockIds = await lockerContract.methods
    .getActiveLockIdsByRecipient(recipient, startIndex, endIndex)
    .call();
  let locks = await lockerContract.methods.getLocksByIds(lockIds).call();
  return processedLocks(locks);
}

async function getMinLockCreationFeeInWei(pair, baseToken, amount) {
  let lockerContract = await getContract({ key: "LOCKER" });
  return await lockerContract.methods
    .getMinLockCreationFeeInWei(pair, baseToken, amount)
    .call();
}
async function getPairTokensInfo(pair, network) {
  let pairContract = await getContract({
    key: "PAIR",
    address: pair,
    ABI: network === 1 ? UNISWAP_PAIRETH_ABI : UNISWAP_PAIR_ABI,
  });
  let [token0_address, token1_address] = await Promise.all([
    pairContract.methods.token0().call(),
    pairContract.methods.token1().call(),
  ]);
  let token0 = await getContract({ address: token0_address, ABI: ERC20_ABI });
  let token1 = await getContract({ address: token1_address, ABI: ERC20_ABI });
  let [name0, symbol0, decimals0, name1, symbol1, decimals1] =
    await Promise.all([
      token0.methods.name().call(),
      token0.methods.symbol().call(),
      token0.methods.decimals().call(),
      token1.methods.name().call(),
      token1.methods.symbol().call(),
      token1.methods.decimals().call(),
    ]);
  return {
    token0: {
      address: token0_address.toLowerCase(),
      name: name0,
      symbol: symbol0,
      decimals: decimals0,
      contract: token0,
    },
    token1: {
      address: token1_address.toLowerCase(),
      name: name1,
      symbol: symbol1,
      decimals: decimals1,
      contract: token1,
    },
  };
}
async function getBaseTokens() {
  let lockerContract = await getContract({ key: "LOCKER" });
  let baseTokensLength = await lockerContract.methods
    .getBaseTokensLength()
    .call();
  let baseTokens = await lockerContract.methods
    .getBaseTokens(0, baseTokensLength)
    .call();
  console.log({ baseTokens });
  return baseTokens.map((t) => t.toLowerCase());
}

async function getBaseTokensETH() {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  let baseTokensLength = await lockerContract.methods
    .getBaseTokensLength()
    .call();
  let baseTokens = await lockerContract.methods
    .getBaseTokens(0, baseTokensLength)
    .call();
  console.log({ baseTokens });
  return baseTokens.map((t) => t.toLowerCase());
}

async function claimUnlocked(lockId) {
  let lockerContract = await getContract({ key: "LOCKER" });
  return await lockerContract.methods.claimUnlocked(lockId).send();
}

async function claimUnlockedETH(lockId) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  return await lockerContract.methods.claimUnlocked(lockId).send();
}

async function getLockedAmount(pair) {
  let lockerContract = await getContract({ key: "LOCKER" });
  return await lockerContract.methods.tokenBalances(pair).call();
}

async function getLockedAmountETH(pair) {
  let lockerContract = await getContract({ key: "LOCKERETH" });
  return await lockerContract.methods.tokenBalances(pair).call();
}

async function getTokenHolderBalance(token, holder) {
  let tokenContract = await getContract({ address: token, ABI: ERC20_ABI });
  return await tokenContract.methods.balanceOf(holder).call();
}
async function getTokenTotalSupply(token) {
  let tokenContract = await getContract({ address: token, ABI: ERC20_ABI });
  return await tokenContract.methods.totalSupply().call();
}
async function approveToken(token, spender, amount) {
  let tokenContract = await getContract({ address: token, ABI: ERC20_ABI });
  return await tokenContract.methods.approve(spender, amount).send();
}
async function createLock(pair, baseToken, amount, unlockTimestamp) {
  let lockerContract = await getContract({ key: "LOCKER" });

  let estimatedValue = await getMinLockCreationFeeInWei(
    pair,
    baseToken,
    amount
  );
  estimatedValue = new BigNumber(estimatedValue).times(1.1).toFixed(0);

  return await lockerContract.methods
    .createLock(pair, baseToken, amount, unlockTimestamp)
    .send({ value: estimatedValue, from: await getCoinbase() });
}

function processedLocks(locks) {
  return locks._ids.map((id, i) => ({
    id,
    token: locks.tokens[i],
    unlockTimestamp: locks.unlockTimestamps[i],
    amount: locks.amounts[i],
    recipient: locks.recipients[i],
    claimed: locks.claimeds[i],
    platformTokensLocked: locks.platformTokensLockeds[i],
  }));
}

async function createLockETH(pair, baseToken, amount, unlockTimestamp) {
  let lockerContract = await getContract({ key: "LOCKERETH" });

  let estimatedValue = await getMinLockCreationFeeInWei(
    pair,
    baseToken,
    amount
  );
  estimatedValue = new BigNumber(estimatedValue).times(1.1).toFixed(0);

  return await lockerContract.methods
    .createLock(pair, baseToken, amount, unlockTimestamp)
    .send({ value: estimatedValue, from: await getCoinbase() });
}

function processedLocks(locks) {
  return locks._ids.map((id, i) => ({
    id,
    token: locks.tokens[i],
    unlockTimestamp: locks.unlockTimestamps[i],
    amount: locks.amounts[i],
    recipient: locks.recipients[i],
    claimed: locks.claimeds[i],
    platformTokensLocked: locks.platformTokensLockeds[i],
  }));
}

// ======================== subscription contract functions ================================

async function subscriptionPlatformTokenAmount(account) {
  if (account) {
    let subscriptionContract = await getContract({ key: "SUBSCRIPTION" });
    return await subscriptionContract.methods
      .subscriptionPlatformTokenAmount(account)
      .call()
      .then();
  }
}

async function subscriptionPlatformTokenAmountETH(account) {
  if (account) {
    let subscriptionContract = await getContract({ key: "SUBSCRIPTIONETH" });
    return await subscriptionContract.methods
      .subscriptionPlatformTokenAmount(account)
      .call()
      .then();
  }
}

async function subscribe(tokenAddress, amount) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION" });
  return await subscriptionContract.methods
    .subscribe(tokenAddress, amount)
    .send({ from: await getCoinbase() });
}

async function unsubscribe() {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION" });
  return await subscriptionContract.methods
    .unsubscribe()
    .send({ from: await getCoinbase() });
}

async function getEstimatedTokenSubscriptionAmount(tokenAddress) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION" });
  return await subscriptionContract.methods
    .getEstimatedTokenSubscriptionAmount(tokenAddress)
    .call();
}

async function getEstimatedTokenSubscriptionAmountETH(tokenAddress) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTIONETH" });
  return await subscriptionContract.methods
    .getEstimatedTokenSubscriptionAmount(tokenAddress)
    .call();
}

// ===================== end subscription contract functions ================================

// ========= favorites functions ==========

async function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || `[]`);
}
async function isFavorite(pairId) {
  let favorites = await getFavorites();
  return favorites.some((f) => {
    if (f.id == pairId) {
      return true;
    }
    return false;
  });
}
async function toggleFavorite(pair) {
  if (!pair) return false;
  let favorites = await getFavorites();
  let foundIndex;
  if (
    favorites.some((f, i) => {
      if (f.id == pair.id) {
        foundIndex = i;
        return true;
      }
      return false;
    })
  ) {
    favorites.splice(foundIndex, 1);
  } else {
    favorites.push(pair);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites, null, 4));
}

async function getPangolinRouterContract(
  address = window.config.pangolin_router_address
) {
  return new window.avaxWeb3.eth.Contract(window.PANGOLIN_ROUTER_ABI, address, {
    from: undefined,
  });
}

async function getPancakeswapRouterContract(
  address = window.config.pancakeswap_router_address
) {
  return new window.bscWeb3.eth.Contract(
    window.PANCAKESWAP_ROUTER_ABI,
    address,
    { from: undefined }
  );
}

async function getUniswapRouterContract(
  address = window.config.uniswap_router_address,
  abi = window.UNISWAP_ROUTER_ABI
) {
  return new window.infuraWeb3.eth.Contract(abi, address, { from: undefined });
}

async function getPriceiDYP() {
  let amount = new BigNumber(1000000000000000000).toFixed(0);
  let router = await window.getPancakeswapRouterContract();
  let WETH = await router.methods.WETH().call();
  let platformTokenAddress = window.config.BUSD_address;
  let rewardTokenAddress = window.config.reward_token_idyp_address;
  let path = [
    ...new Set(
      [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
        a.toLowerCase()
      )
    ),
  ];
  let _amountOutMin = await router.methods.getAmountsOut(amount, path).call();
  _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
  _amountOutMin = new BigNumber(_amountOutMin).div(1e18).toFixed(18);
  return _amountOutMin;
}

window.getPriceiDYP = getPriceiDYP;

async function getPriceiDYPAvax() {
  let amount = new BigNumber(1000000000000000000).toFixed(0);
  let router = await window.getPangolinRouterContract();
  let WETH = await router.methods.WAVAX().call();
  let platformTokenAddress = window.config.USDCe_address;
  let rewardTokenAddress = window.config.reward_token_idyp_address;
  let path = [
    ...new Set(
      [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
        a.toLowerCase()
      )
    ),
  ];
  let _amountOutMin = await router.methods.getAmountsOut(amount, path).call();
  _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
  _amountOutMin = new BigNumber(_amountOutMin).div(1e6).toFixed(18);
  return _amountOutMin;
}

window.getPriceiDYPAvax = getPriceiDYPAvax;

async function getPriceiDYPEth() {
  let amount = new BigNumber(1000000000000000000).toFixed(0);
  let router = await window.getUniswapRouterContract();
  let WETH = await router.methods.WETH().call();
  let platformTokenAddress = window.config.USDC_address;
  let rewardTokenAddress = window.config.reward_token_idyp_address;
  let path = [
    ...new Set(
      [rewardTokenAddress, WETH, platformTokenAddress].map((a) =>
        a.toLowerCase()
      )
    ),
  ];
  let _amountOutMin = await router.methods.getAmountsOut(amount, path).call();
  _amountOutMin = _amountOutMin[_amountOutMin.length - 1];
  _amountOutMin = new BigNumber(_amountOutMin).div(1e6).toFixed(18);
  return _amountOutMin;
}

window.getPriceiDYPEth = getPriceiDYPEth;

async function getFavoritesETH() {
  return JSON.parse(localStorage.getItem("favoritesETH") || `[]`);
}
async function isFavoriteETH(pairId) {
  let favorites = await getFavoritesETH();
  return favorites.some((f) => {
    if (f.id == pairId) {
      return true;
    }
    return false;
  });
}
async function toggleFavoriteETH(pair) {
  if (!pair) return false;
  let favorites = await getFavoritesETH();
  let foundIndex;
  if (
    favorites.some((f, i) => {
      if (f.id == pair.id) {
        foundIndex = i;
        return true;
      }
      return false;
    })
  ) {
    favorites.splice(foundIndex, 1);
  } else {
    favorites.push(pair);
  }
  localStorage.setItem("favoritesETH", JSON.stringify(favorites, null, 4));
}
// ======= end favorites functions ========

// -----------------
async function getMainToken(pair, network) {
  let mainToken = pair.token0 || {};

  if (network === 1) {
    for (let token of window.config.baseEth_tokens) {
      if (mainToken.id == token) {
        mainToken = pair.token1;
        mainToken.__number = 1;
        mainToken.__base_number = 0;
        break;
      } else if (pair.token1.id == token) {
        mainToken = pair.token0;
        mainToken.__number = 0;
        mainToken.__base_number = 1;
        break;
      }
    }
    return mainToken;
  }

  if (network === 43114) {
    for (let token of window.config.base_tokens) {
      if (mainToken.id == token) {
        mainToken = pair.token1;
        mainToken.__number = 1;
        mainToken.__base_number = 0;
        break;
      } else if (pair.token1.id == token) {
        mainToken = pair.token0;
        mainToken.__number = 0;
        mainToken.__base_number = 1;
        break;
      }
    }
    return mainToken;
  }
}
// ------------------

// helper functions for csv json and file reading
// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = strDelimiter || ",";

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    // Delimiters.
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while ((arrMatches = objPattern.exec(strData))) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    var strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return arrData;
}

function csvToJSON(csv) {
  csv = csv.trim();
  let arr = CSVToArray(csv);
  return arr.slice(1).map((a) => {
    let res = {};
    arr[0].forEach((field, i) => (res[field] = a[i]));
    return res;
  });
}

function readAsText(file) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.readAsText(file);
  });
}

window.sign = async function (msg, account) {
  let signature = await window.web3.eth.personal.sign(msg, account);
  return signature;
};

//Check If Whitelist
const whitelistWod = [
  "0xbfa3b43b735971b7f1a92028a975b44e1dfc157a",
  "0xb4bd860f00df73559fa73df86ddb644f1a1c4ff3",
  "0x73b679f48dfa71e044b8eee478d22622dbdcb806",
  "0x503e291591bcb6eb2e049151bbd1a7a288dfd76b",
  "0x920add42a7a9436ad4dffae0e7b391790662c284",
  "0x1bad546fa916d4a6405127e448b81ee3e829f9fa",
  "0x92851633192abe05b58fb27f1199d26d208e1dcb",
  "0x47a0a70225edd77eaf79eadf4f15732e19862bc6",
  "0x9f12e8f4cac299963d7ac249d4d0084297896107",
  "0xb50930f5be47d5b585b0b2ca27086c7f28468b5b",
  "0x8f123e882570baa36f9642b8bd4fcf4e5315a4d2",
  "0xf1b4d55cf1d309e3c1914aa6025d90ffd24910f9",
  "0x81cdc5fc29a3bb4396afa87631cf4337b2c1284a",
  "0x37f9c04ef8cdff17f2d68711a5c4ad41869af5f7",
  "0x8c999b813a7b5ca3852f814a63ea5621f2255da9",
  "0x828471c2cee64a8b146d82c46f39c1889810ab1d",
  "0xbb504f45adb368da44ccbb50f5142faa648c755b",
  "0x0291a10ff53fedf62100c1051e93aa52544be85a",
  "0x13b8dacbed3be5709d6ff9639f185585b5258c9c",
  "0x3d4c4cfe87c2df38f810df1c27fd0859ac7fd740",
  "0xf72131e357295ddbed1c478096bb81d90eff0c19",
  "0x1d252a8fa5c7d43ecbc4f2b93cc7b2ab8991d781",
  "0x9bd215c2530df574657510b2f991d5c326df7c50",
  "0x9bd215c2530df574657510b2f991d5c326df7c50",
  "0xe28ab3d49c26545cf08796d93fd5ee02dc49c1b7",
  "0xeedadfae3c9bbdabf5578c45aaa8cf10e80d6e92",
  "0x979a033cf8e31c6498ae1a6e6be9109fa7a72ee7",
  "0x4d028ada9d9ba5afed3208a799701eeda9ae4bff",
  "0xc2cb073425e020fd827c81ae67b681f660df9f9a",
  "0xa1f1b0daa0710b30f05194b12d0e1c47955032fe",
  "0xd791c5de7f4b75b5f2dd3d5248ed26341461c09c",
  "0x234774d577cb9a1467a1ab31a06b1bbff03f84b8",
  "0x21ee40a8b02119b029e4b9ff5551213004b5bcdb",
  "0x2d9226d88bab5c6e415be3eb93a067c063fc5c19",
  "0x6529770a5c58ca859558670cf98171f600c48783",
  "0xd77a670cf55d8b8f2791beb96ac47eed2c413241",
  "0x76bdbe477255820df76d000262f1b9773f5d922a",
  "0x60665bd249ba71d1cb75da5b6ecbfdc3703b3950",
  "0xc0251e954e67017ab5fde7bd2facd925e6778406",
  "0xb8cbd2896a27cea37bfc39acef8811d75585572b",
  "0xced44fb4d0f9cacef76cdfa6edc78dc11284b4b2",
  "0x75c88d2149e00a36dddb997faf674ec9b57aeb73",
  "0x8ce5c2b49089bbeb6173137019ddcbabfa8276f0",
  "0x49d4baf8465ce72da405458f5635619a21022b22",
  "0xf15ee7b396475de1229cf92a212bcb250fff1ccc",
  "0x2ba243ef5cff72ea821e9109d68286adddfe0279",
  "0x6f28e5b5a55bbd7be2a1c17f4ea32ed9c7d73b4b",
  "0x19787048eb08de0c1d0fb7a51752c8fa1d3814b9",
  "0x2a80c4be3b962b8db3d5a519d56f04edce5a8dfd",
  "0xb177088734dda47416eb30aec84fbd8f3177b515",
  "0xe657c3e26fd319acac6273abbfb4dc3eb0e2c49b",
  "0x97be1f96f08d5af265eab898e4c2dd076ec8ccdd",
  "0xc1da2e6dec41e2bc8b34422e1e59723059657066",
  "0x622372558a8d49a227938f7cd2b5c581a042964e",
  "0xcf1728d1fbed97e4e15d0a6af71bf9dcb8f46654",
  "0xb2a59e64d94e43d789b62c673acdeaf5c6e70a5e",
  "0x12d4904805b9eda9cb577c099fed72ca47c46d95",
  "0x64f24a7dee68ccec0fdeaf79eb327539a7576634",
  "0x08abd50a1979f58a65c0966bba8927505aebbf57",
  "0xc9381c06059cad8b6c7860cd116ca41e16a0f73d",
  "0xb7573910c7479960ea498f7e61911229817c5bd3",
  "0x3e769d1b5d29a83afaa7eca0e028249e9c174e2b",
  "0x42a59a666c53558dfa793e6fe06237598f891ee9",
  "0x03a64c9412284e7f6102eb67a9eac6c780a81032",
  "0x0c071f47eb96c3e31e8e01290b2dc4d905eef433",
  "0x429ec7235f923c067e07d7eb93bd650a81775748",
  "0x39d82367cc29ff6840e1d56ade946b955a705e7c",
  "0x21babda7c3002042e059387db06bc2a10f93d39b",
  "0xe1f456ea28d8dca19bfff0c0cc43f4db4b3f3ba4",
  "0x4a672eb72eaba39d45e98d2e336e9ae2002166ef",
  "0xbaaeb8d1846cf8d1fa29d616deeb5cc45181658c",
  "0x347cf753824146e26cbb6cfee169086b3f27b921",
  "0xc2442976d2d6de1c9588181d60e2bf72fffc472f",
  "0xb4e6a7e57b4153d74a64c02d63e840d430675dbd",
  "0xa0fa292f4ad1b0083804c06b1d78b116a7731cde",
  "0x9413935b832319c0275a36b7988dc93857ae777c",
  "0xe05bc0f8ce96b65dc319c855958e216b63cfdc72",
  "0x5bb35886f7ec42c9873b2836d2dff00bb06fad45",
  "0x7324abfacdc816d9e06172cbd79ada05c07b5dbf",
  "0x11256234244fb6bbdee711c9107e547caab91851",
  "0x392561fc3183480822dec998113d576efbec9839",
  "0xf616a6be7c0130014ea0dce60289c58cc94e00e1",
  "0x2a69edeb31dcc5ad2e4da6d648401a4552b69906",
  "0xe7d295c06ae892758885426edcc1cd0b0ce122a5",
  "0x9ffeaa0c610c4339556bf88d748f989fe316c943",
  "0xbd4a14aa8c27927f19950335b49ddfe82ab7bc54",
  "0xb262844a841c5a3fde9a962bd8996c3814896a65",
  "0x6caa65efd794163141f7a0a44d6f93f3146e4dff",
  "0x8bad14e9f9010814aa50310dc934e78b3bd9ca1a",
  "0xfc43cba5c7bb78d565079a8e76971fb2fc4dccd4",
  "0xb774200df2b6d617d193178cdfb2b5115855dd68",
  "0xe4d01165c34e7d207e50b673f9ad38bffd00f517",
  "0x4a5c32b9dbba6e32babf2ff13a08fa162924b401",
  "0x73c126c293a88d0a4e9c017e0a777517d48bd5be",
  "0xb2578c02826e883b7b1fe6c55963f40fed8ae079",
  "0xca98a7db93e53aa7381461f728a481a941a590b5",
  "0x170ff9ce71675ce4a1a6cbe72ba4431eedf71cd5",
  "0x172e991b2c0bc4e905654eec9d04d9604303c2c0",
  "0x6ea0e36beeb42641e2e3b4a88219e77fe54e0712",
  "0x49b2de680b7a83545f3f5d15c8d95df11b9f26fc",
  "0x6e2c266a5fd854373ede37cdcb1bf3eb06900b07",
  "0x59547d1673f04609dba8cb9d9d3102abec4317af",
  "0x5db8f919587c9f1d868a5994231e9fefc4700f7e",
  "0xa943c7d3b199334183d65469d2972372e5ac7f8a",
  "0xfceb7a8207e8759963765f733bfca1a3a82e24c6",
  "0x8c57d1fab10d4b78f49ef5c6abaeb76a63710f61",
  "0xd270c803abeb4d1f35bb5697f9172e4d044e2051",
  "0x265ac6c4033f7a63d9c89c88610dbdb083135cc2",
  "0x8da949296edda669dae40be005512a6b5298135f",
  "0x54bd473c26579a968fdb5d64daeadd7b4c8bae29",
  "0x4f778a23c55283fe2e9dabaee9ab1cf2fa11dcf6",
  "0x178173627aa2f703e1a4adb549791acee019b283",
  "0xc59ec8c7ff8956548faa70107b0782e4d483ed7d",
  "0xf6f5551ee425b92789cfff72e1dffa70c6d63cf5",
  "0x9da87927cef8e7549030f55a42acce9a46753acd",
  "0x35778b3fd55fe9369fd4d50dd33d69c8afc42ef4",
  "0xd7a9b931e2e2534ec6d6079e6f57912e909d3e50",
  "0x9496ca407ffa02a124bac9d7c2c937a4cb89d62f",
  "0xad28156b17e658a4d7b1cbef01bee22abc0ebdb1",
  "0x59547d1673f04609dba8cb9d9d3102abec4317af",
  "0x14f2faade4a6eefae6307a9a1ce19738aba325dc",
  "0x5e69c396dc34e444db2a19f5458a69308d678ce8",
  "0x2b36cb9b3f00e1bda4aade7153e656cdf7c873c2",
  "0x1d900608c195f76f746e793cea49394913400168",
  "0xefd763902f9e303c24890d4e9f3fc615f0afebe1",
  "0x4d3b5ebf6eae495a140db8992d7715c056dc95a8",
  "0x941e806fdb94ebac7cd02dd63252e7c327379e8a",
  "0x8d19ed8e4f501a54979cafdd90cd0ddde3336722",
  "0x0438331A6fb1ef9ac41cb80c896658Ee572F364C",
  "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
  "0x13b8fd026872d7808997758bdabb2a5a3d39cbfe",
  "0xa2d2ed6f0c672be216c03982f4ea61d5e0e4d1df",
  "0x1ffa5ef4b180e7b64e21d891a2aba5891fd85aa8",
  "0xd4a4f83c30ba91b0a969c8e3811233ed30a4b05d",
  "0x6a9ad3289ad6bc4ad0945e51629064d3bbdb3d48",
  "0x51aad148488d9ec7ebea8c4deec9bde15194106b",
  "0xd920af54662e86f329da602873fd0dfe6d86982a",
  "0x960eda0d16f4d70df60629117ad6e5f1e13b8f44",
  "0x8d50ad9de85255401129d81a06e4049f32821e24",
  "0xb6d7e6628a6d0d706b5e7e3b078ba2b9c214fcde",
  "0xb5dc04cff504fd506a3a21b0baf4df5de0211d2f",
  "0x671770eaa4b019393f67cef2cc843b9c5f286304",
  "0xd66472c25d7ccc0b814180407640f36a706ad3e5",
  "0x94443aed6c67c4201e7eb46ade63d5cc40eb7fb9",
  "0xebefa67c8e68c9573d4f1933ffeab17182284ec1",
  "0x0af2f3d482001c5199701bfc4cb63fc775d6f689",
  "0x24174fd426a8beee90b78169a4b00d1a2d3e571c",
  "0x28b536a579e16b647f14a7c54f97adc0f594b475",
  "0x23d38ff3e9d41ed3c50a6b008298ae1be1eda297",
  "0x0d62d1133c2ae1785176eea30690759256a07c66",
  "0x6200a100946552f6942da822e995b586ba51204a",
  "0x6b0132a0f4662723004c293e832a2466db61b06d",
  "0x9489390a4c8376db845fcda9bfa759ccb710a37b",
  "0x147ea850d6f23181f6f80fdb5a2bc299df1868ac",
  "0x6c5f4f77c58772b8d5bb0407a934e75e3947a669",
  "0x9e7fe97f839e87f07275626bd5a03b6444dad3f7",
  "0xf5a3f1bb59ae817e161dc97e47ffab9107eeafe4",
  "0x77bae3e8d71689fcb35b9e0376079702a5d1915e",
  "0xbb7a8487a05be848bc62d1e0036f64a5496abfea",
  "0xfef0c1d91a2dde8dd6002b9fbc3e403b2cf88884",
  "0x30c7d0aa435ca2c414fb3e5f31fd8f7651beb8fc",
  "0x33f8976a3488902ccba35a9197117a9b856fb143",
  "0x7401d3124baa16656efe01b6a7122b2ff9e96cc8",
  "0x414999d576ff131ccf1dbf76bb175563166d6476",
  "0x559455e9ae1a86b0840685cf92addf4a5b32bce2",
  "0x2d36d2658b46c509ecc9bb68d7844bb3ef9d337a",
  "0xd83469ff289a0fd7a98c26689943c0ca8de03d7e",
  "0x5e1906899ac4b454e840290faa96bd0f9e3a88cf",
  "0xbe1c4a5a25992dc8ac41f9b4de3c1c799639221c",
  "0xdd73df015f3b712a6932fae799e51ac917fecb54",
  "0xf3d820fc48e80f1a318d946cf3faecc9b3d80599",
  "0x67ee75827371638321c9ea81dea27e3370a7ba0d",
  "0xc968bb73e0999e604b4b410da6c585d58d28e221",
  "0xd2db5c04d2a527f6f9897b7a9d0379b263e6007f",
  "0x600967f935524f808a624fe3a3a2593500dad3fa",
  "0xa8517fd6063c55256f9afbdbd3aa4e472ad1ac3c",
  "0xb4a6e29df57d98b66e1ea26232700bd47b7c57c4",
  "0x8010b39a468fc2a05b7f213bdbdec8ac1b3cb24f",
  "0x7bc43c0bb798f84de89a0a98f52a57b9efa0c15b",
  "0xcb1bed7aad114ac09905690e307b53b6441efba7",
  "0x84d00bb2d24841114ec2b9687c8b9fbce7b6ac1c",
  "0xc0d5ca5c9a43668a0c85ab939b63fd6e0875a997",
  "0xdb2b2055ef195d8c778f282b49a115fe46c9e8f0",
  "0x743bb8871ca88eb46cb87508ceaf9163e0633dd4",
  "0xe042fa4fe111faaf2b213b1e247bf5814c19a718",
  "0xf0b40915a330ce3d4a966e4b7973541ada5ea6ab",
  "0x00f08f13f8a066f48034dbd908e29978fccdb9f5",
  "0x29b70f604a87ac4cfa91b90132ccee9ef5893dc3",
  "0xcf24651bb1902c365cafbd2a9aef6391df017f72",
  "0xbfa3b43b735971b7f1a92028a975b44e1dfc157a",
  "0xbf8bc0660f96b1068e21e0f28614148dfa758cec",
  "0xb4bd860f00df73559fa73df86ddb644f1a1c4ff3",
  "0x2ae08a25d49d4d57fff9a15e7bce6dbb1789e2e6",
  "0x99b96b1905aa5ae769a20d8e41c9b5738a13e73b",
  "0x73b679f48dfa71e044b8eee478d22622dbdcb806",
  "0xea50109b21802b3d4867cf52f690a1bb1d7fb3e5",
  "0x503e291591bcb6eb2e049151bbd1a7a288dfd76b",
  "0xc8422b5a4a51031699e075a12513f6f5df41e00c",
  "0x920add42a7a9436ad4dffae0e7b391790662c284",
  "0x1bad546fa916d4a6405127e448b81ee3e829f9fa",
  "0x47a0a70225edd77eaf79eadf4f15732e19862bc6",
  "0xcab7842b75d02a5ac9bcf779a849a6bcab6a9664",
  "0x9f12e8f4cac299963d7ac249d4d0084297896107",
  "0xb50930f5be47d5b585b0b2ca27086c7f28468b5b",
  "0xf1b4d55cf1d309e3c1914aa6025d90ffd24910f9",
  "0x81cdc5fc29a3bb4396afa87631cf4337b2c1284a",
  "0x37f9c04ef8cdff17f2d68711a5c4ad41869af5f7",
  "0x8c999b813a7b5ca3852f814a63ea5621f2255da9",
  "0x828471c2cee64a8b146d82c46f39c1889810ab1d",
  "0xbb504f45adb368da44ccbb50f5142faa648c755b",
  "0x0291a10ff53fedf62100c1051e93aa52544be85a",
  "0x13b8dacbed3be5709d6ff9639f185585b5258c9c",
  "0x629798e85666c5b0c7b315e6a5906273def876ad",
  "0x2c17e456422eb2ac9e2c264b15bab7767c4f5246",
  "0xf72131e357295ddbed1c478096bb81d90eff0c19",
  "0x1d252a8fa5c7d43ecbc4f2b93cc7b2ab8991d781",
  "0x9bd215c2530df574657510b2f991d5c326df7c50",
  "0x9feac18007e38c8fba5d5bf07ff04746f64d169e",
  "0xeedadfae3c9bbdabf5578c45aaa8cf10e80d6e92",
  "0x05b67957d6e29823f7b1321f6160a6b092ba7e6a",
  "0x979a033cf8e31c6498ae1a6e6be9109fa7a72ee7",
  "0xfc0cce2655a2c5d2b9514930cc6d2cabec57b0f3",
  "0xc2cb073425e020fd827c81ae67b681f660df9f9a",
  "0x703ca7ac43aba29f05ce50073d3ad176a8cede6f",
  "0xf8b67cb149daa87998ac0fc42a6861945b985aed",
  "0x5b0ddbae8c169a853a8814094ba24875431a1000",
  "0xa1f1b0daa0710b30f05194b12d0e1c47955032fe",
  "0xd791c5de7f4b75b5f2dd3d5248ed26341461c09c",
  "0x4e81fb3af1c818591434cc8506a4fbe002349972",
  "0x234774d577cb9a1467a1ab31a06b1bbff03f84b8",
  "0x21ee40a8b02119b029e4b9ff5551213004b5bcdb",
  "0x6529770a5c58ca859558670cf98171f600c48783",
  "0xd77a670cf55d8b8f2791beb96ac47eed2c413241",
  "0x17cb130926d59317117957d8a30156a079636535",
  "0x76bdbe477255820df76d000262f1b9773f5d922a",
  "0x60665bd249ba71d1cb75da5b6ecbfdc3703b3950",
  "0xf59d2be7d73a83e9a0389bb550ba648786f12114",
  "0x7988ee000eb39eaaee84155316bfcd266398fb9e",
  "0xf690cdbfb7546deedd96fa937526ddfc87a3003f",
  "0x44daf7505ebb2f73537867b8fffa30d8eb582c4a",
  "0xedac8a8365add6ad21dbb443c42d5007309b2934",
  "0xc0251e954e67017ab5fde7bd2facd925e6778406",
  "0xb8cbd2896a27cea37bfc39acef8811d75585572b",
  "0x8463967042bb2bb2528002f73aca94a5b2b3dccb",
  "0x5ac5acba1935802bdc18343f71d9b7b73cf84a31",
  "0x1d017c971f32f8ae87e7cce8e31d90dec2dd46c6",
  "0x4a27bfd91b30efaf08706d2105e5d8a1ad09ff0c",
  "0x656e9b3ddfa1f5acc885e19ee706a461c0ee589e",
  "0xbc9a6ea3e32b05e87f3e3e0ddbb23fc0c62c61f3",
  "0x2ba50bb445549c3c7976eca67a60887e0b7b660a",
  "0x76f0f370916b8fa80d1ff132a1ad0e2a7a6c5265",
  "0xced44fb4d0f9cacef76cdfa6edc78dc11284b4b2",
  "0x75c88d2149e00a36dddb997faf674ec9b57aeb73",
  "0xc2d1369b3d2d9c4261f8bc6b406e18c0c722bd7a",
  "0x49d4baf8465ce72da405458f5635619a21022b22",
  "0xf15ee7b396475de1229cf92a212bcb250fff1ccc",
  "0x2ba243ef5cff72ea821e9109d68286adddfe0279",
  "0xd1918ff68722e322dec234d99c4bb2280a563209",
  "0x6f28e5b5a55bbd7be2a1c17f4ea32ed9c7d73b4b",
  "0xcef9a7b6a7fcff94252a13f2234348a2b97b6b0f",
  "0x19787048eb08de0c1d0fb7a51752c8fa1d3814b9",
  "0x2a80c4be3b962b8db3d5a519d56f04edce5a8dfd",
  "0x39dd00a51f2e09003ada326cc34309d800a5b275",
  "0x6d27416c463189adf9434c085013c0b20166938d",
  "0x5e3d12fc5e0eda07f33fd6becf5c07915e96022e",
  "0xaa72ede49e3feda4bd7901b4a7eb99e14267af84",
  "0xb177088734dda47416eb30aec84fbd8f3177b515",
  "0xe657c3e26fd319acac6273abbfb4dc3eb0e2c49b",
  "0x89ccc78ef8bfcead5351ebaa1fa59e7fb48e9549",
  "0xc1da2e6dec41e2bc8b34422e1e59723059657066",
  "0x416907b94b2550491495083048bc4872e8b12593",
  "0x4e53313f575acb89788e455299fe0686cde941e5",
  "0x350061d5b3b09fd44691f22fd9ded9a5693ed41f",
  "0x3f12cdefef0568c8ab6df6f02513713b2bc125e2",
  "0x235594f2dd98d224fcf2b0dcbb02936aa9e1c38f",
  "0x12d4904805b9eda9cb577c099fed72ca47c46d95",
  "0xacb2a1e9e3f7f690b41d2430152fba5f3e2212ba",
  "0xf8af3737c88c98691b664943dca84967aeab1e41",
  "0xc0a3fc33d046860b59e61f4fa65b18af31e1433a",
  "0x64f24a7dee68ccec0fdeaf79eb327539a7576634",
  "0x08abd50a1979f58a65c0966bba8927505aebbf57",
  "0xc9381c06059cad8b6c7860cd116ca41e16a0f73d",
  "0x327113a4db6f7501730470ff24a31ae2902d3cdf",
  "0x1060100673d8f9cbedebf7562d6ca5d4ba54b63e",
  "0x3e769d1b5d29a83afaa7eca0e028249e9c174e2b",
  "0x1c4e8e9dea29f6f38ef1c2fbea1185942f94c65d",
  "0x9cf4dbab25fd916d09f73217b6852cc2347d14ba",
  "0xa93f416e8452b131a3b5f235be8790af2b3fec57",
  "0x41db5400de1f16276eac64f1136f0e9fe676445f",
  "0xd2f015427658c510abc0bf9073db9f69782752b7",
  "0xd1c1fca07c6a2dfca4bf07a273324c8837d00a6a",
  "0x03a64c9412284e7f6102eb67a9eac6c780a81032",
  "0x35fc77ab8f5e9be49a181e2d7cdd5c08cf52c8a8",
  "0x0c071f47eb96c3e31e8e01290b2dc4d905eef433",
  "0x59ae48ed57e94bcf9b1d5cf13a9bd01eced5ba94",
  "0x429ec7235f923c067e07d7eb93bd650a81775748",
  "0xa3b4bc9f9c6fea15a6d5bc8f59f7e210065e8b3a",
  "0x39d82367cc29ff6840e1d56ade946b955a705e7c",
  "0xdf17764870cabf8fbaad998492c9f12fc260b6fc",
  "0x21babda7c3002042e059387db06bc2a10f93d39b",
  "0x30c98ab8fb66212634bf284f3c13b1e1fe61b3ce",
  "0xe1f456ea28d8dca19bfff0c0cc43f4db4b3f3ba4",
  "0x347cf753824146e26cbb6cfee169086b3f27b921",
  "0xc2442976d2d6de1c9588181d60e2bf72fffc472f",
  "0x8639e50d0eeed386949331cc3b48b7a12baf541d",
  "0xddfcd222fdaeda31c8bfb673866d4c20b2622d3a",
  "0x77d5ec1a7978a1d54273e92a673dc2259e7756c2",
  "0x38304b46ff309bc524fc0c90bca03db9ff9afad9",
  "0x153619c8bf47bdbc411302ea72487b32bb95d2cb",
  "0xd9e037169451fa8d7dbf514203f0dbf067765693",
  "0xe972b09e8f2448a79f12ab2c984eb6117985a9da",
  "0x5c3e16ed75138ca7021ea8f24f755b9de89b3b9c",
  "0x5bb35886f7ec42c9873b2836d2dff00bb06fad45",
  "0x07dd60985db175c7ecd44331a2c48119cf8f6a03",
  "0x11256234244fb6bbdee711c9107e547caab91851",
  "0x34de24418718269fc370fa673e262a921fb6f75f",
  "0x392561fc3183480822dec998113d576efbec9839",
  "0x000007cdf16e8173c035ec44e4d8a407d214f0f3",
  "0xf824793cf1ae271a22e3d20614e7f3041cce043f",
  "0xe06b33aacf760e52a8b837f7addef7519a8b8371",
  "0x987178f3752a80487cdb5ff172d492fe3be80144",
  "0xf57c18d5836241342a12d1e935e151a7e130e44f",
  "0x2a69edeb31dcc5ad2e4da6d648401a4552b69906",
  "0x61aaf45fdb4f181fe646cb82212df49575e71b9d",
  "0xe7d295c06ae892758885426edcc1cd0b0ce122a5",
  "0xaf8952de32d5f2e173e163776945265d52531c75",
  "0x4481473812b323d4bc7cefd17118e3973209f5c4",
  "0xf423f82af87ca2d3f335be1daff376e3a431fced",
  "0x6caa65efd794163141f7a0a44d6f93f3146e4dff",
  "0x0000001089167600c25258da29d2e2c857ec1689",
  "0x80ec7cafd05866b9f52e9b373d2579473db58d60",
  "0x550ebde054c56688c949593a4796221583953b0e",
  "0xfc43cba5c7bb78d565079a8e76971fb2fc4dccd4",
  "0xd23696c6fce464f32334a12fe2434b5a92d02f99",
  "0x5fa69d29fe6f3e8f2cf567a8d990747b09432cbb",
  "0x483a305f1827ed8b3e141a5abad714891c17db89",
  "0x73da5694d059ab08250f94d3c205fb4d1df3c040",
  "0x03e6b39c028806f69d911000aa44f389a89e4f31",
  "0x59e634af73c8390320e32652ad9830bf116d8ec5",
  "0xb774200df2b6d617d193178cdfb2b5115855dd68",
  "0xe4d01165c34e7d207e50b673f9ad38bffd00f517",
  "0x02d4d4b5837975d730468a46a51d2ece70427793",
  "0x777e794f0d907d712c0ba2d08ed364111aefe860",
  "0xa5b509313d1391a796dcbb440d099e8fdb96535c",
  "0x73c126c293a88d0a4e9c017e0a777517d48bd5be",
  "0xb2578c02826e883b7b1fe6c55963f40fed8ae079",
  "0xca98a7db93e53aa7381461f728a481a941a590b5",
  "0x170ff9ce71675ce4a1a6cbe72ba4431eedf71cd5",
  "0x172e991b2c0bc4e905654eec9d04d9604303c2c0",
  "0xc4bc4dc7feb7852ee9ae92fe9f7dd003aaf396ca",
  "0x2497011dcea9b19a04b0272e6b5b062ed0aa10c3",
  "0x6ea0e36beeb42641e2e3b4a88219e77fe54e0712",
  "0x49b2de680b7a83545f3f5d15c8d95df11b9f26fc",
  "0x51e5b3f9b136d6a9c290ec8d6bae63a34a2dd256",
  "0xe046bc92e3d407d3bd740cfb78be9c4830f9e5a0",
  "0x71e6bd2972a0e3a6eb1c41ef2e0114ea9cd8f584",
  "0xff3921c0df759c33807a84af52c2ad8e42314d9a",
  "0xc7b3601cd694cd40333b791dad0a4f10c4cf0bf5",
  "0x8eb2f059b952f331b912327d8b5ad84f6f4c0638",
  "0x55ef459cb71cbffe9f5d5d40648c976d75325460",
  "0x5a6132d05557ee3fcc6dc769d59b302dd8e0c4ed",
  "0x48f0bf27793aa0f02f1170f46e08d493a17251e1",
  "0x43b891e7357b36A4158c5d3b0e814400824bbc1C",
  "0x0A26b9f3471731ccA421F7ed595706063DeFF136",
  "0x31b224e82A31f56825632Aef88C34B7d289ec431",
  "0x3d0A87a9C3A31291E6952d4Cb7b154F38a4Bd63F",
  "0x50C5E0d5E1dBa3f0BbDe83eFe9dB39DfC2E3DA65",
  "0x33859cF8182D57D9b517Aa9dE44E6110494e6614",
  "0x834Fa8a973BAf614DDd72E0758ab3A5807156B5c",
  "0xf3c928532d4c326eA8e61FD275313982C7298Ce3",
  "0xF2581125A69Afb1991a7982802C94AeadDACB84f",
  "0x5e8cc763efbdbab79bb1bd2b40abe9a34630a438",
  "0x33b760214603f624ed08c6ca1baf87c5650acc31",
  "0x1dcde321a8a773b2c77c0566b9e3ade34909cbc3",
  "0xfb0042ed4d17735987b9ce26796cdc46756ff1e4",
  "0x763811db838c56a11a22fa162ab5b4dd30b7fe64",
  "0xb105b2c73bc465839464de2383ea90459f4802b9",
  "0xaf9b223eef42012215500add339ed02a56557255",
  "0x05f12a9ae9557956cff342984ffb4ddc7c243980",
  "0x2B838A5a2B8A2E80E965f1Fc9dFED63F1cC269Fd",
  "0xcd161c4e7567add6b4594f5376aa963a8c7e0b3b",
  "0x69a7d39362642ce919c3827303e85776ecaea58b",
  "0x5fe75faea604a7fb95a38362406a28055012c2fe",
  "0x61fab3b691dc0c100a183d5cdfc97b31ed37b732",
  "0xd0a1e82c2ef5fa2b3f94869f572968d5b27b71ea",
  "0xd74e3cf5890a476a49620d2f78fd1b3a1d7dff34",
  "0x7891166124259cf22e66fc49f383fdfad20431d9",
  "0x894809a6bcce62b673f490975fb5208419e61357",
  "0x5edbfda8b21f29d05782264152ba9f52cd0e5c15",
  "0x3f6a41c868fcafb3dfefdaa1dcd9ad022c88a936",
  "0xfdf382e10d233e2152b8e42b2f1e3445a1cef112",
  "0x11099143ed181a04220633d2ace95f1079dd24b6",
  "0x3398455171e9316a7fbf585824aebc9406bc01f3",
  "0xfcf2178704ddb5929b19d98f1f32ee97066f3f72",
  "0x4a70dfd0ccb99ff276724764131c1d5f510c12fd",
  "0xba9d8d97fcd0cdfb04897b397d6ce8f7c75298f7",
  "0x30d1b325af40863b5a8c1b3f24c82325b9103154",
  "0x00c95c475847e71e89b8356d746408226b4fdb55",
  "0x9ec52840f69d410e0753d4b70ffa5ebad722a3db",
  "0x51f84881d2ca9a2e7acb063294843e6b696d793b",
  "0x3241ec0d2e161bf52378e839f30e37eb64dbb135",
  "0xf766698fbfc3cded2417b5244550a4293274e0f8",
  "0x1383a43b1de7dded71165a191b95b0c7ae290f7a",
  "0xf0e590a616ddf287fcc5518418e934206fad4d65",
  "0xf58c3bfd4588d133eefa425761ea3f559050e2b3",
  "0x52938fc48543e216ca452199996685616e5eaa48",
  "0xc70c5488bd2eca4cd345007e14fa2e1cd45da711",
  "0xbfc5f47f2a7751ba39fd798120d814cf73881c62",
  "0x0f9c9d7d064d9fd53ca16beaaf78651a7b292780",
  "0xf987941a8a9697dab01492b15d62c97dcffe2a2f",
  "0xb6ce3cddaba4b0975ddd641120f93c631f6234fa",
  "0xd3e784b15e209704dce023288317c4ff4e955a14",
  "0x442feea58ed534d15b6773322567f8e954563b44",
  "0x70b90fb0083b6ad50c7f816a4914ed3a80d26113",
  "0x7e9c720968a4584ffbf61e45a14560461e042cf6",
  "0xca0970fb71d14672c63bd589065498810b2d18e3",
  "0xedb316b9b8604a456e7a1e03d6587195fbd94860",
  "0xab0e2aada1c0a0b126a9a002f77ebb3d99b45ecb",
  "0xedf301e9a5502537f121c5fb6fef4a8bd76951fa",
  "0x8db178897c0775e9e5ca32785dc391677c82a25a",
  "0x9c5152a0db34048c80457adf02da5d73f9ff6110",
  "0xecddf5398dc6b42ed678efc24813b9868da5ccbb",
  "0xfce4b17065e42f679bcc92e255fe93988cf7a106",
  "0x00f09e8589b6d30c475b6230f627e279cf4eb018",
  "0x3df31c12473775c4685639722612bd330cc8d135",
  "0x2ef11b6d6f6e5d1f1b08406a4c306448d53ff672",
  "0x92d754eb39676da307ca0f55ad9916a1106d8b1e",
  "0xbb6aa5615a16175c0a5d6d169e66a8858992f6f5",
  "0xcca65ea3449566d7cc2f6589ba126adc0c151eb7",
  "0xe4cdb47c790e8c51f94393872505d373b68d6e84",
  "0xf559be9d3b4795c5e585d8c3d92ab6c1376d0ecd",
  "0x481d21b69ead7a6608a88a7b6fb15ef165bd1b0e",
  "0x1920a2f2368a6d9b4e20ee4f26ee42c40b4182d9",
  "0xc3c6fd2f0ff728d1acb999eea2ad56302e333021",
  "0xb16ad69c851cc006c501f6a6b0dd2bf823156cc0",
  "0x092da42945340c8c61b9b9af917ac0071683091e",
  "0x1929a135235b638a9fc0cca4aeb3a200ce3dc184",
  "0xa3922fad57ef839dccb2d2990a393ec61042509e",
  "0xa4e65b2414d107b2e19d1c9af5f49ced33bc97c2",
  "0x9b4c0be7e5d75a99c60786457ec6a7aa3a745d96",
  "0x3711d55efff1f5efc390651a9085d0f05a49082f",
  "0x6911d30cb341d2b4dce5a23e8ec5054c08c7595a",
  "0x863624512c283cf04f73e1d1c5294f1c6d3e4e7a",
  "0x5b982c9edb2a46c82e28164ff57e7e481f2bb204",
  "0xd3d5b98885f912e833b4e3f544ee4f76b074f5f3",
  "0x9dde7ca07ce138916a685323a3b6b4a2c84a6e8c",
  "0x9290b6f554837bd583380e2d157f77a85ac7a68f",
  "0x4703b83a85f65684b24c076d02fedf7c12a3d77c",
  "0x6db1a3dbb95874b1840f37f1844729b6d4872b75",
  "0xcf4d11423fb2e75d92b704f678b6be1fa427c022",
  "0xbe1a25dcabb150b620fea228d33732ebd195397b",
  "0xbf2f831dc1d6f2e5b0d4cd4277b57f14e7bc1e2e",
  "0x6ad10e82bcba1eea0bd82a4bebf2b2152c3f8cde",
  "0x8891a297a58055fc44d7843c0d6d729eb79ef9ef",
  "0x8033f8628be2f688399eed64a6cd8d127e96693a",
  "0xa822ceb9a24bb573c6778b62a5ffcf89a47cfdb7",
  "0x8ca0a0c5a72f6766f70214cf8ca123a283be6a14",
  "0x9a8d4b0f5ba089a03e89da86fc4d4de7baec40f1",
  "0xf091754f55b23fe742dc5bb79bd6569e9465059d",
  "0x30a37889e50d288d8c0d9019162e8ca207d110f0",
  "0x0977a40674e24929296ffc707942a7dbb5a94fd2",
  "0xc2e66c963438e86ccbf68043745a58d8f667440f",
  "0x4689bbc2dce68ab627df8526a4fbd2379a360f34",
  "0x117191fd9bfb0c53d7f01e583621dc7498da7232",
  "0x69df90679638988d1593d2c7773d07d716750f4a",
  "0x78cb8f3c9a36ef2bcd2ab064204bd69190100229",
  "0x7e4371ca3fecc8ee1edefd9c7bb9d65405a9d88d",
  "0xd2b3fca9e20e7ff4189d35f59a3b15ce8c9f65a1",
  "0xc5de997a4809c15b64560b04e1141416b1a2a71e",
  "0x8db293b1707adac247a9b99991a570a8cf690a70",
  "0x7e59c2e03a87cf422b862bce00cc76ab2c4e8a2c",
  "0xf525dbba0cd525170bfb703f705f7b6065c6b640",
  "0xb98fecabd335700e3aca6b246a238a55cfa1db2e",
  "0xcc36d3aeac8c28250dc8d0adcec22b3076a1758e",
  "0xcbed75a2dbf32860d6f86808de986982d2058032",
  "0xa120cc0b555b7d914e487b1e892c714569023ce4",
  "0xb16b05525921fa7351e1fbe22f56be68df76edfd",
  "0x9f5e349e396d51a2ce3f137b3d9edb5f8863785d",
  "0x2c382aa6d22181440ff2f948db1e00515d95df9f",
  "0x0964bad0077a1091d244c323e34000781835609b",
  "0xc8ed6d535d08fc4435fea832c78b866e7ed1f40a",
  "0xafcb71933d8691090c9ddeee61d383a49da724db",
  "0x3e32625ab07181d6aeb583b277b5708df8f198ef",
  "0xd54c0c5ad92984f6c3a4e357d3693e4b8c9408da",
  "0xb4fa80e7e2b9be04a7a3682ff697e364fc19f704",
  "0x939d8f09e002eaf17e10acab804164bece5b8e3c",
  "0x657adeb2ad65b179acf0be673ef4a43b300cf624",
  "0xccf995f644137f787e5a7d74f7cc0b32a5bfe2d5",
  "0xee78697017c5cf0a648afb30da8f271481bf5c9b",
  "0xddd391d02f25a287a6c321dbc9ef43097328f8f7",
  "0xfb408fa20c6f6da099a7492107bc3531911896e3",
  "0x3eb3886f9394ea2eca51ad421423cec159d6356f",
  "0x4b75f755e19ab4e913c995aea4476e4454f05c8e",
  "0x254fc3950474e3bc7b8be0b463fc28ce557af0eb",
  "0xabf67ff824d10d5a91a0493c95b8583b345cd12c",
  "0xa39daa3af0cb4f19cb9f0fe721e4e8fb343d97cb",
  "0x0c745eebefdf11fcd9fd2cafcc6162167167d922",
  "0xdd5ae96db35709ae9762becb357150c3a5e4a57f",
  "0xabfb8f5bacc4312a201bb25e788a7764532b6c23",
  "0x9bdc595eba206bc2ef75b956a69d4de7894f718d",
  "0x264ad6ff3a35df096f473de3ea25cb585a5a9003",
  "0x4b162dd4f93945a64178abeff3c13083e20ee359",
  "0xc12880185407447b3ee0b04e37fd5f075e986a27",
  "0x00000002f32c0886ee65d68059fbdb76ef6a6996",
  "0xebec35d949acc66c833d578aa17948860a53257f",
  "0x425d2ad56ebdad9f2b91bb3f1506ce9198e4c513",
  "0x91a9a1fcbd15809650bdf49c289068aa270e1db7",
  "0x288a6f913ae5178929f731651bda34380a5383d1",
  "0xc1fbe0b38658953df5558db3a6acf88c78a6ced6",
  "0x3acef25922d667b6c516aa71735cb858f535fe4e",
  "0xf0254e2657896cacbde972ea53939d91bee7e6db",
  "0x3ec17d725eeb4c8a7a6e2ac28be62ae3af6ae09e",
  "0xc262047cad44b1468674240c76fd267e3b1e9a4c",
  "0xccabb78215d6e00ce5be8d549edfd9d9ddb78624",
  "0xf5c8034885b10ab81a08cf85a0dbb9a430028712",
  "0xc8d78baa93ff8d4fdd960f13f350b9c5b0728189",
  "0x41d4a1444b457d211fa8e58e51f819d6c2a4fa82",
  "0xe82d5993bf405919b079cfaf9a9dae2368798685",
  "0xc2e89d216e3162e0f8aabef9014cab7a03c5966b",
  "0x4b5ce31dce36e1dab6500366a55a1f4a139dafad",
  "0x73bb1bb3f5f6e0062f99ce37318949528d1a0c43",
  "0xc25f1c2319c34b6978f7be30d585ffd1568f86e2",
  "0x97db9af1397dbdeed5c51788937689756a269141",
  "0xace9a92ee017bb3b01e37da624a2196328e57e15",
  "0xf1deb1ae0b1cfd5c6dc1f0bf726043a4248f048d",
  "0x01d7d9acbdae489c21341c04a8519fa281da1bad",
  "0x85e4dc00f4cd70aff6b03e68fb8bdc2501f8dcf3",
  "0xcc47b1afcd22f6fa1ef36b21579eaf73fc400f00",
  "0x19565268653bce3fd8d05b8919a4c23caff2aff2",
  "0x992f842d526abd8ef8781eba6e669fbfe0148a15",
  "0x701405023439d0e3997a6f6c3be04ce85859be1d",
  "0xe8debde21ba8cf49b481b50bff6f9a9b39bb2f1c",
  "0x535b5254eaf436603d1ffb61beff61cb8b17772a",
  "0x25fabc61eae6286b7b4aac3a61915be833f1e78f",
  "0x9d17c22d5cf9b91b6795ec2973f882c79d5274ba",
  "0xd940a2667713fec51a310f02a4be0e8dd9e0e219",
  "0xda2c3c5027464903bde8e6e2450ed30168ddd73b",
  "0xdbd61deb41386fbd6748a8648a8cc6ae28a00905",
  "0x9133be63fd60fa0318816f78a5437418d96dafc8",
  "0x0a56e17e0e80343b28bff03efb5968d9ff2fd615",
  "0xe851c847e4f1523b9425d786f39c74392e8b4020",
  "0x13091531c478bbf81ac2d7ea4e42f63b9db2385c",
  "0xa997f3ec8d0d695fbc72c0c017da07719cf1df9d",
  "0x22f79923c929d1db364369ce79a1799c9e3102d3",
  "0x797e4b24d364be0143669f15a22336981f3a8c33",
  "0xcaace4308960dd937c1297e1a4859762a5bab274",
  "0x89ff951e24d8af4530771adb3772ce90ee7908a5",
  "0xa2ffe2dc2cd832ae4fb1c847a7faebc9156a61da",
  "0xded508384abda737c527fc15612d14c3194db1db",
  "0xd1ee30158bab2a9898126a62282d29c8ef73493e",
  "0x259331c2188f2fde46d382d23fed9a4e08fd4183",
  "0x192003899f31ba54e062f311548b94077b5ffc6c",
  "0x83884182ccec18102ef975a808783d1241daf879",
  "0x328a921413d9f797a31b5792a7e485da21cba494",
  "0x7d123ce695110d77acf45c48a3581ec2b5e24305",
  "0x23effaa0abac138af64be4d02426bb58848f5acb",
  "0x26fa7b9c29079bd3d73271abf19993454383ecdd",
  "0x34cd626ead2b597c7b89a233d3e03028fb8c0286",
  "0xc3bc89e8f80b69534e8adceadc35fe9ca1064270",
  "0x54e801f18b21c4ebd18114f5f5fb06695246a9c8",
  "0x81a7bda3c549a9246400e412835c7ac2fe62b55d",
  "0x139dfe83d4025fdd6d152b3c42592fd6e732d457",
  "0x564af06c6e074311e6966e649a089b4bfba1f1b3",
  "0x3e2e0e7ad6958330f7762ca345984cd99310d53b",
  "0x396b87fd8bf3e4e39d6e587cf71e258fce477ba1",
  "0xb106cd2a9ea901934e6c98f41376f1ae3c2df8cc",
  "0xa965769a912eebe083dd7de1ef009adbb2cf6eef",
  "0x8fe90e1618b97f30e043107ace36af91acd1a1a3",
  "0x6e53cedd1eea65c6dbd04376c1c047fe1ff2039c",
  "0x3244c514fccee1394817a6132a6f76f9fe1e9321",
  "0x1699071396b7363333c46514938aefe4004fa713",
  "0xa84cddcbdd83d2aeeb38a9f87b08bbb4551fbe2b",
  "0xf7275aeaca2a4c35c88c93f4dce3b45e814d5678",
  "0x0f7254dda822ee373aed2bce88bf38937cf55a77",
  "0x9cd2a6bfc29b0cf13a0fed07c20ad996c6eea557",
  "0xa1e28c7bd083ae215e92392375d98f70d947db3c",
  "0x5355e735a4e92d4b7b4af9cae303346075e7d71b",
  "0xec43d8e6433e1bb63e2d03bf5bc997f3bfe80ccd",
  "0x55f15b65ace1e2e1460968e5e64dbaaac845c4aa",
  "0x50ea491d54893720b0f816746d1b4ae7c6601733",
  "0x594f49b52400db1d87c7db3f784be20d50972ae0",
  "0xf63d7dbe24ca439ebc699311001a661555a93040",
  "0x2617b610f7ae449339720f71058170e46ed3ff2d",
  "0x1a204040bbd6eaaf3ae6ada7f2d0a77c033fc862",
  "0xf606118fe3a90a6bae7e996e68a7dc131739691b",
  "0x23631b12402fe1b2404fccfab01557269b0df108",
  "0x53ce838d63763cf6272b22ebb8c56feff775d983",
  "0x3a830ede877ea80144f605b0bfa0a2e101ee37f8",
  "0xf1d63e272025b09c58faf6822bb2679397b83579",
  "0x103eeb2776a9ad7a8e6c6d39b2dbb2540d13cdbc",
  "0x5120244caf6eab04e815ae2b7ea03dd6c36979c8",
  "0x54a331d363a4e352506bc9813356955cc88c055f",
  "0xb4f253819c7e30025f3c7e2ab41c59d1173470f9",
  "0x42f1dc24dd3bbea5d9f10b29873bf660b4336944",
  "0x336bee0e2dcdd4f9f292f4ed175aa9264e2690e4",
  "0x2a91ef328b250d72d2529e4da94b68cb6c252f57",
  "0xbafa8668b54b8931813915913edfe08f75d7ed17",
  "0x8ed65095ee88776f611321d7ddfd36e8ad688c2f",
  "0x6634cee5ba0b365df766151afe2afdba1299d5f5",
  "0x72a45709ec5d27bbd9577e01699ba755b8b11f79",
  "0x0ce65063741383adae966bb29dbb6b1ae2e9930c",
  "0x93e467635826200f350ff4f8be092278479e721b",
  "0xe6e1413a350d2a5ea58791d328d77f4a003f4b73",
  "0xd0abac5ac34e004990a549a769e0cd33d69274fa",
  "0x0c03e139c7d96633a079034d394c5395e45931ac",
  "0x51896bbc516053487df6268a200541bb4b4cbe3a",
  "0xfed4a3ded63c2a89c2f58ee2cb3028a1e284d799",
  "0x5bb993f7cb0821a29a2810c5d5fc2ed77bbbe720",
  "0xc3e4c1833814caada0620196ae3384b29371d94e",
  "0xbfea5db828656563592fde179468a142ab29bbcf",
  "0xe5be2fc8bd63da6c71733d28069516a43a00b4c1",
  "0xf7544d9828183e6718a1997c8d39556fad9e42c1",
  "0x13e493982cb6240a1e7335d2b7534e2e7782eb49",
  "0x189fa6fbd58b2c13af98785512e40e0ae79d2196",
  "0x015f0cc47eF8B3872dB1F3f7BaBbc0bDC215999f",
  "0x31327eFFEA4cB7b103e4762e8ba995159a148044",
  "0x92A76b0C8Af74FfbcB7E5917469F68bF5a33Fa0F",
  "0xDEE9B19019f6a5Da266a7450911aa4aa6de485aa",
  "0xA620451cd9e6b0c25B2c5e232E65d80bF94E24b0",
  "0xcAc67cf89B81f8dA81Add6e8b3361587B52FF0aB",
  "0x4a437b6078Cfb41bC599C4379A9D27259F1948dF",
  "0x4b94702542cfb029492506c176edea4c7576c4d1",
  "0xab48de856930c018238c226d166feaed3541ec7d",
  "0x68fa11d6e7c1f3b342d480621f72e9ae632a9999",
  "0x5f70c301d3d1d15c9f6e91ce67ce77d48689c6a7",
  "0x6551d21efb501bc3b82a8adff7737402b298c4fd",
  "0xb425e651d1d8c2bddeb9e4c594a9e4af2e4c1329",
  "0x8750c7ee7554142aafaaa254bc4877cb96881863",
  "0xd890d844d05840548ccc8e76d7cbcbf109d33d03",
  "0x81de1b9e4951a9506bd9d2d6a52530075f5d1725",
  "0x1f175b78b2bf62a5ce3caf4e062399aba6228f2a",
  "0xce76de147b735f7f49f1e752aa24f6022860e54f",
  "0x6fb5ba2bd0d499a11234fa050ec17ec2a9b338b2",
  "0xf5c10a05c93254c658fb69756e31124b6dd8ac4d",
  "0x9c2734f019103bb9376d1aac5dbba077e32d2e6d",
  "0xb7742f460a53b98d651ffccb7bfd8d0c684c4815",
  "0xd17608e9b9acdd399983888ac6d64c45e5fc6f9d",
  "0x8dd0eb4ac9b49e2193a73d0f77f431acc0af1b37",
  "0xc6e163105856112343450d1a0aa4578392f5dc07",
  "0x0c180a3ef506d9a2a914ab4fde9a8d3c3d0c9f45",
  "0x99b82b1cd52ee82b455acd549cc2a2a8374fc946",
  "0xfdffb6506821456bc3136b0fbdf20ef0918d5f5c",
  "0x065828453ab06b0e276b261f51f4b0840f0f0d3a",
  "0x97cc3a4a59c4bb55a5d36b90d8a5bbfbe86bd1fe",
  "0x181da0f7459ef1ad5247997d37b2ba545f7d5eee",
  "0x3b0c9bcf2e4f54fff1996b99bcc63ac953567e55",
  "0xe1782b766b47ce6ad9915e843d7ee8ba195de263",
  "0x2ce99f178daa9c3ac5a3ac86e22800c5bb011739",
  "0x708fdf3f53b49f0a781178e470210b6b49481cc0",
  "0xf946112ca6e83872e112be6f8e55b6824428f8f8",
  "0x4ea58393ffed8af72e3c0188de8fda3f8774fff6",
  "0x1e89b9f51057e7f5041aaeba64bf696a53fe4904",
  "0xaa959fff27337ae4e4e2af16ce353061b3e9f5e2",
  "0xf72a4eb9da7e1361069f726b2a605cdf98b76006",
  "0xb437a90e59785740a67fc5376180acc3b705edc4",
  "0xe46d16a85fb3162c16c9d1be28d24c4f7263145a",
  "0xd5e602342754b14d8777f48ab418f6977e18f745",
  "0xa2b3bac969f034cc5df5a517a7f3660ae5c15bed",
  "0x4c42e1578bac82e434c211a36d40bdc8d4b3e750",
  "0xca8529e6b7fa6b99c51321b950b831d228a77ebe",
  "0xc62e803f31c240c384aee9874e1566558c3c962d",
  "0x214fdd39774f0c4df20f1bbcd4cef5a7691bb163",
  "0x2a3bdbf89e70598ebb59e30b65f05c55b476aeb3",
  "0x3febc94818fb7aeb5e44708e6e3d1c11fe7b893a",
  "0x54c82a9b250891fdedcee5025c3ce519efd14908",
  "0x90c2865dc6a5b104f671b4ee23c8a1f2e984c06c",
  "0xecc01fc7ae3641121c9e152765aa6e85e5fa4e38",
  "0xfe8a4fc7f1497c3f9dbd7fb5a570d1ec47ec51d7",
  "0x9912a0a767e06566b356cb17521b3e3c13ecb4ed",
  "0xfe38bc02b35b58dfefce4525a45cac282d8217cd",
  "0x39a25fa6fef736fd2d0b00f75a84959ee28ccab6",
  "0xa92ebc1a8856e938ddafa03d76b8ca1ca37a5b59",
  "0x942692273838d1a2ce69b527d1576dca0ebb318f",
  "0xe0d5d69bb7588fb7a558e54b4d5cd1e3cc5ffe68",
  "0x6e0bce6076604c3940dfcee10fb339f80b388601",
  "0x677e230f0949107867cca9274d303bbaaca9c7d1",
  "0x1e2b49fd53ba48f7a20a0e4af4d700caa325fdd1",
  "0x6659b6a2019b49547d59ac2c7ecf6e635e3d8475",
  "0x45d152df423c8cbe3772665788c02ce8c99fa3e1",
  "0x1f748e30f06db21c0498ec19a3e23c46b9609333",
  "0x2286d8d8799291d2535cc52611ed1b39d9da8457",
  "0x08b8674a33206d826af63319ff889b0e8052d34d",
  "0x23c4c916d9908b84b64bd33b479fdc5578e6f636",
  "0xf2030109c83a0db1e5763be37326825dc8727b9d",
  "0x76f0ea777e302b463018e56e589df347e4c6604f",
  "0xe59455b7d61dba7d70db666a8930d4152400e9a6",
  "0x29c8f19c2e546364ed1164c1f35badc3924de278",
  "0x3fd2e1d8874a0fa3c199827d2e907a245bd27f35",
  "0x77a3a208bb414e681091e76f406ad3aadb808ff2",
  "0x8a328b51b718a2c8fa846118bd2fb141b034aa86",
  "0xeaa5184c13d208500ae678bd3b50068701096222",
  "0xeaf3262d52237244116f6b47c70412e934345414",
  "0xf73a1f96defdbf32b6065373f3cf88eb334e234f",
  "0x770f3f5e832cd7b8dcd86b01533c7d40105412ae",
  "0x3a5c3daf1e495cf61aa3b146e04a7d170022a85c",
  "0x64f56c581eecd11c27e5ab454ddfcd7cec9fb37f",
  "0x769d99c2c1e8c9e83ddcdd8ab1a7cee4b211af04",
  "0xbd94fef81f1aee361adcaeac035c7eacbb8866fc",
  "0xdc0d0589b4b1c125ba721306288a550b8040f3b5",
  "0x9db6f7d5c313b8c8356a46cc045ce896870cf752",
  "0xd6fee0333328074f75a5c08672bc598961b6441a",
  "0x3c060c316cc4c4b41960b75b2e6f8a6853a5972f",
  "0x99eb2f3e0d60fe1860cb09295db1b6672e4e7aff",
  "0x4dc763c4591521b8d26852431ccf985e993b32b9",
  "0xb878f4275aa660ecf2c468b550930fdc4cd24f2e",
  "0xc4353664515d7b98279a172f9305a81c5bd5893c",
  "0xbf1a30e8788193ad1fd3f2436fc71d1438604c71",
  "0x90c330bc3a86ed29823a77849859775685054dc7",
  "0x8fdf9a7cf1f761edd912eeddf8a0dccab6ae63d5",
  "0x09e62eb71e29e11a21e1f541750580e45d3ab7e0",
  "0x391f047acfb94bc8b935628a875baa086c5a53c6",
  "0xf49b41be92bb9fc7f985abe6a50f522ec171fcfe",
  "0x8830b1b28f7334ee018f1acbb7bd4a450be5aaac",
  "0xc38784135da92a33e0a915d940a32ac0c5a5f5bc",
  "0x61195d916b8c1cf1b8e9f81b1fee8f8cf4bdbbd8",
  "0x5d75661dbdcf880c89847c9b672a3d4ac5cc5cb7",
  "0x188e0ca53fcea80a234012e27a22111b59988888",
  "0x1233c6744a8732345b7feb2136ca6dee8e3b226e",
  "0xa4f806d0cb7b36e55973578e2b786ebc681483ee",
  "0xd60904f58fb67c1d469ab5607100b79877d8350d",
  "0x6d2e374df4a1fd48478c0bf13c1a1aa3fc773fb9",
  "0x089920a4a315bb8ecb9e426d26341f6c5a63e3f4",
  "0xadb75b07a6fbf1bc6de7455cf353cc71f20782aa",
  "0x20b9cb47fc8c374702e3aaa113c51520a2cc6f15",
  "0xd732d553192277f48d591932d3f4ec7a405db191",
  "0x4ae29df63d7047238cb91fa03c76ec38c4e1a623",
  "0x000009ff30036658300e2abcedde1020d5e662cc",
  "0x2b2b6026dd5df981d6f111a83d1b5698cb4788f4",
  "0x298afed99cef993ef5f5915a76f363120f1e8307",
  "0xa1de09624ae4d371e4ed5506fd8b12a3754953c2",
  "0x51154545c3c256c59e4ca250a71a3b200a3551b8",
  "0x23fbd55350aeae184d71a44f08756a6a9e8039c2",
  "0x5b70e4587a5fc8e35ebfe6548f2b3adb1724f02f",
  "0x2dc4ad4679bad50ce054796cb44b170b3adfe9f2",
  "0x153f21fd6e5633b9faa35a2aeaba65edc728d9e0",
  "0x46f631f2e3954e4732142fc2ce18598304d32b69",
  "0x09d1a13f60b8833d304b24f462b86a56b0c3e616",
  "0x5abf0e028ddf4e3a04cbc98b86084a28c1d200c7",
  "0xff42fe1f748efd319bcdda48eaa9bad9b3ddfdc8",
  "0xe688a9de74d049c1dc580ac9a8fc1b6dc4106983",
  "0x9a7fda076b0d371aadecadc0c3be315e12eea0bd",
  "0x866bf13d87ef42845f6715acf8f62f8321381364",
  "0xf102985071d60689e3c3ed676d506e4c20a6beaf",
  "0x289615c5c4d1c603396754420fead78f78b17874",
  "0x6CE9D57FEB61CbBe2E4F69De0485cE096BC3Bde4",
  "0x8694b1eed5e83ebdd06d82babd2c84b7944b5e45",
  "0xa36e5ebce35ad6e60b1ea2bfebe19df8e9ff2aa9",
  "0x99563ce4cbe681777adc2fb7a58f00e308e25b42",
  "0x440f85ce11bbb56f8dac766100d9d239b19fc064",
  "0x3403b4de3947b3b44e6feca581994f89308d98ab",
  "0x8f3f94e32b3058f925494bde2ed42ee7735af592",
  "0x0bf4db19f4eac2b929f36a9ad23a675cc9bdd410",
  "0x2ce87085edbb3350b1b2416aa2d6fcaf9850b1d6",
  "0x834e1009f2442cbdf227746a798ebd882d692212",
  "0x2ee9f5ef675e3c95b5e54cf271bd9a707a395f8d",
  "0x6fc4121565a29e1597a6060523466c5e7899000b",
  "0xb7eb60cdfedfbedeac02ebf7bb572ef27d5aa1c8",
  "0x76387f3603ee5c45c70c28983f42cd7289a1f6d4",
  "0x524cee97e7e4ad3f5f1bcc502f6d9b39c8204b4e",
  "0x099e123a5272533507ff398b3bb2f99dc9915e33",
  "0x74d17bdd287487ecde0f6df19a6b3805fe4f6a25",
  "0xbb809ad7a6a14d4447d9ab43eb1f6a374c0f90d3",
  "0xebd0f973d199ee5f9c4dc7ee800233f1f1987ad2",
  "0xdbc04f708802bbf7cc5cce1e35f6652ddfba418e",
  "0x32cc8e176e4a65cec4e4c50fb2e72d9c022e76e5",
  "0x2e7f4405ab6f7a151f092b9b9561c7d319450948",
  "0xc931ebffce5fdaeacd4bad4aa328a21321000661",
  "0x1b730429b429fa4745ddfec0c5c17d05fb152a76",
  "0x8d773846e2fb8485c781e363376021c1e089290f",
  "0x7b45b0452b1764cd4c71d272d11f02c0eef6ea5c",
  "0xf06ffec08cc488992f11466035a0f6da4940856e",
  "0x3fe019f3ed2a1361a29553f10f50f78cb82c71be",
  "0x217ba06dc8f2dec12a974a41ed654fc80426fd6e",
  "0x0df13bdd90340dc622866b7e5d9acc8c2fa1cea8",
  "0xc3690c919d250d5c424e2737681616c93295cdd2",
  "0xc082169c0a0544ac3df82b6d2609686caccc5da4",
  "0x13192b1056ed57eaa06bb7e49d70964a668e8604",
  "0x6081f129e21b0d26155ffd6719a9265705e4b4cd",
  "0xef76c50a8d85fc9e8063daa77fc65f03ef4a12cb",
  "0x61306196c8cef2ebf19baadb771a501de86fa6c9",
  "0x0cee7e4a57af81b067d044d657f095f4b132415a",
  "0x2db347b7dc44d72f6be817b13abe367ff80cfcb0",
  "0x62fd0e9a06a4a11073bdc90ae865490968ee30b6",
  "0xc3e8e6103f37ab34222ae020e8a42eeb6ce36c74",
  "0x8e276f7c55b536c06f9925d73493f41b736f733c",
  "0xc889fce92f9a29b29f8bd28050beca87afe594b9",
  "0x3d82178d6a9fd057ed23290eb7b0c09594e8080e",
  "0xc32438f7e4d3444acb88c23ecdadbc9989acc344",
  "0x86f73b25dbc873bdc458cf83d7e8154c3322290c",
  "0xd012b337919d7e85fc615de7805fd5b27a07d8ac",
  "0x75c9f57c0efd5d4fce675dff31743b64ee798773",
  "0x541dde5453324be302d7deb1748c23cfcca555c9",
  "0x6b108549b6738d20d181d5e643eef297f0980032",
  "0xe343fc77eff7cb5371ddcea5c1c1cf733b34e11c",
  "0xa4fd9c62c3dcfc0b865ec2383d69b3df64f7f6ed",
  "0xb6b86383831056c16b996cbfb3a6424e7438c6fd",
  "0xc3686667391ad353f5916b0a75cefc3012b2b012",
  "0x97e1c0d2055121dc5ca54151968e56d1ac56306c",
  "0xedd22d51b5cfae903cd28451e341205ea76a73fa",
  "0x2dfcdbf35e5b39b0be847beaf15ed61c3d20cf1c",
  "0xf0348ceecc7e825a962b2a3831c517a91031f72a",
  "0xdf35f6356d868e89f142d54a5197e3813d3e6011",
  "0x50bf1df7f530eb3f6bbd2479c792162f204df1e3",
  "0x8443a695cd3dff8f558e1f40d486a2e13da0ed37",
  "0xf1aef25c4fe23941dd7145eb88ef24e2572ee0ec",
  "0xb31e0f6d16e55f543c68ab430695526b25e209d8",
  "0x19c927dfa825f9c5ff8353252d38daba36de3215",
  "0xf921ab1fe45d70f47d592d373bda2fb738b9cf84",
  "0x0174f45a2f2506ce9cec3580bfcd24a493e50a12",
  "0xa8928227a411d13ca6cef679f7bd2c539e5db00b",
  "0x019e1d9407ab07d1e470540deca1a254be68d0aa",
  "0xfce5a8e6208e4e846f6dd89ff261da2d1541bb38",
  "0xf0dff3a6ac38931ac55a7828b32be10336bf8994",
  "0x97be21d1f50a3b314040f1a58f6023e4f99cc132",
  "0x0973bfa5e2fbfe632d5bb6c6aaf31cc10ff5676e",
  "0xfc211d4527be60bbc557c26c004efb2dec672a50",
  "0xfb4caa1acbb9ca7ddbcd176c53ea748d2fdcb204",
  "0x6a4d7250034e412a74d73ea7638ffbf8ef5d090d",
  "0xa226b2b5b4841819391137efa6e709b084500a5c",
  "0xdf6ed369a5533242d01f13ba632c8ab91bf76f2d",
  "0x339af243f6de5537f171c32df869f4ebc356635d",
  "0xabcd71d32982c984417785ae18041d8f4712e585",
  "0x5f7a774974434b4f2e9996e459b8f335b6544dda",
  "0x99e5c192752dd8997e272a92b56f0a0c9773c67d",
  "0x27ec077c7bd4b3bd4c317bcc6355be7386601f94",
  "0xbe428e7eeb353798ae0186196982ddf6ae022b3c",
  "0x3b1bfa50a45b35340fe59f0008c513d4c6675720",
  "0x2c82389e8c200093ed021ffcd639bc5198173a77",
  "0x35559efd3bc506ea37985a2ae8b3051b9ecc91e0",
  "0xdb9787a3c60d6c87f443d5a54f2de041902735fa",
  "0x6545e1777c42dc3363f674b75abab36c05602ea6",
  "0x65b0424d7c56f19be0dfd2c9c5bc6a3afb0d3e4a",
  "0x48c254ceda9753684c2dfc057b8b3b7414a85fa9",
  "0x8f426cea7d2f167773c31873152317a7f897b5dc",
  "0x5b0005f236cf28524d4bce07a545cb157bd64d86",
  "0x22febed9072c0f648b34742b3f6c2d9fd527a8a4",
  "0xd8821657ec2ff38d5eb7fe3688184bb0da4b4b40",
  "0x6c21409e563d984369d2bc3e9509906d2a777db2",
  "0x40fdc3dd0bdfb5146d63263b0280150ca61d2b1f",
  "0xa01746ae759663148766bb2d1025ad40d9b5a510",
  "0xbd18d7095eedf31137bc04671a2328ba2f141e9f",
  "0x8cde3eb3ec0d56bd8989c83129b224f931acdda8",
  "0xc36f061773b4ebbdd8392bb2b39cecdde3ffe29a",
  "0x43e1bbcf16cbbeee213efeeabe3a155174348e42",
  "0xcf9cab092ab6bf960d7ae4177f0f9a9ce14fb2c2",
  "0x4b6ba3a1fef3bc017a8c941616a71886b597258e",
  "0xdeb381dc91752235e22123bdd40b096e5389b918",
  "0x18855b681a2fb4bcca821bde693e68507725c3f1",
  "0x21a935910390db5d72d31ec577bc62596a02e1bb",
  "0xb1a75ae2560cca8c8c1e5b9fe826ab7325e197b9",
  "0xc2da7c457b3ed27f9fb822e672eb2335ecff46ed",
  "0x1d7a05e034a20f80eeeebaf8c8dc3c2a00288c9c",
  "0x69351f409298af6b229b2d632c0236c06009ebd4",
  "0x0126272754430ac70104e8ae54c8b0302aadd3ed",
  "0xe043baf984b69d1cb3e336eccf86a988843413be",
  "0xe5c6f1c10af2c6c545f60c447e08de4aa3da4237",
  "0x4775ece875f98b7b76f6340d31c176ded89e6751",
  "0xf41ec7f4082782a67fa641b5c8a60fcec7d082a8",
  "0xffd51e3ea3629e0493fa01664dbdacddad3d283d",
  "0x59813bfbdccd9f117c66eb8ce8c63b9bef4f6390",
  "0x7fb8d9881cf3de50cd66aaa88e950aa98a7a208a",
  "0xb772980e2d22bd02988109b50345605ff75983b3",
  "0xba3654d14477f42d0ec14896f0ffffe01abe0d1a",
  "0x09de263e04b948e2bef108936778fc1e89fc272d",
  "0x855d1eec6b8370fcaa7f9d6f7f82397670700ee0",
  "0xac55f7e64add6a0c9fe668e2b3d25dce85f81484",
  "0xb5317b49e68c316c6722b875195580e4f68e7e7c",
  "0x331d6cd78272131ef15b24b0a64da3a7a1233a2d",
  "0x18c51e94d7b1475ec745c8136870a8daa58c9db7",
  "0x2d00c8cd4d941b9b6467b19e3c03c2445ae3a5c7",
  "0x0b49621caccc771d8a197ad3a4cecc7561f957d1",
  "0xd62eb7847d29b413c328c4f3cf730cc84e980ba8",
  "0x8fdb12c76e68d2b2869b246f67dd10795f3bb37a",
  "0x4bee039b8081ebf03fac126b76cc28745a802f1c",
  "0x3c5a902058adf56001a84408d44a499208bb2613",
  "0xc196cbba35c8a568ac14d3afc1f26986d7266337",
  "0x58ded9be7f447ea3f5737adfda3948ba208ecd4e",
  "0x9fda2cb758983cbdaf891056e6cf7410d271b461",
  "0x603d06dcb13fb5ae2c7bb38b0034f63f736a740d",
  "0xfa4453b1d6995944959681319b94aabe86b1255f",
  "0x7f29ab9c153072cbf6b101f8c79230b80ad19412",
  "0xc05d8f8855f4c7bb17f5aee85ac45f88120ee936",
  "0xb7af638a765b35c1ebd5a7a90a7155209921028d",
  "0xbc11389a833cb67e42d1cba648efa25917dfcede",
  "0x3b98df607682cbb1c7adbca6049a40980104d817",
  "0x1a6625f712963b483d91b676ebfec5efa6710409",
  "0xbb38cb13ebcd93b6eb9ca9261de4c439072b1fc4",
  "0x346abad91b7970aa9e14821ff3cf12bf0caec74d",
  "0x38704955b0b8d6772ae5ca278dc6725e4c5d8022",
  "0x850d8bba36a0a6a69005ccdfb36eafe1219ce9fe",
  "0xe6022eec1106c8aaa147a85f2a7e80f8f570ddbc",
  "0x89389314ca8c231affe394c92fc7abaeb9cf386f",
  "0x8c2164a39e22990c4bb38638f02636d811ebac6b",
  "0xbe530d269770d0e1429e259f7cf51ec6da50f67c",
  "0x4c15868e85ab13efc18203f2df883f363ea3b958",
  "0xc4863ebd54ed653b038583ec95760cd570041f44",
  "0x566eff8847f8375b3fd0316fdfcd608a53e2aa17",
  "0x4c1b933698a361e061ce6a46206447de6a3e2f5f",
  "0xa9bdbdfca9bb34cd1023b21de2acacb6c5081236",
  "0x60a9827b3fbdff260d0296f5b97f2851d5166eba",
  "0x680553284af877e0da1869cc9f066e75fa7c0916",
  "0x2d312498a93253b78e85ac212822f33c502fb503",
  "0xb5a09b804812bf3b02e005159dd6ed1dbfd1e826",
  "0x56bdf029d03edbc8bbc7c7933000ed1556b5445a",
  "0x03eaf4acb156fb5a83ddf006fda4b72c6e9a01b9",
  "0x8d7c77fb34469056124f1a36c5d323ea6773bad7",
  "0xbff3c8c2e2e0d94c8cb487cc8ab9a2c620350279",
  "0xd0bb59a04ef5a4c639f52af4c797e2b5713331c2",
  "0x91a8dfd8713d2dc6cc97a733e7dd55d5dde8f619",
  "0xb0f24272f67d5ef9c093e8c14f7620752b26a2cb",
  "0x110b8c2a97e5030998675dfc3e2621c57d566a2d",
  "0x164517fdd4fb50f0a1e8100b5b231c9c93e2ebe1",
  "0x16a5afe4d700551bd86d89d3903900c216cd3f84",
  "0x0ec8b5640448efb95da60f54a8ad7b9938840583",
  "0xe7448d09ac439d3735a162c937de5ac7f998e7de",
  "0xe3ffb58c912d948f278b67b595a5d09b4dc89e10",
  "0xdf5d71e15c9d0cadfe4aa4efcf5107036c68d202",
  "0x7f8d6e3bdf484b1dffced3dd72116cd3e4302d8f",
  "0x8ed9a7989d14e480243b9f03d5a3046492ef60de",
  "0xdff8ba45eb9a34074c1b2e14d4002add0fd61a18",
  "0xe5adf62843d76514d861aa224e677d1971b4df68",
  "0x9e04af2102bfb4c7a6da7cd592161fc7db90e92e",
  "0x52c7329011822b8a73d930279c5c71c0fdae9fc6",
  "0xb2e7fac93a1b55b7e0a78c12ee987b4cf3f7b83b",
  "0x9f91d5f514fdd8ed7cd86bdfe226e8f8b277fbc8",
  "0xc00bc8a06efbe836f671fc56e7accb85fd57a9a2",
  "0xf2ea00904fdbfece0b0922437b2f433cee07a625",
  "0x97d0305d1d788768ffadf964c665d10bd11333ff",
  "0x16f610963685142e3090dc7408f2c7a187a85419",
  "0x5de6a36a59ebd7b01ba4f820a0349e62485c0070",
  "0xd26f12753603d78d0c16ee3e30887bc5e622fb9e",
  "0x0c31095ed00a65604649237e8df180adc8f81dda",
  "0xaeb8d54c846610e7fde3b75b49c9a9e84b45da4d",
  "0x30bea732635084d3013cef764379b1fcb7b09a1c",
  "0x41a66316528c9ba0b89e2b118e02189e3fb7f184",
  "0x333a89021b97eb618e7b3d76d0ce7f89e224f88a",
  "0xbd6a593b9cf47af74782db131bd97e70894551ed",
  "0x647f26328517e355b64dc4a2338c493baaf9878c",
  "0x3c61ea50a08a696ad452159543a692347bfd6830",
  "0x007f08b76a0ce33d105a796f30f91c98add9496a",
  "0x30efa8eb7bc4f17fef4b02189330a5631b75574a",
  "0xd4a509490b0328a556a30b96c916b3bb3db2554b",
  "0x7786562849e2184f2f19bda6d73d7516b6a97318",
  "0xefdbd2caa333fcbf63c0586720ca4849657dc005",
  "0xaec24b9350646e9089250c8316f3dcea9d9dff9b",
  "0xbbb13547a7686d00945e2b92c45dca302a07ea9a",
  "0xd7a42111b76c829242b3b849f4ba4e015086414c",
  "0xa8413d15c3f0644ffc9d1701aa6b4d2cafa50b94",
  "0xc761f75e63d4904b6782287cb4b1ae5f5ce839ee",
  "0x8c2357f19a070c747616ed9e112ba74618745ded",
  "0x0433f1eeed93d7cd38d34f86f39cd3aefa1633bf",
  "0x8edcde53246001a82f68fab21705ddbf73829860",
  "0xbda0e2f1c7cb2d70a3ae8877b4a9f6e4caf57ea4",
  "0x791faffa8beca825d0b81ab567935f2dad503d21",
  "0xab18a4368df6b09236839ce10af1f86181dd58c7",
  "0x645939dd7b8dbf4486f8859644234d4b2460c959",
  "0xb61327771866a65a3ea927ce1e43d092a2dd2eaa",
  "0xf0bc5dd658185523671aea1a59022976d55677fd",
  "0x7f26199c184ab43ac297b5e48ec445d6eb3c2828",
  "0x6ea8233d0ff9ace7191017878ee77dcd7c6022e1",
  "0x157564022e9c518d6163d075a18359a6e976fd12",
  "0xb9d5c643b3537915762a619e4480bc87a0402d4f",
  "0x3416e6b21d6a2d1911aaa34c544237d7692e6cfa",
  "0x6edfa04b8a174a777118aaa81e95fe8a7dcce014",
  "0x68b24992f1ceba8be954166b48aecf4eda8e4099",
  "0x18be4a099545f15007c38ec2c195649a52b9d828",
  "0x3d53209ed55265a765259f00b6b9ce1ebb7c0583",
  "0x63efd67074eaa2447f7a2af7b7f0a5bb434753d2",
  "0x99f33527688bf8bc60935140cbfe31633c6fe997",
  "0xc69751dcdc504ff6447bef3b76ad2fb79719e216",
  "0x5237c5bbe109cc23858fff6c6d7a7d13f3137ede",
  "0xb611bc7f6f070a0d766c47c9c08121851fbbc009",
  "0x8Ec6507202854a74cC8Dad07c9bEa9cb1BADAb87",
  "0x18be4A099545F15007c38ec2C195649A52b9d828",
  "0x97BE21d1F50a3B314040f1A58F6023E4F99cc132",
  "0x9859D26730B47406Bf034e9216634336EF0fD84d",
  "0x331d6CD78272131Ef15b24b0a64DA3A7A1233A2d",
  "0x92B8260899aCcb00A8094aBa038EF48b17D42D31",
  "0x3D53209ED55265A765259F00B6B9cE1eBb7c0583",
  "0x18855B681A2FB4bCcA821bDe693E68507725c3f1",
  "0xAF6a58AdEd7d46167957F071dD647519f1b3c964",
  "0x13b8daCBED3be5709d6fF9639F185585B5258C9c",
  "0xEeEff169dB2b69D530e7B912BA079B77D9145B3f",
  "0x2dC4aD4679bAD50CE054796Cb44b170b3AdFe9f2",
  "0xadadCC82683dFaE2622Df86900f9c004bDc64CED",
  "0x824F971261e922588F6c0eA3D19fA38F993d3e65",
  "0xD89544d9f8b40a92590D4f27ad68Aa3322128960"
];

window.checkWhitelistWod = function (address) {
  // console.log("CHECKCK")
  let found = 0;
  for (let i of whitelistWod) {
    if (address.toLowerCase() == i.toLowerCase()) found = 1;
  }
  return found;
};



const landWhitelist = [
"0xb437a90e59785740a67fc5376180acc3b705edc4",
"0xb4bd860f00df73559fa73df86ddb644f1a1c4ff3",
"0xbd94fef81f1aee361adcaeac035c7eacbb8866fc",
"0x0291a10ff53fedf62100c1051e93aa52544be85a",
"0x6caa65efd794163141f7a0a44d6f93f3146e4dff",
"0x13b8dacbed3be5709d6ff9639f185585b5258c9c",
"0xe59455b7d61dba7d70db666a8930d4152400e9a6",
"0xf1b4d55cf1d309e3c1914aa6025d90ffd24910f9",
"0xa2b3bac969f034cc5df5a517a7f3660ae5c15bed",
"0xc889fce92f9a29b29f8bd28050beca87afe594b9",
"0x9912a0a767e06566b356cb17521b3e3c13ecb4ed",
"0x2ce99f178daa9c3ac5a3ac86e22800c5bb011739",
"0x2739b27a2b7da09e57e209f41753df6089da1b7e",
"0xbfa3b43b735971b7f1a92028a975b44e1dfc157a",
"0x3d0a87a9c3a31291e6952d4cb7b154f38a4bd63f",
"0x8010b39a468fc2a05b7f213bdbdec8ac1b3cb24f",
"0x9bd215c2530df574657510b2f991d5c326df7c50",
"0x888147e9c6d943fc33ef8ac65d042c22c0a9ebf2",
"0xa1f1b0daa0710b30f05194b12d0e1c47955032fe",
"0xbb504f45adb368da44ccbb50f5142faa648c755b",
"0xa8517fd6063c55256f9afbdbd3aa4e472ad1ac3c",
"0xd732d553192277f48d591932d3f4ec7a405db191",
"0x7990b8405160155d8e9cf27442680aea48b94747",
"0x92a76b0c8af74ffbcb7e5917469f68bf5a33fa0f",
"0xc2f2aa353e02b9590829319289556bdb3f02dee4",
"0xfd7fef4c21fe27d06c419c126302051066a76b6a",
"0x73b679f48dfa71e044b8eee478d22622dbdcb806",
"0xc70c5488bd2eca4cd345007e14fa2e1cd45da711",
"0x971560fe12837755b6ecb2c8c21effe8442325f3",
"0x38c006dc41f3c2cd004b79c31bcd194b1c0e273d",
"0x9a366ab27ca08138b7a73e47222b1cad29f5c783",
"0x840e22d01aaea97b7bfad7089a994e427646ad2d",
"0x827fb1efb4b247bf5297c25161920e77630954b6",
"0x11a9550ae67fc85554933d26eec9715d01483018",
"0x743bb8871ca88eb46cb87508ceaf9163e0633dd4",
"0xf7daa481ca09b2818552c9c5d56d5cc88cf18047",
"0x6310d0ad15c12a42d278e1234d3b087e140aeaa0",
"0x5b70e4587a5fc8e35ebfe6548f2b3adb1724f02f",
"0x5a3a549aea8be363d0cf797c53fb1d0932e2d17a",
"0x4a437b6078cfb41bc599c4379a9d27259f1948df",
"0xfb3cd59bc2f9d68c97a6e823cb1fc75ea96ead64",
"0xfacfbb40f154b650206415163c401f3174febbc4",
"0x4ea58393ffed8af72e3c0188de8fda3f8774fff6",
"0x0ef5633ccf06ea7dd4d2031d4d2e958d6f97305f",
"0x5dcff15a0e3ed0ffa1d143e0bc773af017834f56",
"0x037237b1f278cf7e2c94ae93e9770d7aa8e3499b",
"0x6d31ddc5fba308b3f4678c5e377ae10dfec8c5e1",
"0x8fdf9a7cf1f761edd912eeddf8a0dccab6ae63d5",
"0x5285638aa28e0c9e65807a80cd6e29f9427c25f4",
"0x08bfde32b96088c9905582ff9e26af3452a4c3a3",
"0xbc5e4b002af645d4790e6c5a358f865d89d97073",
"0x8c999b813a7b5ca3852f814a63ea5621f2255da9",
"0x4535f7043f42faf785c8deed1ef46b170eabc9f2",
"0x3fdc5c80b0d5146c0911652806d7f9a4fa65c6ee",
"0x293f89d437e0e076a01d15a6718d6d5d66223193",
"0x9785e7b42e9d08c1e2e17f21c9c110576d520a09",
"0x0ce02d3a89efa218cd0f486514cae77d74b88bee",
"0x440cd0a093aad60b77ee56965cc60c2381652726",
"0xa44AdcFeD2B09Cd13b97134Bc37dCC3Fe6964e5e",
"0x0438331A6fb1ef9ac41cb80c896658Ee572F364C",
"0xF4914F025b45798F634fBE638d33701FBff3274A",
"0x170ff9ce71675ce4a1a6cbe72ba4431eedf71cd5",
"0x781424EE37831c0693334Dd3CB5CB90a1A77E279",
"0x3918bD07A8351eEfb46D8b3F5BC1CD3352363068",
"0x2312D7126a0a87114D018E762dc6CAf8A74f04a8",
"0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
"0xAF6a58AdEd7d46167957F071dD647519f1b3c964",
"0xd732D553192277F48D591932D3f4Ec7A405db191",
"0x2B838A5a2B8A2E80E965f1Fc9dFED63F1cC269Fd",
"0x44601Ec1949110ae6ED02104f6a3eB327C8443C8",
  "0x92b8260899accb00a8094aba038ef48b17d42d31",
  "0xf4a7ff0b26d619c2a4f7a24549634198f147ecbc",
  "0x2dfecfb542983171b7b0f7466f74d4ad1e5e2072",
  "0x75945d229309602a450e0ec3d8cb09ba24271cd2",
  "0x710d5cd5aa21fd01215d70e190135440d06bf3ec",
  "0x750d93955fb5c14bf5568d81a9db3480212afe75",
  "0xf210579ff67e8418843c31466657064937f38d1e",
  "0x3a42c1af22efc2045ac826546b04d8148020fc9b",
  "0x58d949d7802145c6e253a9dbd3c6ea1dddab6dbe",
  "0x3e193c8719de67053412dd1317815acc5b17b611",
  "0x6213fd5a700d1a059e2fb05077c5bd1e626ed9f3",
  "0xfd5eacde8d00dd48f2993581ccd302441666f938",
  "0xe42c37f8f382fe2f2e042b518c5e72d3247100e8",
  "0x78e741110b22de0d83dd9c317996997d4463c4ea",
  "0x19cd02ea624ba69953bfa13e5ae339dfecfe09fd",
  "0xbba803d2e476167dfd1d78bd43dfa829e38ba9e3",
  "0xd508128639cd947b1397d0fd877e8db1d921266c",
  "0x57088edbb65ecc79a4973d652aeea57df9bf2fe7",
  "0x63a50484d8298997e9a67f1c09d9d8d8c1064216",
  "0x26d1e741d609baf126093b2c5494c7e98a3f23e6",
  "0xb0db8f67cf34e681e17aa0f618c9fc7a0746e042",
  "0x7911670881a81f8410d06053d7b3c237ce77b9b4",
  "0xb8609e56fe051c39cb38da3b17718a9150cfa8e4",
  "0x23e66a52e4f4478ca014406e427472e5711fc7b4",
  "0x04f43c60985d0de00d3d7d7ba8b0db2169f5b5a8",
  "0x9743397eb437be64e25c41a1e94a80308dfb84d6",
  "0xd599235564830cd7bae08855572915b9a9038e6e",
  "0xb110c28ab97ca96a6d98448973a7f6cf19c40a2b",
  "0xfab0eb31c29c756f9d77b2092173eaf2cd5f5869",
  "0x3e072dfac61f2a2cb570fc4f17f92535f0192b69",
  "0x0c0828654f0563a1d4aa31e17c9704b9ba496927",
  "0x791d29fdcf6ae46cc1015e1c9557e2b5a56c90b7",
  "0xcc9c2aaf22fd9634dfd7685e2223fa3e6279d79e",
  "0xadadcc82683dfae2622df86900f9c004bdc64ced",
  "0x07b5cdfefec4cd6d38705ca2c0163bb3d9e81e53",
  "0x60b1708e496f33efb9198fe5219656f31665d16c",
  "0x1e39df0d0f7cd2054e45282c18a19825ed942d1f",
  "0x547d7d856a69253e1bc47f5901e667341579c76b",
  "0x2705e58ab258cd01fba98d24f92b8334c323cbfa",
  "0x3986794609b7f598c6ec643fb5b5adcd2ff6fcce",
  "0x1c308bcdffa3cdafd2d2eaa740ae5402c44f2448",
  "0xe4e7048d40e2c83dc1da4dec2a52c7b7d0dd57e8",
  "0x10547c966a351b725191769bed44e8ed91f7b4b0",
  "0xa15ef336ba55dd6a70549f1e57389cbeb76d5a10",
  "0x5399906c8a73c6489fc6e58f983519763ec15f84",
  "0x113283d47430ce2d6a80b023d181800b51199781",
  "0x3b0332e1dc000d7ec784d9aaf7f19d37787e0c94",
  "0xda346e71d8ef3d54fbda6902f0ed1cb26155d6aa",
  "0x1b3c3ebc11a39d15ca36bbf3d68922284dfc6753",
  "0x3d7f5e64f5ce7b9602dd028c76cd4ed229d31372",
  "0xb1d1dad1460531f957c68425e5b2afe7cb015000",
  "0x6be15c881205ef234be74feeffa5b082a428b39f",
  "0x57f3a17eca242e270e97b3054339e1591eadfab5",
  "0x507c0dbe98945154db51c2b828db01a1eaf7b856",
  "0x5c69ee0ef4701dd3aec67851edbb8700c53e9cd0",
  "0x4c1066f0bdac0c05f099be1db98b36b6a4a63ba9",
  "0x4731cd32adbf2625ffd5a58957897c2c5fd649d1",
  "0x7380648a3c23d78aaa924530c2799c3f30858030",
  "0x0658d1287e32f8b45aceb7a3b4e3f9fdd431d1b2",
  "0xeffdd514912970a085f65f4f32d9c667d26445b5",
  "0x97edeb90e6882c552587f1afc4dba61a8c5fd8ab",
  "0x9169655dcdc03946be6d706533ab1cf6d66342f3",
  "0x60ce66b0d1c268447edd82487b97f02c3168963c",
  "0x7b07f77f84f29cf5f8d70faccba261b06945d34d",
  "0xf4ab9c471012a97a7891cfec8a42720fabd2fa2e",
  "0xe8220848ffffbc86d3c8efa03d5ec82a61b678e3",
  "0xd4acb74340eca0e086461be2ff5456a80e386a54",
  "0x92916ec0bbe52bc58ec1ad2bef338a8fe7399708",
  "0xbf4ad765ed59af33ccdb9e94c2aafe4ab3439b88",
  "0xae3dfcddee17942b0c24aa42501d8771fafe386f",
  "0x6d935f6ebe0b21ce62bde35111f849ee5b25fc79",
  "0x473bf1b1c8bc6f8f51a511ebea01983533393bce",
  "0x8f81a669e920400eedfbbf0c106183fe5479e965",
  "0xd34f2f775018af7f1cd69f907486d31dfa48e860",
  "0x2dee72a560ff4d16f2fda79a2285b95f976a344d",
  "0x6a2fe929ae32e03cab1594eb2f9d254dfaff5592",
  "0x47e435bd4e265e21a775d69ab26a17e4dc716c26",
  "0x6aa3e0e6e89549554dd0c83e2166da567dda6258",
  "0xdfc31a52143325237d8053d93d1299163c6d4576",
  "0x89107367ec98502241ba3716aab730aa0a28db15",
  "0xd3f70b32d96274a532997272efa7de71124cd536",
  "0x234ec5a19b9114b17cd7540b2971cf8ae1f4250b",
  "0x4aa2341a9fdead38ab48fd78a9358b0365674229",
  "0x3ae052086f90b8f5359e543b0fc5700f60afee91",
  "0xb584db55b3f8c7ae31d9f19e4c724a386012d2e8",
  "0x004be1301440e6faa824de3eb2eda103e720d69c",
  "0x114ef6422c64379cae0f7a7c15f9fcd909252420",
  "0x5b73170cb8cb8ddeb100c1e889919861af445a81",
  "0xc26a52c006ff644dc52dbc0a5e3d91da31ec6da4",
  "0xc2426753dcaad2174c81e40ca31b50156fbec4d6",
  "0x4c77ff39a722a2d314b4f201d29f9b760dca6c90",
  "0x88ddbbe05767d2db0bd766fc22340c4e91312489",
  "0x79292ae80bcc1da24083caf904189555ffe9e68f",
  "0x729033d6d74352793d83b6e8c1ececda9fa97db4",
  "0x7459792875c2037f94aacd0d95a928d8172e3f5a",
  "0x7abcc7a7b4fb76f5bbca829bf49f67a4aa95d8aa",
  "0xb9ce9529627024fcaeb1a6365dffeeff5f52d573",
  "0x4161e82828ef56ec05938607f646cb23f221ec8a",
  "0x6ec0b01893bc2508106351baf403bac6f819feb3",
  "0x8ec9421c8c675d2caa2e8573badee5e40c1b5fb2",
  "0x956a3963febec0c7682d86b00080afbd7cba0cec",
  "0x6a80789240408afbc5d6a1ab26e3142db634b088",
  "0x82faf731f8194ae5fe065c8ea982ff8ef9cfc9ca",
  "0xbc2af0659a12b497376f4d7d7d08f3e25de15ce3",
  "0x5ea917200742fdf492960abb701b2fc213d05f45",
  "0x4a1d6b8596bc65aaa4a51c6a276e02e90292afbb",
  "0x0f19a512fe46f2ed2c0fe1ac926e4f52723b0824",
  "0x242fce2f05f6d71d25745b0f7921115f7cba9674",
  "0x6b03cfb59052b3729c12ddc48508604ffce89495",
  "0x24867f3586148a9ca8a354b7fbd32254f2776ac5",
  "0x729ab043d9535dc9b2bd6c29d2dc2224cc54a514",
  "0xbe63fbadb5537302c3608e9007f179b52b7913ec",
  "0x5c3a3a2f5c0864075e2065dbd4c703762d240883",
  "0x9bd91f0a652df2fde9a90195b2b698b784ee9c76",
  "0xed5396db12af331c820c3b58a9255a78f6050254",
  "0xcd84dd3313d5fcd55f420346b15b7b33e791f0e5",
  "0x1b0ee1e3a63ddb908e0b5997e11116a577bd083e",
  "0x4fac752d5800f5e11541ab909c43cad3f2a27a1f",
  "0x1b11ecf3d36291c0ed97efa5f12e809dd18b8aa9",
  "0xad4fe44a3987a1f37a738a2044a78a9a0e18af31",
  "0x033adf72c1ffff7966095ae9727101e29ff53437",
  "0xb567adae96f96f86c29a879c665a2160cf4273b7",
  "0x0072b0715454fe4702c67dd07e239f234cf0deda",
  "0x423363acf28760ba8700d427cdd7252733157464",
  "0x1a3de3693a1c9ac60ac098edd287a98ddd4d3be3",
  "0x4fdb72c30615c64df89949182d5d2a60cfe8ab84",
  "0xb90ca4ca55f8290557ac7bc58b92e9b54b89563e",
  "0xe0290c2cd56ca577b701a1067c470ccced9a5af0",
  "0xfd4c075a629793f281fae305b19802df4b00899d",
  "0x14a42b9062a1fc4c2c2ae8adae93d88b9784c26d",
  "0xed5c6ee508cda345ff3103265d39f1e537df24f8",
  "0x482cd06e04ba4ebe1c1d4845e96429486981812a",
  "0x564a821d55576675999fa99cf481a012dc8f2aac",
  "0x7c8ab8483b2cd49a04bd02757c04dd6d2f781b97",
  "0x5d62d6e587dd35dbccf68f1560ef6b87abc14439",
  "0xd4fc68afc51623c0a26396c2107a3684ac3e00e3",
  "0x6458dff1da024941e77a85fd1038cf985baf9d7b",
  "0xf8dcd113fd41b2ab0e73896ccf79ccdc467bb7a3",
  "0x90dd7edb9d30a612e4e7bebebdbc25c025e9a862",
  "0xf808ab6f4db2bbf5d1837b51283a5de5e8724edb",
  "0x64d6f7f285e213a9f1e3b9614d3bc164dcba789a",
  "0xf8fc3630988b4f1d33540daa9d8d4125d7b7935b",
  "0xc41bed8dfb9c44f80740cca2c1d05b47c2dc12fc",
  "0x82b9b5be72725b264d1fc4ea045d8bcc1bcaf205",
  "0xecc2f0aaa5b8bd6e7c75b9741294bb4da52af5ae",
  "0x2c9f55f071d2fe5e7649f22e14472dd15c589765",
  "0x50505ecd5d7ed52e9763287e8b2fa0e724731265",
  "0x058a6a063cf0c6b3d06c41d6f3bbedd366fef593",
  "0xbae22b1f071e86de944a9906ad5fd6ddab08cfd4",
  "0xf8a505edf6c626219ff5e1b5ab8799e7fee8970a",
  "0xf923fb2edcbfda1abe28a5be2375e74fb96a80c0",
  "0x01bf87d76339c258c5e420f4f1fd52e49be6f929",
  "0xa4ce87fbff84ddfc797bddb2541183070126758e",
  "0x913bcec2791689f1a329fc2999dff1e12ed54200",
  "0x17f97e132cc8db841608c6dffb365510bb5ab5a9",
  "0x7729421ba351072768da8fd1ceb9bdbca95160ef",
  "0xa928f20295089fb7b03f14fc43a6b207a7fa4622",
  "0x00df3b37ed7302ee504f61747ed38dc13bd165e4",
  "0x2c4a6752755870f63c7400fef82e9e053e47b579",
  "0x6a9b756297cdfaa6bc76f79bdfe52943f2ef75e7",
  "0x03caf3d7f3ab920bf4a521fa13f833aab6790533",
  "0x2fa07798cbbfa24c5d96920065690e66239c1dd7",
  "0x38abf24b3b911ba1766e2b871af54a7115d83b1f",
  "0x44ed589e1ba1a7059363cccac35319daae10c6a9",
  "0x4b4fc7eb594a727bfb5f33ecbf900826f5a966f7",
  "0x22c6b50203fd8225c2f9766845bbc72787edc04a",
  "0x700f17678e222cab349a8812286b879925a9fd90",
  "0xfbfe41837f7ac4d67e673d5f218f649623c2fcff",
  "0x13e404c1e6ed76c2ee902e89d2cfba1ee1204e65",
  "0x392a083d0fb31d31cdd850da4dbd88a84a2d22c3",
  "0x5911baa5a06b481696079cdcc0701d41f587c4e5",
  "0xef5f80516b03201c91bafa36ae5db4bebb5ef71b",
  "0x85d7c427bd833fe3d06b36e8d136fc95a109dd56",
  "0x49a01eaa567f055dade770a7457cec5123cacf6b",
  "0x6adc44d8412e939fd36584da3d84fd0cc9116a30",
  "0x07cb6b65863d0dbc11044901a7b7d80b96a3599f",
  "0xce5286a583d12fd07e63917631ddcf9e4926d4ef",
  "0x76f26be81510e628d38b9d7b16811849a3e983b9",
  "0x56a16710166d72f5e7a330a221a45198c8ec7156",
  "0x6575266b588ccff2774745f1d63a592df0f0ad8b",
  "0x80833a97f52db2a7272c55f09b6bcd9a84f1ddcb",
  "0x02876ae2652497d53172b7a524d72dd4ea86f4cb",
  "0xd09d5423374fc13b5a43bec5cc7dd58fde063420",
  "0xd2c8ff2e94c990be91a4df41e4fb20f032a97ce5",
  "0x94a92b242d8c78189e5c7499025534ab5c449c84",
  "0xb9db89dc838602ec3144f988705d9ee05c9a629b",
  "0x3b02b9339cc00939d0b40eb42b0d4c1aadd1ecec",
  "0x4e8eb23479bc2aaa4c331109164528df21f23c7d",
  "0x48c363b1e3ae5054b87d4550c9cd7fb0ff27f43d",
  "0x6930043a23796039137435a7d36cda3123256a86",
  "0xd6dc9b14c635ad5d77e9dcb780906f32d4f6b996",
  "0x1a9bb80224602cd9e5e944be325feb54903cad46",
  "0x64b181c6385a7d50ec9ed9cba9e432d2ee5afbfe",
  "0x474b710410db98a87c201ad7048b7fe55dac41f8",
  "0xad73c617e4acf9896be905ba9e2f3b017d9990d7",
  "0xc6ea98c4fc7f731346815ba1e5ea337caf1cbcf0",
  "0x81b35c8c046ccbe10a83e6d2aebd8e606b8acbd7",
  "0x824f971261e922588f6c0ea3d19fa38f993d3e65",
  "0x375eed0933c2ae6bc3d4e5baa03138f7e33a6fd8",
  "0x186c341913c2daf5ef45962186866aa69e8536f1",
  "0xc2cddb516a5cfeed6fcd3d97a76bc9d3ce929c8d",
  "0xf8ee7222e195c7813f8040e6374ea61f4278af9b",
  "0xb2e11aca7c22d24c7035b4dcd786958faddcd002",
  "0x2a4ea867f7892d22528a4c14456c98621c505a4b",
  "0xfdc9e8732dcb3596e42f9dc2f4b3d5c7d8ea2bef",
  "0x2be83fa10dd2eeb591d4e45c7f9c96a890b662f9",
  "0x88390c236b3dc438734e4b6d2584e5136d10d51e",
  "0x14e24775cdb13c6014af82e82957de320f3d6b1b",
  "0x31151215926636ec8d4f411e0158f7c4182989cd",
  "0xd9a8a0fb784e689da100e6ced30444a65026a6fa",
  "0x5bbc9dd4b081a1abc140ccece156e3cab556d2dc",
  "0x42f306a2b5ad5de95f3f341381287e5b44e80e61",
  "0xc8294eba7ebaf5064c62a9a5cd8a349790a6dba3",
  "0xd3cb8cca8f40aec9238db25b266699b3973cac52",
  "0x623ca3dbf0b379be121d45df20fe9e0094e46111",
  "0xe951ae38003fbd35dfc0300bc34a59f6810f329a",
  "0x8b9c0620d814e13b5b330237ad1fc131ec735782",
  "0x189db2793a1ffc263e7f8d86b3975c0e3e28b146",
  "0xcd79e2a11940483ddb4337319a6b95df96436990",
  "0xeeeff169db2b69d530e7b912ba079b77d9145b3f",
  "0x5043a7b5812376190d4744ff6cea18b5198ceb24",
  "0xb9736e36c27ec7010190ad5d9a3602b2f5d74262",
  "0x3c8256ce9cb9d4f9194982ae409db196636613da",
  "0x3d78643f18a612e0a2c9e45491c8142522028c8c",
  "0xa441f6b7b240df8bf5cefcb83726cec563a74de3",
  "0xfc6dfe0406f89b175d7f8ebac8db6e5880744ecc",
  "0xebbe15457bedc2c74603d95aca99f80141765a32",
  "0xde0de93cab36cc6da92ba668a828f48647363fba",
  "0xf0cfd321d3d4f8bdefc9f81fc532c4087e349d92",
  "0x8d3b4cb6442a3fb4bc21b308df059b878e4490f3",
  "0xe42f5022d353fab44c25a221c3340353c623bb76",
  "0xd39791e175970f5dfff3333ae244571f95367853",
  "0x590b3d610de254ae16a2c2d8a1052a5591a32b45",
  "0x4038c92e548a7d3fe5fb7e095c6bf3d849af7bd8",
  "0x92236bf1a99b08106c51571d981e6c608419fca6",
  "0xb11dbe6fa9d7da9f33fdaa4e27c7460cb82e03ed",
  "0x9d251fa4bf9792aea4d759edb9b712ef35b89240",
  "0xb1c612ca9e2a64785f35f7a16b6a14422ccf0102",
  "0x3686a6a7417db906fd2e56556d13e18fb24c98c7",
  "0x6f56c42e0a38623fcc246aa03a171b913be08906",
  "0x097a03ba41660ad8382c59bbd6ca7b14b66617c2",
  "0x6665b0f2e208bfd5ec6af4c1bb84013d6758322c",
  "0x226058638dcdfc1885c773b93ff0612f764397f1",
  "0x02e399b2eddf716fde8e9c1086d1a8d34de01011",
  "0xdeaea7cbe675f80343a590facb4549a995d46bc1",
  "0xd83032cc0b0468aaac6c1ca1d1e447997a39a531",
  "0x789efd337c17d124ec312f4a9f59e135439792a5",
  "0x72b4f933826d282c38ba63c914e83630d85326b7",
  "0x6b172fb540c1e7ff24a245e3de5eed28b638fa3e",
  "0xbeb6d98967ab52e5bd7362f3519ca1de2bb05ef1",
  "0x67a0c1e4ddfec46d3e3456f6b9ccc50198acd5e8",
  "0x68d04be9ff8ba9972049bef837ac1592eb21fce5",
  "0x3a32b2c4f396f837a49f0632865335956bbc68b0",
  "0x1f3a3a5f2bb44797c9ca889d50dc3dc1a1cc1fc2",
  "0x1fe6f581f9f9411d30a1a1dc89144eaab34135f6",
  "0xe0affacc943ad8a45c19306fcf1053b4c103bd48",
  "0x0c3cdfbdb80c74ecf9ed2eb0db41ae2c7177e5b0",
  "0x79d9116c5ea4433e13f003012c085d40265ca58c",
  "0x85e4c4aed490fe46b400abeb30e2eb8a1feb66e3",
  "0xae1a2dd06e3d6b8d1deec71c160c7697a379f93a",
  "0x789fa5cb1edab78b5cb80e5b654af5919bbea6d6",
  "0x9ecd6748c08486eba2d17fede3b484b93e364e8d",
  "0x0151f0a56057829c124b02e9818746e5423d7f24",
  "0x7cf6ad76c852abbdc918fa637773e54944297fed",
  "0x4e19e8c7fc35ebc6a6156ef61c10fd0b705d9a41",
  "0x390def5050dd6e526d22d26f90352105c194d476",
  "0xab4f002cfe1a3694377c4acda400180c176cceb4",
  "0xc0cece95166859989155bf071c49815c240004df",
  "0xae9137b6709363ddd7c0c5e289b08e4483b2d982",
  "0x8e522ba3da3369b3f54e8c350fcde3a3b669fbfb",
  "0xe70c0c3aab4e8ba3bf5d11014b9ff998d9ddc821",
  "0xa072f83a91162d63e3cd681eeebe9a339ffe555e",
  "0x3d0fceb8c90c2c8700b695824cfe753fecd8b934",
  "0xb85f17ed941fd0c46ee5c7897208a7fbfd94d792",
  "0x1cfec78168fb84441302bd3aaf057650857cdf5f",
  "0x76ae6899e37f44fa08f7a746c69795ccc8b9cdb4",
  "0x28b3ec9b4ddd3fb9bef2375eab9180856c32ceec",
  "0x62d081361d2d9cd4b1d6373c8d97ead38510c2b8",
  "0x24a6518e097c6c9c9d8908dc6d72fe9c61f4beee",
  "0xae1ac376f98827272c41e170171a8ce8c021ebfc",
  "0x3f06fc4e524114cbfa3c63393b8f55f373494413",
  "0x7a7f158fd52d3e499b0a29bd57f416aab94ca947",
  "0xcb5a1d45eeb40b2f481c4d9341ea6f821dbdbfa3",
  "0x5106178372f804a566c9ced6f677437ab23e4e9e",
  "0x9407b6e32cd2d0dfdbe09c7602419c0825b0d079",
  "0x754c2b70af75f4f04a8838af60306558c2df51b0",
  "0x64f8817abe78d1811fd41f9909208152d34c24ce",
  "0xacaf6dd5aac811d06c45a105aed016ce38f2a72e",
  "0x644513f4c6ff2b451f1c244ee705c66e7f18628f",
  "0xf275c4e7b0e4c6e80c8bb041c83a52a8ac2124d0",
  "0x2c188cc6ea68e128487517932dc7b1cf0ac9def5",
  "0x3c8ab210d46d0a033cd00459be9e69c22f0ec860",
  "0xda26dedb9c9acc191a533f67a850963a17287a7a",
  "0x4da3201f9ed001dfdd8292d7f33d189f54a41c2d",
  "0xa0adf6fd9649ee77cb9dbc221ec6fee279a4dc2e",
  "0xff1c92ecd1cb72d8ea3c32b415b7fa07aaba175f",
  "0xfcc2de165e0edca659b021370efdefe3d8f25a89",
  "0x4c5d0741aeff4707cbd15f66b4b001d7301ce547",
  "0xa9818cc5c1372721ef2026c9d3663dddb7d4398c",
  "0xd68bec405a593f620cd59f02bc64b5cb88b69d42",
  "0x1d6d96b9c954193b87d7e6009998a2390daab1ad",
  "0x092c2c9590e863d97686a914dcb8d4d152a5a5b7",
  "0x08a45ecfa381496b42133fb579ac6e012eca7310",
  "0xf1314d7ebe61974cb2c53784e227d26be0fdc181",
  "0x41890ddaed0e9846800b074a7243c2ccea4706a3",
  "0x913b6593aa300214fcac1b41f8b87bc78624e392",
  "0x766954c8e75a99067ff5455a803c8f5023d1f08b",
  "0xafeafe67e4f6f27e18a9ffe41122c5d9d0174a83",
  "0x0ff303163ff9bf990ede3d736999c7bcb42c43f0",
  "0x501913718b2dc7acfb7ef8d4815199f9c2b308f6",
  "0x5fe66ada564d420b25f93adc2a0b85922f14eb0b",
  "0xfec63b79ac3a1f4dbddb71efc52455cf26dd3078",
  "0xb60ba801bf544a20cbfcaef7dece4652d814cca1",
  "0xc184c7595496b9b3e45cf8932a99d9e42e20c53e",
  "0x579b8bc306a73981f9bee59baf0f42cac8151138",
  "0x0f730a8474f9171a0fe1b1cc58fae23d74b8ebf1",
  "0xce7fa44e60aaf696fc552fdf07fdb282c73b4246",
  "0x7f74c51760f3a9d4dd93dd774c92daa040cced3a",
  "0xfc158c26afc43fd662ca6352cdf7f77ca83324d3",
  "0x250e7a4943bee210894dcf448a343b3c05c0e27b",
  "0xb27692ab696f8ca3fc79e0616806ea2c99c37d83",
  "0x427b699190958be0b2485356b45c113471880363",
  "0x5b23903407b8030d8774600812e162b50bf86cb7",
  "0xc9ebece2f7f3d5102622c4797d34794adead71c5",
  "0x8bfad43cc79ef898fa12b5a9730152963a5cb885",
  "0xa7bb926d4907538cfb6a509cee7d563c84825ffa",
  "0xb980a4c132e9e47856f6e9de3a9bf88b2fabf705",
  "0x19261c61520212b7d92708de7f57f0e356b0fa09",
  "0xa0b1555035f9133adeee82ac2628f52d35c3e2f7",
  "0xd0584325ba53e27050494a2883a76a7ac4163de6",
  "0x5ffd1a9e9e47e5ae4bfa1d2bf9be573a91c4881b",
  "0x0a7aeb6807e55e44189b54c983e606fa1fb38960",
  "0x1961251cc556cf293473130a58d8c468c314e498",
  "0xc31fd827c9abf0443a8f6a0c2264633989da1c14",
  "0x342b48497170fcef705bf7a1cef7e2992c430c9a",
  "0x96faad3b63263c530bb31ab5b8c1d51671506ae5",
  "0x26f55eee397e6485ad91a54569907b04bd353934",
  "0x5f285167da6e562b1a5b91d47d81270f96431c95",
  "0xc6b7b0408014900ac9fd688917d996191cad2926",
  "0x1cdd19de27cbbd5a3c4360e68db3ca00aa706b98",
  "0x56b9ea87e1beef99e648380ec93a5136fabe4f05",
  "0x75b3328870b0ee1b5cd2c9228672a22f1bf09784",
  "0x723634c9102899242373c0d108337c32ed8e018c",
  "0x4e26e81e579a91a8646b8c008453621f867a32eb",
  "0x50955d05eba9cb2fac92f0e09d9a74f74fbfa69e",
  "0x3a8509ad4a175cb6534bda1399358dd46a0e592f",
  "0xf4694726e0d715c5a132dba94c794f33cb887220",
  "0x5ce4972823b89091acd492b754ce7ea59b22c97a",
  "0x4898a3c96eba7dbd195ca8346b7fa051305a8c1f",
  "0x1c203499121c1c65f713d6c6f76d18588d88131b",
  "0x236458ddb9a8e1b01347042b54403dcd3bc5b4b3",
  "0x4828cf4f5e521937939e5565d89b8c3b2aa10a36",
  "0x5e26e83ae1c2e39a98eb0c1952e46552cf5190cd",
  "0x888880d396b385d371281718940dad136119c6c9",
  "0x5c7b8aea7d0da540efebc835129180242387f5c6",
  "0x140063a309fa9cab5f50c55ffd4fae592177a263",
  "0x27b05cbd0cb46205723b59c0e1ef5f310087e86f",
  "0x470ebb611657d4ec550f417c952547f35d835f0a",
  "0x8ddd3c104f48de88d9ecfc80e61ca60aa092bfb8",
  "0x32c266dd2fac6269af4a03617e73397865b3f7ad",
  "0xb86064ae481935fcad43ad2832dbb588f06ce934",
  "0x7bcd7a26283cd3ce2229206667923e912ec70d86",
  "0x780cae18fa6a450416382d15c5811b3aa0b9d5c9",
  "0x69a708d9340cb6dc1e90fa334c548a20cf80d864",
  "0x054ecbf04f10926e8d0eed8f376bfadb9065b237",
  "0x728788e3bb15bd1da3f373be7cfea47eeb90c44e",
  "0xc52c8731a43bd0bbf593075e9d704cb44a1f5fa0",
  "0xbfc7c69c5cbfeeb4a1887dba1622c5f96aac09f5",
  "0x3ebe2dbf88c0973ad17d010fcb5a85828a1d36d3",
  "0x1c40bd892eb3ed547b5519ae3b60faac0ddbd0b6",
  "0xcc235c4768d3296b0e4e2b79d8ec25200324c78a",
  "0x1b30c1d67333b5c3dacc649876bf09b6702ab8e8",
  "0x66c5ec661bf3efacc24d61bd188f05208135a4d3",
  "0x84576e575fc2f9f0211a4a06b8895f1867af2f80",
  "0x8795e36d4845a21524f5d67d750f657e3de9a2ff",
  "0xf67e06d74d769cffb35364563c76e5138987af9e",
  "0x7906fbe48352bb08b5b3b398c44850ca65959d36",
  "0xa04bdf6183f0f128052825ef316496476f535077",
  "0xf261fcab20fb90ff11d420bdb25287e420790227",
  "0x21c319ef2c957e8a9e23af5e1c66134659183dcd",
  "0x495c04292b85f84b69a99d625de30d646a042fa5",
  "0x8d3d6234c75cc99b4053d354757fb4e7f4633744",
  "0xe02b9751b07e619e8eef8216c93198d3f885e608",
  "0x1ee9edf3bbe36987df13cb76b174b74319ee31dd",
  "0x5da93f1641bc417d1210b2a0f864b4eed241d39a",
  "0xdaafe8b9efd3d1c3e3f2d54d219740d3b37d1327",
  "0x65be804c0a544f194994c2f3d0951ad55d6e05b1",
  "0xbcb3af70965c5412fe92ccad9f478ebd65991f09",
  "0x9a9010b7ffb63baf672c36b0f2a343b127c5b1fd",
  "0x6a6d41a6350eb9662550dc7252132658eac90653",
  "0x1f79d93688575337132c7529624e343e7990a124",
  "0xf76908bf4ef5ed8acb091c9e41152fd4367115e2",
  "0xd15b8065134b4b875e7d3974ee59106cec170add",
  "0x014d6fb3d4eb85ee83a8619a403c1732c3b5933a",
  "0x7bfe1ddea8e066eafce3f20a2c23f3ac8db075dd",
  "0xfc19bb2b251d71ca023a37d3c281fa6879a51d02",
  "0x329e5624b461128d3469b833f18a24036738b83e",
  "0xcb504a16daa231e00c6c9862cfc61cf5fd76df76",
  "0x4e3b43222dad5c9095fe3e16b5f84c0699804a3c",
  "0x92a624ab8ab8865aa7e2f721ef5e93ed3685872a",
  "0x0a5ef2d3fa3167a9beb1878fa37cf15dbc1cf7b2",
  "0x377d95fcd4356f2e37799c0d3b7ea3d6d468e62d",
  "0x7cc6434a8876638d042e51d0320e6188d3fe693a",
  "0x05298cc9f0c9176852774e9f7f43a5ec07083817",
  "0x6ead3d0c2966c3bb66aec5d66dd6310fd1368b60",
  "0x5f0e6117c1a7c4cac61b763497333b4076a03186",
  "0xcf01dd94448c5190583a13ecf4db30d82b47c5e3",
  "0xf35403269b1d3b6cd4906b14375f4e6953665bec",
  "0x6b8d5ad1b5d6a0ea7e161ffcaf0e940bb2a0695c",
  "0x6bfc63276d711c4594ae9950b7fb56002968c2cd",
  "0x4bc40b69fec7e79cd67d16fdad51b123773cc1b3",
  "0x53ca6efb9245b3210f5b357ea0de81bc086c360d",
  "0xad80a189ecd82b22262a3dac2cda15dd6e12a6ef",
  "0xc930dc591f87ffa37845a7bea6f3b5e59a8341f3",
  "0xc32b83d6e008a305ce5ab8d22f7b43db14d076a7",
  "0x164156822c39ce5bca37a57fb626db3770f3e6ac"
]



window.checkWhitelistLand = function (address) {
  // console.log("CHECKCK")
  let found = 0;
  for (let i of landWhitelist) {
    if (address.toLowerCase() == i.toLowerCase()) found = 1;
  }
  return found;
};
