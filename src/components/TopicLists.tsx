import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddTopicButton from "./add-topic-button";
import DeleteTopicButton from "./delete-topic-button";
import AddChapterButton from "./add-chapter-button";
import DeleteChapterButton from "./delete-chapter-button";
import { UserContext } from "@/UserContextProvider";

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
  const user = useContext(UserContext);
  const accesstype = user.user?.accesstype;

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get(
          `https://learn-with-jkp-api.vercel.app/api/topic`
        );
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
      {accesstype === "Administrator" && (
        <div className="flex justify-end mb-4">
          <AddTopicButton />
        </div>
      )}

      <Accordion type="multiple" className="pt-2">
        {topics.map((topic, index) => (
          <div key={topic._id} className="relative group mb-3s">
            <AccordionItem value={`item-${index}`} className="w-full">
              <AccordionTrigger className="text-xl md:text-2xl font-bold text-gray-900 pr-10">
                {topic.title}
              </AccordionTrigger>

              <AccordionContent className="text-sm md:text-md text-gray-700">
                {topic.description && (
                  <p className="mb-4">{topic.description}</p>
                )}

                {topic.attachment?.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2 mb-4">
                    {topic.attachment.map((file, i) => {
                      const fileName = file.split("/").pop();
                      const isPdf = file.endsWith(".pdf");
                      const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
                      const isDoc = /\.(doc|docx)$/i.test(file);
                      const isLink =
                        !isPdf &&
                        !isImage &&
                        !isDoc &&
                        /^https?:\/\//i.test(file);

                      return (
                        <a
                          key={i}
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
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

                {topic.chapters?.length > 0 && (
                  <Accordion type="multiple">
                    {topic.chapters.map((chapter, chapterIndex) => (
                      <div key={chapter._id} className="relative group pl-2">
                        <AccordionItem
                          value={`chapter-${chapterIndex}`}
                          className="w-full"
                        >
                          <AccordionTrigger className="text-base font-semibold text-gray-800 pr-10">
                            {chapter.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            {chapter.description && (
                              <p className="mb-2">{chapter.description}</p>
                            )}

                            {chapter.attachment?.length > 0 && (
                              <div className="grid gap-2 sm:grid-cols-2">
                                {chapter.attachment.map((file, i) => {
                                  const fileName = file.split("/").pop();
                                  const isPdf = file.endsWith(".pdf");
                                  const isImage =
                                    /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
                                  const isDoc = /\.(doc|docx)$/i.test(file);
                                  const isLink =
                                    !isPdf &&
                                    !isImage &&
                                    !isDoc &&
                                    /^https?:\/\//i.test(file);

                                  return (
                                    <a
                                      key={i}
                                      href={file}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
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
                          </AccordionContent>
                        </AccordionItem>

                        {accesstype === "Administrator" && (
                          <div className="absolute top-1 right-0 opacity-100 md:opacity-0 group-hover:md:opacity-100 transition-opacity">
                            <DeleteChapterButton chapterId={chapter._id} />
                          </div>
                        )}
                      </div>
                    ))}
                  </Accordion>
                )}

                {accesstype === "Administrator" && (
                  <div className="mt-6 flex justify-end">
                    <AddChapterButton topicId={topic._id} />
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {accesstype === "Administrator" && (
              <div className="absolute top-1 right-0 opacity-100 md:opacity-0 group-hover:md:opacity-100 transition-opacity">
                <DeleteTopicButton topicId={topic._id} />
              </div>
            )}
          </div>
        ))}
      </Accordion>
    </div>
  );
}

export default TopicLists;
