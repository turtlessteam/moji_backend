const { getPublicUsersEmail } = require('../utils/getPublicUsersEmail');


async function checkUserEmailExists(userEmail) {
    try {
    const exists = await getPublicUsersEmail(userEmail);
    return exists; 
  } catch (err) {
    throw new Error('Failed to check user email');
  }
}

module.exports = { checkUserEmailExists };