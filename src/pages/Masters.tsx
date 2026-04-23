import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Search, Star, MapPin, Clock, Phone, MessageCircle,
  SlidersHorizontal, X, ChevronDown, Users, Award, Shield, Scale,
  CheckCircle2, Headset, Zap, Trophy,
} from "lucide-react";
import MasterComparisonDialog, { CompareBar, useComparison } from "@/components/MasterComparison";
import OrderModal from "@/components/OrderModal";
import QuickBooking from "@/components/QuickBooking";
import AiMasterMatch from "@/components/AiMasterMatch";

interface MasterListing {
  id: string;
  full_name: string;
  phone: string;
  avatar_url: string;
  bio: string;
  service_categories: string[];
  working_districts: string[];
  experience_years: number;
  average_rating: number;
  total_reviews: number;
  price_min: number;
  price_max: number;
  latitude: number | null;
  longitude: number | null;
  ranking_score: number;
  is_top_master: boolean;
  quality_flag: string;
  completed_orders: number;
}

const ALL_CATEGORIES = [
  "Электрика", "Сантехника", "Отделка", "Мебель и двери", "Умный дом",
  "Видеонаблюдение", "Сад и двор", "Сварочные работы", "Подвалы и гаражи",
  "Уборка", "Ремонт под ключ", "Аварийные 24/7", "Ремонт техники",
];

const ALL_DISTRICTS = ["Сино", "Фирдавси", "Шохмансур", "Исмоили Сомони", "Пригород"];

