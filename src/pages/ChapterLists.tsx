import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

type Topic = {
  _id: string;
  title: string;
  description?: string;
  attachment: string[];
  chapters: Chapter[];
  createdAt?: string;
  updatedAt?: string;
};

function ChapterLists() {
  const { topicId } = useParams<{ topicId : string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await axios.get(
          `https://learn-with-jkp-api.vercel.app/api/topic/${topicId}`
        );
        setTopic(res.data);
      } catch (err) {
        console.error("Error fetching topic:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [topicId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center mt-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!topic) {
    return (
      <div className="text-center mt-10 text-gray-500">Topic not found.</div>
    );
  }

  return (
    <Layout>
      <div className="w-[80%] sm:w-[60%] mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4">{topic.title}</h1>
        {topic.description && (
          <p className="text-lg text-gray-600 mb-8">{topic.description}</p>
        )}

        <div className="space-y-2">
          {topic.chapters.map((chapter, index) => (
            <Link
              key={chapter._id}
              to={`/chapter/${chapter._id}`}
              className="block border-l-4 border-gray-300 pl-4 hover:bg-gray-100 p-3 rounded transition"
            >
              <h2 className="text-xl font-medium text-gray-800">
                Chapter {index + 1} - {chapter.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ChapterLists;
