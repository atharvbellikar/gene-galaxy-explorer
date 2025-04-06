
import React from 'react';
import { Gene } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Code, Dna, ExternalLink, FileText } from 'lucide-react';

interface GeneHeaderProps {
  gene: Gene;
  onBack: () => void;
}

const GeneHeader: React.FC<GeneHeaderProps> = ({ gene, onBack }) => {
  return (
    <div className="sticky top-0 z-10 p-4 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <div className="flex items-center gap-2">
          <a 
            href={`https://www.ncbi.nlm.nih.gov/gene/?term=${gene.symbol}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            NCBI
          </a>
          <a 
            href={`https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=${gene.id}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            Ensembl
          </a>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{gene.symbol}</h2>
            <p className="text-sm text-muted-foreground mt-1">{gene.name}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Dna className="h-3 w-3" />
              Chr {gene.chromosome}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Code className="h-3 w-3" />
              {gene.type}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {gene.id}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneHeader;
