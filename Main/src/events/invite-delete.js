const client = global.bot;

/**
 * @param {Invite} invite
 * @returns {Promise<void>}
 */
module.exports = {
  name: 'inviteDelete',
  once: false, 
  async execute(client) {
    module.exports = async (invite) => {
        const invites = await invite.guild.invites.fetch();
        if (!invites) return;
      
        invites.delete(invite.code);
        client.invites.delete(invite.guild.id, invites);
    }}
      };
