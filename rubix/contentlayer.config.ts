import { defineDocumentType, makeSource } from 'contentlayer2/source-files';

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string' },
    date: { type: 'date' },
    body: { type: 'markdown' },
  },
}));

export default makeSource({
  disableImportAliasWarning: true,
  contentDirPath: 'posts',
  documentTypes: [Post],
});
