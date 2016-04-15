module.exports={

	send:function(errorParams){
		var messageObject={};
        if(typeof errorParams == "string")
            messageObject.message=errorParams;
        if(typeof errorParams=="object"){
            var messageError=(_.pick(errorParams,'message').message);
            var exceptionError=(_.pick(errorParams,'exception'));
            var contextError=(_.pick(errorParams,'error@context'));
            var sqlError="Unable to perform operation";
            messageObject.message = messageError||exceptionError||contextError||sqlError;
        }
        var array=[];
        array.push(messageObject);
        var errorObject={};
        errorObject.errors=array;
        return errorObject;
	}
	
}