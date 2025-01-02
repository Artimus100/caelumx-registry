import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { WalletAdapter } from './wallet';

export class TradingProgram {
  private connection: Connection;
  private wallet: WalletAdapter;
  private programId: PublicKey;

  constructor(
    connection: Connection,
    wallet: WalletAdapter,
    programId: string
  ) {
    this.connection = connection;
    this.wallet = wallet;
    this.programId = new PublicKey(programId);
  }

  async createListing(
    projectId: string,
    quantity: number,
    pricePerCredit: number
  ): Promise<string> {
    const transaction = new Transaction();
    // Add create listing instruction
    const signature = await this.wallet.signTransaction(transaction);
    return signature;
  }

  async executeTrade(
    listingId: string,
    seller: PublicKey,
    quantity: number,
    totalPrice: number
  ): Promise<string> {
    if (!this.wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    const transaction = new Transaction();
    
    // Add payment instruction
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: this.wallet.publicKey,
        toPubkey: seller,
        lamports: totalPrice * 1e9, // Convert SOL to lamports
      })
    );

    // Add transfer credits instruction
    
    const signature = await this.wallet.signTransaction(transaction);
    return signature;
  }
}