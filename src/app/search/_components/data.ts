const subCategoriesFilterData = {
  GPU: {
    brands: ["MSI", "Gigabyte", "Asus", "Zotac", "EVGA"],
    subcategories: {
      Manufacturer: ["Nvidia", "AMD"],
      Series: ["RTX", "GTX", "RX"],
      Tier: ["Enthusiast", "High-end", "Mid-range", "Low-end"],
    },
  },
  CPU: {
    brands: ["Intel", "AMD"],
    subcategories: {
      Series: [
        "Core i3",
        "Core i5",
        "Core i7",
        "Core i9",
        "Ryzen 5",
        "Ryzen 7",
        "Ryzen 9",
      ],
      Tier: ["Entry-Level", "Mid-Range", "High-End", "Enthusiast"],
    },
  },
  Motherboard: {
    brands: ["MSI", "ASUS", "ASRock"],
    subcategories: {
      Compatible_CPU: ["Intel", "AMD"], // Renamed from Manufacturer
      Series: ["LGA1700", "B550", "B450", "AM4", "AM5"],
      Tier: ["Entry-Level", "Budget", "Mid-Range", "High-End"],
    },
  },
  RAM: {
    brands: ["Corsair", "G.Skill", "Team Group", "Kingston", "Crucial"],
    subcategories: {
      Capacity: ["8GB", "16GB", "32GB"], // Based on the RAM capacities
      Speed: ["Low Speed", "Medium Speed", "High Speed"], // Based on the speed ratings
      Type: ["DDR3", "DDR4", "DDR5"], // Based on the RAM types
    },
  },
  Storage: {
    brands: ["Samsung", "Seagate", "Crucial", "Kingston", "Western Digital"],
    subcategories: {
      Type: ["SSD", "HDD"], // Main storage types
      FormFactor: ["M.2 SSD", "3.5-inch HDD", "PCIe SSD"], // Specific form factors
    },
  },
  Accessories: {
    brands: ["Logitech", "Razer", "Corsair", "SteelSeries", "HyperX", "Sony"],
    subcategories: {
      Type: ["Keyboard", "Mouse", "Headphone"],
      Connection: ["Wired", "Wireless"],
    },
  },
};

export default subCategoriesFilterData;
