function prepareUser(user) {
  return {
    email: user.email,
    name: user.name,
  };
}

function prepareUserWithToken(userWithToken) {
  return {
    user: prepareUser(userWithToken.user),
    token: userWithToken.token,
  };
}

exports.prepareUser = prepareUser;
exports.prepareUserWithToken = prepareUserWithToken;
