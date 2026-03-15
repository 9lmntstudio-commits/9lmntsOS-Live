import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Zap,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  X,
  Crown,
  Sparkles,
  BarChart2,
  Globe,
  Cpu,
  Lock,
  ChevronDown,
  Music,
  Briefcase,
  Heart,
} from "lucide-react";

type Theme = "nightlife" | "corporate" | "wedding";

interface ThemeConfig {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  primary: string;
  secondary: string;
  bg: string;
  card: string;
  text: string;
  accent: string;
  gradient: string;
  emoji: string;
}

const themes: Record<Theme, ThemeConfig> = {
  nightlife: {
    label: "Nightlife",
    icon: Music,
    primary: "#FF7A00",
    secondary: "#FF3D00",
    bg: "#0A0A0A",
    card: "#111111",
    text: "#FFFFFF",
    accent: "#FF7A00",
    gradient: "from-orange-600 to-red-600",
    emoji: "🎵",
  },
  corporate: {
    label: "Corporate",
    icon: Briefcase,
    primary: "#0066FF",
    secondary: "#0099FF",
    bg: "#050F1A",
    card: "#0A1A2A",
    text: "#FFFFFF",
    accent: "#0099FF",
    gradient: "from-blue-600 to-cyan-500",
    emoji: "💼",
  },
  wedding: {
    label: "Wedding",
    icon: Heart,
    primary: "#C0A060",
    secondary: "#E8C879",
    bg: "#0D0A08",
    card: "#1A1410",
    text: "#F5F0E8",
    accent: "#E8C879",
    gradient: "from-yellow-600 to-amber-400",
    emoji: "💍",
  },
};

const revenueData = [
  { month: "Jan", manual: 12000, eventos: 28000 },
  { month: "Feb", manual: 15000, eventos: 35000 },
  { month: "Mar", manual: 11000, eventos: 42000 },
  { month: "Apr", manual: 18000, eventos: 56000 },
  { month: "May", manual: 14000, eventos: 71000 },
  { month: "Jun", manual: 20000, eventos: 95000 },
];

const ticketData = [
  { time: "8PM", sold: 45 },
  { time: "9PM", sold: 120 },
  { time: "10PM", sold: 280 },
  { time: "11PM", sold: 410 },
  { time: "12AM", sold: 520 },
  { time: "1AM", sold: 600 },
];

const satisfactionData = [
  { name: "Excellent", value: 68, color: "#FF7A00" },
  { name: "Good", value: 22, color: "#FF3D00" },
  { name: "Average", value: 8, color: "#333" },
  { name: "Poor", value: 2, color: "#222" },
];

const features = [
  { icon: Zap, title: "Real-time Analytics", desc: "Live event metrics and revenue tracking" },
  { icon: Users, title: "Guest Management", desc: "VIP lists, check-ins, capacity control" },
  { icon: DollarSign, title: "Smart Ticketing", desc: "Dynamic pricing with surge detection" },
  { icon: Shield, title: "Fraud Prevention", desc: "AI-powered ticket verification" },
  { icon: Globe, title: "Multi-venue", desc: "Manage all locations from one dashboard" },
  { icon: Cpu, title: "AI Predictions", desc: "Predict crowd flow and bar demand" },
];

const battleMetrics = [
  { label: "Revenue per Event", manual: "$12K", eventos: "$47K", winner: "eventos" },
  { label: "Setup Time", manual: "3 days", eventos: "2 hours", winner: "eventos" },
  { label: "No-show Rate", manual: "18%", eventos: "3%", winner: "eventos" },
  { label: "Staff Required", manual: "12 people", eventos: "4 people", winner: "eventos" },
  { label: "Ticket Fraud", manual: "High", eventos: "Near Zero", winner: "eventos" },
];

const vipGuests = [
  { name: "Marcus V.", tier: "Diamond", spend: "$2,400", table: "VIP-1", status: "arrived" },
  { name: "Sophia K.", tier: "Platinum", spend: "$1,800", table: "VIP-3", status: "arrived" },
  { name: "DJ Khalil", tier: "Diamond", spend: "$3,200", table: "Artist", status: "en-route" },
  { name: "Elena R.", tier: "Gold", spend: "$950", table: "VIP-7", status: "arrived" },
  { name: "Marco T.", tier: "Platinum", spend: "$1,600", table: "VIP-2", status: "pending" },
];

