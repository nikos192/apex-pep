export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  regularPrice: number;
  salePrice?: number;
  badge: string;
  description: string;
  bullets: string[];
  storage: string;
  shipping: string;
  dosageForm?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "reta-10mg",
    name: "RETA 10MG",
    slug: "reta-10mg",
    image: "/images/reta-10mg.png",
    regularPrice: 160,
    salePrice: 150,
    badge: "Research Grade",
    description:
      "Reta (Retatrutide) is a novel GLP-1/GIP/glucagon triple receptor agonist studied in preclinical research contexts. Researchers investigate this advanced peptide for its effects on multiple metabolic signaling pathways simultaneously, examining interactions with glucose homeostasis and energy metabolism mechanisms. In laboratory studies, this compound has demonstrated potential to influence cellular responses through three distinct receptor classes. Scientific literature shows researchers commonly examine triple agonists for understanding complex metabolic pathway interactions in controlled preclinical environments. This research peptide is intended exclusively for laboratory-based research applications by qualified researchers.",
    bullets: [
      "Triple receptor agonist research",
      "Researchers investigate metabolic pathway interactions",
      "Commonly examined in glucose signaling studies",
      "Used for complex mechanism analysis",
    ],
    storage: "Store at 2-8°C in sealed container away from light. Protect from freezing. Reconstituted solutions stable 7 days refrigerated.",
    shipping: "Express courier with temperature-controlled insulation. Delivery to Australian cities within 1-2 business days.",
    dosageForm: "Lyophilized powder, 10mg per vial",
  },
  {
    id: "bpc-157",
    name: "BPC-157",
    slug: "bpc-157",
    image: "/images/BPC-157.png",
    regularPrice: 100,
    salePrice: 90,
    badge: "Research Grade",
    description:
      "BPC-157 (Body Protection Compound-157) is a 15-amino acid peptide studied extensively in preclinical research contexts. Researchers investigate its role in tissue repair mechanisms, gastrointestinal function, and cellular signaling pathways. In laboratory studies, BPC-157 has demonstrated potential to influence multiple physiological processes through interactions with growth factors and cellular receptors. Scientific literature suggests researchers commonly examine this compound for its effects on wound healing, neurological signaling, and protective mechanisms in tissue cells. This research peptide is intended solely for in vitro studies and preclinical research applications conducted by qualified researchers in controlled laboratory environments.",
    bullets: [
      "Commonly studied for tissue repair mechanisms",
      "Researchers investigate gastrointestinal support pathways",
      "Examined in cellular protection research",
      "Often used in preclinical wound healing studies",
    ],
    storage: "Store at 2-8°C in original sealed container. Protect from light and moisture. Opened vials should be used within 30 days.",
    shipping: "Shipped via express courier in temperature-controlled packaging. Delivery to major Australian cities within 1-2 business days.",
    dosageForm: "Lyophilized powder, 5mg per vial",
  },
  {
    id: "bac-water-10ml",
    name: "BAC Water 10ML",
    slug: "bac-water-10ml",
    image: "/images/bac water 10ml.png",
    regularPrice: 40,
    salePrice: 30,
    badge: "Research Grade",
    description:
      "Bacteriostatic water (BAC) is a sterile, isotonic solution containing 0.9% benzyl alcohol as a preservative. Used extensively in laboratory and research settings for reconstitution of peptide compounds. BAC water maintains compound stability and prevents bacterial contamination during storage and use in preclinical studies. This solution is essential for researchers working with lyophilized peptides, providing a pharmaceutical-grade medium that preserves peptide integrity throughout experimental procedures. The 10ml volume is suitable for multiple reconstitutions in standard research laboratory applications.",
    bullets: [
      "Sterile, pharmaceutical-grade solution",
      "Bacteriostatic properties extend compound shelf-life",
      "Ideal for peptide reconstitution protocols",
      "Maintains compound stability in research applications",
    ],
    storage: "Store at room temperature (15-25°C). Keep sealed until use. Once opened, use within 7 days.",
    shipping: "Shipped at ambient temperature in secure packaging. No special temperature control required.",
    dosageForm: "Liquid solution, 10ml sterile vial",
  },
  {
    id: "bac-water-3ml",
    name: "BAC Water 3ML",
    slug: "bac-water-3ml",
    image: "/images/bac water 3ml.png",
    regularPrice: 30,
    salePrice: 20,
    badge: "Research Grade",
    description:
      "Bacteriostatic water in convenient 3ml size for smaller peptide reconstitution studies. This pharmaceutical-grade solution contains 0.9% benzyl alcohol preservative, making it ideal for laboratory research requiring smaller experimental batches. Perfect for researchers working with multiple peptide compounds or conducting dose-response studies in controlled environments. The smaller volume reduces waste while maintaining the same pharmaceutical-grade quality and sterility standards as larger preparations.",
    bullets: [
      "Compact size for controlled research batches",
      "Pharmaceutical-grade sterile solution",
      "Preservative formula prevents contamination",
      "Ideal for multiple reconstitution experiments",
    ],
    storage: "Store at room temperature (15-25°C). Keep sealed until use. Once opened, use within 7 days.",
    shipping: "Shipped at ambient temperature. No special handling required. Lightweight and compact.",
    dosageForm: "Liquid solution, 3ml sterile vial",
  },
  {
    id: "cjc-ipa",
    name: "CJC+IPA",
    slug: "cjc-ipa",
    image: "/images/cjc+ipa.png",
    regularPrice: 160,
    salePrice: 150,
    badge: "Research Grade",
    description:
      "CJC-1295 combined with Ipamorelin represents a synergistic peptide combination studied in preclinical research. Researchers investigate how these compounds interact to influence growth hormone-releasing pathways and cellular signaling mechanisms. In laboratory settings, this combination has demonstrated potential to stimulate GH secretion through distinct but complementary receptor pathways. Scientific literature suggests researchers commonly examine this dual-peptide formulation for its combined effects on growth hormone dynamics and metabolic signaling in controlled research environments. This product is intended exclusively for in vitro research and preclinical laboratory applications.",
    bullets: [
      "Synergistic growth hormone research studies",
      "Researchers investigate combined GHRH + GHRP effects",
      "Commonly examined in GH secretion research",
      "Used in preclinical metabolic pathway studies",
    ],
    storage: "Store at 2-8°C in original sealed container. Protect from light. Reconstituted solutions stable for 7 days refrigerated.",
    shipping: "Shipped via express courier in temperature-controlled insulated packaging. Delivery within 1-2 business days.",
    dosageForm: "Lyophilized powder combination",
  },
  {
    id: "ghk-cu-50mg",
    name: "GHK-CU 50MG",
    slug: "ghk-cu-50mg",
    image: "/images/ghkcu 50mg.png",
    regularPrice: 115,
    salePrice: 100,
    badge: "Research Grade",
    description:
      "GHK-Cu (glycine-histidine-lysine copper peptide) is extensively studied in preclinical research for its role in copper-dependent signaling pathways. Researchers investigate this tripeptide complex for its potential effects on tissue remodeling, cellular communication, and growth factor interactions. In laboratory studies, GHK-Cu has demonstrated interesting patterns in metalloproteinase regulation and collagen synthesis pathways. Scientific literature shows researchers commonly examine this peptide for its influence on wound healing mechanisms and skin cell behavior in controlled experimental contexts. This research compound is intended solely for laboratory-based preclinical studies.",
    bullets: [
      "Copper-dependent signaling research",
      "Commonly studied for tissue remodeling mechanisms",
      "Researchers investigate growth factor pathways",
      "Examined in cellular communication studies",
    ],
    storage: "Store at 2-8°C. Protect from light and strong oxidizers. Reconstituted peptide stable for 14 days refrigerated.",
    shipping: "Shipped via express courier in temperature-controlled packaging. Major Australian cities 1-2 business days.",
    dosageForm: "Lyophilized powder, 50mg per vial",
  },
  {
    id: "ghk-cu-100mg",
    name: "GHK-CU 100MG",
    slug: "ghk-cu-100mg",
    image: "/images/ghkcu-100mg.png",
    regularPrice: 170,
    salePrice: 160,
    badge: "Research Grade",
    description:
      "Larger 100mg format of GHK-Cu peptide for extended research programs and batch studies. This copper-containing tripeptide is studied broadly in preclinical research for its role in cellular signaling and tissue-related pathways. Researchers investigate GHK-Cu for its potential to influence multiple physiological mechanisms through copper-dependent enzymatic interactions. In controlled laboratory environments, this peptide has shown interesting effects on growth factor behavior and cellular communication networks. The larger format suits ongoing research protocols and comparative dosage studies in qualified research facilities.",
    bullets: [
      "Extended format for research programs",
      "Copper-peptide complex signaling research",
      "Commonly examined in preclinical protocols",
      "Studied for cellular process influences",
    ],
    storage: "Store at 2-8°C in sealed container. Protect from light and oxidative conditions. Reconstituted solutions stable 14 days cold.",
    shipping: "Express courier delivery in insulated temperature-controlled packaging. 1-2 business days within Australia.",
    dosageForm: "Lyophilized powder, 100mg per vial",
  },
  {
    id: "mt-1",
    name: "MT 1",
    slug: "mt-1",
    image: "/images/mt-1.png",
    regularPrice: 100,
    salePrice: 90,
    badge: "Research Grade",
    description:
      "MT-1 (Melanotan-1) is studied in preclinical research for its interactions with melanocortin receptor systems. Researchers investigate this synthetic peptide analog for effects on melanin production and receptor signaling in controlled laboratory settings. In scientific literature, MT-1 has been examined for its potential influence on pigmentation mechanisms and cellular responses to melanocortin pathway stimulation. Laboratory research suggests this compound affects multiple physiological processes through specific receptor interactions. This research peptide is intended exclusively for in vitro studies and preclinical research conducted by qualified laboratory professionals in controlled research environments.",
    bullets: [
      "Melanocortin receptor research studies",
      "Researchers investigate pigmentation pathways",
      "Commonly examined in receptor signaling research",
      "Used in preclinical cellular mechanism studies",
    ],
    storage: "Store at 2-8°C in sealed container away from light. Protect from temperature fluctuations. Reconstituted, use within 30 days.",
    shipping: "Shipped via express temperature-controlled courier. Delivery to major Australian cities within 1-2 business days.",
    dosageForm: "Lyophilized powder, 10mg per vial",
  },
  {
    id: "mt-2-10mg",
    name: "MT-2 10MG",
    slug: "mt-2-10mg",
    image: "/images/mt-2 10mg.png",
    regularPrice: 90,
    salePrice: 75,
    badge: "Research Grade",
    description:
      "MT-2 (Melanotan-II) is an extensively studied α-melanocyte-stimulating hormone (α-MSH) analog in preclinical research. Researchers investigate this peptide for its effects on melanocortin receptor activation and downstream signaling pathways in controlled laboratory environments. In scientific studies, MT-2 has demonstrated interesting interactions with melanin production mechanisms and cellular receptors. Laboratory research suggests researchers commonly examine this compound for its influence on pigmentation responses and melanocortin pathway effects in preclinical contexts. This research peptide is intended solely for in vitro studies and laboratory-based research applications.",
    bullets: [
      "MSH analog receptor research",
      "Commonly studied melanocortin pathways",
      "Researchers investigate pigmentation signaling",
      "Examined in cellular response mechanisms",
    ],
    storage: "Store at 2-8°C in sealed, light-protected container. Freeze dried form more stable. Reconstituted, use within 30 days.",
    shipping: "Express temperature-controlled courier delivery. 1-2 business days to major Australian cities.",
    dosageForm: "Lyophilized powder, 10mg per vial",
  },
  {
    id: "reta-10x-ghk-10x",
    name: "RETA X10, GHK X10 (MEGA DEAL!)",
    slug: "reta-10x-ghk-10x",
    image: "/images/reta 10x, ghk 10x (mega deal).png",
    regularPrice: 2600,
    salePrice: 1250,
    badge: "Research Grade",
    description:
      "Comprehensive peptide research bundle combining 10 vials of Reta-10MG with 10 vials of GHK-Cu for extended preclinical research programs. This bundle supports comparative studies examining growth hormone-releasing pathways alongside copper-dependent signaling mechanisms. Researchers commonly use such combinations to investigate interactive effects between different peptide classes in controlled laboratory environments. The bundled format provides cost efficiency for long-term research protocols, reducing per-vial expenses while maintaining access to high-purity research compounds. Ideal for institutions conducting comprehensive preclinical studies on multiple peptide mechanisms.",
    bullets: [
      "Comprehensive dual-peptide research bundle",
      "Supports comparative pathway studies",
      "Reduces cost for extended protocols",
      "Enables mechanistic interaction research",
    ],
    storage: "Store both components at 2-8°C in sealed containers. Protect from light and temperature fluctuations.",
    shipping: "Shipped as complete bundle in insulated temperature-controlled packaging. Delivery within 1-2 business days.",
    dosageForm: "Dual bundle: 10x Reta-10MG + 10x GHK-Cu vials",
  },
  
  {
    id: "semax-11mg",
    name: "SEMAX 11MG",
    slug: "semax-11mg",
    image: "/images/semax 11mg.png",
    regularPrice: 130,
    salePrice: 95,
    badge: "Research Grade",
    description:
      "Semax is a synthetic hexapeptide studied in preclinical research for its effects on ACTH-related signaling pathways and neurological mechanisms. Researchers investigate this compound for its potential influence on cognitive signaling, neuronal protection, and cellular communication in controlled laboratory environments. In scientific literature, Semax has demonstrated interesting patterns in neural cell behavior and neuropeptide interactions. Laboratory research suggests researchers commonly examine this peptide for its effects on memory-related pathways and neurological signaling in preclinical contexts. This research compound is intended exclusively for in vitro studies and laboratory-based research applications.",
    bullets: [
      "ACTH fragment precursor research",
      "Commonly studied for neurological pathways",
      "Researchers investigate cognitive signaling",
      "Examined in neuropeptide mechanism studies",
    ],
    storage: "Store at 2-8°C in sealed, light-protected container. Reconstituted peptide stable for 14 days refrigerated.",
    shipping: "Temperature-controlled express courier delivery. 1-2 business days to major Australian cities.",
    dosageForm: "Lyophilized powder, 11mg per vial",
  },
  {
    id: "tb-500-10mg",
    name: "TB-500 10MG",
    slug: "tb-500-10mg",
    image: "/images/tb-500-10mg.png",
    regularPrice: 130,
    salePrice: 120,
    badge: "Research Grade",
    description:
      "TB-500 (Thymosin Beta 4) is a naturally occurring peptide extensively studied in preclinical research for its roles in cellular signaling and tissue-related pathways. Researchers investigate this 43-amino acid peptide for its potential effects on wound healing mechanisms, cellular migration, and angiogenesis processes in controlled laboratory settings. In scientific literature, TB-500 has demonstrated interesting interactions with actin-related proteins and multiple growth factors. Laboratory research suggests researchers commonly examine this peptide for its influence on tissue repair and cellular protection mechanisms in preclinical research contexts. This research peptide is intended solely for in vitro studies by qualified laboratory researchers.",
    bullets: [
      "Naturally occurring thymosin research",
      "Researchers investigate wound healing pathways",
      "Commonly studied for tissue repair mechanisms",
      "Examined in cellular migration studies",
    ],
    storage: "Store at 2-8°C in sealed container protected from light. Reconstituted solutions stable for 14 days refrigerated.",
    shipping: "Express courier with temperature-controlled insulated packaging. Delivery within 1-2 business days in Australia.",
    dosageForm: "Lyophilized powder, 10mg per vial",
  },
];
export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(excludeSlug: string, count: number = 4): Product[] {
  return PRODUCTS.filter((p) => p.slug !== excludeSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

export function formatAUD(price: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(price);
}
