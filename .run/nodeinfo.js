module.exports = (function(event) {
  // var chained = require('./process-watch');
  var nodeinfo = require('./nodeinfo');
  // this.global.nodeinfo = nodeinfo;
  // nodeinfo('env', { filter_exclude: ['PATH', 'XDG', 'LESS', 'npm_'] } );
  // nodeinfo('process', {
  //   filter_exclude: ['env', 'stderr', 'stdin', 'stdout',]
  // });
  // nodeinfo('env', {
  //   filter_include: ['npm_'],
  //   filter_exclude: [
  //   'npm_config_init_',
  //   'npm_package_dependencies_',
  //   ]
  // });
  // console.log(this.process.argv);
  // console.log(this.process.config);
  // console.log(this.process.moduleLoadList.join(','));
  // console.log([
  //   '[STARTUP]',
  //   ['[this] ', Object.keys(this).join(', ')],
  //   ['[global]', Object.keys(this.global).join(', ')],
  // ].join('\n'))
  // return (this.debug_log = console.log)
  return nodeinfo;
})(this);
