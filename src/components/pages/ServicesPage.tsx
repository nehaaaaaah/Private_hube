import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
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

export default function ServicesPage() {
  const [services, setServices] = useState<ExclusiveServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<ExclusiveServices>('exclusiveservices');
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(services.map(s => s.category).filter(Boolean)))];

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = !searchTerm || 
      service.serviceTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-foreground/5 to-background overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5 -z-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                Our Exclusive Services
              </h1>
              <p className="text-xl text-foreground/80 font-paragraph">
                Discover premium personalized experiences tailored to your preferences
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-background border-b border-foreground/10">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-full pl-12 pr-4 py-3 text-foreground font-paragraph focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="text-foreground/60" size={20} />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-paragraph text-sm transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary text-background font-semibold'
                        : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? null : filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service, index) => (
                  <AnimatedElement key={service._id} delay={index * 50}>
                    <Link 
                      to={`/services/${service._id}`}
                      className="group block bg-foreground/5 rounded-2xl overflow-hidden hover:bg-foreground/10 hover:scale-105 transition-all duration-300 border border-foreground/10 h-full"
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
                        <p className="text-foreground/70 font-paragraph mb-4 line-clamp-3">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
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
              <div className="text-center py-20">
                <p className="text-foreground/60 font-paragraph text-lg">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'No services match your search criteria.' 
                    : 'No services available at the moment.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
