import React from 'react';
import { format } from 'date-fns';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Transaction } from '../types/ledger';
import { ArrowUpRight, ArrowDownRight, RefreshCw, Shield } from 'lucide-react';

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info: { getValue: () => any; }) => {
      const type = info.getValue();
      return (
        <div className="flex items-center gap-2">
          {type === 'purchase' && <ArrowDownRight className="text-green-500" />}
          {type === 'transfer' && <ArrowUpRight className="text-blue-500" />}
          {type === 'retirement' && <RefreshCw className="text-orange-500" />}
          {type === 'verification' && <Shield className="text-purple-500" />}
          <span className="capitalize">{type}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => (
      <span className="font-mono">
        {info.getValue().toLocaleString()} Credits
      </span>
    ),
  }),
  columnHelper.accessor('timestamp', {
    header: 'Date',
    cell: (info: { getValue: () => any; }) => format(info.getValue(), 'PPp'),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info: { getValue: () => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.PromiseLikeOfReactNode | null | undefined; }) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${
            info.getValue() === 'completed'
              ? 'bg-green-100 text-green-800'
              : info.getValue() === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
];

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup: { id: React.Key | null | undefined; headers: any[]; }) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: { id: React.Key | null | undefined; column: { columnDef: { header: any; }; }; getContext: () => any; }) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row: { id: React.Key | null | undefined; getVisibleCells: () => any[]; }) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell: { id: React.Key | null | undefined; column: { columnDef: { cell: any; }; }; getContext: () => any; }) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}