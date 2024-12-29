import * as anchor from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import dotenv from "dotenv";
import { create } from 'ipfs-http-client';
import fetch from 'node-fetch';

dotenv.config();

// Polyfill fetch with node-fetch and add duplex option
global.fetch = fetch as unknown as (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

const ipfs = create({ 
  url: "https://ipfs.infura.io:5001/api/v0",
  // Add fetch and default transport options
  headers: {
    'Content-Type': 'application/json'
  }
});

const mintToken = async () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CaelumRegistry;

  // Registry account public key (replace with your actual registry account)
  const registryAccount = new PublicKey("2mg8v3Nxu1yzjjHbhX84jiSkfX2jBZcojTP4hgyNeLGa");

  // Project details
  const projectDetails = {
    name: "Amazon Reforestation",
    type: "Reforestation",
    region: "Brazil",
    vintageYear: 2023,
    certificationBody: "Gold Standard",
    creditAmount: 1000,
  };

  try {
    // Convert project details to JSON string
    const metadata = JSON.stringify(projectDetails);

    // Upload metadata to IPFS
    const addedFile = await ipfs.add(metadata);
    const ipfsHash = addedFile.path;  // Get IPFS hash from the response

    console.log("Metadata uploaded to IPFS:", ipfsHash);

    // Add project to the registry
    await program.methods
      .addProject(
        projectDetails.name,
        projectDetails.type,
        projectDetails.region,
        projectDetails.vintageYear,
        projectDetails.certificationBody,
        projectDetails.creditAmount,
        ipfsHash
      )
      .accounts({
        registryAccount,
        verifier: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("Token minted and linked to project metadata.");
  } catch (error) {
    console.error("Error minting token:", error);
  }
};

mintToken();