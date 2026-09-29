// Authoritative International Legal Corpus for IP-SAKTI SAHAYAK
// Initial curated corpus (Phase 1): TRIPS, CBD, Nagoya Protocol, WIPO GRATK Treaty,
// PCT, Madrid System, Hague System, Budapest Treaty.
//
// Conventions match indiaCorpus.js exactly (consumed by ragEngine scoring and
// ragService [Source N] evidence blocks):
//   { id, title, jurisdiction, authority, section, clause, topic,
//     keywords[], content, source_text, source_url, verification_status, version_date }
//
// Source-quality rules applied:
//   - Official primary sources only (WTO, CBD Secretariat, WIPO).
//   - Concise paraphrased summaries — no long copyrighted treaty text.
//   - Precise article references; no fabricated articles or URLs.
//   - Filing systems (PCT / Madrid / Hague) explicitly marked as procedural,
//     not rights-granting.

export const INTERNATIONAL_CORPUS = [
  {
    id: 'trips-art27',
    title: 'TRIPS Agreement (Article 27)',
    jurisdiction: 'International',
    authority: 'World Trade Organization (WTO)',
    section: 'Article 27',
    clause: 'Patentable Subject Matter and Permitted Exclusions',
    topic: 'International Patentability Standards',
    keywords: ['patent', 'patents', 'trips', 'wto', 'article 27', 'patentable subject matter', 'invention', 'exclusions', 'ordre public', 'morality', 'herbal', 'medicinal plants', 'traditional knowledge', 'international patent'],
    content: 'Under Article 27 of the TRIPS Agreement, WTO members must make patents available for inventions in all fields of technology, provided they are new, involve an inventive step, and are capable of industrial application. Members may exclude inventions to protect ordre public or morality, including to prevent serious prejudice to human, animal or plant life or health. The treaty sets a floor of minimum standards; national patentability exclusions (such as India\'s Section 3(p) traditional-knowledge bar) operate on top of these international minimums.',
    source_text: 'TRIPS Article 27 requires WTO members to make patents available in all fields of technology for inventions that are new, involve an inventive step and are industrially applicable, while permitting limited exclusions for ordre public, morality, and protection of human, animal or plant life or health. It establishes minimum standards only; national law determines additional exclusions such as traditional-knowledge bars.',
    source_url: 'https://www.wto.org/english/tratop_e/trips_e/t_agm0_e.htm',
    verification_status: 'Verified — WTO official TRIPS Agreement text',
    version_date: '1994 (in force 1995)'
  },
  {
    id: 'trips-art15',
    title: 'TRIPS Agreement (Article 15)',
    jurisdiction: 'International',
    authority: 'World Trade Organization (WTO)',
    section: 'Article 15',
    clause: 'Protectable Subject Matter: Trademarks',
    topic: 'International Trademark Standards',
    keywords: ['trademark', 'trade mark', 'trademarks', 'trips', 'wto', 'article 15', 'signs', 'distinctive', 'brand', 'brand name', 'international trademark'],
    content: 'Article 15 of the TRIPS Agreement requires members to protect any sign, or any combination of signs, capable of distinguishing the goods or services of one undertaking from those of other undertakings, including words, names, letters, numerals and figurative elements. Registration may depend on distinctiveness and actual use. TRIPS sets minimum protection standards; the existence and scope of each trademark right is determined by the national or regional law of each territory.',
    source_text: 'TRIPS Article 15 obliges members to protect signs or combinations of signs capable of distinguishing goods or services of one undertaking from those of others, including words, names and figurative elements, with registrability optionally conditioned on distinctiveness or use. Rights remain governed by each territory\'s national law.',
    source_url: 'https://www.wto.org/english/tratop_e/trips_e/t_agm0_e.htm',
    verification_status: 'Verified — WTO official TRIPS Agreement text',
    version_date: '1994 (in force 1995)'
  },
  {
    id: 'trips-art22',
    title: 'TRIPS Agreement (Articles 22–24)',
    jurisdiction: 'International',
    authority: 'World Trade Organization (WTO)',
    section: 'Articles 22, 23 & 24',
    clause: 'Protection of Geographical Indications',
    topic: 'International GI Framework',
    keywords: ['gi', 'geographical indication', 'geographical indications', 'origin', 'trips', 'wto', 'article 22', 'article 23', 'appellation', 'regional products', 'herbal'],
    content: 'Articles 22–24 of the TRIPS Agreement require members to provide legal means for interested parties to prevent misleading use of geographical indications — indications identifying goods as originating in a territory where a given quality, reputation or other characteristic is essentially attributable to its geographical origin. Additional heightened protection applies to wines and spirits. Implementation mechanisms (registration systems, authorized-user schemes) are defined by each member\'s national law.',
    source_text: 'TRIPS Articles 22–24 require members to provide legal means to prevent misleading use of geographical indications identifying goods whose quality, reputation or characteristics are essentially attributable to their geographical origin, with heightened protection for wines and spirits. National law implements the protection mechanisms.',
    source_url: 'https://www.wto.org/english/tratop_e/trips_e/t_agm0_e.htm',
    verification_status: 'Verified — WTO official TRIPS Agreement text',
    version_date: '1994 (in force 1995)'
  },
  {
    id: 'cbd-art8j',
    title: 'Convention on Biological Diversity (Article 8(j))',
    jurisdiction: 'International',
    authority: 'Secretariat of the Convention on Biological Diversity (CBD)',
    section: 'Article 8(j)',
    clause: 'Traditional Knowledge, Innovations and Practices of Indigenous and Local Communities',
    topic: 'Traditional Knowledge & Benefit Sharing',
    keywords: ['cbd', 'convention on biological diversity', 'article 8(j)', 'article 8j', 'traditional knowledge', 'traditional medicine', 'indigenous', 'local communities', 'biological diversity', 'biodiversity', 'genetic resources', 'benefit sharing', 'access and benefit sharing', 'abs', 'ayurveda', 'medicinal plants', 'herbal'],
    content: 'Article 8(j) of the Convention on Biological Diversity obliges each contracting party, as far as possible and as appropriate, to respect, preserve and maintain knowledge, innovations and practices of indigenous and local communities embodying traditional lifestyles relevant to the conservation and sustainable use of biological diversity, and to encourage the equitable sharing of benefits arising from the utilization of such knowledge, innovations and practices. It is the foundational international reference for traditional-knowledge benefit sharing relevant to Ayurvedic and other traditional-medicine knowledge.',
    source_text: 'CBD Article 8(j) requires parties, subject to national legislation, to respect, preserve and maintain the knowledge, innovations and practices of indigenous and local communities relevant to conservation and sustainable use of biological diversity, and to encourage equitable sharing of benefits arising from the utilization of such knowledge.',
    source_url: 'https://www.cbd.int/convention/articles/?a=cbd-08',
    verification_status: 'Verified — Convention on Biological Diversity official text (cbd.int)',
    version_date: '1992 (in force 1993)'
  },
  {
    id: 'nagoya-art5',
    title: 'Nagoya Protocol on Access and Benefit-Sharing (Article 5)',
    jurisdiction: 'International',
    authority: 'Secretariat of the Convention on Biological Diversity (CBD)',
    section: 'Article 5',
    clause: 'ABS from the Utilization of Genetic Resources and Associated Traditional Knowledge',
    topic: 'Access & Benefit Sharing (ABS)',
    keywords: ['abs', 'access and benefit sharing', 'nagoya', 'nagoya protocol', 'benefit sharing', 'genetic resources', 'biodiversity', 'biological resources', 'medicinal plants', 'botanical', 'traditional knowledge', 'ayurveda', 'herbal'],
    content: 'Article 5 of the Nagoya Protocol establishes that benefits arising from the utilization of genetic resources, as well as subsequent applications and commercialization, shall be shared in a fair and equitable way with the party providing such resources (the provider country), based on mutually agreed terms. Benefit sharing also applies to traditional knowledge associated with genetic resources, with the provider party required to take legislative measures with the aim of ensuring that benefits are shared with indigenous and local communities holding that knowledge.',
    source_text: 'Nagoya Protocol Article 5 requires benefits arising from the utilization of genetic resources and their commercialization to be shared in a fair and equitable way with the provider country on mutually agreed terms, including with indigenous and local communities where the benefits derive from traditional knowledge associated with genetic resources.',
    source_url: 'https://www.cbd.int/abs/text/',
    verification_status: 'Verified — Nagoya Protocol official text (cbd.int)',
    version_date: '2010 (in force 2014)'
  },
  {
    id: 'nagoya-art7',
    title: 'Nagoya Protocol on Access and Benefit-Sharing (Article 7)',
    jurisdiction: 'International',
    authority: 'Secretariat of the Convention on Biological Diversity (CBD)',
    section: 'Article 7',
    clause: 'Traditional Knowledge Associated with Genetic Resources',
    topic: 'Traditional Knowledge Access Requirements',
    keywords: ['nagoya', 'nagoya protocol', 'traditional knowledge', 'genetic resources', 'prior informed consent', 'pic', 'mutually agreed terms', 'mat', 'indigenous', 'local communities', 'access', 'abs', 'ayurveda', 'traditional medicine', 'medicinal plants'],
    content: 'Article 7 of the Nagoya Protocol requires each party to take measures, as appropriate, with the aim of ensuring that access to traditional knowledge associated with genetic resources held by indigenous and local communities is based on the prior informed consent or approval and involvement of those communities, and that benefit sharing from utilization of that knowledge is governed by mutually agreed terms. It applies only to knowledge associated with genetic resources and operates through each party\'s domestic implementation.',
    source_text: 'Nagoya Protocol Article 7 requires parties to take measures so that access to traditional knowledge associated with genetic resources held by indigenous and local communities takes place with their prior informed consent or approval and involvement, and that benefit sharing from its utilization is based on mutually agreed terms, implemented through domestic law.',
    source_url: 'https://www.cbd.int/abs/text/',
    verification_status: 'Verified — Nagoya Protocol official text (cbd.int)',
    version_date: '2010 (in force 2014)'
  },
  {
    id: 'wipo-gratk',
    title: 'WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge (GRATK, 2024)',
    jurisdiction: 'International',
    authority: 'World Intellectual Property Organization (WIPO)',
    section: 'Disclosure Requirement (Articles 3 & 5)',
    clause: 'Patent-Application Disclosure of Genetic Resources and Associated Traditional Knowledge',
    topic: 'Patent Disclosure Obligations',
    keywords: ['wipo', 'gratk', 'treaty', 'genetic resources', 'associated traditional knowledge', 'disclosure', 'patent application', 'patent', 'patents', 'origin of genetic resources', 'source', 'traditional knowledge', 'ayurveda', 'medicinal plants', 'biopiracy'],
    content: 'The WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge, adopted in Geneva on 24 May 2024, requires patent applicants to disclose the country of origin or source of genetic resources when the claimed invention is directly based on such resources, and to disclose the indigenous people or local community that provided the associated traditional knowledge when the claimed invention is directly based on that knowledge. Contracting parties determine appropriate sanctions or remedies for failure to disclose. The treaty enters into force once enough contracting parties ratify it; the practical disclosure obligation depends on each ratifying state\'s implementation.',
    source_text: 'WIPO GRATK Treaty (adopted 24 May 2024) requires patent applicants to disclose the country of origin or source of genetic resources, and the indigenous people or local community providing associated traditional knowledge, when the claimed invention is directly based on them; sanctions for non-disclosure are set by each contracting party\'s law.',
    source_url: 'https://www.wipo.int/treaties/en/ip/gratk/',
    verification_status: 'Verified — WIPO official treaty page',
    version_date: '2024'
  },
  {
    id: 'pct-overview',
    title: 'Patent Cooperation Treaty (PCT)',
    jurisdiction: 'International',
    authority: 'World Intellectual Property Organization (WIPO)',
    section: 'International Filing System Overview',
    clause: 'Single International Patent Application — Procedural Only',
    topic: 'International Patent Filing (No Worldwide Patent)',
    keywords: ['pct', 'patent cooperation treaty', 'international filing', 'patent application', 'patent', 'patents', 'worldwide patent', 'international patent', 'wipo', 'national phase', 'receiving office', 'ayurveda', 'invention'],
    content: 'The Patent Cooperation Treaty (PCT) lets applicants seek patent protection in over 150 contracting states simultaneously by filing a single "international" patent application with a receiving office (e.g., WIPO). The PCT is a filing and search/precursory-examination procedural system only: it never grants an "international patent" or a worldwide patent. At the end of the international phase (typically 30/31 months from the priority date), the applicant must still enter the national (or regional) phase before each patent office, and each authority grants or refuses a patent under its own national law — including national exclusions such as traditional-knowledge bars.',
    source_text: 'The PCT enables a single international patent application that has legal effect in over 150 contracting states, but it is purely procedural: no worldwide or international patent is granted, and applicants must enter the national or regional phase in each territory where a patent is actually sought and granted under that territory\'s law.',
    source_url: 'https://www.wipo.int/pct/en/',
    verification_status: 'Verified — WIPO official PCT page',
    version_date: '1970 (in force 1978)'
  },
  {
    id: 'madrid-overview',
    title: 'Madrid System for the International Registration of Marks (Madrid Agreement & Protocol)',
    jurisdiction: 'International',
    authority: 'World Intellectual Property Organization (WIPO)',
    section: 'International Registration Framework Overview',
    clause: 'Single International Trademark Application — Territorial Rights Only',
    topic: 'International Trademark Registration (No Universal Trademark)',
    keywords: ['madrid', 'madrid system', 'madrid protocol', 'madrid agreement', 'trademark', 'trade mark', 'trademarks', 'international registration', 'brand', 'brand name', 'wipo', 'international trademark', 'designation'],
    content: 'The Madrid System, administered by WIPO, allows a trademark owner to obtain protection in multiple contracting parties by filing a single international registration application through WIPO, based on an application or registration ("basic mark") with their national or regional office, designating the territories where protection is sought. An international registration does NOT create one universal trademark right: within each designated contracting party the mark is examined and protected under that territory\'s national law, protection can be refused or challenged territorially, and the registration remains dependent on the basic mark for its first five years (central attack).',
    source_text: 'The Madrid System provides a single international trademark registration extended to multiple designated contracting parties, but the resulting rights are territorial: each designated territory examines and protects the mark under its own law, may refuse protection, and the international registration depends on the basic national mark for five years.',
    source_url: 'https://www.wipo.int/madrid/en/',
    verification_status: 'Verified — WIPO official Madrid System page',
    version_date: 'Agreement 1891 / Protocol 1989'
  },
  {
    id: 'hague-overview',
    title: 'Hague System for the International Registration of Industrial Designs',
    jurisdiction: 'International',
    authority: 'World Intellectual Property Organization (WIPO)',
    section: 'International Design Registration Framework Overview',
    clause: 'Single International Design Application — Territorial Rights Only',
    topic: 'International Industrial Design Registration',
    keywords: ['hague', 'hague system', 'industrial design', 'design registration', 'design', 'international design', 'wipo', 'packaging design', 'label design'],
    content: 'The Hague System, administered by WIPO, enables owners of industrial designs (e.g., packaging, containers, labels, ornamental product shapes relevant to herbal-product presentation) to register designs in multiple contracting parties through a single international application filed with WIPO. The international registration produces protection only in the designated territories and under each territory\'s national law; there is no single worldwide design right.',
    source_text: 'The Hague System allows a single international application for industrial designs, administered by WIPO, taking effect only in the designated contracting parties and governed in each by national law; it does not create a universal design right.',
    source_url: 'https://www.wipo.int/hague/en/',
    verification_status: 'Verified — WIPO official Hague System page',
    version_date: '1925 (Act 1999)'
  },
  {
    id: 'budapest-treaty',
    title: 'Budapest Treaty on the International Recognition of the Deposit of Microorganisms for the Purposes of Patent Procedure',
    jurisdiction: 'International',
    authority: 'World Intellectual Property Organization (WIPO)',
    section: 'Microorganism Deposit Framework',
    clause: 'Single Deposit with an International Depositary Authority (IDA)',
    topic: 'Microorganism Deposits for Patent Disclosure',
    keywords: ['budapest', 'budapest treaty', 'microorganism', 'microorganisms', 'deposit', 'international depositary authority', 'ida', 'patent', 'patents', 'patent procedure', 'biotechnology', 'fermentation', 'wipo', 'enablement'],
    content: 'The Budapest Treaty provides that, for the purposes of patent procedure, a single deposit of a microorganism with any International Depositary Authority (IDA) is recognized by all treaty contracting parties, removing the need to deposit separately with each patent office. It is relevant where an invention involving a microorganism (e.g., bio-fermentation strains in herbal extract processing) cannot be fully described in writing, since deposit is used to satisfy the sufficiency-of-disclosure requirement. Substantive patentability is still decided by each national patent office under national law.',
    source_text: 'The Budapest Treaty provides that a single deposit of a microorganism with any International Depositary Authority is accepted for patent procedure in all contracting parties, used to satisfy sufficiency-of-disclosure requirements; substantive patentability remains governed by each national patent office.',
    source_url: 'https://www.wipo.int/treaties/en/registration/budapest/',
    verification_status: 'Verified — WIPO official Budapest Treaty page',
    version_date: '1977 (in force 1980)'
  }
];