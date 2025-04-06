
import { Gene } from './types';

// Mock gene data for our application
export const mockGenes: Gene[] = [
  {
    id: "ENSG00000139618",
    symbol: "BRCA2",
    name: "Breast Cancer 2",
    description: "This gene encodes a protein involved in DNA repair mechanisms and plays a crucial role in maintaining genomic stability. Mutations in this gene are associated with an increased risk of breast and ovarian cancer.",
    chromosome: "13",
    location: "13q13.1",
    type: "protein-coding",
    organism: "Homo sapiens",
    function: "DNA repair, homologous recombination, cell cycle regulation",
    diseases: ["Breast cancer", "Ovarian cancer", "Fanconi anemia"],
    expression: {
      level: "medium",
      tissues: ["Breast", "Ovary", "Testis"]
    },
    genomic_context: {
      start: 32889611,
      end: 32973805,
      strand: "+",
      exons: [
        { start: 32889611, end: 32889805 },
        { start: 32890559, end: 32890664 },
        { start: 32893213, end: 32893462 },
        { start: 32899212, end: 32899321 },
        { start: 32900238, end: 32900287 },
        { start: 32900379, end: 32900419 },
        { start: 32900636, end: 32900750 },
        { start: 32903579, end: 32903629 },
        { start: 32905055, end: 32905167 },
        { start: 32906408, end: 32907524 },
        { start: 32910402, end: 32915333 },
        { start: 32918694, end: 32918790 },
        { start: 32920963, end: 32921033 },
        { start: 32928997, end: 32929425 },
        { start: 32930564, end: 32930746 },
        { start: 32931878, end: 32932066 },
        { start: 32936659, end: 32936830 },
        { start: 32937315, end: 32937670 },
        { start: 32944538, end: 32944694 },
        { start: 32945092, end: 32945237 },
        { start: 32950806, end: 32950928 },
        { start: 32953453, end: 32953652 },
        { start: 32953886, end: 32954050 },
        { start: 32954144, end: 32954282 },
        { start: 32968825, end: 32969070 },
        { start: 32971034, end: 32971181 },
        { start: 32972298, end: 32973805 }
      ]
    },
    structures: [
      {
        id: "1N0W",
        title: "BRCA2 BRC repeat 4 bound to RAD51",
        method: "X-ray diffraction",
        resolution: "1.7Å",
        url: "https://files.rcsb.org/download/1N0W.pdb",
        thumbnail: "https://cdn.rcsb.org/images/structures/n0/1n0w/1n0w_assembly-1.jpeg"
      },
      {
        id: "1MIU",
        title: "BRCA2 BRC repeat in complex with RAD51",
        method: "X-ray diffraction",
        resolution: "2.6Å",
        url: "https://files.rcsb.org/download/1MIU.pdb",
        thumbnail: "https://cdn.rcsb.org/images/structures/mi/1miu/1miu_assembly-1.jpeg"
      }
    ],
    references: [
      {
        id: "15740498",
        title: "Structural basis for recognition of BRCA2 by DSS1",
        authors: "Yang H, Jeffrey PD, Miller J, Kinnucan E, Sun Y, Thoma NH, Zheng N, Chen PL, Lee WH, Pavletich NP",
        journal: "Science",
        year: 2002,
        url: "https://pubmed.ncbi.nlm.nih.gov/12228710/"
      }
    ]
  },
  {
    id: "ENSG00000141510",
    symbol: "TP53",
    name: "Tumor Protein p53",
    description: "TP53 encodes a tumor suppressor protein containing transcriptional activation, DNA binding, and oligomerization domains. It responds to diverse cellular stresses to regulate expression of target genes, thereby inducing cell cycle arrest, apoptosis, senescence, DNA repair, or changes in metabolism.",
    chromosome: "17",
    location: "17p13.1",
    type: "protein-coding",
    organism: "Homo sapiens",
    function: "Tumor suppression, cell cycle regulation, apoptosis induction",
    diseases: ["Li-Fraumeni syndrome", "Various cancers", "Adrenocortical carcinoma"],
    expression: {
      level: "high",
      tissues: ["Ubiquitous"]
    },
    genomic_context: {
      start: 7668402,
      end: 7687538,
      strand: "-",
      exons: [
        { start: 7687377, end: 7687538 },
        { start: 7676233, end: 7676307 },
        { start: 7676037, end: 7676130 },
        { start: 7675233, end: 7675301 },
        { start: 7674858, end: 7674971 },
        { start: 7674180, end: 7674289 },
        { start: 7673700, end: 7673836 },
        { start: 7673534, end: 7673608 },
        { start: 7673289, end: 7673326 },
        { start: 7670608, end: 7670714 },
        { start: 7668402, end: 7669689 }
      ]
    },
    structures: [
      {
        id: "2FEJ",
        title: "Crystal structure of p53 core domain mutant R249S in complex with DNA",
        method: "X-ray diffraction",
        resolution: "2.7Å",
        url: "https://files.rcsb.org/download/2FEJ.pdb",
        thumbnail: "https://cdn.rcsb.org/images/structures/fe/2fej/2fej_assembly-1.jpeg"
      },
      {
        id: "2GEQ",
        title: "DNA-binding domain of human p53 in complex with DNA",
        method: "X-ray diffraction",
        resolution: "1.9Å",
        url: "https://files.rcsb.org/download/2GEQ.pdb",
        thumbnail: "https://cdn.rcsb.org/images/structures/ge/2geq/2geq_assembly-1.jpeg"
      }
    ],
    references: [
      {
        id: "21760589",
        title: "Revisiting TP53 mutations and immunohistochemistry--a comparative study in 157 diffuse gliomas",
        authors: "Takami H, Yoshida A, Fukushima S, Arita H, Matsushita Y, Nakamura T, Ohno M, Miyakita Y, Shibui S, Narita Y, Ichimura K",
        journal: "Brain Pathology",
        year: 2015,
        url: "https://pubmed.ncbi.nlm.nih.gov/25318587/"
      }
    ]
  },
  {
    id: "ENSG00000134853",
    symbol: "PDGFRA",
    name: "Platelet Derived Growth Factor Receptor Alpha",
    description: "This gene encodes a cell surface tyrosine kinase receptor for members of the platelet-derived growth factor family. These growth factors are mitogens for cells of mesenchymal origin. The identity of the growth factor bound to the receptor affects the recruitment of specific molecules responsible for intracellular signaling.",
    chromosome: "4",
    location: "4q12",
    type: "protein-coding",
    organism: "Homo sapiens",
    function: "Signal transduction, cell proliferation, embryonic development",
    diseases: ["Gastrointestinal stromal tumor", "Glioma", "Fibrosarcoma"],
    expression: {
      level: "medium",
      tissues: ["Brain", "Skin", "Bone marrow"]
    },
    genomic_context: {
      start: 54229097,
      end: 54298247,
      strand: "+",
      exons: [
        { start: 54229097, end: 54229556 },
        { start: 54233691, end: 54233907 },
        { start: 54257484, end: 54257563 },
        { start: 54259829, end: 54259989 },
        { start: 54274091, end: 54274192 },
        { start: 54274296, end: 54274423 },
        { start: 54275197, end: 54275340 },
        { start: 54276514, end: 54276623 },
        { start: 54277169, end: 54277341 },
        { start: 54285183, end: 54285311 },
        { start: 54288171, end: 54288265 },
        { start: 54288851, end: 54288948 },
        { start: 54290768, end: 54290847 },
        { start: 54291723, end: 54291853 },
        { start: 54292045, end: 54292124 },
        { start: 54293439, end: 54293541 },
        { start: 54294405, end: 54294579 },
        { start: 54295277, end: 54295433 },
        { start: 54297599, end: 54298247 }
      ]
    },
    structures: [
      {
        id: "5K5X",
        title: "Crystal structure of human PDGFRA kinase domain in complex with imatinib",
        method: "X-ray diffraction",
        resolution: "2.6Å",
        url: "https://files.rcsb.org/download/5K5X.pdb",
        thumbnail: "https://cdn.rcsb.org/images/structures/k5/5k5x/5k5x_assembly-1.jpeg"
      }
    ],
    references: [
      {
        id: "27767398",
        title: "Structural basis for inhibition of the CSF-1R kinase by the PDGFR inhibitor imatinib",
        authors: "Schubert C, Schalk-Hihi C, Struble GT, Ma HC, Petrounia IP, Brandt B, Deckman IC, Patch RJ, Player MR, Spurlino JC, Springer BA",
        journal: "The Journal of Biological Chemistry",
        year: 2007,
        url: "https://pubmed.ncbi.nlm.nih.gov/17395587/"
      }
    ]
  },
  {
    id: "ENSG00000037280",
    symbol: "FLT4",
    name: "Fms Related Receptor Tyrosine Kinase 4",
    description: "The protein encoded by this gene is a receptor tyrosine kinase that is involved in the regulation of lymphangiogenesis, and mutations in this gene have been associated with hereditary lymphedema, a disorder characterized by primary lymphedema.",
    chromosome: "5",
    location: "5q35.3",
    type: "protein-coding",
    organism: "Homo sapiens",
    function: "Lymphangiogenesis, vascular development, signal transduction",
    diseases: ["Hereditary lymphedema", "Milroy disease"],
    expression: {
      level: "medium",
      tissues: ["Lymphatic endothelial cells", "Placenta", "Lung"]
    },
    genomic_context: {
      start: 180587619,
      end: 180611977,
      strand: "+",
      exons: [
        { start: 180587619, end: 180587703 },
        { start: 180588220, end: 180588334 },
        { start: 180588440, end: 180588562 },
        { start: 180589844, end: 180590064 },
        { start: 180591494, end: 180591639 },
        { start: 180595393, end: 180595485 },
        { start: 180597514, end: 180597661 },
        { start: 180598491, end: 180598628 },
        { start: 180599031, end: 180599156 },
        { start: 180600350, end: 180600416 },
        { start: 180603915, end: 180604080 },
        { start: 180605656, end: 180605768 },
        { start: 180606087, end: 180606249 },
        { start: 180606366, end: 180606465 },
        { start: 180607895, end: 180608076 },
        { start: 180608206, end: 180608422 },
        { start: 180608726, end: 180608913 },
        { start: 180609141, end: 180609215 },
        { start: 180609311, end: 180609393 },
        { start: 180609513, end: 180609634 },
        { start: 180609772, end: 180609855 },
        { start: 180610023, end: 180610122 },
        { start: 180610243, end: 180610352 },
        { start: 180610451, end: 180610660 },
        { start: 180610766, end: 180610855 },
        { start: 180610958, end: 180611077 },
        { start: 180611168, end: 180611230 },
        { start: 180611309, end: 180611977 }
      ]
    },
    structures: [
      {
        id: "4BSJ",
        title: "Crystal structure of the human VEGFR-3 (FLT4) kinase domain in complex with Pazopanib",
        method: "X-ray diffraction",
        resolution: "2.5Å",
        url: "https://files.rcsb.org/download/4BSJ.pdb",
        thumbnail: "https://cdn.rcsb.org/images/structures/bs/4bsj/4bsj_assembly-1.jpeg"
      }
    ],
    references: [
      {
        id: "11242034",
        title: "Vascular endothelial growth factor (VEGF)-C signaling through FLT-4 (VEGFR-3) mediates leukemic cell proliferation, survival, and resistance to chemotherapy",
        authors: "Dias S, Choy M, Alitalo K, Rafii S",
        journal: "Blood",
        year: 2002,
        url: "https://pubmed.ncbi.nlm.nih.gov/11781262/"
      }
    ]
  },
  {
    id: "ENSG00000165025",
    symbol: "SYK",
    name: "Spleen Tyrosine Kinase",
    description: "This gene encodes a non-receptor type of tyrosine kinase that is involved in coupling activated immunoreceptors to downstream signaling events that mediate diverse cellular responses, including proliferation, differentiation, and phagocytosis.",
    chromosome: "9",
    location: "9q22.2",
    type: "protein-coding",
    organism: "Homo sapiens",
    function: "Signal transduction, immune cell activation, inflammation",
    diseases: ["B-cell lymphoma", "Rheumatoid arthritis", "Systemic lupus erythematosus"],
    expression: {
      level: "high",
      tissues: ["Spleen", "Lymph nodes", "Peripheral blood cells"]
    },
    genomic_context: {
      start: 93564483,
      end: 93629909,
      strand: "-",
      exons: [
        { start: 93629654, end: 93629909 },
        { start: 93629025, end: 93629206 },
        { start: 93627995, end: 93628123 },
        { start: 93627708, end: 93627861 },
        { start: 93617256, end: 93617354 },
        { start: 93605157, end: 93605281 },
        { start: 93604841, end: 93605009 },
        { start: 93603541, end: 93603645 },
        { start: 93598543, end: 93598623 },
        { start: 93593724, end: 93593779 },
        { start: 93591412, end: 93591508 },
        { start: 93589928, end: 93590000 },
        { start: 93588142, end: 93588275 },
        { start: 93571719, end: 93571867 },
        { start: 93564483, end: 93566726 }
      ]
    },
    structures: [
      {
        id: "4FL2",
        title: "SYK kinase domain in complex with a pyrimidine-5-carbonitrile inhibitor",
        method: "X-ray diffraction",
        resolution: "2.43Å",
        url: "https://files.rcsb.org/download/4FL2.pdb",
        thumbnail: "https://cdn.rcsb.org/images/structures/fl/4fl2/4fl2_assembly-1.jpeg"
      },
      {
        id: "4FYN",
        title: "SYK kinase domain with a pyrimidine-5-carboxamide inhibitor",
        method: "X-ray diffraction",
        resolution: "2.85Å",
        url: "https://files.rcsb.org/download/4FYN.pdb",
        thumbnail: "https://cdn.rcsb.org/images/structures/fy/4fyn/4fyn_assembly-1.jpeg"
      }
    ],
    references: [
      {
        id: "24486587",
        title: "Structural analysis of the SYK kinase domain and its interaction with inhibitors",
        authors: "Kuglstatter A, Wong A, Tsing S, Lee SW, Lou Y, Villaseñor AG, Bradshaw JM, Shaw D, Barnett JW, Browner MF",
        journal: "Biochemical and Biophysical Research Communications",
        year: 2011,
        url: "https://pubmed.ncbi.nlm.nih.gov/21846466/"
      }
    ]
  },
  {
    id: "ENSG00000177189",
    symbol: "RIT1",
    name: "Ras Like Without CAAX 1",
    description: "This gene encodes a member of the Ras superfamily of small GTPases. The encoded protein plays a role in the regulation of signal transduction pathways involved in cell proliferation and differentiation. Mutations in this gene have been associated with Noonan syndrome.",
    chromosome: "1",
    location: "1q22",
    type: "protein-coding",
    organism: "Homo sapiens",
    function: "Signal transduction, regulation of cell proliferation",
    diseases: ["Noonan syndrome", "Lung adenocarcinoma"],
    expression: {
      level: "medium",
      tissues: ["Heart", "Brain", "Lung"]
    },
    genomic_context: {
      start: 155867598,
      end: 155881232,
      strand: "-",
      exons: [
        { start: 155880997, end: 155881232 },
        { start: 155880325, end: 155880449 },
        { start: 155879019, end: 155879132 },
        { start: 155874433, end: 155874535 },
        { start: 155871827, end: 155871936 },
        { start: 155867598, end: 155868007 }
      ]
    },
    structures: [
      {
        id: "1RIT",
        title: "RIT with bound GDP",
        method: "X-ray diffraction",
        resolution: "1.8Å",
        url: "https://files.rcsb.org/download/1RIT.pdb",
        thumbnail: "https://cdn.rcsb.org/images/structures/ri/1rit/1rit_assembly-1.jpeg"
      }
    ],
    references: [
      {
        id: "23665301",
        title: "RIT1 mutations cause Noonan syndrome with possible juvenile myelomonocytic leukemia but are not involved in acute lymphoblastic leukemia",
        authors: "Gómez-Seguí I, Makishima H, Jerez A, Yoshida K, Przychodzen B, Miyano S, Shiraishi Y, Husseinzadeh H, Guinta K, Clemente M, et al.",
        journal: "European Journal of Human Genetics",
        year: 2013,
        url: "https://pubmed.ncbi.nlm.nih.gov/23695276/"
      }
    ]
  }
];

