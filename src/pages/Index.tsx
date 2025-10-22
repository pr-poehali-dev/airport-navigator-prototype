import { useState, useMemo } from 'react';
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

interface RoutePoint {
  x: number;
  y: number;
  location?: Location;
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
  gate: '#3B82F6',
  toilet: '#A78BFA',
  escalator: '#4ADE80',
  checkin: '#FB923C',
  baggage: '#F472B6',
  elevator: '#2DD4BF',
  cafe: '#FBBF24',
  shop: '#FB7185',
};

const locationColorsBg: Record<LocationType, string> = {
  gate: 'bg-blue-500',
  toilet: 'bg-purple-400',
  escalator: 'bg-green-400',
  checkin: 'bg-orange-400',
  baggage: 'bg-pink-400',
  elevator: 'bg-teal-400',
  cafe: 'bg-amber-400',
  shop: 'bg-rose-400',
};

const getLocationIcon = (type: LocationType) => {
  const iconPaths: Record<LocationType, string> = {
    gate: 'M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z',
    toilet: 'M9 11V9c0-1.1.9-2 2-2s2 .9 2 2v2m-4 4h4m-8 4h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z',
    escalator: 'M12 5v14m-5-7l5 5 5-5',
    checkin: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4',
    baggage: 'M8 7h8m-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7m-8 0H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2',
    elevator: 'M12 5v14m-5-7l5-5 5 5',
    cafe: 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z',
    shop: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zm0 0h12m-6 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
  };
  return iconPaths[type];
};

const calculateRoute = (start: RoutePoint, end: Location): RoutePoint[] => {
  const route: RoutePoint[] = [{ ...start, location: { id: 'start', name: 'Вход', type: 'checkin', x: start.x, y: start.y } }];
  
  if (end.y === 20) {
    if (start.y !== 50) {
      route.push({ x: start.x, y: 65, location: { id: 'c1-point', name: 'Коридор 1 этажа', type: 'elevator', x: start.x, y: 65 } });
      route.push({ x: start.x, y: 50, location: { id: 'main-c', name: 'Главный коридор', type: 'elevator', x: start.x, y: 50 } });
    }
    
    const escalator = end.x <= 50 ? locations.find(l => l.id === 'e1')! : locations.find(l => l.id === 'e2')!;
    
    if (start.x !== escalator.x) {
      const midX = start.x < escalator.x ? (start.x + escalator.x) / 2 : (escalator.x + start.x) / 2;
      route.push({ x: midX, y: 50, location: { id: 'mid-corr', name: 'Переход', type: 'elevator', x: midX, y: 50 } });
    }
    
    route.push({ x: escalator.x, y: 50, location: escalator });
    route.push({ x: escalator.x, y: 35, location: { id: 'esc-mid', name: 'Верхний переход', type: 'elevator', x: escalator.x, y: 35 } });
    route.push({ x: escalator.x, y: 20, location: { id: 'top-corr', name: 'Коридор 2 этажа', type: 'elevator', x: escalator.x, y: 20 } });
    
    if (escalator.x !== end.x) {
      const midTopX = escalator.x < end.x ? (escalator.x + end.x) / 2 : (end.x + escalator.x) / 2;
      route.push({ x: midTopX, y: 20, location: { id: 'top-mid', name: 'Переход', type: 'elevator', x: midTopX, y: 20 } });
    }
    
    route.push({ x: end.x, y: 20, location: end });
  } else if (end.y === 80) {
    if (start.y !== 80) {
      route.push({ x: start.x, y: 75, location: { id: 'corr-near', name: 'Коридор', type: 'elevator', x: start.x, y: 75 } });
    }
    
    if (start.x !== end.x) {
      const midBottomX = (start.x + end.x) / 2;
      route.push({ x: midBottomX, y: 80, location: { id: 'bottom-mid', name: 'Переход', type: 'elevator', x: midBottomX, y: 80 } });
    }
    
    route.push({ x: end.x, y: end.y, location: end });
  } else if (end.y === 35) {
    if (start.y !== 50) {
      route.push({ x: start.x, y: 65, location: { id: 'c2-point', name: 'Коридор', type: 'elevator', x: start.x, y: 65 } });
      route.push({ x: start.x, y: 50, location: { id: 'main-c2', name: 'Главный коридор', type: 'elevator', x: start.x, y: 50 } });
    }
    
    if (start.x !== end.x) {
      const midMezzX = (start.x + end.x) / 2;
      route.push({ x: midMezzX, y: 50, location: { id: 'mezz-mid', name: 'Переход', type: 'elevator', x: midMezzX, y: 50 } });
    }
    
    route.push({ x: end.x, y: 50, location: { id: 'turn-mezz', name: 'Поворот', type: 'elevator', x: end.x, y: 50 } });
    route.push({ x: end.x, y: 42, location: { id: 'stairs-mezz', name: 'Лестница', type: 'escalator', x: end.x, y: 42 } });
    route.push({ x: end.x, y: 35, location: end });
  } else {
    if (start.y !== 50) {
      route.push({ x: start.x, y: 65, location: { id: 'c3-point', name: 'Коридор', type: 'elevator', x: start.x, y: 65 } });
      route.push({ x: start.x, y: 50, location: { id: 'main-c3', name: 'Главный коридор', type: 'elevator', x: start.x, y: 50 } });
    }
    
    if (start.x !== end.x) {
      const midMainX = (start.x + end.x) / 2;
      route.push({ x: midMainX, y: 50, location: { id: 'main-mid', name: 'Переход', type: 'elevator', x: midMainX, y: 50 } });
    }
    
    route.push({ x: end.x, y: 50, location: end });
  }
  
  return route;
};

