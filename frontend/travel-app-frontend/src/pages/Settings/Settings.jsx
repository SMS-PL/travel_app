import { useState, useEffect, useContext } from 'react';
import MainContainer from "@/components/MainContainer/MainContainer";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ChangePasswordView from "./ChangePasswordView";
import ChangeEmailView from "./ChangeEmailView";
import ChangeFirstNameView from "./ChangeFirstNameView";
import ChangeLastNameView from "./ChangeLastNameView";
import ChangeUsernameView from "./ChangeUsernameView";

function Settings() {


    return (
        <MainContainer type="settings">
            <p className="text-muted-foreground text-base md:text-lg mt-[-15px] mb-4 md:mb-8 text-center">
                Manage your account settings
            </p>
            <div className="grid gap-6">
                <ChangeUsernameView />
                <ChangeEmailView />
                <ChangeFirstNameView />
                <ChangeLastNameView />
                <ChangePasswordView />
            </div>
        </MainContainer>
    );
}

export default Settings;
