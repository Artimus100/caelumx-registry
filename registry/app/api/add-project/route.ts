// pages/api/add-project.ts

import { NextApiRequest, NextApiResponse } from "next";
import * as anchor from "@project-serum/anchor";
import caelumRegistryIdl from '../../../app/target/idl/caelum_registry.json';
import { Idl, web3 } from "@project-serum/anchor";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { Keypair } from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";



const walletData = JSON.parse(readFileSync("../../../wallet.json", "utf-8"));
const wallet = Keypair.fromSecretKey(new Uint8Array([199,26,90,241,161,26,108,177,28,133,17,29,42,217,39,56,101,104,76,21,39,255,100,11,64,108,180,45,168,55,15,206,233,206,216,215,214,165,32,87,245,134,179,11,166,142,138,54,54,70,36,75,145,171,209,94,65,221,189,241,84,62,128,45]));
// Define the interface for your project
interface ProjectDetails {
    projectName: string;
    projectType: string;
    region: string;
    vintageYear: number;
    certificationBody: string;
    creditAmount: number;
    ipfsHash: string;
  }
  
  export async function POST(req: NextRequest) {
    const {
      projectName,
      projectType,
      region,
      vintageYear,
      certificationBody,
      creditAmount,
      ipfsHash,
    }: ProjectDetails = await req.json();
  
    // Ensure required fields are present
    if (
      !projectName ||
      !projectType ||
      !region ||
      !vintageYear ||
      !certificationBody ||
      !creditAmount ||
      !ipfsHash
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
  
    try {
      // Set up the provider, the wallet, and Anchor
      const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
      const wallet = Keypair.fromSecretKey(new Uint8Array([199,26,90,241,161,26,108,177,28,133,17,29,42,217,39,56,101,104,76,21,39,255,100,11,64,108,180,45,168,55,15,206,233,206,216,215,214,165,32,87,245,134,179,11,166,142,138,54,54,70,36,75,145,171,209,94,65,221,189,241,84,62,128,45]));

      const walletInstance = new NodeWallet(wallet);
      const provider = new anchor.AnchorProvider(
            connection,
            walletInstance,
            {
                commitment: 'confirmed',
                preflightCommitment: 'confirmed',
            }
        );     anchor.setProvider(provider);
  
      // Define the program ID and address
      const programId = new anchor.web3.PublicKey("YOUR_PROGRAM_ID"); // Replace with your program's ID
      const program = new anchor.Program(caelumRegistryIdl as unknown as Idl, programId, provider);
  
      // Generate a new registry account keypair
      const registryAccount = anchor.web3.Keypair.generate();
  
      // Initialize the registry
      await program.methods
        .initializeRegistry()
        .accounts({
          registryAccount: registryAccount.publicKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([registryAccount])
        .rpc();
  
      // Prepare project data
      const creditAmountBN = new anchor.BN(creditAmount);
      const verifier = provider.wallet.publicKey;
  
      // Add the project to the registry
      await program.methods
        .addProject(
          projectName,
          projectType,
          region,
          vintageYear,
          certificationBody,
          creditAmountBN,
          ipfsHash
        )
        .accounts({
          registryAccount: registryAccount.publicKey,
          verifier: verifier,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
  
      // Return a success response
      return NextResponse.json({
        message: "Project successfully added",
        registryAccount: registryAccount.publicKey.toString(),
      });
    } catch (error) {
      console.error("Error adding project:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }