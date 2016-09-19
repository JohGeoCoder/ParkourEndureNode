module.exports = function(connection, Sequelize){
	var coach = connection.define('coach', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true
		},
		firstName: {
			type: Sequelize.STRING(),
			allowNull: false
		},
		lastName: {
			type: Sequelize.STRING(),
			allowNull: false
		},
		imageUrl: {
			type: Sequelize.STRING(),
			allowNull: true
		},
		details: {
			type: Sequelize.STRING(),
			allowNull: false
		}
	});

	return coach;
}