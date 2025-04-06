
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import GeneList from '@/components/GeneList';
import GeneDetail from '@/components/GeneDetail';
import MoleculeViewer from '@/components/MoleculeViewer';
import EmptyState from '@/components/EmptyState';
import { Gene, ViewMode } from '@/lib/types';
import { mockGenes, filterGenes } from '@/lib/gene-data';
import { toast } from 'sonner';

const Index = () => {
  const [genes, setGenes] = useState<Gene[]>(mockGenes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGene, setSelectedGene] = useState<Gene | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [structureData, setStructureData] = useState<{ url: string; title: string } | null>(null);
  
  // Handle search
  useEffect(() => {
    const filtered = filterGenes({ search: searchTerm });
    setGenes(filtered);
  }, [searchTerm]);
  
  // Handle gene selection
  const handleSelectGene = (gene: Gene) => {
    setSelectedGene(gene);
    setViewMode('detail');
    toast.success(`Selected gene: ${gene.symbol}`);
  };
  
  // Handle back navigation
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedGene(null);
  };
  
  // Handle back from structure view
  const handleBackFromStructure = () => {
    setViewMode('detail');
    setStructureData(null);
  };
  
  // Handle structure view
  const handleViewStructure = (url: string, title: string) => {
    setStructureData({ url, title });
    setViewMode('structure');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background dna-pattern">
      <Header onSearch={setSearchTerm} />
      
      <main className="flex-1 overflow-hidden flex">
        {/* Sidebar - always visible */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-border p-4 overflow-hidden flex flex-col h-full">
          <h2 className="text-lg font-medium mb-3 text-foreground">Gene Database</h2>
          <GeneList 
            genes={genes} 
            onSelectGene={handleSelectGene}
            selectedGeneId={selectedGene?.id}
          />
        </div>
        
        {/* Main content area */}
        <div className="hidden md:block flex-1 h-full overflow-hidden">
          {viewMode === 'list' && (
            <EmptyState />
          )}
          
          {viewMode === 'detail' && selectedGene && (
            <GeneDetail 
              gene={selectedGene} 
              onBack={handleBackToList}
              onViewStructure={handleViewStructure}
            />
          )}
          
          {viewMode === 'structure' && structureData && (
            <MoleculeViewer
              url={structureData.url}
              title={structureData.title}
              onBack={handleBackFromStructure}
            />
          )}
        </div>
        
        {/* Mobile view logic - different content based on view mode */}
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