export default function Masters() {
  const { t } = useLanguage();
  const [masters, setMasters] = useState<MasterListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [district, setDistrict] = useState("all");
  const [sortBy, setSortBy] = useState("ranking");
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const { compareIds, toggleCompare, clearCompare, isComparing } = useComparison();
  const [compareOpen, setCompareOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [quickBookOpen, setQuickBookOpen] = useState(false);
  const [aiMatchOpen, setAiMatchOpen] = useState(false);

  useEffect(() => {
    supabase
      .from("master_listings")
      .select("*")
      .eq("is_active", true)
      .then(({ data }) => {
        setMasters((data as unknown as MasterListing[]) || []);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let result = masters;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.full_name.toLowerCase().includes(q) ||
          m.service_categories.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (category !== "all") {
      result = result.filter((m) => m.service_categories.includes(category));
    }

    if (district !== "all") {
      result = result.filter((m) => m.working_districts.includes(district));
    }

    if (minRating > 0) {
      result = result.filter((m) => m.average_rating >= minRating);
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "ranking": return (b.ranking_score || 0) - (a.ranking_score || 0);
        case "rating": return b.average_rating - a.average_rating;
        case "price_low": return a.price_min - b.price_min;
        case "price_high": return b.price_max - a.price_max;
        case "experience": return b.experience_years - a.experience_years;
        case "reviews": return b.total_reviews - a.total_reviews;
        default: return 0;
      }
    });

    return result;
  }, [masters, search, category, district, sortBy, minRating]);

  const activeFilters = [category !== "all", district !== "all", minRating > 0].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#F0FDF4] pt-8 pb-12 overflow-hidden border-b border-green-100">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 relative">
            
            {/* Left Image (Master) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block w-1/4"
            >
              <img src="/images/master_hero.png" alt="Master" className="w-full h-auto object-contain" />
            </motion.div>

            {/* Center Content */}
            <div className="flex-1 text-center lg:px-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">Наши мастера</h1>
                <p className="text-lg text-slate-600 mb-8 font-medium">
                  {masters.length} проверенных специалистов в Душанбе
                </p>

                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white max-w-2xl mx-auto mb-10 shadow-sm">
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    Наши мастера — это команда проверенных специалистов с многолетним стажем работы в Душанбе. 
                    Каждый из них проходит тщательную проверку документов, навыков и рекомендаций. 
                    Мы гарантируем качество работы на каждом этапе.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                  <BenefitItem icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />} text="Надёжные специалисты" subtext="Все мастера прошли проверку" />
                  <BenefitItem icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />} text="Честные цены" subtext="Прозрачное ценообразование" />
                  <BenefitItem icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />} text="Гарантия качества" subtext="Официальная гарантия работ" />
                </div>
              </motion.div>
            </div>

            {/* Right Card (Help) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-1/4 max-w-sm"
            >
              <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-bold text-slate-900 mb-1">Нужна помощь в выборе?</h3>
                  <p className="text-xs text-slate-500 mb-4">Напишите нам и мы поможем подобрать идеального мастера для вашей задачи!</p>
                  <Button 
                    onClick={() => setIsOrderModalOpen(true)}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-6 h-auto font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95"
                  >
                    Получить консультацию
                  </Button>
                </div>
                <div className="mt-4 flex justify-end">
                  <img src="/images/consultant.png" alt="Consultant" className="w-32 h-auto" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container px-4 mx-auto max-w-7xl">
          
          {/* Search Bar Row */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input
                placeholder="Поиск мастера или услуги..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-14 bg-white border-slate-200 rounded-2xl shadow-sm focus-visible:ring-emerald-500 focus-visible:border-emerald-500 text-lg"
              />
            </div>
            <Button
              variant="outline"
              className={`h-14 gap-2 rounded-2xl shrink-0 px-8 border-slate-200 hover:border-emerald-500 hover:text-emerald-500 transition-all font-semibold ${showFilters ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-white'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Фильтры
              {activeFilters > 0 && (
                <Badge className="ml-1 bg-emerald-500 h-6 w-6 p-0 flex items-center justify-center text-xs rounded-full">
                  {activeFilters}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Категория</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      {ALL_CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Район</label>
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все районы</SelectItem>
                      {ALL_DISTRICTS.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Сортировка</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ranking">По рекомендации</SelectItem>
                      <SelectItem value="rating">По рейтингу</SelectItem>
                      <SelectItem value="price_low">Цена: по возрастанию</SelectItem>
                      <SelectItem value="price_high">Цена: по убыванию</SelectItem>
                      <SelectItem value="experience">По опыту</SelectItem>
                      <SelectItem value="reviews">По отзывам</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">
                    Мин. рейтинг: {minRating > 0 ? minRating.toFixed(1) : "Любой"}
                  </label>
                  <div className="pt-4">
                    <Slider
                      value={[minRating]}
                      onValueChange={([v]) => setMinRating(v)}
                      max={5}
                      step={0.5}
                      className="[&_[role=slider]]:bg-emerald-500 [&_[role=slider]]:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
              {activeFilters > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-6 text-slate-400 hover:text-red-500 transition-colors"
                  onClick={() => { setCategory("all"); setDistrict("all"); setMinRating(0); }}
                >
                  <X className="w-4 h-4 mr-2" /> Сбросить все фильтры
                </Button>
              )}
            </motion.div>
          )}

          {/* Results Summary Row */}
          <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-sm font-semibold text-slate-700">
                Найдено {filtered.length} мастеров
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Сортировка:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-8 border-none bg-transparent p-0 font-bold text-slate-700 shadow-none focus:ring-0 w-[140px] gap-1 hover:text-emerald-500 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="ranking">По рекомендации</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="price_low">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price_high">Цена: по убыванию</SelectItem>
                  <SelectItem value="experience">По опыту</SelectItem>
                  <SelectItem value="reviews">По отзывам</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Masters Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-80 bg-slate-100 animate-pulse rounded-3xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Мастера не найдены</h3>
              <p className="text-slate-500">Попробуйте изменить параметры поиска или фильтры</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((master, index) => (
                <MasterCard 
                  key={master.id} 
                  master={master} 
                  index={index} 
                  isComparing={isComparing(master.id)} 
                  onToggleCompare={() => toggleCompare(master.id)} 
                  compareDisabled={compareIds.length >= 3 && !isComparing(master.id)} 
                />
              ))}
            </div>
          )}

          {/* Bottom Features Row */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<Zap className="w-6 h-6 text-emerald-500" />} title="Быстрый отклик" desc="Мастер ответит в течение 15 минут" />
            <FeatureCard icon={<Trophy className="w-6 h-6 text-emerald-500" />} title="Профессионалы" desc="Проверенные специалисты" />
            <FeatureCard icon={<Shield className="w-6 h-6 text-emerald-500" />} title="Безопасность" desc="Гарантия на выполненные работы" />
            <FeatureCard icon={<Headset className="w-6 h-6 text-emerald-500" />} title="Поддержка 24/7" desc="Всегда на связи" />
          </div>
        </div>
      </section>

      <CompareBar compareIds={compareIds} onOpen={() => setCompareOpen(true)} onClear={clearCompare} />
      <MasterComparisonDialog open={compareOpen} onOpenChange={setCompareOpen} masterIds={compareIds} />
      
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        category="other"
        initialServiceName="Консультация по выбору мастера"
      />
      <QuickBooking open={quickBookOpen} onOpenChange={setQuickBookOpen} />
      <AiMasterMatch open={aiMatchOpen} onOpenChange={setAiMatchOpen} />

      <Footer />
    </div>
  );
}

function BenefitItem({ icon, text, subtext }: { icon: React.ReactNode; text: string; subtext: string }) {
  return (
    <div className="flex items-center gap-3 text-left">
      <div className="bg-emerald-50 p-2 rounded-full border border-emerald-100">{icon}</div>
      <div>
        <p className="text-sm font-bold text-slate-900 leading-tight">{text}</p>
        <p className="text-[11px] text-slate-500">{subtext}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-all">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-1">
        {icon}
      </div>
      <h4 className="font-bold text-slate-900">{title}</h4>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  );
}

function MasterCard({ master, index, isComparing, onToggleCompare, compareDisabled }: { master: MasterListing; index: number; isComparing: boolean; onToggleCompare: () => void; compareDisabled: boolean }) {
  const initials = master.full_name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  const colors = [
    "bg-emerald-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-teal-500",
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link to={`/masters/${master.id}`}>
        <Card className="group h-full bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer border-slate-100 rounded-[2.5rem] relative">
          {/* Top category bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 ${color} opacity-80`} />
          
          <CardContent className="p-6 flex flex-col h-full">
            {/* Header: Avatar + Info */}
            <div className="flex items-start gap-4 mb-5">
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-lg overflow-hidden`}>
                {master.avatar_url ? (
                  <img src={master.avatar_url} alt={master.full_name} className="w-full h-full object-cover" />
                ) : (
                  <img src={`https://i.pravatar.cc/150?u=${master.id}`} alt={master.full_name} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition-colors truncate">
                    {master.full_name}
                  </h3>
                  {master.is_top_master && (
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-slate-800">{master.average_rating}</span>
                  <span className="text-[11px] text-slate-400">({master.total_reviews} отзывов)</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {master.service_categories.slice(0, 2).map((cat) => (
                <span key={cat} className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {cat}
                </span>
              ))}
            </div>

            {/* Details */}
            <div className="space-y-2 mb-6 flex-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-300" />
                <span>{master.experience_years} лет опыта</span>
                <span className="text-slate-200">•</span>
                <span>{master.completed_orders} работ</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-300" />
                <span className="truncate">Душанбе, {master.working_districts.join(", ")}</span>
              </div>
            </div>

            {/* Footer: Price + Actions */}
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-medium">от</p>
                <p className="text-lg font-black text-slate-900 leading-none">
                  {master.price_min} <span className="text-xs font-normal text-slate-400">смн</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.preventDefault(); window.open(`tel:${master.phone}`); }}
                  className="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-100 transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/${master.phone.replace(/\D/g, "")}`); }}
                  className="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-100 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button className="h-9 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-100">
                  Подробнее
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
