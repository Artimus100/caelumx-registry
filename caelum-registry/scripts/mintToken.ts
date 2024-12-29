import * as anchor from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import dotenv from "dotenv";
import PinataClient from '@pinata/sdk';

dotenv.config();

// Initialize Pinata client with your API key and secret
const pinata = new PinataClient(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

const mintToken = async () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CaelumRegistry;

  // Registry account public key (replace with your actual registry account)
  const registryAccount = new PublicKey("7PddmMYSdi62ohhWJyVd1HHVxxhePzm2fFuDWyyMgJTe");

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

    // Upload metadata to Pinata
    const response = await pinata.pinJSONToIPFS(projectDetails);
    const ipfsHash = response.IpfsHash;  // Get the IPFS hash from the response

    console.log("Metadata uploaded to Pinata:", ipfsHash);

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
