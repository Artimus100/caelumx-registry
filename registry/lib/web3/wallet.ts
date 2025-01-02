import { Connection, PublicKey } from '@solana/web3.js';

export interface WalletAdapter {
  publicKey: PublicKey | null;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  signTransaction(transaction: any): Promise<any>;
}

export class PhantomWalletAdapter implements WalletAdapter {
  private _publicKey: PublicKey | null = null;
  private _connection: Connection;

  constructor(endpoint: string) {
    this._connection = new Connection(endpoint);
  }

  get publicKey(): PublicKey | null {
    return this._publicKey;
  }

  async connect(): Promise<void> {
    try {
      const { solana } = window as any;
      
      if (!solana?.isPhantom) {
        throw new Error('Phantom wallet not found');
      }

      const response = await solana.connect();
      this._publicKey = new PublicKey(response.publicKey.toString());
    } catch (error) {
      console.error('Error connecting to Phantom wallet:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    const { solana } = window as any;
    if (solana?.isPhantom) {
      await solana.disconnect();
      this._publicKey = null;
    }
  }

  async signTransaction(transaction: any): Promise<any> {
    const { solana } = window as any;
    if (!solana?.isPhantom) {
      throw new Error('Phantom wallet not found');
    }
    return await solana.signTransaction(transaction);
  }
}