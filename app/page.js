import Particles from "@components/particles";
import Image from "next/image";
import Link from "next/link";
import award from "public/images/home/award.webp";
import bg from "public/images/home/bg.png";
import React from "react";

export default function Home() {
	return (
		<div className="flex flex-col w-screen h-screen overflow-x-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			<Header />
			<IntroAnimation />
			<ProfileContent />
		</div>
	);
}

const navigation = [
	{ name: "Projects", href: "/projects" },
	{ name: "Contact", href: "/contact" },
	{ name: "Blog", href: "/blog" },
];

const Header = () => {
	// TODO: Update Header
	// assignees: Justinjdaniel
	// labels: enhancement, feature, ui

	return (
		<header>
			<Image
				className="h-32 md:h-40 mb-8 w-screen animate-fade-in object-cover"
				src={bg}
				alt="bg"
			/>
			<nav className="max-w-2xl flex items-center justify-between mx-auto animate-fade-in">
				<ul className="flex items-center justify-center gap-4">
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-sm duration-500 text-zinc-500 hover:text-purple-500
							link relative overflow-hidden px-0 py-[7px]"
						>
							{item.name}
							<svg
								className="link__graphic link__graphic--slide"
								width="300%"
								height="100%"
								viewBox="0 0 1200 60"
								preserveAspectRatio="none"
							>
								<title>wave</title>
								<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" />
							</svg>
						</Link>
					))}
				</ul>
				<ul className="flex items-center justify-center gap-4">
					<Link
						href="https://www.linkedin.com/in/justin-j-daniel/"
						className="p-2 group duration-500 bg-white/5 rounded-full border border-white/10 hover:scale-110 hover:border-white/50"
					>
						<svg
							className="duration-500 
							fill-zinc-500
							group-hover:fill-white/90"
							width="15"
							height="15"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>LinkedIn</title>
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
						</svg>
					</Link>
					<Link
						href="https://github.com/justinjdaniel"
						className="p-2 group duration-500 bg-white/5 rounded-full border border-white/10 hover:scale-110 hover:border-white/50"
					>
						<svg
							className="duration-500 
							fill-zinc-500
							group-hover:fill-white/90"
							width="15"
							height="15"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>GitHub</title>
							<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
						</svg>
					</Link>
				</ul>
			</nav>
		</header>
	);
};

const IntroAnimation = () => {
	return (
		<div>
			{/* <h1 className="z-10 text-center text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
				Justin J Daniel
			</h1> */}
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
		</div>
	);
};

const ProfileContent = () => {
	return (
		<content className="z-10 antialiased max-w-2xl mb-40 mx-4 mt-8 lg:mx-auto animate-fade-in w-full">
			<h1 className="font-bold text-2xl mb-8 text-left animate-fade-in w-max">
				hey, I'm{" "}
				<span
					className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
				>
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
				<div className="relative mb-4 h-40">
					<img
						alt="..."
						src={"https://source.unsplash.com/random/600x400"}
						fill
						sizes="(max-width: 768px) 213px, 50vw"
						priority
						className="rounded-lg object-cover h-40 w-full"
					/>
				</div>
				<div className="relative h-80">
					<img
						alt="..."
						src={"https://source.unsplash.com/random/400x600"}
						fill
						sizes="(max-width: 768px) 213px, 50vw"
						priority
						className="rounded-lg object-cover h-80 w-full"
					/>
				</div>
				<div className="relative mb-4 h-80">
					<img
						alt="..."
						src={"https://source.unsplash.com/random/400x600"}
						// fill
						sizes="(max-width: 768px) 213px, 50vw"
						priority
						className="rounded-lg object-cover h-80 w-full"
					/>
				</div>
				<div className="relative h-40">
					<Image
						alt="Awarded by Kerala Digital University's Vice Chancellor"
						src={award}
						// fill
						sizes="(max-width: 768px) 213px, 50vw"
						priority
						className="rounded-lg object-cover h-40 w-ful"
					/>
				</div>
			</div>
			<div className="mb-4">
				<p className="text-zinc-500 prose prose-neutral dark:prose-invert">
					{`I manage our developers work and ensure
						the quality and security of our blockchain solutions. I have
						extensive experience in developing and advising on public and
						private blockchain platforms, such as Ethereum and Polygon. I have
						successfully led the development of a private blockchain service for
						supply chain management, as well as a NFT platform with a simple and
						multi-platform compatible DApp for organizations and institutes. I
						am also currently working on a blockchain certification platform for
						colleges, universities, and companies that issue certificates. It is
						fully customizable and secure.`}
				</p>
			</div>
			{/* <Skills/> */}
			<div>
				<p className="text-zinc-500 prose prose-neutral dark:prose-invert">
					{`	I am passionate about learning new skills and exploring new
						challenges in the blockchain space. I am always looking for
						opportunities to collaborate with other developers and innovators
						who share my vision of building a more decentralized and trustless
						world.`}
				</p>
			</div>
		</content>
	);
};