// Helper functions for dealing with gene data

/**
 * Get all distinct chromosomes in the dataset
 */
export function getDistinctChromosomes(): string[] {
  const chromosomes = mockGenes.map(gene => gene.chromosome);
  return [...new Set(chromosomes)].sort((a, b) => {
    // Ensure chromosomes are sorted numerically (not alphabetically)
    const numA = parseInt(a, 10);
    const numB = parseInt(b, 10);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    // Handle non-numeric chromosomes (e.g., X, Y, MT)
    return a.localeCompare(b);
  });
}

/**
 * Get all distinct gene types in the dataset
 */
export function getDistinctGeneTypes(): string[] {
  const types = mockGenes.map(gene => gene.type);
  return [...new Set(types)].sort();
}

/**
 * Filter genes based on criteria
 */
export function filterGenes(filters: { search?: string; chromosome?: string; type?: string }) {
  const { search, chromosome, type } = filters;
  
  return mockGenes.filter(gene => {
    // Filter by search term
    if (search && search.trim() !== '') {
      const searchTerm = search.toLowerCase().trim();
      const matchesSearch = 
        gene.symbol.toLowerCase().includes(searchTerm) ||
        gene.name.toLowerCase().includes(searchTerm) ||
        gene.description.toLowerCase().includes(searchTerm);
      
      if (!matchesSearch) return false;
    }
    
    // Filter by chromosome
    if (chromosome && chromosome !== 'all') {
      if (gene.chromosome !== chromosome) return false;
    }
    
    // Filter by gene type
    if (type && type !== 'all') {
      if (gene.type !== type) return false;
    }
    
    return true;
  });
}

/**
 * Find a gene by its ID
 */
export function findGeneById(id: string): Gene | undefined {
  return mockGenes.find(gene => gene.id === id);
}

/**
 * Find a gene by its symbol
 */
export function findGeneBySymbol(symbol: string): Gene | undefined {
  return mockGenes.find(gene => gene.symbol.toLowerCase() === symbol.toLowerCase());
}
