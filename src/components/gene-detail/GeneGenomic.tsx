
import React from 'react';
import { Gene } from '@/lib/types';

interface GeneGenomicProps {
  gene: Gene;
}

const GeneGenomic: React.FC<GeneGenomicProps> = ({ gene }) => {
  return (
    <div className="bg-card rounded-lg border p-4">
      {gene.genomic_context ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="stat-block">
              <span className="stat-label">Start Position</span>
              <span className="stat-value">{gene.genomic_context.start.toLocaleString()}</span>
            </div>
            <div className="stat-block">
              <span className="stat-label">End Position</span>
              <span className="stat-value">{gene.genomic_context.end.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="stat-block flex-1">
              <span className="stat-label">Strand</span>
              <span className="stat-value">{gene.genomic_context.strand}</span>
            </div>
            <div className="stat-block flex-1">
              <span className="stat-label">Length</span>
              <span className="stat-value">
                {(gene.genomic_context.end - gene.genomic_context.start + 1).toLocaleString()} bp
              </span>
            </div>
          </div>
          
          {gene.genomic_context.exons && gene.genomic_context.exons.length > 0 && (
            <>
              <h3 className="text-sm font-medium mb-2">Exon Structure</h3>
              <div className="overflow-x-auto">
                <div className="w-full h-24 bg-secondary/30 rounded-md relative p-2">
                  {/* Genomic context visualization would go here - simplified for now */}
                  <div className="absolute h-4 top-1/2 left-0 right-0 -translate-y-1/2 bg-secondary/50 rounded-full"></div>
                  {gene.genomic_context.exons.map((exon, i) => {
                    const startPos = gene.genomic_context?.start || 0;
                    const endPos = gene.genomic_context?.end || 0;
                    const totalLength = endPos - startPos;
                    
                    // Calculate position as percentage of total length
                    const leftPos = ((exon.start - startPos) / totalLength) * 100;
                    const width = ((exon.end - exon.start) / totalLength) * 100;
                    
                    return (
                      <div 
                        key={i}
                        className="absolute h-8 bg-primary/80 rounded-md"
                        style={{
                          left: `${leftPos}%`,
                          width: `${Math.max(0.5, width)}%`,
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                        title={`Exon ${i+1}: ${exon.start.toLocaleString()}-${exon.end.toLocaleString()}`}
                      ></div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">
                  This gene has {gene.genomic_context.exons.length} exons
                </p>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground">
            No genomic context information available
          </p>
        </div>
      )}
    </div>
  );
};

export default GeneGenomic;
