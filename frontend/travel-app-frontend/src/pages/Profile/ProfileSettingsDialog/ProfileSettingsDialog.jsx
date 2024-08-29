import React, { useState, useEffect } from 'react';
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
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HoverUserInfo from "@/components/ui/HoverUserInfo";
import SpinLoading from '@/components/ui/SpinLoading';

const ProfileSettingsDialog = () => {

    const [open, setOpen] = useState(false);

    return (
        // <AlertDialog open={isOpen} onOpenChange={onClose}>
        //     <AlertDialogTrigger>
                
        //     </AlertDialogTrigger>
        //     <AlertDialogContent className="max-w-full w-[500px] rounded-lg">
        //         <form onSubmit={handleSubmit(onSubmit)}>
        //             <AlertDialogHeader>
        //                 <AlertDialogTitle>Edit post description</AlertDialogTitle>
        //                 <AlertDialogDescription className="hidden">
        //                     {/* Make changes to your profile here. Click save when you're done. */}
        //                 </AlertDialogDescription>
        //             </AlertDialogHeader>
                    
        //             <div className="grid gap-1 py-4 w-full">
        //                 <Input
        //                     id="description"
        //                     placeholder="Tell us a little bit about yourself"
        //                     className={cn(errors.description ? "border-2 border-red-600  focus:border-red-500" : "text-foreground border-0", " resize-y rounded-2xl bg-secondary min-h-[100px]")}
        //                     {...register("description", {
        //                         required: "Description is required",
        //                     })}
        //                 />
        //                 {errors.description && errors.description.type === "required" && (
        //                     <p className="text-red-500 text-sm">Description is required!</p>
        //                 )}
        //             </div>

        //             <AlertDialogFooter>
        //                 <AlertDialogCancel onClick={() => reset()}>Cancel</AlertDialogCancel>
        //                 <Button type="submit" className="text-white">
        //                     Save changes
        //                 </Button> 
        //             </AlertDialogFooter>
        //         </form>
        //     </AlertDialogContent>
        // </AlertDialog>
        null
    );
};

export default ProfileSettingsDialog;
