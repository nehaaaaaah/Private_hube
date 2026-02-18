import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ExclusiveServices } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';

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

export default function HomePage() {
  const [services, setServices] = useState<ExclusiveServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<ExclusiveServices>('exclusiveservices', [], { limit: 3 });
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <AnimatedElement>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6">
              Exclusive Private Experiences
            </h1>
          </AnimatedElement>
          
          <AnimatedElement delay={200}>
            <p className="text-xl md:text-2xl text-foreground/80 font-paragraph mb-10 max-w-3xl mx-auto">
              Premium personalized services designed for comfort and discretion.
            </p>
          </AnimatedElement>
          
          <AnimatedElement delay={400}>
            <Link 
              to="/services"
              className="inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-full font-paragraph font-semibold text-lg hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              View Services
              <ArrowRight size={20} />
            </Link>
          </AnimatedElement>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-foreground/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-16">
              Why Choose Us
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedElement delay={100}>
              <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-foreground/10 hover:scale-105 transition-all duration-300 border border-foreground/10">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Shield className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Complete Discretion
                </h3>
                <p className="text-foreground/70 font-paragraph">
                  Your privacy is our top priority. All services are conducted with the utmost confidentiality and professionalism.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-foreground/10 hover:scale-105 transition-all duration-300 border border-foreground/10">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Star className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Premium Quality
                </h3>
                <p className="text-foreground/70 font-paragraph">
                  Experience exceptional service tailored to your unique preferences and requirements.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-foreground/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-foreground/10 hover:scale-105 transition-all duration-300 border border-foreground/10">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Clock className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Flexible Scheduling
                </h3>
                <p className="text-foreground/70 font-paragraph">
                  Book services at your convenience with flexible timing options to suit your lifestyle.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Featured Services
              </h2>
              <p className="text-foreground/70 font-paragraph text-lg max-w-2xl mx-auto">
                Discover our carefully curated selection of exclusive experiences
              </p>
            </div>
          </AnimatedElement>

          <div className="min-h-[400px]">
            {isLoading ? null : services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <AnimatedElement key={service._id} delay={index * 100}>
                    <Link 
                      to={`/services/${service._id}`}
                      className="group block bg-foreground/5 rounded-2xl overflow-hidden hover:bg-foreground/10 hover:scale-105 transition-all duration-300 border border-foreground/10"
                    >
                      {service.mainImage && (
                        <div className="aspect-video overflow-hidden">
                          <Image src={service.mainImage} alt={service.serviceTitle || 'Service'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-6">
                        {service.category && (
                          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-paragraph mb-3">
                            {service.category}
                          </span>
                        )}
                        <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                          {service.serviceTitle}
                        </h3>
                        <p className="text-foreground/70 font-paragraph mb-4 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          {service.startingPrice && (
                            <span className="text-primary font-semibold font-paragraph">
                              From ${service.startingPrice}
                            </span>
                          )}
                          {service.duration && (
                            <span className="text-foreground/60 text-sm font-paragraph">
                              {service.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-foreground/60 font-paragraph text-lg">
                  No services available at the moment.
                </p>
              </div>
            )}
          </div>

          {!isLoading && services.length > 0 && (
            <AnimatedElement delay={400}>
              <div className="text-center mt-12">
                <Link 
                  to="/services"
                  className="inline-flex items-center gap-2 bg-foreground/5 text-foreground px-6 py-3 rounded-full font-paragraph font-semibold hover:bg-foreground/10 hover:scale-105 transition-all duration-300 border border-foreground/10"
                >
                  View All Services
                  <ArrowRight size={18} />
                </Link>
              </div>
            </AnimatedElement>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-foreground/5 to-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 md:p-16 text-center border border-primary/20">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Ready to Experience Excellence?
              </h2>
              <p className="text-foreground/80 font-paragraph text-lg mb-8 max-w-2xl mx-auto">
                Get in touch with us today to discuss your requirements and book your exclusive experience.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-full font-paragraph font-semibold text-lg hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                Contact Us
                <ArrowRight size={20} />
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
