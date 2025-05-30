import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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
  const { topicId } = useParams<{ topicId: string }>();
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
      <div className="flex justify-center mt-10">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!topic) {
    return <div className="text-center mt-10">Topic not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{topic.title}</CardTitle>
          {topic.description && (
            <CardDescription>{topic.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {topic.chapters.map((chapter) => (
              <li key={chapter._id}>{chapter.title}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChapterLists;
