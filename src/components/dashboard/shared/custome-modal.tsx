"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useModal } from "@/providers/modal-provider";

type ModalProps = {
    heading?: string, 
    subHeading?: string,
    children: React.ReactNode,
    defaultOpen?: boolean
};

const CustomModal = ({heading, subHeading, children, defaultOpen}: ModalProps) => {
    const {isOpen, setClose} = useModal();
    return (
        <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
            <DialogContent className="overflow-y-scroll md:max-h-[700px] md:h-fit h-screen bg-card">
                <DialogHeader className="pt-8 text-left">
                    {heading && <DialogTitle className="text-2xl font-bold">{heading}</DialogTitle>}
                    {subHeading && <DialogDescription>{subHeading}</DialogDescription>}

                    {children}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default CustomModal;