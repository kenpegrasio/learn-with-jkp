import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/UserContextProvider";
import { toast } from "sonner";
import axios from "axios";

interface MarkCompleteButtonProps {
  chapterId: string;
}

function MarkCompleteButton({ chapterId }: MarkCompleteButtonProps) {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleMarkComplete = async () => {
    const tokenString = sessionStorage.getItem("token");
    if (tokenString === null) {
      toast.warning(
        "No login information found. Please login first before proceeding."
      );
      return;
    }
    setLoading(true);
    const tokenJson = JSON.parse(tokenString);
    try {
      const response = await axios.post(
        "https://learn-with-jkp-api.vercel.app/api/user/userMarkComplete",
        {
          chapter_id: chapterId,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenJson}`,
          },
        }
      );
      setUser(response.data);
      toast.info("Chapter marked as complete");
    } catch (error: any) {
      toast.error(
        `Error marking chapter complete: ${error.response?.data?.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {user?.completed_chapters?.includes(chapterId) ? (
        <Button disabled className="bg-green-500 text-white cursor-not-allowed">
          Completed
        </Button>
      ) : (
        <Button
          onClick={handleMarkComplete}
          disabled={loading}
          className="bg-gray-100 text-black hover:bg-gray-200"
        >
          {loading ? "Marking..." : "Mark as Complete"}
        </Button>
      )}
    </>
  );
}

export default MarkCompleteButton;
