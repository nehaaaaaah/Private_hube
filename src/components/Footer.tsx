import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/10 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground mb-3">
              nehaaaaaah.github.io
            </h3>
            <p className="text-foreground/70 text-sm font-paragraph">
              Premium personalized services designed for comfort and discretion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-heading font-semibold text-foreground mb-3">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <Link 
                to="/" 
                className="text-foreground/70 hover:text-primary text-sm font-paragraph transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-foreground/70 hover:text-primary text-sm font-paragraph transition-colors duration-200"
              >
                Services
              </Link>
              <Link 
                to="/about" 
                className="text-foreground/70 hover:text-primary text-sm font-paragraph transition-colors duration-200"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground/70 hover:text-primary text-sm font-paragraph transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-heading font-semibold text-foreground mb-3">
              Get in Touch
            </h4>
            <p className="text-foreground/70 text-sm font-paragraph mb-2">
              For inquiries and bookings, please visit our contact page.
            </p>
            <Link 
              to="/contact" 
              className="text-primary hover:text-primary/80 text-sm font-paragraph transition-colors duration-200 inline-block"
            >
              Contact Us →
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-foreground/10 text-center">
          <p className="text-foreground/60 text-sm font-paragraph">
            © 2026 nehaaaaaah.github.io. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
