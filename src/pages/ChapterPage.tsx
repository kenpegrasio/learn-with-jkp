import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../layout";
import MarkCompleteButton from "../components/mark-complete-button";
import { UserContext } from "@/UserContextProvider";
import { toast } from "sonner";
type Chapter = {
  _id: string;
  title: string;
  description?: string;
  attachment: string[];
  topic_id: string;
  createdAt?: string;
  updatedAt?: string;
};

function ChapterPage() {
  const { setUser } = useContext(UserContext);
  const { chapterId } = useParams<{ chapterId: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [chapterLoading, setChapterLoading] = useState(true);

  useEffect(() => {
    const updateUser = async () => {
      try {
        const response = await axios.post(
          "https://learn-with-jkp-api.vercel.app/api/user/userMarkComplete",
          {},
          {
            headers: {
              Authorization: `Bearer ${tokenJson}`,
            },
          }
        );
        setUser(response.data);
      } catch (error: any) {
        toast.error("Unknown error occured");
      }
    };
    const tokenString = sessionStorage.getItem("token");
    if (tokenString === null) {
      setUserLoading(false);
      return;
    }
    setUserLoading(true);
    const tokenJson = JSON.parse(tokenString);
    updateUser();
    setUserLoading(false);
  }, []);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await axios.get(
          `https://learn-with-jkp-api.vercel.app/api/chapter/${chapterId}`
        );
        setChapter(res.data);
      } catch (err) {
        console.error("Error fetching chapter:", err);
      } finally {
        setChapterLoading(false);
      }
    };

    fetchChapter();
  }, [chapterId]);

  if (chapterLoading || userLoading) {
    return (
      <Layout>
        <div className="flex justify-center mt-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!chapter) {
    return (
      <Layout>
        <div className="text-center mt-10 text-gray-500">
          Chapter not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 px-6 relative">
        <h1 className="text-4xl font-bold mb-4">{chapter.title}</h1>
        {chapter.description && (
          <p className="text-lg text-gray-600 mb-6">{chapter.description}</p>
        )}

        {chapter.attachment?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {chapter.attachment.map((file, i) => {
              const fileName = file.split("/").pop();
              const isPdf = file.endsWith(".pdf");
              const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
              const isDoc = /\.(doc|docx)$/i.test(file);
              const isLink =
                !isPdf && !isImage && !isDoc && /^https?:\/\//i.test(file);

              return (
                <a
                  key={i}
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition w-full"
                >
                  <span className="mr-3 text-xl">
                    {isPdf
                      ? "📄"
                      : isImage
                      ? "🖼️"
                      : isDoc
                      ? "📝"
                      : isLink
                      ? "🔗"
                      : "📎"}
                  </span>
                  <span className="truncate text-sm text-gray-800">
                    {fileName || file}
                  </span>
                </a>
              );
            })}
          </div>
        )}
        <div className="flex justify-center">
          <MarkCompleteButton chapterId={chapter._id} />
        </div>
      </div>
    </Layout>
  );
}

export default ChapterPage;
