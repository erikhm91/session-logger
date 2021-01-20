using { practice_logger as my } from '../db/schema';

//@impl './path/to/servicefile.js - alternative way to link service.js and cds service
@path:'/view'
service LoggerService { //@(_requires:'authenticated-user') {
    

    entity Sessions as SELECT from my.Sessions {
        *, deviceID as deviceID
    };

    entity Logentries as SELECT from my.Logentries {
        *, deviceID as deviceID
    };

    // action submitSession (deviceID : Session:deviceID );
}
