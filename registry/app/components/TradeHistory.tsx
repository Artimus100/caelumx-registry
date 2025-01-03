import React, { useEffect, useState } from 'react';
import { supabase } from '../../app/utils/supabaseClient';

const TradeHistory = ({ userId }: { userId: string }) => {
    interface Trade {
        id: string;
        trade_type: string;
        quantity: number;
        price: number;
    }
    
    const [trades, setTrades] = useState<Trade[]>([]);

    useEffect(() => {
        const fetchTrades = async () => {
            const { data, error } = await supabase
                .from('trades')
                .select('*')
                .eq('user_id', userId);
            if (error) console.error(error);
            else setTrades(data);
        };
        fetchTrades();
    }, [userId]);

    return (
        <div>
            {trades.map((trade: any) => (
                <div key={trade.id}>
                    <p>{trade.trade_type} {trade.quantity} @ {trade.price}</p>
                </div>
            ))}
        </div>
    );
};

export default TradeHistory;
