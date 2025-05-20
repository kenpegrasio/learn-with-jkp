import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddChapterButtonProps {
  topicId: string;
}

function AddChapterButton({ topicId }: AddChapterButtonProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    attachment: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.title) return alert("Title is required");
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        attachment: form.attachment
          .split(",")
          .map((s) => s.trim())
          .filter((item) => item !== ""),
        topic_id: topicId
      };

      console.log(payload);
      const res = await axios.post(
        "https://learn-with-jkp-api.vercel.app/api/chapter",
        payload
      );
      console.log("Chapter created:", res.data);
      setOpen(false);
      setForm({ title: "", description: "", attachment: "" });
    } catch (err) {
      console.error("Failed to add chapter:", err);
      alert("Failed to add chapter.");
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Chapter</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Create a New Chapter</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="mb-2">
              Title*
            </Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="mb-2">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="attachment" className="mb-2">
              Attachments (comma-separated URLs)
            </Label>
            <Input
              id="attachment"
              name="attachment"
              value={form.attachment}
              onChange={handleChange}
              placeholder="https://example.com/file1, https://example.com/file2"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddChapterButton;
