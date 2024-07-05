// place files you want to import through the `$lib` alias in this folder.
export function processDescription(desc: string) {
  //Header
  desc = desc.replace(/(Fusion DMG(?: Bonus)?)/g, '<span class="text-red-700">$1</span>')
  desc = desc.replace(/(Spectro DMG(?: Bonus)?)/g, '<span class="text-yellow-300">$1</span>')
  desc = desc.replace(/(<p><strong>)(.*)(<\/strong><\/p>)/g, '$1<span class="text-orange-300">$2</span>$3')
  return desc
}

export function getSkillTypeString(str: string) {
  switch (str) {
    case "BASIC":
      return "Basic Attack"
    case "SKILL":
      return "Resonance Skill"
    case "ULTIMATE":
      return "Resonance Liberation (Ultimate)"
    case "FORTE":
      return "Forte Skill (Passive)"
    case "INTRO":
      return "Intro Skill"
    case "OUTRO":
      return "Outro Skill"
    default:
      return ""
  }
}