using { practice_logger as pl } from '../db/schema';

service AdminService { //@(_requires:'authenticated-user') {
 entity Sessions as projection on pl.Sessions;
 entity Logentries as projection on pl.Logentries;
}


