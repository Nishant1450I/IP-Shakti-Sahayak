// IP-SAKTI SAHAYAK Mock Dataset & Translation Dictionary

export const DEMO_SCENARIOS = [
  {
    id: 'haridra-ointment',
    name: 'Haridra Kshatsadhana (Turmeric Healing Ointment)',
    ingredients: 'Curcuma longa (Haridra/Turmeric), Cocos nucifera (Coconut Oil), Bee Wax, Clarified Butter (Ghee)',
    intendedUse: 'Topical wound healing, antiseptic application, and minor burn relief',
    description: 'A traditional Ayurvedic ointment formulated with turmeric extract and coconut oil base for natural wound healing and soothing skin irritation.',
    category: 'Ayurvedic Proprietary Medicine / Topical Formulation',
    isClassical: true,
    classicalSource: 'Charaka Samhita, Chikitsa Sthana (Kshata Vranadhikara)',
    tkdlMatch: {
      found: true,
      referenceCode: 'TKDL/AY/1842-HAR',
      title: 'Haridra Vranaropana Yoga',
      ancientText: 'Charaka Samhita & Astanga Hridaya',
      patentWarning: 'CRITICAL: High risk of patent rejection under Section 3(p) of Indian Patents Act 1970 (Traditional Knowledge).'
    },
    questions: {
      q1: 'Formulation', // Single herb vs formulation
      q2: 'Topical', // Internal vs topical
      q3: 'Traditional', // Traditional vs Brand Name
      q4: 'Yes (Kerala)', // Specific region
      q5: 'Yes' // Previously published
    },
    classificationResult: {
      type: 'Ayurvedic Classical Formulation Variant',
      attributes: ['Topical Antiseptic', 'Plant Extract Base', 'Traditional Practice'],
      priorArtStatus: 'TKDL Match Detected',
      priorArtDetails: 'Exact formulation concept registered in TKDL (Traditional Knowledge Digital Library) under Charaka Samhita guidelines.'
    },
    defaultConcern: 'patent',
    answers: {
      patent: {
        summary: 'Under Section 3(p) of the Indian Patents Act, 1970, an invention which in effect is traditional knowledge or an aggregation/duplication of known properties of traditionally used components cannot be patented. However, a novel, non-obvious delivery system or synergistic extraction process may qualify for process claims if non-obviousness is proven.',
        sources: [
          {
            id: 'pat-1',
            title: 'Indian Patents Act 1970 — Section 3(p)',
            clause: 'Non-patentable subject matter: Traditional Knowledge',
            snippet: 'An invention which, in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is not patentable.',
            docType: 'Act'
          },
          {
            id: 'pat-2',
            title: 'TKDL Database Record TKDL/AY/1842-HAR',
            clause: 'Prior Art Reference — Curcuma Longa in Kshata Vranadhikara',
            snippet: 'Use of Haridra with Taila/Ghrita for wound healing (Vrana Ropana) is cited in Charaka Samhita Chikitsasthana Chapter 25, Sloka 84-88.',
            docType: 'Traditional Knowledge'
          },
          {
            id: 'pat-3',
            title: 'AYUSH Patent Facilitation Guidelines 2021',
            clause: 'Clause 4.2 — Patentability of Herbal Formulations',
            snippet: 'Applicants must demonstrate significant synergistic effect exceeding simple additive effects of individual herbs to overcome Section 3(e) & 3(p) objections.',
            docType: 'Guideline'
          }
        ],
        confidence: 94,
        confidenceLevel: 'High',
        recommendations: [
          'File for a Trademark for your unique brand name instead of attempting product patent.',
          'If proprietary extraction technology was developed, seek process patent protection for the extraction methodology.',
          'Execute Access & Benefit Sharing (ABS) compliance with the State Biodiversity Board before commercial sourcing.'
        ]
      },
      trademark: {
        summary: 'The generic or classical Ayurvedic name "Haridra Kshatsadhana" cannot be exclusively registered as a trademark under Section 9(1)(b) of the Trade Marks Act 1999 because it is descriptive of the product composition and intended use. You must append a distinctive brand prefix (e.g. "AYUR-SHIELD Haridra Kshatsadhana").',
        sources: [
          {
            id: 'tm-1',
            title: 'Trade Marks Act 1999 — Section 9(1)(b)',
            clause: 'Absolute Grounds for Refusal',
            snippet: 'Trademarks which consist exclusively of marks or indications which may serve in trade to designate the kind, quality, intended purpose, or geographical origin are not registrable.',
            docType: 'Act'
          },
          {
            id: 'tm-2',
            title: 'Class 5 Trademark Classification (Pharmaceuticals & Ayurvedic)',
            clause: 'Ayurvedic Preparations',
            snippet: 'Descriptive names of classical texts are publici juris and cannot be monopolized by any single entity.',
            docType: 'Regulation'
          }
        ],
        confidence: 89,
        confidenceLevel: 'High',
        recommendations: [
          'Register a combined device mark (Brand Name + Logo) rather than plain word mark.',
          'Avoid registering single Ayurvedic herb names alone in Class 5.'
        ]
      },
      gi: {
        summary: 'Curcuma longa (Turmeric) from specific geographical regions such as Erode (Erode Manjal) or Kandhamal (Kandhamal Haldi) holds registered Geographical Indication (GI) tags. If sourcing from these regions, authorized user registration under the GI Act 1999 is required to use regional branding.',
        sources: [
          {
            id: 'gi-1',
            title: 'Geographical Indications of Goods Act 1999',
            clause: 'Section 17 — Authorized User Registration',
            snippet: 'Any person claiming to be the producer of goods in respect of which a geographical indication has been registered shall apply in writing as an authorized user.',
            docType: 'Act'
          }
        ],
        confidence: 91,
        confidenceLevel: 'High',
        recommendations: [
          'Verify if turmeric supply comes from GI-designated districts.',
          'Apply for Authorized User certification if leveraging regional GI names on product packaging.'
        ]
      },
      regulatory: {
        summary: 'This product qualifies as an "Ayurvedic Proprietary Medicine" under Section 3(h) of the Drugs and Cosmetics Act 1940. Manufacturing requires a Form 25D license issued by the State Licensing Authority (AYUSH), following Good Manufacturing Practices (GMP) under Schedule T.',
        sources: [
          {
            id: 'reg-1',
            title: 'Drugs & Cosmetics Act 1940 & Rules 1945',
            clause: 'Section 3(h) & Rule 158B',
            snippet: 'Formulation must contain ingredients mentioned in authoritative books of Ayurveda listed in the First Schedule.',
            docType: 'Act'
          },
          {
            id: 'reg-2',
            title: 'Schedule T — GMP Requirements for ASU Drugs',
            clause: 'Rule 157 — Manufacturing Premises',
            snippet: 'Mandatory quality control standards, raw material testing, and batch manufacturing records.',
            docType: 'Rule'
          }
        ],
        confidence: 96,
        confidenceLevel: 'High',
        recommendations: [
          'Ensure raw materials match botanical standards in Ayurvedic Pharmacopoeia of India (API).',
          'Include batch number, expiry, and AYUSH license number prominently on label.'
        ]
      },
      abs: {
        summary: 'Under the Biological Diversity Act 2002 (amended 2023), Indian commercial entities utilizing bio-resources (like wild turmeric or coconut extracts) must give prior intimation to the State Biodiversity Board (SBB) and comply with Access & Benefit Sharing (ABS) regulations.',
        sources: [
          {
            id: 'abs-1',
            title: 'Biological Diversity Act 2002 — Section 7',
            clause: 'Prior Intimation to State Biodiversity Board',
            snippet: 'No person who is a citizen of India shall obtain any biological resource for commercial utilization without giving prior intimation to the SBB concerned.',
            docType: 'Act'
          }
        ],
        confidence: 88,
        confidenceLevel: 'High',
        recommendations: [
          'Submit Form I to the respective State Biodiversity Board prior to commercial manufacturing.',
          'Maintain proof of sustainable sourcing from local farmers or certified mandis.'
        ]
      }
    }
  },
  {
    id: 'neem-oil',
    name: 'Nimbaka Kesh Taila (Neem Hair Growth Oil)',
    ingredients: 'Azadirachta indica (Neem leaf extract), Eclipta alba (Bhringraj), Sesame Oil, Lavender Essential Oil',
    intendedUse: 'Hair loss control, anti-dandruff scalp care, and promoting hair follicle growth',
    description: 'A modern cosmetic hair oil blending traditional Neem and Bhringraj extracts with natural scalp nourishing carrier oils.',
    category: 'Ayurvedic Cosmetic & Hair Care Formulation',
    isClassical: false,
    classicalSource: 'Custom Proprietary Blend',
    tkdlMatch: {
      found: false,
      referenceCode: 'N/A',
      title: 'No Direct Classical Match',
      ancientText: 'Contains individual ingredients cited in Bhavaprakasha, but formulation ratio is unique.',
      patentWarning: 'MODERATE: Individual ingredients are prior art, but unique synergistic ratio with essential oils may be patentable if clinical synergy is demonstrated.'
    },
    questions: {
      q1: 'Formulation',
      q2: 'Topical',
      q3: 'Brand Name',
      q4: 'No',
      q5: 'No'
    },
    classificationResult: {
      type: 'Ayurvedic Proprietary Cosmetic Formulation',
      attributes: ['Topical Cosmetic', 'Herbal Extracts Blend', 'New Brand Name'],
      priorArtStatus: 'Partial Ingredient Prior Art',
      priorArtDetails: 'Ingredients individually documented in Ayurvedic texts, but specific proprietary hair oil combination is novel.'
    },
    defaultConcern: 'trademark',
    answers: {
      trademark: {
        summary: 'The name "Nimbaka Kesh Taila" contains descriptive terms ("Kesh Taila" = Hair Oil). To secure registration in Class 3 (Cosmetics) & Class 5 (Ayurvedic Medicines), file for "NIMBAKA" as an invented mark with stylized logo packaging.',
        sources: [
          {
            id: 'tm-3',
            title: 'Trade Marks Act 1999 — Section 11',
            clause: 'Relative Grounds for Refusal',
            snippet: 'Search of register shows no conflicting identical marks for NIMBAKA in Class 3 or Class 5.',
            docType: 'Search Record'
          }
        ],
        confidence: 92,
        confidenceLevel: 'High',
        recommendations: [
          'File TM application in Class 3 (Cosmetics/Hair oils) and Class 5 (Ayurvedic preparations).',
          'Conduct comprehensive search for phonetic similarity before label printing.'
        ]
      },
      patent: {
        summary: 'A patent application for this hair oil requires proving non-obvious synergistic efficacy (e.g. hair follicle stimulation test data) beyond simple mixing of Neem and Bhringraj. Standard herbal oil infusions are considered obvious under Section 3(e).',
        sources: [
          {
            id: 'pat-4',
            title: 'Indian Patents Act 1970 — Section 3(e)',
            clause: 'Mere Admixture Objections',
            snippet: 'A substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof is not patentable.',
            docType: 'Act'
          }
        ],
        confidence: 76,
        confidenceLevel: 'Medium',
        recommendations: [
          'Perform comparative clinical trials showing synergy between Neem and Bhringraj.',
          'Focus protection on proprietary cold-extraction processing method.'
        ]
      },
      gi: {
        summary: 'Unless claiming specific regional Sesame or Neem origins (e.g., specific state bio-zones), GI regulations do not restrict this formulation.',
        sources: [
          {
            id: 'gi-2',
            title: 'GI Act 1999 — Scope of Non-GI Herbs',
            clause: 'General Agricultural Commodities',
            snippet: 'Standard Neem and Sesame cultivated across India require no specialized GI user license.',
            docType: 'Guideline'
          }
        ],
        confidence: 95,
        confidenceLevel: 'High',
        recommendations: ['No mandatory GI filing required.']
      },
      regulatory: {
        summary: 'Classified under Cosmetics Rules 2020 or Drugs & Cosmetics Act depending on claim. Claiming "promotes hair growth / cures alopecia" moves it to Ayurvedic Drug (Form 25D). Claiming "cleanses & beautifies scalp" allows Cosmetic license (Form 32).',
        sources: [
          {
            id: 'reg-3',
            title: 'Cosmetics Rules 2020 — Schedule S',
            clause: 'Labeling & Claims Guidelines',
            snippet: 'Therapeutic claims transform cosmetic products into drugs requiring clinical proof.',
            docType: 'Rule'
          }
        ],
        confidence: 86,
        confidenceLevel: 'High',
        recommendations: [
          'Choose label claims carefully to align with intended AYUSH or Cosmetic licensing route.',
          'Ensure list of ingredients is printed in descending order of weight.'
        ]
      },
      abs: {
        summary: 'Sourcing Neem and Bhringraj from domestic suppliers requires maintaining purchase invoices to prove biological resources were legally acquired.',
        sources: [
          {
            id: 'abs-2',
            title: 'Biological Diversity Act — Commercial Access',
            clause: 'Section 7 Exemption Rules',
            snippet: 'Normally traded commodities specified by Central Government may have simplified compliance.',
            docType: 'Notification'
          }
        ],
        confidence: 84,
        confidenceLevel: 'High',
        recommendations: ['Maintain mandi receipts and supplier biodiversity declarations.']
      }
    }
  },
  {
    id: 'tulsi-arka',
    name: 'Vrindavan Tulsi Arka (Concentrated Herbal Drops)',
    ingredients: 'Ocimum sanctum (Krishna Tulsi), Ocimum gratissimum (Ram Tulsi), Distilled Water',
    intendedUse: 'Immunity booster drops, respiratory wellness, and oral health',
    description: 'Steam-distilled liquid extract of pure Tulsi varieties, marketed for daily immunity enhancement and water purification.',
    category: 'Ayurvedic Hydro-distillate (Arka) / Oral Liquid',
    isClassical: true,
    classicalSource: 'Arka Prakasha & Ayurveda Pharmacopoeia of India',
    tkdlMatch: {
      found: true,
      referenceCode: 'TKDL/AY/921-TUL',
      title: 'Tulsi Swarasa & Arka Kalpana',
      ancientText: 'Arka Prakasha & Bhava Prakasha',
      patentWarning: 'HIGH: Arka extraction process for Tulsi is prior art in classical literature.'
    },
    questions: {
      q1: 'Single Herb (Tulsi)',
      q2: 'Internal',
      q3: 'Traditional + Geographical Name',
      q4: 'Yes (Vrindavan / Braj Region)',
      q5: 'Yes'
    },
    classificationResult: {
      type: 'Classical Ayurvedic Hydro-distillate (Arka)',
      attributes: ['Oral Drops', 'Steam Distillation', 'Regional Brand Name'],
      priorArtStatus: 'Registered TKDL Prior Art',
      priorArtDetails: 'Tulsi Arka preparation methods documented extensively in Arka Prakasha.'
    },
    defaultConcern: 'gi',
    answers: {
      gi: {
        summary: 'Using "Vrindavan" in the product name invokes Geographical Indication considerations under Section 9(1)(b) of GI Act 1999. If Vrindavan Tulsi receives GI protection or if it misleads consumers regarding true geographical origin, the mark can be challenged.',
        sources: [
          {
            id: 'gi-3',
            title: 'Geographical Indications Act 1999 — Section 9',
            clause: 'Prohibition of Registration of Geographical Names',
            snippet: 'Marks which falsely represent to persons that goods originate in a territory or region are prohibited.',
            docType: 'Act'
          }
        ],
        confidence: 87,
        confidenceLevel: 'High',
        recommendations: [
          'Ensure Tulsi leaves are genuinely cultivated and harvested in the Vrindavan/Mathura bio-region.',
          'Include origin verification certificates in product dossier.'
        ]
      },
      patent: {
        summary: 'Steam distillation of Ocimum sanctum (Tulsi Arka) is non-patentable under Section 3(p) as traditional knowledge.',
        sources: [
          {
            id: 'pat-5',
            title: 'Indian Patents Act 1970 — Section 3(p)',
            clause: 'Traditional Process Non-patentability',
            snippet: 'Classical extraction methods like Arka, Asava, and Arishta are public domain knowledge.',
            docType: 'Act'
          }
        ],
        confidence: 95,
        confidenceLevel: 'High',
        recommendations: ['Do not apply for product patent. Protect proprietary branding and packaging.']
      },
      trademark: {
        summary: 'To register "Vrindavan Tulsi Arka", disclaim exclusive rights to "Tulsi Arka" and register "VRINDAVAN" with distinct logo artwork.',
        sources: [
          {
            id: 'tm-4',
            title: 'Trade Marks Act 1999 — Section 17',
            clause: 'Disclaimer of Unregistered Components',
            snippet: 'Applicant must disclaim exclusive right to generic Ayurvedic drug names included in composite mark.',
            docType: 'Act'
          }
        ],
        confidence: 90,
        confidenceLevel: 'High',
        recommendations: ['Submit explicit disclaimer for generic terms "Tulsi" and "Arka".']
      },
      regulatory: {
        summary: 'Must comply with FSSAI Nutraceutical Regulations 2022 or AYUSH License under Form 25D. Immunity boost claims require compliance with ASCE Advertising Guidelines.',
        sources: [
          {
            id: 'reg-4',
            title: 'AYUSH Notification on Immunity Claims 2020',
            clause: 'Ad Claim Authorization',
            snippet: 'Immunity claims must reference approved classical indications or validated AYUSH guidelines.',
            docType: 'Notification'
          }
        ],
        confidence: 93,
        confidenceLevel: 'High',
        recommendations: ['Ensure label quotes exact classical reference for immunity support.']
      },
      abs: {
        summary: 'Access and Benefit Sharing (ABS) fee of 0.1% to 0.5% of annual turnover may apply under the Biodiversity Act upon commercial distribution.',
        sources: [
          {
            id: 'abs-3',
            title: 'National Biodiversity Authority (NBA) ABS Regulations',
            clause: 'Regulation 4 — Commercial Utilization of Bioresources',
            snippet: 'Producers utilizing local flora must deposit benefit sharing funds to local Biodiversity Management Committees (BMCs).',
            docType: 'Regulation'
          }
        ],
        confidence: 89,
        confidenceLevel: 'High',
        recommendations: ['Formally register with Uttar Pradesh State Biodiversity Board.']
      }
    }
  }
];

