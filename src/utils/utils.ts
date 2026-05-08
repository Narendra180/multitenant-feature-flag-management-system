import jwt, { GetPublicKeyOrSecret, JwtPayload, PublicKey, Secret, SignOptions, VerifyOptions } from "jsonwebtoken";

const signJwtAsync = (
  payload: string | object | Buffer,
  secretOrPrivateKey: Secret,
  options: SignOptions
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
      if (err || !token) {
        return reject(err);
      }
      resolve(token);
    });
  });
};

const verifyJwtAsync = (
  token: string,
  secretOrPublicKey: Secret | PublicKey | GetPublicKeyOrSecret,
  options: VerifyOptions,
): Promise<JwtPayload | string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, options, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      if (!decoded) {
        return reject(new Error('Token decoding failed: Payload is empty'));
      }
      resolve(decoded);
    });
  });
};

export {
  signJwtAsync,
  verifyJwtAsync
}
