/**
 * Import Dependency
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import native from '@/utils/native'
/**
 * Import Language
 */
import en from './i18n/en'
import cn from './i18n/cn'

/**
 * Config
 */
Vue.use(VueI18n)
let lang = 'cn'
if (native) {
  const nativeLang = native.getLanguage().toLowerCase()
  if (nativeLang === 'cn') {
    lang = 'cn'
  } else {
    lang = 'en'
  }
}
/**
 * Export
 */
export default new VueI18n({
  locale: lang,
  messages: {
    en: {
      lang: en
    },
    cn: {
      lang: cn
    }
  }
})
