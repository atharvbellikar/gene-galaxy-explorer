
import React, { useState } from 'react';
import { Gene } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, ChevronLeft, Code, Dna, FileText, Library, PanelTop } from 'lucide-react';

interface GeneDetailProps {
  gene: Gene;
  onBack: () => void;
  onViewStructure: (structureUrl: string, title: string) => void;
}

const GeneDetail: React.FC<GeneDetailProps> = ({ gene, onBack, onViewStructure }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="h-full overflow-y-auto">
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
      
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="structures" className="text-xs">Structures</TabsTrigger>
            <TabsTrigger value="genomic" className="text-xs">Genomic Context</TabsTrigger>
            <TabsTrigger value="references" className="text-xs">References</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="structures" className="space-y-4">
            {gene.structures && gene.structures.length > 0 ? (
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
            ) : (
              <div className="text-center py-8 bg-card rounded-lg border">
                <Library className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium">No structures available</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  No 3D protein structures found for this gene
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="genomic" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="references" className="space-y-4">
            {gene.references && gene.references.length > 0 ? (
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
            ) : (
              <div className="text-center py-8 bg-card rounded-lg border">
                <Library className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium">No references available</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  No scientific references found for this gene
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GeneDetail;
