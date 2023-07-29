"use client";

import { useCallback, useEffect, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    footer,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [secondaryAction, disabled]);

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="relative p-6 flex-auto">
                    {body}

                    <div
                        className="
                            flex 
                            flex-row 
                            items-center 
                            gap-4 
                            w-full
                            mt-4
                        "
                    >
                        {secondaryAction && secondaryActionLabel && (
                            <Button
                                variant="outline"
                                title={secondaryActionLabel}
                                disabled={disabled}
                                onClick={handleSecondaryAction}
                            >
                                {secondaryActionLabel}
                            </Button>
                        )}
                        <Button
                            title={actionLabel}
                            disabled={disabled}
                            onClick={handleSubmit}
                        >
                            {actionLabel}
                        </Button>
                    </div>
                    <DialogFooter className="!flex-col">
                        {footer}
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};