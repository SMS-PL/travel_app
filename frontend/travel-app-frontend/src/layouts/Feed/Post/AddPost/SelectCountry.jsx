import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";

const SelectCountry = ({value, setValue, setCountryId}) => {
	const authHeader = useAuthHeader();
    const listRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [countries, setCountries] = useState([]);
    const [seletedCountryIso, setSeletedCountryIso] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllCountries();
    }, []);
    
    // przewijanie na górę listy krajów przy każdej zmianie wyszukiwania
    useEffect(() => {
        if (listRef.current) {
            setTimeout(() => {
                listRef.current.scrollTop = 0;
            }, 0);
        }
    }, [searchTerm]);

    const getAllCountries = () => {
		fetch(`http://localhost:5000/api/v1/countries/ `, {
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
            setCountries(data);
		})
		.catch(error => {
			console.log(error.message);
		});
    };
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="w-fit p-0 justify-between relative"
                >
                    {value && seletedCountryIso ? 
                        <img src={`https://flagsapi.com/${seletedCountryIso}/flat/64.png`} alt="" className="w-[25px] cursor-pointer" /> 
                    : (
                        <Icons.addLocation className="h-6 w-6 fill-primary"/>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search countries..." className="h-9" onValueChange={(val) => setSearchTerm(val)} value={searchTerm} />
                    <CommandList ref={listRef}>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                            {countries && countries != {} && countries.map((country) => (
                                    <CommandItem
                                        key={country.nicename}
                                        value={country.nicename}
                                        onSelect={(currentValue) => {
                                            console.log(currentValue);
                                            setValue(currentValue === value ? "" : currentValue);
                                            setCountryId(currentValue === value ? "" : country.id);
                                            setSeletedCountryIso(currentValue === value ? "" : country.iso);
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <img src={`https://flagsapi.com/${country.iso}/flat/64.png`} alt="" className="w-[20px] cursor-pointer mr-2" />
                                        {country.nicename}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                value === country.nicename ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SelectCountry;
