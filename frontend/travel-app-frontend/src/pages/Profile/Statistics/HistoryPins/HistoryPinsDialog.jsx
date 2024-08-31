import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import HoverUserInfo from "@/components/ui/HoverUserInfo";
import SpinLoading from '@/components/ui/SpinLoading';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import HoverPopoverInputInfo from "@/components/ui/HoverPopoverInputInfo";
import HistoryPinRowView from "@/pages/Profile/Statistics/HistoryPins/HistoryPinRowView";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import{
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";

const HistoryPinsDialog = ({userId, setCounterHistoryPins}) => {
	const authHeader = useAuthHeader();

    const [open, setOpen] = useState(false);

    const [pinsData, setPinsData] = useState(null);

    // paginacja
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(0);
    const [refetchData, setRefetchData] = useState(false);


	useEffect(() => {
		setRefetchData(false);
        getAllUserPins();
	}, [userId, refetchData]);


    const getAllUserPins = async () => {
		fetch(`http://localhost:5000/api/v1/pins/all/${userId}?pageNumber=${currentPage}&pageSize=${pageSize}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json', 
				"Authorization": authHeader,
			},
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Błąd sieci!');
			}
			return response.json();
		})
		.then(data => {
            setPinsData(data.content);
            setTotalPages(data.totalPages);
            setCounterHistoryPins(data.totalElements);
		})
		.catch(error => {
			console.log(error.message);
		});
	};

    const nextPage = () => {
        if(currentPage < (totalPages-1)) {
            setPinsData(null);
            setCurrentPage(prev => prev + 1);
            setRefetchData(true);
        }
    }

    const prevPage = () => {
        if(currentPage > 0) {
            setPinsData(null);
            setCurrentPage(prev => prev - 1);
            setRefetchData(true);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {pinsData && 
                    <div>
                        <Button className="text-white gap-[4px] px-[10px] text-sm" >
                            <Icons.historyFill className="h-[15px] w-[15px] fill-white" />
                            Show
                        </Button>
                    </div>
                }
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-center items-center max-w-full w-[700px] rounded-lg px-2 py-10 sm:p-10">
                <DialogHeader className="w-full text-center sm:text-start" >
                    <DialogTitle className="font-extrabold">History of all pins</DialogTitle>
                    <DialogDescription className="">Here you will find the history of all user pins</DialogDescription>
                </DialogHeader>

                <div className="w-full">
                     
                    {!pinsData && <SpinLoading className="w-full flex justify-center items-center" /> }

                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-fit">Flag</TableHead>
                                <TableHead className="w-fit">Country</TableHead>
                                <TableHead className="w-full">City</TableHead>
                                <TableHead className="text-right text-nowrap">Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {pinsData && pinsData.length != 0 && (pinsData.map((pin, i) => {
                                return (
                                    <HistoryPinRowView key={`historyPinRowView${i}`} pin={pin} />
                                )
                            }))}
                        </TableBody>
                    </Table>
                    
                    <div className="w-full flex flex-row justify-center items-center gap-1">
                        <Button 
                            onClick={() => prevPage()} 
                            variant="secondary"
                            className="w-fit"
                            disabled={currentPage == 0}
                        >
                            <ChevronLeftIcon className="h-6 w-6 cursor-pointer rounded-md" />
                        </Button>
                        
                        <div className="text-sm text-gray-400">{`${currentPage+1}/${totalPages}`}</div>

                        <Button 
                            onClick={() => nextPage()}
                            variant="secondary"
                            className="w-fit"
                            disabled={currentPage == (totalPages-1)}
                        >
                            <ChevronRightIcon className="h-6 w-6 cursor-pointer rounded-md"/>
                        </Button>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default HistoryPinsDialog;
