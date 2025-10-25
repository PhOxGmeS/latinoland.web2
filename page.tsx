"use client";

import { useState, useMemo } from 'react';
import { ArkShopHeader } from '@/components/ark-shop-header';
import { ItemCard } from '@/components/item-card';
import { Footer } from '@/components/footer';
import { items as allItems } from '@/lib/items';
import type { Item } from '@/lib/items';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('shop');

  const filteredItems = useMemo(() => {
    let itemsToFilter = allItems;
    if (activeTab === 'shop') {
      itemsToFilter = allItems.filter(item => item.type === 'item');
    } else if (activeTab === 'dinos') {
      itemsToFilter = allItems.filter(item => item.type === 'dino');
    }
    
    if (!searchTerm) return itemsToFilter;

    return itemsToFilter.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'shop':
      case 'dinos':
        return (
          filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item: Item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
             <div className="text-center py-16">
                <h2 className="text-2xl font-semibold">No items found</h2>
                <p className="text-muted-foreground mt-2">Try adjusting your search.</p>
            </div>
          )
        );
      default:
        setActiveTab('shop');
        return null;
    }
  };
  
  const showSearchBar = activeTab === 'shop' || activeTab === 'dinos';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ArkShopHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showSearchBar={showSearchBar}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div>
            {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
