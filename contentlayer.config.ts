import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { visit } from "unist-util-visit";

export const Post = defineDocumentType(() => ({
  name: "Post",
  // filePathPattern: `**/*.md`,
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      () => (tree: any) => {
        visit(tree, "element", (node) => {
          if (node.tagName === "code" && node.data?.meta) {
            node.properties.meta = node.data.meta;
          }
        });
      },
    ],
  },
});
