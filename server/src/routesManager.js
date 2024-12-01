const userRoutes = require('./routes/user/index.js')
const proposalRoutes = require('./routes/proposals/index.js')
const {app} = require('./app.js')


module.exports = function(){
    app.use('/api/v1/newuser',userRoutes);
    app.use('/api/v1/proposals',proposalRoutes);
    // app.use('/api/v1/comments',commentRoutes);
    // app.use('/api/v1/ratings',ratingRoutes);
    // app.use('/api/v1/viewcount',viewRoutes);
}
