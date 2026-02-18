import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-foreground/80 font-paragraph">
                Have questions or ready to book? We&apos;re here to help you create your perfect experience.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <AnimatedElement>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <p className="text-foreground/80 font-paragraph text-lg leading-relaxed mb-8">
                    Reach out to us through any of the following channels. We prioritize your privacy and will respond to all inquiries with complete discretion.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 bg-foreground/5 rounded-2xl p-6 hover:bg-foreground/10 transition-all duration-300 border border-foreground/10">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                        Email
                      </h3>
                      <p className="text-foreground/70 font-paragraph">
                        contact@nehaaaaaah.github.io
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-foreground/5 rounded-2xl p-6 hover:bg-foreground/10 transition-all duration-300 border border-foreground/10">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                        Phone
                      </h3>
                      <p className="text-foreground/70 font-paragraph">
                        Available upon request
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-foreground/5 rounded-2xl p-6 hover:bg-foreground/10 transition-all duration-300 border border-foreground/10">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                        Location
                      </h3>
                      <p className="text-foreground/70 font-paragraph">
                        Services available by appointment
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    Privacy Guarantee
                  </h3>
                  <p className="text-foreground/80 font-paragraph text-sm">
                    All inquiries are handled with the utmost confidentiality. Your information will never be shared with third parties.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            {/* Contact Form */}
            <AnimatedElement delay={200}>
              <div className="bg-foreground/5 rounded-3xl p-8 md:p-10 border border-foreground/10">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>

                {submitSuccess && (
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
                    <p className="text-primary font-paragraph font-semibold">
                      Thank you for your message! We&apos;ll get back to you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-foreground font-paragraph font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-background border border-foreground/20 rounded-xl px-4 py-3 text-foreground font-paragraph focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-foreground font-paragraph font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-background border border-foreground/20 rounded-xl px-4 py-3 text-foreground font-paragraph focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-foreground font-paragraph font-semibold mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-background border border-foreground/20 rounded-xl px-4 py-3 text-foreground font-paragraph focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-foreground font-paragraph font-semibold mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-background border border-foreground/20 rounded-xl px-4 py-3 text-foreground font-paragraph focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a service</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Request</option>
                      <option value="custom">Custom Experience</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-foreground font-paragraph font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-background border border-foreground/20 rounded-xl px-4 py-3 text-foreground font-paragraph focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-background px-8 py-4 rounded-full font-paragraph font-semibold text-lg hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
