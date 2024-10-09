import {SupraAccount, SupraClient } from "../node_modules/supra-l1-sdk";
import dotenv from "dotenv";
dotenv.config();

// This code demonstrates minting tokens for your account using Supra SDK.
(async () => {
  // Create instance of Supra Client
  let supraClient = await SupraClient.init(
    "https://rpc-testnet.supra.com/"
  );

  // Define the sender account (your account for minting tokens)
  let senderAccount = new SupraAccount(
    Buffer.from(process.env.PRIVATE_KEY as string, "hex")
  );
  console.log("Sender Address: ", senderAccount.address());

  // Check whether account exists, if not fund with faucet
  if ((await supraClient.isAccountExists(senderAccount.address())) == false) {
    console.log(
      "Funding Sender With Faucet: ",
      await supraClient.fundAccountWithFaucet(senderAccount.address())
    );
  }

  // Define Module Details
  const contractAddress = "0x01d161b9073efadad3bec144d442e16312238b7ce2838f2d26a5000e74da31ed";
  const moduleName = "sscoin";
  const functionName = "initialize_my_token";

  // Create Raw Transaction Object
  let rawTx = await SupraClient.createRawTxObject(
    senderAccount.address(),
    BigInt(await supraClient.getAccountInfo(senderAccount.address()).then(info => info.sequence_number)),
    contractAddress,
    moduleName,
    functionName,
    [],
    [],
    await supraClient.getChainId(),
    BigInt(500000), // maxGas
    BigInt(100), // gasUnitPrice
    BigInt(Date.now() + 60000) // txExpiryTime
  );

  // Serialize the Raw Transaction
  let serializedRawTx = await SupraClient.createSerializedRawTxObject(
    senderAccount.address(),
    BigInt(await supraClient.getAccountInfo(senderAccount.address()).then(info => info.sequence_number)),
    contractAddress,
    moduleName,
    functionName,
    [],
    [],
    await supraClient.getChainId(),
    BigInt(500000), // maxGas
    BigInt(100), // gasUnitPrice
    BigInt(Date.now() + 60000) // txExpiryTime
  );

  // Send the Transaction
  console.log("Calling initialize_my_token function...");
  let txResult = await supraClient.sendTxUsingSerializedRawTransaction(senderAccount, serializedRawTx);
  console.log("Transaction Result: ", txResult);

  // Get the Updated Balance or Transaction Details
  console.log(
    "Sender Balance After TX: ",
    await supraClient.getAccountSupraCoinBalance(senderAccount.address())
  );

  console.log(
    "Transaction Detail: ",
    await supraClient.getTransactionDetail(senderAccount.address(), txResult.txHash)
  );
})();