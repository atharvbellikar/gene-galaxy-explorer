
import React from 'react';
import { Gene } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Library } from 'lucide-react';

interface GeneReferencesProps {
  gene: Gene;
}

const GeneReferences: React.FC<GeneReferencesProps> = ({ gene }) => {
  if (!gene.references || gene.references.length === 0) {
    return (
      <div className="text-center py-8 bg-card rounded-lg border">
        <Library className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <h3 className="text-lg font-medium">No references available</h3>
        <p className="text-sm text-muted-foreground mt-1">
          No scientific references found for this gene
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {gene.references.map((ref) => (
        <div key={ref.id} className="bg-card rounded-lg border p-4">
          <h3 className="text-sm font-medium mb-1">{ref.title}</h3>
          <p className="text-xs text-muted-foreground mb-2">{ref.authors}</p>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{ref.journal}</Badge>
              <span className="text-muted-foreground">{ref.year}</span>
            </div>
            {ref.url && (
              <a 
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                View publication
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneReferences;
