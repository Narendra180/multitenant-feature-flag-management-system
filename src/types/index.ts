type ResponseBody = {
  success: boolean;
  message: string;
  data: any;
}

type JwtPayloadType = {
  email: string;
  userId: string;
  roles: string[];
  organizationSubdomain: string;
  organizationId: string;
}

export type {
  ResponseBody,
  JwtPayloadType
}

