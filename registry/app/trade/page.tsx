"use client";

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"; // Import your Supabase client instance

export default function TradePage() {
  const [wallet, setWallet] = useState<any[]>([]);
  const [tradeHistory, setTradeHistory] = useState<any[]>([]);
  const [assets, setAssets] = useState<string[]>(["Asset A", "Asset B"]);
  const [selectedAsset, setSelectedAsset] = useState<string>("Asset A");
  const [tradeType, setTradeType] = useState<string>("Buy");
  const [quantity, setQuantity] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch wallet balances and trade history
  useEffect(() => {
    const fetchWalletAndHistory = async () => {
      const { data: walletData } = await supabase.from("wallets").select("*");
      const { data: historyData } = await supabase
        .from("trade_history")
        .select("*")
        .order("timestamp", { ascending: false });

      setWallet(walletData || []);
      setTradeHistory(historyData || []);
    };

    fetchWalletAndHistory();
  }, []);

  const handleTrade = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity <= 0) {
      setMessage("Quantity must be greater than 0");
      return;
    }

    // Execute the trade
    const { data, error } = await supabase.from("trade_history").insert([
      {
        asset: selectedAsset,
        type: tradeType,
        quantity,
        price: Math.random() * 100, // Random price for demo
        timestamp: new Date().toISOString(),
      },
    ]);

    if (error) {
      setMessage("Failed to execute trade");
    } else {
      setMessage("Trade executed successfully!");
      if (data) {
        setTradeHistory([data[0], ...tradeHistory]);
      }
      setQuantity(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trade Page</h1>

      {/* Wallet Balances */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Wallet Balances</h2>
        <ul className="bg-gray-100 p-4 rounded">
          {wallet.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.asset}</span>
              <span>{item.balance} units</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Trade Form */}
      <form onSubmit={handleTrade} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Execute Trade</h2>
        <div className="flex flex-col space-y-4 bg-gray-100 p-4 rounded">
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="p-2 rounded border"
          >
            {assets.map((asset) => (
              <option key={asset} value={asset}>
                {asset}
              </option>
            ))}
          </select>
          <select
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value)}
            className="p-2 rounded border"
          >
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Enter quantity"
            className="p-2 rounded border"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Execute Trade
          </button>
        </div>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>

      {/* Trade History */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Trade History</h2>
        <table className="w-full bg-gray-100 rounded border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Asset</th>
              <th className="p-2">Type</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {tradeHistory.map((trade, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{trade.asset}</td>
                <td className="p-2">{trade.type}</td>
                <td className="p-2">{trade.quantity}</td>
                <td className="p-2">{trade.price.toFixed(2)}</td>
                <td className="p-2">{new Date(trade.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
