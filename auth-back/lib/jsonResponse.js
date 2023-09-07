exports.jsonResponse = function (statusCode, body) {
  //unifying the responsesa
  return {
    statusCode,
    body,
  };
};
