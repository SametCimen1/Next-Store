'use client'


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Session } from "next-auth"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SettingSchema } from "@/types/settings-schema"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { FormError } from "@/components/auth/form-error"
import { FormSuccess } from "@/components/auth/form-sucess"
import { useState } from "react"
import { useAction } from "next-safe-action/hooks"
import { settings } from "@/server/actions/settings"
import { UploadButton } from "@/app/api/uploadthing/upload"


type SettingsForm = {
    session: Session
}

export default function SettingsCard(session : SettingsForm){


    const form = useForm<z.infer<typeof SettingSchema>>({
        resolver: zodResolver(SettingSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: session.session.user?.name || undefined,
            email: session.session.user?.email || undefined,
            image:  session.session.user?.image || undefined,
            isTwoFactorEnabled: session.session.user?.isTwoFactorEnabled || undefined,
        }
    })

    const {execute, status} = useAction(settings, {
        onSuccess: (data) => {
            if(data?.success) setSuccess(data.success)
            if(data?.error) setError(data.error) 
        },
        onError: () => {
            setError('Something went wrong')
        }
    })

    const onSubmit = (values: z.infer<typeof SettingSchema>) => {

        execute(values)
    }

    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [avatarUploading, setAvatarUploading] = useState(false);

    return(
        <Card>
        <CardHeader>
            <CardTitle>Your Settings</CardTitle>
            <CardDescription>Update your account settings</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input disabled={status === 'executing'} placeholder="John Doe" {...field} />
                        </FormControl>

                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Avatar</FormLabel>
                        <div className="flex items-center gap-4">
                            {!form.getValues('image') && (
                                <div className="font-bold">
                                    {session.session.user?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            {form.getValues('image') && (
                                 <Image className="rounded-full" src = {form.getValues('image')!} width={42} height={42} alt = "User Image"/>
                            )}
                            <UploadButton
                                className="scale-75 ut-button:ring-primary  ut-button:bg-primary/75 hover:ut-button:bg-primary/100 ut-button:transition-all ut-button:duration-500 ut-label:hidden ut-allowed-content:hidden"
                                onUploadBegin={() => {
                                    setAvatarUploading(true)
                                }}
                                onUploadError={(error) => {
                                    form.setError('image', {
                                        type:"validate",
                                        message: error.message
                                    })
                                    setAvatarUploading(false)
                                    return;
                                }}
                                onClientUploadComplete={(res) => {
                                    form.setValue('image', res[0].url!);
                                    setAvatarUploading(false);
                                    return;
                                }}
                                endpoint="avatarUploader" content={{button({ready}){
                                if(ready) return <div>Change avatar</div>

                                return <div>Uploading...</div>
                            }}}/>
                        </div>
                        <FormControl>
                            <Input disabled={status === 'executing'} placeholder="John Doe" {...field} type='hidden'/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>password</FormLabel>
                        <FormControl>
                            <Input disabled={status === 'executing' || session.session.user.isOAuth === true} placeholder="********" {...field} />
                        </FormControl>

                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>New password</FormLabel>
                        <FormControl>
                            <Input disabled={status === 'executing' || session.session.user.isOAuth === true} placeholder="********" {...field} />
                        </FormControl>

                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>Enable two factor Authentication for your account</FormDescription>
                        <FormControl>
                           <Switch checked={field.value} onCheckedChange={field.onChange} disabled = {status === 'executing' || session.session.user.isOAuth === true}></Switch>
                        </FormControl>

                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormError message = {error}/>
                    <FormSuccess message = {success}/>
                    <Button type = "submit" disabled = {status === "executing" || avatarUploading}>Update your settings</Button>
                </form>
            </Form>
        </CardContent>
        </Card>

    )
}