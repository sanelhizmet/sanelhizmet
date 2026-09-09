export type Brand = {
  id: string;
  name: string;
};

/** Klozet / rezervuar */
export const klozetBrands: Brand[] = [
  { id: "geberit", name: "Geberit" },
  { id: "vitra", name: "VitrA" },
  { id: "nkp", name: "NKP" },
  { id: "eca", name: "E.C.A." },
  { id: "serel", name: "SEREL" },
  { id: "creavit", name: "creavit" },
  { id: "kale", name: "Kale" },
  { id: "grohe", name: "GROHE" },
  { id: "siamp", name: "SIAMP" },
  { id: "visam", name: "VISAM" },
  { id: "sanica", name: "SANICA" },
  { id: "japar", name: "Japar" },
  { id: "valsir", name: "valsir" },
  { id: "schwab", name: "SCHWAB" },
  { id: "tece", name: "TECE" },
  { id: "bocchi", name: "BOCCHI" },
];

/** Fayans / seramik */
export const fayansBrands: Brand[] = [
  { id: "etili", name: "Etili Seramik" },
  { id: "seramiksan", name: "Seramiksan" },
  { id: "ng-kutahya", name: "NG Kütahya" },
  { id: "canakkale", name: "Çanakkale Seramik" },
  { id: "kale", name: "Kale" },
  { id: "ege", name: "Ege Seramik" },
  { id: "duratiles", name: "Duratiles" },
  { id: "yurtbay", name: "Yurtbay Seramik" },
  { id: "bien", name: "Bien" },
  { id: "vitra", name: "VitrA" },
];

/** Dolap / mobilya */
export const mutfakBrands: Brand[] = [
  { id: "koctas", name: "Koçtaş" },
  { id: "ikea", name: "IKEA" },
  { id: "tekzen", name: "Tekzen" },
  { id: "bauhaus", name: "Bauhaus" },
  { id: "pratikler", name: "Pratikler" },
  { id: "evidea", name: "Evidea" },
  { id: "hepsiburada", name: "Hepsiburada" },
  { id: "trendyol", name: "Trendyol" },
  { id: "n11", name: "n11.com" },
  { id: "amazon", name: "Amazon" },
];

/** Sıhhi tesisat */
export const tesisatBrands: Brand[] = [
  { id: "turkoglu", name: "Türkoğlu" },
  { id: "tds", name: "TDS Tekneciler" },
  { id: "vesbo", name: "VESBO" },
  { id: "wavin", name: "Wavin Pilsa" },
  { id: "hakan", name: "Hakan Plastik" },
  { id: "kas", name: "KAS" },
  { id: "eca", name: "E.C.A." },
  { id: "dizayn", name: "Dizayn Grup" },
  { id: "kalde", name: "kalde" },
  { id: "firatboru", name: "Fıratboru" },
];

/** Musluk / batarya */
export const muslukBrands: Brand[] = [
  { id: "iteka", name: "Iteka" },
  { id: "franke", name: "Franke" },
  { id: "duravit", name: "Duravit" },
  { id: "ceravit", name: "Ceravit" },
  { id: "newarc", name: "Newarc" },
  { id: "geberit", name: "Geberit" },
  { id: "gpd", name: "GPD" },
  { id: "blanco", name: "Blanco" },
  { id: "kraus", name: "Kraus" },
];

/** Hizmet slug -> kayar marka listesi */
export const brandsByServiceSlug: Record<string, Brand[]> = {
  "rezervuar-klozet": klozetBrands,
  fayans: fayansBrands,
  mutfak: mutfakBrands,
  "sihhi-tesisat": tesisatBrands,
  "musluk-batarya": muslukBrands,
};
