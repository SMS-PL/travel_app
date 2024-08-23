import { useForm } from "react-hook-form"
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate, Navigate, Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MainContainer from "@/components/MainContainer/MainContainer";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "@/components/icons";
import HoverPopoverInputInfo from "@/components/ui/HoverPopoverInputInfo";

const Register = () => {

    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [emailAvailabilityInfo, setEmailAvailabilityInfo] = useState(null);

    const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: {errors, isValid}
	} = useForm();


    const onSubmit = async (values) => {
        if(isValid) {
			
            try {
                const response = await fetch("http://localhost:5000/api/v1/auth/register", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: values.username,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password,
                        passwordRepeated: values.passwordRepeated,
                    })
                });

                const data = await response.json();

                if(!response.ok) {
                    throw new Error(data.message);
                }

                toast({
                    title: "Hurrah!",
                    description: "Successfully registered!",
                    className: "bg-green-800"
                })

                navigate("/login");
                
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                })
            }
			
		} else {
            console.log("NOT VALID");
        }

    };

    const checkEmailAvailability = (emailValue) => {
        if(emailValue) {
            fetch(`http://localhost:5000/api/v1/auth/email/${emailValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Błąd sieci!');
                }
                return response.json();
            })
            .then(data => {
                if(data.available == true) {
                    setEmailAvailabilityInfo(null);
                } else {
                    setEmailAvailabilityInfo("Email is taken");
                }
            })
            .catch(error => {
                console.log(error.message);
            });
        } else {
            setEmailAvailabilityInfo(null);
        }
    }


    if (isAuthenticated()) {
        // If authenticated user, then redirect to secure dashboard

        return <Navigate to={"/"} replace />;
    } else {
        return (
            <MainContainer type="loginRegister">
                <div className="flex justify-center items-center">
                    <Card className="max-w-full w-[400px] backdrop-blur-[150px]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CardHeader>
                                <CardTitle className="scroll-m-20 text-2xl font-bold tracking-tight">Register</CardTitle>
                                <CardDescription>Provide your details and create an account!</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    {/* USERNAME */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="username" className={cn(errors.username ? "text-red-500" : "text-foreground", "flex flex-row justify-start items-center gap-1")} >
                                            Username
                                            <HoverPopoverInputInfo content={"Username must be between 6 and 16 characters long. Must consist of lowercase letters and may contain numbers (e.g. josh23, emily421 etc)."}/>
                                        </Label>
                                        <Input
                                            id="username"
                                            placeholder="Username"
                                            {...register("username", {
                                                required: "Username is required",
                                                pattern: {
                                                    value: /^[0-9a-z]{6,16}$/,
                                                    message: "Username is not validated",
                                                },
                                            })}
                                            className="m-0"
                                        />
                                        <p className={cn(errors.username == null ? "hidden" : "flex" ,"text-red-500 text-xs h-5")}>{errors.username && errors.username.message}</p>
                                    </div>

                                    {/* FIRST NAME */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="firstName" className={cn(errors.firstName ? "text-red-500" : "text-foreground", "flex flex-row justify-start items-center gap-1")}>
                                            First name
                                            <HoverPopoverInputInfo content={"First name must start with a capital letter and can only consist of letters of the Polish alphabet (e.g. Josh, Emily etc)."}/>
                                        </Label>

                                        <Input
                                            id="firstName"
                                            placeholder="Nowak"
                                            {...register("firstName", {
                                                required: "First name is required",
                                                pattern: {
                                                    value: /^[A-ZŁŚĆŻŹ][a-ząćęłńóśżź]+$/,
                                                    message: "First name is not validated",
                                                },
                                            })}
                                        />
                                        <p className={cn(errors.firstName == null ? "hidden" : "flex" ,"text-red-500 h-5 text-xs")}>{errors.firstName && errors.firstName.message}</p>
                                    </div>

                                    {/* LAST NAME */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="lastName" className={cn(errors.lastName ? "text-red-500" : "text-foreground", "flex flex-row justify-start items-center gap-1")}>
                                            Last name
                                            <HoverPopoverInputInfo content={"Last name must start with a capital letter and can only consist of letters of the Polish alphabet (e.g. Brown, Smith etc)."}/>
                                        </Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Jan"
                                            {...register("lastName", {
                                                required: "Last name is required",
                                                pattern: {
                                                    value: /^[A-ZŁŚĆŻŹ][a-ząćęłńóśżź]+$/,
                                                    message: "Last name is not validated",
                                                },
                                            })}
                                        />
                                        <p className={cn(errors.lastName == null ? "hidden" : "flex" ,"text-red-500 h-5 text-xs")}>{errors.lastName && errors.lastName.message}</p>
                                    </div>
                                    
                                    {/* EMAIL */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email" className={cn(errors.email ? "text-red-500" : "text-foreground")}>
                                            Email
                                        </Label>
                                        <Input 
                                            id="email"
                                            placeholder="example@gmail.com"
                                            onChange={(e) => checkEmailAvailability(e.target.value)}

                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                                                    message: "Email is not validated",
                                                },
                                            })}
                                        />
                                        <p className={cn(emailAvailabilityInfo === null ? "hidden" : "flex" ,"text-red-500 h-2 text-xs")} >{emailAvailabilityInfo !== null && emailAvailabilityInfo}</p>
                                        <p className={cn(errors.email == null ? "hidden" : "flex" ,"text-red-500 h-5 text-xs")} >{errors.email && errors.email.message}</p>

                                    </div>

                                    {/* PASSWORD */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password" className={cn(errors.password ? "text-red-500" : "text-foreground", "flex flex-row justify-start items-center gap-1")}>
                                            Password
                                            <HoverPopoverInputInfo content={"Password must be between 8 and 32 characters long. Must contain upper and lower case letters and at least one number (e.g. J0shBr0wn33, Em11y555 etc)."}/>
                                        </Label>
                                        <Input 
                                            id="password" 
                                            type="password"
                                            placeholder="********"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "Password must have at least 8 characters",
                                                },
                                                maxLength: {
                                                    value: 32,
                                                    message:
                                                        "Password must have at most 32 characters",
                                                },
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}/,
                                                    message: "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number",
                                                },
                                            })}
                                        />
                                        <p className={cn(errors.password == null ? "hidden" : "flex" ,"text-red-500 h-5 text-xs")}>{errors.password && errors.password.message}</p>
                                    </div>

                                    {/* REPEATED PASSWORD */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="passwordRepeated" className={cn(errors.passwordRepeated ? "text-red-500" : "text-foreground")}>Repeated password</Label>
                                        <Input 
                                            id="passwordRepeated" 
                                            type="password"
                                            placeholder="********"
                                            {...register("passwordRepeated", {
                                                required: "Repeated password is required",
                                                validate: value =>value === watch("password") || "The passwords do not match"
                                            })}
                                        />
                                        <p className={cn(errors.passwordRepeated == null ? "hidden" : "flex" ,"text-red-500 h-5 text-xs")}>{errors.passwordRepeated && errors.passwordRepeated.message}</p>
                                    </div>

                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Do you already have an account?
                                        <Link to="/login" className="font-medium text-primary hover:underline dark:text-primary"> Sign in</Link>
                                    </p>
                                </div>
                            </CardContent>

                            <CardFooter className="flex">
                                <Button className="w-full text-white" type="submit" >Register</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </MainContainer>





            // <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            //     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            //         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            //             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            //                 Register your account
            //             </h1>
            //             <form
            //                 className="space-y-4 md:space-y-6"
            //                 onSubmit={handleSubmit(onSubmit)}
            //             >
            //                 <ModeToggle></ModeToggle>
            //                 {/* USERNAME */}
            //                 <div>
            //                     <label
            //                         htmlFor="username"
            //                         className="block mb-2 text-sm font-medium text-le text-gray-900 dark:text-white"
            //                     >
            //                         Username
            //                     </label>
            //                     <input
            //                         type="text"
            //                         name="username"
            //                         id="username"

            //                         {...register("username", {
            //                             required: "Username is required",
            //                             pattern: {
            //                                 value: /^[a-zA-Z0-9]+$/,
            //                                 message: "Username is not validated",
            //                             },
            //                         })}

            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         placeholder="Example"
            //                         required=""
            //                     />
            //                     <p className="text-red-500 h-1">{errors.username && errors.username.message}</p>
            //                 </div>

            //                 {/* FIRST NAME */}
            //                 <div>
            //                     <label
            //                         htmlFor="firstName"
            //                         className="block mb-2 text-sm font-medium text-le text-gray-900 dark:text-white"
            //                     >
            //                         First name
            //                     </label>
            //                     <input
            //                         type="text"
            //                         name="firstName"
            //                         id="firstName"

            //                         {...register("firstName", {
            //                             required: "First name is required",
            //                             pattern: {
            //                                 value: /^[A-ZŁŚĆŻŹ][a-ząćęłńóśżź]+$/,
            //                                 message: "First name is not validated",
            //                             },
            //                         })}

            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         placeholder="Jan"
            //                         required=""
            //                     />
            //                     <p className="text-red-500 h-1">{errors.firstName && errors.firstName.message}</p>
            //                 </div>

            //                 {/* LAST NAME */}
            //                 <div>
            //                     <label
            //                         htmlFor="lastName"
            //                         className="block mb-2 text-sm font-medium text-le text-gray-900 dark:text-white"
            //                     >
            //                         Last name
            //                     </label>
            //                     <input
            //                         type="text"
            //                         name="lastName"
            //                         id="lastName"

            //                         {...register("lastName", {
            //                             required: "Last name is required",
            //                             pattern: {
            //                                 value: /^[A-ZŁŚĆŻŹ][a-ząćęłńóśżź]+$/,
            //                                 message: "Last name is not validated",
            //                             },
            //                         })}

            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         placeholder="Nowak"
            //                         required=""
            //                     />
            //                     <p className="text-red-500 h-1">{errors.lastName && errors.lastName.message}</p>
            //                 </div>
                            
            //                 {/* EMAIL */}
            //                 <div>
            //                     <label
            //                         htmlFor="email"
            //                         className="block mb-2 text-sm font-medium text-le text-gray-900 dark:text-white"
            //                     >
            //                         Email
            //                     </label>
            //                     <input
            //                         type="email"
            //                         name="email"
            //                         id="email"

            //                         {...register("email", {
            //                             required: "Email is required",
            //                             pattern: {
            //                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
            //                                 message: "Email is not validated",
            //                             },
            //                         })}

            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         placeholder="name@company.com"
            //                         required=""
            //                     />
            //                     <p className="text-red-500 h-1">{errors.email && errors.email.message}</p>
            //                 </div>

            //                 {/* PASSWORD */}
            //                 <div>
            //                     <label
            //                         htmlFor="password"
            //                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            //                     >
            //                         Password
            //                     </label>
            //                     <input
            //                         type="password"
            //                         name="password"
            //                         id="password"

            //                         {...register("password", {
            //                             required: "Password is required",
            //                             minLength: {
            //                                 value: 8,
            //                                 message:
            //                                     "Password must have at least 8 characters",
            //                             },
            //                         })}

            //                         placeholder="••••••••"
            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         required=""
            //                     />
            //                     <p className="text-red-500 h-1">{errors.password && errors.password.message}</p>
            //                 </div>

            //                 {/* PASSWORD */}
            //                 <div>
            //                     <label
            //                         htmlFor="passwordRepeated"
            //                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            //                     >
            //                         Repeat Password
            //                     </label>
            //                     <input
            //                         type="password"
            //                         name="passwordRepeated"
            //                         id="passwordRepeated"

            //                         {...register("passwordRepeated", {
            //                             required: "Repeated password is required",
            //                             validate: value =>value === watch("password") || "The passwords do not match"
            //                         })}

            //                         placeholder="••••••••"
            //                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            //                         required=""
            //                     />
            //                     <p className="text-red-500 h-1">{errors.passwordRepeated && errors.passwordRepeated.message}</p>
            //                 </div>

            //                 {/* SUBMIT BUTTON */}
            //                 <button
            //                     type="submit"
            //                     className="w-full mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 py-2 px-6 font-dm text-base font-medium text-white *:transition-transform duration-200 ease-in-out hover:scale-[1.02] "
            //                 >
            //                     Register
            //                 </button>
            //                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            //                     Already have an account?{" "}
            //                     <Link
            //                         to="/login"
            //                         className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            //                     >
            //                         Sign in
            //                     </Link>
            //                 </p>
            //             </form>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default Register;
