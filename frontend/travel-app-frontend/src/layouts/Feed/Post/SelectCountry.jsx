import React from 'react';
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

const countries = [
    {id: 1, name: "Afghanistan", ISO: "AF"},
    {id: 2, name: "Albania", ISO: "AL"},
    {id: 3, name: "Algeria", ISO: "DZ"},
    {id: 4, name: "American Samoa", ISO: "AS"},
    {id: 5, name: "Andorra", ISO: "AD"},
    {id: 6, name: "Angola", ISO: "AO"},
    {id: 7, name: "Anguilla", ISO: "AI"},
    {id: 8, name: "Antarctica", ISO: "AQ"},
    {id: 9, name: "Antigua And Barbuda", ISO: "AG"},
    {id: 10, name: "Argentina", ISO: "AR"},
    {id: 11, name: "Armenia", ISO: "AM"},
    {id: 12, name: "Aruba", ISO: "AW"},
    {id: 13, name: "Australia", ISO: "AU"},
    {id: 14, name: "Austria", ISO: "AT"},
    {id: 15, name: "Azerbaijan", ISO: "AZ"},
    {id: 16, name: "Bahamas", ISO: "BS"},
    {id: 17, name: "Bahrain", ISO: "BH"},
    {id: 18, name: "Bangladesh", ISO: "BD"},
    {id: 19, name: "Barbados", ISO: "BB"},
    {id: 20, name: "Belarus", ISO: "BY"},
    {id: 21, name: "Belgium", ISO: "BE"},
    {id: 22, name: "Belize", ISO: "BZ"},
    {id: 23, name: "Benin", ISO: "BJ"},
    {id: 24, name: "Bermuda", ISO: "BM"},
    {id: 25, name: "Bhutan", ISO: "BT"},
    {id: 26, name: "Bolivia", ISO: "BO"},
    {id: 27, name: "Bosnia And Herzegovina", ISO: "BA"},
    {id: 28, name: "Botswana", ISO: "BW"},
    {id: 29, name: "Bouvet Island", ISO: "BV"},
    {id: 30, name: "Brazil", ISO: "BR"},
    {id: 31, name: "British Indian Ocean Territory", ISO: "IO"},
    {id: 32, name: "Brunei Darussalam", ISO: "BN"},
    {id: 33, name: "Bulgaria", ISO: "BG"},
    {id: 34, name: "Burkina Faso", ISO: "BF"},
    {id: 35, name: "Burundi", ISO: "BI"},
    {id: 36, name: "Cambodia", ISO: "KH"},
    {id: 37, name: "Cameroon", ISO: "CM"},
    {id: 38, name: "Canada", ISO: "CA"},
    {id: 39, name: "Cape Verde", ISO: "CV"},
    {id: 40, name: "Cayman Islands", ISO: "KY"},
    {id: 41, name: "Central African Republic", ISO: "CF"},
    {id: 42, name: "Chad", ISO: "TD"},
    {id: 43, name: "Chile", ISO: "CL"},
    {id: 44, name: "China", ISO: "CN"},
    {id: 45, name: "Christmas Island", ISO: "CX"},
    {id: 46, name: "Cocos (Keeling) Islands", ISO: "CC"},
    {id: 47, name: "Colombia", ISO: "CO"},
    {id: 48, name: "Comoros", ISO: "KM"},
    {id: 49, name: "Congo", ISO: "CG"},
    {id: 50, name: "Congo, The Democratic Republic Of The", ISO: "CD"},
    {id: 51, name: "Cook Islands", ISO: "CK"},
    {id: 52, name: "Costa Rica", ISO: "CR"},
    {id: 53, name: "Cote D'Ivoire", ISO: "CI"},
    {id: 54, name: "Croatia", ISO: "HR"},
    {id: 55, name: "Cuba", ISO: "CU"},
    {id: 56, name: "Cyprus", ISO: "CY"},
    {id: 57, name: "Czech Republic", ISO: "CZ"},
    {id: 58, name: "Denmark", ISO: "DK"},
    {id: 59, name: "Djibouti", ISO: "DJ"},
    {id: 60, name: "Dominica", ISO: "DM"},
    {id: 61, name: "Dominican Republic", ISO: "DO"},
    {id: 62, name: "Ecuador", ISO: "EC"},
    {id: 63, name: "Egypt", ISO: "EG"},
    {id: 64, name: "El Salvador", ISO: "SV"},
    {id: 65, name: "Equatorial Guinea", ISO: "GQ"},
    {id: 66, name: "Eritrea", ISO: "ER"},
    {id: 67, name: "Estonia", ISO: "EE"},
    {id: 68, name: "Ethiopia", ISO: "ET"},
    {id: 69, name: "Falkland Islands (Malvinas)", ISO: "FK"},
    {id: 70, name: "Faroe Islands", ISO: "FO"},
    {id: 71, name: "Fiji", ISO: "FJ"},
    {id: 72, name: "Finland", ISO: "FI"},
    {id: 73, name: "France", ISO: "FR"},
    {id: 74, name: "French Guiana", ISO: "GF"},
    {id: 75, name: "French Polynesia", ISO: "PF"},
    {id: 76, name: "French Southern Territories", ISO: "TF"},
    {id: 77, name: "Gabon", ISO: "GA"},
    {id: 78, name: "Gambia", ISO: "GM"},
    {id: 79, name: "Georgia", ISO: "GE"},
    {id: 80, name: "Germany", ISO: "DE"},
    {id: 81, name: "Ghana", ISO: "GH"},
    {id: 82, name: "Gibraltar", ISO: "GI"},
    {id: 83, name: "Greece", ISO: "GR"},
    {id: 84, name: "Greenland", ISO: "GL"},
    {id: 85, name: "Grenada", ISO: "GD"},
    {id: 86, name: "Guadeloupe", ISO: "GP"},
    {id: 87, name: "Guam", ISO: "GU"},
    {id: 88, name: "Guatemala", ISO: "GT"},
    {id: 89, name: "Guinea", ISO: "GN"},
    {id: 90, name: "Guinea-Bissau", ISO: "GW"},
    {id: 91, name: "Guyana", ISO: "GY"},
    {id: 92, name: "Haiti", ISO: "HT"},
    {id: 93, name: "Heard Island And Mcdonald Islands", ISO: "HM"},
    {id: 94, name: "Holy See (Vatican City State)", ISO: "VA"},
    {id: 95, name: "Honduras", ISO: "HN"},
    {id: 96, name: "Hong Kong", ISO: "HK"},
    {id: 97, name: "Hungary", ISO: "HU"},
    {id: 98, name: "Iceland", ISO: "IS"},
    {id: 99, name: "India", ISO: "IN"},
    {id: 100, name: "Indonesia", ISO: "ID"},
    {id: 101, name: "Iran, Islamic Republic Of", ISO: "IR"},
    {id: 102, name: "Iraq", ISO: "IQ"},
    {id: 103, name: "Ireland", ISO: "IE"},
    {id: 104, name: "Israel", ISO: "IL"},
    {id: 105, name: "Italy", ISO: "IT"},
    {id: 106, name: "Jamaica", ISO: "JM"},
    {id: 107, name: "Japan", ISO: "JP"},
    {id: 108, name: "Jordan", ISO: "JO"},
    {id: 109, name: "Kazakhstan", ISO: "KZ"},
    {id: 110, name: "Kenya", ISO: "KE"},
    {id: 111, name: "Kiribati", ISO: "KI"},
    {id: 112, name: "Korea, Democratic People's Republic Of", ISO: "KP"},
    {id: 113, name: "Korea, Republic Of", ISO: "KR"},
    {id: 114, name: "Kuwait", ISO: "KW"},
    {id: 115, name: "Kyrgyzstan", ISO: "KG"},
    {id: 116, name: "Lao People's Democratic Republic", ISO: "LA"},
    {id: 117, name: "Latvia", ISO: "LV"},
    {id: 118, name: "Lebanon", ISO: "LB"},
    {id: 119, name: "Lesotho", ISO: "LS"},
    {id: 120, name: "Liberia", ISO: "LR"},
    {id: 121, name: "Libyan Arab Jamahiriya", ISO: "LY"},
    {id: 122, name: "Liechtenstein", ISO: "LI"},
    {id: 123, name: "Lithuania", ISO: "LT"},
    {id: 124, name: "Luxembourg", ISO: "LU"},
    {id: 125, name: "Macao", ISO: "MO"},
    {id: 126, name: "Macedonia, The Former Yugoslav Republic Of", ISO: "MK"},
    {id: 127, name: "Madagascar", ISO: "MG"},
    {id: 128, name: "Malawi", ISO: "MW"},
    {id: 129, name: "Malaysia", ISO: "MY"},
    {id: 130, name: "Maldives", ISO: "MV"},
    {id: 131, name: "Mali", ISO: "ML"},
    {id: 132, name: "Malta", ISO: "MT"},
    {id: 133, name: "Marshall Islands", ISO: "MH"},
    {id: 134, name: "Martinique", ISO: "MQ"},
    {id: 135, name: "Mauritania", ISO: "MR"},
    {id: 136, name: "Mauritius", ISO: "MU"},
    {id: 137, name: "Mayotte", ISO: "YT"},
    {id: 138, name: "Mexico", ISO: "MX"},
    {id: 139, name: "Micronesia, Federated States Of", ISO: "FM"},
    {id: 140, name: "Moldova, Republic Of", ISO: "MD"},
    {id: 141, name: "Monaco", ISO: "MC"},
    {id: 142, name: "Mongolia", ISO: "MN"},
    {id: 143, name: "Montenegro", ISO: "ME"},
    {id: 144, name: "Montserrat", ISO: "MS"},
    {id: 145, name: "Morocco", ISO: "MA"},
    {id: 146, name: "Mozambique", ISO: "MZ"},
    {id: 147, name: "Myanmar", ISO: "MM"},
    {id: 148, name: "Namibia", ISO: "NA"},
    {id: 149, name: "Nauru", ISO: "NR"},
    {id: 150, name: "Nepal", ISO: "NP"},
    {id: 151, name: "Netherlands", ISO: "NL"},
    {id: 152, name: "New Caledonia", ISO: "NC"},
    {id: 153, name: "New Zealand", ISO: "NZ"},
    {id: 154, name: "Nicaragua", ISO: "NI"},
    {id: 155, name: "Niger", ISO: "NE"},
    {id: 156, name: "Nigeria", ISO: "NG"},
    {id: 157, name: "Niue", ISO: "NU"},
    {id: 158, name: "Norfolk Island", ISO: "NF"},
    {id: 159, name: "Northern Mariana Islands", ISO: "MP"},
    {id: 160, name: "Norway", ISO: "NO"},
    {id: 161, name: "Oman", ISO: "OM"},
    {id: 162, name: "Pakistan", ISO: "PK"},
    {id: 163, name: "Palau", ISO: "PW"},
    {id: 164, name: "Palestinian Territory, Occupied", ISO: "PS"},
    {id: 165, name: "Panama", ISO: "PA"},
    {id: 166, name: "Papua New Guinea", ISO: "PG"},
    {id: 167, name: "Paraguay", ISO: "PY"},
    {id: 168, name: "Peru", ISO: "PE"},
    {id: 169, name: "Philippines", ISO: "PH"},
    {id: 170, name: "Pitcairn", ISO: "PN"},
    {id: 171, name: "Poland", ISO: "PL"},
    {id: 172, name: "Portugal", ISO: "PT"},
    {id: 173, name: "Puerto Rico", ISO: "PR"},
    {id: 174, name: "Qatar", ISO: "QA"},
    {id: 175, name: "Reunion", ISO: "RE"},
    {id: 176, name: "Romania", ISO: "RO"},
    {id: 177, name: "Russian Federation", ISO: "RU"},
    {id: 178, name: "Rwanda", ISO: "RW"},
    {id: 179, name: "Saint Helena", ISO: "SH"},
    {id: 180, name: "Saint Kitts And Nevis", ISO: "KN"},
    {id: 181, name: "Saint Lucia", ISO: "LC"},
    {id: 182, name: "Saint Pierre And Miquelon", ISO: "PM"},
    {id: 183, name: "Saint Vincent And The Grenadines", ISO: "VC"},
    {id: 184, name: "Samoa", ISO: "WS"},
    {id: 185, name: "San Marino", ISO: "SM"},
    {id: 186, name: "Sao Tome And Principe", ISO: "ST"},
    {id: 187, name: "Saudi Arabia", ISO: "SA"},
    {id: 188, name: "Senegal", ISO: "SN"},
    {id: 189, name: "Serbia", ISO: "RS"},
    {id: 190, name: "Seychelles", ISO: "SC"},
    {id: 191, name: "Sierra Leone", ISO: "SL"},
    {id: 192, name: "Singapore", ISO: "SG"},
    {id: 193, name: "Slovakia", ISO: "SK"},
    {id: 194, name: "Slovenia", ISO: "SI"},
    {id: 195, name: "Solomon Islands", ISO: "SB"},
    {id: 196, name: "Somalia", ISO: "SO"},
    {id: 197, name: "South Africa", ISO: "ZA"},
    {id: 198, name: "South Georgia And The South Sandwich Islands", ISO: "GS"},
    {id: 199, name: "Spain", ISO: "ES"},
    {id: 200, name: "Sri Lanka", ISO: "LK"},
    {id: 201, name: "Sudan", ISO: "SD"},
    {id: 202, name: "Suriname", ISO: "SR"},
    {id: 203, name: "Svalbard And Jan Mayen", ISO: "SJ"},
    {id: 204, name: "Swaziland", ISO: "SZ"},
    {id: 205, name: "Sweden", ISO: "SE"},
    {id: 206, name: "Switzerland", ISO: "CH"},
    {id: 207, name: "Syrian Arab Republic", ISO: "SY"},
    {id: 208, name: "Taiwan, Province Of China", ISO: "TW"},
    {id: 209, name: "Tajikistan", ISO: "TJ"},
    {id: 210, name: "Tanzania, United Republic Of", ISO: "TZ"},
    {id: 211, name: "Thailand", ISO: "TH"},
    {id: 212, name: "Timor-Leste", ISO: "TL"},
    {id: 213, name: "Togo", ISO: "TG"},
    {id: 214, name: "Tokelau", ISO: "TK"},
    {id: 215, name: "Tonga", ISO: "TO"},
    {id: 216, name: "Trinidad And Tobago", ISO: "TT"},
    {id: 217, name: "Tunisia", ISO: "TN"},
    {id: 218, name: "Turkey", ISO: "TR"},
    {id: 219, name: "Turkmenistan", ISO: "TM"},
    {id: 220, name: "Turks And Caicos Islands", ISO: "TC"},
    {id: 221, name: "Tuvalu", ISO: "TV"},
    {id: 222, name: "Uganda", ISO: "UG"},
    {id: 223, name: "Ukraine", ISO: "UA"},
    {id: 224, name: "United Arab Emirates", ISO: "AE"},
    {id: 225, name: "United Kingdom", ISO: "GB"},
    {id: 226, name: "United States", ISO: "US"},
    {id: 227, name: "United States Minor Outlying Islands", ISO: "UM"},
    {id: 228, name: "Uruguay", ISO: "UY"},
    {id: 229, name: "Uzbekistan", ISO: "UZ"},
    {id: 230, name: "Vanuatu", ISO: "VU"},
    {id: 231, name: "Venezuela", ISO: "VE"},
    {id: 232, name: "Viet Nam", ISO: "VN"},
    {id: 233, name: "Virgin Islands, British", ISO: "VG"},
    {id: 234, name: "Virgin Islands, U.S.", ISO: "VI"},
    {id: 235, name: "Wallis And Futuna", ISO: "WF"},
    {id: 236, name: "Western Sahara", ISO: "EH"},
    {id: 237, name: "Yemen", ISO: "YE"},
    {id: 238, name: "Zambia", ISO: "ZM"},
    {id: 239, name: "Zimbabwe", ISO: "ZW"}
];

