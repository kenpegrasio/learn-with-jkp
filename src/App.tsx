import ShortIntro from "./components/ShortIntro";
import TopicLists from "./components/TopicLists";
import SpecialTopicLists from "./components/SpecialTopicLists";
import Layout from "./layout";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function App() {
  return (
    <Layout>
      <ShortIntro />
      <Tabs
        defaultValue="special"
        className="w-full mt-4"
      >
        <div className="flex justify-end mr-10 md:mr-[25%]">
          <TabsList>
            <TabsTrigger value="casual">Casual</TabsTrigger>
            <TabsTrigger value="special">Special</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="casual">
          <TopicLists />
        </TabsContent>
        <TabsContent value="special">
          <SpecialTopicLists />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

export default App;
