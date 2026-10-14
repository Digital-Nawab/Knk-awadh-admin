import {
  Dumbbell,
  Eye,
  Flame,
  Flower2,
  Gem,
  HeartPulse,
  Leaf,
  Scissors,
  Smile,
  Sparkles,
  Sun,
  Sunrise,
  Syringe,
  Waves,
  Wind,
  Zap,
  type LucideIcon,
  Droplet,
  Droplets,
} from "lucide-react";

/**
 * One representative icon per catalogue category/group, used as a placeholder-image accent
 * until real per-treatment photography exists (see TreatmentCard.tsx). Picked for rough
 * semantic fit, not clinical precision — swap freely if the client wants different icons.
 */
export const CATEGORY_ICON: Record<string, LucideIcon> = {
  "skin-rejuvenation": Sparkles,
  peels: Droplet,
  "acne-scar-management": Sun,
  pigmentation: Sun,
  "advanced-skkin-treatments": Syringe,
  "anti-ageing": Gem,
  "hydra-bar": Droplets,
  "minor-procedures": Scissors,
  "stretch-marks": Waves,
  "weight-management": Dumbbell,
  "body-contouring": Flame,
  "iv-wellness-infusions": HeartPulse,
  hair: Wind,
  "laser-hair-reduction": Zap,
  laser: Zap,
  "lip-hyperpigmentation": Smile,
  "under-eye-pigmentation": Eye,
  "red-light-therapy": Sunrise,
  "pre-bridal": Flower2,
  "targeted-injections": Syringe,
  // Wellness page slugs (distinct from the Treatments page slugs above, used by the same nav component).
  "iv-wellness": HeartPulse,
  "recovery-regeneration": Wind,
  "body-wellness": Leaf,
  "wellness-spa": Flower2,
};

export const DEFAULT_ICON: LucideIcon = Sparkles;
