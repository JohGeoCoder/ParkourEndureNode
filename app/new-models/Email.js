module.exports = function(connection, Sequelize){
	var email = connection.define('email', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: Sequelize.STRING(),
			allowNull: false
		}
	});

	return email;
}