const plans = [
  {
    name: "EventOS Basic",
    price: "$1,500",
    period: "single event",
    features: ["Single event license", "Real-time dashboard", "Guest check-in app", "Basic analytics", "Email support"],
    highlight: false,
    badge: null,
  },
  {
    name: "EventOS Premium",
    price: "$5,000",
    period: "white-label",
    features: ["Everything in Basic", "White-label branding", "AI assistant included", "Multi-event access", "VIP guest management", "Priority 24/7 support", "Custom integrations"],
    highlight: true,
    badge: "Most Popular",
  },
];

interface StorePanelProps {
  theme: ThemeConfig;
  onClose: () => void;
  onBook: (plan: string) => void;
}

function StorePanel({ theme, onClose, onBook }: StorePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl rounded-2xl p-8 border"
        style={{ backgroundColor: theme.card, borderColor: theme.primary + "33" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors"
          style={{ color: theme.text, backgroundColor: "#ffffff11" }}
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
            Get EventOS
          </h2>
          <p style={{ color: theme.text + "99" }}>Choose the plan that transforms your events</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-xl p-6 border relative"
              style={{
                backgroundColor: plan.highlight ? theme.primary + "15" : theme.bg,
                borderColor: plan.highlight ? theme.primary : "#333",
              }}
            >
              {plan.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-black"
                  style={{ backgroundColor: theme.primary }}
                >
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-bold mb-1" style={{ color: theme.text }}>{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-black" style={{ color: plan.highlight ? theme.primary : theme.text }}>
                  {plan.price}
                </span>
                <span className="text-sm ml-2" style={{ color: theme.text + "66" }}>/{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: theme.text + "cc" }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: theme.primary }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onBook(plan.name)}
                className="w-full py-3 rounded-xl font-bold transition-all hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: plan.highlight ? theme.primary : "#ffffff22",
                  color: plan.highlight ? "#000" : theme.text,
                }}
              >
                Get Started →
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface EventOSDemoProps {
  onNavigate?: (page: string, service?: string) => void;
}

