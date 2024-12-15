import Ngo from './Ngo.js';
import Job from './Job.js';
import User from './User.js';
import UserJob from './UserJob.js';

Ngo.hasMany(Job, { foreignKey: 'ngoid' });
Job.belongsTo(Ngo, { foreignKey: 'ngoid' });

User.belongsToMany(Job, { through: UserJob, foreignKey: 'userid' });
Job.belongsToMany(User, { through: UserJob, foreignKey: 'jobid' });

export { Ngo, Job, User, UserJob };