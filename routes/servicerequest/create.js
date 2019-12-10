module.exports = function(app,collections){
    
    const uuidv4 = require('uuid/v4');

    app.post('/servicerequest/create/subscribe', function(req, res){
        console.log('/servicerequest/create');
        console.log(req.body);
        require('../../whoami')(req,collections,function(user){
            if(user.user === false || user.userDetails.userRole !== 'farmer'){
                res.json({success:false,reason:'Only Farmers have access to create a servicerequest'});
                return ;
            }
    
            var json = req.body;
    
            json['farmOwners'] = [user.userDetails.userId];
    
            json['farmId'] = uuidv4();
    
            collections['farms'].save(json);
            
            res.json({success:true});
        });
        
    });
    
    

}