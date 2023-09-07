import Link from 'next/link'

export default function About() {
  return (
    <main className="flex min-h-screen flex-col bg-black items-center justify-between p-24 text-white">
      <div className="w-full bg-black rounded-lg shadow text-justify md:mt-8 space-y-4 sm:max-w-3xl">
        <p>
          <span>
            Auric is a sample dApp leveraging blockchain technology. Its main
            currency is an ERC20 token named{' '}
          </span>
          <Link
            className="font-medium text-primary-600 hover:underline"
            href="https://sepolia.etherscan.io/token/0xc63e033c4452dec6ab5a52c9e835d56b27be83f4"
          >
            "Auric"
          </Link>
          , which supposedly represents ownership of an actual quantity in gold
          bars.
          <br />
          <br />
          <span>
            The process of purchasing and redeeming Auric tokens is handled by
            the{' '}
          </span>
          <Link
            className="font-medium text-primary-600 hover:underline"
            href="https://sepolia.etherscan.io/address/0xaeef66784062d2ec5268f8010ff406c870683b62"
          >
            AuricSeller
          </Link>
          <span> smart contract.</span>
        </p>
        <br />
        <hr />
        <p>
          <label className="block mb-2 text-[22px] font-bold text-white">
            Purchase Auric tokens
          </label>
        </p>
        <div>
          By connecting your Ethereum wallet app, you can purchase Auric for
          ETH. The notion is that by purchasing Auric, you invest in gold,
          without the need to actually have it in your possession or even stored
          in a remote vault.
        </div>
        <br />
        <p>
          <label className="block mb-2 text-[22px] font-bold text-white">
            Claim Gold Bars
          </label>
        </p>
        <div>
          If you want the actual gold bars delivered to you, you can "claim"
          them. It is a 3-step process:
          <br />
          <br />
          <p>
            <span className="font-bold">- Step 1</span> is where you authorize
            the AuricSeller smart contract to handle your Auric tokens on your
            behalf.
          </p>
          <br />
          <p>
            <span className="font-bold">- Step 2</span> is where you return the
            tokens to the issuer.
          </p>
          <br />
          <p>
            <span className="font-bold">- Step 3</span> is where you receive a
            QR code representing the transaction. The QR code (along with proof
            of your crypto account ownership, e.g. a signed message) can be used
            to claim the gold bars{' '}
            <span className="italic">
              (the verification act is outside the scope of this dApp)
            </span>
            .
          </p>
          <br />
          <hr />
          <br />
          <p>
            The AuricSeller smart contract also includes a function for the
            owner to claim the ETH that was used to purchase gold{' '}
            <span className="italic">
              (the owner's claim ETH function is not featured on this dApp)
            </span>
            . By claiming, 5% of profits is automatically donated to a
            predefined address (e.g. a charity).
          </p>
        </div>
      </div>
    </main>
  )
}
