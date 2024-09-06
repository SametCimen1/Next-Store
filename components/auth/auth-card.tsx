import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Socials from "./socials";
import { BackButton } from "./back-button";

export const AuthCard = ({
    children,
    cardTitle,
    backButtonHref,
    backButtonLabel,
    showSocials
 }: {
    children: React.ReactNode;
    cardTitle: string;
    backButtonHref: string;
    backButtonLabel: string;
    showSocials?: boolean
 }) => {
    return(
        <Card>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocials && (
                <CardFooter>
                    <Socials />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton href= {backButtonHref} label = {backButtonLabel}/>
            </CardFooter>
        </Card>
    )
}
