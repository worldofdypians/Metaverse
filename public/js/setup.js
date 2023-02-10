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
  // landnft_address: "",
  // landnftstake_address: "",

  /* MINT LANDNFT GOERLI */
  landnft_address: "0x1a6101ec1364cc1bb671a2be2a6c2fd0764b3dfc",
  landnftstake_address: "0x428d702b625dc2a917d087679e5cf99bddbcdd13",

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
        ? "0x1a6101ec1364cc1bb671a2be2a6c2fd0764b3dfc"
        : key === "LANDNFTSTAKING"
        ? "0x428d702b625dc2a917d087679e5cf99bddbcdd13"
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

  async mintNFT(amount) {
    let nft_contract = await getContractLandNFT("LANDNFTSTAKE");
    let landnft = await nft_contract.methods.landPrice().call();
    let value = new BigNumber(landnft).times(amount);

    let second = nft_contract.methods
      .mintWodGenesis(amount)
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
  "Wallet",
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
  "0x6CE9D57FEB61CbBe2E4F69De0485cE096BC3Bde4"
]

window.checkWhitelistWod = function (address) {
  // console.log("CHECKCK")
  let found = 0;
  for (let i of whitelistWod) {
    if (address.toLowerCase() == i.toLowerCase()) found = 1;
  }
  return found;
};