const SelectCountry = ({value, setValue, setCountryId}) => {

    const [open, setOpen] = React.useState(false);
    const [seletedCountryIso, setSeletedCountryIso] = React.useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="w-fit p-2 justify-between relative"
                >

                    {value && seletedCountryIso ? 
                        <img src={`https://flagsapi.com/${seletedCountryIso}/flat/64.png`} alt="" className="w-[25px] cursor-pointer" /> 
                    : (
                        <Icons.addLocation className="h-6 w-6 fill-primary"/>
                    )}

                    {/* {value ? countries.find((country) => country.name === value)?.name : (
                        <>
                            <Icons.mapEmpty className="fill-current w-5 h-5 mr-1" />
                            {"Select country..."}
                        </>
                    )} */}
                    {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search countries..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                        {/* {console.log(value)} */}

                            {countries.map((country) => (
                                    <CommandItem
                                        key={country.name}
                                        value={country.name}
                                        onSelect={(currentValue) => {
                                            console.log(currentValue);
                                            setValue(currentValue === value ? "" : currentValue);
                                            setCountryId(currentValue === value ? "" : country.id);
                                            setSeletedCountryIso(currentValue === value ? "" : country.ISO);
                                            setOpen(false);
                                            // if(currentValue == "") {
                                            //     setCountryError("Country is required!");
                                            // } else {
                                            //     setCountryError("");
                                            // }
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <img src={`https://flagsapi.com/${country.ISO}/flat/64.png`} alt="" className="w-[20px] cursor-pointer mr-2" />
                                        {country.name}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                value === country.name ? "opacity-100" : "opacity-0"
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
