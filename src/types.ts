type ResponseBody = {
  success: boolean;
  message: string;
  data: any;
}

type JwtPayloadType = {
  userId: string,
  roles: string[],
  orgSubdomain: string
}

export type {
  ResponseBody,
  JwtPayloadType
}

