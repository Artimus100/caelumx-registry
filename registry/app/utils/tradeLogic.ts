import { supabase } from './supabaseClient';

export const executeTrade = async (userId: string, assetId: string, quantity: number, tradeType: 'buy' | 'sell') => {
    const { data: asset, error: assetError } = await supabase
        .from('assets')
        .select('price')
        .eq('id', assetId)
        .single();

    if (assetError) throw new Error('Asset not found');

    const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .eq('asset_id', assetId)
        .single();

    if (walletError) throw new Error('Wallet not found');

    const tradeAmount = asset.price * quantity;

    if (tradeType === 'buy') {
        if (wallet.balance < tradeAmount) throw new Error('Insufficient funds');
        await supabase.from('wallets').update({ balance: wallet.balance - tradeAmount }).eq('id', wallet.id);
    } else if (tradeType === 'sell') {
        if (quantity > wallet.balance) throw new Error('Insufficient asset balance');
        await supabase.from('wallets').update({ balance: wallet.balance + tradeAmount }).eq('id', wallet.id);
    }

    await supabase.from('trades').insert({
        user_id: userId,
        asset_id: assetId,
        quantity,
        trade_type: tradeType,
        price: asset.price,
    });
};