export const KNOWLEDGE_BASE_DOCS = [
  {
    id: 'doc-1',
    title: 'Indian Patents Act, 1970 (Section 3p)',
    category: 'Patent Law',
    type: 'Statute / Legislation',
    year: '1970 (Amended 2005)',
    authority: 'Indian Patent Office (CGPDTM)',
    summary: 'Governs patentability in India. Section 3(p) explicitly excludes traditional knowledge and aggregations of known plant properties from being patented.',
    keyClauses: ['Section 3(p) — Traditional Knowledge', 'Section 3(e) — Admixtures', 'Section 3(d) — Enhanced Efficacy Standard']
  },
  {
    id: 'doc-2',
    title: 'Trade Marks Act, 1999',
    category: 'Trademark Law',
    type: 'Statute / Legislation',
    year: '1999',
    authority: 'Trade Marks Registry India',
    summary: 'Regulates protection and registration of brand names, wordmarks, logos, and trade dress in Class 3 (Cosmetics) and Class 5 (Pharmaceuticals & Ayurvedic Medicines).',
    keyClauses: ['Section 9 — Absolute Grounds for Refusal', 'Section 11 — Relative Grounds', 'Section 17 — Trade Mark Parts & Disclaimers']
  },
  {
    id: 'doc-3',
    title: 'Geographical Indications of Goods Act, 1999',
    category: 'GI Protection',
    type: 'Statute / Legislation',
    year: '1999',
    authority: 'GI Registry, Chennai',
    summary: 'Provides protection and registration of geographical indications relating to goods, agricultural produce, and traditional regional Ayurvedic herbs.',
    keyClauses: ['Section 9 — Unregisterable Indications', 'Section 17 — Authorized Users', 'Section 20 — Misleading Origin Penalties']
  },
  {
    id: 'doc-4',
    title: 'Biological Diversity Act, 2002 (Amended 2023)',
    category: 'Access & Benefit Sharing (ABS)',
    type: 'Statute / Environment Law',
    year: '2002 (Amended 2023)',
    authority: 'National Biodiversity Authority (NBA)',
    summary: 'Mandates prior intimation to State Biodiversity Boards (SBB) and Access & Benefit Sharing (ABS) mechanisms when utilizing Indian bio-resources for commercial products.',
    keyClauses: ['Section 3 — Foreign Entity Approval', 'Section 7 — Indian Commercial Intimation', 'Section 21 — Benefit Sharing Determination']
  },
  {
    id: 'doc-5',
    title: 'Drugs and Cosmetics Act, 1940 & Rules, 1945',
    category: 'AYUSH Regulatory',
    type: 'Regulatory Code',
    year: '1940',
    authority: 'Ministry of AYUSH & CDSCO',
    summary: 'Regulates manufacture, licensing, and labeling of Ayurvedic, Siddha, and Unani (ASU) drugs under Section 3(a) and 3(h) with Schedule T GMP compliance.',
    keyClauses: ['Section 3(h) — Proprietary Medicine', 'Rule 158B — Proof of Effectiveness', 'Schedule T — Good Manufacturing Practices']
  },
  {
    id: 'doc-6',
    title: 'TKDL (Traditional Knowledge Digital Library)',
    category: 'Prior Art Database',
    type: 'Digital Archive & Database',
    year: 'Established 2001',
    authority: 'CSIR & Ministry of AYUSH',
    summary: 'Pioneering digital database containing over 480,000 formulation entries from classical texts (Charaka Samhita, Sushruta Samhita, Dhanvantari Nighantu) translated into 5 international languages.',
    keyClauses: ['Prior Art Verification', 'WIPO IP Protection', 'Biopiracy Prevention Guidelines']
  },
  {
    id: 'doc-7',
    title: 'Charaka Samhita & Classical Ayurvedic Pharmacopoeia (API)',
    category: 'Classical Texts',
    type: 'Pharmacopoeial Standard',
    year: 'Ancient / Published by Ministry of AYUSH',
    authority: 'Pharmacopoeia Commission for Indian Medicine (PCIM&H)',
    summary: 'Authoritative classical text and official pharmacopoeia setting botanical identity, purity, and formulation procedures for traditional Ayurvedic preparations.',
    keyClauses: ['First Schedule Authoritative Books', 'Ayurvedic Pharmacopoeia Standards', 'Quality Control Guidelines']
  }
];

