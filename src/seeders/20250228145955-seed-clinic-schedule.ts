// seed-clinic-schedule.js

module.exports = {
  async up(queryInterface) {
  const clinicSchedules = [];
  for (let i = 1; i <= 50; i++) { 
    const clinicId = `clinic-${i}`;
    for (let day = 1; day <= 5; day++) { 
      const from = '09:00:00'
      const to = '16:00:00'
      clinicSchedules.push({
        clinicId,
        day,
        from,
        to,
      });
    }
  }

  await queryInterface.bulkInsert('clinic_schedule', clinicSchedules, {});
},

async down(queryInterface) {
  await queryInterface.bulkDelete('clinic_schedule', null, {});
}
}