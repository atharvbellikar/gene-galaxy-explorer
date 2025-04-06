
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Download, ChevronLeft, RotateCcw, Image } from 'lucide-react';
import * as $3Dmol from '3dmol';
import { toast } from 'sonner';

interface MoleculeViewerProps {
  url: string;
  title: string;
  onBack: () => void;
}

const MoleculeViewer: React.FC<MoleculeViewerProps> = ({ url, title, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [styleOption, setStyleOption] = useState('cartoon');
  const [colorOption, setColorOption] = useState('spectrum');

  useEffect(() => {
    let viewer: any;
    let mounted = true;

    const initViewer = async () => {
      if (!containerRef.current) return;

      setLoading(true);

      try {
        // Initialize the 3Dmol.js viewer
        viewer = $3Dmol.createViewer(containerRef.current, {
          backgroundColor: 'black',
          antialias: true,
        });
        
        viewerRef.current = viewer;

        // Fetch and load the molecule data
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch molecule data: ${response.statusText}`);
        }
        
        const moleculeData = await response.text();
        
        // Clear any existing models
        viewer.removeAllModels();
        
        // Load the molecule data
        const model = viewer.addModel(moleculeData, 'pdb');
        
        // Apply initial style
        applyStyle(viewer, model, styleOption, colorOption);
        
        // Zoom to fit the molecule
        viewer.zoomTo();
        
        // Render the scene
        viewer.render();
        
        // Set up rotation animation
        viewer.spin('y', 0.5);
        
        // After a brief spin, stop it
        setTimeout(() => {
          if (mounted && viewer) {
            viewer.spin(false);
            setLoading(false);
          }
        }, 1500);
        
        console.log('3D structure loaded successfully');
        toast.success('3D structure loaded successfully');
      } catch (error) {
        console.error('Error initializing molecule viewer:', error);
        toast.error('Failed to load 3D structure');
        setLoading(false);
      }
    };
    
    initViewer();
    
    return () => {
      mounted = false;
      if (viewer) {
        viewer.spin(false);
      }
    };
  }, [url]);

  const applyStyle = (viewer: any, model: any, style: string, color: string) => {
    if (!model || !viewer) return;
    
    // First, clear styles by removing all existing models and readding the current model
    // Instead of calling model.clear() which doesn't exist
    
    // Apply selected style
    switch (style) {
      case 'cartoon':
        model.setStyle({}, { cartoon: { color: getColorScheme(color) } });
        break;
      case 'sphere':
        model.setStyle({}, { sphere: { color: getColorScheme(color) } });
        break;
      case 'stick':
        model.setStyle({}, { stick: { color: getColorScheme(color) } });
        break;
      case 'line':
        model.setStyle({}, { line: { color: getColorScheme(color) } });
        break;
      case 'surface':
        model.setStyle({}, { cartoon: {} });
        viewer.addSurface($3Dmol.SurfaceType.VDW, { opacity: 0.7, color: getColorScheme(color) }, model);
        break;
      default:
        model.setStyle({}, { cartoon: { color: getColorScheme(color) } });
    }
    
    // Render the changes
    viewer.render();
  };

  const getColorScheme = (scheme: string) => {
    switch (scheme) {
      case 'spectrum':
        return 'spectrum';
      case 'chain':
        return 'chainHetatm';
      case 'secondary':
        return 'sstruc';
      case 'residue':
        return 'residue';
      case 'element':
        return 'elemental';
      default:
        return 'spectrum';
    }
  };

  const handleStyleChange = (value: string) => {
    setStyleOption(value);
    
    if (viewerRef.current) {
      const models = viewerRef.current.getModel();
      if (models) {
        applyStyle(viewerRef.current, models, value, colorOption);
      }
    }
  };

  const handleColorChange = (value: string) => {
    setColorOption(value);
    
    if (viewerRef.current) {
      const models = viewerRef.current.getModel();
      if (models) {
        applyStyle(viewerRef.current, models, styleOption, value);
      }
    }
  };

  const handleReset = () => {
    if (viewerRef.current) {
      viewerRef.current.zoomTo();
      viewerRef.current.rotate(0, 0, 0, 0);
      viewerRef.current.render();
      toast.info('View reset');
    }
  };

  const handleDownload = () => {
    if (viewerRef.current) {
      try {
        // Get the canvas element from the viewer
        const canvas = viewerRef.current.getCanvas();
        const dataUrl = canvas.toDataURL('image/png');
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${title.replace(/\s+/g, '_')}_structure.png`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success('Image downloaded');
      } catch (error) {
        console.error('Error downloading image:', error);
        toast.error('Failed to download image');
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-card/80 backdrop-blur-sm border-b border-border p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div>
            <h2 className="text-sm font-semibold truncate max-w-[300px]" title={title}>{title}</h2>
            <p className="text-xs text-muted-foreground">{url.split('/').pop()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-1">
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset View</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Save Image</span>
          </Button>
        </div>
      </div>
      
      <div className="p-4 flex items-center justify-center gap-4 bg-card/50 border-b border-border">
        <div className="w-full max-w-[200px]">
          <Select value={styleOption} onValueChange={handleStyleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Rendering Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cartoon">Cartoon</SelectItem>
              <SelectItem value="sphere">Sphere</SelectItem>
              <SelectItem value="stick">Stick</SelectItem>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="surface">Surface</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full max-w-[200px]">
          <Select value={colorOption} onValueChange={handleColorChange}>
            <SelectTrigger>
              <SelectValue placeholder="Color Scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spectrum">Spectrum</SelectItem>
              <SelectItem value="chain">Chain</SelectItem>
              <SelectItem value="secondary">Secondary Structure</SelectItem>
              <SelectItem value="residue">Residue</SelectItem>
              <SelectItem value="element">Element</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex-1 relative bg-black">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground">Loading molecule...</p>
            </div>
          </div>
        )}
        
        <div 
          ref={containerRef} 
          className="w-full h-full" 
          style={{ position: 'relative', overflow: 'hidden' }}
        />
      </div>
      
      <div className="p-4 bg-card border-t border-border">
        <p className="text-xs text-muted-foreground">
          Use mouse to rotate, scroll to zoom, and Shift+drag to translate.
        </p>
      </div>
    </div>
  );
};

export default MoleculeViewer;
