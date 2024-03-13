import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content,  isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async({ slice }: ContentIndexProps): Promise<JSX.Element> => {


    const client = createClient();
    const blogPosts = await client.getAllByType("blog_post");
    const Projects = await client.getAllByType("projects");

    

    const contentType = slice.primary.content_type || "Blog";

    const items = contentType === "Blog" ? blogPosts : Projects;

    

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading>
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="pros prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>)}
      <ContentList items={items} contentType={contentType} viewMoreText={slice.primary.view_more_text}
      fallbackItemImage={slice.primary.fallback_item_image} 
      />
      
    </Bounded>
  );
};

export default ContentIndex;
