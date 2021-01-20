using { managed, sap, cuid } from '@sap/cds/common';
namespace practice_logger;

entity Logentries : cuid, managed  { 
    deviceID : String(10);
    sessionEnd : Boolean;
}

entity Sessions : cuid, managed {
    deviceID : String(10);
    completedAt : Timestamp;
    totalMinutes : Integer;
        // logentries : array of Logentry; //Add later
}

//cuid adds a field ID, which is an atomic generated guid
//managed adds metadata fields.
/**
ID: "ada0aa76-2c43-492a-8e8c-d5123cc9f8ea",
createdAt: "2021-01-16T18:36:18.949Z",
createdBy: "anonymous",
modifiedAt: "2021-01-16T18:36:18.949Z",
modifiedBy: "anonymous",
 */