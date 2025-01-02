import * as anchor from "@project-serum/anchor";
import { Idl, Program, AnchorProvider } from '@project-serum/anchor';
import { web3 } from '@project-serum/anchor';

import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { CaelumRegistry } from "../app/target/types/caelum_registry";
import caelumRegistryIdl from '../app/target/idl/caelum_registry.json';
import { clusterApiUrl } from '@solana/web3.js';

// Initialize connection to Solana network
// const connection = new Connection(process.env.SOLANA_RPC_URL || "http://localhost:8899");
// // Load the wallet keypair
// let keypair: Keypair;

// if (process.env.WALLET_PRIVATE_KEY) {
//     keypair = Keypair.fromSecretKey(new Uint8Array([199,26,90,241,161,26,108,177,28,133,17,29,42,217,39,56,101,104,76,21,39,255,100,11,64,108,180,45,168,55,15,206,233,206,216,215,214,165,32,87,245,134,179,11,166,142,138,54,54,70,36,75,145,171,209,94,65,221,189,241,84,62,128,45]));
// } else {
//     keypair = Keypair.generate();
//     console.warn('No wallet private key provided, using generated keypair');
// }

// // Create the wallet interface for Anchor
// const wallet = new anchor.Wallet(keypair);

// // Create the provider
// const provider = new anchor.AnchorProvider(
//     connection,
//     wallet,
//     {
//         commitment: 'confirmed',
//         preflightCommitment: 'confirmed',
//     }
// );

// // Set the provider globally
// anchor.setProvider(provider);

// // Initialize the program with Caelum Registry program ID
// const programId = new PublicKey("Gjgvx2rJpkD4bwr6rRkMDXzVdwYBiPf1ayzhatceZ4di");
// const program = new anchor.Program(caelumRegistryIdl as unknown as Idl, programId, provider);

// // Get the program interface
// // const program = new Program<CaelumRegistry>(
// //     require("../app/idl/caelum_registry.json"), // Your program's IDL
// //     programId,
// //     provider
// // );

// export {
//     connection,
//     wallet,
//     provider,
//     program,
//     programId
// };

// // Helper function to get program instance
// export const getProgramInstance = () => {
//     return new anchor.Program(caelumRegistryIdl as unknown as Idl, programId, provider);

// };

// // Utility function to verify connection
// export const verifyConnection = async () => {
//     try {
//         const version = await connection.getVersion();
//         console.log('Connection to Solana established:', version);
//         return true;
//     } catch (error) {
//         console.error('Failed to connect to Solana:', error);
//         return false;
//     }
// };

// // Helper function for handling program errors
// export const handleProgramError = (error: any) => {
//     console.error('Program error:', error);
//     if (error.code) {
//         switch (error.code) {
//             case 6000:
//                 return 'Invalid project data provided';
//             case 6001:
//                 return 'Unauthorized operation';
//             // Add more Caelum-specific error codes
//             default:
//                 return 'An unexpected error occurred';
//         }
//     }
//     return error.message || 'An unexpected error occurred';
// };
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// const network = process.env.SOLANA_RPC_URL as web3.Cluster || 'devnet';

// const endpoint = web3.clusterApiUrl(connection);

// Generate a keypair for the provider
const keypair = web3.Keypair.generate();

// Create a connection
// const connection = new web3.Connection(endpoint);

// Create provider
const provider = new anchor.AnchorProvider(
    connection,
    new anchor.Wallet(keypair),
    { commitment: 'processed' }
);

// Generate the program
const programId = new web3.PublicKey('2mg8v3Nxu1yzjjHbhX84jiSkfX2jBZcojTP4hgyNeLGa');
const program = new anchor.Program(caelumRegistryIdl as unknown as Idl, programId, provider);


export { program, provider, connection };