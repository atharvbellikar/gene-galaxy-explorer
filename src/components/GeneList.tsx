
import React, { useState } from 'react';
import { Gene } from '@/lib/types';
import GeneCard from './GeneCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDistinctChromosomes, getDistinctGeneTypes } from '@/lib/gene-data';
import { Search, Filter } from 'lucide-react';

interface GeneListProps {
  genes: Gene[];
  onSelectGene: (gene: Gene) => void;
  selectedGeneId?: string;
}

const GeneList: React.FC<GeneListProps> = ({ genes, onSelectGene, selectedGeneId }) => {
  const [filters, setFilters] = useState({
    localSearch: '',
    chromosome: 'all',
    type: 'all'
  });

  const chromosomes = ['all', ...getDistinctChromosomes()];
  const geneTypes = ['all', ...getDistinctGeneTypes()];
  
  const filteredGenes = genes.filter(gene => {
    // Local search filter
    if (filters.localSearch && !gene.symbol.toLowerCase().includes(filters.localSearch.toLowerCase()) &&
        !gene.name.toLowerCase().includes(filters.localSearch.toLowerCase())) {
      return false;
    }
    
    // Chromosome filter
    if (filters.chromosome !== 'all' && gene.chromosome !== filters.chromosome) {
      return false;
    }
    
    // Type filter
    if (filters.type !== 'all' && gene.type !== filters.type) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Filter results..."
            className="w-full pl-10"
            value={filters.localSearch}
            onChange={(e) => setFilters({...filters, localSearch: e.target.value})}
          />
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1">
            <Select
              value={filters.chromosome}
              onValueChange={(value) => setFilters({...filters, chromosome: value})}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chromosome" />
              </SelectTrigger>
              <SelectContent>
                {chromosomes.map((chromosome) => (
                  <SelectItem key={chromosome} value={chromosome}>
                    {chromosome === 'all' ? 'All Chromosomes' : `Chromosome ${chromosome}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Select
              value={filters.type}
              onValueChange={(value) => setFilters({...filters, type: value})}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gene Type" />
              </SelectTrigger>
              <SelectContent>
                {geneTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredGenes.length === 0 ? (
        <div className="text-center py-8">
          <Filter className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <h3 className="text-lg font-medium">No genes found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto h-full pb-4">
          {filteredGenes.map((gene) => (
            <GeneCard
              key={gene.id}
              gene={gene}
              onClick={() => onSelectGene(gene)}
              isSelected={gene.id === selectedGeneId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneList;
