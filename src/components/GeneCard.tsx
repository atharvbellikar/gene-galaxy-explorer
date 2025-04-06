
import React from 'react';
import { Gene } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

interface GeneCardProps {
  gene: Gene;
  onClick: () => void;
  isSelected?: boolean;
}

const GeneCard: React.FC<GeneCardProps> = ({ gene, onClick, isSelected = false }) => {
  return (
    <div 
      className={`gene-card cursor-pointer ${
        isSelected 
          ? 'border-primary/60 bg-primary/5 shadow-md shadow-primary/20' 
          : 'hover:border-primary/40'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg text-foreground flex items-center">
            {gene.symbol}
            <span className="ml-2 inline-flex items-center rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {gene.chromosome}
            </span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{gene.name}</p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {gene.type}
        </Badge>
      </div>
      
      <p className="mt-3 text-sm line-clamp-2 text-muted-foreground">
        {gene.description}
      </p>
      
      {gene.diseases && gene.diseases.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {gene.diseases.slice(0, 2).map((disease, i) => (
            <span key={i} className="badge-warning">
              {disease}
            </span>
          ))}
          {gene.diseases.length > 2 && (
            <span className="badge-info">+{gene.diseases.length - 2} more</span>
          )}
        </div>
      )}
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Location: {gene.location}
          </span>
        </div>
        <span className="text-xs flex items-center text-primary hover:underline">
          View details <ArrowUpRight size={12} className="ml-1" />
        </span>
      </div>

      {gene.structures && gene.structures.length > 0 && (
        <div className="mt-2 text-xs text-muted-foreground">
          <span className="badge-info">{gene.structures.length} 3D structure{gene.structures.length > 1 ? 's' : ''}</span>
        </div>
      )}
    </div>
  );
};

export default GeneCard;
