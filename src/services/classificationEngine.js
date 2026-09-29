// Preliminary Ayurvedic Product Classification Engine — Step 2 (quality & safety)
//
// Deterministic, explainable, conservative. The classification result is CONTEXT
// for the RAG/Gemini pipeline — it is NEVER a legal conclusion (no
// patentable/not-patentable/legal/approved statements are produced here).
//
// Status states (explicit, no invented confidence percentages):
//   'classified'          — sufficient information; canonical category established
//   'needs_clarification' — not enough information to justify any category
//   'ambiguous'           — information plausibly supports more than one category
//
// Canonical categories (preserved exactly — no renames, no inventions):
//   'Classical Ayurvedic medicine' | 'Proprietary medicine' |
//   'New/non-classical formulation' | 'Food/nutraceutical' | 'Cosmetic'
// NOTE: 'Phytopharmaceutical' is NOT supported by this engine (no rules exist
// for it yet) and is intentionally not fabricated.
//
// Minimum-question policy: at most TWO clarification questions are ever
// requested, chosen from the smallest set that resolves the ambiguity
// (intended use / route, classical-vs-proprietary origin, ingredients).

export const CLASSIFICATION_DISCLAIMER =
  'Preliminary automated classification for educational decision support. Official legal classification is determined by the State AYUSH Licensing Authority and Patent Office.';

// Clarification dimensions (only asked when needed)
const QUESTION_USE =
  "What is the product's intended use — oral therapeutic medicine, topical/cosmetic application, or food/health supplement?";
const QUESTION_CLASSICAL =
  'Is this formulation taken from a recognized classical Ayurvedic text (e.g., Charaka Samhita, Sushruta Samhita, API), or is it a new proprietary formulation developed by you?';
const QUESTION_INGREDIENTS =
  'Which ingredients/herbs does the formulation contain?';

// Text markers (conservative — explicit wording, not loose guesses)
const CLASSICAL_MARKERS = [
  'classical', 'charaka', 'sushruta', 'ashtanga', 'sharangadhara',
  'bhavaprakash', 'bhavaprakasha', 'classical text', 'classical formulation',
  'classical name', 'text formula', 'pharmacopoeia', 'traditional formula',
  'classical reference', 'grantha'
];
const COSMETIC_MARKERS = ['cosmetic', 'hair', 'skin', 'scalp', 'face', 'lotion', 'shampoo', 'ubtan'];
const FOOD_MARKERS = ['nutraceutical', 'aahar', 'health supplement', 'food supplement', 'immunity', 'fssai', 'food'];
const NEW_MARKERS = [
  'novel proprietary', 'proprietary formulation', 'new formulation',
  'novel formulation', 'own formulation', 'r&d', 'research and development'
];
const TKDL_HERB_MARKERS = ['turmeric', 'haridra', 'neem', 'azadirachta', 'aloe', 'kumari'];

function findMarkers(markers, fields) {
  const matchedMarkers = [];
  const matchedFields = [];
  for (const [fieldName, value] of Object.entries(fields)) {
    if (!value) continue;
    for (const marker of markers) {
      if (value.includes(marker) && !matchedMarkers.includes(marker)) {
        matchedMarkers.push(marker);
        if (!matchedFields.includes(fieldName)) matchedFields.push(fieldName);
      }
    }
  }
  return { matched: matchedMarkers.length > 0, markers: matchedMarkers, fields: matchedFields };
}

