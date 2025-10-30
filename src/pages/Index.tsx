import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Creature {
  id: number;
  name: string;
  description: string;
  habitat: string;
  icon: string;
  facts: string[];
}

const oceanCreatures = {
  surface: [
    {
      id: 1,
      name: 'Дельфин',
      description: 'Умные и социальные морские млекопитающие, известные своим дружелюбием к человеку.',
      habitat: 'Поверхностный слой (0-200м)',
      icon: '🐬',
      facts: ['Используют эхолокацию', 'Спят с открытым глазом', 'Могут нырять на 300м']
    },
    {
      id: 2,
      name: 'Морская черепаха',
      description: 'Древние рептилии, которые путешествуют тысячи километров через океаны.',
      habitat: 'Поверхностный слой (0-200м)',
      icon: '🐢',
      facts: ['Живут до 100 лет', 'Возвращаются на родной пляж', 'Питаются медузами']
    },
    {
      id: 3,
      name: 'Скат манта',
      description: 'Гигантские грациозные скаты с размахом крыльев до 7 метров.',
      habitat: 'Поверхностный слой (0-200м)',
      icon: '🦈',
      facts: ['Фильтруют планктон', 'Самые умные рыбы', 'Вес до 2 тонн']
    }
  ],
  mid: [
    {
      id: 4,
      name: 'Кашалот',
      description: 'Самые глубоководные ныряльщики среди млекопитающих.',
      habitat: 'Средняя глубина (200-1000м)',
      icon: '🐋',
      facts: ['Ныряют на 2000м', 'Задерживают дыхание на 90 минут', 'Охотятся на гигантских кальмаров']
    },
    {
      id: 5,
      name: 'Тунец',
      description: 'Быстрые хищники, способные развивать скорость до 75 км/ч.',
      habitat: 'Средняя глубина (200-1000м)',
      icon: '🐟',
      facts: ['Температура тела выше воды', 'Мигрируют через океаны', 'Плавают всю жизнь']
    },
    {
      id: 6,
      name: 'Рыба-меч',
      description: 'Хищник с характерным длинным острым выростом.',
      habitat: 'Средняя глубина (200-1000м)',
      icon: '🗡️',
      facts: ['Скорость до 100 км/ч', 'Меч длиной 1.5м', 'Охотятся на кальмаров']
    }
  ],
  deep: [
    {
      id: 7,
      name: 'Гигантский кальмар',
      description: 'Загадочные существа из глубин, достигающие 13 метров в длину.',
      habitat: 'Глубоководный мир (1000м+)',
      icon: '🦑',
      facts: ['Самые большие глаза в мире', 'Живут на глубине 1000м', 'Сражаются с кашалотами']
    },
    {
      id: 8,
      name: 'Удильщик',
      description: 'Биолюминесцентная рыба с "фонариком" для приманки добычи.',
      habitat: 'Глубоководный мир (1000м+)',
      icon: '🐡',
      facts: ['Светятся в темноте', 'Самцы в 10 раз меньше самок', 'Живут на 2000м']
    },
    {
      id: 9,
      name: 'Гигантский изопод',
      description: 'Древние ракообразные размером с футбольный мяч.',
      habitat: 'Глубоководный мир (1000м+)',
      icon: '🦞',
      facts: ['Могут не есть 5 лет', 'Родственники мокриц', 'Длина до 50 см']
    }
  ]
};

const threats = [
  {
    icon: 'Trash2',
    title: 'Пластиковое загрязнение',
    description: '8 миллионов тонн пластика попадает в океан ежегодно',
    severity: 'critical'
  },
  {
    icon: 'Thermometer',
    title: 'Потепление океана',
    description: 'Температура воды повышается, разрушая коралловые рифы',
    severity: 'high'
  },
  {
    icon: 'Fish',
    title: 'Перелов рыбы',
    description: '90% популяций рыб находятся под угрозой',
    severity: 'high'
  },
  {
    icon: 'Droplets',
    title: 'Закисление океана',
    description: 'pH океана изменился на 30% за последние 200 лет',
    severity: 'critical'
  }
];

const actions = [
  {
    icon: 'RecycleIcon',
    title: 'Откажись от одноразового пластика',
    description: 'Используй многоразовые бутылки, сумки и контейнеры'
  },
  {
    icon: 'ShoppingBag',
    title: 'Выбирай экологичные продукты',
    description: 'Покупай морепродукты из устойчивых источников'
  },
  {
    icon: 'Waves',
    title: 'Участвуй в очистке пляжей',
    description: 'Присоединяйся к локальным инициативам'
  },
  {
    icon: 'Heart',
    title: 'Поддерживай океанские организации',
    description: 'Жертвуй на защиту морской среды'
  },
  {
    icon: 'Share2',
    title: 'Распространяй информацию',
    description: 'Рассказывай о проблемах океана другим'
  },
  {
    icon: 'Leaf',
    title: 'Снижай углеродный след',
    description: 'Меньше выбросов CO₂ = здоровее океан'
  }
];

