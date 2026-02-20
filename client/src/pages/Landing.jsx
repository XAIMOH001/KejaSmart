import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building, Shield, BarChart3, Smartphone, ArrowRight, CheckCircle, Phone } from "lucide-react";


import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const features = [
  { icon: Building, title: "Property Management", desc: "Add properties, units, and manage tenants from one dashboard." },
  { icon: Smartphone, title: "M-Pesa Payments", desc: "Tenants pay via Lipa na M-Pesa. Instant receipts and tracking." },
  { icon: BarChart3, title: "Financial Insights", desc: "Track rent collection, occupancy rates, and payment history." },
  { icon: Shield, title: "Secure & Reliable", desc: "Bank-level security for your property data and transactions." },
];

const Landing = () => {
  const navigate = useNavigate();
  const [loginRole, setLoginRole] = useState("landlord");
  const [isSignup, setIsSignup] = useState(false);
  const [tenantPhone, setTenantPhone] = useState("");
  const [phoneMatched, setPhoneMatched] = useState(false);

  // pre-registered tenants 
  const PRE_REGISTERED = {
    "0712345678": { building: "Sunrise Apartments", unit: "A104" },
    "0798765432": { building: "Green Valley Courts", unit: "B201" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && loginRole === "tenant") {
      const match = PRE_REGISTERED[tenantPhone.replace(/\s/g, "")];
      if (match) {
        setPhoneMatched(true);
        setTimeout(() => navigate("/tenant"), 2200);
        return;
      }
    }
    navigate(loginRole === "landlord" ? "/landlord" : "/tenant");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav_sec */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Building className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">KejaSmart</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <Button size="sm" onClick={() => document.getElementById("auth-section")?.scrollIntoView({ behavior: "smooth" })}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero_Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-success" />
          Trusted by 500+ landlords across Kenya
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground max-w-3xl mx-auto leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Manage Properties. <br />
          <span className="text-gradient-hero">Collect Rent Smarter.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          The all-in-one platform for Kenyan landlords. Track units, collect rent via M-Pesa, and keep tenants happy — all from your phone.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="bg-gradient-hero shadow-hero" onClick={() => document.getElementById("auth-section")?.scrollIntoView({ behavior: "smooth" })}>
            Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/landlord")}>
            View Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={f.title} className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-elevated transition-shadow animate-fade-in" style={{ animationDelay: `${0.1 * i}s` }}>
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* USer Authorization */}
      <section id="auth-section" className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-card rounded-2xl shadow-elevated border border-border p-8">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-6">
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>

          <Tabs value={loginRole} onValueChange={(v) => setLoginRole(v)} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="landlord">Landlord</TabsTrigger>
              <TabsTrigger value="tenant">Tenant</TabsTrigger>
            </TabsList>
            
            <TabsContent value={loginRole}>
              {phoneMatched ? (
                <div className="text-center py-6 animate-fade-in space-y-3">
                  <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7 text-success" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">Welcome to Sunrise Apartments!</h3>
                  <p className="text-muted-foreground text-sm">We found your pre-registration for <strong>Unit A104</strong>. Logging you in…</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignup && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Kamau" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  {isSignup && loginRole === "tenant" && (
                    <div className="space-y-2">
                      <Label htmlFor="phone">M-Pesa Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          className="pl-9"
                          placeholder="07XXXXXXXX"
                          value={tenantPhone}
                          onChange={(e) => setTenantPhone(e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">We'll use this to instantly link you to your unit.</p>
                    </div>
                  )}
                  <Button type="submit" className="w-full bg-gradient-hero shadow-hero">
                    {isSignup ? "Create Account" : "Sign In"} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>

          {!phoneMatched && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-medium hover:underline">
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <span>© 2026 KejaSmart. Built for Kenya.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;