const mineflayer = require('mineflayer');

// Thay đổi thông tin kết nối của bạn tại đây
const botConfig = {
    host: 'ironsmp.asaka.asia', // Địa chỉ IP hoặc tên miền của server Minecraft
    port: 25565,       // Cổng của server Minecraft (mặc định là 25565)
    username: 'bawg__', // Tên người dùng của bot
    version: '1.21.1'  // Phiên bản Minecraft của server
};

let bot;
function createBot() {
    bot = mineflayer.createBot(botConfig);

    console.log(`Đang kết nối tới server ${botConfig.host}:${botConfig.port} với tên ${botConfig.username}...`);

    // --- Xử lý sự kiện khi bot kết nối thành công và spawn ---
    bot.on('spawn', () => {
        console.log('Bot đã kết nối và spawn thành công!');
            console.log('Đang thực hiện đăng nhập...');
            bot.chat('/login phongcach');
            setTimeout(() => {
                bot.chat('/team warp hoglin');
                console.log('Đã nhập lệnh "/team warp hoglin". Bot đang treo máy...');
            }, 2000); // Đợi 2 giây sau lệnh login
    });

    // --- Xử lý tin nhắn chat từ server ---
    bot.on('chat', (username, message) => {
        if (username === bot.username) return; // Bỏ qua tin nhắn của chính bot
        console.log(`${username}: ${message}`);
    });

    // --- Xử lý khi có người chơi vào/ra khỏi tầm nhìn (chunk load) ---
    // Các sự kiện này vẫn có sẵn từ Mineflayer cơ bản mà không cần plugin bổ sung
    // --- Khi có thực thể (entity) xuất hiện trong tầm nhìn ---
    bot.on('entitySpawn', (entity) => {
        if (entity.type === 'player' && entity.username !== bot.username) {
            const now = new Date().toLocaleString();
            console.log(`[${now}] Người chơi ${entity.username} đã vào render distance!`);
        }
    });

    // --- Khi thực thể rời khỏi tầm nhìn ---
    bot.on('entityGone', (entity) => {
        if (entity.type === 'player' && entity.username !== bot.username) {
            const now = new Date().toLocaleString();
            console.log(`[${now}] Người chơi ${entity.username} đã rời khỏi render distance!`);
        }
    });

    // --- Xử lý lỗi ---
    bot.on('error', (err) => {
        console.error(`Lỗi bot: ${err}`);
        console.log('Đang thử kết nối lại sau 5 giây...');
        setTimeout(createBot, 5000);
    });

    // --- Xử lý khi bot bị văng khỏi server ---
    bot.on('end', (reason) => {
        console.log(`Bot đã bị ngắt kết nối: ${reason}`);
        console.log('Đang thử kết nối lại sau 5 giây...');
        setTimeout(createBot, 5000);
    });
}

// Bắt đầu bot
createBot();