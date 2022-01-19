const key = 'c0f125918053496d809194506221801'
const api = 'http://api.weatherapi.com/v1/'
const type = 'current.json'
const lang = 'ru'

const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper')
const form = document.querySelector('form')
const input = form.querySelector('input')
const cityTitle = document.querySelector('.city')
const typeTitle = document.querySelector('.type')
const img = document.querySelector('img')
const temp = document.querySelector('.temperature')

const icons = [
   {
      img: './icons/sunny.svg',
      code: '1000',
   },
   {
      img: './icons/cloud.svg',
      code: '1003 1006 1009 1030',
   },
   {
      img: './icons/rain.svg',
      code: '1063 1087 1117 1135 1147 1150 1153 1180 1183 1186 1189 1192 1195 1198 1240 1243 1246 1273 1276',
   },
   {
      img: './icons/snow.svg',
      code: '1066 1069 1072 1114 1168 1171 1201 1204 1207 1210 1213 1216 1219 1222 1225 1237 1249 1252 1255 1258 1261 1264 1279 1282',
   },
]

function render(data) {
   const img = icons.find(el => el.code.split(' ').find(code => code == data.current.condition.code)).img
   wrapper.innerHTML = `
      <form><input type="text" placeholder="Поиск" autofocus/></form>
      <h2 class="city">${data.location.name}</h2>
      <span class="type">${data.current.condition.text}</span>
      <img src='${img}' alt="icon" />
      <span class="temperature">${data.current.temp_c}˚C</span>
   `
   switch (img) {
      case './icons/sunny.svg':
         body.style.background = 'linear-gradient(to bottom, #FFD86C, #FCDF2A)'
         break
      case './icons/cloud.svg':
         body.style.background = 'linear-gradient(to bottom, #5C72C6, #3B4B8F)'
         break
      case './icons/rain.svg':
         body.style.background = 'linear-gradient(to bottom, #178EF0, #1757C1)'
         break
      case './icons/snow.svg':
         body.style.background = 'linear-gradient(to bottom, #DAE1F0, #AAB2FA)'
         break
      default:
         body.style.background = 'linear-gradient(to bottom, #ffffff, #ece9e6)'
         break
   }
}

function start(url, query) {
   fetch(`${url}${type}?key=${key}&q=${query}&lang=${lang}`)
      .then(res => checkRes(res))
      .then(data => render(data))
}

function checkRes(res) {
   if (res.status === 200) return res.json()
   else console.error('smth went wrong!')
}

form.onsubmit = () => {
   start(api, input.value)
   return false
}
