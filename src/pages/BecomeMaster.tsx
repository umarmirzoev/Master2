import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle, TrendingUp, Calendar, DollarSign, Headphones,
  Clock, XCircle, Loader2, LogIn, AlertCircle, Star, Users,
  Shield, MapPin, Phone, MessageCircle, Send, Wrench, Zap, Award, CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SPECIALIZATIONS = [
  "Электрика", "Сантехника", "Отделка", "Мебель и двери",
  "Умный дом", "Видеонаблюдение", "Сад и двор", "Сварка",
  "Подвалы и гаражи", "Клининг", "Ремонт под ключ",
  "Аварийные услуги 24/7", "Ремонт техники", "Кондиционеры",
  "Окна и двери", "Потолки", "Полы и ламинат", "Покраска",
];

const DISTRICTS = ["Сино", "Фирдавси", "Шохмансур", "Исмоили Сомони", "Пригород"];

const BecomeMaster = () => {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [existingApp, setExistingApp] = useState<any>(null);
  const [checkingApp, setCheckingApp] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    district: "",
    specialization: "",
    experience_years: "",
    description: "",
  });

  const benefits = [
    { icon: Users, title: "Постоянные", desc: "заказы каждый день" },
    { icon: DollarSign, title: "Доход от 3000+", desc: "сомони в месяц" },
    { icon: Clock, title: "Работаете", desc: "когда удобно" },
    { icon: MapPin, title: "Заказы рядом", desc: "с вами" },
    { icon: Shield, title: "Безопасные", desc: "клиенты" },
    { icon: Headphones, title: "Поддержка", desc: "24/7" },
  ];

  const reviews = [
    { name: "Фаррух", text: "За месяц заработал 4500 сомони, клиенты приходят каждый день.", rating: 5, spec: "Электрик" },
    { name: "Исмоил", text: "Отличная платформа, всё честно и прозрачно. Рекомендую!", rating: 5, spec: "Сантехник" },
    { name: "Далер", text: "Работаю когда хочу, заказы рядом с домом, супер удобно!", rating: 5, spec: "Мастер на все руки" },
  ];

  useEffect(() => {
    const check = async () => {
      if (!user) { setCheckingApp(false); return; }
      const { data } = await supabase
        .from("master_applications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);
      if (data && data.length > 0) setExistingApp(data[0]);
      setFormData(prev => ({
        ...prev,
        full_name: user.user_metadata?.full_name || "",
        email: user.email || "",
      }));
      setCheckingApp(false);
    };
    if (!authLoading) check();
  }, [user, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate("/auth"); return; }
    if (!formData.district || !formData.specialization) {
      toast({ title: "Ошибка", description: "Заполните все обязательные поля", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("master_applications").insert({
      user_id: user.id,
      full_name: formData.full_name,
      phone: formData.phone,
      email: formData.email,
      district: formData.district,
      specialization: formData.specialization,
      experience_years: parseInt(formData.experience_years) || 0,
      description: formData.description,
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } else {
      await supabase.from("notifications").insert({
        user_id: user.id,
        title: "Заявка отправлена",
        message: "Ваша заявка на мастера отправлена на рассмотрение администратору.",
        type: "application",
      });
      toast({ title: "Заявка отправлена!", description: "Администратор рассмотрит вашу заявку." });
      const { data } = await supabase
        .from("master_applications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);
      if (data && data.length > 0) setExistingApp(data[0]);
    }
  };

  const statusConfig: Record<string, { icon: any; color: string; bg: string; label: string; message: string }> = {
    pending: {
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-200",
      label: "На рассмотрении",
      message: "Ваша заявка отправлена. Администратор рассматривает её. Мы уведомим вас о результате.",
    },
    approved: {
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50 border-green-200",
      label: "Одобрена",
      message: "Ваша заявка одобрена! Теперь вы можете работать как мастер. Перейдите в личный кабинет.",
    },
    rejected: {
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50 border-red-200",
      label: "Отклонена",
      message: "К сожалению, ваша заявка была отклонена. Вы можете подать новую заявку.",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-12 pb-20 overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-1 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                Станьте мастером<br />
                <span className="text-emerald-500 font-black">в Душанбе</span> и зарабатывайте каждый день
              </h1>
              <p className="text-lg text-slate-500 mb-8 max-w-lg">
                Мы находим клиентов, вы выполняете заказы и получаете стабильный доход.
              </p>
              <ul className="space-y-3 mb-10">
                {["Мы приводим клиентов", "Вы выполняете заказы", "Мы берём 20% комиссии, остальное — ваше"].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl h-14 px-10 font-bold text-lg shadow-lg shadow-emerald-100 transition-all active:scale-95"
                >
                  Стать мастером
                </Button>
                <Button asChild variant="outline" className="rounded-2xl h-14 px-8 font-bold text-slate-600 border-slate-200">
                  <a href="https://wa.me/992979117007" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2 text-emerald-500" />
                    Написать в WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>

            <div className="flex-1 flex justify-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />
                <img 
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
                  alt="Мастер" 
                  className="w-80 lg:w-[520px] h-auto object-contain rounded-[3rem] shadow-2xl relative z-10 border-8 border-white" 
                />
                
                {/* Floating Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -right-6 lg:-right-12 bg-white p-5 rounded-[2rem] shadow-2xl z-20 flex items-center gap-4 border border-slate-50 min-w-[240px]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                    <Zap className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Мастер ТЧ</p>
                    <p className="text-sm font-black text-slate-900">Ремонт. Уборка. Электрика.</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-24">
            {benefits.map((b, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white text-emerald-500 flex items-center justify-center mb-4 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs mb-1 uppercase tracking-tight">{b.title}</h3>
                <p className="text-[10px] text-slate-400 font-medium">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          <hr className="border-slate-100 mb-24" />

          {/* How it works */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-2">— Как это работает —</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              { n: "1", t: "Мы находим клиентов", s: "И передаём вам заявки" },
              { n: "2", t: "Вы выполняете заказ", s: "Качественно и в срок" },
              { n: "3", t: "Мы берём 20% комиссии", s: "Остальное — ваш доход" },
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-slate-50/50 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm mb-6 shadow-lg shadow-emerald-100">
                  {step.n}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                  {i === 0 ? <Users className="w-8 h-8 text-emerald-500" /> : 
                   i === 1 ? <Wrench className="w-8 h-8 text-emerald-500" /> : 
                             <DollarSign className="w-8 h-8 text-emerald-500" />}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.t}</h3>
                <p className="text-sm text-slate-500">{step.s}</p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900 rounded-[2.5rem] p-10 mb-24 text-center">
            {[
              { v: "120+", l: "мастеров с нами", i: <Users className="w-5 h-5 text-emerald-400" /> },
              { v: "5000+", l: "выполненных заказов", i: <CheckCircle className="w-5 h-5 text-emerald-400" /> },
              { v: "4.8 ★", l: "средний рейтинг", i: <Star className="w-5 h-5 text-emerald-400" /> },
              { v: "95%", l: "довольных клиентов", i: <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="mb-2">{s.i}</div>
                <p className="text-3xl font-black text-white">{s.v}</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Earnings Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Сколько можно заработать</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
            {[
              { t: "Сантехник", v: "от 4000 до 8000", s: "сомони в месяц", i: <Wrench /> },
              { t: "Электрик", v: "от 3000 до 7000", s: "сомони в месяц", i: <Zap /> },
              { t: "Мастер на все руки", v: "от 2500 до 6000", s: "сомони в месяц", i: <Award /> },
              { t: "Другие специальности", v: "стабильный доход", s: "каждый день", i: <Users /> },
            ].map((e, i) => (
              <Card key={i} className="border-none bg-slate-50 rounded-[2rem] p-4 text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-emerald-500 mx-auto mb-4 shadow-sm">
                    {e.i}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{e.t}</h3>
                  <p className="text-emerald-500 font-black text-lg leading-tight mb-1">{e.v}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{e.s}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Registration Section */}
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-24" id="apply-form">
            {/* Steps to start */}
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-black text-slate-900 mb-8">Как начать зарабатывать</h2>
              <div className="space-y-6 mb-12">
                {[
                  { t: "Зарегистрируйтесь", s: "Создайте аккаунт и заполните профиль" },
                  { t: "Заполните профиль", s: "Укажите специализацию и опыт работы" },
                  { t: "Получайте заказы", s: "Мы найдём клиентов, вы зарабатываете" },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-lg shadow-emerald-100">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{step.t}</h4>
                      <p className="text-sm text-slate-500">{step.s}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-4 text-emerald-500">Есть вопросы?</h3>
                <p className="text-sm text-slate-500 mb-6 font-bold">Напишите нам прямо сейчас</p>
                <div className="space-y-4">
                  <a href="tel:+992979117007" className="flex items-center gap-3 text-slate-900 hover:text-emerald-500 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Phone className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="font-bold">+992 979 117 007</span>
                  </a>
                  <a href="https://wa.me/992979117007" className="flex items-center gap-3 text-slate-900 hover:text-emerald-500 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <MessageCircle className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="font-bold">WhatsApp</span>
                  </a>
                  <a href="https://t.me/masterchas_tj" className="flex items-center gap-3 text-slate-900 hover:text-emerald-500 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Send className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="font-bold">Telegram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-7">
              {authLoading || checkingApp ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>
              ) : !user ? (
                <Card className="border-none bg-slate-50 rounded-[3rem] p-12 text-center border border-slate-100">
                  <CardContent>
                    <LogIn className="w-16 h-16 text-emerald-500 mx-auto mb-6 opacity-20" />
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Войдите в аккаунт</h3>
                    <p className="text-slate-500 mb-8 max-w-xs mx-auto">Чтобы подать заявку на статус мастера, необходимо авторизоваться в системе.</p>
                    <Button onClick={() => navigate("/auth")} className="bg-emerald-500 hover:bg-emerald-600 rounded-2xl h-14 px-12 font-bold shadow-lg shadow-emerald-100">
                      Войти / Регистрация
                    </Button>
                  </CardContent>
                </Card>
              ) : existingApp && existingApp.status !== "rejected" ? (
                <Card className={`border-none rounded-[3rem] p-12 text-center ${statusConfig[existingApp.status]?.bg || "bg-slate-50"}`}>
                  <CardContent>
                    {(() => {
                      const cfg = statusConfig[existingApp.status];
                      const Icon = cfg?.icon || Clock;
                      return (
                        <>
                          <div className={`w-20 h-20 rounded-[2rem] ${cfg?.bg || "bg-white"} flex items-center justify-center mx-auto mb-8 shadow-xl border border-white/50`}>
                            <Icon className={`w-10 h-10 ${cfg?.color || "text-slate-400"}`} />
                          </div>
                          <Badge className={`mb-6 py-1.5 px-6 rounded-full text-xs font-black uppercase tracking-widest ${cfg?.color || ""}`}>{cfg?.label || existingApp.status}</Badge>
                          <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Статус вашей заявки</h3>
                          <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">{cfg?.message}</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-8">Подана: {new Date(existingApp.created_at).toLocaleDateString("ru-RU")}</p>
                          {existingApp.status === "approved" && (
                            <Button onClick={() => navigate("/master-dashboard")} className="bg-emerald-500 hover:bg-emerald-600 rounded-2xl h-14 px-12 font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95">
                              Перейти в личный кабинет мастера
                            </Button>
                          )}
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-none shadow-2xl rounded-[3rem] bg-white border border-slate-50">
                  <CardContent className="p-10">
                    <h2 className="text-2xl font-black text-slate-900 mb-8">Заполните анкету</h2>
                    {existingApp?.status === "rejected" && (
                      <div className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-red-50 border border-red-100 mb-8">
                        <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-red-900 tracking-tight">Ваша предыдущая заявка была отклонена</p>
                          <p className="text-xs text-red-600/80 mt-1">Вы можете подать новую заявку, внимательно проверив данные.</p>
                        </div>
                      </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 tracking-widest">Полное имя</label>
                        <Input placeholder="Назаров Фарход" value={formData.full_name}
                          onChange={e => setFormData({ ...formData, full_name: e.target.value })} required 
                          className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 tracking-widest">Телефон</label>
                          <Input placeholder="+992 900 00 00 00" value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })} required type="tel"
                            className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-500" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 tracking-widest">Email</label>
                          <Input placeholder="email@example.com" value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })} type="email"
                            className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-500" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 tracking-widest">Район</label>
                          <Select value={formData.district} onValueChange={v => setFormData({ ...formData, district: v })}>
                            <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-500"><SelectValue placeholder="Выберите район" /></SelectTrigger>
                            <SelectContent>
                              {DISTRICTS.map(d => <SelectItem key={d} value={d} className="rounded-xl">{d}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 tracking-widest">Опыт (лет)</label>
                          <Input placeholder="5" type="number" min={0} max={50} value={formData.experience_years}
                            onChange={e => setFormData({ ...formData, experience_years: e.target.value })}
                            className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-500" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 tracking-widest">Специализация</label>
                        <Select value={formData.specialization} onValueChange={v => setFormData({ ...formData, specialization: v })}>
                          <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-500"><SelectValue placeholder="Ваша основная деятельность" /></SelectTrigger>
                          <SelectContent>
                            {SPECIALIZATIONS.map(s => <SelectItem key={s} value={s} className="rounded-xl">{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 tracking-widest">О себе</label>
                        <Textarea placeholder="Расскажите немного о вашем опыте и навыках..." value={formData.description}
                          onChange={e => setFormData({ ...formData, description: e.target.value })} rows={4}
                          className="rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-500 resize-none p-5" />
                      </div>
                      <Button type="submit" className="w-full rounded-[1.5rem] h-16 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg shadow-xl shadow-emerald-100 transition-all active:scale-95" disabled={submitting}>
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                        Отправить заявку в Мастер ТЧ
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Master Reviews */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-black text-slate-900 mb-2">— Отзывы наших мастеров —</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {reviews.map((r, i) => (
              <Card key={i} className="border-none shadow-sm rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={`https://i.pravatar.cc/150?u=${r.name}`} alt={r.name} className="w-12 h-12 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-500" />
                    <div>
                      <p className="font-black text-slate-900 leading-tight">{r.name}</p>
                      <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{r.spec}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed italic">"{r.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="relative rounded-[3rem] bg-emerald-500 p-10 md:p-16 text-center md:text-left overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl -ml-24 -mb-24" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight">Начни зарабатывать уже сегодня!</h3>
                <p className="text-white/80 font-bold text-lg">Присоединяйся к команде профессионалов в Душанбе</p>
              </div>
              <Button 
                onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white text-emerald-600 hover:bg-slate-50 rounded-[1.5rem] h-16 px-12 font-black text-lg shadow-2xl shrink-0 transition-all active:scale-95"
              >
                Стать мастером
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeMaster;
