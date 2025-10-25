"use client";

import { Search } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ArkShopHeaderProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showSearchBar: boolean;
};

export function ArkShopHeader({ searchTerm, setSearchTerm, activeTab, setActiveTab, showSearchBar }: ArkShopHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <div className="flex items-center space-x-3 self-start sm:self-center">
            <Image src="https://firebasestudio.app/assets/images/templates/latinoland-logo.png" alt="Latinoland Logo" width={48} height={48} className="h-12 w-12" />
            <h1 className="text-2xl font-bold uppercase tracking-wider text-foreground">
              Latinoland
            </h1>
          </div>

          {showSearchBar && (
            <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar / Search..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search for items"
              />
            </div>
          )}
          
          <div className="self-end sm:self-center">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="shop" className="uppercase text-xs tracking-wider px-4">Items</TabsTrigger>
                    <TabsTrigger value="dinos" className="uppercase text-xs tracking-wider px-4">Dinos</TabsTrigger>
                </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </header>
  );
}
