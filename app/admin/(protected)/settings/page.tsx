import { Metadata } from 'next';
import ProfileForm from '@/components/forms/ProfileForm';
import SiteConfigForm from '@/components/forms/SiteConfigForm';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'; // Assuming we'll make a simple Tabs component or use state

export const metadata: Metadata = {
    title: 'Settings | Admin',
};

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold font-display">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your account and site preferences</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="config">Site Configuration</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileForm />
                </TabsContent>

                <TabsContent value="config">
                    <SiteConfigForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
