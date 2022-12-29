// Import Solana web3 functinalities
import { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

// set clusterApiUrl constants
const CLUSTER_API_URL = 'devnet'

// instantiate Keypair constructor
const keyPair = new Keypair()

// Extract the private key from the keypair
const privateKey = Keypair.fromSecretKey(keyPair.secretKey);

// Connect to the Devnet
const connection = new Connection(clusterApiUrl(CLUSTER_API_URL), "confirmed");

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
    try {
        const walletBalance = await connection.getBalance(
            privateKey.publicKey
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => {
    try {

        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            privateKey.publicKey,
            2 * LAMPORTS_PER_SOL
        );
        
        const latestBlockHash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: fromAirDropSignature
        });

    } catch (err) {
        console.log(err);
    }
};

// // Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

mainFunction();