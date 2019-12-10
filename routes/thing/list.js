module.exports = function(app,collections){
    
    app.get('/thing/list', function(req, res){
        console.log(req.body);
        
        var servicerequestlist = []

        if(req.query.farmId){
            collections["farms"].findOne({farmId:req.query.farmId},function(err,farm){
                if(err){
                    res.json({servicerequestlist:servicerequestlist});
                    return;
                }
                var temp = collections['service_requests'].find({farmId:farm.farmId});
                temp.each(function(err,sreq){
                    if(err){
                        res.json({servicerequestlist:servicerequestlist});
                    }else{
                        if(sreq)
                        servicerequestlist.push(sreq);
                        else
                        res.json({servicerequestlist:servicerequestlist});
                    }
                        
                });

            });
        }else{
            res.json({servicerequestlist:servicerequestlist});
        }
    });
    
}