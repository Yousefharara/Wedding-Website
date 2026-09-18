export type Services =
  | "CCTV Installations"
  | "AMC Services"
  | "AI Surveillance Systems"
  | "IoT & Fire Detection"
  | "Cyber & Digital Security";
//   | "Others service";

export type Service = {
  id: string;
  name: Services;
  title: string;
  thumbinails: string;
  images: string[];
  category: string;
  clients: string;
  timeframe: string;
  advantage: string[];
  descriptionCard?: string;
  description: string;
  tags?: string[];
  subTitle?: string;
  descripttionSubTitle?: string;
};

export interface ServiceForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: Services;
  message: string;
  checkTerms: boolean;
}
