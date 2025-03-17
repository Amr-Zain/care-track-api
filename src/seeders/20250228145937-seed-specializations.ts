'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('specialization', [
      { name: 'Cardiology' },
      { name: 'Dermatology' },
      { name: 'Pediatrics' },
      { name: 'Orthopedics' },
      { name: 'Neurology' },
      { name: 'Ophthalmology' },
      { name: 'Obstetrics and Gynecology' },
      { name: 'Psychiatry' },
      { name: 'General Surgery' },
      { name: 'Internal Medicine' },
      { name: 'Anesthesiology' },
      { name: 'Radiology' },
      { name: 'Urology' },
      { name: 'Oncology' },
      { name: 'Pulmonology' },
      { name: 'Gastroenterology' },
      { name: 'Endocrinology' },
      { name: 'Nephrology' },
      { name: 'Otolaryngology (ENT)' },
      { name: 'Rheumatology' },
      { name: 'Hematology' },
      { name: 'Allergy and Immunology' },
      { name: 'Infectious Disease' },
      { name: 'Physical Medicine and Rehabilitation' },
      { name: 'Emergency Medicine' },
      { name: 'Pathology' },
      { name: 'Plastic Surgery' },
      { name: 'Thoracic Surgery' },
      { name: 'Vascular Surgery' },
      { name: 'Dentistry' },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('specialization', null, {});
  },
};