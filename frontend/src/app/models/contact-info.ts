import { ContactDetailInfo } from "./contactDetail-inf";

export class ContactInfo {
    id: number;
    firstName: string;
    lastName: string;
    designation: string;
    imgPath: string;
    file: File;
    contactDetail: ContactDetailInfo;
}
