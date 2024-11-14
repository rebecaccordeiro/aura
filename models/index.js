import Ngo from './Ngo.js';
import Job from './Job.js';

Ngo.hasMany(Job, { foreignKey: 'ngoid' });
Job.belongsTo(Ngo, { foreignKey: 'ngoid' });

export { Ngo, Job };