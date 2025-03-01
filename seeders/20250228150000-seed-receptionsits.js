// seed-receptionists-connections.js


module.exports = {
  async up(queryInterface) {
  const receptionistConnections = [];
  for (let i = 41; i <= 50; i++) { 
    const receptionistId = `user-${i}`;
    const doctor = i-40;
    const doctorId = `user-${doctor}`; 
    const clinicId = `clinic-${ doctor * 2 - 1 }`;

    receptionistConnections.push({
      receptionsitId: receptionistId,
      doctorId,
      clinicId,
    });
  }

  await queryInterface.bulkInsert('receptionsit', receptionistConnections, {});
},

async down(queryInterface) {
  await queryInterface.bulkDelete('receptionsit', null, {});
}
}