import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon, File } from "lucide-react";

export default function MediaPicker({ open, onOpenChange, onPick }: { open: boolean; onOpenChange: (v: boolean) => void; onPick: (type: "camera" | "gallery" | "file") => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background/80 backdrop-blur-md border rounded-2xl">
        <DialogHeader>
          <DialogTitle>Choose media</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => onPick("camera")}>
            <Camera />
            <span>Camera</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => onPick("gallery")}>
            <ImageIcon />
            <span>Gallery</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => onPick("file")}>
            <File />
            <span>File</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
