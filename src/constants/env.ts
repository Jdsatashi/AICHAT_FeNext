export const backendUrl = process.env.BACKEND_URL || "";

export const jwtAlgorim = process.env.JWT_ALGORITHM || "HS256";
export const jwtAccessExpire = parseInt(
  process.env.JWT_ACCESS_TOKEN_EXPIRE_MINUTES || "7"
);
export const jwtRefreshExpire = parseInt(
  process.env.JWT_REFRESH_TOKEN_EXPIRE_DAYS || "30"
);
