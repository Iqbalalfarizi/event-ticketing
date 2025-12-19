module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      judul: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal_event: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      harga: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      lokasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_kuota: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sisa_kuota: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      tableName: 'events',
      timestamps: false,
    }
  );

  return Event;
};
