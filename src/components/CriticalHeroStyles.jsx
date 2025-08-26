import React from 'react';

const CriticalHeroStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      /* Critical hero styles to prevent LCP delays */
      .hero-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 100px);
        padding: 5rem 1rem;
        text-align: center;
        overflow: hidden;
        background: #000;
      }
      
      .hero-background {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      
      .hero-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
      }
      
      .hero-content {
        position: relative;
        z-index: 10;
        max-width: 48rem;
        margin: 0 auto;
      }
      
      .hero-title-container {
        height: 8rem;
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
      }
      
      .hero-title {
        font-size: 3rem;
        font-weight: 900;
        line-height: 1.1;
        color: white;
        margin-bottom: 1.5rem;
      }
      
      .hero-subtitle {
        display: block;
        background: linear-gradient(to right, #3B82F6, #8B5CF6, #EC4899);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        font-weight: 900;
      }
      
      @media (min-width: 640px) {
        .hero-title-container {
          height: 10rem;
        }
        .hero-title {
          font-size: 3.75rem;
        }
      }
      
      @media (min-width: 768px) {
        .hero-title-container {
          height: 12rem;
        }
        .hero-title {
          font-size: 4.5rem;
        }
      }
    `
  }} />
);

export default CriticalHeroStyles;