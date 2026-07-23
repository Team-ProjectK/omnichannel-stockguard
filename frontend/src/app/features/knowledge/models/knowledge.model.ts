export interface KnowledgeDocument {
  id: number;
  filename: string;
  fileType: string;
  fileSize: number;
  chunkCount: number;
  uploadedAt: string;
}

export interface KnowledgeChunk {
  id: number;
  documentId: number;
  chunkIndex: number;
  content: string;
  embedding?: string;
  createdAt: string;
}
