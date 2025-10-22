import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type LocationType = 'gate' | 'toilet' | 'escalator' | 'checkin' | 'baggage' | 'elevator' | 'cafe' | 'shop';

interface Location {
  id: string;
  name: string;
  type: LocationType;
  x: number;
  y: number;
}

const locations: Location[] = [
  { id: 'g1', name: 'Гейт 1', type: 'gate', x: 15, y: 20 },
  { id: 'g2', name: 'Гейт 2', type: 'gate', x: 25, y: 20 },
  { id: 'g3', name: 'Гейт 3', type: 'gate', x: 35, y: 20 },
  { id: 'g4', name: 'Гейт 4', type: 'gate', x: 45, y: 20 },
  { id: 'g5', name: 'Гейт 5', type: 'gate', x: 55, y: 20 },
  { id: 'g6', name: 'Гейт 6', type: 'gate', x: 65, y: 20 },
  { id: 'g7', name: 'Гейт 7', type: 'gate', x: 75, y: 20 },
  { id: 'g8', name: 'Гейт 8', type: 'gate', x: 85, y: 20 },
  { id: 'g9', name: 'Гейт 9', type: 'gate', x: 15, y: 80 },
  { id: 'g10', name: 'Гейт 10', type: 'gate', x: 25, y: 80 },
  { id: 'g11', name: 'Гейт 11', type: 'gate', x: 35, y: 80 },
  { id: 'g12', name: 'Гейт 12', type: 'gate', x: 45, y: 80 },
  { id: 'g13', name: 'Гейт 13', type: 'gate', x: 55, y: 80 },
  { id: 'g14', name: 'Гейт 14', type: 'gate', x: 65, y: 80 },
  { id: 'g15', name: 'Гейт 15', type: 'gate', x: 75, y: 80 },
  { id: 'g16', name: 'Гейт 16', type: 'gate', x: 85, y: 80 },
  { id: 't1', name: 'Туалет', type: 'toilet', x: 20, y: 50 },
  { id: 't2', name: 'Туалет', type: 'toilet', x: 50, y: 50 },
  { id: 't3', name: 'Туалет', type: 'toilet', x: 80, y: 50 },
  { id: 'e1', name: 'Эскалатор', type: 'escalator', x: 30, y: 50 },
  { id: 'e2', name: 'Эскалатор', type: 'escalator', x: 70, y: 50 },
  { id: 'el1', name: 'Лифт', type: 'elevator', x: 40, y: 50 },
  { id: 'el2', name: 'Лифт', type: 'elevator', x: 60, y: 50 },
  { id: 'c1', name: 'Стойка регистрации A', type: 'checkin', x: 10, y: 50 },
  { id: 'c2', name: 'Стойка регистрации B', type: 'checkin', x: 90, y: 50 },
  { id: 'b1', name: 'Выдача багажа 1', type: 'baggage', x: 25, y: 35 },
  { id: 'b2', name: 'Выдача багажа 2', type: 'baggage', x: 75, y: 35 },
  { id: 'cf1', name: 'Кафе', type: 'cafe', x: 45, y: 35 },
  { id: 'sh1', name: 'Магазин', type: 'shop', x: 55, y: 35 },
];

const locationIcons: Record<LocationType, string> = {
  gate: 'Plane',
  toilet: 'WashingMachine',
  escalator: 'ArrowUpDown',
  checkin: 'ClipboardCheck',
  baggage: 'Luggage',
  elevator: 'ArrowUpDown',
  cafe: 'Coffee',
  shop: 'ShoppingBag',
};

