req = requirejs.config({
	baseUrl : {%= prefix_caps %}.theme_root + '/assets/js/'
});

req([
	'require',
	//>>excludeStart("configExclude", pragmas.configExclude);
	'src/requirejs-config'
	//>>excludeEnd("configExclude");
], function(require){
	require(['src/{%= js_safe_name %}']);
});
