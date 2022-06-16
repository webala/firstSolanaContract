const anchor = require('@project-serum/anchor')

//Get system program
const {SystemProgram} = anchor.web3

const main = async () => {
  console.log('🚀 Starting test ...')

  //Create and set provider
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)


  const program = anchor.workspace.Myepicproject;

  //Create an account keypair for our program to use
  const baseAccount = anchor.web3.Keypair.generate()

  //Call start stuff off and pass required parameters
  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount]
  })

  console.log("📝 Your transaction signature", tx)

  //Fetch data from the account
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log('👀 Gif count', account.totalGifs.toString())


  //Call add gif and pass gif link and the user submitting the gif
  await program.rpc.addGif ("some gif link", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    }
  })

  //Fetch data from the account
  account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log('👀 Gif count', account.totalGifs.toString())


  // Access gif_list on the account!
  console.log('👀 GIF List', account.gifList)
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();