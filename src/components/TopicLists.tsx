import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";
import { useEffect, useState } from "react";

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

function TopicLists() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get(`https://learn-with-jkp-api.vercel.app/api/topic`);
        setTopics(res.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
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
    <div className="w-[80%] md:w-[50%] mx-auto p-6 bg-gray-50 text-gray-900 pt-3 pb-12">
      <Accordion type="multiple">
        {topics.map((topic, index) => (
          <AccordionItem key={topic._id} value={`item-${index}`}>
            <AccordionTrigger className="text-xl md:text-2xl font-bold text-gray-900">
              {topic.title}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-md text-gray-700 mt-2">
              {topic.description && (
                <p className="mb-4">{topic.description}</p>
              )}
              {topic.attachment?.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {topic.attachment.map((file, i) => {
                    const fileName = file.split("/").pop();
                    const isPdf = file.endsWith(".pdf");
                    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
                    const isDoc = /\.(doc|docx)$/i.test(file);

                    return (
                      <a
                        key={i}
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                      >
                        <span className="mr-3 text-xl">
                          {isPdf ? "📄" : isImage ? "🖼️" : isDoc ? "📝" : "📎"}
                        </span>
                        <span className="truncate text-sm text-gray-800">
                          {fileName}
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default TopicLists;