export default function EventOSDemo({ onNavigate }: EventOSDemoProps) {
  const [activeTheme, setActiveTheme] = useState<Theme>("nightlife");
  const [showStore, setShowStore] = useState(false);
  const [liveTickets, setLiveTickets] = useState(847);
  const [liveRevenue, setLiveRevenue] = useState(124560);
  const [battleStep, setBattleStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const theme = themes[activeTheme];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLiveTickets((p) => p + Math.floor(Math.random() * 3));
      setLiveRevenue((p) => p + Math.floor(Math.random() * 200));
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setBattleStep((p) => (p + 1) % (battleMetrics.length + 1));
    }, 1500);
    return () => clearInterval(t);
  }, []);

  const handleGetEventOS = (plan?: string) => {
    setShowStore(false);
    if (onNavigate) {
      onNavigate("booking", plan || "EventOS Premium");
    }
  };

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-500"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* Nav */}
      <nav
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ backgroundColor: theme.bg + "ee", borderColor: theme.primary + "22" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-black text-sm"
              style={{ backgroundColor: theme.primary }}
            >
              9L
            </div>
            <span className="font-bold text-lg" style={{ color: theme.text }}>9LMNTS Studio</span>
            <span
              className="hidden sm:block px-2 py-0.5 rounded text-xs font-bold"
              style={{ backgroundColor: theme.primary + "22", color: theme.primary }}
            >
              EventOS
            </span>
          </div>
          <div className="flex items-center gap-2">
            {(["nightlife", "corporate", "wedding"] as Theme[]).map((t) => {
              const Icon = themes[t].icon;
              return (
                <button
                  key={t}
                  onClick={() => setActiveTheme(t)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    backgroundColor: activeTheme === t ? theme.primary : "#ffffff11",
                    color: activeTheme === t ? "#000" : theme.text + "99",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:block capitalize">{t}</span>
                </button>
              );
            })}
            <button
              onClick={() => setShowStore(true)}
              className="ml-2 px-4 py-1.5 rounded-lg text-sm font-bold text-black transition-all hover:opacity-90"
              style={{ backgroundColor: theme.primary }}
            >
              Get EventOS
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Hero */}
        <section className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: theme.primary + "20", color: theme.primary }}
            >
              <Sparkles className="w-4 h-4" />
              Live Demo — {theme.emoji} {theme.label} Mode
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              Your Events.{" "}
              <span
                className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}
              >
                Supercharged.
              </span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto mb-8 opacity-70">
              EventOS turns your venue into a revenue machine. See the difference in real-time — watch these numbers climb.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setShowStore(true)}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-black bg-gradient-to-r ${theme.gradient} hover:opacity-90 transition-all active:scale-95`}
              >
                <Play className="w-5 h-5" />
                Get EventOS Now
              </button>
              {onNavigate && (
                <button
                  onClick={() => onNavigate("booking")}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:opacity-80"
                  style={{ backgroundColor: "#ffffff11", color: theme.text }}
                >
                  Book a Demo <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </section>

        {/* Live Stats */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Live Tickets", value: liveTickets.toLocaleString(), icon: Users, suffix: "" },
              { label: "Tonight's Revenue", value: "$" + (liveRevenue / 1000).toFixed(1) + "K", icon: DollarSign, suffix: "LIVE" },
              { label: "Events This Month", value: "127", icon: BarChart2, suffix: "" },
              { label: "Avg Rating", value: "4.9★", icon: Star, suffix: "" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="rounded-xl p-5 border relative overflow-hidden"
                style={{ backgroundColor: theme.card, borderColor: theme.primary + "33" }}
                animate={stat.suffix === "LIVE" ? { borderColor: [theme.primary + "33", theme.primary + "99", theme.primary + "33"] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 opacity-60" style={{ color: theme.primary }} />
                  {stat.suffix && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded animate-pulse" style={{ backgroundColor: theme.primary, color: "#000" }}>
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black" style={{ color: theme.text }}>{stat.value}</div>
                <div className="text-xs opacity-50 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Battle: EventOS vs Manual */}
        <section>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black mb-2">EventOS vs. Doing It Manually</h2>
            <p className="opacity-60">The numbers don't lie</p>
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: theme.card, borderColor: theme.primary + "33" }}>
            <div className="grid grid-cols-3 text-center py-4 border-b" style={{ borderColor: theme.primary + "22" }}>
              <div className="font-bold opacity-50">Manual</div>
              <div className="font-bold" style={{ color: theme.primary }}>Metric</div>
              <div className="font-bold" style={{ color: theme.primary }}>EventOS ⚡</div>
            </div>
            {battleMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="grid grid-cols-3 text-center py-4 border-b last:border-0 items-center"
                style={{ borderColor: "#ffffff0a" }}
                animate={{
                  backgroundColor: i < battleStep ? theme.primary + "0a" : "transparent",
                }}
              >
                <div className="text-sm opacity-50 line-through">{metric.manual}</div>
                <div className="text-xs font-medium opacity-70">{metric.label}</div>
                <div className="text-sm font-bold flex items-center justify-center gap-1" style={{ color: theme.primary }}>
                  {metric.eventos}
                  {i < battleStep && <CheckCircle className="w-4 h-4" />}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Charts Row */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Revenue Comparison */}
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: theme.card, borderColor: theme.primary + "33" }}>
            <h3 className="font-bold mb-1">Revenue: Manual vs EventOS</h3>
            <p className="text-xs opacity-50 mb-4">Same events, 3.9x more revenue</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
                <XAxis dataKey="month" tick={{ fill: "#ffffff55", fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: "#ffffff55", fontSize: 11 }} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: theme.card, border: `1px solid ${theme.primary}33`, borderRadius: 8 }}
                  labelStyle={{ color: theme.text }}
                />
                <Area type="monotone" dataKey="manual" stroke="#ffffff33" fill="#ffffff0a" name="Manual" />
                <Area type="monotone" dataKey="eventos" stroke={theme.primary} fill={theme.primary + "33"} name="EventOS" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Ticket Velocity */}
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: theme.card, borderColor: theme.primary + "33" }}>
            <h3 className="font-bold mb-1">Ticket Sales Velocity</h3>
            <p className="text-xs opacity-50 mb-4">Tonight's event — selling faster than ever</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ticketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
                <XAxis dataKey="time" tick={{ fill: "#ffffff55", fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: "#ffffff55", fontSize: 11 }} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: theme.card, border: `1px solid ${theme.primary}33`, borderRadius: 8 }}
                  labelStyle={{ color: theme.text }}
                />
                <Bar dataKey="sold" fill={theme.primary} name="Tickets Sold" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* VIP Lounge */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-6 h-6" style={{ color: theme.primary }} />
            <div>
              <h2 className="text-2xl font-black">VIP Lounge</h2>
              <p className="text-sm opacity-50">Real-time guest management dashboard</p>
            </div>
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: theme.card, borderColor: theme.primary + "33" }}>
            <div className="grid grid-cols-5 text-xs font-bold uppercase opacity-50 px-6 py-3 border-b" style={{ borderColor: "#ffffff0a" }}>
              <span>Guest</span><span>Tier</span><span>Tonight's Spend</span><span>Table</span><span>Status</span>
            </div>
            {vipGuests.map((guest) => (
              <div key={guest.name} className="grid grid-cols-5 px-6 py-4 border-b items-center hover:bg-white/5 transition-colors" style={{ borderColor: "#ffffff08" }}>
                <span className="font-medium">{guest.name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold w-fit"
                  style={{
                    backgroundColor:
                      guest.tier === "Diamond" ? "#60A5FA22" :
                      guest.tier === "Platinum" ? "#A78BFA22" : "#FCD34D22",
                    color:
                      guest.tier === "Diamond" ? "#60A5FA" :
                      guest.tier === "Platinum" ? "#A78BFA" : "#FCD34D",
                  }}
                >
                  {guest.tier}
                </span>
                <span className="font-bold" style={{ color: theme.primary }}>{guest.spend}</span>
                <span className="text-sm opacity-70">{guest.table}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full w-fit font-medium"
                  style={{
                    backgroundColor:
                      guest.status === "arrived" ? "#22C55E22" :
                      guest.status === "en-route" ? "#F59E0B22" : "#6B728022",
                    color:
                      guest.status === "arrived" ? "#22C55E" :
                      guest.status === "en-route" ? "#F59E0B" : "#9CA3AF",
                  }}
                >
                  {guest.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2">Everything You Need</h2>
            <p className="opacity-60">One platform to run your entire event operation</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <motion.div
                key={f.title}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl p-6 border cursor-pointer transition-colors"
                style={{ backgroundColor: theme.card, borderColor: theme.primary + "22" }}
              >
                <f.icon className="w-8 h-8 mb-3" style={{ color: theme.primary }} />
                <h3 className="font-bold mb-1">{f.title}</h3>
                <p className="text-sm opacity-60">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Guest Satisfaction */}
        <section className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl font-black mb-4">Guest Satisfaction</h2>
            <p className="opacity-60 mb-6">
              EventOS doesn't just manage your event — it makes your guests love it. Seamless entry, instant updates, and personalized experiences.
            </p>
            <div className="space-y-3">
              {satisfactionData.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-sm w-20 opacity-70">{item.name}</span>
                  <div className="flex-1 rounded-full h-2" style={{ backgroundColor: "#ffffff11" }}>
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <span className="text-sm font-bold w-10 text-right">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: theme.card, borderColor: theme.primary + "33" }}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: theme.card, border: `1px solid ${theme.primary}33`, borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-2">
              <div className="text-4xl font-black" style={{ color: theme.primary }}>90%</div>
              <div className="text-sm opacity-60">Excellent + Good ratings</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="rounded-3xl p-12 text-center border"
          style={{ backgroundColor: theme.card, borderColor: theme.primary + "44" }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
            style={{ backgroundColor: theme.primary + "20", color: theme.primary }}
          >
            <Lock className="w-4 h-4" />
            Limited availability — serious venues only
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Ready to 4x Your{" "}
            <span className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Event Revenue?
            </span>
          </h2>
          <p className="text-lg opacity-70 mb-8 max-w-xl mx-auto">
            Join 200+ venues using EventOS. Get set up in 2 hours, not 2 days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setShowStore(true)}
              className={`flex items-center gap-2 px-10 py-4 rounded-xl font-black text-xl text-black bg-gradient-to-r ${theme.gradient} hover:opacity-90 transition-all active:scale-95`}
            >
              Get EventOS <ArrowRight className="w-6 h-6" />
            </button>
            {onNavigate && (
              <button
                onClick={() => onNavigate("booking")}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:opacity-80"
                style={{ backgroundColor: "#ffffff11", color: theme.text }}
              >
                Book Free Consultation
              </button>
            )}
          </div>
          <p className="mt-4 text-sm opacity-40">No contracts. Cancel anytime. Results in first event.</p>
        </section>
      </div>

      <AnimatePresence>
        {showStore && (
          <StorePanel
            theme={theme}
            onClose={() => setShowStore(false)}
            onBook={handleGetEventOS}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
