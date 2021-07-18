function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

async function validateAct(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
		next();
	} else if ( !req.body.description || !req.body.project_id || !req.body.notes ) {
		next({
			...Error(),
			status: 400,
      message: 'Action notes, description and related project id are required!'
		});
	} else {
		next({ 
      ...Error(), 
      status: 400, 
      message: 'missing user data' 
    });
	}
};

async function validateProj(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
		next();
	} else if (!req.body.name || !res.body.description) {
		next({
			...Error(),
			status: 400,
			message: 'A project name and description are required!'
		});
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