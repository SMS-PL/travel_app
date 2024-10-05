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

const PostDetailsAlert = ({ post, onOpen, onClose }) => {
    const [open, setOpen] = useState(false);

    // Funkcja pomocnicza do renderowania każdego klucza i wartości
    const renderPostDetails = (post) => {
        return Object.entries(post).map(([key, value]) => {
            // Specjalna obsługa dla URL obrazów, wyświetlimy obrazki zamiast URL
            if (key === 'imageUrl') {
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
                        Details of post.
                    </AlertDialogTitle>
                    <AlertDialogDescription className="hidden"></AlertDialogDescription>
                </AlertDialogHeader>

                <div className="break-all">
                    {renderPostDetails(post)}
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default PostDetailsAlert;
