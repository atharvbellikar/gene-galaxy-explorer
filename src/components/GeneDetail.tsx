
import React, { useState } from 'react';
import { Gene } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneHeader from '@/components/gene-detail/GeneHeader';
import GeneOverview from '@/components/gene-detail/GeneOverview';
import GeneStructures from '@/components/gene-detail/GeneStructures';
import GeneGenomic from '@/components/gene-detail/GeneGenomic';
import GeneReferences from '@/components/gene-detail/GeneReferences';

interface GeneDetailProps {
  gene: Gene;
  onBack: () => void;
  onViewStructure: (structureUrl: string, title: string) => void;
}

const GeneDetail: React.FC<GeneDetailProps> = ({ gene, onBack, onViewStructure }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="h-full overflow-y-auto">
      <GeneHeader gene={gene} onBack={onBack} />
      
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="structures" className="text-xs">Structures</TabsTrigger>
            <TabsTrigger value="genomic" className="text-xs">Genomic Context</TabsTrigger>
            <TabsTrigger value="references" className="text-xs">References</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <GeneOverview gene={gene} />
          </TabsContent>
          
          <TabsContent value="structures" className="space-y-4">
            <GeneStructures gene={gene} onViewStructure={onViewStructure} />
          </TabsContent>
          
          <TabsContent value="genomic" className="space-y-4">
            <GeneGenomic gene={gene} />
          </TabsContent>
          
          <TabsContent value="references" className="space-y-4">
            <GeneReferences gene={gene} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GeneDetail;
