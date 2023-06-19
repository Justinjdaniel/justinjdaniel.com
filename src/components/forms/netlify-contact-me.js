import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { useForm } from "react-hook-form";
import { Divider, Heading, Highlight, Text, chakra } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Link } from "@chakra-ui/next-js";

export default function NetlifyContactMeForm({ onClose, ...rest }) {
	const { register, handleSubmit } = useForm();
	const toast = useToast();

	const onSubmit = (data) => {
		// send data to netlify
		console.log(data);
		toast({
			title: "Thank you",
			description:
				"Your form submission has been received. I will get back to you as soon as possible, Thank you.",
			status: "success",
			variant: "subtle",
		});

		onClose();
	};

	return (
		<chakra.form
			name="contact"
			method="POST"
			py="4"
			netlify
			netlify-honeypot="bot-field"
			onSubmit={handleSubmit(onSubmit)}
			{...rest}
		>
			<div hidden aria-hidden="true">
				<label>
					Do not fill this out if you are human:
					<input name="bot-field" />
				</label>
			</div>
			<Input
				mb="4"
				name="name"
				type="text"
				placeholder="Your Name"
				{...register("name", { required: true })}
			/>
			<Input
				mb="4"
				name="email"
				type="email"
				inputMode="email"
				placeholder="Your email address"
				{...register("email", { required: true })}
			/>
			<Textarea
				mb="4"
				name="message"
				placeholder="Your query or feedback"
				{...register("message", { required: true })}
			/>
			<Button colorScheme="teal" mb="4" type="submit" size="sm">
				Submit
			</Button>
			<Divider />
			<Text fontSize="xs" lineHeight="tall" my="4">
				You can also contact me directly at{" "}
				<Link
					href="mailto:justinjdaniel@duck.com"
					px="2"
					mr="2"
					p="1"
					rounded="6"
					bg="teal.600"
					target="_blank"
					rel="noopener noreferrer"
				>
					justinjdaniel@duck.com
				</Link>
				I will get back to you as soon as possible. Thank you for your interest
				in my work.
			</Text>
		</chakra.form>
	);
}
