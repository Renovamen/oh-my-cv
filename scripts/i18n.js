const fs = require("fs-extra");
const yaml = require("yaml");
const path = require("path");

const i18nFolder = "src/i18n/translations";
const i18n = fs.readdirSync(i18nFolder).map((item) => {
  const content = fs.readFileSync(path.join(i18nFolder, item), "utf8");
  const key = item.slice(0, item.endsWith(".yaml") ? -5 : -4);
  return [key, yaml.parse(content)];
});

const dist = "dist";
const enContent = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const enDesc = i18n.find(item => item[0] === "en")[1].desc;

i18n.forEach(([lang, configs]) => {
  if (lang !== "en") {
    const copyFolder = path.join(dist, lang);
    const copyFile = path.join(copyFolder, "index.html");

    const content = enContent
      .replace(/lang="en-US"/g, `lang="${lang}"`)
      .replace(/content="en-US"/g, `content="${lang}"`)
      .replace(new RegExp(`content="${enDesc}"`, "g"), `content="${configs.desc}"`);

    if (!fs.existsSync(copyFolder)) fs.mkdir(copyFolder);
    fs.writeFileSync(copyFile, content);
  }
})