export default function Index() {
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);
  const [activeLayer, setActiveLayer] = useState<'surface' | 'mid' | 'deep'>('surface');

  const renderCreatures = (creatures: Creature[]) => {
    return creatures.map((creature) => (
      <Card
        key={creature.id}
        className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 animate-fade-in bg-card/80 backdrop-blur-sm border-2 border-primary/20"
        onClick={() => setSelectedCreature(creature)}
      >
        <CardContent className="p-6">
          <div className="text-6xl mb-4 float-animation group-hover:scale-110 transition-transform">
            {creature.icon}
          </div>
          <h3 className="text-2xl font-bold mb-2">{creature.name}</h3>
          <p className="text-muted-foreground mb-3 text-sm">{creature.habitat}</p>
          <p className="text-foreground/90 leading-relaxed">{creature.description}</p>
        </CardContent>
      </Card>
    ));
  };

  const getLayerGradient = () => {
    switch (activeLayer) {
      case 'surface':
        return 'from-ocean-surface/40 to-ocean-surface/10';
      case 'mid':
        return 'from-ocean-mid/40 to-ocean-mid/10';
      case 'deep':
        return 'from-ocean-deep/40 to-ocean-deep/10';
    }
  };

  return (
    <div className="min-h-screen ocean-gradient">
      <header className="relative overflow-hidden border-b border-primary/20 bg-background/60 backdrop-blur-md">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="wave-animation inline-block text-7xl mb-4">🌊</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-ocean-surface via-primary to-ocean-mid bg-clip-text text-transparent">
            Виртуальный Океанариум
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
            Погрузитесь в удивительный мир океана и познакомьтесь с его обитателями
          </p>
        </div>
      </header>

      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={activeLayer === 'surface' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setActiveLayer('surface')}
              className="gap-2"
            >
              <Icon name="Sun" size={20} />
              Поверхность
            </Button>
            <Button
              variant={activeLayer === 'mid' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setActiveLayer('mid')}
              className="gap-2"
            >
              <Icon name="Waves" size={20} />
              Средняя глубина
            </Button>
            <Button
              variant={activeLayer === 'deep' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setActiveLayer('deep')}
              className="gap-2"
            >
              <Icon name="Moon" size={20} />
              Глубины
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <section className={`mb-20 bg-gradient-to-b ${getLayerGradient()} rounded-3xl p-8 md:p-12 border border-primary/20`}>
          <div className="text-center mb-12">
            <Badge className="mb-4 text-lg px-6 py-2" variant="secondary">
              {activeLayer === 'surface' && '0-200 метров'}
              {activeLayer === 'mid' && '200-1000 метров'}
              {activeLayer === 'deep' && '1000+ метров'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {activeLayer === 'surface' && 'Поверхностный слой'}
              {activeLayer === 'mid' && 'Средняя глубина'}
              {activeLayer === 'deep' && 'Глубоководный мир'}
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              {activeLayer === 'surface' &&
                'Солнечный свет проникает сюда, создавая идеальные условия для жизни. Здесь обитают дельфины, черепахи и множество красочных рыб.'}
              {activeLayer === 'mid' &&
                'Сумеречная зона, где свет становится тусклым. Обитают крупные хищники и мигрирующие виды.'}
              {activeLayer === 'deep' &&
                'Вечная тьма и огромное давление. Здесь живут самые загадочные и странные существа планеты.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeLayer === 'surface' && renderCreatures(oceanCreatures.surface)}
            {activeLayer === 'mid' && renderCreatures(oceanCreatures.mid)}
            {activeLayer === 'deep' && renderCreatures(oceanCreatures.deep)}
          </div>
        </section>

        <section className="mb-20 bg-destructive/10 rounded-3xl p-8 md:p-12 border-2 border-destructive/30">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-destructive">Угрозы океану</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Наш океан в опасности. Человеческая деятельность создает серьезные проблемы для морской экосистемы.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {threats.map((threat, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm border-2 border-destructive/20 animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-destructive/20 rounded-xl">
                      <Icon name={threat.icon as any} size={32} className="text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{threat.title}</h3>
                      <p className="text-foreground/80 leading-relaxed">{threat.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl p-8 md:p-12 border-2 border-accent/30">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">💙</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что можешь сделать ты?</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Каждый из нас может внести вклад в защиту океана. Небольшие действия создают большие перемены!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actions.map((action, index) => (
              <Card
                key={index}
                className="group hover:scale-105 transition-all duration-300 bg-card/80 backdrop-blur-sm border-2 border-accent/20 hover:border-accent/50 animate-fade-in"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-accent/20 rounded-2xl group-hover:bg-accent/30 transition-colors">
                    <Icon name={action.icon as any} size={32} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{action.title}</h3>
                  <p className="text-foreground/80">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {selectedCreature && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedCreature(null)}
        >
          <Card className="max-w-2xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="text-8xl float-animation">{selectedCreature.icon}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedCreature(null)}
                  className="rounded-full"
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>

              <h2 className="text-4xl font-bold mb-4">{selectedCreature.name}</h2>
              <Badge className="mb-4" variant="secondary">
                {selectedCreature.habitat}
              </Badge>

              <p className="text-lg text-foreground/90 mb-6 leading-relaxed">{selectedCreature.description}</p>

              <div className="bg-muted/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Info" size={20} />
                  Интересные факты
                </h3>
                <ul className="space-y-3">
                  {selectedCreature.facts.map((fact, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary text-xl">•</span>
                      <span className="text-foreground/90">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <footer className="bg-background/60 backdrop-blur-md border-t border-primary/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🌊</div>
          <p className="text-lg text-foreground/70 mb-2">
            Океан покрывает 71% нашей планеты и производит 50% кислорода
          </p>
          <p className="text-foreground/60">Давайте защитим его вместе!</p>
        </div>
      </footer>
    </div>
  );
}
