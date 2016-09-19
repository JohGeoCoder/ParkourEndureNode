module.exports = function(connection, Sequelize){
	var user = connection.define('user', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: Sequelize.STRING(),
			allowNull: false
		},
		isAdmin: {
			type: Sequelize.BOOLEAN(),
			active: true
		},
		passhash: {
			type: Sequelize.BLOB('long'),
			allowNull: false
		}
	});

	return user;
}