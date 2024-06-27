import type { Subset } from "@ohmycv/google-fonts-loader";
import type { ResumeStyles } from "./stores/style";

export type Font = {
  readonly name: string;
  readonly fontFamily?: string;
};

export type ValidPaperSize = keyof typeof PAPER_SIZES;

// -------- Font constants --------

const LOCAL_EN_FONTS: Font[] = [
  {
    name: "Adobe Garamond Pro"
  },
  {
    name: "CMU Sans Serif"
  },
  {
    name: "Euclid"
  },
  {
    name: "Minion Pro"
  },
  {
    name: "Tex Gyre Pagella"
  },
  {
    name: "Times Newer Roman"
  }
];

const LOCAL_CJK_FONTS: Font[] = [
  {
    name: "华康宋体",
    fontFamily: "HKST"
  },
  {
    name: "霞鹜文楷",
    fontFamily: "LXGW WenKai"
  }
];

const GF_CJK_SUBSETS = [
  "chinese-simplified",
  "chinese-traditional",
  "japanese",
  "korean"
] as Subset[];

const GF_CJK_FAMILY_TO_NAME = {
  "Noto Sans SC": "思源黑体（简）",
  "Noto Sans TC": "思源黑体（繁）",
  "Noto Serif SC": "思源宋体（简）",
  "Noto Serif TC": "思源宋体（繁）"
} as Record<string, string>;

const GF_CJK_FIRST = [
  "思源黑体（简）",
  "思源黑体（繁）",
  "思源宋体（简）",
  "思源宋体（繁）"
];

const GF_IGNORE_FONTS = [
  "Baloo 2",
  "Baloo Bhai 2",
  "Baloo Bhaijaan 2",
  "Baloo Bhaina 2",
  "Baloo Chettan 2",
  "Baloo Da 2",
  "Baloo Paaji 2",
  "Baloo Tamma 2",
  "Baloo Tammudu 2",
  "Baloo Thambi 2",
  "Brygada 1918",
  "Exo 2",
  "M PLUS 1",
  "M PLUS 1 Code",
  "M PLUS 1p",
  "M PLUS 2",
  "M PLUS Rounded 1c",
  "Shippori Mincho",
  "Source Sans 3",
  "Source Serif 4"
];

// -------- Paper constants --------

const PAPER_SIZES = {
  A4: {
    h: 297 + 2,
    w: 210
  },
  letter: {
    h: 279.4 + 3,
    w: 215.9
  }
};

const MM_TO_PX = 3.78;

// -------- Color constants --------

const PRESET_COLORS = ["#000000", "#377bb5", "#ca3832", "#ee8732", "#9c5bde", "#43912b"];

// -------- Render constants --------

const PRINT_BOTTOM = 10;
const PREVIEW_ID = "preview";
const PREVIEW_SELECTOR = `#resume-${PREVIEW_ID}`;

// -------- Default constants --------

const DEFAULT_STYLES = {
  marginV: 55,
  marginH: 45,
  lineHeight: 1.3,
  paragraphSpace: 5,
  themeColor: "#377bb5",
  fontCJK: {
    name: "华康宋体",
    fontFamily: "HKST"
  },
  fontEN: {
    name: "Minion Pro"
  },
  fontSize: 15,
  paper: "A4"
} as ResumeStyles;

