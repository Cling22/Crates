import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Crate {
  id: number;
  name: string;
  image: string;
}

interface Item {
  id: number;
  name: string;
  image: string;
  value: number;
}

const tabs = ['Crates', 'Inventory'];

const exampleCrates: Crate[] = [
  { id: 1, name: 'Starter Crate', image: '/images/starter_crate.png' },
  { id: 2, name: 'Epic Crate', image: '/images/epic_crate.png' },
];

const exampleInventory: Item[] = [
  { id: 1, name: 'Golden Chicken', image: '/images/golden_chicken.png', value: 100 },
  { id: 2, name: 'Diamond Egg', image: '/images/diamond_egg.png', value: 200 },
];

export default function GameMenu() {
  const [activeTab, setActiveTab] = useState<string>('Crates');
  const [money, setMoney] = useState<number>(500);
  const [inventory, setInventory] = useState<Item[]>(exampleInventory);

  const sellItem = (id: number) => {
    const item = inventory.find(i => i.id === id);
    if (item) {
      setMoney(m => m + item.value);
      setInventory(inv => inv.filter(i => i.id !== id));
    }
  };

  const sellAll = () => {
    const total = inventory.reduce((acc, i) => acc + i.value, 0);
    setMoney(m => m + total);
    setInventory([]);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Game</h1>
        <div className="text-xl">Money: ${money}</div>
      </div>

      <div className="flex space-x-2 mb-4">
        {tabs.map(tab => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            variant={activeTab === tab ? 'default' : 'outline'}
          >
            {tab}
          </Button>
        ))}
      </div>

      {activeTab === 'Crates' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {exampleCrates.map(crate => (
            <div key={crate.id} className="border rounded-xl p-4 shadow-md text-center">
              <img src={crate.image} alt={crate.name} className="w-full h-32 object-contain mb-2" />
              <div className="font-medium">{crate.name}</div>
              <Button className="mt-2 w-full">Open</Button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Inventory' && (
        <div>
          <Button onClick={sellAll} className="mb-4">Sell All</Button>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {inventory.map(item => (
              <div key={item.id} className="border rounded-xl p-4 shadow-md text-center">
                <img src={item.image} alt={item.name} className="w-full h-32 object-contain mb-2" />
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500 mb-2">Value: ${item.value}</div>
                <Button onClick={() => sellItem(item.id)} className="w-full">Sell</Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
