import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../layout";

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
  const { chapterId } = useParams<{ chapterId: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };

    fetchChapter();
  }, [chapterId]);

  if (loading) {
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
        <div className="text-center mt-10 text-gray-500">Chapter not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4">{chapter.title}</h1>
        {chapter.description && (
          <p className="text-lg text-gray-600 mb-6">{chapter.description}</p>
        )}

        {chapter.attachment?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 -mb-2">
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
      </div>
    </Layout>
  );
}

export default ChapterPage;
