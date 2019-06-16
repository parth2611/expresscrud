var express = require('express');
var router = express.Router();
//Call User Database Model



//Display Home Page (Index Page)
router.get('/', function(req, res, next) {
    res.render('index');
  });
  

//List Table Data
router.get('/display', function(req, res) {
    UsersModel.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render('display-table', { users: users });
            console.log(users);
        }
    });
});


//Call Add Form Method
router.get('/add', function(req, res, next) {
    res.render('add-form');
});


//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
    console.log(req.body);

    //Array of Data
    const mybodydata = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_mobile: req.body.user_mobile

    }
    
    
   
    connection.query("insert into tbl_student set ?",mybodydata,function(err,result){
        if(err) throw err; 
      
         res.redirect('/add');
     
        });
});


//Delete User By ID
router.get('/delete/:id', function(req, res) {
    UsersModel.findOneAndDelete(req.params.id, function(err, project) {
        if (err) {
            res.redirect('../display');
        } else {
            res.redirect('../display');
        }
    });
});


//Get Single User By ID
router.get('/show/:id', function(req, res) {
    console.log(req.params.id);
    UsersModel.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
            res.render('show', { users: user });
        }
    });
});

//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);


    UsersModel.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);

            res.render('edit-form', { users: user });
        }
    });
});

//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {
    
  console.log("MyID is"+ req.params.id);

  const mybodydata = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_mobile: req.body.user_mobile
      
  }

    UsersModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
              res.redirect('edit/' + req.params.id);
        } else {
             res.redirect('../display');
        }
    });
});

module.exports = router;
