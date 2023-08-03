import { useRef } from "react";

const CrystalParallax = () => {
	const canvasRef = useRef(null);
	const context = useRef(null);
	return (
		<div
			style={{
				zIndex: 1,
				position: "absolute",
				top: 0,
				left: 0,
				height: "100%",
				width: "100%",
			}}
		>
			<div
				id="crystal-parallax-overlay"
				style={{
					backgroundImage:
						"radial-gradient(ellipse at center, rgba(0,0,0,.0) 10%, rgba(0,0,0,.8) 80%, rgba(0,0,0,1) 90%, rgba(0,0,0,1) 100%)",
					zIndex: 3,
					position: "absolute",
					top: 0,
					left: 0,
					height: "100%",
					width: "100%",
				}}
			/>
			<canvas
				id="crystal-parallax"
				ref={canvasRef}
				style={{
					zIndex: 2,
					position: "absolute",
					top: 0,
					left: 0,
				}}
			/>
		</div>
	);
};

export default CrystalParallax;
