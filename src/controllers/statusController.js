const ping = (req, res) => {
  console.log('Received PING, will PONG (ok) back');
  res.status(200).send({ status: 'ok' });
};

module.exports = {
  ping,
};
