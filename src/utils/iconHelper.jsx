import React from 'react';
import {
  TrendingUp, MapPin, Palette, Users, Sparkles, Lightbulb,
  Search, PenTool, Target, Heart, Mail, Monitor
} from 'lucide-react';

const iconMap = {
  TrendingUp,
  MapPin,
  Palette,
  Handshake: Users, // Using Users icon as alternative to Handshake for B2B
  Sparkles,
  Lightbulb,
  Search,
  PenTool,
  Target,
  Heart,
  Mail,
  Monitor,
};

export const getIcon = (iconName, className = "h-12 w-12 text-primary") => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found in iconMap`);
    return null;
  }
  return <IconComponent className={className} />;
};