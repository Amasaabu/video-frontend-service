import { VideoCard } from "@/components/card/VideoCard";
import Image from "next/image";
import Section1 from '@/components/section1/section'
export default function Home() {
  const videos = [{title: "This is us", description: "A movie about this is us"}]
  return (
  <>
    <section className="p-[20px]">
      <h2 className="mb-[10px] text-lg">Recently Added</h2>
      <Section1 videos={videos}/>
    </section>

    <section className="p-[20px]">
      <h2 className="mb-[10px] text-lg">Likes</h2>
      <Section1 videos={videos}/>
    </section>

    <section className="p-[20px]">
      <h2 className="mb-[10px] text-lg">Watch List</h2>
      <Section1 videos={videos}/>
    </section>
  
  </>
  );
}
