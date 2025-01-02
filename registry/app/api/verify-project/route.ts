import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, Keypair, Commitment } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';
import { Wallet } from "@coral-xyz/anchor";

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
    }

    // Connection setup
    const connection = new Connection(process.env.SOLANA_RPC_URL!);
    const wallet = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(process.env.WALLET_SECRET_KEY!))
    );
    const keypair = Keypair.fromSecretKey(wallet.secretKey);
    const commitment: Commitment = "confirmed";

    const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment });

    // Set up the program
    const program = new Program(
      JSON.parse(process.env.IDL!),
      new PublicKey(process.env.REGISTRY_PROGRAM_ID!),
      provider
    );

    // Call the verifyProject method
    const tx = await program.methods
      .verifyProject(projectId) // Project ID for verification
      .accounts({
        registryAccount: new PublicKey(process.env.REGISTRY_ACCOUNT!),
        authority: wallet.publicKey,
      })
      .rpc();

    return NextResponse.json({ message: 'Project verified successfully.', transaction: tx });
  } catch (error) {
    console.error('Error verifying project:', error);
    return NextResponse.json({ error: 'Failed to verify project.' }, { status: 500 });
  }
}
