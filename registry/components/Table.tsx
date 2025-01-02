import ProjectIcon from '../../public/icons/ProjectIcon.svg'
import TypeIcon from '../../public/icons/TypeIcon.svg'
import FromIcon from '../../public/icons/FromWalletIcon.svg'
import ToIcon from '../../public/icons/ToWalletIcon.svg'
import WalletIcon from '../../public/icons/ProjectIcon.svg'
import AmountIcon from '../../public/icons/ProjectIcon.svg'


interface Transaction {
  transactionID: string;
  transactionType: string;
  fromWalletAddress: string;
  toWalletAddress: string;
  transactionAmount: number;
}

interface TableProps {
  data: Transaction[];
}

 const TransactionTable: React.FC<TableProps> = ({ data }) => {

 const columns = [
    {
        name : 'Transaction ID',
        icon : ProjectIcon
    },
    {
        name : 'Type',
        icon : TypeIcon
    },
    {
        name : 'From Wallet',
        icon : FromIcon
    },
    {
        name : 'To Wallet',
        icon : ToIcon
    },
    {
        name : 'Amount',
        icon : WalletIcon
    },
 ]
 return (
    <div className="container mx-auto p-4 ">
      <h2 className="text-xl text-zinc-300 font-bold mb-4 ">
        Transaction History
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/20 shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-black text-gray-600 text-left  ">
{                columns.map((col, index) => (
                    <th key={index} className=' p-4 pr-0  '>
                        <img className='inline-flex mr-2 size-5 ' src={col.icon.src} alt="coloum Icon" />
                        <h5 className='inline-flex  text-zinc-400 '>{col.name}</h5>
                    </th>
                ))}
            </tr>
          </thead>
          <tbody className='text-zinc-400 text-sm '>
            {data.map((transaction) => (
              <tr
                key={transaction.transactionID}
              >
                <td className="py-3 px-4">{transaction.transactionID}</td>
                <td className="py-3 px-4">{transaction.transactionType}</td>
                <td className="py-3 px-4 truncate max-w-[200px]">
                  {transaction.fromWalletAddress}
                </td>
                <td className="py-3 px-4 truncate max-w-[200px]">
                  {transaction.toWalletAddress}
                </td>
                <td className="py-3 px-6   truncate text-right">
                  ${transaction.transactionAmount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
