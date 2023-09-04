'use client'

import { useState, useEffect } from 'react'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { parseEther } from 'viem'
import Swal from 'sweetalert2'
import AuricCounter from '../_components/auric-counter'
import ClientOnly from '../_components/client-only'

const auricABI = require('../_contracts_JSON/AuricSeller.json')

export default function BuyAuric() {
  const [auricAmount, setAuricAmount] = useState(0)
  const [ethAmount, setEthAmount] = useState('')

  const { config } = usePrepareContractWrite({
    address: '0xaeEF66784062D2Ec5268f8010ff406C870683b62',
    abi: auricABI.abi,
    functionName: 'buyAuric',
    value: parseEther(ethAmount),
  })

  const { data, write } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      successPopup()
    },
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    confirmPopup()
    write?.()
    setAuricAmount(0)
  }

  useEffect(() => {
    if (!isNaN(auricAmount)) {
      let ethToPay = auricAmount / 10 ** 5
      setEthAmount(ethToPay.toString())
    } else {
      setEthAmount('0')
    }
  }, [auricAmount])

  function confirmPopup() {
    Swal.fire({
      title: 'Purchase Auric',
      text: 'Confirm the transaction in your Ethereum wallet',
      icon: 'info',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      iconColor: '#ae8f30',
      color: '#ffffff',
      background: '#28282b',
    })
  }

  function successPopup() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your purchase transaction is confirmed',
      showConfirmButton: false,
      timer: 5000,
      iconColor: '#ae8f30',
      color: '#ffffff',
      background: '#28282b',
    })
  }

  return (
    <main className="flex min-h-screen flex-col bg-black items-center justify-between p-24">
      <div className="w-full bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 grid justify-items-center">
          <h1 className="text-xl font-bold leading-tight tracking-tight mb-8 text-gray-900 md:text-2xl">
            Purchase Auric tokens
          </h1>
          <form className="space-y-4 md:space-y-6 grid justify-items-center">
            <div>
              <label
                htmlFor="buyToken"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Auric token amount
              </label>
              <input
                type="number"
                name="buyToken"
                id="buyToken"
                min="0"
                step="1"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="How many Auric tokens?"
                value={auricAmount}
                onChange={(e) => setAuricAmount(e.target.valueAsNumber)}
              />
            </div>
            <button
              disabled={!auricAmount}
              type="submit"
              onClick={handleClick}
              className="w-64 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-50 disabled:border-gray-300 disabled:text-gray-900"
            >
              🪙 Purchase Auric
            </button>
            {isLoading && (
              <div className="font-medium text-secondary-600">
                Please wait for transaction confirmation
              </div>
            )}
            <div className="text-center text-white text-base p-4 bg-gray-400 font-medium rounded-lg">
              <h2>You have to exchange</h2>
              <p>
                {Number.isNaN(ethAmount) ? (
                  '0'
                ) : (
                  <span className="font-medium decoration-2 text-secondary-600">
                    {ethAmount} ETH
                  </span>
                )}{' '}
                <span className="italic text-sm"> (excluding gas fees)</span>
              </p>
            </div>
            <p className="italic text-sm text-center font-light text-black">
              The exchange rate is{' '}
              <span className="font-medium text-primary-600">
                100,000 Auric
              </span>{' '}
              for <span className="font-medium text-secondary-600">1 ETH</span>
            </p>
          </form>
          <ClientOnly>
            <AuricCounter />
          </ClientOnly>
        </div>
      </div>
    </main>
  )
}
