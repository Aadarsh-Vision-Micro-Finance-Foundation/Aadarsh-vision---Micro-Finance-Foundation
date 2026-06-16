import {
  HandCoins, Users, BookOpen, Store, PiggyBank,
  Landmark, TrendingUp, ShieldCheck, Lock, Zap,
  Wallet, MapPin, Star, FileEdit, ClipboardCheck, BadgeCheck, Banknote,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';

export const iconMap: Record<string, ComponentType<LucideProps>> = {
  HandCoins,
  Users,
  BookOpen,
  Store,
  PiggyBank,
  Landmark,
  TrendingUp,
  ShieldCheck,
  Lock,
  Zap,
  Wallet,
  MapPin,
  Star,
  FileEdit,
  ClipboardCheck,
  BadgeCheck,
  Banknote,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const Icon = iconMap[name] ?? Star;
  return <Icon {...props} />;
};

export default DynamicIcon;
