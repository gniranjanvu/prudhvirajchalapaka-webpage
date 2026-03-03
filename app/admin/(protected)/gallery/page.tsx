import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/Card";
import { Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery | Admin",
};

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display">Gallery</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your photo gallery</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-20 text-gray-500">
          <ImageIcon className="w-12 h-12 mb-4 opacity-30" />
          <p className="text-lg font-medium">Gallery coming soon</p>
          <p className="text-sm mt-1">Upload and manage your photos here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
