import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

export default ({ config }) => { // Cannot contain any promises

	if (!config.extra) {
		config.extra = {};
	}
	
	switch(process.env.CHANNEL) {
		case 'staging':
			config.name = 'TestApp Staging';
			config.extra.subdomain = 'staging';
			break;
		case 'testing':
		case 'dev':
			config.name = 'TestApp Testing';
			config.extra.subdomain = 'testing';
			break;
		case 'production':
		default:
			config.extra.subdomain = 'app';
	}
	const reverseDomain = 'com.testapp.' + config.extra.subdomain;
	config.ios.bundleIdentifier = reverseDomain;
	config.ios.buildNumber = config.version;
	config.android.package = reverseDomain;

	config.extra.experienceId = '@' + config.owner + '/' + config.slug;

	// config.extra.CONFIG = JSON.stringify(config);
	config.extra.PROCESS_ENV = JSON.stringify(process.env);

	return config;
};
