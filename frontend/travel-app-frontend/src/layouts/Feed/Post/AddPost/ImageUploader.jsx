import React, { useState, useEffect } from 'react';
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "@/components/firebase";

const ImageUploader = ({uploadingImage, setUploadingImage, imageURL, setImageURL}) => {
	const authHeader = useAuthHeader();
	const auth = useAuthUser();
    const { toast } = useToast();

    const handleImageChange = async (e) => {
        // console.log(e.target.files[0]);

        const image = e.target.files[0];

        if(image) {

            // Walidacja rozszerzenia pliku
            const fileType = image.type;
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(fileType)) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Please upload a file with .jpg or .jpeg extension.",
                });
                return;
            }

            // Walidacja maksymalnego rozmiaru zdjęcia
            const maxSize = 10 * 1024 * 1024; // 10 MB
            if (image.size > maxSize) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "File size exceeds 10MB.",
                });
                return;
            }

            try {
                setUploadingImage(true);
                const storage = getStorage(app);
                const storageRef = ref(storage, `images/${auth.id}/posts/${image.name}`);
                await uploadBytes(storageRef, image);
                const downloadURL = await getDownloadURL(storageRef);
                console.log(downloadURL);
                setImageURL(downloadURL);
            } catch (error) {
                console.log(error);
            } finally {
                setUploadingImage(false);
            }
        }
    };
  
    const handleRemoveImage = () => {
        setImageURL("");
        document.getElementById('file').value = "";
    };

    return (
        <div className="flex flex-row justify-center items-center relative">
            <Label
                htmlFor="file"
                className="cursor-pointer relative"
            >
                {imageURL === "" ? (
                    uploadingImage ? (
                        <svg className={"ml-2 w-5 h-5 text-current animate-spin fill-primary"}  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="primary"/></svg>
                    ) : (
                        <Icons.imageAdd className="h-7 w-7 fill-primary"/>
                )) : (
                    <div>
                        <img src={imageURL} alt="" className="ml-2 w-fit h-[40px] object-cover rounded-sm bg-black" />

                    </div>
                )}
            </Label>

            {imageURL !== "" && !uploadingImage && (
                <Icons.trashEmpty 
                    className="h-5 w-5 fill-current hover:fill-red-600 cursor-pointer absolute top-[-10px] right-[-7px]"
                    onClick={handleRemoveImage}
                /> 
            )}

            <Input
                id="file"
                type="file" 
                onChange={handleImageChange}
                className="w-[200px] sr-only"
            />

      </div>
    );
};

export default ImageUploader;