const calculateDistance = (route: RoutePoint[]): number => {
  let distance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const dx = route[i + 1].x - route[i].x;
    const dy = route[i + 1].y - route[i].y;
    distance += Math.sqrt(dx * dx + dy * dy);
  }
  return Math.round(distance * 2);
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

  const route = useMemo(() => {
    if (selectedLocation && routeActive) {
      return calculateRoute(startLocation, selectedLocation);
    }
    return [];
  }, [selectedLocation, routeActive]);

  const distance = useMemo(() => {
    if (route.length > 0) {
      return calculateDistance(route);
    }
    return 0;
  }, [route]);

  const walkingTime = Math.ceil(distance / 80 * 60);

  const generateInstructions = (routePoints: RoutePoint[]): string[] => {
    const instructions: string[] = [];
    
    for (let i = 0; i < routePoints.length - 1; i++) {
      const current = routePoints[i];
      const next = routePoints[i + 1];
      
      if (!next.location) continue;
      
      const dx = next.x - current.x;
      const dy = next.y - current.y;
      const dist = Math.round(Math.sqrt(dx * dx + dy * dy) * 2);
      
      let direction = '';
      if (Math.abs(dx) > Math.abs(dy)) {
        direction = dx > 0 ? 'направо' : 'налево';
      } else {
        direction = dy > 0 ? 'вниз' : 'вверх';
      }
      
      if (next.location.type === 'escalator') {
        instructions.push(`Поднимитесь на эскалаторе`);
      } else if (next.location.type === 'elevator' && next.location.name.includes('Коридор')) {
        instructions.push(`Идите по коридору ${direction} (${dist} м)`);
      } else if (next.location.name.includes('Переход')) {
        instructions.push(`Следуйте ${direction} по переходу (${dist} м)`);
      } else if (next.location.name.includes('Поворот')) {
        instructions.push(`Поверните ${direction}`);
      } else if (next.location.name.includes('Лестница')) {
        instructions.push(`Спуститесь по лестнице`);
      } else if (i === routePoints.length - 2) {
        instructions.push(`Вы прибыли в точку назначения: ${next.location.name}`);
      } else {
        instructions.push(`Направляйтесь к точке «${next.location.name}» (${dist} м)`);
      }
    }
    
    return instructions;
  };

  const instructions = useMemo(() => {
    if (route.length > 0 && routeActive) {
      return generateInstructions(route);
    }
    return [];
  }, [route, routeActive]);

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
                      <div className={`w-10 h-10 rounded-full ${locationColorsBg[location.type]} flex items-center justify-center`}>
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
                  <div className={`w-12 h-12 rounded-full ${locationColorsBg[selectedLocation.type]} flex items-center justify-center`}>
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
                
                {routeActive && distance > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-accent/50 rounded-lg">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Icon name="Footprints" size={16} className="text-primary" />
                        <p className="text-xs text-muted-foreground">Расстояние</p>
                      </div>
                      <p className="text-xl font-bold text-foreground">{distance} м</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <p className="text-xs text-muted-foreground">Время</p>
                      </div>
                      <p className="text-xl font-bold text-foreground">{walkingTime} мин</p>
                    </div>
                  </div>
                )}
                
                <Button onClick={handleNavigate} className="w-full" size="lg">
                  <Icon name="Navigation" size={20} className="mr-2" />
                  {routeActive ? 'Пересчитать маршрут' : 'Построить маршрут'}
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
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="0.2" stdDeviation="0.3" floodOpacity="0.3" />
                  </filter>
                </defs>

                <rect x="5" y="15" width="90" height="10" fill="#E8D5C4" opacity="0.6" rx="2" />
                <rect x="5" y="75" width="90" height="10" fill="#E8D5C4" opacity="0.6" rx="2" />
                <rect x="5" y="30" width="90" height="40" fill="#E8D5C4" opacity="0.4" rx="2" />

                {routeActive && route.length > 0 && (
                  <>
                    {route.map((point, index) => {
                      if (index === route.length - 1) return null;
                      const nextPoint = route[index + 1];
                      return (
                        <g key={`route-${index}`}>
                          <line
                            x1={point.x}
                            y1={point.y}
                            x2={nextPoint.x}
                            y2={nextPoint.y}
                            stroke="#60A5FA"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            opacity="0.8"
                          />
                          <line
                            x1={point.x}
                            y1={point.y}
                            x2={nextPoint.x}
                            y2={nextPoint.y}
                            stroke="#3B82F6"
                            strokeWidth="0.4"
                            strokeLinecap="round"
                            strokeDasharray="1,1"
                            className="animate-pulse"
                          />
                        </g>
                      );
                    })}
                    
                    {route.map((point, index) => {
                      if (index === 0 || !point.location) return null;
                      const isEndPoint = index === route.length - 1;
                      const isTransitPoint = point.location.type === 'escalator' || point.location.type === 'elevator';
                      
                      return (
                        <g key={`waypoint-${index}`}>
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r={isEndPoint ? "3.5" : isTransitPoint ? "2.5" : "1.8"}
                            fill={isEndPoint ? "#3B82F6" : isTransitPoint ? "#60A5FA" : "#93C5FD"}
                            filter="url(#shadow)"
                            opacity="0.9"
                          />
                          {isTransitPoint && (
                            <g transform={`translate(${point.x - 0.8}, ${point.y - 0.8}) scale(0.08)`}>
                              <path
                                d={getLocationIcon(point.location.type)}
                                fill="white"
                                stroke="white"
                                strokeWidth="0.5"
                              />
                            </g>
                          )}
                          <text
                            x={point.x}
                            y={point.y - 4}
                            fontSize="2.5"
                            fill="#1E40AF"
                            textAnchor="middle"
                            fontWeight="600"
                            opacity="0.9"
                          >
                            {point.location.name}
                          </text>
                        </g>
                      );
                    })}
                  </>
                )}

                {locations.map((location) => {
                  const isSelected = selectedLocation?.id === location.id;
                  return (
                    <g
                      key={location.id}
                      onClick={() => handleLocationSelect(location)}
                      className="cursor-pointer"
                      style={{ transition: 'all 0.3s' }}
                    >
                      <circle
                        cx={location.x}
                        cy={location.y}
                        r={isSelected ? '3.5' : '2.8'}
                        fill={locationColors[location.type]}
                        opacity="0.9"
                        filter="url(#shadow)"
                      />
                      <g transform={`translate(${location.x - 1}, ${location.y - 1}) scale(${isSelected ? 0.12 : 0.09})`}>
                        <path
                          d={getLocationIcon(location.type)}
                          fill="white"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </g>
                      {isSelected && (
                        <circle
                          cx={location.x}
                          cy={location.y}
                          r="4.5"
                          fill="none"
                          stroke="#60A5FA"
                          strokeWidth="0.4"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  );
                })}

                <g>
                  <circle cx={startLocation.x} cy={startLocation.y} r="2.5" fill="#EF4444" filter="url(#shadow)" />
                  <circle
                    cx={startLocation.x}
                    cy={startLocation.y}
                    r="4"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="0.4"
                    className="animate-pulse"
                  />
                  <text x={startLocation.x} y={startLocation.y + 6} fontSize="3" fill="#EF4444" textAnchor="middle" fontWeight="bold">ВЫ</text>
                </g>
              </svg>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(locationIcons).map(([type, iconName]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${locationColorsBg[type as LocationType]} flex items-center justify-center flex-shrink-0`}>
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

            {routeActive && instructions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="List" size={20} className="text-primary" />
                  Пошаговые инструкции
                </h3>
                <div className="space-y-3">
                  {instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-3 bg-accent/30 rounded-lg border border-border hover:border-primary/50 transition-all"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <p className="flex-1 text-sm text-foreground pt-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;