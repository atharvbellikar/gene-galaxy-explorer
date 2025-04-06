
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="border-b border-border bg-card/70 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary p-2 h-10 w-10 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-6 h-6 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a5 5 0 0 0-5 5c0 2.76 2.24 5 5 5s5-2.24 5-5a5 5 0 0 0-5-5zm0 0L2 8l10 14L22 8l-10-6z" />
              <path d="M9 12.5V20M15 12.5V20M12 16v4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Gene Galaxy</h1>
            <p className="text-xs text-muted-foreground">Interactive Genomic Explorer</p>
          </div>
        </div>
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search genes by name, symbol, or description..."
            className="w-full pl-10 pr-4 py-2 bg-background/60 hover:bg-background/80 focus:bg-background"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
