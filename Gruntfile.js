module.exports = function (grunt) {
	grunt.initConfig({
		babel: {
			options: {
				sourceMap: false
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['*.js'],
					dest: 'lib',
					ext: '.js'
				}]
			}
		},
		eslint: {
			target: ["src/*.js"]
		}
	});

	// tasks
	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-eslint");

	// aliases
	grunt.registerTask("test", ["eslint"]);
	grunt.registerTask("default", ["test", "babel"]);
};