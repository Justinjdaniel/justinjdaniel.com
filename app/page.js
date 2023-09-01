import ArrowIcon from "@/components/icons/arrow-icon";
import Image from "next/image";
import award from "public/images/home/award.webp";
import team from "public/images/home/team.webp";
import React from "react";

const ProfileContent = () => {
	// FIXME: change remaining two images
	// replace other two random images to correct one.
	// assignees: justinjdaniel
	// labels: enhancement, fix-me, ui

	return (
		<content className="z-10 antialiased max-w-2xl mb-40 mx-4 mt-8 lg:mx-auto w-full">
			<h1 className="font-bold text-2xl mb-8 text-left w-max">
				hey, I'm{" "}
				<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
					Justin{" "}
				</span>
				👋
			</h1>
			<div>
				<p className="text-zinc-500 prose prose-neutral dark:prose-invert">
					{`I'm a blockchain software developer, optimist, and team player with several
						years of experience in the industry. I specialize in developing
						smart contracts, decentralized applications, and NFTs using
						Solidity, Web3.js, and Ethereum. I also have a strong background in
						web development and implementation of a blockchain-based system for
						services and products.`}
				</p>
			</div>
			<div className="columns-2 gap-4 my-8">
				<div className="relative h-80 mb-4">
					<img
						alt="..."
						src={"https://source.unsplash.com/random/400x600"}
						fill
						sizes="(max-width: 768px) 213px, 50vw"
						priority="true"
						className="rounded-lg object-cover h-80 w-full"
					/>
				</div>
				<div className="relative h-40">
					<Image
						alt="Our team"
						src={team}
						fill
						sizes="(max-width: 768px) 213px, 50vw"
						priority="true"
						className="rounded-lg object-cover h-40 w-full"
					/>
				</div>

				<div className="relative h-40 mb-4">
					<Image
						alt="Awarded by Kerala Digital University's Vice Chancellor"
						src={award}
						sizes="(max-width: 768px) 213px, 50vw"
						priority="true"
						className="rounded-lg object-cover h-40 w-ful"
					/>
				</div>
				<div className="relative h-80">
					<img
						alt="..."
						src={"https://source.unsplash.com/random/400x600"}
						sizes="(max-width: 768px) 213px, 50vw"
						priority="true"
						className="rounded-lg object-cover h-80 w-full"
					/>
				</div>
			</div>
			<div className="mb-4">
				<p className="text-zinc-500 prose prose-neutral dark:prose-invert mb-4">
					{`I manage our developers work and ensure
						the quality and security of our blockchain solutions. I have
						extensive experience in developing and advising on public and
						private blockchain platforms, such as Ethereum and Polygon.`}
				</p>
				<p className="text-zinc-500 prose prose-neutral dark:prose-invert">
					{`I have successfully led the development of a NFT platform with a
					simple multi-platform compatible DApp for organizations and
					institutes, as well as a private blockchain service for supply chain
					management and. I am also currently working on a blockchain
					certification platform for colleges, universities, and companies that
					issue certificates. It is fully customizable and secure.`}
				</p>
			</div>

			<div>
				<p className="text-zinc-500 prose prose-neutral dark:prose-invert">
					{`I am passionate about learning new skills and exploring new
						challenges in the blockchain space. I am always looking for
						opportunities to collaborate with other developers and innovators
						who share my vision of building a more decentralized and trustless
						world.`}
				</p>
			</div>
			<ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
				<li>
					<a
						className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
						rel="noopener noreferrer"
						target="_blank"
						href="https://twitter.com/justinjdaniel"
					>
						<ArrowIcon />
						<p className="h-7 ml-2">follow me</p>
					</a>
				</li>
				<li>
					<a
						className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
						rel="noopener noreferrer"
						target="_blank"
						href="mailto:justinjdaniel@duck.com"
					>
						<ArrowIcon />
						<p className="h-7 ml-2">connect with me</p>
					</a>
				</li>
			</ul>
		</content>
	);
};

export default function Home() {
	return <ProfileContent />;
}