const DEFAULT_MD_CONTENT = `---
name: Haha Ha
header:
  - text: <span class="iconify" data-icon="tabler:phone"></span> (+1) 123-456-7890
  - text: <span class="iconify" data-icon="tabler:mail"></span> renovamenzxh@gmail.com
    link: mailto:renovamenzxh@gmail.com
  - text: <span class="iconify" data-icon="tabler:brand-github"></span> Renovamen
    link: https://github.com/Renovamen
  - text: <span class="iconify" data-icon="tabler:brand-linkedin"></span> xiaohan-zou
    link: https://www.linkedin.com/in/xiaohan-zou/
  - text: <span class="iconify" data-icon="charm:person"></span> zxh.io
    link: https://zxh.io
  - text: <span class="iconify" data-icon="ic:outline-location-on"></span> 1234 Abc Street, Boston, MA 02215
    newLine: true
---

## Education

**University of Charles River**
  ~ Boston, MA

M.S. in Computer Science
  ~ 09/2021 - 01/2023

**Huangdu Institute of Technology**
  ~ Shanghai, China

B.Eng. in Software Engineering
  ~ 09/2016 - 07/2020


## Publications

[~P1]: **Eating is All You Need**

    <u>Haha Ha</u>, San Zhang

    *Conference on Neural Information Processing Systems (NeurIPS), 2099*

[~P2]: **You Only Cook Once: Unified, Real-Time Mapo Tofu Recipe**

    <u>Haha Ha</u>, San Zhang, Si Li, Wu Wang

    *Computer Vision and Pattern Recognition Conference (CVPR), 2077 **(Best Paper Honorable Mention)***


## Experience

**Machine Learning Engineer Intern**
  ~ Slow Feet Technology
  ~ 07/2021 - Present

- Devised a new food-agnostic formulation for fine-grained cross-ingredient meal cooking and subsumed the recent popular works into the proposed scheme
- Proposed a cream of mushroom soup recipe which is competitive when compared with the SOTA recipes with complex steps by only altering the way of cutting mushroom, published in NeurIPS 2099 (see [~P1])
- Developed a pan for meal cooking which is benefiting the group members' research work


**Reseach Intern**
  ~ Paddling University
  ~ 08/2020 - Present

- Designed an efficient method for mapo tofu quality estimation via thermometer
- Proposed a fast stir frying algorithm for tofu cooking problems, which specifies the amount of the hot sauce instead of using terms like "as much as you can", published in CVPR 2077 (see [~P2])
- Outperformed SOTA methods while cooking much more efficient in experiments on popular tofu


**Research Assistant**
  ~ Huangdu Institute of Technology
  ~ 03/2020 - 06/2020

- Proposed a novel framework consisting of a spoon and a pair of chopsticks for eating mapo toufu
- Designed a tofu filtering strategy inspired by beans grinding method for building a dataset for this new task
- Designed two new evaluation criteria to assess the novelty and diversity of the eating plans
- Outperformed baselines and existed methods substantially in terms of diversity, novelty and coherence


**Reseach Intern**
  ~ Paddling University
  ~ 07/2018 - 08/2018

- Designed two sandwiches consisting of breads and meat of two traditional bacon cheese burgers to make use of unused ingredients
- Utilized the structure duality to boost the cooking speed of two dual tasks based on shared ingredients
- Outperformed strong baselines on QWE'15 and ASDF'14 dataset


## Awards and Honors

**Gold**, International Collegiate Catching Fish Contest (ICCFC)
  ~ 2018

**First Prize**, China National Scholarship for Outstanding Dragons
  ~ 2017, 2018


## Skills

**Programming Languages:** <span class="iconify" data-icon="vscode-icons:file-type-python"></span> Python, <span class="iconify" data-icon="vscode-icons:file-type-js-official"></span> JavaScript / <span class="iconify" data-icon="vscode-icons:file-type-typescript-official"></span> TypeScript, <span class="iconify" data-icon="vscode-icons:file-type-html"></span> HTML / <span class="iconify" data-icon="vscode-icons:file-type-css"></span> CSS, <span class="iconify" data-icon="logos:java" data-inline="false"></span> Java

**Tools and Frameworks:** Git, PyTorch, Keras, scikit-learn, Linux, Vue, React, Django, $\\LaTeX$

**Languages:** Chinese (native), English (proficient)
`;

