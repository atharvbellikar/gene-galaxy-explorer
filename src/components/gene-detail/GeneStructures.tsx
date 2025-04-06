
import React from 'react';
import { Gene } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Library, PanelTop } from 'lucide-react';

interface GeneStructuresProps {
  gene: Gene;
  onViewStructure: (structureUrl: string, title: string) => void;
}

const GeneStructures: React.FC<GeneStructuresProps> = ({ gene, onViewStructure }) => {
  if (!gene.structures || gene.structures.length === 0) {
    return (
      <div className="text-center py-8 bg-card rounded-lg border">
        <Library className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <h3 className="text-lg font-medium">No structures available</h3>
        <p className="text-sm text-muted-foreground mt-1">
          No 3D protein structures found for this gene
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {gene.structures.map((structure) => (
        <div key={structure.id} className="bg-card rounded-lg border overflow-hidden flex flex-col">
          <div className="aspect-video bg-muted relative">
            {structure.thumbnail ? (
              <img 
                src={structure.thumbnail} 
                alt={structure.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <PanelTop className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex items-start justify-between">
              <Badge variant="secondary" className="mb-2">{structure.id}</Badge>
              {structure.resolution && (
                <Badge variant="outline" className="text-xs">Resolution: {structure.resolution}</Badge>
              )}
            </div>
            <h3 className="text-sm font-medium line-clamp-2 mb-1">{structure.title}</h3>
            <p className="text-xs text-muted-foreground mb-3">Method: {structure.method}</p>
            <div className="mt-auto">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => onViewStructure(structure.url, structure.title)}
              >
                View 3D Structure
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneStructures;
