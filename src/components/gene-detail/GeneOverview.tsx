
import React from 'react';
import { Gene } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface GeneOverviewProps {
  gene: Gene;
}

const GeneOverview: React.FC<GeneOverviewProps> = ({ gene }) => {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="text-sm font-medium mb-2">Description</h3>
      <p className="text-sm text-muted-foreground">{gene.description}</p>
      
      {gene.function && (
        <>
          <Separator className="my-3" />
          <h3 className="text-sm font-medium mb-2">Function</h3>
          <p className="text-sm text-muted-foreground">{gene.function}</p>
        </>
      )}
      
      <Separator className="my-3" />
      <h3 className="text-sm font-medium mb-2">Location</h3>
      <p className="text-sm text-muted-foreground">Chromosome {gene.chromosome}, {gene.location}</p>
      
      {gene.expression && (
        <>
          <Separator className="my-3" />
          <h3 className="text-sm font-medium mb-2">Expression</h3>
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              variant={
                gene.expression.level === 'high' ? 'default' :
                gene.expression.level === 'medium' ? 'secondary' : 'outline'
              }
            >
              {gene.expression.level} expression
            </Badge>
          </div>
          {gene.expression.tissues.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Primary tissues:</p>
              <div className="flex flex-wrap gap-1">
                {gene.expression.tissues.map((tissue, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{tissue}</Badge>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {gene.diseases && gene.diseases.length > 0 && (
        <>
          <Separator className="my-3" />
          <h3 className="text-sm font-medium mb-2">Associated Diseases</h3>
          <div className="flex flex-wrap gap-1">
            {gene.diseases.map((disease, i) => (
              <Badge key={i} variant="destructive">{disease}</Badge>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GeneOverview;
