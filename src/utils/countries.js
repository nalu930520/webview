import filter from 'lodash.filter'

export const countries = [{
  'id': 1,
  'iso2': 'ru',
  'name_en': 'Russia',
  'name_cn': '俄罗斯',
  'icon': require('../assets/images/icon_Russia@3x.png')
}, {
  'id': 2,
  'iso2': 'sa',
  'name_en': 'Saudi Arabia',
  'name_cn': '沙特阿拉伯',
  'icon': require('../assets/images/icon_Saudi_Arabia@3x.png')
}, {
  'id': 3,
  'iso2': 'eg',
  'name_en': 'Egypt',
  'name_cn': '埃及',
  'icon': require('../assets/images/icon_Egypt@3x.png')
}, {
  'id': 4,
  'iso2': 'uy',
  'name_en': 'Uruguay',
  'name_cn': '乌拉圭',
  'icon': require('../assets/images/icon_Uruguay@3x.png')
}, {
  'id': 5,
  'iso2': 'pt',
  'name_en': 'Portugal',
  'name_cn': '葡萄牙',
  'icon': require('../assets/images/icon_Portugal@3x.png')
}, {
  'id': 6,
  'iso2': 'es',
  'name_en': 'Spain',
  'name_cn': '西班牙',
  'icon': require('../assets/images/icon_Spain@3x.png')
}, {
  'id': 7,
  'iso2': 'ma',
  'name_en': 'Morocco',
  'name_cn': '摩洛哥',
  'icon': require('../assets/images/icon_Morocco@3x.png')
}, {
  'id': 8,
  'iso2': 'ir',
  'name_en': 'Iran',
  'name_cn': '伊朗',
  'icon': require('../assets/images/icon_Iran@3x.png')
}, {
  'id': 9,
  'iso2': 'fr',
  'name_en': 'France',
  'name_cn': '法国',
  'icon': require('../assets/images/icon_France@3x.png')
}, {
  'id': 10,
  'iso2': 'au',
  'name_en': 'Australia',
  'name_cn': '澳大利亚',
  'icon': require('../assets/images/icon_Australia@3x.png')
}, {
  'id': 11,
  'iso2': 'pe',
  'name_en': 'Peru',
  'name_cn': '秘鲁',
  'icon': require('../assets/images/icon_Peru@3x.png')
}, {
  'id': 12,
  'iso2': 'dk',
  'name_en': 'Denmark',
  'name_cn': '丹麦',
  'icon': require('../assets/images/icon_Denmark@3x.png')
}, {
  'id': 13,
  'iso2': 'ar',
  'name_en': 'Argentina',
  'name_cn': '阿根廷',
  'icon': require('../assets/images/icon_Argentina@3x.png')
}, {
  'id': 14,
  'iso2': 'is',
  'name_en': 'Iceland',
  'name_cn': '冰岛',
  'icon': require('../assets/images/icon_Iceland@3x.png')
}, {
  'id': 15,
  'iso2': 'hr',
  'name_en': 'Croatia',
  'name_cn': '克罗地亚',
  'icon': require('../assets/images/icon_Croatia@3x.png')
}, {
  'id': 16,
  'iso2': 'ng',
  'name_en': 'Nigeria',
  'name_cn': '尼日利亚',
  'icon': require('../assets/images/icon_Nigeria@3x.png')
}, {
  'id': 17,
  'iso2': 'br',
  'name_en': 'Brazil',
  'name_cn': '巴西',
  'icon': require('../assets/images/icon_Brazil@3x.png')
}, {
  'id': 18,
  'iso2': 'ch',
  'name_en': 'Switzerland',
  'name_cn': '瑞士',
  'icon': require('../assets/images/icon_Switzerland@3x.png')
}, {
  'id': 19,
  'iso2': 'cr',
  'name_en': 'Costa Rica',
  'name_cn': '哥斯达黎加',
  'icon': require('../assets/images/icon_Costa Rica@3x.png')
}, {
  'id': 20,
  'iso2': 'rs',
  'name_en': 'Serbia',
  'name_cn': '塞尔维亚',
  'icon': require('../assets/images/icon_Serbia@3x.png')
}, {
  'id': 21,
  'iso2': 'de',
  'name_en': 'Germany',
  'name_cn': '德国',
  'icon': require('../assets/images/icon_Germany@3x.png')
}, {
  'id': 22,
  'iso2': 'mx',
  'name_en': 'Mexico',
  'name_cn': '墨西哥',
  'icon': require('../assets/images/icon_Mexico@3x.png')
}, {
  'id': 23,
  'iso2': 'se',
  'name_en': 'Sweden',
  'name_cn': '瑞典',
  'icon': require('../assets/images/icon_Sweden@3x.png')
}, {
  'id': 24,
  'iso2': 'kr',
  'name_en': 'Korea',
  'name_cn': '韩国',
  'icon': require('../assets/images/icon_Korea@3x.png')
}, {
  'id': 25,
  'iso2': 'be',
  'name_en': 'Belgium',
  'name_cn': '比利时',
  'icon': require('../assets/images/icon_Belgium@3x.png')
}, {
  'id': 26,
  'iso2': 'pa',
  'name_en': 'Panama',
  'name_cn': '巴拿马',
  'icon': require('../assets/images/icon_Panama@3x.png')
}, {
  'id': 27,
  'iso2': 'tn',
  'name_en': 'Tunisia',
  'name_cn': '突尼斯',
  'icon': require('../assets/images/icon_Tunisia@3x.png')
}, {
  'id': 28,
  'iso2': 'gb-eng',
  'name_en': 'England',
  'name_cn': '英格兰',
  'icon': require('../assets/images/icon_England@3x.png')
}, {
  'id': 29,
  'iso2': 'pl',
  'name_en': 'Poland',
  'name_cn': '波兰',
  'icon': require('../assets/images/icon_Poland@3x.png')
}, {
  'id': 30,
  'iso2': 'sn',
  'name_en': 'Senegal',
  'name_cn': '塞内加尔',
  'icon': require('../assets/images/icon_Senegal@3x.png')
}, {
  'id': 31,
  'iso2': 'co',
  'name_en': 'Colombia',
  'name_cn': '哥伦比亚',
  'icon': require('../assets/images/icon_Colombia@3x.png')
}, {
  'id': 32,
  'iso2': 'jp',
  'name_en': 'Japan',
  'name_cn': '日本',
  'icon': require('../assets/images/icon_Japan@3x.png')
}]

export const getIconByCode = (code) => {
  return filter(countries, {'iso2': code})
}

export const getIconById = (id) => {
  return filter(countries, {'id': parseInt(id)})
}

export const findIconById = (id) => {
  if (!id) return {}
  return countries.find(country => country.id === id)
}
