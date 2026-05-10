type ResponseBody = {
  success: boolean;
  message: string;
  data: any;
}

type JwtPayloadType = {
  userId: string;
  roles: string[];
  organizationSubdomain: string;
  organizationId: string;
}

export type {
  ResponseBody,
  JwtPayloadType
}