export function classifyProduct(answers = {}, inputData = {}) {
  const { q1, q2, q3, q4, q5 } = answers;
  const productName = (inputData.productName || '').toLowerCase();
  const ingredients = (inputData.ingredients || '').toLowerCase();
  const intendedUse = (inputData.intendedUse || '').toLowerCase();
  const description = (inputData.description || '').toLowerCase();

  const fields = {
    name: productName,
    ingredients,
    use: intendedUse,
    description
  };

  const hasUse = Boolean(intendedUse.trim());
  const hasIngredients = Boolean(ingredients.trim());
  const hasDescription = Boolean(description.trim());

  const tkdlHerbMatch = findMarkers(TKDL_HERB_MARKERS, fields).matched;

  // ---------------------------------------------------------------
  // Path A — Legacy wizard answers (q1–q5 explicitly provided).
  // Preserved original decision order and semantics; wizard answers
  // are by definition sufficient.
  // ---------------------------------------------------------------
  if (q3 && q5) {
    let category = 'Proprietary medicine';
    const attributes = [];
    let isClassical = false;
    let tkdlPriorArtMatch = tkdlHerbMatch;

    if (q3.includes('Traditional / Classical Name') && q5.includes('Yes')) {
      category = 'Classical Ayurvedic medicine';
      isClassical = true;
      tkdlPriorArtMatch = true;
      attributes.push('Classical Text Formula', 'Public Domain Prior Art');
    } else if (
      intendedUse.includes('hair') || intendedUse.includes('skin') ||
      intendedUse.includes('cosmetic') || (q2 && q2.includes('Topical') && productName.includes('taila'))
    ) {
      category = 'Cosmetic';
      attributes.push('Topical Herbal Application', 'Cosmetic Rules 2020 Scope');
    } else if (
      intendedUse.includes('food') || intendedUse.includes('nutraceutical') ||
      intendedUse.includes('immunity drop') || productName.includes('arka')
    ) {
      category = 'Food/nutraceutical';
      attributes.push('Oral Health Supplement', 'FSSAI Nutraceutical Scope');
    } else if (q5.includes('No, novel proprietary formulation')) {
      category = 'New/non-classical formulation';
      attributes.push('Proprietary R&D Blend', 'Form 25D Licensing Required');
    } else {
      category = 'Proprietary medicine';
      attributes.push('Ayurvedic Proprietary Drug', 'Drugs & Cosmetics Act Sec 3(h)');
    }

    if (tkdlPriorArtMatch && !attributes.includes('TKDL Ingredient Match')) {
      attributes.push('TKDL Ingredient Match');
    }

    return {
      status: 'classified',
      category,
      isClassical,
      tkdlPriorArtMatch,
      attributes,
      disclaimer: CLASSIFICATION_DISCLAIMER
    };
  }

  // ---------------------------------------------------------------
  // Path B — Free-text product details (no wizard answers).
  // Conservative signal matching across all provided fields.
  // ---------------------------------------------------------------
  const classical = findMarkers(CLASSICAL_MARKERS, fields);
  const cosmetic = findMarkers(COSMETIC_MARKERS, fields);
  const food = findMarkers(FOOD_MARKERS, fields);
  const newFormulation = findMarkers(NEW_MARKERS, fields);

  const hits = [];
  if (classical.matched) hits.push('Classical Ayurvedic medicine');
  if (cosmetic.matched) hits.push('Cosmetic');
  if (food.matched) hits.push('Food/nutraceutical');
  if (newFormulation.matched) hits.push('New/non-classical formulation');

  // Ambiguous — more than one category plausibly supported.
  if (hits.length > 1) {
    return {
      status: 'ambiguous',
      category: '',
      conflicts: hits,
      isClassical: false,
      tkdlPriorArtMatch: false,
      attributes: [],
      missing: [
        {
          key: 'purpose',
          question:
            "Which best describes the product's primary purpose: therapeutic Ayurvedic medicine, cosmetic care, or food/health supplement?"
        }
      ],
      disclaimer: CLASSIFICATION_DISCLAIMER
    };
  }

  // Single clear signal → classified.
  if (hits.length === 1) {
    let category = hits[0];
    let attributes = [];
    let isClassical = false;
    let tkdlPriorArtMatch = tkdlHerbMatch;

    if (category === 'Classical Ayurvedic medicine') {
      isClassical = true;
      tkdlPriorArtMatch = true;
      attributes = ['Classical Text Formula', 'Public Domain Prior Art'];
    } else if (category === 'Cosmetic') {
      attributes = ['Topical Herbal Application', 'Cosmetic Rules 2020 Scope'];
    } else if (category === 'Food/nutraceutical') {
      attributes = ['Oral Health Supplement', 'FSSAI Nutraceutical Scope'];
    } else if (category === 'New/non-classical formulation') {
      attributes = ['Proprietary R&D Blend', 'Form 25D Licensing Required'];
    }

    if (tkdlPriorArtMatch && !attributes.includes('TKDL Ingredient Match')) {
      attributes.push('TKDL Ingredient Match');
    }

    return {
      status: 'classified',
      category,
      isClassical,
      tkdlPriorArtMatch,
      attributes,
      disclaimer: CLASSIFICATION_DISCLAIMER
    };
  }

  // No category signal.
  // Sufficient for the default drug category only when the use is stated AND
  // at least one more substantive dimension (ingredients or description) is
  // provided — i.e. an oral/therapeutic formulation that is explicitly not
  // classical/cosmetic/food per the stated information.
  const sufficientForDefault = hasUse && (hasIngredients || hasDescription);
  if (sufficientForDefault) {
    const attributes = ['Ayurvedic Proprietary Drug', 'Drugs & Cosmetics Act Sec 3(h)'];
    if (tkdlHerbMatch) attributes.push('TKDL Ingredient Match');
    return {
      status: 'classified',
      category: 'Proprietary medicine',
      isClassical: false,
      tkdlPriorArtMatch: tkdlHerbMatch,
      attributes,
      disclaimer: CLASSIFICATION_DISCLAIMER
    };
  }

  // Insufficient — ask the MINIMUM useful questions (never more than two).
  const missing = [];
  if (!hasUse) {
    missing.push({ key: 'use', question: QUESTION_USE });
    missing.push({ key: 'classical', question: QUESTION_CLASSICAL });
  } else {
    // Use is known but the formulation is undescribed: origin + composition
    // are the two dimensions that decide classical vs proprietary vs new.
    missing.push({ key: 'classical', question: QUESTION_CLASSICAL });
    if (!hasIngredients) {
      missing.push({ key: 'ingredients', question: QUESTION_INGREDIENTS });
    }
  }

  return {
    status: 'needs_clarification',
    category: '',
    isClassical: false,
    tkdlPriorArtMatch: false,
    attributes: [],
    missing: missing.slice(0, 2),
    disclaimer: CLASSIFICATION_DISCLAIMER
  };
}