function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

function validateAct(req, res, next) {
  if ( !req.body.description || !req.body.project_id || !req.body.notes ) {
		next({
			...Error(),
			status: 400,
      message: 'Action notes, description and related project id are required!'
		}); 
	} else if (req.body || Object.keys(req.body).length > 0) {
		next();
	} else {
		next({ 
      ...Error(), 
      status: 400, 
      message: 'missing user data' 
    });
	}
};

function validateProj(req, res, next) {
  if (!req.body.name || !req.body.description || req.body.completed) {
		next({
			...Error(),
			status: 400,
			message: 'A project name and description are required!'
		});
	} else if (req.body || Object.keys(req.body).length > 0) {
      next();
	} else {
		next({ 
      ...Error(), 
      status: 400, 
      message: 'missing user data' 
    });
	}
};

module.exports = {
  logger,
  validateAct,
  validateProj,
}