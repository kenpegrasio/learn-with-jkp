import { useEffect, useState } from "react";
import Layout from "../layout";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type Chapter = {
  _id: string;
  title: string;
  description?: string;
  attachment: string[];
  topic_id: string;
  createdAt?: string;
  updatedAt?: string;
};

function FavouriteChapters() {
  const [chapters, setChapters] = useState<Chapter[] | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchFavourite = async () => {
      const tokenString = sessionStorage.getItem("token");
      if (tokenString === null) {
        toast.warning(
          "No login information found. Please login first before proceeding."
        );
        return;
      }
      const tokenJson = JSON.parse(tokenString);
      setLoading(true);
      try {
        const res = await axios.post(
          `https://learn-with-jkp-api.vercel.app/api/user/userInfo`,
          {},
          {
            headers: {
              Authorization: `Bearer ${tokenJson}`,
            },
          }
        );
        let ls: Chapter[] = [];
        for (const chapter_id of res.data.favourite_chapters) {
          const response = await axios.get(
            `https://learn-with-jkp-api.vercel.app/api/chapter/${chapter_id}`
          );
          ls.push(response.data);
        }
        setChapters(ls);
      } catch (error: any) {
        toast.error(
          `Error marking chapter complete: ${error.response?.data?.message}`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchFavourite();
  }, []);

  if (loading) {
      return (
        <Layout>
          <div className="flex justify-center mt-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        </Layout>
      );
    }

  return (
    <Layout>
      <div className="w-[80%] sm:w-[60%] mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4">Favourite Chapters</h1>
        <p className="text-lg text-gray-600 mb-8">
          This is your collection of favourite chapters.
        </p>

        <div className="space-y-2">
          {chapters && chapters.length > 0 ? (
            chapters.map((chapter) => (
              <Link
                key={chapter._id}
                to={`/chapter/${chapter._id}`}
                className="block border-l-4 border-gray-300 pl-4 hover:bg-gray-100 p-3 rounded transition"
              >
                <h2 className="text-xl font-medium text-gray-800">
                  {chapter.title}
                </h2>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No completed chapters found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default FavouriteChapters;
