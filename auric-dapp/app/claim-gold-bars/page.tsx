'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import Swal from 'sweetalert2'
import QuestionMark from '../_images/question_mark.png'
import ClientOnly from '../_components/client-only'
import AuricCounter from '../_components/auric-counter'

const auricTokenABI = require('../_contracts_JSON/Auric.json')
const auricSellerABI = require('../_contracts_JSON/AuricSeller.json')

export default function ClaimGold() {
  const [aurAmount, setAurAmount] = useState(0)
  const [approveButtonText, setApproveButtonText] = useState(
    'Approve transaction',
  )
  const [qr, setQr] = useState('')

  const sellerContractAddress = '0xaeEF66784062D2Ec5268f8010ff406C870683b62'

  const { config: auricContractConfig } = usePrepareContractWrite({
    address: '0xC63E033c4452DEC6AB5A52C9E835d56B27be83f4',
    abi: auricTokenABI.abi,
    functionName: 'approve',
    args: [sellerContractAddress, aurAmount],
  })

  const { config: sellerContractConfig } = usePrepareContractWrite({
    address: '0xaeEF66784062D2Ec5268f8010ff406C870683b62',
    abi: auricSellerABI.abi,
    functionName: 'claimGold',
    args: [aurAmount * 10 ** 18],
  })

  const handleApprove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    approveTokenTransfer?.()
    e.currentTarget.disabled = true
    setApproveButtonText('Continue in popup')
  }

  const handleSell = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    sellAuric?.()
    setAurAmount(0)
  }

  const { data: approveData, write: approveTokenTransfer } =
    useContractWrite(auricContractConfig)
  const { data: sellData, write: sellAuric } =
    useContractWrite(sellerContractConfig)

  const { isLoading: approveLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    onSettled() {
      setApproveButtonText('Approval successful')
    },
  })

  const { isLoading: sellLoading, isSuccess: sellSuccess } =
    useWaitForTransaction({
      hash: sellData?.hash,
      onSettled() {
        const code = `https://api.qrserver.com/v1/create-qr-code/?data=${sellData?.hash.toString()}&size=200x200`
        setQr(code)
      },
    })

  function getQrCode(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    claimGoldPopup(qr)
  }

  function approvePopup() {
    Swal.fire({
      icon: 'info',
      title: '<b>Approve transaction</b>',
      html: 'In order to be able to sell your Auric tokens, first you have to approve the amount of the transaction. <br>\n<br> Click on the <font color="#ae8f30"><b>"Approve transaction"</b></font> button and your Ethereum wallet will show a pop-up notification. Enter the <i>amount of Auric you wish to sell</i>. <br>\n<br> Wait for the approval to be confirmed and then continue to <b>Step 2</b> below.',
      confirmButtonColor: '#ae8f30',
      iconColor: '#ae8f30',
      color: '#ffffff',
      background: '#28282b',
    })
  }

  function claimGoldPopup(qrUrl: string) {
    Swal.fire({
      icon: 'info',
      title: '<b>Claim Gold QR code</b>',
      imageUrl: qrUrl,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'QR code',
      html: 'The QR code above is proof that you have redeemed your Auric tokens. <br>\n<br> <font color="#ae8f30"><b>Save the QR code</b></font> <i>(right-click on it and then select "Save image as..")</i> <br>\n<br> You will be requested to show it, in order to claim your actual gold bars.',
      confirmButtonColor: '#ae8f30',
      iconColor: '#ae8f30',
      color: '#ffffff',
      background: '#28282b',
    })
  }

  return (
    <main className="flex min-h-screen flex-col bg-black items-center justify-between p-24">
      <div className="w-full bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 grid justify-items-center">
          <h1 className="text-xl font-bold leading-tight tracking-tight mb-8 text-gray-900 md:text-2xl dark:text-white">
            Claim Gold Bars
          </h1>
          <form className="space-y-4 md:space-y-8 grid justify-items-center">
            <h3 className="font-semibold">Step 1:</h3>
            <div className="flex items-center space-x-4 mt-8">
              <button
                type="submit"
                onClick={handleApprove}
                className="w-52 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-50 disabled:border-gray-300 disabled:text-gray-900"
              >
                {approveButtonText}
              </button>
              <Image
                className="cursor-pointer hover:opacity-70"
                src={QuestionMark}
                alt="Auric logo"
                height={42}
                unoptimized
                onClick={approvePopup}
              />
            </div>
            {approveLoading && (
              <div className="font-medium text-secondary-600">
                Please wait for approval confirmation
              </div>
            )}
            <h3 className="font-semibold">Step 2:</h3>
            <div>
              <label
                htmlFor="sellToken"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Auric token amount to sell
              </label>
              <input
                type="number"
                name="sellToken"
                id="sellToken"
                min="0"
                step="1"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="How many Auric tokens?"
                value={aurAmount}
                onChange={(e) => setAurAmount(e.target.valueAsNumber)} //set callback
              />
            </div>
            <button
              disabled={!aurAmount}
              type="submit"
              onClick={handleSell}
              className="w-64 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-50 disabled:border-gray-300 disabled:text-gray-900"
            >
              💰 Claim Gold
            </button>
            <ClientOnly>
              <AuricCounter />
            </ClientOnly>
            <h3 className="font-semibold">Step 3:</h3>
            {sellLoading && (
              <div className="font-medium text-secondary-600">
                Please wait for QR button activation
              </div>
            )}
            <div className="result">
              <button
                disabled={!qr}
                onClick={getQrCode}
                className="w-64 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-50 disabled:border-gray-300 disabled:text-gray-900"
              >
                🪟 Get QR code
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
