module.exports = function(app,collections){
    
    app.get('/thing/list', function(req, res){
        console.log(req.body);
        
        var thinglist = []

        if(req.query.farmId){
            var cursor = collections["things"].find({thingFarmId:req.query.farmId});

            cursor.each(function(err, item) {
                if(err){
                    res.json({thinglist:thinglist});
                    return;
                }
                if(item){
                    thinglist.push(item);
                }else{
                    res.json({thinglist:thinglist});
                }
            });
        }else{
            res.json({thinglist:thinglist});
        }
    });
    
}