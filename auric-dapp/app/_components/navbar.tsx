'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../_images/auric_logo.png'
import { Web3Button } from '@web3modal/react'
import AuricCounter from './auric-counter'

interface Props {
  icon?: 'show' | 'hide'
  label?: string
  balance?: 'show' | 'hide'
}

const Navbar = () => {
  return (
    <>
      <div className="w-full h-16 bg-black sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/">
              <Image src={Logo} alt="Auric logo" height={64} />
            </Link>
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/purchase-auric-tokens" className="hover:text-gold">
                  <p>Purchase Auric Tokens</p>
                </Link>
              </li>
              <li>
                <Link href="/claim-gold-bars" className="hover:text-gold">
                  <p>Claim Gold Bars</p>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold">
                  <p>About</p>
                </Link>
              </li>
            </ul>
            <Web3Button />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