const locationColors: Record<LocationType, string> = {
  gate: 'bg-blue-500',
  toilet: 'bg-purple-400',
  escalator: 'bg-green-400',
  checkin: 'bg-orange-400',
  baggage: 'bg-pink-400',
  elevator: 'bg-teal-400',
  cafe: 'bg-amber-400',
  shop: 'bg-rose-400',
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [routeActive, setRouteActive] = useState(false);

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setRouteActive(false);
  };

  const handleNavigate = () => {
    if (selectedLocation) {
      setRouteActive(true);
    }
  };

  const startLocation = { x: 50, y: 90 };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Plane" size={32} className="text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Навигатор аэропорта
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">Найдите свой путь по терминалу</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Поиск локации</h2>
              <div className="relative mb-4">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Введите гейт или локацию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationSelect(location)}
                    className={`w-full text-left p-3 rounded-lg border transition-all hover:border-primary ${
                      selectedLocation?.id === location.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${locationColors[location.type]} flex items-center justify-center`}>
                        <Icon name={locationIcons[location.type]} size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {location.type === 'gate' && 'Гейт'}
                          {location.type === 'toilet' && 'Туалет'}
                          {location.type === 'escalator' && 'Эскалатор'}
                          {location.type === 'checkin' && 'Регистрация'}
                          {location.type === 'baggage' && 'Багаж'}
                          {location.type === 'elevator' && 'Лифт'}
                          {location.type === 'cafe' && 'Кафе'}
                          {location.type === 'shop' && 'Магазин'}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {selectedLocation && (
              <Card className="p-6 animate-fade-in">
                <h3 className="text-lg font-semibold mb-3">Выбрано</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${locationColors[selectedLocation.type]} flex items-center justify-center`}>
                    <Icon name={locationIcons[selectedLocation.type]} size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{selectedLocation.name}</p>
                    <Badge variant="secondary" className="mt-1">
                      {selectedLocation.type === 'gate' && 'Гейт'}
                      {selectedLocation.type === 'toilet' && 'Туалет'}
                      {selectedLocation.type === 'escalator' && 'Эскалатор'}
                      {selectedLocation.type === 'checkin' && 'Регистрация'}
                      {selectedLocation.type === 'baggage' && 'Багаж'}
                      {selectedLocation.type === 'elevator' && 'Лифт'}
                      {selectedLocation.type === 'cafe' && 'Кафе'}
                      {selectedLocation.type === 'shop' && 'Магазин'}
                    </Badge>
                  </div>
                </div>
                <Button onClick={handleNavigate} className="w-full" size="lg">
                  <Icon name="Navigation" size={20} className="mr-2" />
                  Построить маршрут
                </Button>
              </Card>
            )}
          </div>

          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Карта терминала</h2>
              <div className="flex gap-2">
                <Badge variant="outline" className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  Вы находитесь здесь
                </Badge>
              </div>
            </div>

            <div className="relative w-full aspect-[16/10] bg-accent/30 rounded-xl overflow-hidden border-2 border-border">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <rect x="5" y="15" width="90" height="10" fill="#E8D5C4" opacity="0.6" rx="2" />
                <rect x="5" y="75" width="90" height="10" fill="#E8D5C4" opacity="0.6" rx="2" />
                <rect x="5" y="30" width="90" height="40" fill="#E8D5C4" opacity="0.4" rx="2" />

                {routeActive && selectedLocation && (
                  <line
                    x1={startLocation.x}
                    y1={startLocation.y}
                    x2={selectedLocation.x}
                    y2={selectedLocation.y}
                    stroke="#60A5FA"
                    strokeWidth="0.5"
                    strokeDasharray="2,2"
                    className="animate-pulse"
                  />
                )}

                {locations.map((location) => {
                  const isSelected = selectedLocation?.id === location.id;
                  return (
                    <g
                      key={location.id}
                      onClick={() => handleLocationSelect(location)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      <circle
                        cx={location.x}
                        cy={location.y}
                        r={isSelected ? '2.5' : '1.8'}
                        className={`${
                          isSelected ? locationColors[location.type] : locationColors[location.type]
                        } transition-all`}
                        fill="currentColor"
                        opacity={isSelected ? '1' : '0.8'}
                      />
                      {isSelected && (
                        <circle
                          cx={location.x}
                          cy={location.y}
                          r="3.5"
                          fill="none"
                          stroke="#60A5FA"
                          strokeWidth="0.3"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  );
                })}

                <g>
                  <circle cx={startLocation.x} cy={startLocation.y} r="2" fill="#EF4444" />
                  <circle
                    cx={startLocation.x}
                    cy={startLocation.y}
                    r="3"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="0.3"
                    className="animate-pulse"
                  />
                </g>
              </svg>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(locationIcons).map(([type, iconName]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${locationColors[type as LocationType]} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={iconName} size={16} className="text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground capitalize">
                    {type === 'gate' && 'Гейты'}
                    {type === 'toilet' && 'Туалеты'}
                    {type === 'escalator' && 'Эскалаторы'}
                    {type === 'checkin' && 'Регистрация'}
                    {type === 'baggage' && 'Багаж'}
                    {type === 'elevator' && 'Лифты'}
                    {type === 'cafe' && 'Кафе'}
                    {type === 'shop' && 'Магазины'}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
