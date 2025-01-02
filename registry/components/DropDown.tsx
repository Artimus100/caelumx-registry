/* eslint-disable react/jsx-key */
'use client'
import React, { useState } from "react";

export default function DropDown() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
  const countries =   [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "India",
    "China",
    "Japan",
    "Brazil",
    "Russia",
    "South Africa",
    "Italy",
    "Mexico",
    "Spain",
    "South Korea",
    "Indonesia",
    "Saudi Arabia",
    "Turkey",
    "Argentina"
  ];

  const years = Array.from({ length: 2024 - 2010 + 1 }, (_, i) => 2010 + i);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

  return (
      <div className="flex gap-4">
        <div className="bg-white/10 py-4 h-11 items-center justify-between rounded-full text-zinc-300   px-5  font-sm inline-flex gap-4">
        <label htmlFor="Token" className="border-r-2 text-zinc-300/70 text-[12px] border-zinc-400/20 pr-4">Token</label>
        <select  name="Token" id="Token" className="w-32">
            <option className="text-sm" value="All">All</option>
            <option className="text-sm" value="CarbonCredit">CarbonCredit</option>
            <option className="text-sm" value="CarbonOffset">CarbonOffset</option>
        </select>
        </div>
        <div className="bg-white/10 py-4 h-11 items-center justify-between rounded-full text-zinc-300   px-5  font-sm inline-flex gap-4">
        <label htmlFor="Status" className="border-r-2 text-zinc-300/70 text-[12px] border-zinc-400/20 pr-4">Country</label>
        <select  name="Status" id="Status" className="w-[120px]">
           {
            countries.map((country) => (
                <option className="text-sm" value={country}>{country}</option>

            ))
           }
        </select>
        </div>
        <div className="bg-white/10 py-4 h-11 items-center justify-between rounded-full text-zinc-300   px-5  font-sm inline-flex gap-4">
        <label htmlFor="Currency" className="border-r-2 text-zinc-300/70 text-[12px] border-zinc-400/20 pr-4">Vintage</label>
        <select  name="Currency" id="Currency" className="w-16">
            {
                years.map((year) => (
                    <option className="text-sm" value={year}>{year}</option>
                ))
            }
        </select>
        </div>
    </div>
  );
}
