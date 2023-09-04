'use client'

import { TypeAnimation } from 'react-type-animation'
import Image from 'next/image'
import Bg from './_images/gold_bars.jpg'
import Au from './_images/auric_text.png'

const AnimatedText = () => {
  return (
    <TypeAnimation
      sequence={[
        'secure',
        2500,
        'efficient',
        2500,
        'simple',
        2500,
        'modern',
        2500,
      ]}
      speed={30}
      deletionSpeed={30}
      repeat={Infinity}
      style={{ fontSize: '2.25rem', display: 'inline-block', color: '#ae8f30' }}
    />
  )
}

export default function Home() {
  return (
    <main className="flex flex-col bg-black p-24">
      <div className="flex justify-end pr-[13rem] pt-[2rem]">
        <Image src={Au} alt="gold text logo" height={89} />
      </div>
      <div className="text-white text-3xl text-right pt-28 pr-[15rem]">
        Gold investment, made
        <br />
        <span className="flex justify-end pr-[6rem] pt-4">
          <AnimatedText />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-black items-left pt-14">
        <Image src={Bg} alt="gold bars background" height={380} width={758} />
      </div>
    </main>
  )
}
