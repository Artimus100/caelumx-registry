
'use client'
import React, { useState } from "react";

export default function TransactionDropDown() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const years = Array.from({ length: 2024 - 2010 + 1 }, (_, i) => 2010 + i);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

  return (
      <div className="flex gap-4  ">
        <div className="bg-white/10 py-4 h-11 items-center justify-between rounded-full text-zinc-300   px-5  font-sm inline-flex gap-4">
        <label htmlFor="Token" className="border-r-2 text-zinc-300/70 text-[12px] border-zinc-400/20 pr-4">Sort</label>
        <select  name="Token" id="Token" className="w-32">
            <option className="text-sm" value="Latest">Latest</option>
            <option className="text-sm" value="Amount">Amount</option>
        </select>
        </div>
        <div className="bg-white/10 py-4 h-11 items-center justify-between rounded-full text-zinc-300   px-5  font-sm inline-flex gap-4">
        <label htmlFor="Status" className="border-r-2 text-zinc-300/70 text-[12px] border-zinc-400/20 pr-4">Country</label>
        <select  name="Status" id="Status" className="w-[120px]">
            <option className="text-sm" value="All">All</option>
            <option className="text-sm" value="CarbonCredit">CarbonTrade</option>
            <option className="text-sm" value="CarbonOffset">CarbonOffset</option>
        </select>
        </div>
    </div>
  );
}
