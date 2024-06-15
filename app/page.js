import ArrowIcon from "@/components/icons/arrow-icon";
import Image from "next/image";
import award from "public/images/home/award.webp";
import speaking from "public/images/home/speaking.webp";
import teamMeetUpEnd2023 from "public/images/home/team-meetup-end-2023.webp";
import teamMeetUpMid2023 from "public/images/home/team-meetup-mid-2023.webp";
import React, { Fragment } from "react";

const ProfileContent = () => {
	const images = [
		{
			alt: "Speaking in blockchain meetup",
			title: "Speaking in blockchain meetup",
			src: speaking,
		},
		{
			alt: "Awarded by Kerala Digital University's Vice Chancellor",
			title: "Awarded by Kerala Digital University's Vice Chancellor",
			src: award,
		},
		{
			alt: "Team meetup in Kerala mid 2023",
			title: "Team meetup in Kerala mid 2023",
			src: teamMeetUpMid2023,
		},
		{
			alt: "Team meetup in Kerala mid 2023",
			title: "Team meetup in Kerala mid 2023",
			src: teamMeetUpEnd2023,
		},
	];

	return (
		<content className="z-10 antialiased max-w-2xl mb-40 mx-4 mt-8 md:mx-auto">
			<h1 className="font-semibold text-2xl mb-8 text-left w-max">
				Hey, I'm{" "}
				<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
					Justin
				</span>{" "}
				👋
			</h1>
			<div>
				<p className="text-zinc-300 prose prose-neutral dark:prose-invert">
					I am a blockchain developer and researcher with over three years of
					experience. I specialize in smart contracts, dApps, tokens, and NFTs
					using Solidity, Web3.js, and Ethers.js. With my full-stack development
					background and DevOps experience, I ensure seamless integration and
					deployment for any blockchain project. My passion for blockchain
					technology extends to ongoing research to stay updated with the latest
					advancements in the field.
				</p>
			</div>
			<div className="grid grid-cols-2 gap-4 my-8">
				{images.map(({ alt, title, src }, index) => (
					<div key={index + alt} className="relative h-60">
						<Image
							alt={alt}
							title={title}
							src={src}
							fill="true"
							sizes="(max-width: 768px) 213px, 50vw"
							priority="true"
							className="rounded-lg object-cover h-full w-full transition-transform duration-300 ease-in-out hover:scale-105 sm:object-center"
						/>
					</div>
				))}
			</div>
			<div className="mb-4 text-zinc-300">
				<p className="prose prose-neutral dark:prose-invert mb-4">
					I lead the development and quality assurance of secure blockchain
					solutions. My expertise spans public and private platforms like
					Ethereum, Polygon, and Hyperledger Fabric.
				</p>
				<p className="prose prose-neutral dark:prose-invert">
					I spearheaded the creation of a user-friendly, multi-platform DApp NFT
					platform for organizations and institutes. Additionally, I led the
					development of a private blockchain service for efficient supply chain
					management. I also designed and built a tokenization platform with
					RBAC functionality, which can be used as a plug-and-play service for
					existing platforms. Currently, I'm building a blockchain traceability
					system to enhance supply chain transparency.
				</p>
			</div>
			<div>
				<p className="prose prose-neutral dark:prose-invert">
					I'm a lifelong learner, constantly seeking new blockchain challenges
					and skills. I thrive in collaborative environments, working with
					developers and visionaries to build a more decentralized and secure
					future.
				</p>
			</div>
			<Footer />
		</content>
	);
};

/**
 * Renders the Footer component.
 *
 * @return {JSX.Element} The rendered Footer component.
 */
const Footer = () => (
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
);

export default function Home() {
	return (
		<Fragment>
			<ProfileContent />
		</Fragment>
	);
}
