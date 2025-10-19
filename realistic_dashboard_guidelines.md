
# Realistic Dashboard Data Guidelines (for Claude)

## 🧭 Objective
Generate a **dashboard JSON dataset** for Octogone (multi-establishment) where **all metrics are realistic and coherent** across restaurants and time filters (Jour, Semaine, Mois, Personnalisé).  
Every choice (value, variation, ratio) must make economic and operational sense for the restaurant industry.

---

## 🧱 File Structure
Each dataset must contain:

- `currency`: `"CAD"`
- `multi_establishment`: `true`
- `combinable_selection`: `true`
- `establishments`: four restaurants with style and ID:

| ID | Nom | Style |
|----|-----|--------|
| `est-bistro8` | **Bistro 8** | Brasserie |
| `est-taqueria` | **Taqueria Norte** | QSR mexicain (tacos, burritos, bols) |
| `est-roquette` | **Roquette** | Casse-Croûte moderne |
| `est-rioux` | **Chez Rioux** | Gastronomique (fine dining) |

- `filters`: must include 4 periods:
  - `day`  
  - `week`  
  - `month`  
  - `custom`  

Each filter must include:
- `by_establishment[est_id]` → `current`, `previous`, and `metrics`
- `all` → aggregated overview
- date metadata: `date`, `start`, `end`, `compare_start`, `compare_end`
- formatted labels: `display_range`, `display_compare_range`

---

## 📊 Data Consistency Rules

### 1️⃣ Base Ratios per Period
| Metric | Target range |
|--------|---------------|
| **Sales** | 100 % baseline |
| **Spendings (Achats)** | 5–10 % of sales |
| **Labour cost (Coûts main-d’œuvre)** | 20–30 % of sales |
| **Food cost (%)** | 25–30 % |
| **Fixed costs** | 1–3 % of sales |
| **Gains/losses** | ±1 % of sales |
| **Profits** | 45–60 % of sales |
| **Average invoice per client** | 20–70 CAD depending on style |
| **Clients** | `sales ÷ avg_invoice` |

---

### 2️⃣ Style-Specific Adjustments
| Establishment | Characteristics |
|----------------|----------------|
| **Bistro 8** | Balanced margins, ticket 45–55 $, mid-range volume |
| **Taqueria Norte** | High volume, low ticket (20–35 $), low food cost (24–26 %) |
| **Roquette** | Medium-high volume, ticket 30–40 $, higher food cost (27–30 %) |
| **Chez Rioux** | Low volume, ticket 60–80 $, high margins, low food cost (23–25 %) |

---

### 3️⃣ Time-Based Variations (vs previous period)
| Period | Acceptable range |
|----------|------------------|
| **Jour** | ±3–10 % |
| **Semaine** | ±5–15 % |
| **Mois** | ±5–20 % |
| **Personnalisé (10 jours)** | ±3–12 % |

> No variation should exceed **±30 %**, except documented edge cases (e.g. closure).

---

### 4️⃣ Weighted Sales and Clients Distribution (must sum to 1.0)
| Restaurant | Sales share | Clients share |
|-------------|--------------|----------------|
| Bistro 8 | 0.32 | 0.24 |
| Taqueria Norte | 0.28 | 0.36 |
| Roquette | 0.26 | 0.34 |
| Chez Rioux | 0.14 | 0.06 |

---

### 5️⃣ Comparative Data Rules
- `previous` ≈ `current × (1 ± realistic delta)`  
- No extreme percentage changes from small denominators (avoid 200 % jumps).  
- `previous` must exist for all metrics and remain coherent.  
- Differences must align: if sales ↓ 5 %, profits ↓ 8–12 %, etc.

---

### 6️⃣ Readable Date Ranges
Each filter must include:
```json
"display_range": "10–19 octobre 2025",
"display_compare_range": "30 septembre – 9 octobre 2025"
```

---

### 7️⃣ Logical Relation Between Filters
| Relation | Expectation |
|-----------|--------------|
| `week.sales ≈ day.sales × 7` | ✅ |
| `month.sales ≈ week.sales × 4.3` | ✅ |
| `custom (10 days)` | ≈ 1.4 × week.sales / 7 |

---

### 8️⃣ Harmonized Trends Across Metrics
When sales change:
- Profits, traffic, spendings must move in the same direction.
- Food cost % changes slightly (±0.2 pt max).
- Gains/losses remain small and proportional.

---

## ⚙️ Output Format
- JSON formatted and indented clearly.  
- All monetary values in **CAD**.  
- No missing, null, or undefined values.  
- All numbers rounded to **2 decimals**.  
- Comparative and delta percentages (`delta_pct`) must match displayed values.

---

## ✅ Expected Output Example (Bistro 8, Week)
| Metric | Current | Previous | Delta |
|---------|----------|-----------|--------|
| Ventes | 13 780 $ | 14 600 $ | −5.6 % |
| Achats | 939 $ | 860 $ | +9.2 % |
| Bénéfices | 8 351 $ | 9 587 $ | −12.8 % |
| Food cost | 26.0 % | 26.1 % | −0.1 pt |
| Facture moyenne | 47.9 $ | 48.0 $ | −0.2 % |

---

## 📋 Summary for Claude
When regenerating or correcting a JSON file:
1. Follow all ratio and variation rules above.
2. Ensure all establishments and filters exist with coherent values.
3. Maintain realistic cross-relationships between metrics.
4. Include formatted date ranges and aggregated totals.
5. Validate that no delta_pct exceeds ±30 % unless documented.
6. Double-check Food cost %, Profits, and Spendings for logical proportions.

---

Once these rules are applied, the resulting JSON will produce a credible, stable, and professional dashboard for demonstrations and AI-based simulations.
