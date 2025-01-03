import React, { useState } from 'react';
import { executeTrade } from '../utils/tradeLogic';

const TradeForm = ({ userId }: { userId: string }) => {
    const [assetId, setAssetId] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

    const handleTrade = async () => {
        try {
            await executeTrade(userId, assetId, quantity, tradeType);
            alert('Trade executed successfully!');
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div>
            <select onChange={(e) => setAssetId(e.target.value)}>
                {/* Populate options from Supabase */}
            </select>
            <input type="number" onChange={(e) => setQuantity(Number(e.target.value))} />
            <select onChange={(e) => setTradeType(e.target.value as 'buy' | 'sell')}>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
            </select>
            <button onClick={handleTrade}>Execute Trade</button>
        </div>
    );
};

export default TradeForm;
