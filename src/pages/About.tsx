import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, DollarSign, Clock, Headphones, CheckCircle, Star, Users, Wrench, Heart, Zap, Target, Award, ArrowRight, Truck, Search, FileText, UserCheck, Eye, ClipboardCheck } from "lucide-react";

// Страница "О нас" рассказывает о сервисе, его преимуществах, ценностях, процессе работы и призыве к действию.
const About = () => {
  const { t } = useLanguage();

  // Ключевые преимущества сервиса выводятся отдельными карточками на странице.
  const features = [
    { icon: Shield, titleKey: "aboutVerifiedMasters", descKey: "aboutVerifiedMastersDesc" },
    { icon: DollarSign, titleKey: "aboutTransparentPrices", descKey: "aboutTransparentPricesDesc" },
    { icon: Clock, titleKey: "aboutFastArrival", descKey: "aboutFastArrivalDesc" },
    { icon: Headphones, titleKey: "aboutSupport247", descKey: "aboutSupport247Desc" },
    { icon: Truck, titleKey: "aboutConvenientOrder", descKey: "aboutConvenientOrderDesc" },
  ];

  // Цифры помогают быстро показать масштаб платформы и уровень доверия.
  const stats = [
    { value: "1000+", labelKey: "aboutMasters", icon: Users },
    { value: "120+", labelKey: "aboutServices", icon: Wrench },
    { value: "5000+", labelKey: "aboutOrders", icon: CheckCircle },
    { value: "4.8", labelKey: "aboutAvgRating", icon: Star },
  ];

  // Ценности объясняют, на каких принципах строится работа сервиса.
  const values = [
    { icon: Shield, titleKey: "aboutReliability", descKey: "aboutReliabilityDesc" },
    { icon: Zap, titleKey: "aboutSpeed", descKey: "aboutSpeedDesc" },
    { icon: Target, titleKey: "aboutQuality", descKey: "aboutQualityDesc" },
    { icon: Heart, titleKey: "aboutHonesty", descKey: "aboutHonestyDesc" },
  ];

  // Полный процесс заказа от поиска до завершения — по шагам.
  const steps = [
    { icon: Search, titleKey: "hiwStep1", descKey: "hiwStep1Desc" },
    { icon: FileText, titleKey: "hiwStep2", descKey: "hiwStep2Desc" },
    { icon: UserCheck, titleKey: "hiwStep3", descKey: "hiwStep3Desc" },
    { icon: Eye, titleKey: "hiwStep4", descKey: "hiwStep4Desc" },
    { icon: ClipboardCheck, titleKey: "hiwStep5", descKey: "hiwStep5Desc" },
    { icon: CheckCircle, titleKey: "hiwStep6", descKey: "hiwStep6Desc" },
    { icon: Truck, titleKey: "hiwStep7", descKey: "hiwStep7Desc" },
    { icon: Wrench, titleKey: "hiwStep8", descKey: "hiwStep8Desc" },
    { icon: Star, titleKey: "hiwStep9", descKey: "hiwStep9Desc" },
  ];

  // Преимущества процесса для клиента.
  const benefits = [
    { icon: Clock, titleKey: "hiwFast", descKey: "hiwFastDesc" },
    { icon: Shield, titleKey: "hiwSafe", descKey: "hiwSafeDesc" },
    { icon: DollarSign, titleKey: "hiwTransparent", descKey: "hiwTransparentDesc" },
    { icon: Headphones, titleKey: "hiwConvenient", descKey: "hiwConvenientDesc" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Первый экран коротко объясняет миссию страницы и задаёт тон всему разделу. */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container px-4 mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">{t("aboutPageTitle")}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{t("aboutPageDesc")}</p>
          </motion.div>
        </div>
      </section>

      {/* Здесь раскрывается миссия проекта и его основная идея. */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("aboutMission")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">{t("aboutMissionDesc")}</p>
          </motion.div>
        </div>
      </section>

      {/* Этот блок отвечает на вопрос, почему пользователю стоит выбрать именно сервис. */}
      <section className="py-16 md:py-20">
        <div className="container px-4 mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t("aboutWhyChoose")}
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center shadow-lg mb-4">
                      <f.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{t(f.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Блок со статистикой усиливает доверие через конкретные показатели. */}
      <section className="py-16 bg-gradient-to-br from-primary to-emerald-500">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <s.icon className="w-8 h-8 text-primary-foreground/80 mx-auto mb-2" />
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground">{s.value}</p>
                <p className="text-primary-foreground/80 text-sm mt-1">{t(s.labelKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Полный процесс заказа от поиска до завершения — 9 шагов. */}
      <section className="py-16 md:py-20">
        <div className="container px-4 mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t("hiwTitle")}
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-5 sm:p-6 flex items-start gap-4">
                      <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center shadow-lg flex-shrink-0">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-primary">{t("hiwStep")} {i + 1}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{t(step.titleKey)}</h3>
                        <p className="text-sm text-muted-foreground">{t(step.descKey)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Преимущества процесса для клиента. */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
            {t("hiwBenefitsTitle")}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl bg-card border shadow-sm">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{t(b.titleKey)}</h3>
                <p className="text-xs text-muted-foreground">{t(b.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Безопасность и гарантии. */}
      <section className="py-16">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("hiwSafetyTitle")}</h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{t("hiwSafetyDesc")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["hiwDocCheck", "hiwWorkGuarantee", "hiwSupport247", "hiwInsurance"].map((key, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> {t(key)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Здесь перечислены ключевые ценности и подход платформы к работе. */}
      <section className="py-16 md:py-20">
        <div className="container px-4 mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {t("aboutValues")}
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl bg-muted/50">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{t(v.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(v.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Финальный CTA переводит пользователя к выбору услуги или контакту с командой. */}
      <section className="py-16 md:py-20">
        <div className="container px-4 mx-auto text-center max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("aboutCTA")}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t("aboutCTADesc")}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/categories">
                <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-emerald-500 shadow-lg">
                  {t("aboutChooseService")} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contacts">
                <Button size="lg" variant="outline" className="rounded-full px-8">{t("aboutContactUs")}</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
