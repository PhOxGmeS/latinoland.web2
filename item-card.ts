"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Item } from '@/lib/items';
import { Badge } from './ui/badge';

type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.command);
    setHasCopied(true);
    alert(`Command Copied: ${item.name}`);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const buttonText = item.type === 'dino' ? 'Copy Buy Command' : 'Copy Sell Command';

  return (
    <Card className="border-border bg-card text-card-foreground flex flex-col">
        <CardHeader className="p-0">
            <div className="relative h-48 w-full">
                <Image
                    src={item.image.imageUrl}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="object-contain w-full h-full"
                    data-ai-hint={item.image.imageHint}
                />
                 {item.price && <Badge variant="destructive" className="absolute top-2 right-2">{item.price} points</Badge>}
            </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
            <CardTitle className="font-semibold text-lg truncate mb-1 text-primary">{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            {item.level && <p className="text-sm text-muted-foreground mt-1">Nivel: {item.level}</p>}
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
            <Button
                variant="secondary"
                onClick={handleCopy}
                aria-label={`Copy command for ${item.name}`}
                className="w-full"
            >
                {hasCopied ? (
                    <>
                        <Check className="h-5 w-5 text-primary" />
                        <span>Copied!</span>
                    </>
                ) : (
                    <>
                        <Copy className="h-5 w-5" />
                        <span>{buttonText}</span>
                    </>
                )}
            </Button>
        </CardFooter>
    </Card>
  );
}
