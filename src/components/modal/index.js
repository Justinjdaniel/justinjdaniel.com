import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/modal";

const ModalComponent = ({
	isOpen,
	onOpen,
	onClose,
	modalProps,
	modalOverlayProps,
	modalContentProps,
	modalCloseButtonProps,
	modalHeader,
	modalHeaderProps,
	modalFooter,
	modalFooterProps,
	children,
	...rest
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered {...modalProps}>
			<ModalOverlay {...modalOverlayProps} />
			<ModalContent {...modalContentProps}>
				{modalHeader && (
					<ModalHeader {...modalHeaderProps}>{modalHeader}</ModalHeader>
				)}
				<ModalCloseButton {...modalCloseButtonProps} />
				<ModalBody {...rest}>{children}</ModalBody>
				{modalFooter && (
					<ModalFooter {...modalFooterProps}>{modalFooter}</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ModalComponent;
