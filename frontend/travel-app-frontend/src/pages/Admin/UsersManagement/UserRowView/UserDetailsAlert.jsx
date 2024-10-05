import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const UserDetailsAlert = ({ user, onOpen, onClose }) => {
    const [open, setOpen] = useState(false);

    // Funkcja pomocnicza do renderowania każdego klucza i wartości
    const renderUserDetails = (user) => {
        return Object.entries(user).map(([key, value]) => {
            // Dla tablic, jak np. roles, wyświetlimy mapowane wartości
            if (Array.isArray(value)) {
                return (
                    <div key={key}>
                        <strong>{key}:</strong> {value.map((item, idx) => <span key={idx}>{JSON.stringify(item)}</span>)}
                    </div>
                );
            }

            // Jeśli wartość jest obiektem, możesz go zagnieździć lub użyć JSON.stringify dla prostoty
            if (typeof value === 'object' && value !== null) {
                return (
                    <div key={key}>
                        <strong>{key}:</strong> {JSON.stringify(value)}
                    </div>
                );
            }

            // Specjalna obsługa dla linków do obrazów, wyświetlimy obrazki zamiast URL
            if (key === 'photoUrl' || key === 'backgroundUrl') {
                return (
                    <div key={key}>
                        <strong>{key}:</strong>
                        <a href={value} alt={key} className="hover:text-blue-500 text-blue-300" target="_blank" rel="noreferrer">
                            {" "}{value}
                        </a>
                    </div>
                );
            }

            // Domyślny sposób renderowania dla innych kluczy
            return (
                <div key={key}>
                    <strong>{key}:</strong> {value !== null ? value.toString() : 'null'}
                </div>
            );
        });
    };

    return (
        <AlertDialog
            open={onOpen}
            onOpenChange={onClose}
        >
            <AlertDialogTrigger className="hidden" asChild>
                <div></div>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-full w-[800px] rounded-lg max-h-[100vh] overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Details of user.
                    </AlertDialogTitle>
                    <AlertDialogDescription className="hidden"></AlertDialogDescription>
                </AlertDialogHeader>

                <div className="break-all">
                    {renderUserDetails(user)}
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default UserDetailsAlert;
