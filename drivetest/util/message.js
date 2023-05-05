
// 目前沒用到

module.exports.getMsg = (req, index) => {
  const messages = req.flash(index);
  let message = [];

  if (messages.length > 0) {
    message = messages;
    return message[0];
  } else {
    message = null;
    return message;
  }
};
