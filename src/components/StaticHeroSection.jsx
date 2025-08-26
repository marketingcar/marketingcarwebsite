import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';

// Static version for instant LCP - no animations
const StaticHeroSection = () => {
  const heroImageUrl = "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/fa6d981b4dffaf2b55e483e406049ee6.png";
  
  return (
    <section 
      id="home" 
      className="flex-grow flex items-center justify-center py-20 px-4 sm:px-8 text-center relative overflow-hidden min-h-[calc(100vh-100px)]"
    >
      <div className="absolute inset-0">
        <OptimizedImage
          src={heroImageUrl}
          alt="Abstract hero background showing a stylized roadmap or navigation interface with glowing lines and waypoints, symbolizing a journey to success."
          className="w-full h-full object-cover object-center"
          priority={true}
          width={1920}
          height={1080}
          fetchpriority="high"
          style={{aspectRatio: '16/9'}}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="h-[8rem] sm:h-[10rem] md:h-[12rem] flex items-center justify-center mb-6" style={{minHeight: '200px'}}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-heading mb-6 leading-tight text-foreground">
            <span className="block font-black">Steering Small Businesses</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-highlight to-secondary font-black">
              To Success
            </span>
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-body">
          We're your expert mechanics for marketing. Each part of our "car" propels your business forward, turning complexity into a smooth ride to your goals.
        </p>
        
        <div className="space-x-4">
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform duration-300 text-primary-foreground font-semibold" asChild>
            <Link to="/book-now">
              Ignite Your Growth <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StaticHeroSection;