
// Core data types for the application

export interface Gene {
  id: string;
  symbol: string;
  name: string;
  description: string;
  chromosome: string;
  location: string;
  type: string;
  organism: string;
  function?: string;
  diseases?: string[];
  expression?: {
    level: "high" | "medium" | "low";
    tissues: string[];
  };
  structures?: {
    id: string;
    title: string;
    method: string;
    resolution?: string;
    url: string;
    thumbnail?: string;
  }[];
  references?: {
    id: string;
    title: string;
    authors: string;
    journal: string;
    year: number;
    url?: string;
  }[];
  genomic_context?: {
    start: number;
    end: number;
    strand: "+" | "-";
    exons?: { start: number; end: number }[];
  };
}

export type ExpressionLevel = "high" | "medium" | "low" | "unknown";

export interface StructureFile {
  id: string;
  title: string;
  pdbUrl: string;
  method: string;
  resolution?: string;
}

export interface GeneListFilters {
  search: string;
  chromosome?: string;
  type?: string;
  organism?: string;
}

export type ViewMode = "list" | "detail" | "structure";
