import { PREVIEW_SELECTOR } from "./render";
import type { ResumeStyles } from "../../stores/style";

export const DEFAULT_STYLES = {
  marginV: 50,
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

export const DEFAULT_MD_CONTENT = `---
name: Haha Ha
header:
  - text: |
      <span style="font-size: 1.2em; font-weight: bold;">Applying for: Cooking Engineer</span>
  - text: <span class="iconify" data-icon="tabler:phone"></span> (+1) 123-456-7890
    newLine: true
  - text: <span class="iconify" data-icon="tabler:mail"></span> icancook@email.com
    link: mailto:icancook@email.com
  - text: <span class="iconify" data-icon="tabler:brand-github"></span> Renovamen
    link: https://github.com/Renovamen
  - text: <span class="iconify" data-icon="charm:person"></span> zxh.me
    link: https://zxh.me
---

<!-- Important: Replace all template content, especially contact details, with your own information. -->

<!-- Important: When updating your email address, remember to change both the "text" (visible text) and the "link" (underlying hyperlink) fields. -->


## Education

**Harvest University**
  ~ Cambridge, MA

M.S. in Cooking Science
  ~ 09/2021 - 01/2023

**Huangdu Institute of Tofu**
  ~ Shanghai, China

B.Eng. in Salad Engineering
  ~ 09/2016 - 07/2020


## Publications

[~P1]: **Eating is All You Need**

    <u>Haha Ha</u>, San Zhang

    *Conference on Nutritional Ingredients Processing Systems (NIPS), 2099*

[~P2]: **You Only Cook Once: Unified, Real-Time Mapo Tofu Recipe**

    <u>Haha Ha</u>, San Zhang, Si Li, Wu Wang

    *Culinary Visualization and Potato Roasting Conference (CVPR), 2077 **(Best Paper Honorable Mention)***


## Experience

**Cooking Engineer Intern**
  ~ Microwavesoft
  ~ 07/2021 - Present

- Developed an innovative, versatile cooking methodology applicable across diverse ingredients, incorporating and improving upon recent culinary trends
- Created a streamlined cream of mushroom soup recipe, achieving results comparable to complex state-of-the-art techniques through a novel mushroom-cutting approach; published in NIPS 2099 (see [~P1])
- Designed a specialized cooking pan that enhanced research efficiency for team members


**Engineering Chef Intern**
  ~ University of California, Berkebake
  ~ 08/2020 - Present

- Developed a precise mapo tofu quality assessment technique using thermometer-based measurements
- Invented a rapid stir-frying algorithm for tofu cooking, replacing vague instructions like "add as much as you can" with specific hot sauce measurements; published in CVPR 2077 (see [~P2])
- Outperformed SOTA cooking methods in both efficiency and quality across experiments with popular tofu types


**Student Chef**
  ~ Cabbage Melon University
  ~ 03/2020 - 06/2020

- Developed an innovative mapo tofu consumption framework utilizing a spoon-chopstick combination
- Engineered a filtering method for tofu dataset creation, inspired by bean grinding techniques
- Established two new metrics for evaluating eating plan novelty and diversity
- Significantly surpassed existing methods and baselines in diversity, novelty, and coherence


**Research Chef Intern**
  ~ Snapchopstick
  ~ 07/2018 - 08/2018

- Designed two novel sandwiches by repurposing breads and meat from traditional bacon cheeseburgers, maximizing resource efficiency
- Leveraged structure duality to boost cooking speed for two complementary tasks based on shared ingredients
- Surpassed strong baselines on QWE'15 and ASDF'14 dataset


## Awards and Honors

**Gold**, International Collegiate Catching Fish Contest (ICCFC)
  ~ 2018

**First Prize**, China National Scholarship for Outstanding Dragon Killers
  ~ 2017, 2018


## Skills

**Programming Languages:** <span class="iconify" data-icon="vscode-icons:file-type-python"></span> Frython, <span class="iconify" data-icon="vscode-icons:file-type-js-official"></span> JavaSauce / <span class="iconify" data-icon="vscode-icons:file-type-typescript-official"></span> TypeSauce, <span class="iconify" data-icon="vscode-icons:file-type-cpp2"></span> Cheese++, <span class="iconify" data-icon="logos:java" data-inline="false"></span> Java Bean

**Tools and Frameworks:** GrillHub, PanFlow, TensorFork, SpiceNet, $\\LaTeX$

**Languages:** Chinese (native), English (proficient)
`;

export const DEFAULT_CSS_CONTENT = `/* Backbone CSS for Resume Template 1 */

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