export const INITIAL_PAST_ANALYSES = [
  {
    id: 'ana-101',
    date: '2026-09-06',
    productName: 'Haridra Kshatsadhana (Turmeric Healing Ointment)',
    category: 'Ayurvedic Topical Ointment',
    primaryConcern: 'Patent & TKDL',
    confidenceScore: 94,
    status: 'High TKDL Risk',
    scenarioId: 'haridra-ointment'
  },
  {
    id: 'ana-102',
    date: '2026-09-04',
    productName: 'Nimbaka Kesh Taila (Neem Hair Growth Oil)',
    category: 'Ayurvedic Hair Cosmetic',
    primaryConcern: 'Trademark & Claims',
    confidenceScore: 92,
    status: 'Clear for TM Registration',
    scenarioId: 'neem-oil'
  },
  {
    id: 'ana-103',
    date: '2026-09-01',
    productName: 'Vrindavan Tulsi Arka (Concentrated Herbal Drops)',
    category: 'Ayurvedic Hydro-distillate',
    primaryConcern: 'GI Tag & ABS',
    confidenceScore: 87,
    status: 'GI Sourcing Required',
    scenarioId: 'tulsi-arka'
  }
];

export const TRANSLATIONS = {
  en: {
    appTitle: 'IP-SAKTI SAHAYAK',
    tagline: 'Your AI Assistant for Ayurveda IP & Regulatory Guidance',
    subtagline: 'Scan, type or speak – get insights on your Ayurvedic product with trusted sources.',
    disclaimer: 'Information is for educational purposes only, not legal advice.',
    navHome: 'Home',
    navAnalyses: 'My Analyses',
    navReports: 'Saved Reports',
    navKnowledge: 'Knowledge Base',
    navGuide: 'Country Guide',
    navAbout: 'About IP-SAKTI',
    scanCardTitle: 'Scan Product Label',
    scanCardDesc: 'Upload or capture packaging photo for AI text extraction & compliance check.',
    enterCardTitle: 'Enter Product Details',
    enterCardDesc: 'Type ingredients, formulation name, and intended health claims manually.',
    speakCardTitle: 'Speak Your Question',
    speakCardDesc: 'Ask voice questions in Hindi or English for hands-free analysis.',
    howItWorks: 'How It Works',
    whatYouCanCheck: 'What You Can Check',
    trustedBanner: 'Trusted • Transparent • Source-backed',
    trustedBannerSub: 'All insights are backed by official documents, statutes, and TKDL database records.',
    priorArtAlert: 'PRIOR ART ALERT',
    consultFacilitator: 'Consult an IP Facilitator',
    downloadPdf: 'Download PDF Report',
    saveReport: 'Save to Reports',
    confidence: 'Confidence Level',
    viewSources: 'Cited Sources & Legal Provisions'
  },
  hi: {
    appTitle: 'आईपी-शक्ति सहायक',
    tagline: 'आयुर्वेद बौद्धिक संपदा और नियामक मार्गदर्शन हेतु आपका एआई सहायक',
    subtagline: 'स्कैन करें, टाइप करें या बोलें - विश्वसनीय स्रोतों से अपने आयुर्वेदिक उत्पाद की जानकारी प्राप्त करें।',
    disclaimer: 'जानकारी केवल शैक्षणिक उद्देश्यों के लिए है, कानूनी सलाह नहीं।',
    navHome: 'मुख्य पृष्ठ (Home)',
    navAnalyses: 'मेरे विश्लेषण (My Analyses)',
    navReports: 'सहेजी गई रिपोर्ट (Saved Reports)',
    navKnowledge: 'ज्ञान भंडार (Knowledge Base)',
    navGuide: 'देश निर्देशिका (Country Guide)',
    navAbout: 'आईपी-शक्ति परिचय (About)',
    scanCardTitle: 'उत्पाद लेबल स्कैन करें',
    scanCardDesc: 'एआई टेक्स्ट निष्कर्षण और अनुपालन जांच के लिए पैकेजिंग फोटो अपलोड या कैप्चर करें।',
    enterCardTitle: 'उत्पाद विवरण दर्ज करें',
    enterCardDesc: 'सामग्री, फॉर्मूलेशन नाम और इच्छित स्वास्थ्य दावों को मैन्युअल रूप से टाइप करें।',
    speakCardTitle: 'अपना प्रश्न बोलें',
    speakCardDesc: 'हैंड्स-फ्री विश्लेषण के लिए हिंदी या अंग्रेजी में आवाज से प्रश्न पूछें।',
    howItWorks: 'यह कैसे काम करता है',
    whatYouCanCheck: 'आप क्या जांच सकते हैं',
    trustedBanner: 'विश्वसनीय • पारदर्शी • स्रोत-समर्थित',
    trustedBannerSub: 'सभी निष्कर्ष आधिकारिक दस्तावेजों, कानूनों और टीकेडीएल डेटाबेस से समर्थित हैं।',
    priorArtAlert: 'पूर्व कला चेतावनी (Prior Art Alert)',
    consultFacilitator: 'आईपी सुविधाप्रदाता से परामर्श लें',
    downloadPdf: 'पीडीएफ रिपोर्ट डाउनलोड करें',
    saveReport: 'रिपोर्ट सहेजें',
    confidence: 'विश्वसनीयता स्तर',
    viewSources: 'उद्धृत स्रोत और कानूनी प्रावधान'
  }
};

