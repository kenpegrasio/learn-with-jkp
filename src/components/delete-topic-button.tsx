import { useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteTopicButtonProps {
  topicId: string;
}

function DeleteTopicButton({ topicId }: DeleteTopicButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://learn-with-jkp-api.vercel.app/api/topic/${topicId}`
      );
      console.log(res.data);
      let chapters = [];
      for (var chapter of res.data.chapters) {
        chapters.push(chapter._id);
      }
      console.log(chapters);
      await axios.delete(
        `https://learn-with-jkp-api.vercel.app/api/topic/${topicId}`
      );
      for (var chapter of chapters) {
        await axios.delete(
          `https://learn-with-jkp-api.vercel.app/api/chapter/${chapter}`
        );
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
      alert("Failed to delete topic.");
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this topic?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTopicButton;
