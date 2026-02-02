const cron = require("node-cron");

module.exports = async (client) => {
    const updateSettings = async (items, settingMap, dataModel, type) => {
        for (const item of items) {
            const key = `${type}_${item.id}`;
            const setting = settingMap.get(key);

            // Проверяем, что setting существует и является объектом
            if (!setting || typeof setting !== 'object' || setting === null) {
                console.warn(`Skipping update for ${key}: setting is invalid or undefined`, setting);
                continue; // Пропускаем этот элемент, если setting некорректен
            }

            try {
                await dataModel.findOneAndUpdate(
                    { id: item.id },
                    { $set: setting },
                    { upsert: true, new: true }
                );
            } catch (error) {
                console.error(`Error updating ${key}:`, error);
            }
        }
    };

    cron.schedule("*/600 * * * * *", async () => {
        try {
            // Проверяем, что client.data инициализирован
            if (!client.data || typeof client.data.get !== 'function') {
                throw new Error('client.data is not initialized or not a Map');
            }

            const guilds = await client.guildData.find();
            await updateSettings(guilds, client.data, client.guildData, "guildData");

            const users = await client.userData.find();
            await updateSettings(users, client.data, client.userData, "userData");
        } catch (error) {
            console.error("An error occurred while updating the database:", error);
        }
    });
};