
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, FileText, Globe, Trash2, User, KeyRound, Mail, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";
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
} from "@/components/ui/alert-dialog"


export default function SettingsPage() {
  return (
    <div className="space-y-12">
        <header>
            <h1 className="font-headline text-4xl font-bold tracking-tight">Settings</h1>
            <p className="mt-2 text-lg text-muted-foreground">Manage your account and preferences.</p>
        </header>

        <Card>
            <CardHeader>
                <CardTitle>Artisan Status</CardTitle>
                <CardDescription>Toggle this if you are an artisan to access seller features.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                    <div className="flex items-center space-x-2">
                        <Switch id="artisan-mode" />
                        <Label htmlFor="artisan-mode" className="text-base font-medium">Are you an Artisan?</Label>
                    </div>
                     <Button variant="outline" asChild>
                        <Link href="/dashboard">Go to Dashboard <ExternalLink className="ml-2"/></Link>
                    </Button>
                </div>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <h2 className="text-2xl font-bold font-headline">Profile</h2>
                <p className="text-muted-foreground">This information will be displayed publicly so be careful what you share.</p>
            </div>
            <div className="md:col-span-2">
                 <Card>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Priya Sharma" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="priya.sharma@example.com" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                        </div>
                        <Button>Save Changes</Button>
                        <Separator />
                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Button variant="outline">Change Password</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        <Separator />

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <h2 className="text-2xl font-bold font-headline">General</h2>
                <p className="text-muted-foreground">Manage your language, currency, and notification settings.</p>
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select defaultValue="en">
                                <SelectTrigger id="language">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                                    <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                             <Select defaultValue="inr">
                                <SelectTrigger id="currency">
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="inr">INR (₹)</SelectItem>
                                    <SelectItem value="usd">USD ($)</SelectItem>
                                    <SelectItem value="eur">EUR (€)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                         <div className="space-y-4">
                            <Label>Notifications</Label>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="order-updates" className="font-normal">Order Updates</Label>
                                    <Switch id="order-updates" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="festival-alerts" className="font-normal">Festival Alerts</Label>
                                    <Switch id="festival-alerts" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="artisan-messages" className="font-normal">Artisan Messages</Label>
                                    <Switch id="artisan-messages" defaultChecked />
                                </div>
                                 <div className="flex items-center justify-between">
                                    <Label htmlFor="promotional-emails" className="font-normal">Promotional Emails</Label>
                                    <Switch id="promotional-emails" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

         <Separator />

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <h2 className="text-2xl font-bold font-headline">Linked Accounts</h2>
                <p className="text-muted-foreground">Connect your social media accounts for faster login.</p>
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardContent className="p-6 grid sm:grid-cols-2 gap-4">
                       <Button variant="outline" className="w-full">
                           <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 3.08-5.54 3.08-4.53 0-8.28-3.72-8.28-8.28s3.75-8.28 8.28-8.28c2.48 0 4.02 1 4.9 1.9l2.7-2.7C18.96 2.37 16.2 1 12.48 1 5.88 1 1 5.93 1 12.5s4.88 11.5 11.48 11.5c6.9 0 11.1-4.7 11.1-11.28 0-.78-.08-1.48-.19-2.18h-11z"/></svg>
                           Link Google Account
                       </Button>
                       <Button variant="outline" className="w-full">
                            <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.494v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.324C24 .593 23.407 0 22.676 0z"/></svg>
                           Link Facebook Account
                       </Button>
                    </CardContent>
                </Card>
            </div>
        </div>

        <Separator />
        
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <h2 className="text-2xl font-bold font-headline">Privacy & Security</h2>
                <p className="text-muted-foreground">Manage your data and account security.</p>
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <Button variant="link" className="p-0 h-auto" asChild>
                            <Link href="#">Privacy Policy</Link>
                        </Button>
                        <br/>
                         <Button variant="link" className="p-0 h-auto" asChild>
                            <Link href="#">Terms of Service</Link>
                        </Button>
                         <Separator className="my-6"/>
                        
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                               <Button variant="destructive">
                                    <Trash2 className="mr-2"/> Delete My Account
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <p className="text-sm text-muted-foreground">This action is irreversible. Please be certain.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
