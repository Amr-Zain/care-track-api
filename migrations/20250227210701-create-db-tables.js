'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_type', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.STRING(15),
        unique: true,
      },
    });
    await queryInterface.createTable('specialization', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
    });
    await queryInterface.createTable('city', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
    });

    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.STRING(36 ),
        primaryKey: true,
        unique: true,
      },
      userType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_type',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      firstName: {
        type: Sequelize.STRING(55),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(55),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.CHAR(11),
        allowNull: false,
        unique: true,
      },
      city: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'city',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      image: {
        type: Sequelize.STRING(350),
        allowNull: true,
      },
      gender: {
        type: Sequelize.TINYINT(1),
        allowNull: true,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
   
    await queryInterface.createTable('clinic', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        unique: true,
      },
      doctorId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      city: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'city',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      location: {
        type: Sequelize.STRING(455),
        allowNull: false,
      },
      clinicName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      phone: {
        type: Sequelize.CHAR(11),
        allowNull: false,
        unique: true,
      },
    });

    await queryInterface.createTable('appointment', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      patientId: {
        type: Sequelize.STRING(36),
        allowNull: false,
      },
      clinicId: {
        type: Sequelize.STRING(36),
        allowNull: true,
      },
      nurseId: {
        type: Sequelize.STRING(36),
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      bookedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
    .then(() => queryInterface.addConstraint('appointment', {
      fields: ['patientId'],
      type: 'foreign key',
      name: 'appointment_patientId_fkey',
      references: {
        table: 'user',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }))
    .then(() => queryInterface.addConstraint('appointment', {
      fields: ['clinicId'],
      type: 'foreign key',
      name: 'appointment_clinicId_fkey',
      references: {
        table: 'clinic',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }))
    .then(() => queryInterface.addConstraint('appointment', {
      fields: ['nurseId'],
      type: 'foreign key',
      name: 'appointment_nurseId_fkey',
      references: {
        table: 'user',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }));

    await queryInterface.createTable('blood', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      patientId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      isRequest: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
      },
      bloodType: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      city: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'city',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      describtion: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
    });
    
    await queryInterface.createTable('clinic_schedule', {
      day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      clinicId: {
        type: Sequelize.STRING(36),
        allowNull: false,
      },
      from: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      to: {
        type: Sequelize.TIME,
        allowNull: false,
      },
    }, {
      primaryKey: ['clinicId', 'day'],
    })
    .then(() => queryInterface.addConstraint('clinic_schedule', {
      fields: ['clinicId'],
      type: 'foreign key',
      name: 'clinic_schedule_clinicId_fkey', // Give it a name!
      references: {
        table: 'clinic',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }));

    await queryInterface.createTable('diagnosis', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      patientId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      doctorId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      clinicId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'clinic',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(400),
        allowNull: false,
      },
    });

    await queryInterface.createTable('doctor_nurse', {
      userId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        unique: true,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      specializationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'specialization',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      fees: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(400),
        allowNull: false,
      },
      appointmentTime: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
    });

    await queryInterface.createTable('medicine', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      diagnosisId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'diagnosis',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      dosage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    });
    await queryInterface.createTable('rating', {
      ratedId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      patientId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rating: {
        type: Sequelize.DECIMAL(2, 1),
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
    });

    await queryInterface.createTable('receptionsit', {
      receptionsitId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        unique: true,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      doctorId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      clinicId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'clinic',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    await queryInterface.createTable('session', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_type',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      valid: {
        type: Sequelize.TINYINT(1),
        allowNull: true,
        defaultValue: 1,
      },
      userAgent: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lastAccess: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('medicine');    // Depends on diagnosis
await queryInterface.dropTable('rating');      // Depends on user
await queryInterface.dropTable('appointment'); // Depends on user, clinic
await queryInterface.dropTable('diagnosis');   // Depends on user, clinic
await queryInterface.dropTable('clinic_schedule');// Depends on clinic
await queryInterface.dropTable('blood');       // Depends on user, city
await queryInterface.dropTable('session');     // Depends on user, user_type
await queryInterface.dropTable('receptionsit'); // Depends on user, clinic
await queryInterface.dropTable('doctor_nurse'); // Depends on user, specialization
await queryInterface.dropTable('clinic');      // Depends on user, city
await queryInterface.dropTable('user');        // Depends on user_type, city
await queryInterface.dropTable('specialization');
await queryInterface.dropTable('city');
await queryInterface.dropTable('user_type');
  }
};
