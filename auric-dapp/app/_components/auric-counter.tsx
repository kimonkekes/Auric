'use client'

import { useAccount, useBalance } from 'wagmi'

export default function AuricCounter() {
  const { address } = useAccount()
  const { data } = useBalance({
    address: address,
    token: '0xC63E033c4452DEC6AB5A52C9E835d56B27be83f4',
    watch: true,
  })

  return (
    <div className="flex-col mt-4 bg-black rounded-lg items-center shadow p-6">
      <div className="mb-2 text-white">You currently own:</div>
      <div className="text-3xl text-center text-gold">
        {data?.formatted || 'no'}
      </div>
      <div className="text-lg text-center text-gold">Auric tokens</div>
    </div>
  )
}
