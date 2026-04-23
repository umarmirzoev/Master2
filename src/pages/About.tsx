import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shield,
  DollarSign,
  Clock,
  Headphones,
  CheckCircle,
  Star,
  Users,
  Wrench,
  Heart,
  Zap,
  Truck,
  Award,
  ArrowRight,
} from "lucide-react";

const About = () => {
  const heroStats = [
    { value: "1000+", label: "мастеров" },
    { value: "5000+", label: "выполненных заказов" },
    { value: "120+", label: "услуг" },
    { value: "4.8", label: "средний рейтинг" },
    { value: "95%", label: "довольных клиентов" },
  ];

  const clientBenefits = [
    { icon: Zap, title: "Быстро", desc: "Оформление заявки за 2 минуты и оперативный выезд мастера." },
    { icon: Shield, title: "Надёжно", desc: "Проверенные специалисты и страхование работ." },
    { icon: Heart, title: "Чисто", desc: "Аккуратный подход, уборка после работы и порядок в доме." },
    { icon: CheckCircle, title: "С гарантией", desc: "Гарантия на все услуги до 3 месяцев." },
  ];

  const masterAdvantages = [
    { icon: Users, title: "Постоянные заказы", desc: "Поток заявок каждый день из всех районов города." },
    { icon: Clock, title: "Свободный график", desc: "Вы сами выбираете, когда работать и какие заказы брать." },
    { icon: DollarSign, title: "Честная оплата", desc: "Вы получаете большую часть заработка без скрытых комиссий." },
    { icon: Headphones, title: "Поддержка 24/7", desc: "Менеджер всегда на связи и помогает решить спорные вопросы." },
    { icon: Shield, title: "Безопасность", desc: "Мы проверяем клиентов и страхуем ваши выполненные работы." },
    { icon: Wrench, title: "Рост навыков", desc: "Разнообразные задачи помогают стать профессионалом." },
  ];

  const values = [
    { icon: Heart, title: "Честность", desc: "Открытые цены и прозрачные условия." },
    { icon: Shield, title: "Надёжность", desc: "Проверенные мастера и гарантия качества." },
    { icon: Zap, title: "Скорость", desc: "Оперативное решение задач в течение часа." },
    { icon: Star, title: "Качество", desc: "Высокие стандарты выполнения и контроль результата." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-100 opacity-80 blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 xl:col-span-5">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600 font-bold mb-4">Мастер ТЧ</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                Мастер ТЧ — сервис, которому доверяют в Душанбе
              </h1>
              <p className="text-lg leading-8 text-slate-600 mb-8">
                Мы находим проверенных мастеров и помогаем клиентам быстро решить бытовые задачи — от электрики до ремонта под ключ.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 mb-10">
                {[
                  "Выезд мастера за 1 час",
                  "Гарантия до 3 месяцев",
                  "Проверенные специалисты",
                  "Заказ без звонков",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-3 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => document.getElementById("about-contacts")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-full bg-emerald-600 text-white px-10 py-4 font-bold shadow-xl shadow-emerald-200 hover:bg-emerald-700"
                >
                  Оставить заявку
                </Button>
                <Link
                  to="/become-master"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-10 py-4 text-slate-900 font-semibold hover:bg-slate-100"
                >
                  Стать мастером
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 xl:col-span-7">
              <div className="relative mx-auto max-w-[680px]">
                <div className="rounded-[3rem] border border-slate-200 bg-white p-8 shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
                  <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 text-xs uppercase tracking-[0.35em] font-semibold">
                    <Zap className="w-4 h-4" />
                    Мастер ТЧ
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Ремонт и бытовые услуги</h2>
                  <p className="text-base leading-7 text-slate-600 mb-8">
                    Стабильные заказы, высокие рейтинги и поддержка для каждого мастера.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Работа с гарантией",
                      "Поддержка 24/7",
                      "Все районы города",
                      "Прозрачные условия",
                    ].map((item, index) => (
                      <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm font-semibold text-slate-900">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Выезд мастера за 1 час", desc: "Мы быстро отправим нужного специалиста на адрес." },
              { title: "Гарантия до 3 месяцев", desc: "Гарантируем качество и ремонтные работы." },
              { title: "Проверенные специалисты", desc: "Только честные и проверенные исполнители." },
              { title: "Заказ без звонков", desc: "Оставьте заявку онлайн — мы сами перезвоним." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm"
              >
                <p className="text-lg font-bold text-slate-900 mb-2">{item.title}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-600 font-bold mb-3">Что мы даём клиентам</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Удобно, быстро и с честной гарантией</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {clientBenefits.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="rounded-[2rem] border border-slate-200 bg-white shadow-sm p-8 hover:shadow-xl transition-shadow">
                    <CardContent className="p-0">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-600 font-bold mb-3">Преимущества для мастеров</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Плюсы для исполнителей</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {masterAdvantages.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full rounded-[2rem] border border-slate-200 bg-white shadow-sm p-8 hover:shadow-xl transition-shadow">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="rounded-[3rem] border border-slate-200 bg-white shadow-sm p-10">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-600 font-bold mb-3">Наша миссия</p>
                <h2 className="text-3xl font-black text-slate-900 mb-4">Мы делаем бытовые услуги проще</h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Наша задача — организовать удобный сервис, где клиент получает мастера без лишних вопросов, а исполнитель — честные условия и стабильный поток заказов.
                </p>
                <div className="space-y-4">
                  {[
                    "Оперативный выезд по всему городу",
                    "Контроль качества и гарантия на работы",
                    "Прозрачные условия и честные цены",
                  ].map((text, idx) => (
                    <div key={idx} className="flex gap-3 rounded-3xl bg-emerald-50 p-4">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-1" />
                      <p className="text-sm text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="rounded-[3rem] overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
                  alt="Автомобиль мастера"
                  className="h-full w-full object-cover"
                />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-600 font-bold mb-3">Наши ценности</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Что мы ценим в работе</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                  <Card className="rounded-[2rem] border border-slate-200 bg-white shadow-sm p-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about-contacts" className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-3 lg:items-center max-w-6xl mx-auto">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-200 font-bold mb-3">Есть вопросы?</p>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Мы на связи и готовы помочь</h2>
              <p className="text-slate-100 max-w-2xl leading-relaxed">Напишите в WhatsApp или выберите услугу — и мы организуем выезд мастера в удобное время.</p>
            </div>
            <div className="rounded-[2rem] bg-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-200 mb-2">Контакты</p>
              <p className="text-lg font-bold">+992 979 117 007</p>
              <p className="text-sm text-emerald-100 mt-2">WhatsApp / звонки</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-white text-emerald-700 px-8 py-4 font-black hover:bg-slate-100">
                <a href="https://wa.me/992979117007" target="_blank" rel="noopener noreferrer">Написать в WhatsApp</a>
              </Button>
              <Link to="/categories" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-white font-semibold hover:bg-white/20">
                Выбрать услугу
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
