import { Flex } from "@chakra-ui/layout";

const Footer = ({ ...rest }) => {
	return (
		<Flex
			p="4"
			pos="fixed"
			left="0"
			right="0"
			bottom="0"
			zIndex="1"
			alignItems="center"
			justifyContent="flex-start"
			// bgGradient="radial( whiteAlpha.100 1px, rgba(0, 0, 0, 0) 1px)"
			bgGradient="radial(rgba(0, 0, 0, 0) 1px, #050609 1px )"
			bgSize="4px 4px"
			fontSize="sm"
			lineHeight="1.5"
			sx={{
				backdropFilter: "blur(4px)",
			}}
			_before={{
				display: "block",
				content: "''",
				position: "absolute",
				top: "-1px",
				left: "0",
				right: "0",
				height: "1px",
				background: "whiteAlpha.500",
				opacity: "0.2",
			}}
			{...rest}
		>
			{/* <Link href="#" target="_blank" rel="noreferrer">
				<Logo />
			</Link>
			<Text fontFamily="monospace" fontWeight="medium" fontStyle="normal">
				Footer
			</Text> */}
		</Flex>
	);
};

export default Footer;
