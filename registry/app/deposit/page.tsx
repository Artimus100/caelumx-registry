"use client";

import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { DeployConfirmation } from "../components/DepositConfirmation";
import DeployIcon from '../../public/icons/DeployIcon.svg'
export default function Deposit  ()  {
  const project = {
    id: "c4e7a9d6-9f18-4b1e-8347-d84f8d9b93c6",
    project_name: "Amazon Rainforest Reforestation",
    project_type: "Reforestation",
    region: "South America",
    vintage_year: 2020,
    certification_body: "Verified Carbon Standard",
    credit_amount: 150000,
    created_at: new Date("2023-06-15T10:30:00Z"),
  };

  const [step, setStep] = useState(1);
  const [lable, setLable] = useState('Deposite')

 function handelClick() {
    setStep(2)
    setLable('Mint')
 }

  return (
    <div className="h-screen w-full bg-[#232228] pt-4 overflow-hidden">
    <div className="container m-auto  bg-black/50 h-[600px]  w-[600px] rounded-3xl border border-white/10">
      <div className="flex flex-row items-center justify-start p-4 gap-3 pl-12 border-b-[1px] border-white/10">
        <div className="inline-flex justify-center items-center">
          <div className="outline size-8 outline-[1.5px] outline-zinc-600 bg-white/10 p-2 rounded-xl">
            <img className="h-6" src={DeployIcon.src} alt="Deploy Icon" />
          </div>
        </div>
        <div className="flex flex-col gap-0">
          <h2 className="text-2xl font-normal text-zinc-300">Deposit Credits</h2>
          <p className="text-[12px] -mt-1 text-zinc-500">
            Choose your sides and contribute accordingly.
          </p>
        </div>
      </div>

      <div className=" h-96 w-full">
        <DeployConfirmation {...project} step={step} />
      </div>

      <div className="px-12 py-4  w-full flex gap-4 items-center justify-end mt-4">
        <Button
          label="Cancel"
          width="100px"
          cancel={true}
        />
        <Button
        label={lable}
        color="#4CAF50"
        width="120px"
        onClick={handelClick}
/>
      </div>

      <div className="mt-2 flex gap-2 w-full items-center justify-center">
        <div className="w-16 h-1 rounded-full bg-teal-600"></div>
        <div className={`w-16 h-1 rounded-full  ${step===2 ? 'bg-teal-600' : 'bg-teal-600/30' } `}></div>
      </div>
    </div>
    </div>
  );
};
