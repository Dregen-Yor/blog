import type { Lang, StaticKey, FnKey } from '~/data/i18n'
import { t as rawT } from '~/data/i18n'

const lang = ref<Lang>('zh')

export function useLang() {
  if (import.meta.client) {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'zh' || stored === 'en') lang.value = stored
  }

  function toggleLang() {
    lang.value = lang.value === 'zh' ? 'en' : 'zh'
    if (import.meta.client) localStorage.setItem('lang', lang.value)
  }

  function t(key: StaticKey): string
  function t(key: FnKey, arg: number): string
  function t(key: StaticKey | FnKey, arg?: number): string {
    if (arg !== undefined) return rawT(key as FnKey, lang.value, arg)
    return rawT(key as StaticKey, lang.value)
  }

  return { lang, toggleLang, t }
}
