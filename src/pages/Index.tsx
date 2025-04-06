import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import GeneList from '@/components/GeneList';
import GeneDetail from '@/components/GeneDetail';
import MoleculeViewer from '@/components/MoleculeViewer';
import EmptyState from '@/components/EmptyState';
import DiseasesByRegion from '@/components/DiseasesByRegion';
import { Gene, ViewMode } from '@/lib/types';
import { mockGenes, filterGenes } from '@/lib/gene-data';
import { toast } from 'sonner';

const Index = () => {
  const [genes, setGenes] = useState<Gene[]>(mockGenes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGene, setSelectedGene] = useState<Gene | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [structureData, setStructureData] = useState<{ url: string; title: string } | null>(null);
  
  useEffect(() => {
    const filtered = filterGenes({ search: searchTerm });
    setGenes(filtered);
  }, [searchTerm]);
  
  const handleSelectGene = (gene: Gene) => {
    setSelectedGene(gene);
    setViewMode('detail');
    toast.success(`Selected gene: ${gene.symbol}`);
  };
  
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedGene(null);
  };
  
  const handleBackFromStructure = () => {
    setViewMode('detail');
    setStructureData(null);
  };
  
  const handleViewStructure = (url: string, title: string) => {
    setStructureData({ url, title });
    setViewMode('structure');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background dna-pattern">
      <Header onSearch={setSearchTerm} />
      
      <main className="flex-1 overflow-hidden flex">
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-border p-4 overflow-hidden flex flex-col h-full">
          <h2 className="text-lg font-medium mb-3 text-foreground">Gene Database</h2>
          <GeneList 
            genes={genes} 
            onSelectGene={handleSelectGene}
            selectedGeneId={selectedGene?.id}
          />
        </div>
        
        <div className="hidden md:flex flex-1 h-full overflow-hidden">
          <div className="w-2/3 p-4">
            {viewMode === 'list' && (
              <div className="flex">
                <div className="flex-1">
                  <EmptyState />
                </div>
                <div className="w-1/3 pl-4">
                  <DiseasesByRegion genes={genes} />
                </div>
              </div>
            )}
            
            {viewMode === 'detail' && selectedGene && (
              <div className="flex">
                <div className="flex-1">
                  <GeneDetail 
                    gene={selectedGene} 
                    onBack={handleBackToList}
                    onViewStructure={handleViewStructure}
                  />
                </div>
                <div className="w-1/3 pl-4">
                  <DiseasesByRegion genes={genes} />
                </div>
              </div>
            )}
            
            {viewMode === 'structure' && structureData && (
              <div className="flex">
                <div className="flex-1">
                  <MoleculeViewer
                    url={structureData.url}
                    title={structureData.title}
                    onBack={handleBackFromStructure}
                  />
                </div>
                <div className="w-1/3 pl-4">
                  <DiseasesByRegion genes={genes} />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="block md:hidden flex-1 h-full overflow-hidden">
          {viewMode === 'list' ? (
            <EmptyState />
          ) : viewMode === 'detail' && selectedGene ? (
            <GeneDetail 
              gene={selectedGene} 
              onBack={handleBackToList}
              onViewStructure={handleViewStructure}
            />
          ) : viewMode === 'structure' && structureData ? (
            <MoleculeViewer
              url={structureData.url}
              title={structureData.title}
              onBack={handleBackFromStructure}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
