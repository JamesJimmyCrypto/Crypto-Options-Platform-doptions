"use client"; 

import React from 'react';
import { useState, useEffect } from 'react';
import { getOptions, OptionData } from './interactions';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BackgroundBeams } from '@/components/ui/background-beams';

const Page = () => {

    const { address, chainId, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const [chain, setChain] = useState(80002);
    const [loading, setLoading] = useState(false);
 
    const [optionsData, setOptionsData] = useState<{ calls: OptionData[], puts: OptionData[] }>({
        calls: [],
        puts: []
    })

    useEffect(() => {
        if (isConnected && walletProvider) {
          (async () => {
            try {
              setLoading(true);
              const data = await getOptions(walletProvider, chainId);
              setOptionsData(data);
              setLoading(false);
            } catch (error) {
              console.error(error);
            }
          })();
        }
      }, [isConnected, walletProvider, chainId]);

    return (
        <div className="flex flex-row h-screen bg-black text-white pt-32">
      {/* Call Options Side */}
      <div className="w-1/2 overflow-hidden p-4">
        <h2 className="text-2xl font-bold mb-4 text-green-500 w-full text-center"></h2>
        <div className="overflow-x-auto">
<div className="relative overflow-x-auto shadow-md sm:rounded-lg border-t border-r border-l border-gray-600">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-2xl font-semibold text-left rtl:text-right text-green-500 bg-black dark:text-green-500">
        Call Options
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Buying these kind of contracts mean you have an option to buy the underlying asset at the strike price if the price of the asset rises above the strike price before the expiration.</p>
        </caption>
        <thead className="text-xs text-gray-100 uppercase bg-gray-900">
            <tr>
                <th scope="col" className="px-6 py-3">Token</th>
                <th scope="col" className="px-6 py-3">Strike Price</th>
                <th scope="col" className="px-6 py-3">Premium</th>
                <th scope="col" className="px-6 py-3">Expiration</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
            </tr>
        </thead>
        <tbody>
        {optionsData.calls.map((option, index) => (
                <tr key={index} className='border-b border-gray-600'>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{option.tokenImg}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">${option.strikePrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">${option.premium}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{option.expirationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{option.quantity}</td>
                </tr>
              ))}
        </tbody>
    </table>
</div>

        </div>
      </div>

      {/* Put Options Side */}
      <div className="w-1/2 overflow-hidden p-4">
        <h2 className="text-2xl font-bold mb-4 text-green-500 w-full text-center"></h2>
        <div className="overflow-x-auto">
<div className="relative overflow-x-auto shadow-md sm:rounded-lg border-t border-r border-l border-gray-600">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-2xl font-semibold text-left rtl:text-right text-red-500 bg-black">
        Put Options
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Buying these kind of contracts mean you have an option to sell the underlying asset at the strike price if the price of the asset drops below the strike price before the expiration.</p>
        </caption>
        <thead className="text-xs text-gray-100 uppercase bg-gray-900">
            <tr>
                <th scope="col" className="px-6 py-3">Token</th>
                <th scope="col" className="px-6 py-3">Strike Price</th>
                <th scope="col" className="px-6 py-3">Premium</th>
                <th scope="col" className="px-6 py-3">Expiration</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
            </tr>
        </thead>
        <tbody>
        {optionsData.puts.map((option, index) => (
                <tr key={index} className='border-b border-gray-600'>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{option.tokenImg}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">${option.strikePrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">${option.premium}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{option.expirationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{option.quantity}</td>
                </tr>
              ))}
        </tbody>
    </table>
</div>

        </div>
      </div>
    </div>
    );
}

export default Page;
