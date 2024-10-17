// place files you want to import through the `$lib` alias in this folder.
export function processDescription(desc: string) {
  //Header
  desc = desc.replace(/(Fusion DMG(?: Bonus)?)/g, '<span class="text-red-400">$1</span>')
  desc = desc.replace(/(Spectro DMG(?: Bonus)?)/g, '<span class="text-yellow-400">$1</span>')
  desc = desc.replace(/(Glacio DMG(?: Bonus)?)/g, '<span class="text-blue-400">$1</span>')
  desc = desc.replace(/(Electro DMG(?: Bonus)?)/g, '<span class="text-purple-400">$1</span>')
  desc = desc.replace(/(Havoc DMG(?: Bonus)?)/g, '<span class="text-rose-400">$1</span>')
  desc = desc.replace(/(Aero DMG(?: Bonus)?)/g, '<span class="text-emerald-400">$1</span>')
  desc = desc.replace(/(<p><strong>)(.*)(<\/strong><\/p>)/g, '$1<span class="text-orange-400">$2</span>$3')
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
    case "PASSIVE1":
    case "PASSIVE2":
      return "Inherent Skill"
    default:
      return ""
  }
}