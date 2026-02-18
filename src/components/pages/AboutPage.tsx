import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Award, Users, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Animated reveal component
const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('is-visible');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  
  return (
    <div 
      ref={ref} 
      className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700 ease-out`}
      style={{
        transitionProperty: 'opacity, transform'
      }}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      {children}
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-foreground/5 to-background overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5 -z-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                About Us
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 font-paragraph leading-relaxed">
                We specialize in providing exclusive private experiences that prioritize your comfort, privacy, and satisfaction.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 md:p-16 border border-primary/20">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 text-center">
                  Our Mission
                </h2>
                <p className="text-lg text-foreground/80 font-paragraph leading-relaxed text-center">
                  To deliver unparalleled personalized services that exceed expectations while maintaining the highest standards of discretion and professionalism. We believe every client deserves an experience tailored specifically to their unique preferences and requirements.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-background to-foreground/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-16">
              Our Core Values
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <AnimatedElement delay={100}>
              <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-foreground/10 hover:scale-105 transition-all duration-300 border border-foreground/10 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Shield className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Discretion
                </h3>
                <p className="text-foreground/70 font-paragraph">
                  Your privacy is paramount. We ensure complete confidentiality in all our services.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-foreground/10 hover:scale-105 transition-all duration-300 border border-foreground/10 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Heart className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Comfort
                </h3>
                <p className="text-foreground/70 font-paragraph">
                  We create environments where you can relax and enjoy your experience fully.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-foreground/10 hover:scale-105 transition-all duration-300 border border-foreground/10 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Award className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Excellence
                </h3>
                <p className="text-foreground/70 font-paragraph">
                  Premium quality in every detail, from service to presentation.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-foreground/10 hover:scale-105 transition-all duration-300 border border-foreground/10 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Personalization
                </h3>
                <p className="text-foreground/70 font-paragraph">
                  Every experience is tailored to your specific preferences and needs.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
                Our Approach
              </h2>
            </AnimatedElement>

            <div className="space-y-8">
              <AnimatedElement delay={100}>
                <div className="bg-foreground/5 rounded-2xl p-8 border border-foreground/10 hover:bg-foreground/10 transition-all duration-300">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Understanding Your Needs
                  </h3>
                  <p className="text-foreground/80 font-paragraph leading-relaxed">
                    We begin by listening carefully to your requirements and preferences. Every client is unique, and we take the time to understand what matters most to you.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div className="bg-foreground/5 rounded-2xl p-8 border border-foreground/10 hover:bg-foreground/10 transition-all duration-300">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Tailored Solutions
                  </h3>
                  <p className="text-foreground/80 font-paragraph leading-relaxed">
                    Based on your needs, we craft personalized experiences that align perfectly with your expectations. No two experiences are exactly alike.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <div className="bg-foreground/5 rounded-2xl p-8 border border-foreground/10 hover:bg-foreground/10 transition-all duration-300">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Continuous Excellence
                  </h3>
                  <p className="text-foreground/80 font-paragraph leading-relaxed">
                    We maintain the highest standards throughout your experience, ensuring every moment meets our commitment to quality and your satisfaction.
                  </p>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-foreground/5 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 md:p-16 text-center border border-primary/20 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Experience the Difference
              </h2>
              <p className="text-foreground/80 font-paragraph text-lg mb-8 max-w-2xl mx-auto">
                Discover how our commitment to excellence and discretion can transform your experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-background px-8 py-4 rounded-full font-paragraph font-semibold text-lg hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  View Services
                  <ArrowRight size={20} />
                </Link>
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-foreground/5 text-foreground px-8 py-4 rounded-full font-paragraph font-semibold text-lg hover:bg-foreground/10 hover:scale-105 transition-all duration-300 border border-foreground/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