const DEFAULT_CSS_CONTENT = `/* Backbone CSS for Resume Template 1 */

/* Basic */

${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: black;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

${PREVIEW_SELECTOR} p,
${PREVIEW_SELECTOR} li,
${PREVIEW_SELECTOR} dl {
  margin: 0;
}

/* Headings */

${PREVIEW_SELECTOR} h1,
${PREVIEW_SELECTOR} h2,
${PREVIEW_SELECTOR} h3 {
  font-weight: bold;
}

${PREVIEW_SELECTOR} h1 {
  font-size: 2.13em;
}

${PREVIEW_SELECTOR} h2,
${PREVIEW_SELECTOR} h3 {
  margin-bottom: 5px;
  font-size: 1.2em;
}

${PREVIEW_SELECTOR} h2 {
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

/* Lists */

${PREVIEW_SELECTOR} ul,
${PREVIEW_SELECTOR} ol {
  padding-left: 1.5em;
  margin: 0.2em 0;
}

${PREVIEW_SELECTOR} ul {
  list-style-type: circle;
}

${PREVIEW_SELECTOR} ol {
  list-style-type: decimal;
}

/* Definition Lists */

${PREVIEW_SELECTOR} dl {
  display: flex;
}

${PREVIEW_SELECTOR} dl dt,
${PREVIEW_SELECTOR} dl dd:not(:last-child) {
  flex: 1;
}

/* Tex */

${PREVIEW_SELECTOR} :not(span.katex-display) > span.katex {
  font-size: 1em !important;
}

/* SVG & Images */

${PREVIEW_SELECTOR} svg.iconify {
  vertical-align: -0.2em;
}

${PREVIEW_SELECTOR} img {
  max-width: 100%;
}

/* Header */

${PREVIEW_SELECTOR} .resume-header {
  text-align: center;
}

${PREVIEW_SELECTOR} .resume-header h1 {
  text-align: center;
  line-height: 1;
  margin-bottom: 8px;
}

${PREVIEW_SELECTOR} .resume-header-item:not(.no-separator)::after {
  content: " | ";
}

/* Citations */

${PREVIEW_SELECTOR} [data-scope="cross-ref"][data-part="definitions"] {
  padding-left: 1.2em;
}

${PREVIEW_SELECTOR} [data-scope="cross-ref"][data-part="definition"] p {
  margin-left: 0.5em;
}

${PREVIEW_SELECTOR} [data-scope="cross-ref"][data-part="definition"]::marker {
  content: attr(data-label);
}

${PREVIEW_SELECTOR} [data-scope="cross-ref"][data-part="reference"] {
  font-size: 100%;
  top: 0;
}

/* Dark & print mode */
/* You might want to comment out the following lines if you change the background or text color. */

.dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: hsl(213, 12%, 15%);
  color: hsl(216, 12%, 84%);
}

@media print {
  .dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
    background-color: white;
    color: black;
  }
}
`;

export const useConstant = () => {
  const FONT = {
    LOCAL: {
      EN: LOCAL_EN_FONTS,
      CJK: LOCAL_CJK_FONTS,
      includes: (font: Font) => {
        const check = (list: Font[]) =>
          list.some(
            (item) => (item.fontFamily ?? item.name) === (font.fontFamily ?? font.name)
          );
        return check(LOCAL_EN_FONTS) || check(LOCAL_CJK_FONTS);
      }
    },
    GF: {
      CJK_SUBSETS: GF_CJK_SUBSETS,
      CJK_FAMILY_TO_NAME: GF_CJK_FAMILY_TO_NAME,
      CJK_FIRST: GF_CJK_FIRST,
      IGNORE: GF_IGNORE_FONTS
    }
  };

  const PAPER = {
    SIZES: PAPER_SIZES,
    MM_TO_PX,
    sizeToPx: (size: ValidPaperSize, v: "h" | "w") => ~~(PAPER_SIZES[size][v] * MM_TO_PX)
  };

  const RENDER = {
    PRINT_BOTTOM,
    PREVIEW_ID,
    PREVIEW_SELECTOR
  };

  const COLOR = {
    PRESET: PRESET_COLORS
  };

  const DEFAULT = {
    RESUME_NAME: "New Resume",
    STYLES: DEFAULT_STYLES,
    MD_CONTENT: DEFAULT_MD_CONTENT,
    CSS_CONTENT: DEFAULT_CSS_CONTENT
  };

  return {
    FONT,
    PAPER,
    RENDER,
    COLOR,
    DEFAULT
  };
};