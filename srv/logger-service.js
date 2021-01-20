const cds = require('@sap/cds')
const { Sessions, Logentries } = cds.entities
const dayjs = require('dayjs')

/** Service implementation for LoggerService */

//cds.service.impl wrapper is not necessary, but enables code-completion tools in VSCODE
// module.exports = cds.service.impl( srv => {

module.exports = cds.service.impl((srv) => { //srv is the instance of cds.Service

  srv.after('CREATE', 'Logentries', _addOrUpdateSession);
  // srv.after('CREATE', 'Logentries', (data, request) => {


  //   cds.transaction(request) .run( INSERT.into( Sessions ).columns(
  //     'ID', 'deviceID'
  //   ).values(
  //     999, 'Z01'
  //   ))
  // });

  // srv.before('READ', 'Logentries', console.log('read logentries executed'));
})

// /** Service implementation for CatalogService */
// module.exports = cds.service.impl( function() {
//     // this.after ('READ', 'Books', each => each.stock > 111 && _addDiscount2(each,11))
//     this.before ('CREATE', 'Logentries', _addOrUpdateSession)
//   })

//   /** Add some discount for overstocked books */
//   function _addDiscount2 (each,discount) {
//     each.title += ` -- ${discount}% discount!`
//   }
function _testRead() {
  console.log('accessed read logentries method');
}

function _addOrUpdateSession(data, request) {

  if (data.sessionEnd) {
    //get open session and update with endTime.

    cds.transaction(request).run(SELECT.from(Sessions)
      .where({ deviceID: data.deviceID, 
                completedAt : null }))
      .then(foundItems => {
        if (!foundItems) {
          //ignore message
          return
        }
        
        //only expect 1 open item (but will likely have some issues here...)
        const openSession = foundItems[0];

        //TODO: calculate totalTime of session.
        const startTime = dayjs(openSession.createdAt);
        const endTime = dayjs(data.createdAt);
        const totalMinutes = endTime.diff(startTime, 'minute');

        cds.transaction(request) 
          .run ( UPDATE (Sessions).set({
            completedAt : data.createdAt,
            totalMinutes : totalMinutes
          }) .where ({ ID : openSession.ID })
          )
        }
      )

  } else {
    //create new session.
    console.log('request');

    cds.transaction(request).run(INSERT.into(Sessions)
    .columns( 'deviceID' )
    .values( data.deviceID ))
  }
}



  //  INSERT.into( Sessions ) .columns (
  //     'ID', 'deviceID'
  //  ) .values (
  //    999, 'Z01'
  //  )

        // cds.transaction(req) .run ( () =>
        //   CREATE (Sessions) .set ('deviceID', req.deviceID) 
        // )}

//   /** Reduce stock of ordered books if available stock suffices */
// async function _reduceStock (req) {
//   const { Items: OrderItems } = req.data
//   return cds.transaction(req) .run (()=> OrderItems.map (order =>
//     UPDATE (Books) .set ('stock -=', order.amount)
//     .where ('ID =', order.book_ID) .and ('stock >=', order.amount)
//   )) .then (all => all.forEach ((affectedRows,i) => {
//     if (affectedRows === 0)  req.error (409,
//       `${OrderItems[i].amount} exceeds stock for book #${OrderItems[i].book_ID}`
//     )
//   }))
