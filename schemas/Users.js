#!/usr/bin/env node

`use strict` ;

const { Checkbox , Password , Text } = require ( `@keystonejs/fields` ) ;

const usersFields = (
	{
		fields :
		{
			email :
			{
				type : Text ,
				isRequired : true ,
				isUnique : true ,
			} ,
			isAdmin :
			{
				type : Checkbox ,
				isRequired : true ,
			} ,
			name :
			{
				type : Text ,
				isRequired : true ,
			} ,
			password :
			{
				type : Password ,
				isRequired : true ,
			} ,
		} ,
	}
) ;

module . exports = usersFields ;
