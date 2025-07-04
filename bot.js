const mineflayer = require('mineflayer');

function createBot() {
    const botConfig = {
        host: 'ironsmp.asaka.asia',       // Địa chỉ IP hoặc tên miền của server Minecraft
        port: 25565,                       // Cổng của server Minecraft (25565 là mặc định)
        username: 'bawg__',               // Tên người dùng của bot
        version: '1.21.1'                 // Phiên bản Minecraft của server
    };

    const bot = mineflayer.createBot(botConfig);

    console.log(`Đang kết nối tới server ${botConfig.host}:${botConfig.port} với tên ${botConfig.username}...`);

    // --- Khi bot spawn ---
    bot.on('spawn', () => {
        console.log('✅ Bot đã kết nối và spawn thành công!');
        console.log('Đang thực hiện đăng nhập...');
        bot.chat('/login phongcach');
        setTimeout(() => {
            bot.chat('/team warp hoglin');
            console.log('Đã nhập lệnh "/team warp hoglin". Bot đang treo máy...');
        }, 2000);
    });

    // --- Chat ---
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`${username}: ${message}`);
    });

    // --- Khi người chơi vào render distance ---
    bot.on('entitySpawn', (entity) => {
        if (entity.type === 'player' && entity.username !== bot.username) {
            const now = new Date().toLocaleString();
            console.log(`[${now}] Người chơi ${entity.username} đã vào render distance!`);
        }
    });

    // --- Khi người chơi rời render distance ---
    bot.on('entityGone', (entity) => {
        if (entity.type === 'player' && entity.username !== bot.username) {
            const now = new Date().toLocaleString();
            console.log(`[${now}] Người chơi ${entity.username} đã rời khỏi render distance!`);
        }
    });

    // --- Xử lý lỗi ---
    bot.on('error', (err) => {
        console.error(`❌ Lỗi bot: ${err}`);
        console.log('Đang thử kết nối lại sau 5 giây...');
        setTimeout(createBot, 5000);
    });

    // --- Khi bot bị ngắt kết nối ---
    bot.on('end', (reason) => {
        console.log(`⚠️ Bot đã bị ngắt kết nối: ${reason}`);
        console.log('Đang thử kết nối lại sau 5 giây...');
        setTimeout(createBot, 5000);
    });
}

// Bắt đầu bot
createBot();
