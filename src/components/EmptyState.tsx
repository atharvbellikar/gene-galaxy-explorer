
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dna } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Welcome to Gene Galaxy",
  description = "Select a gene from the list to view detailed information and 3D protein structures.",
  action
}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center molecule-bg">
      <div className="animate-pulse-subtle">
        <div className="size-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Dna className="h-10 w-10 text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
