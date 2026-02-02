module.exports = async (client, error, origin) => {
    console.error(`[ERROR] ${client.user.tag} (${client.user.id})`, error, origin);
};

