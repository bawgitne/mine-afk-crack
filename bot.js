const mineflayer = require('mineflayer')

let reconnectDelay = 5000 // 5s trước khi reconnect sau khi thoát

function createBot() {
  const bot = mineflayer.createBot({
    host: '163.61.111.22', // hoặc IP server
    port: 20023,
    username: 'Nguyen12345' // Tài khoản crack, nếu dùng tài khoản Microsoft thì cần auth khác
  })

  bot.on('login', () => {
    console.log('✅ Đã đăng nhập thành công!')
    setTimeout(() => {
      console.log('⏱️ 30 giây đã trôi qua. Thoát bot...')
      bot.quit() // thoát bot
    }, 28000)
  })

  bot.on('end', () => {
    console.log(`🔁 Đang chờ ${reconnectDelay / 1000}s để đăng nhập lại...`)
    setTimeout(createBot, reconnectDelay)
  })

  bot.on('error', err => {
    console.log('❌ Lỗi:', err)
  })
}

createBot()
