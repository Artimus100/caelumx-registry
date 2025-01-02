// import React from 'react';
// import { useWallet } from '../../hooks/useWallet';
// import { Wallet } from 'lucide-react';

// export function ConnectButton() {
//   const { connected, connect, disconnect } = useWallet();

//   const handleClick = async () => {
//     try {
//       if (connected) {
//         await disconnect();
//       } else {
//         await connect();
//       }
//     } catch (error) {
//       console.error('Wallet connection error:', error);
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="inline-flex items-center gap-2 px-4 py-2 bg-caelum-600 text-white rounded-lg hover:bg-caelum-700 transition-colors"
//     >
//       <Wallet className="w-5 h-5" />
//       <span>{connected ? 'Disconnect' : 'Connect Wallet'}</span>
//     </button>
//   );
// }