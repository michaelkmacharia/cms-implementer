#!/usr/bin/env node

`use strict` ;

const { Relationship , Select , Text } = require ( `@keystonejs/fields` ) ;

const postsFields = (
	{
		fields :
		{
			author :
			{
				type : Relationship ,
				isRequired : true ,
				many : false ,
				ref : `User` ,
			} ,
			body :
			{
				type : Text ,
				isRequired : false ,
				isMultiline : true ,
			} ,
			status :
			{
				type : Select ,
				isRequired : false ,
				defaultValue : `PUBLISHED` ,
				options : [
					{
						value : `PUBLISHED` ,
						label : `Published` ,
					} ,
					{
						value : `UNPUBLISHED` ,
						label : `Unpublished` ,
					} ,
				] ,
			} ,
			title :
			{
				type : Text ,
				isRequired : true ,
			} ,
		} ,
	}
) ;

module . exports = postsFields ;
