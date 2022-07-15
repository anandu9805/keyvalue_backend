
import { getConnection } from "typeorm";
import {Address} from "../entities/Address";
export class AddressRepository{
    async getAllAddress(){
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.find({relations:['employee']});
    }
    async addAddress(addressDetails: Address): Promise<Address>{
        const addressRepo = getConnection().getRepository(Address);
        const address: Address = await addressRepo.save(addressDetails);
        return address;
    }
    }