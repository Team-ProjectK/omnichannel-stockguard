import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from '../services/knowledge.service';
import { KnowledgeDocument, KnowledgeChunk } from '../models/knowledge.model';

@Component({
  selector: 'app-knowledge-management',
  templateUrl: './knowledge-management.component.html',
  styleUrls: ['./knowledge-management.component.scss']
})
export class KnowledgeManagementComponent implements OnInit {
  documents: KnowledgeDocument[] = [];
  searchResults: KnowledgeChunk[] = [];

  isUploading: boolean = false;
  isSearching: boolean = false;
  searchQuery: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  selectedFile: File | null = null;
  isDragging: boolean = false;

  constructor(private knowledgeService: KnowledgeService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  get totalChunks(): number {
    return this.documents.reduce((acc, doc) => acc + (doc.chunkCount || 0), 0);
  }

  get totalSizeKb(): number {
    return Math.round(this.documents.reduce((acc, doc) => acc + (doc.fileSize || 0), 0) / 1024);
  }

  loadDocuments(): void {
    this.knowledgeService.getAllDocuments().subscribe({
      next: (docs) => {
        this.documents = docs;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedFile = element.files[0];
      this.onUpload();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      this.onUpload();
    }
  }

  onUpload(): void {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.knowledgeService.uploadDocument(this.selectedFile).subscribe({
      next: (doc) => {
        this.successMessage = `Successfully ingested '${doc.filename}' (${doc.chunkCount} RAG chunks created).`;
        this.isUploading = false;
        this.selectedFile = null;
        this.loadDocuments();
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to upload and ingest document.';
        this.isUploading = false;
      }
    });
  }

  onDelete(doc: KnowledgeDocument): void {
    if (confirm(`Are you sure you want to delete '${doc.filename}' and all its RAG chunks?`)) {
      this.knowledgeService.deleteDocument(doc.id).subscribe({
        next: () => {
          this.documents = this.documents.filter(d => d.id !== doc.id);
          this.successMessage = `Deleted '${doc.filename}'.`;
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    }
  }

  onSearch(): void {
    if (!this.searchQuery || !this.searchQuery.trim()) return;

    this.isSearching = true;
    this.searchResults = [];

    this.knowledgeService.searchKnowledge(this.searchQuery.trim()).subscribe({
      next: (chunks) => {
        this.searchResults = chunks;
        this.isSearching = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isSearching = false;
      }
    });
  }
}
