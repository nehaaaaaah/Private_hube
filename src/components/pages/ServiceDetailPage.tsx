import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, Tag } from 'lucide-react';
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

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<ExclusiveServices | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadService();
    }
  }, [id]);

  const loadService = async () => {
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<ExclusiveServices>('exclusiveservices', id!);
      setService(data);
    } catch (error) {
      console.error('Error loading service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !service ? (
          <div className="container mx-auto px-4 py-32 text-center">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Service Not Found
            </h2>
            <p className="text-foreground/70 font-paragraph mb-8">
              The service you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link 
              to="/services"
              className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-full font-paragraph font-semibold hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft size={20} />
              Back to Services
            </Link>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="relative py-12 bg-gradient-to-b from-foreground/5 to-background">
              <div className="container mx-auto px-4">
                <AnimatedElement>
                  <Link 
                    to="/services"
                    className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary font-paragraph mb-8 transition-colors duration-200"
                  >
                    <ArrowLeft size={20} />
                    Back to Services
                  </Link>
                </AnimatedElement>
              </div>
            </section>

            {/* Service Content */}
            <section className="py-8 bg-background">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image */}
                    {service.mainImage && (
                      <AnimatedElement>
                        <div className="rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
                          <Image src={service.mainImage} alt={service.serviceTitle || 'Service'} className="w-full h-full object-cover aspect-square" />
                        </div>
                      </AnimatedElement>
                    )}

                    {/* Details */}
                    <AnimatedElement delay={200}>
                      <div className="space-y-6">
                        {service.category && (
                          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-paragraph font-semibold">
                            {service.category}
                          </span>
                        )}

                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                          {service.serviceTitle}
                        </h1>

                        <div className="flex flex-wrap gap-6 py-6 border-y border-foreground/10">
                          {service.startingPrice && (
                            <div className="flex items-center gap-2">
                              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                                <DollarSign className="text-primary" size={20} />
                              </div>
                              <div>
                                <p className="text-foreground/60 text-sm font-paragraph">Starting Price</p>
                                <p className="text-foreground font-paragraph font-semibold">${service.startingPrice}</p>
                              </div>
                            </div>
                          )}

                          {service.duration && (
                            <div className="flex items-center gap-2">
                              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                                <Clock className="text-primary" size={20} />
                              </div>
                              <div>
                                <p className="text-foreground/60 text-sm font-paragraph">Duration</p>
                                <p className="text-foreground font-paragraph font-semibold">{service.duration}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {service.description && (
                          <div>
                            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                              Description
                            </h2>
                            <p className="text-foreground/80 font-paragraph text-lg leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        )}

                        <div className="pt-6">
                          <Link 
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-full font-paragraph font-semibold text-lg hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                          >
                            Book This Service
                          </Link>
                        </div>
                      </div>
                    </AnimatedElement>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Info Section */}
            <section className="py-20 bg-gradient-to-b from-background to-foreground/5">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  <AnimatedElement>
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12 border border-primary/20">
                      <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                        What to Expect
                      </h2>
                      <div className="space-y-4 text-foreground/80 font-paragraph">
                        <p className="leading-relaxed">
                          This exclusive experience is designed with your comfort and satisfaction in mind. Every detail is carefully planned to ensure a premium, personalized service.
                        </p>
                        <p className="leading-relaxed">
                          We maintain the highest standards of discretion and professionalism throughout your experience. Your privacy is our priority.
                        </p>
                        <p className="leading-relaxed">
                          For booking inquiries or to discuss customization options, please contact us through our contact page.
                        </p>
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
