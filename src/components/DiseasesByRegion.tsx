
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Gene } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Globe } from 'lucide-react';

// Regions and their associated colors
const regions = [
  { id: 'north_america', name: 'North America', color: '#4388CC' },
  { id: 'europe', name: 'Europe', color: '#5c7cfa' },
  { id: 'asia', name: 'Asia', color: '#38d9a9' },
  { id: 'africa', name: 'Africa', color: '#ffa94d' },
  { id: 'oceania', name: 'Oceania', color: '#e599f7' },
  { id: 'south_america', name: 'South America', color: '#ff6b6b' },
];

// Type definitions
interface DiseaseCount {
  name: string;
  count: number;
}

interface RegionData {
  id: string;
  name: string;
  color: string;
  diseases: DiseaseCount[];
}

interface DiseasesByRegionProps {
  genes: Gene[];
}

// Function to extract disease data from genes and group by region
// This is a simulation as we don't have real regional data in our gene mock data
const getRegionalDiseaseData = (genes: Gene[]): RegionData[] => {
  // Create a map to count diseases
  const diseaseCounts = new Map<string, Map<string, number>>();
  
  // Initialize region maps
  regions.forEach(region => {
    diseaseCounts.set(region.id, new Map<string, number>());
  });
  
  // Process genes and distribute diseases to regions
  // In a real app, each gene would have region specific disease data
  genes.forEach(gene => {
    if (!gene.diseases || gene.diseases.length === 0) return;
    
    gene.diseases.forEach(disease => {
      // Randomly assign diseases to regions (simulation)
      // In a real app, you would use actual regional data
      const regionIndex = Math.floor(Math.random() * regions.length);
      const regionId = regions[regionIndex].id;
      const regionMap = diseaseCounts.get(regionId);
      
      if (regionMap) {
        const currentCount = regionMap.get(disease) || 0;
        regionMap.set(disease, currentCount + 1);
      }
    });
  });
  
  // Convert to the final format
  return regions.map(region => {
    const diseaseMap = diseaseCounts.get(region.id) || new Map();
    const diseases: DiseaseCount[] = Array.from(diseaseMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Only top 5 diseases per region
    
    return {
      ...region,
      diseases
    };
  });
};

const DiseasesByRegion: React.FC<DiseasesByRegionProps> = ({ genes }) => {
  const regionData = useMemo(() => getRegionalDiseaseData(genes), [genes]);
  
  // Find the region with most disease occurrences for initial tab selection
  const initialRegion = useMemo(() => {
    const regionTotals = regionData.map(region => ({
      id: region.id,
      total: region.diseases.reduce((sum, disease) => sum + disease.count, 0)
    }));
    
    return regionTotals.sort((a, b) => b.total - a.total)[0]?.id || 'north_america';
  }, [regionData]);
  
  return (
    <Card className="col-span-1 h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          <Globe className="inline-block mr-2 h-5 w-5" /> 
          Top Diseases by Region
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Tabs defaultValue={initialRegion} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-4">
            {regions.map(region => (
              <TabsTrigger key={region.id} value={region.id} className="text-xs">
                {region.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {regionData.map(region => (
            <TabsContent key={region.id} value={region.id} className="px-4">
              {region.diseases.length > 0 ? (
                <>
                  <div className="h-[180px] w-full">
                    <ChartContainer 
                      config={{
                        [region.id]: { 
                          color: region.color 
                        }
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={region.diseases}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                          layout="vertical"
                        >
                          <XAxis type="number" hide />
                          <YAxis 
                            type="category" 
                            dataKey="name"
                            width={120}
                            tick={{ fontSize: 11 }}
                          />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent 
                                labelFormatter={(value) => `Disease: ${value}`}
                              />
                            }
                          />
                          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {region.diseases.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={region.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  
                  <div className="mt-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Disease</TableHead>
                          <TableHead className="text-right">Occurrences</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {region.diseases.map((disease) => (
                          <TableRow key={disease.name}>
                            <TableCell>{disease.name}</TableCell>
                            <TableCell className="text-right">{disease.count}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <div className="flex h-[180px] items-center justify-center">
                  <p className="text-muted-foreground">No disease data available</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DiseasesByRegion;
