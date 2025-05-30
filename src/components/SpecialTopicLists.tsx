import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

type Topic = {
  _id: string;
  title: string;
  description?: string;
  attachment: string[];
  chapters: Chapter[];
  createdAt?: string;
  updatedAt?: string;
};

function SpecialTopicLists() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get(
          `https://learn-with-jkp-api.vercel.app/api/topic`
        );
        setTopics(res.data);
      } catch (err) {
        console.error("Error fetching special topics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="mt-5 mx-12 w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-[80%] md:w-[50%] mx-auto flex flex-wrap gap-6 justify-center p-6">
      {topics.map((topic) => (
        <Card
          key={topic._id}
          className="w-full md:w-[45%] aspect-square shadow-md"
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold">{topic.title}</CardTitle>
            {topic.description && (
              <CardDescription>{topic.description}</CardDescription>
            )}

            {topic.attachment?.length > 0 && (
              <div className="grid grid-cols-1 gap-3 -mb-2">
                {topic.attachment.map((file, i) => {
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
                      className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition w-[100%]"
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
          </CardHeader>

          <CardContent>
            <Link to={`/chapters/${topic._id}`}>
              <Button variant="outline" className="mb-3">
                View Chapters
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default SpecialTopicLists;
